"use client";

import * as React from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/contexts/AuthContext";
import { useTranslation } from "@/lib/i18n";
import { Card } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";
import { Badge } from "@/components/ui/Badge";
import { ArrowLeft, Bot, CheckCircle2, X, Sparkles } from "lucide-react";

interface Suggestion {
  id: string;
  title: string;
  students: number;
  concept: string;
  misconception: string;
  recommendation: string;
  activity: string;
  followUp: string;
  status: "pending" | "approved" | "dismissed";
}

export default function TeacherCopilotPage() {
  const router = useRouter();
  const { user } = useAuth();
  const { t: tx } = useTranslation((user?.locale as any) || "en");

  const [suggestions, setSuggestions] = React.useState<Suggestion[]>([
    {
      id: "c-1",
      title: "12 students struggling with equivalent fractions",
      students: 12,
      concept: "Equivalent Fractions",
      misconception: "Adding numerator and denominator separately rather than finding common scale",
      recommendation: "Review with visual fraction circles and pizza slice manipulatives",
      activity: "Group activity: Fraction card matching game in pairs",
      followUp: "5-question practice quiz on equivalent fractions",
      status: "pending",
    },
    {
      id: "c-2",
      title: "8 students with fraction addition denominator error",
      students: 8,
      concept: "Fraction Addition",
      misconception: "Independent addition: 1/2 + 1/3 = 2/5",
      recommendation: "Demonstrate area models for common denominator 6",
      activity: "Paper folding exercise: creating common denominator grids",
      followUp: "Adaptive 3-step scaffolded practice",
      status: "pending",
    },
  ]);

  if (!user) return null;

  const handleApprove = (id: string) => {
    setSuggestions(
      suggestions.map((s) => (s.id === id ? { ...s, status: "approved" } : s))
    );
  };

  const handleDismiss = (id: string) => {
    setSuggestions(
      suggestions.map((s) => (s.id === id ? { ...s, status: "dismissed" } : s))
    );
  };

  const activeSuggestions = suggestions.filter((s) => s.status !== "dismissed");

  return (
    <div className="space-y-6 max-w-4xl mx-auto">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <Button variant="ghost" size="sm" onClick={() => router.push("/dashboard/teacher")}>
            <ArrowLeft className="w-4 h-4 mr-1" />
            {tx("common", "back")}
          </Button>
          <div>
            <h1 className="text-2xl font-bold text-navy-900 flex items-center gap-2">
              <Bot className="w-6 h-6 text-teal-600" />
              <span>{tx("teacher", "copilot")}</span>
            </h1>
            <p className="text-slate-600 text-sm">
              Pedagogical assistant: diagnostic insights and targeted interventions for struggling cohorts
            </p>
          </div>
        </div>
        <Badge variant="warning" className="self-start sm:self-auto">
          Teacher Approval Required
        </Badge>
      </div>

      <div className="p-4 bg-amber-50 border border-amber-200 rounded-xl text-amber-900 text-xs flex items-center gap-3">
        <Sparkles className="w-5 h-5 text-amber-600 shrink-0" />
        <span>
          <strong>Pedagogical Safeguard:</strong> {tx("teacher", "ai_note")}. No student receives AI-generated homework without your explicit confirmation.
        </span>
      </div>

      <div className="space-y-4">
        {activeSuggestions.length === 0 ? (
          <Card className="p-8 text-center text-slate-500">
            <CheckCircle2 className="w-12 h-12 text-emerald-600 mx-auto mb-2" />
            <p className="font-semibold text-slate-800">All recommendations reviewed!</p>
            <p className="text-xs text-slate-500 mt-1">Check back after the next classroom quiz sync.</p>
          </Card>
        ) : (
          activeSuggestions.map((s) => (
            <Card
              key={s.id}
              className={`p-6 border transition-all ${
                s.status === "approved"
                  ? "border-emerald-300 bg-emerald-50/50"
                  : "border-slate-200 bg-white"
              }`}
            >
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-4">
                <h2 className="font-bold text-navy-900 text-base">{s.title}</h2>
                <Badge variant={s.status === "approved" ? "success" : "default"}>
                  {s.status === "approved" ? "Approved & Assigned" : `${s.students} students affected`}
                </Badge>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-sm mb-4">
                <div className="p-3 rounded-lg bg-slate-50 border border-slate-100">
                  <p className="text-xs font-semibold text-slate-500 uppercase">Concept</p>
                  <p className="font-medium text-navy-900 mt-0.5">{s.concept}</p>
                </div>
                <div className="p-3 rounded-lg bg-rose-50 border border-rose-100">
                  <p className="text-xs font-semibold text-rose-700 uppercase">Common Misconception</p>
                  <p className="font-medium text-rose-900 mt-0.5 text-xs">{s.misconception}</p>
                </div>
                <div className="p-3 rounded-lg bg-teal-50 border border-teal-100">
                  <p className="text-xs font-semibold text-teal-700 uppercase">Recommended Teaching Action</p>
                  <p className="font-medium text-teal-900 mt-0.5 text-xs">{s.recommendation}</p>
                </div>
                <div className="p-3 rounded-lg bg-cyan-50 border border-cyan-100">
                  <p className="text-xs font-semibold text-cyan-700 uppercase">In-Class Group Activity</p>
                  <p className="font-medium text-cyan-900 mt-0.5 text-xs">{s.activity}</p>
                </div>
              </div>

              {s.status === "approved" ? (
                <div className="flex items-center gap-2 text-emerald-800 text-sm font-semibold pt-2">
                  <CheckCircle2 className="w-5 h-5 text-emerald-600" />
                  <span>Assigned to cohort. Progress will update after their next sync.</span>
                </div>
              ) : (
                <div className="flex items-center gap-3 pt-3 border-t border-slate-100">
                  <Button
                    variant="primary"
                    size="sm"
                    onClick={() => handleApprove(s.id)}
                    className="flex items-center gap-1.5"
                  >
                    <CheckCircle2 className="w-4 h-4" />
                    <span>Approve & Assign</span>
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => handleDismiss(s.id)}
                    className="flex items-center gap-1.5 text-slate-600"
                  >
                    <X className="w-4 h-4" />
                    <span>Dismiss</span>
                  </Button>
                </div>
              )}
            </Card>
          ))
        )}
      </div>
    </div>
  );
}
