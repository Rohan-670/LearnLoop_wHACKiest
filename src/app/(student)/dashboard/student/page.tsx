"use client";

import * as React from "react";
import { useAuth } from "@/contexts/AuthContext";
import { MainLayout } from "@/components/layout/MainLayout";
import { useTranslation, t, LOCALES } from "@/lib/i18n";
import { Card, CardTitle } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";
import { Badge } from "@/components/ui/Badge";
import {
  LayoutDashboard,
  BookOpen,
  Activity,
  ShieldAlert,
  Download,
  WifiOff,
} from "lucide-react";

export default function StudentDashboard() {
  const { user, logout, setLocale } = useAuth();
  const { t: tx, locale } = useTranslation((user?.locale as any) || "en");
  const [dataMode, setDataMode] = React.useState<"saver" | "balanced" | "rich">("balanced");
  if (!user) return null;

  const stats = [
    { label: tx("student", "mastered"), value: "3", icon: ShieldAlert },
    { label: tx("student", "learning"), value: "2", icon: BookOpen },
    { label: tx("student", "not_started"), value: "1", icon: LayoutDashboard },
  ];

  const weakTopics = [
    { id: "fractions-addition", name: "Addition of Fractions", progress: 45 },
    { id: "equivalent-fractions", name: "Equivalent Fractions", progress: 60 },
  ];

  return (
    <div className="space-y-6">
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-navy-900">{tx("student", "dashboard_title")}</h1>
          <p className="text-slate-600">{tx("student", "greeting", { name: user?.name || "" })}</p>
        </div>
        <div className="flex items-center gap-3">
          <Badge variant={dataMode === "saver" ? "success" : "default"}>
            {dataMode === "saver" ? tx("common", "mode_saver") : dataMode === "balanced" ? tx("common", "mode_balanced") : tx("common", "mode_rich")}
          </Badge>
          <Button variant="outline" size="sm" onClick={() => setDataMode(dataMode === "saver" ? "balanced" : "saver")}>
            {tx("common", "download")}
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {stats.map((s) => (
          <Card key={s.label} padded={true}>
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

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardTitle>{tx("student", "weak_topics")}</CardTitle>
          {weakTopics.length === 0 ? (
            <p className="text-slate-500 text-center py-4">{tx("student", "no_weak_topics")}</p>
          ) : (
            <ul className="space-y-3">
              {weakTopics.map((topic) => (
                <li key={topic.id} className="flex items-center justify-between p-3 rounded-lg border border-slate-100 bg-slate-50">
                  <div>
                    <p className="text-sm font-medium text-navy-900">{topic.name}</p>
                    <div className="w-full h-1.5 mt-2 bg-slate-200 rounded overflow-hidden">
                      <div className={`h-full bg-teal-600`} style={{ width: `${topic.progress}%` }} />
                    </div>
                    <p className="text-xs text-slate-500">{topic.progress}%</p>
                  </div>
                  <Button variant="outline" size="sm">
                    {tx("student", "start_new")}
                  </Button>
                </li>
              ))}
            </ul>
          )}
        </Card>

        <Card>
          <CardTitle>{tx("offline", "title")}</CardTitle>
          <p className="text-sm text-slate-600 mb-4">{tx("offline", "subtitle")}</p>
          <div className="flex items-center gap-3 text-sm">
            <div className="w-2 h-2 rounded-full bg-emerald-500" />
            <span>{tx("student", "works_offline")}</span>
          </div>
          <div className="mt-4 flex items-center gap-3 text-sm">
            <div className="w-2 h-2 rounded-full bg-slate-400" />
            <span id="connection-status">{tx("common", "online")}</span>
          </div>
          <Button variant="outline" className="w-full mt-4" onClick={() => {}}>
            {tx("student", "sync_now")}
          </Button>
        </Card>
      </div>

      <div className="mt-8 flex items-center gap-2 text-sm text-slate-500">
        <span>{t("common", "sign_out")}</span>
        <Button variant="ghost" size="sm" onClick={logout} />
      </div>
    </div>
  );
}
