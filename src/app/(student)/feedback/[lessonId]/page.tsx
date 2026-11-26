"use client";

import * as React from "react";
import { useRouter } from "next/navigation";
import { use } from "react";
import { useAuth } from "@/contexts/AuthContext";
import { useTranslation } from "@/lib/i18n";
import { Card, CardTitle } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";
import { Badge } from "@/components/ui/Badge";
import { ArrowLeft, Play, Sparkles, CheckCircle2 } from "lucide-react";
import { MISCONCEPTION_RULES, detectMisconception } from "@/lib/learning-engine";

interface FeedbackPageProps {
  params: Promise<{ lessonId: string }>;
}

export default function FeedbackPage({ params }: FeedbackPageProps) {
  const { lessonId } = use(params);
  const router = useRouter();
  const { user } = useAuth();
  const { t: tx } = useTranslation((user?.locale as any) || "en");

  const [testAnswer, setTestAnswer] = React.useState("2/5");
  const [misconception, setMisconception] = React.useState<any>(null);
  const [hasChecked, setHasChecked] = React.useState(false);

  if (!user) return null;

  const handleDetect = (answer: string) => {
    const result = detectMisconception(answer.trim(), "fractions-addition", []);
    setMisconception(result);
    setHasChecked(true);
  };

  return (
    <div className="space-y-6 max-w-4xl mx-auto">
      <div className="flex items-center gap-3">
        <Button variant="ghost" size="sm" onClick={() => router.push(`/quiz/${lessonId}`)}>
          <ArrowLeft className="w-4 h-4 mr-1" />
          {tx("common", "back")}
        </Button>
        <div>
          <h1 className="text-2xl font-bold text-navy-900">{tx("misconception", "title")}</h1>
          <p className="text-slate-600 text-sm">Interactive cognitive feedback and misconception explanation</p>
        </div>
      </div>

      <Card className="p-6 space-y-6">
        <div>
          <CardTitle className="text-lg">{tx("student", "misconception_detected")}</CardTitle>
          <p className="text-xs text-slate-500 mt-1">
            Test how LearnLoop diagnoses specific mistakes using deterministic pedagogical rules.
          </p>
        </div>

        <div className="p-4 rounded-xl border border-slate-200 bg-slate-50 space-y-3">
          <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider">
            Test An Answer for 1/2 + 1/3:
          </label>
          <div className="flex gap-2">
            <input
              type="text"
              value={testAnswer}
              onChange={(e) => setTestAnswer(e.target.value)}
              placeholder="e.g. 2/5 or 5/6"
              className="flex-1 rounded-md border border-slate-200 bg-white px-3 py-2 text-sm text-slate-900 focus:border-teal-600 focus:outline-none"
            />
            <Button variant="primary" size="sm" onClick={() => handleDetect(testAnswer)}>
              Check Diagnosis
            </Button>
          </div>

          <div className="flex items-center gap-2 pt-1 text-xs text-slate-500">
            <span>Quick test examples:</span>
            <button
              type="button"
              onClick={() => {
                setTestAnswer("2/5");
                handleDetect("2/5");
              }}
              className="px-2 py-0.5 rounded bg-white border border-slate-200 hover:bg-slate-100 text-slate-700 font-mono"
            >
              2/5 (Common error)
            </button>
            <button
              type="button"
              onClick={() => {
                setTestAnswer("5/6");
                handleDetect("5/6");
              }}
              className="px-2 py-0.5 rounded bg-white border border-slate-200 hover:bg-slate-100 text-slate-700 font-mono"
            >
              5/6 (Correct)
            </button>
          </div>
        </div>

        {hasChecked && (
          misconception ? (
            <div className="p-5 rounded-xl border border-rose-200 bg-rose-50 space-y-3">
              <div className="flex items-center justify-between">
                <h2 className="text-sm font-bold text-rose-900">
                  {tx("misconception", "possible_misconception")}
                </h2>
                <Badge variant="warning">
                  Confidence: {(misconception.confidence * 100).toFixed(0)}%
                </Badge>
              </div>
              <p className="text-sm text-rose-800">
                <strong>Why this happens:</strong> {misconception.misconception.likely_reasoning}
              </p>
              <p className="text-sm text-slate-800 bg-white p-3 rounded-lg border border-rose-100">
                <strong>Correct Explanation:</strong> {misconception.misconception.correct_explanation}
              </p>
              <p className="text-xs text-slate-500 italic">
                {tx("misconception", "not_a_judgment")}
              </p>
            </div>
          ) : (
            <div className="p-4 rounded-xl border border-emerald-200 bg-emerald-50 text-emerald-900 text-sm flex items-center gap-2">
              <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0" />
              <span>Correct answer! No cognitive misconceptions detected for 5/6.</span>
            </div>
          )
        )}

        <div className="pt-4 border-t border-slate-200">
          <h2 className="text-base font-bold text-navy-900 mb-3">{tx("misconception", "remediation")}</h2>
          <div className="space-y-3">
            {MISCONCEPTION_RULES.map((m) => (
              <div key={m.id} className="p-4 rounded-xl border border-slate-200 bg-slate-50 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                <div>
                  <h3 className="text-sm font-bold text-navy-900">{m.concept}</h3>
                  <p className="text-xs text-slate-600 mt-0.5">{m.correct_explanation}</p>
                  <p className="text-xs text-teal-700 mt-1">
                    <strong>Activity:</strong> {m.remedial_activity}
                  </p>
                </div>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => router.push(`/quiz/${lessonId}`)}
                  className="shrink-0"
                >
                  {tx("student", "practice_question")}
                </Button>
              </div>
            ))}
          </div>
        </div>

        <div className="pt-4 border-t border-slate-200 flex justify-end">
          <Button
            variant="primary"
            onClick={() => router.push(`/quiz/${lessonId}`)}
            className="flex items-center gap-2"
          >
            <Play className="w-4 h-4" />
            <span>Retake Practice Quiz</span>
          </Button>
        </div>
      </Card>
    </div>
  );
}
