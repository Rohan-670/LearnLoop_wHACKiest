"use client";

import * as React from "react";
import { useAuth } from "@/contexts/AuthContext";
import { useTranslation } from "@/lib/i18n";
import { Card, CardTitle } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";
import { Badge } from "@/components/ui/Badge";
import { Users, Activity, ArrowLeft, Clock } from "lucide-react";

export default function TeacherClassesPage() {
  const { user } = useAuth();
  const { t: tx } = useTranslation((user?.locale as any) || "en");
  if (!user) return null;

  const classes = [
    { id: "class-1", name: "Grade 8 Mathematics", students: 24, subject: "Mathematics" },
    { id: "class-2", name: "Grade 7 Science", students: 22, subject: "Science" },
  ];

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-3">
        <Button variant="ghost" size="sm" onClick={() => {}}>
          <ArrowLeft className="w-4 h-4" />
          {tx("common", "back")}
        </Button>
        <h1 className="text-2xl font-bold text-navy-900">{tx("teacher", "my_classes")}</h1>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {classes.map((c) => (
          <Card key={c.id}>
            <div className="p-6">
              <div className="flex items-center justify-between mb-4">
                <div>
                  <h3 className="text-lg font-bold text-navy-900">{c.name}</h3>
                  <p className="text-sm text-slate-500">{c.subject}</p>
                </div>
                <Badge variant="default">{c.students} students</Badge>
              </div>
              <div className="grid grid-cols-3 gap-4 text-center">
                <div>
                  <p className="text-xs text-slate-500">Active Today</p>
                  <p className="text-sm font-bold text-navy-900">{Math.round(c.students * 0.75)}</p>
                </div>
                <div>
                  <p className="text-xs text-slate-500">Weak Concepts</p>
                  <p className="text-sm font-bold text-navy-900">2</p>
                </div>
                <div>
                  <p className="text-xs text-slate-500">Needs Attention</p>
                  <p className="text-sm font-bold text-navy-900">4</p>
                </div>
              </div>
              <Button variant="outline" className="w-full mt-4">
                {tx("teacher", "view_student")}
              </Button>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
}
