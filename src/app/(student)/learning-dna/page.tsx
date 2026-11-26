"use client";

import * as React from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/contexts/AuthContext";
import { useTranslation } from "@/lib/i18n";
import { Card, CardTitle } from "@/components/ui/Card";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import { ArrowLeft, TrendingUp, Clock, Activity, Sparkles, ArrowRight } from "lucide-react";

export default function LearningDNAPage() {
  const router = useRouter();
  const { user } = useAuth();
  const { t: tx } = useTranslation((user?.locale as any) || "en");
  if (!user) return null;

  const dna = {
    topicMastery: [
      { topic: "Addition of Fractions", mastery: 65, trend: "up", lessonId: "les-001" },
      { topic: "Equivalent Fractions", mastery: 80, trend: "up", lessonId: "les-002" },
      { topic: "Decimals & Place Values", mastery: 40, trend: "down", lessonId: "les-001" },
      { topic: "Percentages Basics", mastery: 55, trend: "up", lessonId: "les-002" },
    ],
    repeatedMistakes: [
      "Adding numerators and denominators independently (e.g., 1/2 + 1/3 = 2/5)",
      "Confusing decimals: treating 0.5 as smaller than 0.25 due to digit count",
    ],
    identifiedMisconceptions: [
      "Fraction addition misconception (detected with 85% confidence)",
      "Whole number bias applied to fraction denominators",
    ],
    learningPace: 75,
    practiceCompletion: 60,
    improvementAfterRemediation: 25,
    recommendedNextActivity: "Practice equivalent fractions with visual fraction circles",
    recommendedLessonId: "les-002",
  };

  return (
    <div className="space-y-6 max-w-5xl mx-auto">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <Button variant="ghost" size="sm" onClick={() => router.push("/dashboard/student")}>
            <ArrowLeft className="w-4 h-4 mr-1" />
            {tx("common", "back")}
          </Button>
          <div>
            <h1 className="text-2xl font-bold text-navy-900">{tx("student", "view_learning_dna")}</h1>
            <p className="text-slate-600 text-sm">Transparent, explainable cognitive profile and mastery analytics</p>
          </div>
        </div>
        <Badge variant="default" className="self-start sm:self-auto py-1 px-3">
          Explainable AI Active
        </Badge>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card className="p-5">
          <p className="text-xs font-semibold text-slate-500 uppercase tracking-wider">Learning Pace</p>
          <div className="flex items-center justify-between mt-2">
            <div className="text-3xl font-extrabold text-teal-700">{dna.learningPace}%</div>
            <TrendingUp className="w-7 h-7 text-teal-600 bg-teal-50 p-1 rounded-lg" />
          </div>
          <p className="text-xs text-slate-500 mt-2">Consistent progress across grade 8 concepts</p>
        </Card>

        <Card className="p-5">
          <p className="text-xs font-semibold text-slate-500 uppercase tracking-wider">Practice Completion</p>
          <div className="flex items-center justify-between mt-2">
            <div className="text-3xl font-extrabold text-teal-700">{dna.practiceCompletion}%</div>
            <Activity className="w-7 h-7 text-teal-600 bg-teal-50 p-1 rounded-lg" />
          </div>
          <p className="text-xs text-slate-500 mt-2">12 of 20 assigned practice exercises finished</p>
        </Card>

        <Card className="p-5">
          <p className="text-xs font-semibold text-slate-500 uppercase tracking-wider">Improvement Post-Remediation</p>
          <div className="flex items-center justify-between mt-2">
            <div className="text-3xl font-extrabold text-emerald-700">+{dna.improvementAfterRemediation}%</div>
            <Clock className="w-7 h-7 text-emerald-600 bg-emerald-50 p-1 rounded-lg" />
          </div>
          <p className="text-xs text-slate-500 mt-2">Accuracy jump after targeted visual feedback</p>
        </Card>
      </div>

      {/* Recommended Next Step Banner */}
      <Card className="p-6 border-teal-200 bg-gradient-to-r from-teal-50 to-cyan-50">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="flex items-start gap-3">
            <Sparkles className="w-6 h-6 text-teal-600 shrink-0 mt-0.5" />
            <div>
              <p className="text-xs font-bold uppercase tracking-wider text-teal-800">Recommended Next Step</p>
              <h2 className="text-base font-bold text-navy-900 mt-0.5">{dna.recommendedNextActivity}</h2>
              <p className="text-xs text-slate-600 mt-1">
                Visualizing common denominators reinforces fraction concepts before moving to algebra.
              </p>
            </div>
          </div>
          <Button
            variant="primary"
            size="sm"
            onClick={() => router.push(`/lesson/${dna.recommendedLessonId}`)}
            className="flex items-center gap-2 shrink-0"
          >
            <span>Start Recommendation</span>
            <ArrowRight className="w-4 h-4" />
          </Button>
        </div>
      </Card>

      {/* Topic Mastery Breakdown */}
      <Card className="p-6">
        <CardTitle className="text-lg mb-4">Topic Mastery Breakdown</CardTitle>
        <div className="space-y-4">
          {dna.topicMastery.map((t) => (
            <div
              key={t.topic}
              className="flex flex-col sm:flex-row sm:items-center justify-between p-3.5 rounded-lg border border-slate-100 bg-slate-50 gap-3"
            >
              <div className="flex-1">
                <p className="text-sm font-semibold text-navy-900">{t.topic}</p>
                <p className="text-xs text-slate-500 mt-0.5">
                  {t.trend === "up" ? "Improving" : t.trend === "down" ? "Needs attention" : "Stable"}
                </p>
              </div>
              <div className="flex items-center gap-4">
                <div className="w-32 h-2.5 bg-slate-200 rounded-full overflow-hidden">
                  <div
                    className={`h-full rounded-full ${
                      t.trend === "up" ? "bg-emerald-600" : t.trend === "down" ? "bg-rose-500" : "bg-amber-500"
                    }`}
                    style={{ width: `${t.mastery}%` }}
                  />
                </div>
                <span className="text-sm font-bold text-navy-900 w-10 text-right">{t.mastery}%</span>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => router.push(`/lesson/${t.lessonId}`)}
                  className="text-xs"
                >
                  Review
                </Button>
              </div>
            </div>
          ))}
        </div>
      </Card>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Repeated Mistakes */}
        <Card className="p-6">
          <CardTitle className="text-base text-rose-900 mb-3">Detected Learning Patterns</CardTitle>
          <ul className="space-y-2.5">
            {dna.repeatedMistakes.map((m, i) => (
              <li key={i} className="flex items-start gap-3 p-3 rounded-lg border border-rose-100 bg-rose-50/60">
                <span className="text-rose-600 text-sm mt-0.5 font-bold">!</span>
                <p className="text-xs text-rose-900 leading-relaxed font-medium">{m}</p>
              </li>
            ))}
          </ul>
        </Card>

        {/* Identified Misconceptions */}
        <Card className="p-6">
          <CardTitle className="text-base text-amber-900 mb-3">Identified Misconceptions</CardTitle>
          <ul className="space-y-2.5">
            {dna.identifiedMisconceptions.map((m, i) => (
              <li key={i} className="flex items-start gap-3 p-3 rounded-lg border border-amber-100 bg-amber-50/60">
                <span className="text-amber-600 text-sm mt-0.5 font-bold">💡</span>
                <p className="text-xs text-amber-900 leading-relaxed font-medium">{m}</p>
              </li>
            ))}
          </ul>
        </Card>
      </div>
    </div>
  );
}
