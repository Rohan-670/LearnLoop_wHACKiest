"use client";

import * as React from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/contexts/AuthContext";
import { Card, CardTitle } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";
import { Badge } from "@/components/ui/Badge";
import { useTranslation } from "@/lib/i18n";
import { Users, BookOpen, Settings, Activity, ArrowRight, ShieldCheck } from "lucide-react";

export default function AdminDashboard() {
  const router = useRouter();
  const { user, logout } = useAuth();
  const { t: tx } = useTranslation((user?.locale as any) || "en");
  if (!user) return null;

  const stats = [
    { label: tx("admin", "total_users"), value: "150", icon: Users, href: "/users" },
    { label: tx("admin", "total_classes"), value: "12", icon: BookOpen, href: "/content" },
    { label: tx("admin", "total_lessons"), value: "45", icon: Activity, href: "/content" },
    { label: tx("admin", "total_attempts"), value: "1,234", icon: Settings, href: "/system" },
  ];

  return (
    <div className="space-y-6">
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-navy-900">{tx("admin", "dashboard_title")}</h1>
          <p className="text-slate-600">{tx("admin", "platform_activity")}</p>
        </div>
        <div className="flex items-center gap-2">
          <Badge variant="success" className="flex items-center gap-1.5 py-1 px-3">
            <ShieldCheck className="w-3.5 h-3.5" />
            <span>Server: Operational</span>
          </Badge>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {stats.map((s) => (
          <Card key={s.label} className="cursor-pointer hover:border-teal-300 transition-all" onClick={() => router.push(s.href)}>
            <div className="flex items-center justify-between p-4">
              <div>
                <p className="text-sm text-slate-500 font-medium">{s.label}</p>
                <p className="text-2xl font-bold text-navy-900 mt-1">{s.value}</p>
              </div>
              <div className="w-12 h-12 rounded-xl bg-teal-50 flex items-center justify-center text-teal-600">
                <s.icon className="w-6 h-6" />
              </div>
            </div>
          </Card>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <Card className="flex flex-col justify-between p-6">
          <div>
            <div className="w-10 h-10 rounded-lg bg-teal-100 text-teal-700 flex items-center justify-center mb-3">
              <Users className="w-5 h-5" />
            </div>
            <CardTitle>{tx("admin", "user_management")}</CardTitle>
            <p className="text-sm text-slate-600 mt-2 mb-4">
              View registered students, teachers, and admins. Manage roles and permissions.
            </p>
          </div>
          <Button variant="outline" className="w-full flex items-center justify-center gap-2" onClick={() => router.push("/users")}>
            <span>{tx("admin", "user_management")}</span>
            <ArrowRight className="w-4 h-4" />
          </Button>
        </Card>

        <Card className="flex flex-col justify-between p-6">
          <div>
            <div className="w-10 h-10 rounded-lg bg-cyan-100 text-cyan-700 flex items-center justify-center mb-3">
              <BookOpen className="w-5 h-5" />
            </div>
            <CardTitle>{tx("admin", "content_management")}</CardTitle>
            <p className="text-sm text-slate-600 mt-2 mb-4">
              Browse curriculum modules, manage question banks, and upload new offline lesson packets.
            </p>
          </div>
          <Button variant="outline" className="w-full flex items-center justify-center gap-2" onClick={() => router.push("/content")}>
            <span>{tx("admin", "manage_content")}</span>
            <ArrowRight className="w-4 h-4" />
          </Button>
        </Card>

        <Card className="flex flex-col justify-between p-6">
          <div>
            <div className="w-10 h-10 rounded-lg bg-emerald-100 text-emerald-700 flex items-center justify-center mb-3">
              <Activity className="w-5 h-5" />
            </div>
            <CardTitle>{tx("admin", "system_status")}</CardTitle>
            <p className="text-sm text-slate-600 mt-2 mb-4">
              Check database connectivity, offline sync queues, and service worker status.
            </p>
          </div>
          <Button variant="outline" className="w-full flex items-center justify-center gap-2" onClick={() => router.push("/system")}>
            <span>{tx("admin", "system_status")}</span>
            <ArrowRight className="w-4 h-4" />
          </Button>
        </Card>
      </div>

      <div className="flex items-center gap-2 text-sm text-slate-500 mt-6 pt-4 border-t border-slate-200">
        <Button variant="ghost" size="sm" onClick={logout}>
          {tx("common", "sign_out")}
        </Button>
      </div>
    </div>
  );
}
