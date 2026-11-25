"use client";

import * as React from "react";
import { useAuth } from "@/contexts/AuthContext";
import { useTranslation } from "@/lib/i18n";
import { Card, CardTitle } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";
import { Badge } from "@/components/ui/Badge";
import { BookOpen, Activity, ArrowLeft } from "lucide-react";

export default function AdminContentPage() {
  const { user } = useAuth();
  const { t: tx } = useTranslation((user?.locale as any) || "en");
  if (!user) return null;

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-navy-900">{tx("admin", "content_management")}</h1>
          <p className="text-slate-600">Manage lessons, questions, and content</p>
        </div>
        <Button variant="primary">{tx("admin", "upload_content")}</Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card>
          <CardTitle>Lessons</CardTitle>
          <p className="text-sm text-slate-600 mb-4">Manage lesson content and versions</p>
          <Button variant="outline" className="w-full">{tx("admin", "manage_content")}</Button>
        </Card>
        <Card>
          <CardTitle>Questions</CardTitle>
          <p className="text-sm text-slate-600 mb-4">Manage question banks and misconception rules</p>
          <Button variant="outline" className="w-full">View Question Bank</Button>
        </Card>
      </div>
    </div>
  );
}

