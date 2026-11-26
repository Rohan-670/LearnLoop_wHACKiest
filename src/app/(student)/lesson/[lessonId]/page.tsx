"use client";

import * as React from "react";
import { useRouter } from "next/navigation";
import { use } from "react";
import { useAuth } from "@/contexts/AuthContext";
import { useTranslation } from "@/lib/i18n";
import { Card, CardTitle } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";
import { Badge } from "@/components/ui/Badge";
import { ArrowLeft, Play, Download, CheckCircle2 } from "lucide-react";
import { LESSONS } from "@/lib/learning-engine";

interface LessonPageProps {
  params: Promise<{ lessonId: string }>;
}

export default function LessonPage({ params }: LessonPageProps) {
  const { lessonId } = use(params);
  const router = useRouter();
  const { user } = useAuth();
  const { t: tx } = useTranslation((user?.locale as any) || "en");

  const [isSavedOffline, setIsSavedOffline] = React.useState(false);

  if (!user) return null;

  const lesson = LESSONS.find((l) => l.id === lessonId) || LESSONS[0];

  const handleSaveOffline = () => {
    setIsSavedOffline(true);
    setTimeout(() => {
      // Keep saved state indicator
    }, 1500);
  };

  return (
    <div className="space-y-6 max-w-4xl mx-auto">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <Button variant="ghost" size="sm" onClick={() => router.back()}>
            <ArrowLeft className="w-4 h-4 mr-1" />
            {tx("common", "back")}
          </Button>
          <div>
            <h1 className="text-2xl font-bold text-navy-900">{lesson.title}</h1>
            <p className="text-slate-500 text-xs">Topic ID: {lesson.topicId}</p>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <Badge variant="default">{lesson.dataSizeKb} KB</Badge>
          <Button
            variant={isSavedOffline ? "outline" : "outline"}
            size="sm"
            onClick={handleSaveOffline}
            className="flex items-center gap-1.5"
          >
            {isSavedOffline ? (
              <>
                <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                <span className="text-emerald-700 font-medium">Cached Offline</span>
              </>
            ) : (
              <>
                <Download className="w-4 h-4" />
                <span>Save Offline</span>
              </>
            )}
          </Button>
        </div>
      </div>

      <Card className="p-6 sm:p-8 space-y-6">
        <div>
          <CardTitle className="text-xl mb-2">{lesson.title}</CardTitle>
          <p className="text-slate-600 text-sm leading-relaxed">{lesson.description}</p>
        </div>

        <div className="p-5 rounded-xl bg-slate-50 border border-slate-200">
          <h2 className="text-base font-bold text-navy-900 mb-3">Core Concept Explanation</h2>
          <div className="space-y-3 text-slate-700 text-sm leading-relaxed">
            {lesson.content.explanation.split("\n").map((p, i) => (
              <p key={i}>{p}</p>
            ))}
          </div>
        </div>

        <div>
          <h2 className="text-lg font-bold text-navy-900 mb-3">Worked Examples</h2>
          <div className="space-y-4">
            {lesson.content.workedExamples.map((ex) => (
              <div key={ex.id} className="p-4 rounded-xl border border-teal-100 bg-teal-50/40">
                <p className="text-sm font-bold text-teal-900 mb-1">Problem: {ex.problem}</p>
                <p className="text-xs font-semibold text-teal-700 mb-2">Solution: {ex.solution}</p>
                <ul className="text-xs text-slate-600 list-disc pl-5 space-y-1">
                  {ex.steps.map((s, i) => (
                    <li key={i}>{s}</li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>

        <div className="pt-4 border-t border-slate-200">
          <Button
            variant="primary"
            size="lg"
            className="w-full flex items-center justify-center gap-2"
            onClick={() => router.push(`/quiz/${lesson.id}`)}
          >
            <Play className="w-5 h-5" />
            <span>Practice with Interactive Quiz</span>
          </Button>
        </div>
      </Card>
    </div>
  );
}
