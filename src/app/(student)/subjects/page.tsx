"use client";

import * as React from "react";
import { useAuth } from "@/contexts/AuthContext";
import { useTranslation, t, LOCALES } from "@/lib/i18n";
import { Card, CardTitle } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";
import { Badge } from "@/components/ui/Badge";
import { BookOpen, Activity, WifiOff, Download } from "lucide-react";
import { SUBJECTS, TOPICS, LESSONS } from "@/lib/learning-engine";
import Link from "next/link";

export default function SubjectsPage() {
  const { user } = useAuth();
  const { t: tx, locale } = useTranslation((user?.locale as any) || "en");
  if (!user) return null;

  return (
    <div className="space-y-6">
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-navy-900">{tx("student", "dashboard_title")}</h1>
          <p className="text-slate-600">{tx("student", "greeting", { name: user?.name || "" })}</p>
        </div>
        <div className="flex items-end gap-2">
          <Badge variant="default">{tx("common", "online")}</Badge>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {SUBJECTS.map((subject) => {
          const subjectTopics = TOPICS.filter((t) => t.subjectId === subject.id);
          const subjectLessons = LESSONS.filter((l) => subjectTopics.some((t) => t.id === l.topicId));
          return (
            <Card key={subject.id} onClick={() => {}}>
              <div className="p-6">
                <div className="w-12 h-12 rounded-xl bg-teal-100 flex items-center justify-center text-teal-600 font-bold text-xl mb-4">
                  {subject.code.charAt(0)}
                </div>
                <h3 className="text-lg font-bold text-navy-900 mb-2">{subject.name}</h3>
                <p className="text-sm text-slate-600 mb-4">{subject.description}</p>
                <div className="flex items-center justify-between">
                  <span className="text-xs font-medium text-slate-500">{subjectTopics.length} topics</span>
                  <Badge variant="default">{subjectLessons.length} lessons</Badge>
                </div>
              </div>
            </Card>
          );
        })}
      </div>

      <div className="mt-8">
        <h2 className="text-lg font-bold text-navy-900 mb-4">{tx("student", "weak_topics")}</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {[
            { id: "fractions-addition", name: "Addition of Fractions", progress: 45, size: 45 },
            { id: "equivalent-fractions", name: "Equivalent Fractions", progress: 60, size: 38 },
          ].map((topic) => (
            <Card key={topic.id}>
              <div className="p-6">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="font-bold text-navy-900">{topic.name}</h3>
                  <Badge variant="default">{topic.progress}%</Badge>
                </div>
                <div className="w-full h-2 bg-slate-200 rounded overflow-hidden mb-3">
                  <div className={`h-full bg-teal-600`} style={{ width: `${topic.progress}%` }} />
                </div>
                <div className="flex items-center justify-between text-xs text-slate-500">
                  <span>{tx("common", "estimated_size")}: {topic.size} KB</span>
                  <span id={`cached-${topic.id}`}>{tx("common", "downloaded")}</span>
                </div>
                <Button
                  variant="outline"
                  size="sm"
                  className="w-full"
                  onClick={() => {}}
                >
                  {tx("student", "start_new")}
                </Button>
              </div>
            </Card>
          ))}
        </div>
      </div>

      <div className="mt-8 flex items-center gap-2 text-sm text-slate-500">
        <Button variant="ghost" size="sm" onClick={() => {}}>
          <Download className="w-4 h-4 mr-1" />
          {tx("common", "download")}
        </Button>
      </div>
    </div>
  );
}
