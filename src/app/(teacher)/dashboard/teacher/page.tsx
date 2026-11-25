"use client";

import * as React from "react";
import { useAuth } from "@/contexts/AuthContext";
import { MainLayout } from "@/components/layout/MainLayout";
import { Card, CardTitle } from "@/components/ui/Card";
import { Badge } from "@/components/ui/Badge";
import { useTranslation, t, LOCALES } from "@/lib/i18n";
import { Button } from "@/components/ui/Button";
import { Users, BookOpen, Activity, ShieldAlert, WifiOff, Clock } from "lucide-react";

export default function TeacherDashboard() {
  const { user, logout } = useAuth();
  const { t: tx, locale } = useTranslation((user?.locale as any) || "en");
  if (!user) return null;

  const stats = [
    { label: tx("teacher", "total_students"), value: "24", icon: Users },
    { label: tx("teacher", "active_today"), value: "18", icon: Clock },
    { label: tx("teacher", "weak_concepts"), value: "3", icon: ShieldAlert },
    { label: tx("teacher", "needs_attention"), value: "5", icon: Activity },
  ];

  const misconceptionGroups = [
    {
      concept: "Equivalent Fractions",
      students: 12,
      commonMistake: "Multiplying both numerator and denominator by different numbers",
      recommendedAction: "Review equivalent fractions with visual models",
    },
    {
      concept: "Fraction Addition",
      students: 8,
      commonMistake: "Adding numerators and denominators independently",
      recommendedAction: "Use common denominator visual explanation",
    },
  ];

  return (
    <div className="space-y-6">
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-navy-900">{tx("teacher", "dashboard_title")}</h1>
          <p className="text-slate-600">{tx("teacher", "recent_activity")}</p>
        </div>
        <div className="flex items-end gap-3">
          <Badge variant="default">
            {tx("common", "online")}
          </Badge>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {stats.map((s) => (
          <Card key={s.label}>
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-slate-500">{s.label}</p>
                <p className="text-2xl font-bold text-navy-900">{s.value}</p>
              </div>
              <s.icon className="w-8 h-8 text-teal-600" />
            </div>
          </Card>
        ))}
      </div>

      <Card>
        <CardTitle>{tx("teacher", "misconception_groups")}</CardTitle>
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm">
            <thead>
              <tr className="border-b border-slate-200">
                <th className="pb-2 text-slate-500 font-medium">{tx("teacher", "concept")}</th>
                <th className="pb-2 text-slate-500 font-medium">{tx("teacher", "students_count")}</th>
                <th className="pb-2 text-slate-500 font-medium">{tx("teacher", "common_mistake")}</th>
                <th className="pb-2 text-slate-500 font-medium">{tx("teacher", "recommended_action")}</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {misconceptionGroups.map((g) => (
                <tr key={g.concept} className="hover:bg-slate-50">
                  <td className="py-3 text-navy-900 font-medium">{g.concept}</td>
                  <td className="py-3">{g.students}</td>
                  <td className="py-3 text-slate-600">{g.commonMistake}</td>
                  <td className="py-3">
                    <Button variant="outline" size="sm">{tx("teacher", "assign_lesson")}</Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Card>

      <div className="flex items-center gap-2 text-sm text-slate-500 mt-6">
        <Button variant="ghost" size="sm" onClick={logout}>
          {t("common", "sign_out")}
        </Button>
      </div>
    </div>
  );
}
