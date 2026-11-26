"use client";

import * as React from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/contexts/AuthContext";
import { useTranslation } from "@/lib/i18n";
import { Card, CardTitle } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";
import { Badge } from "@/components/ui/Badge";
import { Input } from "@/components/ui/Input";
import { LESSONS, QUESTIONS } from "@/lib/learning-engine";
import { ArrowLeft, BookOpen, HelpCircle, UploadCloud, Search, CheckCircle2 } from "lucide-react";

export default function AdminContentPage() {
  const router = useRouter();
  const { user } = useAuth();
  const { t: tx } = useTranslation((user?.locale as any) || "en");

  const [activeTab, setActiveTab] = React.useState<"lessons" | "questions" | "upload">("lessons");
  const [searchQuery, setSearchQuery] = React.useState("");
  const [uploadSuccess, setUploadSuccess] = React.useState(false);
  const [newTitle, setNewTitle] = React.useState("");

  if (!user) return null;

  const filteredLessons = LESSONS.filter(
    (l) =>
      l.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      l.topicId.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const filteredQuestions = QUESTIONS.filter(
    (q) =>
      q.questionText.toLowerCase().includes(searchQuery.toLowerCase()) ||
      q.topicId.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleSimulateUpload = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newTitle.trim()) return;
    setUploadSuccess(true);
    setNewTitle("");
    setTimeout(() => {
      setUploadSuccess(false);
      setActiveTab("lessons");
    }, 2000);
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <Button variant="ghost" size="sm" onClick={() => router.push("/dashboard/admin")}>
            <ArrowLeft className="w-4 h-4 mr-1" />
            {tx("common", "back")}
          </Button>
          <div>
            <h1 className="text-2xl font-bold text-navy-900">{tx("admin", "content_management")}</h1>
            <p className="text-slate-600 text-sm">Curriculum repository, offline packages, and misconception rule sets</p>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <Button
            variant={activeTab === "upload" ? "primary" : "outline"}
            size="sm"
            onClick={() => setActiveTab("upload")}
            className="flex items-center gap-1.5"
          >
            <UploadCloud className="w-4 h-4" />
            <span>{tx("admin", "upload_content")}</span>
          </Button>
        </div>
      </div>

      {/* Tabs */}
      <div className="flex border-b border-slate-200 gap-4">
        <button
          type="button"
          onClick={() => setActiveTab("lessons")}
          className={`pb-3 text-sm font-semibold flex items-center gap-2 border-b-2 transition-colors ${
            activeTab === "lessons"
              ? "border-teal-600 text-teal-700"
              : "border-transparent text-slate-500 hover:text-slate-800"
          }`}
        >
          <BookOpen className="w-4 h-4" />
          <span>Lessons ({LESSONS.length})</span>
        </button>
        <button
          type="button"
          onClick={() => setActiveTab("questions")}
          className={`pb-3 text-sm font-semibold flex items-center gap-2 border-b-2 transition-colors ${
            activeTab === "questions"
              ? "border-teal-600 text-teal-700"
              : "border-transparent text-slate-500 hover:text-slate-800"
          }`}
        >
          <HelpCircle className="w-4 h-4" />
          <span>Question Bank ({QUESTIONS.length})</span>
        </button>
        <button
          type="button"
          onClick={() => setActiveTab("upload")}
          className={`pb-3 text-sm font-semibold flex items-center gap-2 border-b-2 transition-colors ${
            activeTab === "upload"
              ? "border-teal-600 text-teal-700"
              : "border-transparent text-slate-500 hover:text-slate-800"
          }`}
        >
          <UploadCloud className="w-4 h-4" />
          <span>Upload Content</span>
        </button>
      </div>

      {/* Search Bar for Lessons & Questions */}
      {activeTab !== "upload" && (
        <div className="relative">
          <Search className="w-4 h-4 absolute left-3 top-3 text-slate-400" />
          <input
            type="text"
            placeholder={activeTab === "lessons" ? "Search lessons..." : "Search questions or topics..."}
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-9 pr-4 py-2 border border-slate-200 rounded-lg text-sm bg-white focus:outline-none focus:border-teal-600"
          />
        </div>
      )}

      {/* Tab: Lessons */}
      {activeTab === "lessons" && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {filteredLessons.map((l) => (
            <Card key={l.id} className="p-5 flex flex-col justify-between hover:border-teal-300 transition-all">
              <div>
                <div className="flex items-center justify-between mb-2">
                  <span className="text-xs font-mono px-2 py-0.5 rounded bg-slate-100 text-slate-600">{l.id}</span>
                  <Badge variant="default">{l.dataSizeKb} KB</Badge>
                </div>
                <h2 className="text-lg font-bold text-navy-900">{l.title}</h2>
                <p className="text-sm text-slate-600 mt-1 line-clamp-2">{l.description}</p>
                <div className="mt-3 flex items-center gap-2 text-xs text-slate-500">
                  <span>Topic: <strong>{l.topicId}</strong></span>
                  <span>•</span>
                  <span>Examples: <strong>{l.content.workedExamples.length}</strong></span>
                </div>
              </div>
              <div className="mt-4 pt-3 border-t border-slate-100 flex justify-between items-center">
                <span className="text-xs text-emerald-600 font-medium">Ready for offline sync</span>
                <Button variant="outline" size="sm" onClick={() => router.push(`/lesson/${l.id}`)}>
                  Preview Lesson
                </Button>
              </div>
            </Card>
          ))}
        </div>
      )}

      {/* Tab: Question Bank */}
      {activeTab === "questions" && (
        <div className="space-y-4">
          {filteredQuestions.map((q, idx) => (
            <Card key={q.id} className="p-5">
              <div className="flex items-center justify-between mb-2">
                <span className="text-xs font-semibold text-teal-700">Question #{idx + 1} ({q.id})</span>
                <Badge variant="default">Topic: {q.topicId}</Badge>
              </div>
              <p className="text-base font-semibold text-navy-900 mb-3">{q.questionText}</p>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                {q.options.map((opt) => (
                  <div
                    key={opt.id}
                    className={`p-2.5 rounded-lg border text-sm flex items-center justify-between ${
                      opt.isCorrect
                        ? "bg-emerald-50 border-emerald-300 text-emerald-900 font-medium"
                        : "bg-slate-50 border-slate-200 text-slate-700"
                    }`}
                  >
                    <span>{opt.text}</span>
                    {opt.isCorrect && <span className="text-xs font-bold text-emerald-700">Correct Answer</span>}
                  </div>
                ))}
              </div>
            </Card>
          ))}
        </div>
      )}

      {/* Tab: Upload */}
      {activeTab === "upload" && (
        <Card className="p-6 max-w-xl mx-auto">
          <CardTitle>Upload Offline Lesson Packet</CardTitle>
          <p className="text-sm text-slate-600 mt-1 mb-4">
            Upload new JSON/Markdown lesson files for rural classroom synchronization.
          </p>

          {uploadSuccess ? (
            <div className="p-4 bg-emerald-50 border border-emerald-200 rounded-lg text-emerald-800 text-sm flex items-center gap-2">
              <CheckCircle2 className="w-5 h-5 text-emerald-600" />
              <span>Lesson packet verified, signed, and indexed for offline distribution!</span>
            </div>
          ) : (
            <form onSubmit={handleSimulateUpload} className="space-y-4">
              <Input
                label="Lesson Title"
                placeholder="e.g. Introduction to Decimals"
                value={newTitle}
                onChange={(e) => setNewTitle(e.target.value)}
                required
              />
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1.5">Topic</label>
                <select className="w-full rounded-md border border-slate-200 bg-white px-3 py-2 text-sm text-slate-900 focus:border-teal-600 focus:outline-none">
                  <option value="fractions-addition">Fractions Addition</option>
                  <option value="equivalent-fractions">Equivalent Fractions</option>
                  <option value="decimals">Decimals</option>
                </select>
              </div>
              <div className="border-2 border-dashed border-slate-200 rounded-lg p-6 text-center hover:border-teal-400 cursor-pointer transition-colors">
                <UploadCloud className="w-8 h-8 text-teal-600 mx-auto mb-2" />
                <p className="text-sm font-medium text-slate-700">Drag & drop lesson JSON or click to select</p>
                <p className="text-xs text-slate-400 mt-1">Maximum 500 KB per offline packet</p>
              </div>
              <Button type="submit" variant="primary" className="w-full">
                Upload & Compile Packet
              </Button>
            </form>
          )}
        </Card>
      )}
    </div>
  );
}
