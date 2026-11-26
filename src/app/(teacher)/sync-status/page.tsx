"use client";

import * as React from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/contexts/AuthContext";
import { useTranslation } from "@/lib/i18n";
import { Card, CardTitle } from "@/components/ui/Card";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import { Activity, ArrowLeft, CheckCircle, Clock, RefreshCw, Wifi } from "lucide-react";

export default function TeacherSyncStatusPage() {
  const router = useRouter();
  const { user } = useAuth();
  const { t: tx } = useTranslation((user?.locale as any) || "en");

  const [isSyncing, setIsSyncing] = React.useState(false);
  const [lastSyncText, setLastSyncText] = React.useState("Just now");

  if (!user) return null;

  const handleSyncAll = () => {
    setIsSyncing(true);
    setTimeout(() => {
      setIsSyncing(false);
      setLastSyncText("Just now");
    }, 1500);
  };

  const syncLogs = [
    { id: "1", student: "Ananya", attempts: 3, time: "2 mins ago", status: "Synced", bytes: "14 KB" },
    { id: "2", student: "Kiran Kumar", attempts: 5, time: "12 mins ago", status: "Synced", bytes: "22 KB" },
    { id: "3", student: "Priya Rao", attempts: 4, time: "18 mins ago", status: "Synced", bytes: "18 KB" },
    { id: "4", student: "Rahul S", attempts: 2, time: "25 mins ago", status: "Synced", bytes: "9 KB" },
  ];

  return (
    <div className="space-y-6 max-w-4xl mx-auto">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <Button variant="ghost" size="sm" onClick={() => router.push("/dashboard/teacher")}>
            <ArrowLeft className="w-4 h-4 mr-1" />
            {tx("common", "back")}
          </Button>
          <div>
            <h1 className="text-2xl font-bold text-navy-900">{tx("teacher", "sync_status")}</h1>
            <p className="text-slate-600 text-sm">Offline classroom hub synchronization & peer batch status</p>
          </div>
        </div>
        <Button
          variant="primary"
          size="sm"
          onClick={handleSyncAll}
          disabled={isSyncing}
          className="flex items-center gap-2"
        >
          <RefreshCw className={`w-4 h-4 ${isSyncing ? "animate-spin" : ""}`} />
          <span>{isSyncing ? "Syncing..." : "Sync Classroom Hub"}</span>
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card className="p-5">
          <CardTitle className="text-sm">{tx("teacher", "all_synced")}</CardTitle>
          <div className="flex items-center justify-between mt-2">
            <div className="text-3xl font-extrabold text-emerald-600">24/24</div>
            <CheckCircle className="w-8 h-8 text-emerald-600" />
          </div>
          <p className="text-xs text-slate-500 mt-2">All student tablet records up to date</p>
        </Card>

        <Card className="p-5">
          <CardTitle className="text-sm">Pending Submissions</CardTitle>
          <div className="flex items-center justify-between mt-2">
            <div className="text-3xl font-extrabold text-teal-600">0</div>
            <Clock className="w-8 h-8 text-teal-600" />
          </div>
          <p className="text-xs text-slate-500 mt-2">Zero unmerged conflict records</p>
        </Card>

        <Card className="p-5">
          <CardTitle className="text-sm">Classroom Hub Status</CardTitle>
          <div className="flex items-center justify-between mt-2">
            <div className="text-sm font-semibold text-slate-700">{lastSyncText}</div>
            <Wifi className="w-8 h-8 text-teal-600" />
          </div>
          <p className="text-xs text-emerald-600 font-semibold mt-2">Local hotspot connection stable</p>
        </Card>
      </div>

      <Card className="p-6">
        <CardTitle className="text-base mb-3">Recent Synchronizations</CardTitle>
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-slate-50 border-b border-slate-200">
              <tr>
                <th className="py-2.5 px-3 font-semibold text-slate-600">Student</th>
                <th className="py-2.5 px-3 font-semibold text-slate-600">Quiz Attempts</th>
                <th className="py-2.5 px-3 font-semibold text-slate-600">Data Transferred</th>
                <th className="py-2.5 px-3 font-semibold text-slate-600">Timestamp</th>
                <th className="py-2.5 px-3 font-semibold text-slate-600 text-right">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {syncLogs.map((log) => (
                <tr key={log.id} className="hover:bg-slate-50">
                  <td className="py-2.5 px-3 font-semibold text-navy-900">{log.student}</td>
                  <td className="py-2.5 px-3">{log.attempts} exercises</td>
                  <td className="py-2.5 px-3 font-mono">{log.bytes}</td>
                  <td className="py-2.5 px-3 text-slate-500">{log.time}</td>
                  <td className="py-2.5 px-3 text-right">
                    <Badge variant="success">{log.status}</Badge>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Card>
    </div>
  );
}
