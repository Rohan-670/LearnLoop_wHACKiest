"use client";

import * as React from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/contexts/AuthContext";
import { useTranslation } from "@/lib/i18n";
import { Card, CardTitle } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";
import { ArrowLeft, Download, QrCode } from "lucide-react";
import { generateQRDataURL } from "@/lib/qr-utils";
import { LESSONS } from "@/lib/learning-engine";

export default function QRGeneratePage() {
  const router = useRouter();
  const { user } = useAuth();
  const { t: tx } = useTranslation((user?.locale as any) || "en");

  const [qrDataUrl, setQrDataUrl] = React.useState<string | null>(null);
  const [selectedLesson, setSelectedLesson] = React.useState<string>(LESSONS[0]?.id || "les-001");

  if (!user) return null;

  React.useEffect(() => {
    if (selectedLesson) {
      generateQRDataURL(selectedLesson, 1).then((url) => setQrDataUrl(url));
    }
  }, [selectedLesson]);

  const handleGenerate = async () => {
    if (!selectedLesson) return;
    const dataUrl = await generateQRDataURL(selectedLesson, 1);
    setQrDataUrl(dataUrl);
  };

  const handleDownloadImage = () => {
    if (!qrDataUrl) return;
    const a = document.createElement("a");
    a.href = qrDataUrl;
    a.download = `learnloop-qr-${selectedLesson}.png`;
    a.click();
  };

  const selectedLessonObj = LESSONS.find((l) => l.id === selectedLesson);

  return (
    <div className="space-y-6 max-w-3xl mx-auto">
      <div className="flex items-center gap-3">
        <Button variant="ghost" size="sm" onClick={() => router.push("/dashboard/teacher")}>
          <ArrowLeft className="w-4 h-4 mr-1" />
          {tx("common", "back")}
        </Button>
        <div>
          <h1 className="text-2xl font-bold text-navy-900 flex items-center gap-2">
            <QrCode className="w-6 h-6 text-teal-600" />
            <span>QR-to-Learning Generator</span>
          </h1>
          <p className="text-slate-600 text-sm">
            Print or project lightweight QR identifiers. Students scan to unlock cached lessons instantly.
          </p>
        </div>
      </div>

      <Card className="p-6">
        <CardTitle className="text-lg">Generate Printable QR Code</CardTitle>
        <p className="text-xs text-slate-500 mt-1 mb-4">
          QR codes encode the lightweight lesson ID and version, avoiding bandwidth waste.
        </p>

        <div className="space-y-4">
          <div>
            <label className="block text-sm font-semibold text-slate-700 mb-1.5">Select Curriculum Lesson</label>
            <select
              value={selectedLesson}
              onChange={(e) => setSelectedLesson(e.target.value)}
              className="w-full rounded-md border border-slate-200 bg-white px-3 py-2 text-sm text-slate-900 focus:border-teal-600 focus:outline-none"
            >
              {LESSONS.map((l) => (
                <option key={l.id} value={l.id}>
                  {l.title} ({l.topicId})
                </option>
              ))}
            </select>
          </div>

          <Button variant="primary" onClick={handleGenerate} disabled={!selectedLesson} className="w-full">
            Regenerate QR Code
          </Button>
        </div>

        {qrDataUrl && (
          <div className="mt-6 p-6 rounded-2xl border border-slate-200 bg-slate-50 text-center flex flex-col items-center">
            <div className="p-4 bg-white rounded-xl shadow-xs border border-slate-200 mb-3">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={qrDataUrl} alt="Lesson QR Code" className="w-48 h-48 mx-auto" />
            </div>
            <p className="text-sm font-bold text-navy-900">{selectedLessonObj?.title}</p>
            <p className="text-xs text-slate-500 font-mono mt-0.5">Lesson Code: {selectedLesson}</p>

            <Button
              variant="outline"
              size="sm"
              onClick={handleDownloadImage}
              className="mt-4 flex items-center gap-1.5"
            >
              <Download className="w-4 h-4" />
              <span>Download Printable PNG</span>
            </Button>
          </div>
        )}
      </Card>

      <Card className="p-6">
        <CardTitle className="text-sm">How QR-to-Learning Works in Classrooms</CardTitle>
        <ul className="mt-3 space-y-2 text-xs text-slate-600">
          <li className="flex items-start gap-2">
            <span className="font-bold text-teal-600">1.</span>
            <span>The QR code only stores a tiny structured ID (e.g. `LL:les-001:v1`).</span>
          </li>
          <li className="flex items-start gap-2">
            <span className="font-bold text-teal-600">2.</span>
            <span>When scanned on a student phone, the app checks local IndexedDB storage.</span>
          </li>
          <li className="flex items-start gap-2">
            <span className="font-bold text-teal-600">3.</span>
            <span>If already cached, the full interactive lesson opens with zero cellular data used.</span>
          </li>
        </ul>
      </Card>
    </div>
  );
}
