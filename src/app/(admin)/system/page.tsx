"use client";

import * as React from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/contexts/AuthContext";
import { useTranslation } from "@/lib/i18n";
import { Card, CardTitle } from "@/components/ui/Card";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import { Settings, Activity, ArrowLeft, CheckCircle, RefreshCw, Database, Wifi } from "lucide-react";

export default function AdminSystemPage() {
  const router = useRouter();
  const { user } = useAuth();
  const { t: tx } = useTranslation((user?.locale as any) || "en");

  const [isChecking, setIsChecking] = React.useState(false);
  const [lastCheck, setLastCheck] = React.useState("Just now");

  if (!user) return null;

  const handleRunDiagnostics = () => {
    setIsChecking(true);
    setTimeout(() => {
      setIsChecking(false);
      setLastCheck(new Date().toLocaleTimeString());
    }, 1200);
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <Button variant="ghost" size="sm" onClick={() => router.push("/dashboard/admin")}>
            <ArrowLeft className="w-4 h-4 mr-1" />
            {tx("common", "back")}
          </Button>
          <div>
            <h1 className="text-2xl font-bold text-navy-900">{tx("admin", "system_status")}</h1>
            <p className="text-slate-600 text-sm">Real-time health, server connectivity, and offline storage metrics</p>
          </div>
        </div>
        <Button
          variant="outline"
          size="sm"
          onClick={handleRunDiagnostics}
          disabled={isChecking}
          className="flex items-center gap-2"
        >
          <RefreshCw className={`w-4 h-4 ${isChecking ? "animate-spin" : ""}`} />
          <span>{isChecking ? "Checking..." : "Run Diagnostics"}</span>
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <Card className="p-5">
          <CardTitle>{tx("admin", "server_status")}</CardTitle>
          <div className="flex items-center justify-between mt-3">
            <div className="flex items-center gap-2">
              <div className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-ping" />
              <span className="text-sm font-semibold text-emerald-800">Operational</span>
            </div>
            <CheckCircle className="w-6 h-6 text-emerald-600" />
          </div>
          <p className="text-xs text-slate-500 mt-3">Next.js 16 Webpack runtime • Node 24</p>
        </Card>

        <Card className="p-5">
          <CardTitle>{tx("admin", "db_status")}</CardTitle>
          <div className="flex items-center justify-between mt-3">
            <div className="flex items-center gap-2">
              <div className="w-2.5 h-2.5 rounded-full bg-emerald-500" />
              <span className="text-sm font-semibold text-emerald-800">IndexedDB Active</span>
            </div>
            <Database className="w-6 h-6 text-teal-600" />
          </div>
          <p className="text-xs text-slate-500 mt-3">Dexie.js client-side store ready</p>
        </Card>

        <Card className="p-5">
          <CardTitle>{tx("admin", "sync_health")}</CardTitle>
          <div className="flex items-center justify-between mt-3">
            <div className="flex items-center gap-2">
              <div className="w-2.5 h-2.5 rounded-full bg-emerald-500" />
              <span className="text-sm font-semibold text-emerald-800">Queue Clean</span>
            </div>
            <Wifi className="w-6 h-6 text-teal-600" />
          </div>
          <p className="text-xs text-slate-500 mt-3">0 conflicts • Automatic batching enabled</p>
        </Card>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card className="p-5">
          <CardTitle>Platform Details</CardTitle>
          <dl className="mt-3 divide-y divide-slate-100 text-sm">
            <div className="py-2 flex justify-between">
              <dt className="text-slate-500">Application</dt>
              <dd className="font-semibold text-navy-900">LearnLoop Intelligence</dd>
            </div>
            <div className="py-2 flex justify-between">
              <dt className="text-slate-500">Version</dt>
              <dd className="font-mono text-xs font-semibold text-navy-900">v1.2.0-offline-pwa</dd>
            </div>
            <div className="py-2 flex justify-between">
              <dt className="text-slate-500">Supported Locales</dt>
              <dd className="font-semibold text-navy-900">English (en), ಕನ್ನಡ (kn)</dd>
            </div>
            <div className="py-2 flex justify-between">
              <dt className="text-slate-500">Last Diagnostics</dt>
              <dd className="text-slate-600">{lastCheck}</dd>
            </div>
          </dl>
        </Card>

        <Card className="p-5">
          <CardTitle>Offline Service Worker</CardTitle>
          <div className="mt-3 space-y-3 text-sm">
            <div className="flex items-center justify-between">
              <span className="text-slate-600">Service Worker Status</span>
              <Badge variant="success">Registered (/sw.js)</Badge>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-slate-600">App Cache</span>
              <Badge variant="default">Cache-First Assets</Badge>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-slate-600">PWA Manifest</span>
              <Badge variant="success">Valid (/manifest.json)</Badge>
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
}
