"use client";

import * as React from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/contexts/AuthContext";
import { useTranslation } from "@/lib/i18n";
import { Card } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";
import { Badge } from "@/components/ui/Badge";
import { ArrowLeft, Users, ChevronDown, ChevronUp } from "lucide-react";

interface StudentMember {
  id: string;
  name: string;
  mastery: number;
  status: "Needs Attention" | "On Track" | "Excelling";
}

export default function TeacherClassesPage() {
  const router = useRouter();
  const { user } = useAuth();
  const { t: tx } = useTranslation((user?.locale as any) || "en");

  const [expandedClassId, setExpandedClassId] = React.useState<string | null>("class-1");

  if (!user) return null;

  const classes = [
    {
      id: "class-1",
      name: "Grade 8 Mathematics",
      studentsCount: 24,
      subject: "Mathematics",
      students: [
        { id: "s-1", name: "Ananya", mastery: 65, status: "Needs Attention" as const },
        { id: "s-2", name: "Kiran Kumar", mastery: 82, status: "On Track" as const },
        { id: "s-3", name: "Priya Rao", mastery: 91, status: "Excelling" as const },
        { id: "s-4", name: "Rahul S", mastery: 58, status: "Needs Attention" as const },
      ],
    },
    {
      id: "class-2",
      name: "Grade 7 Science",
      studentsCount: 22,
      subject: "Science",
      students: [
        { id: "s-5", name: "Deepak N", mastery: 74, status: "On Track" as const },
        { id: "s-6", name: "Megha V", mastery: 88, status: "Excelling" as const },
      ],
    },
  ];

  return (
    <div className="space-y-6 max-w-5xl mx-auto">
      <div className="flex items-center gap-3">
        <Button variant="ghost" size="sm" onClick={() => router.push("/dashboard/teacher")}>
          <ArrowLeft className="w-4 h-4 mr-1" />
          {tx("common", "back")}
        </Button>
        <div>
          <h1 className="text-2xl font-bold text-navy-900">{tx("teacher", "my_classes")}</h1>
          <p className="text-slate-600 text-sm">Classroom rosters, mastery distribution, and student progress</p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {classes.map((c) => {
          const isExpanded = expandedClassId === c.id;

          return (
            <Card key={c.id} className="p-6 flex flex-col justify-between">
              <div>
                <div className="flex items-center justify-between mb-4">
                  <div>
                    <h2 className="text-lg font-bold text-navy-900">{c.name}</h2>
                    <p className="text-sm text-slate-500">{c.subject}</p>
                  </div>
                  <Badge variant="default" className="flex items-center gap-1">
                    <Users className="w-3.5 h-3.5" />
                    <span>{c.studentsCount} students</span>
                  </Badge>
                </div>

                <div className="grid grid-cols-3 gap-3 text-center p-3 rounded-xl bg-slate-50 border border-slate-100 mb-4">
                  <div>
                    <p className="text-[11px] font-semibold text-slate-500 uppercase">Active</p>
                    <p className="text-base font-bold text-navy-900">{Math.round(c.studentsCount * 0.75)}</p>
                  </div>
                  <div>
                    <p className="text-[11px] font-semibold text-slate-500 uppercase">Weak Concepts</p>
                    <p className="text-base font-bold text-rose-600">2</p>
                  </div>
                  <div>
                    <p className="text-[11px] font-semibold text-slate-500 uppercase">Needs Attention</p>
                    <p className="text-base font-bold text-amber-600">4</p>
                  </div>
                </div>

                {/* Expanded Student List */}
                {isExpanded && (
                  <div className="space-y-2 pt-2 border-t border-slate-100">
                    <p className="text-xs font-bold text-slate-600 uppercase tracking-wider mb-2">Student Roster</p>
                    {c.students.map((student) => (
                      <div
                        key={student.id}
                        className="flex items-center justify-between p-2 rounded-lg bg-white border border-slate-100 text-xs"
                      >
                        <span className="font-semibold text-navy-900">{student.name}</span>
                        <div className="flex items-center gap-2">
                          <span className="font-mono">{student.mastery}%</span>
                          <Badge
                            variant={
                              student.status === "Excelling"
                                ? "success"
                                : student.status === "On Track"
                                ? "default"
                                : "warning"
                            }
                          >
                            {student.status}
                          </Badge>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>

              <Button
                variant="outline"
                className="w-full mt-4 flex items-center justify-center gap-2"
                onClick={() => setExpandedClassId(isExpanded ? null : c.id)}
              >
                <span>{isExpanded ? "Hide Student Roster" : "View Student Roster"}</span>
                {isExpanded ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
              </Button>
            </Card>
          );
        })}
      </div>
    </div>
  );
}
