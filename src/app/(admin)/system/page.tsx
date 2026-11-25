"use client";

import * as React from "react";
import { useAuth } from "@/contexts/AuthContext";
import { useTranslation } from "@/lib/i18n";
import { Card, CardTitle } from "@/components/ui/Card";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import { Settings, Activity, ArrowLeft, CheckCircle } from "lucide-react";

export default function AdminSystemPage() {
  const { user } = useAuth();
  const { t: tx } = useTranslation((user?.locale as any) || "en");
  if (!user) return null;

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-3">
        <Button variant="ghost" size="sm" onClick={() => {}}>
          <ArrowLeft className="w-4 h-4" />
          {tx("common", "back")}
        </Button>
        <h1 className="text-2xl font-bold text-navy-900">{tx("admin", "system_status")}</h1>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <Card>
          <CardTitle>{tx("admin", "server_status")}</CardTitle>
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 rounded-full bg-emerald-500" />
              <span className="text-sm font-medium text-emerald-800">Operational</span>
            </div>
            <CheckCircle className="w-6 h-6 text-emerald-600" />
          </div>
        </Card>
        <Card>
          <CardTitle>{tx("admin", "db_status")}</CardTitle>
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 rounded-full bg-emerald-500" />
              <span className="text-sm font-medium text-emerald-800">Connected</span>
            </div>
            <Activity className="w-6 h-6 text-teal-600" />
          </div>
        </Card>
        <Card>
          <CardTitle>{tx("admin", "sync_health")}</CardTitle>
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 rounded-full bg-emerald-500" />
              <span className="text-sm font-medium text-emerald-800">Healthy</span>
            </div>
            <Settings className="w-6 h-6 text-teal-600" />
          </div>
        </Card>
      </div>

      <Card>
        <CardTitle>{tx("admin", "version")}</CardTitle>
        <p className="text-sm text-slate-600">v1.0.0-mvp</p>
      </Card>
    </div>
  );
}

