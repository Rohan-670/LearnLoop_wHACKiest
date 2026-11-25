"use client";

import * as React from "react";
import { useAuth } from "@/contexts/AuthContext";
import { MainLayout } from "@/components/layout/MainLayout";
import { Card, CardTitle } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";
import { Badge } from "@/components/ui/Badge";
import { useTranslation, t } from "@/lib/i18n";
import { Users, BookOpen, Settings, Activity } from "lucide-react";

export default function AdminDashboard() {
  const { user, logout } = useAuth();
  const { t: tx, locale } = useTranslation((user?.locale as any) || "en");
  if (!user) return null;

  const stats = [
    { label: tx("admin", "total_users"), value: "150", icon: Users },
    { label: tx("admin", "total_classes"), value: "12", icon: BookOpen },
    { label: tx("admin", "total_lessons"), value: "45", icon: Activity },
    { label: tx("admin", "total_attempts"), value: "1,234", icon: Settings },
  ];

  return (
    <div className="space-y-6">
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-navy-900">{tx("admin", "dashboard_title")}</h1>
          <p className="text-slate-600">{tx("admin", "platform_activity")}</p>
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

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <Card>
          <CardTitle>{tx("admin", "user_management")}</CardTitle>
          <Button variant="outline" className="w-full">
            {tx("admin", "create_user")}
          </Button>
        </Card>
        <Card>
          <CardTitle>{tx("admin", "content_management")}</CardTitle>
          <Button variant="outline" className="w-full">
            {tx("admin", "manage_content")}
          </Button>
        </Card>
        <Card>
          <CardTitle>{tx("admin", "system_status")}</CardTitle>
          <Badge variant="success">Operational</Badge>
        </Card>
      </div>

      <div className="flex items-center gap-2 text-sm text-slate-500 mt-6">
        <Button variant="ghost" size="sm" onClick={logout}>
          {t("common", "sign_out")}
        </Button>
      </div>
    </div>
  );
}
