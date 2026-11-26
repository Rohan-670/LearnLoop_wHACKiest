"use client";

import * as React from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/contexts/AuthContext";
import { Card, CardTitle } from "@/components/ui/Card";
import { Badge } from "@/components/ui/Badge";
import { useTranslation } from "@/lib/i18n";
import { Button } from "@/components/ui/Button";
import { Users, Clock, ShieldAlert, Activity, CheckCircle2, Bot, ArrowRight } from "lucide-react";

export default function TeacherDashboard() {
  const router = useRouter();
  const { user, logout } = useAuth();
  const { t: tx } = useTranslation((user?.locale as any) || "en");

  const [assignedTopic, setAssignedTopic] = React.useState<string | null>(null);

  if (!user) return null;

  const stats = [
    { label: tx("teacher", "total_students"), value: "24", icon: Users, href: "/classes" },
    { label: tx("teacher", "active_today"), value: "18", icon: Clock, href: "/classes" },
    { label: tx("teacher", "weak_concepts"), value: "3", icon: ShieldAlert, href: "/copilot" },
    { label: tx("teacher", "needs_attention"), value: "5", icon: Activity, href: "/copilot" },
  ];

  const misconceptionGroups = [
    {
      concept: "Equivalent Fractions",
      students: 12,
      commonMistake: "Multiplying numerator and denominator by different values",
      recommendedAction: "Review equivalent fractions with visual fraction models",
      lessonId: "les-002",
    },
    {
      concept: "Fraction Addition",
      students: 8,
      commonMistake: "Adding numerators and denominators independently (1/2 + 1/3 = 2/5)",
      recommendedAction: "Use common denominator visual grid explanation",
      lessonId: "les-001",
    },
  ];

  const handleAssign = (concept: string) => {
    setAssignedTopic(concept);
    setTimeout(() => setAssignedTopic(null), 3000);
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-navy-900">{tx("teacher", "dashboard_title")}</h1>
          <p className="text-slate-600">{tx("teacher", "recent_activity")}</p>
        </div>
        <div className="flex items-center gap-3">
          <Button
            variant="primary"
            size="sm"
            onClick={() => router.push("/copilot")}
            className="flex items-center gap-1.5"
          >
            <Bot className="w-4 h-4" />
            <span>Open AI Copilot</span>
          </Button>
          <Badge variant="success">Classroom Hub Online</Badge>
        </div>
      </div>

      {assignedTopic && (
        <div className="p-3 bg-emerald-50 border border-emerald-200 text-emerald-800 text-sm rounded-lg flex items-center gap-2">
          <CheckCircle2 className="w-4 h-4 text-emerald-600" />
          <span>Remedial lesson for <strong>{assignedTopic}</strong> successfully assigned to struggling students!</span>
        </div>
      )}

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {stats.map((s) => (
          <Card
            key={s.label}
            className="p-4 cursor-pointer hover:border-teal-300 transition-all"
            onClick={() => router.push(s.href)}
          >
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-slate-500">{s.label}</p>
                <p className="text-2xl font-bold text-navy-900 mt-1">{s.value}</p>
              </div>
              <div className="w-12 h-12 rounded-xl bg-teal-50 text-teal-700 flex items-center justify-center">
                <s.icon className="w-6 h-6" />
              </div>
            </div>
          </Card>
        ))}
      </div>

      {/* Misconception Groups */}
      <Card className="p-6">
        <div className="flex items-center justify-between mb-4">
          <div>
            <CardTitle>{tx("teacher", "misconception_groups")}</CardTitle>
            <p className="text-xs text-slate-500 mt-1">
              Grouped automatically by root cognitive mistakes detected during offline quizzes
            </p>
          </div>
          <Button variant="outline" size="sm" onClick={() => router.push("/copilot")}>
            <span>View Copilot Insights</span>
            <ArrowRight className="w-3.5 h-3.5 ml-1" />
          </Button>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm">
            <thead className="bg-slate-50 border-b border-slate-200">
              <tr>
                <th className="py-3 px-4 text-slate-600 font-semibold">{tx("teacher", "concept")}</th>
                <th className="py-3 px-4 text-slate-600 font-semibold">{tx("teacher", "students_count")}</th>
                <th className="py-3 px-4 text-slate-600 font-semibold">{tx("teacher", "common_mistake")}</th>
                <th className="py-3 px-4 text-slate-600 font-semibold text-right">{tx("teacher", "recommended_action")}</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {misconceptionGroups.map((g) => (
                <tr key={g.concept} className="hover:bg-slate-50 transition-colors">
                  <td className="py-3 px-4 font-semibold text-navy-900">{g.concept}</td>
                  <td className="py-3 px-4">
                    <span className="px-2 py-0.5 rounded-full bg-rose-50 text-rose-700 font-bold text-xs">
                      {g.students} students
                    </span>
                  </td>
                  <td className="py-3 px-4 text-slate-600 text-xs max-w-xs">{g.commonMistake}</td>
                  <td className="py-3 px-4 text-right">
                    <Button
                      variant="primary"
                      size="sm"
                      onClick={() => handleAssign(g.concept)}
                      className="text-xs"
                    >
                      {tx("teacher", "assign_lesson")}
                    </Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Card>

      <div className="flex items-center gap-2 text-sm text-slate-500 mt-6 pt-4 border-t border-slate-200">
        <Button variant="ghost" size="sm" onClick={logout}>
          {tx("common", "sign_out")}
        </Button>
      </div>
    </div>
  );
}
