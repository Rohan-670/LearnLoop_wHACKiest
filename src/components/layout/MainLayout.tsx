"use client";

import * as React from "react";
import { Sidebar } from "@/components/layout/Sidebar";
import { TopNav } from "@/components/layout/TopNav";

interface MainLayoutProps {
  children: React.ReactNode;
  role: string;
  user: { name: string; email: string; locale: string; role: string };
  onLogout: () => void;
  onLocaleChange: (locale: string) => void;
}

export function MainLayout({
  children,
  role,
  user,
  onLogout,
  onLocaleChange,
}: MainLayoutProps) {
  const [sidebarOpen, setSidebarOpen] = React.useState(false);

  return (
    <div className="min-h-screen bg-slate-50">
      <TopNav
        user={user}
        onLogout={onLogout}
        currentLocale={user.locale}
        onLocaleChange={onLocaleChange}
        onOpenMobileMenu={() => setSidebarOpen(true)}
      />
      <div className="flex">
        <Sidebar
          role={role}
          user={user}
          onLogout={onLogout}
          onLocaleChange={onLocaleChange}
          isOpen={sidebarOpen}
          onClose={() => setSidebarOpen(false)}
        />
        <div className="flex-1">
          {children}
        </div>
      </div>
    </div>
  );
}
