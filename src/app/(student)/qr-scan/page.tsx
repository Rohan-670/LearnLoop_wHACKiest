"use client";

import * as React from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/contexts/AuthContext";
import { useTranslation } from "@/lib/i18n";
import { Card, CardTitle } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";
import { Badge } from "@/components/ui/Badge";
import { ArrowLeft, QrCode, Scan, ArrowRight } from "lucide-react";
import { parseQRCode } from "@/lib/qr-utils";
import { LESSONS } from "@/lib/learning-engine";

export default function QRScanPage() {
  const router = useRouter();
  const { user } = useAuth();
  const { t: tx } = useTranslation((user?.locale as any) || "en");

  const [inputCode, setInputCode] = React.useState("les-001");
  const [parsed, setParsed] = React.useState<any>(null);
  const [status, setStatus] = React.useState<"idle" | "scanning" | "found" | "not-cached" | "error">("idle");

  if (!user) return null;

  const handleScan = (raw: string) => {
    setStatus("scanning");
    setTimeout(() => {
      const codeToParse = raw.includes("{") ? raw : JSON.stringify({ type: "lesson", lessonId: raw.trim(), version: 1 });
      const result = parseQRCode(codeToParse);
      setParsed(result);
      if (result) {
        const found = LESSONS.some((l) => l.id === result.lessonId);
        setStatus(found ? "found" : "not-cached");
      } else {
        setStatus("error");
      }
    }, 400);
  };

  const handleOpenLesson = () => {
    if (!parsed) return;
    router.push(`/lesson/${parsed.lessonId}`);
  };

  const currentLessonObj = LESSONS.find((l) => l.id === parsed?.lessonId);

  return (
    <div className="space-y-6 max-w-xl mx-auto">
      <div className="flex items-center gap-3">
        <Button variant="ghost" size="sm" onClick={() => router.push("/dashboard/student")}>
          <ArrowLeft className="w-4 h-4 mr-1" />
          {tx("common", "back")}
        </Button>
        <div>
          <h1 className="text-2xl font-bold text-navy-900 flex items-center gap-2">
            <Scan className="w-6 h-6 text-teal-600" />
            <span>QR-to-Lesson Scanner</span>
          </h1>
          <p className="text-slate-600 text-sm">Scan a projected or printed QR code to load your lesson</p>
        </div>
      </div>

      <Card className="p-6 text-center space-y-4">
        <CardTitle className="text-lg">Scanner Simulation</CardTitle>
        <p className="text-xs text-slate-500">
          In low-connectivity rural classrooms, QR tokens trigger cached lessons in IndexedDB without using data.
        </p>

        <div className="p-8 rounded-2xl border-2 border-dashed border-teal-200 bg-teal-50/40 text-teal-700 flex flex-col items-center">
          <QrCode className="w-14 h-14 mb-2 text-teal-600" />
          <p className="text-sm font-semibold text-navy-900">Camera / Token Input</p>
          <p className="text-xs text-slate-500 mt-1">Select or type a lesson token:</p>
        </div>

        <div className="flex gap-2">
          <select
            value={inputCode}
            onChange={(e) => {
              setInputCode(e.target.value);
              setStatus("idle");
            }}
            className="flex-1 rounded-md border border-slate-200 bg-white px-3 py-2 text-sm text-slate-900 focus:border-teal-600 focus:outline-none"
          >
            {LESSONS.map((l) => (
              <option key={l.id} value={l.id}>
                {l.id} — {l.title}
              </option>
            ))}
            <option value="invalid-code">invalid-code (Error Test)</option>
          </select>
          <Button variant="primary" size="sm" onClick={() => handleScan(inputCode)} className="shrink-0">
            Simulate Scan
          </Button>
        </div>

        {status === "found" && parsed && (
          <div className="p-4 rounded-xl border border-emerald-200 bg-emerald-50 text-left space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-sm font-bold text-emerald-900">Lesson Located Locally</span>
              <Badge variant="success">Cached in IndexedDB</Badge>
            </div>
            <div>
              <p className="text-sm font-bold text-navy-900">{currentLessonObj?.title || parsed.lessonId}</p>
              <p className="text-xs text-slate-600 mt-0.5">Packet version v{parsed.version} ready for immediate offline study.</p>
            </div>
            <Button variant="primary" onClick={handleOpenLesson} className="w-full flex items-center justify-center gap-2">
              <span>Open Lesson Now</span>
              <ArrowRight className="w-4 h-4" />
            </Button>
          </div>
        )}

        {status === "error" && (
          <div className="p-4 rounded-xl border border-rose-200 bg-rose-50 text-left">
            <h3 className="text-sm font-bold text-rose-900">Unrecognized QR Token</h3>
            <p className="text-xs text-rose-700 mt-1">
              The scanned code did not match any registered curriculum standard.
            </p>
          </div>
        )}
      </Card>
    </div>
  );
}
