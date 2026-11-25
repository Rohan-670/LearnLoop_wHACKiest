"use client";

import * as React from "react";
import { useAuth } from "@/contexts/AuthContext";
import { useTranslation } from "@/lib/i18n";
import { Card, CardTitle } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";
import { Badge } from "@/components/ui/Badge";
import { ArrowLeft, QrCode, Share2 } from "lucide-react";
import { generateQRDataURL } from "@/lib/qr-utils";
import { LESSONS } from "@/lib/learning-engine";

export default function QRGeneratePage() {
  const { user } = useAuth();
  const { t: tx } = useTranslation((user?.locale as any) || "en");
  const [qrDataUrl, setQrDataUrl] = React.useState<string | null>(null);
  const [selectedLesson, setSelectedLesson] = React.useState<string>("");
  if (!user) return null;

  const handleGenerate = async () => {
    if (!selectedLesson) return;
    const dataUrl = await generateQRDataURL(selectedLesson, 1);
    setQrDataUrl(dataUrl);
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-3">
        <Button variant="ghost" size="sm" onClick={() => {}}>
          <ArrowLeft className="w-4 h-4" />
          {tx("common", "back")}
        </Button>
        <h1 className="text-2xl font-bold text-navy-900">QR-to-Learning</h1>
      </div>

      <Card>
        <CardTitle>Generate Lesson QR Code</CardTitle>
        <p className="text-sm text-slate-600 mb-4">
          QR codes contain a lesson identifier, not content. Students scan to access cached lessons.
        </p>

        <div className="space-y-4">
          <label className="block text-sm font-medium text-slate-700">Select Lesson</label>
          <select
            value={selectedLesson}
            onChange={(e) => setSelectedLesson(e.target.value)}
            className="w-full rounded-md border border-slate-200 bg-white px-3 py-2 text-sm"
          >
            <option value="">Choose a lesson</option>
            {LESSONS.map((l) => (
              <option key={l.id} value={l.id}>{l.title}</option>
            ))}
          </select>

          <Button variant="primary" onClick={handleGenerate} disabled={!selectedLesson} className="w-full">
            {qrDataUrl ? "Regenerate" : "Generate QR Code"}
          </Button>
        </div>

        {qrDataUrl && (
          <div className="mt-6 p-6 rounded-xl border border-slate-200 bg-slate-50 text-center">
            <img src={qrDataUrl} alt="QR Code" className="w-48 h-48 mx-auto mb-4" />
            <p className="text-sm text-slate-600">
              Students scan this code to access: {selectedLesson}
            </p>
            <Button variant="outline" size="sm">
              <Share2 className="w-4 h-4 mr-1" />
              Share
            </Button>
          </div>
        )}
      </Card>

      <Card>
        <CardTitle>How It Works</CardTitle>
        <ul className="space-y-3 text-sm text-slate-600">
          <li>1. QR contains lesson ID and version only</li>
          <li>2. Student scans to check if lesson is cached</li>
          <li>3. If cached, lesson opens immediately offline</li>
          <li>4. If not cached, student is prompted to download when online</li>
        </ul>
      </Card>
    </div>
  );
}
