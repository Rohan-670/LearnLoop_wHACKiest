"use client";

import * as React from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/contexts/AuthContext";
import { useTranslation } from "@/lib/i18n";
import { Card } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";
import { Badge } from "@/components/ui/Badge";
import { Input } from "@/components/ui/Input";
import { ArrowLeft, Plus, CheckCircle2 } from "lucide-react";

interface AssignmentItem {
  id: string;
  title: string;
  class: string;
  due: string;
  status: "published" | "draft";
}

export default function TeacherAssignmentsPage() {
  const router = useRouter();
  const { user } = useAuth();
  const { t: tx } = useTranslation((user?.locale as any) || "en");

  const [assignments, setAssignments] = React.useState<AssignmentItem[]>([
    { id: "a-1", title: "Fractions Addition Offline Quiz", class: "Grade 8 Mathematics", due: "2026-12-05", status: "published" },
    { id: "a-2", title: "Equivalent Fractions Manipulatives", class: "Grade 8 Mathematics", due: "2026-12-10", status: "draft" },
  ]);

  const [showCreate, setShowCreate] = React.useState(false);
  const [newTitle, setNewTitle] = React.useState("");
  const [newClass, setNewClass] = React.useState("Grade 8 Mathematics");
  const [newDue, setNewDue] = React.useState("2026-12-15");
  const [notification, setNotification] = React.useState("");

  if (!user) return null;

  const handleCreateAssignment = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newTitle.trim()) return;

    const created: AssignmentItem = {
      id: "a-" + Date.now(),
      title: newTitle.trim(),
      class: newClass,
      due: newDue,
      status: "published",
    };

    setAssignments([created, ...assignments]);
    setNewTitle("");
    setShowCreate(false);
    setNotification(`Assignment "${created.title}" published to ${created.class}!`);
    setTimeout(() => setNotification(""), 3500);
  };

  const toggleStatus = (id: string) => {
    setAssignments(
      assignments.map((a) =>
        a.id === id ? { ...a, status: a.status === "published" ? "draft" : "published" } : a
      )
    );
  };

  return (
    <div className="space-y-6 max-w-4xl mx-auto">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <Button variant="ghost" size="sm" onClick={() => router.push("/dashboard/teacher")}>
            <ArrowLeft className="w-4 h-4 mr-1" />
            {tx("common", "back")}
          </Button>
          <div>
            <h1 className="text-2xl font-bold text-navy-900">{tx("teacher", "assignments")}</h1>
            <p className="text-slate-600 text-sm">Schedule and monitor offline quiz assignments and homework</p>
          </div>
        </div>
        <Button
          variant="primary"
          size="sm"
          onClick={() => setShowCreate(!showCreate)}
          className="flex items-center gap-1.5"
        >
          <Plus className="w-4 h-4" />
          <span>{tx("teacher", "create_quiz")}</span>
        </Button>
      </div>

      {notification && (
        <div className="p-3 bg-emerald-50 border border-emerald-200 text-emerald-800 text-sm rounded-lg flex items-center gap-2">
          <CheckCircle2 className="w-4 h-4 text-emerald-600" />
          <span>{notification}</span>
        </div>
      )}

      {showCreate && (
        <Card className="p-6 border-teal-200 bg-teal-50/50">
          <h2 className="text-lg font-bold text-navy-900 mb-4">Create New Class Assignment</h2>
          <form onSubmit={handleCreateAssignment} className="space-y-4">
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <Input
                label="Assignment Title"
                placeholder="e.g. Decimals Mastery Quiz"
                value={newTitle}
                onChange={(e) => setNewTitle(e.target.value)}
                required
              />
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1.5">Class</label>
                <select
                  value={newClass}
                  onChange={(e) => setNewClass(e.target.value)}
                  className="w-full rounded-md border border-slate-200 bg-white px-3 py-2 text-sm text-slate-900 focus:border-teal-600 focus:outline-none"
                >
                  <option value="Grade 8 Mathematics">Grade 8 Mathematics</option>
                  <option value="Grade 7 Science">Grade 7 Science</option>
                </select>
              </div>
              <Input
                label="Due Date"
                type="date"
                value={newDue}
                onChange={(e) => setNewDue(e.target.value)}
                required
              />
            </div>
            <div className="flex justify-end gap-2">
              <Button type="button" variant="outline" size="sm" onClick={() => setShowCreate(false)}>
                {tx("common", "cancel")}
              </Button>
              <Button type="submit" variant="primary" size="sm">
                Publish Assignment
              </Button>
            </div>
          </form>
        </Card>
      )}

      <div className="space-y-4">
        {assignments.map((a) => (
          <Card key={a.id} className="p-6">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-2">
              <h2 className="font-bold text-navy-900 text-base">{a.title}</h2>
              <button type="button" onClick={() => toggleStatus(a.id)} className="cursor-pointer">
                <Badge variant={a.status === "published" ? "success" : "default"}>
                  {a.status} (click to toggle)
                </Badge>
              </button>
            </div>
            <p className="text-sm text-slate-600">{a.class}</p>
            <p className="text-xs text-slate-500 mt-1">Due date: <strong>{a.due}</strong></p>
          </Card>
        ))}
      </div>
    </div>
  );
}
