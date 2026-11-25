"use client";

import * as React from "react";
import { useAuth } from "@/contexts/AuthContext";
import { useTranslation } from "@/lib/i18n";
import { Card, CardTitle } from "@/components/ui/Card";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import { Activity, ArrowLeft, CheckCircle, Clock } from "lucide-react";

export default function TeacherSyncStatusPage() {
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
        <h1 className="text-2xl font-bold text-navy-900">{tx("teacher", "sync_status")}</h1>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card>
          <CardTitle>{tx("teacher", "all_synced")}</CardTitle>
          <div className="flex items-center justify-between">
            <div className="text-2xl font-bold text-emerald-600">24/24</div>
            <CheckCircle className="w-8 h-8 text-emerald-600" />
          </div>
        </Card>
        <Card>
          <CardTitle>{tx("teacher", "pending")}</CardTitle>
          <div className="flex items-center justify-between">
            <div className="text-2xl font-bold text-amber-600">0</div>
            <Clock className="w-8 h-8 text-amber-600" />
          </div>
        </Card>
        <Card>
          <CardTitle>Last Sync</CardTitle>
          <div className="flex items-center justify-between">
            <div className="text-sm text-slate-600">2 minutes ago</div>
            <Activity className="w-8 h-8 text-teal-600" />
          </div>
        </Card>
      </div>

      <div className="mt-8 flex items-center gap-2 text-sm text-slate-500">
        <span>{tx("teacher", "improvement_after")}</span>
      </div>
    </div>
  );
}

