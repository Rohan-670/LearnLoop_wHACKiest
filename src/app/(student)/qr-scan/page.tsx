"use client";

import * as React from "react";
import { useAuth } from "@/contexts/AuthContext";
import { useTranslation } from "@/lib/i18n";
import { Card, CardTitle } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";
import { Badge } from "@/components/ui/Badge";
import { ArrowLeft, QrCode, Scan, Download, Link } from "lucide-react";
import { useRouter } from "next/navigation";
import { parseQRCode } from "@/lib/qr-utils";

export default function QRScanPage() {
  const { user } = useAuth();
  const { t: tx } = useTranslation((user?.locale as any) || "en");
  const router = useRouter();

  const [scannedData, setScannedData] = React.useState<string | null>(null);
  const [parsed, setParsed] = React.useState<any>(null);
  const [status, setStatus] = React.useState<"idle" | "scanning" | "found" | "not-cached" | "error">("idle");
  if (!user) return null;

  const handleScan = (data: string) => {
    setScannedData(data);
    const result = parseQRCode(data);
    setParsed(result);
    if (result) {
      setStatus("found");
    } else {
      setStatus("error");
    }
  };

  const handleDownload = () => {
    if (!parsed) return;
    router.push(`/lesson/${parsed.lessonId}`);
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-3">
        <Button variant="ghost" size="sm" onClick={() => router.back()}>
          <ArrowLeft className="w-4 h-4" />
          {tx("common", "back")}
        </Button>
        <h1 className="text-2xl font-bold text-navy-900">QR Scan</h1>
      </div>

      <Card className="text-center">
        <CardTitle>Scan Lesson QR Code</CardTitle>
        <p className="text-sm text-slate-600 mb-6">
          Point your camera at a QR code to access a lesson.
        </p>

        <div className="p-8 rounded-2xl border-2 border-dashed border-slate-200 bg-slate-50 text-slate-400">
          <QrCode className="w-12 h-12 mx-auto mb-3" />
          <p className="text-sm">Camera scanning not available in demo</p>
          <p className="text-xs text-slate-500 mt-2">Enter lesson ID manually:</p>
        </div>

        <div className="flex gap-2">
          <input
            type="text"
            defaultValue="les-001"
            className="flex-1 rounded-md border border-slate-200 bg-white px-3 py-2 text-sm"
          />
          <Button variant="outline" size="sm" onClick={() => handleScan(JSON.stringify({ type: "lesson", lessonId: "les-001", version: 1 }))}>
            Simulate Scan
          </Button>
        </div>

        {status === "found" && parsed && (
          <div className="mt-6 p-4 rounded-xl border border-emerald-200 bg-emerald-50">
            <div className="flex items-center justify-between mb-3">
              <h3 className="text-sm font-bold text-emerald-900">Lesson Found</h3>
              <Badge variant="success">Cached</Badge>
            </div>
            <p className="text-xs text-emerald-700 mb-3">
              Lesson: {parsed.lessonId} (v{parsed.version})
            </p>
            <Button variant="primary" onClick={handleDownload} className="w-full">
              <Link className="w-4 h-4 mr-1" />
              Open Lesson
            </Button>
          </div>
        )}

        {status === "not-cached" && parsed && (
          <div className="mt-6 p-4 rounded-xl border border-amber-200 bg-amber-50">
            <div className="flex items-center justify-between mb-3">
              <h3 className="text-sm font-bold text-amber-900">Lesson Not Cached</h3>
              <Badge variant="warning">Download Required</Badge>
            </div>
            <p className="text-xs text-amber-700 mb-3">
              This lesson is not available offline. Connect to the internet to download.
            </p>
            <Button variant="outline" onClick={handleDownload} className="w-full">
              <Download className="w-4 h-4 mr-1" />
              Download When Online
            </Button>
          </div>
        )}

        {status === "error" && (
          <div className="mt-6 p-4 rounded-xl border border-rose-200 bg-rose-50">
            <h3 className="text-sm font-bold text-rose-900">Invalid QR Code</h3>
            <p className="text-xs text-rose-700 mt-1">
              The scanned code does not contain a valid lesson identifier.
            </p>
          </div>
        )}
      </Card>
    </div>
  );
}
