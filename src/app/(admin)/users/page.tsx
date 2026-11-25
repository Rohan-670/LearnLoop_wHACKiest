"use client";

import * as React from "react";
import { useAuth } from "@/contexts/AuthContext";
import { useTranslation } from "@/lib/i18n";
import { Card, CardTitle } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";
import { Badge } from "@/components/ui/Badge";
import { Users, Activity, ArrowLeft } from "lucide-react";

export default function AdminUsersPage() {
  const { user } = useAuth();
  const { t: tx } = useTranslation((user?.locale as any) || "en");
  if (!user) return null;

  const users = [
    { id: "u-1", name: "Ananya", email: "ananya@example.in", role: "Student", status: "Active" },
    { id: "u-2", name: "Ramesh", email: "ramesh@example.in", role: "Teacher", status: "Active" },
    { id: "u-3", name: "Admin", email: "admin@example.in", role: "Administrator", status: "Active" },
  ];

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-navy-900">{tx("admin", "user_management")}</h1>
          <p className="text-slate-600">Manage platform users and roles</p>
        </div>
        <Button variant="primary">{tx("admin", "create_user")}</Button>
      </div>

      <Card>
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm">
            <thead>
              <tr className="border-b border-slate-200">
                <th className="pb-2 text-slate-500 font-medium">Name</th>
                <th className="pb-2 text-slate-500 font-medium">Email</th>
                <th className="pb-2 text-slate-500 font-medium">Role</th>
                <th className="pb-2 text-slate-500 font-medium">Status</th>
                <th className="pb-2 text-slate-500 font-medium">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {users.map((u) => (
                <tr key={u.id} className="hover:bg-slate-50">
                  <td className="py-3 text-navy-900 font-medium">{u.name}</td>
                  <td className="py-3 text-slate-600">{u.email}</td>
                  <td className="py-3">
                    <Badge variant="default">{u.role}</Badge>
                  </td>
                  <td className="py-3">
                    <Badge variant="success">{u.status}</Badge>
                  </td>
                  <td className="py-3">
                    <Button variant="outline" size="sm">{tx("admin", "edit_user")}</Button>
                    <Button variant="outline" size="sm">{tx("admin", "delete_user")}</Button>
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

