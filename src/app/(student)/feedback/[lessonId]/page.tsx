"use client";

import * as React from "react";
import { useAuth } from "@/contexts/AuthContext";
import { useTranslation } from "@/lib/i18n";
import { Card, CardTitle } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";
import { Badge } from "@/components/ui/Badge";
import { ShieldAlert, Activity, ArrowLeft, Play } from "lucide-react";
import { useRouter } from "next/navigation";
import { use } from "react";
import { MISCONCEPTION_RULES, detectMisconception } from "@/lib/learning-engine";

interface FeedbackPageProps {
  params: Promise<{ lessonId: string }>;
}

export default function FeedbackPage({ params }: FeedbackPageProps) {
  const { lessonId } = use(params);
  const { user } = useAuth();
  const { t: tx } = useTranslation((user?.locale as any) || "en");
  const router = useRouter();

  const [misconception, setMisconception] = React.useState<any>(null);
  if (!user) return null;

  const handleDetect = (answer: string) => {
    const result = detectMisconception(answer, "fractions-addition", []);
    setMisconception(result);
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-3">
        <Button variant="ghost" size="sm" onClick={() => router.back()}>
          <ArrowLeft className="w-4 h-4" />
          {tx("common", "back")}
        </Button>
        <h1 className="text-2xl font-bold text-navy-900">{tx("misconception", "title")}</h1>
      </div>

      <Card>
        <CardTitle>{tx("student", "misconception_detected")}</CardTitle>
        <div className="space-y-4">
          <div className="p-4 rounded-lg border border-slate-200 bg-slate-50">
            <label className="block text-sm font-medium text-slate-700 mb-2">
              Enter an answer to check:
            </label>
            <div className="flex gap-2">
              <input
                type="text"
                defaultValue="2/5"
                className="flex-1 rounded-md border border-slate-200 bg-white px-3 py-2 text-sm"
              />
              <Button variant="outline" size="sm" onClick={() => handleDetect("2/5")}>
                Check
              </Button>
            </div>
          </div>

          {misconception && (
            <div className="p-4 rounded-lg border border-rose-200 bg-rose-50">
              <h3 className="text-sm font-bold text-rose-900 mb-2">
                {tx("misconception", "possible_misconception")}
              </h3>
              <p className="text-sm text-rose-700 mb-2">
                {misconception.misconception.likely_reasoning}
              </p>
              <Badge variant="warning" className="mb-3">
                {tx("misconception", "confidence_level")}: {(misconception.confidence * 100).toFixed(0)}%
              </Badge>
              <p className="text-sm text-rose-700 mb-3">
                <strong>{tx("misconception", "correct_explanation")}:</strong>{" "}
                {misconception.misconception.correct_explanation}
              </p>
              <p className="text-xs text-rose-600">
                {tx("misconception", "not_a_judgment")}
              </p>
            </div>
          )}

          <div className="pt-4 border-t border-slate-200">
            <h3 className="text-sm font-bold text-navy-900 mb-3">
              {tx("misconception", "remediation")}
            </h3>
            <div className="space-y-3">
              {MISCONCEPTION_RULES.map((m) => (
                <Card key={m.id} padded={false}>
                  <div className="p-4">
                    <p className="text-sm font-medium text-navy-900 mb-1">
                      {m.concept}
                    </p>
                    <p className="text-xs text-slate-600 mb-3">
                      {m.correct_explanation}
                    </p>
                    <p className="text-xs text-slate-600 mb-2">
                      <strong>Activity:</strong> {m.remedial_activity}
                    </p>
                    <Button variant="outline" size="sm" onClick={() => {}}>
                      {tx("student", "practice_question")}
                    </Button>
                  </div>
                </Card>
              ))}
            </div>
          </div>
        </div>
      </Card>

      <div className="mt-8 flex items-center gap-2 text-sm text-slate-500">
        <Button variant="ghost" size="sm" onClick={() => router.push(`/quiz/${lessonId}`)}>
          <Play className="w-4 h-4 mr-1" />
          {tx("student", "try_again_lesson")}
        </Button>
      </div>
    </div>
  );
}
