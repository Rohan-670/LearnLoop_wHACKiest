"use client";

import * as React from "react";
import { useAuth } from "@/contexts/AuthContext";
import { useTranslation } from "@/lib/i18n";
import { Card, CardTitle } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";
import { Badge } from "@/components/ui/Badge";
import { ShieldAlert, Activity, ArrowLeft, Bot } from "lucide-react";

export default function TeacherCopilotPage() {
  const { user } = useAuth();
  const { t: tx } = useTranslation((user?.locale as any) || "en");
  if (!user) return null;

  const suggestions = [
    {
      id: "c-1",
      title: "12 students struggling with equivalent fractions",
      students: 12,
      concept: "Equivalent Fractions",
      misconception: "Adding numerator and denominator separately",
      recommendation: "Review with visual fraction circles",
      activity: "Group activity: fraction matching game",
      followUp: "5-question quiz on equivalent fractions",
      aiGenerated: true,
    },
  ];

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-3">
        <h1 className="text-2xl font-bold text-navy-900">{tx("teacher", "copilot")}</h1>
        <Badge variant="default">{tx("common", "online")}</Badge>
      </div>

      <p className="text-sm text-slate-600">
        {tx("teacher", "ai_note")}
      </p>

      <div className="space-y-4">
        {suggestions.map((s) => (
          <Card key={s.id} className={s.aiGenerated ? "border-amber-200 bg-amber-50" : "border-slate-200"}>
            <div className="p-6">
              <div className="flex items-center justify-between mb-3">
                <h3 className="font-bold text-navy-900">{s.title}</h3>
                <Badge variant="default">{s.students} students</Badge>
              </div>
              <div className="space-y-3 text-sm">
                <p><strong>Concept:</strong> {s.concept}</p>
                <p><strong>Common Misconception:</strong> {s.misconception}</p>
                <p><strong>Recommended Activity:</strong> {s.recommendation}</p>
                <p><strong>Group Activity:</strong> {s.activity}</p>
                <p><strong>Follow-up:</strong> {s.followUp}</p>
              </div>
              <div className="mt-4 flex gap-2">
                {s.aiGenerated && (
                  <Badge variant="warning" className="text-xs">AI-suggested — approval required</Badge>
                )}
                <Button variant="outline" size="sm">Approve</Button>
                <Button variant="ghost" size="sm">Dismiss</Button>
              </div>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
}

