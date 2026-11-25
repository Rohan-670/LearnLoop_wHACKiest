"use client";

import * as React from "react";
import { useAuth } from "@/contexts/AuthContext";
import { useTranslation } from "@/lib/i18n";
import { Card, CardTitle } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";
import { Badge } from "@/components/ui/Badge";
import { WifiOff, ArrowLeft, Play } from "lucide-react";
import { useRouter } from "next/navigation";
import { use } from "react";
import { LESSONS } from "@/lib/learning-engine";

interface LessonPageProps {
  params: Promise<{ lessonId: string }>;
}

export default function LessonPage({ params }: LessonPageProps) {
  const { lessonId } = use(params);
  const { user } = useAuth();
  const { t: tx } = useTranslation((user?.locale as any) || "en");
  const router = useRouter();
  if (!user) return null;

  const lesson = LESSONS.find((l) => l.id === lessonId) || LESSONS[0];

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-3">
        <Button variant="ghost" size="sm" onClick={() => router.back()}>
          <ArrowLeft className="w-4 h-4" />
          {tx("common", "back")}
        </Button>
        <h1 className="text-2xl font-bold text-navy-900">{lesson.title}</h1>
        <Badge variant="default">{lesson.dataSizeKb} KB</Badge>
      </div>

      <Card>
        <CardTitle>{lesson.title}</CardTitle>
        <p className="text-slate-600 mb-4">{lesson.description}</p>
        <div className="prose prose-slate max-w-none">
          {lesson.content.explanation.split("\n").map((p, i) => (
            <p key={i} className="mb-3 text-slate-700 leading-relaxed">{p}</p>
          ))}
        </div>

        <div className="mt-6 border-t border-slate-200 pt-6">
          <h3 className="text-lg font-bold text-navy-900 mb-3">Worked Examples</h3>
          <div className="space-y-4">
            {lesson.content.workedExamples.map((ex) => (
              <Card key={ex.id} padded={false}>
                <div className="p-6">
                  <p className="text-sm font-medium text-navy-900 mb-2">{ex.problem}</p>
                  <p className="text-sm text-slate-600 mb-2">{ex.solution}</p>
                  <ul className="text-sm text-slate-600 list-disc pl-5 space-y-1">
                    {ex.steps.map((s, i) => (
                      <li key={i}>{s}</li>
                    ))}
                  </ul>
                </div>
              </Card>
            ))}
          </div>
        </div>

        <div className="mt-6">
          <h3 className="text-lg font-bold text-navy-900 mb-3">Practice Now</h3>
          <Button
            variant="primary"
            className="w-full flex items-center justify-center gap-2"
            onClick={() => router.push(`/quiz/${lessonId}`)}
          >
            <Play className="w-4 h-4" />
            {tx("student", "start_new")}
          </Button>
        </div>
      </Card>

      <div className="mt-8 flex items-center gap-2 text-sm text-slate-500">
        <Button variant="ghost" size="sm" onClick={() => {}}>
          <WifiOff className="w-4 h-4 mr-1" />
          {tx("common", "offline")}
        </Button>
      </div>
    </div>
  );
}
