"use client";

import * as React from "react";
import { useAuth } from "@/contexts/AuthContext";
import { useTranslation } from "@/lib/i18n";
import { Card, CardTitle } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";
import { Badge } from "@/components/ui/Badge";
import { Activity, ArrowLeft, CheckCircle, AlertCircle } from "lucide-react";
import { useRouter } from "next/navigation";
import { use } from "react";
import { QUESTIONS, detectMisconception } from "@/lib/learning-engine";
import { saveAttemptLocally } from "@/lib/dexie";

interface QuizPageProps {
  params: Promise<{ lessonId: string }>;
}

export default function QuizPage({ params }: QuizPageProps) {
  const { lessonId } = use(params);
  const { user } = useAuth();
  const { t: tx } = useTranslation((user?.locale as any) || "en");
  const router = useRouter();

  const [currentQuestionIndex, setCurrentQuestionIndex] = React.useState(0);
  const [selectedAnswer, setSelectedAnswer] = React.useState<string | null>(null);
  const [submitted, setSubmitted] = React.useState(false);
  const [showFeedback, setShowFeedback] = React.useState(false);
  const [misconception, setMisconception] = React.useState<any>(null);
  const [attempts, setAttempts] = React.useState<any[]>([]);
  if (!user) return null;

  const lessonQuestions = QUESTIONS.filter((q) => q.lessonId === lessonId);
  const currentQuestion = lessonQuestions[currentQuestionIndex];

  const handleSelect = (optionId: string) => {
    setSelectedAnswer(optionId);
  };

  const handleSubmit = () => {
    if (!selectedAnswer) return;

    const question = currentQuestion;
    const option = question.options.find((o) => o.id === selectedAnswer);
    const isCorrect = option?.isCorrect || false;

    let miscResult = null;
    if (!isCorrect) {
      miscResult = detectMisconception(option?.text || "", question.topicId, []);
      setMisconception(miscResult);
    }

    const attempt = {
      id: `attempt-${Date.now()}`,
      userId: user?.id || "demo",
      lessonId,
      questionId: question.id,
      answer: option?.text || "",
      isCorrect,
      misconceptionId: miscResult?.misconception?.id,
      misconceptionConfidence: miscResult?.confidence,
      timeSpentSeconds: 0,
      createdAt: new Date().toISOString(),
      synced: false,
      eventId: `evt-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
      version: 1,
    };

    setAttempts((prev) => [...prev, attempt]);
    saveAttemptLocally(attempt);

    setSubmitted(true);
    setShowFeedback(true);
  };

  const handleNext = () => {
    setSelectedAnswer(null);
    setSubmitted(false);
    setShowFeedback(false);
    setMisconception(null);
    setCurrentQuestionIndex((prev) => prev + 1);
  };

  if (currentQuestionIndex >= lessonQuestions.length) {
    return (
      <div className="space-y-6">
        <div className="text-center py-12">
          <CheckCircle className="w-16 h-16 text-emerald-600 mx-auto mb-4" />
          <h2 className="text-2xl font-bold text-navy-900">{tx("student", "lesson_complete")}</h2>
          <p className="text-slate-600">You've completed all questions in this lesson.</p>
          <Button variant="primary" onClick={() => router.push(`/feedback/${lessonId}`)}>
            {tx("student", "view_learning_dna")}
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <Button variant="ghost" size="sm" onClick={() => router.back()}>
          <ArrowLeft className="w-4 h-4" />
          {tx("common", "back")}
        </Button>
        <div className="text-sm font-medium text-slate-600">
          {tx("student", "question", { index: currentQuestionIndex + 1, total: lessonQuestions.length })}
        </div>
      </div>

      <Card>
        <CardTitle className="text-lg">{currentQuestion.questionText}</CardTitle>
        <div className="mt-6 space-y-3">
          {currentQuestion.options.map((opt) => (
            <Button
              key={opt.id}
              variant="outline"
              className={`w-full text-left justify-start ${selectedAnswer === opt.id ? "bg-teal-50 border-teal-600" : ""}`}
              onClick={() => handleSelect(opt.id)}
              disabled={submitted}
            >
              {opt.text}
            </Button>
          ))}
        </div>
      </Card>

      {submitted && showFeedback && (
        <Card className={misconception ? "border-rose-200 bg-rose-50" : "border-emerald-200 bg-emerald-50"}>
          <div className="p-6">
            <div className="flex items-start gap-3">
              {misconception ? (
                <AlertCircle className="w-6 h-6 text-rose-600 mt-0.5" />
              ) : (
                <CheckCircle className="w-6 h-6 text-emerald-600 mt-0.5" />
              )}
              <div>
                <p className={`font-bold ${misconception ? "text-rose-900" : "text-emerald-900"}`}>
                  {misconception ? tx("student", "incorrect") : tx("student", "correct")}
                </p>
                <p className="text-sm text-slate-600 mt-1">{currentQuestion.explanation}</p>
              </div>
            </div>

            {misconception && (
              <div className="mt-6 pt-6 border-t border-rose-200">
                <h3 className="text-sm font-bold text-rose-900 mb-2">
                  {tx("misconception", "possible_misconception")}
                </h3>
                <p className="text-sm text-rose-700 mb-2">
                  {misconception.misconception.likely_reasoning}
                </p>
                <Badge variant="warning" className="mb-2">
                  {tx("misconception", "confidence_level")}: {(misconception.confidence * 100).toFixed(0)}%
                </Badge>
                <p className="text-sm text-rose-700">
                  {tx("misconception", "correct_explanation")}:{" "}
                  {misconception.misconception.correct_explanation}
                </p>
                <Button
                  variant="outline"
                  size="sm"
                  className="mt-3"
                  onClick={() => {
                    setShowFeedback(false);
                    setMisconception(null);
                  }}
                >
                  {tx("student", "try_again_lesson")}
                </Button>
              </div>
            )}
          </div>
        </Card>
      )}

      {!submitted && (
        <Button variant="primary" onClick={handleSubmit} disabled={!selectedAnswer} className="w-full">
          {tx("student", "submit")}
        </Button>
      )}

      {submitted && !showFeedback && currentQuestionIndex < lessonQuestions.length - 1 && (
        <Button variant="primary" onClick={handleNext} className="w-full">
          {tx("common", "next")}
        </Button>
      )}
    </div>
  );
}
