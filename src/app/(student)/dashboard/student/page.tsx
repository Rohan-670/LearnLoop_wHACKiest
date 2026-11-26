"use client";

import * as React from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/contexts/AuthContext";
import { useTranslation } from "@/lib/i18n";
import { Card, CardTitle } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";
import { Badge } from "@/components/ui/Badge";
import {
  LayoutDashboard,
  BookOpen,
  ShieldAlert,
  ArrowRight,
  RefreshCw,
  CheckCircle2,
  Sparkles,
} from "lucide-react";

export default function StudentDashboard() {
  const router = useRouter();
  const { user, logout } = useAuth();
  const { t: tx } = useTranslation((user?.locale as any) || "en");
  const [dataMode, setDataMode] = React.useState<"saver" | "balanced" | "rich">("balanced");
  const [syncState, setSyncState] = React.useState<"idle" | "syncing" | "synced">("idle");

  if (!user) return null;

  const stats = [
    { label: tx("student", "mastered"), value: "3", icon: ShieldAlert, color: "text-emerald-600 bg-emerald-50" },
    { label: tx("student", "learning"), value: "2", icon: BookOpen, color: "text-teal-600 bg-teal-50" },
    { label: tx("student", "not_started"), value: "1", icon: LayoutDashboard, color: "text-amber-600 bg-amber-50" },
  ];

  const weakTopics = [
    { id: "fractions-addition", name: "Addition of Fractions", progress: 45, lessonId: "les-001" },
    { id: "equivalent-fractions", name: "Equivalent Fractions", progress: 60, lessonId: "les-002" },
  ];

  const handleSyncNow = () => {
    setSyncState("syncing");
    setTimeout(() => {
      setSyncState("synced");
      setTimeout(() => setSyncState("idle"), 4000);
    }, 1200);
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-navy-900">{tx("student", "dashboard_title")}</h1>
          <p className="text-slate-600">{tx("student", "greeting", { name: user?.name || "Student" })}</p>
        </div>
        <div className="flex items-center gap-3">
          <Badge variant={dataMode === "saver" ? "success" : "default"}>
            {dataMode === "saver" ? tx("common", "mode_saver") : dataMode === "balanced" ? tx("common", "mode_balanced") : tx("common", "mode_rich")}
          </Badge>
          <Button
            variant="outline"
            size="sm"
            onClick={() => setDataMode(dataMode === "saver" ? "balanced" : "saver")}
            title="Toggle data saving mode"
          >
            {dataMode === "saver" ? "Switch to Balanced" : "Switch to Saver Mode"}
          </Button>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {stats.map((s) => (
          <Card key={s.label} className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-slate-500">{s.label}</p>
                <p className="text-2xl font-bold text-navy-900 mt-1">{s.value}</p>
              </div>
              <div className={`w-12 h-12 rounded-xl flex items-center justify-center ${s.color}`}>
                <s.icon className="w-6 h-6" />
              </div>
            </div>
          </Card>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Topics to Practice */}
        <Card className="p-6">
          <div className="flex items-center justify-between mb-4">
            <CardTitle>{tx("student", "weak_topics")}</CardTitle>
            <Button variant="ghost" size="sm" onClick={() => router.push("/subjects")} className="text-xs text-teal-700">
              <span>View All</span>
              <ArrowRight className="w-3.5 h-3.5 ml-1" />
            </Button>
          </div>
          {weakTopics.length === 0 ? (
            <p className="text-slate-500 text-center py-4">{tx("student", "no_weak_topics")}</p>
          ) : (
            <ul className="space-y-3">
              {weakTopics.map((topic) => (
                <li
                  key={topic.id}
                  className="flex items-center justify-between p-3.5 rounded-lg border border-slate-200 bg-slate-50 hover:bg-slate-100 transition-colors"
                >
                  <div className="flex-1 pr-4">
                    <p className="text-sm font-semibold text-navy-900">{topic.name}</p>
                    <div className="w-full h-2 mt-2 bg-slate-200 rounded-full overflow-hidden">
                      <div className="h-full bg-teal-600 rounded-full transition-all" style={{ width: `${topic.progress}%` }} />
                    </div>
                    <p className="text-xs text-slate-500 mt-1">{topic.progress}% mastery</p>
                  </div>
                  <Button
                    variant="primary"
                    size="sm"
                    onClick={() => router.push(`/lesson/${topic.lessonId}`)}
                    className="shrink-0"
                  >
                    {tx("student", "resume_lesson")}
                  </Button>
                </li>
              ))}
            </ul>
          )}
        </Card>

        {/* Offline & Sync Status */}
        <Card className="p-6 flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between mb-2">
              <CardTitle>{tx("offline", "title")}</CardTitle>
              <Badge variant="success">Offline Ready</Badge>
            </div>
            <p className="text-sm text-slate-600 mb-4">{tx("offline", "subtitle")}</p>
            <div className="space-y-2.5 text-sm">
              <div className="flex items-center gap-2.5">
                <div className="w-2.5 h-2.5 rounded-full bg-emerald-500" />
                <span className="text-slate-700">{tx("student", "works_offline")}</span>
              </div>
              <div className="flex items-center gap-2.5">
                <div className="w-2.5 h-2.5 rounded-full bg-teal-500" />
                <span className="text-slate-700">Dexie IndexedDB active for answers & quizzes</span>
              </div>
            </div>
          </div>

          <div className="mt-6 pt-4 border-t border-slate-100">
            {syncState === "synced" ? (
              <div className="p-2.5 bg-emerald-50 border border-emerald-200 rounded-lg text-emerald-800 text-xs flex items-center justify-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                <span>All offline quiz attempts synced successfully!</span>
              </div>
            ) : (
              <Button
                variant="outline"
                className="w-full flex items-center justify-center gap-2"
                onClick={handleSyncNow}
                disabled={syncState === "syncing"}
              >
                <RefreshCw className={`w-4 h-4 ${syncState === "syncing" ? "animate-spin text-teal-600" : ""}`} />
                <span>{syncState === "syncing" ? "Syncing attempts..." : tx("student", "sync_now")}</span>
              </Button>
            )}
          </div>
        </Card>
      </div>

      {/* Quick Access to Learning DNA */}
      <Card className="p-6 bg-gradient-to-r from-teal-500/10 via-cyan-500/10 to-transparent border-teal-200">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="flex items-start gap-3">
            <div className="p-2.5 rounded-xl bg-teal-600 text-white shrink-0 mt-0.5">
              <Sparkles className="w-5 h-5" />
            </div>
            <div>
              <h3 className="font-bold text-navy-900 text-base">{tx("student", "view_learning_dna")}</h3>
              <p className="text-sm text-slate-600">
                Transparent view into your mastery trends, misconception detection, and AI recommendations.
              </p>
            </div>
          </div>
          <Button variant="primary" size="sm" onClick={() => router.push("/learning-dna")}>
            {tx("student", "view_learning_dna")}
          </Button>
        </div>
      </Card>

      <div className="mt-8 flex items-center gap-2 text-sm text-slate-500 pt-4 border-t border-slate-200">
        <Button variant="ghost" size="sm" onClick={logout}>
          {tx("common", "sign_out")}
        </Button>
      </div>
    </div>
  );
}
