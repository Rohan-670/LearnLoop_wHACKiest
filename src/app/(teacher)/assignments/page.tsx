"use client";

import * as React from "react";
import { useAuth } from "@/contexts/AuthContext";
import { useTranslation } from "@/lib/i18n";
import { Card, CardTitle } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";
import { Badge } from "@/components/ui/Badge";
import { BookOpen, Activity, ArrowLeft, ShieldAlert } from "lucide-react";

export default function TeacherAssignmentsPage() {
  const { user } = useAuth();
  const { t: tx } = useTranslation((user?.locale as any) || "en");
  if (!user) return null;

  const assignments = [
    { id: "a-1", title: "Fractions Practice", class: "Grade 8 Mathematics", due: "2024-01-15", status: "published" },
    { id: "a-2", title: "Equivalent Fractions Quiz", class: "Grade 8 Mathematics", due: "2024-01-20", status: "draft" },
  ];

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-navy-900">{tx("teacher", "assignments")}</h1>
          <p className="text-slate-600">Create and manage lesson assignments</p>
        </div>
        <Button variant="primary">{tx("teacher", "create_quiz")}</Button>
      </div>

      <div className="space-y-4">
        {assignments.map((a) => (
          <Card key={a.id}>
            <div className="p-6">
              <div className="flex items-center justify-between mb-2">
                <h3 className="font-bold text-navy-900">{a.title}</h3>
                <Badge variant={a.status === "published" ? "success" : "default"}>{a.status}</Badge>
              </div>
              <p className="text-sm text-slate-600">{a.class}</p>
              <p className="text-sm text-slate-500">Due: {a.due}</p>
              <Button variant="outline" size="sm" className="mt-3">
                View Details
              </Button>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
}

