"use client";

import * as React from "react";
import { useAuth } from "@/contexts/AuthContext";
import { useTranslation } from "@/lib/i18n";
import { Card, CardTitle } from "@/components/ui/Card";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import { ShieldAlert, Activity, TrendingUp, Clock } from "lucide-react";

export default function LearningDNAPage() {
  const { user } = useAuth();
  const { t: tx } = useTranslation((user?.locale as any) || "en");
  if (!user) return null;

  const dna = {
    topicMastery: [
      { topic: "Addition of Fractions", mastery: 65, trend: "up" },
      { topic: "Equivalent Fractions", mastery: 80, trend: "up" },
      { topic: "Decimals", mastery: 40, trend: "down" },
      { topic: "Percentages", mastery: 55, trend: "up" },
      { topic: "Basic Algebra", mastery: 30, trend: "neutral" },
    ],
    repeatedMistakes: [
      "Adding numerators and denominators independently",
      "Confusing 0.5 with 0.25",
    ],
    identifiedMisconceptions: [
      "Fraction addition misconception (detected with 85% confidence)",
    ],
    retentionOverTime: [
      { date: "Mon", score: 45 },
      { date: "Tue", score: 55 },
      { date: "Wed", score: 70 },
      { date: "Thu", score: 65 },
      { date: "Fri", score: 80 },
    ],
    learningPace: 75,
    practiceCompletion: 60,
    improvementAfterRemediation: 25,
    recommendedNextActivity: "Practice equivalent fractions with visual models",
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-3">
        <h1 className="text-2xl font-bold text-navy-900">{tx("student", "learning_dna")}</h1>
        <Badge variant="default">Transparent</Badge>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card>
          <CardTitle>{tx("student", "learning_pace")}</CardTitle>
          <div className="flex items-center justify-between">
            <div className="text-2xl font-bold text-teal-600">{dna.learningPace}%</div>
            <TrendingUp className="w-6 h-6 text-teal-600" />
          </div>
        </Card>
        <Card>
          <CardTitle>{tx("student", "practice_completion")}</CardTitle>
          <div className="flex items-center justify-between">
            <div className="text-2xl font-bold text-teal-600">{dna.practiceCompletion}%</div>
            <Activity className="w-6 h-6 text-teal-600" />
          </div>
        </Card>
        <Card>
          <CardTitle>Improvement After Remediation</CardTitle>
          <div className="flex items-center justify-between">
            <div className="text-2xl font-bold text-emerald-600">+{dna.improvementAfterRemediation}%</div>
            <Clock className="w-6 h-6 text-emerald-600" />
          </div>
        </Card>
      </div>

      <Card>
        <CardTitle>Topic Mastery</CardTitle>
        <div className="space-y-4">
          {dna.topicMastery.map((t) => (
            <div key={t.topic} className="flex items-center justify-between p-3 rounded-lg border border-slate-100 bg-slate-50">
              <div>
                <p className="text-sm font-medium text-navy-900">{t.topic}</p>
                <p className="text-xs text-slate-500">{t.trend === "up" ? "Improving" : t.trend === "down" ? "Needs attention" : "Stable"}</p>
              </div>
              <div className="w-24 h-2 bg-slate-200 rounded overflow-hidden">
                <div className={`h-full ${t.trend === "up" ? "bg-emerald-600" : t.trend === "down" ? "bg-rose-600" : "bg-amber-600"}`} style={{ width: `${t.mastery}%` }} />
              </div>
              <span className="text-sm font-bold text-navy-900">{t.mastery}%</span>
            </div>
          ))}
        </div>
      </Card>

      <Card>
        <CardTitle>Repeated Mistakes</CardTitle>
        <ul className="space-y-2">
          {dna.repeatedMistakes.map((m, i) => (
            <li key={i} className="flex items-center gap-3 p-3 rounded-lg border border-rose-100 bg-rose-50">
              <span className="text-rose-600">⚠</span>
              <p className="text-sm text-rose-800">{m}</p>
            </li>
          ))}
        </ul>
      </Card>

      <Card>
        <CardTitle>Identified Misconceptions</CardTitle>
        <ul className="space-y-2">
          {dna.identifiedMisconceptions.map((m, i) => (
            <li key={i} className="flex items-center gap-3 p-3 rounded-lg border border-amber-100 bg-amber-50">
              <span className="text-amber-600">💡</span>
              <p className="text-sm text-amber-800">{m}</p>
            </li>
          ))}
        </ul>
      </Card>

      <Card>
        <CardTitle>Recommended Next Activity</CardTitle>
        <div className="p-4 rounded-lg border border-teal-200 bg-teal-50">
          <p className="text-sm text-teal-800">{dna.recommendedNextActivity}</p>
          <Button variant="outline" size="sm" className="mt-3">
            {tx("student", "start_new")}
          </Button>
        </div>
      </Card>
    </div>
  );
}
