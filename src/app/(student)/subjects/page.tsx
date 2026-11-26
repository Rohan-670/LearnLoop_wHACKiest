"use client";

import * as React from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/contexts/AuthContext";
import { useTranslation } from "@/lib/i18n";
import { Card } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";
import { Badge } from "@/components/ui/Badge";
import { BookOpen, ArrowRight, ArrowLeft, Play, CheckCircle2 } from "lucide-react";
import { SUBJECTS, TOPICS, LESSONS } from "@/lib/learning-engine";

export default function SubjectsPage() {
  const router = useRouter();
  const { user } = useAuth();
  const { t: tx } = useTranslation((user?.locale as any) || "en");

  const [selectedSubjectId, setSelectedSubjectId] = React.useState<string>(SUBJECTS[0]?.id || "sub-1");

  if (!user) return null;

  const currentSubject = SUBJECTS.find((s) => s.id === selectedSubjectId) || SUBJECTS[0];
  const subjectTopics = TOPICS.filter((t) => t.subjectId === currentSubject.id);
  const subjectLessons = LESSONS.filter((l) => subjectTopics.some((t) => t.id === l.topicId));

  return (
    <div className="space-y-6">
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <Button variant="ghost" size="sm" onClick={() => router.push("/dashboard/student")}>
            <ArrowLeft className="w-4 h-4 mr-1" />
            {tx("common", "back")}
          </Button>
          <div>
            <h1 className="text-2xl font-bold text-navy-900">{tx("nav", "subjects")}</h1>
            <p className="text-slate-600 text-sm">Choose a subject to explore topics and interactive offline lessons</p>
          </div>
        </div>
      </div>

      {/* Subject Selector Tabs */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {SUBJECTS.map((subject) => {
          const isSelected = subject.id === selectedSubjectId;
          const sTopics = TOPICS.filter((t) => t.subjectId === subject.id);
          const sLessons = LESSONS.filter((l) => sTopics.some((t) => t.id === l.topicId));

          return (
            <Card
              key={subject.id}
              onClick={() => setSelectedSubjectId(subject.id)}
              className={`p-5 cursor-pointer transition-all border-2 ${
                isSelected ? "border-teal-600 bg-teal-50/40 shadow-sm" : "border-slate-200 hover:border-slate-300"
              }`}
            >
              <div className="flex items-center gap-3 mb-3">
                <div
                  className={`w-12 h-12 rounded-xl flex items-center justify-center font-bold text-lg ${
                    isSelected ? "bg-teal-600 text-white" : "bg-teal-100 text-teal-700"
                  }`}
                >
                  {subject.code.charAt(0)}
                </div>
                <div>
                  <h2 className="text-base font-bold text-navy-900">{subject.name}</h2>
                  <span className="text-xs text-slate-500">{subject.code}</span>
                </div>
              </div>
              <p className="text-xs text-slate-600 line-clamp-2 mb-3">{subject.description}</p>
              <div className="flex items-center justify-between text-xs text-slate-500 pt-2 border-t border-slate-100">
                <span>{sTopics.length} topics</span>
                <Badge variant={isSelected ? "success" : "default"}>{sLessons.length} lessons</Badge>
              </div>
            </Card>
          );
        })}
      </div>

      {/* Lessons List for Current Subject */}
      <div className="space-y-4 pt-2">
        <div className="flex items-center justify-between">
          <h2 className="text-lg font-bold text-navy-900 flex items-center gap-2">
            <BookOpen className="w-5 h-5 text-teal-600" />
            <span>Lessons in {currentSubject.name}</span>
          </h2>
          <span className="text-xs text-slate-500">{subjectLessons.length} lessons available</span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {subjectLessons.map((lesson) => (
            <Card key={lesson.id} className="p-5 flex flex-col justify-between hover:border-teal-300 transition-all">
              <div>
                <div className="flex items-center justify-between mb-2">
                  <span className="text-xs font-semibold px-2 py-0.5 rounded bg-teal-50 text-teal-700 border border-teal-200">
                    Topic: {lesson.topicId}
                  </span>
                  <Badge variant="default">{lesson.dataSizeKb} KB (Offline Ready)</Badge>
                </div>
                <h3 className="text-base font-bold text-navy-900 mt-1">{lesson.title}</h3>
                <p className="text-sm text-slate-600 mt-1 mb-4">{lesson.description}</p>
              </div>

              <div className="pt-3 border-t border-slate-100 flex items-center justify-between gap-2">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => router.push(`/lesson/${lesson.id}`)}
                  className="flex items-center gap-1.5"
                >
                  <BookOpen className="w-3.5 h-3.5" />
                  <span>Read Lesson</span>
                </Button>
                <Button
                  variant="primary"
                  size="sm"
                  onClick={() => router.push(`/quiz/${lesson.id}`)}
                  className="flex items-center gap-1.5"
                >
                  <Play className="w-3.5 h-3.5" />
                  <span>Take Quiz</span>
                </Button>
              </div>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
}
