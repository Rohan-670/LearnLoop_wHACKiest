"use client";

import * as React from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/contexts/AuthContext";
import { MainLayout } from "@/components/layout/MainLayout";

export default function TeacherLayout({ children }: { children: React.ReactNode }) {
  const { user, logout, isLoading, setLocale } = useAuth();
  const router = useRouter();

  React.useEffect(() => {
    if (!isLoading && !user) {
      router.replace("/");
    }
  }, [isLoading, user, router]);

  if (isLoading || !user) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-slate-50">
        <div className="text-slate-500 text-sm">Loading...</div>
      </div>
    );
  }

  return (
    <MainLayout
      role={user.role}
      user={{ name: user.name, email: user.email, locale: user.locale, role: user.role }}
      onLogout={logout}
      onLocaleChange={setLocale}
    >
      {children}
    </MainLayout>
  );
}
