"use client";

import * as React from "react";
import Link from "next/link";
import { useTranslation, type Locale } from "@/lib/i18n";
import { Button } from "@/components/ui/Button";
import { Badge } from "@/components/ui/Badge";
import { Globe } from "lucide-react";
import { InstallPrompt } from "@/components/shared/InstallPrompt";
import { Logo } from "@/components/ui/Logo";

interface MobileMenuButtonProps {
  onOpen: () => void;
}

export function MobileMenuButton({ onOpen }: MobileMenuButtonProps) {
  return (
    <button
      onClick={onOpen}
      className="lg:hidden p-2 text-slate-500 hover:text-slate-700"
      aria-label="Open menu"
    >
      <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
      </svg>
    </button>
  );
}

interface TopNavProps {
  user: { name: string; role: string; locale?: string };
  onLogout: () => void;
  currentLocale?: string;
  onLocaleChange?: (locale: string) => void;
  onOpenMobileMenu?: () => void;
}

export function TopNav({
  user,
  onLogout,
  currentLocale = "en",
  onLocaleChange,
  onOpenMobileMenu,
}: TopNavProps) {
  const activeLocale = (user.locale || currentLocale) as Locale;
  const { t } = useTranslation(activeLocale);

  return (
    <header className="sticky top-0 z-40 flex h-16 items-center gap-4 border-b border-slate-200 bg-white/95 backdrop-blur px-4 lg:px-6">
      <MobileMenuButton onOpen={onOpenMobileMenu || (() => {})} />
      <Logo size="sm" />

      <div className="ml-auto flex items-center gap-2 sm:gap-3">
        {/* Language Switcher: English and Kannada Only */}
        <div className="flex items-center rounded-lg border border-slate-200 bg-slate-100 p-1 text-xs">
          <Globe className="w-3.5 h-3.5 text-slate-500 ml-1 mr-1.5 hidden sm:inline-block" />
          <button
            type="button"
            onClick={() => onLocaleChange?.("en")}
            className={`px-2.5 py-1 rounded-md font-medium transition-all ${
              activeLocale === "en"
                ? "bg-white text-teal-800 shadow-xs font-bold"
                : "text-slate-600 hover:text-slate-900"
            }`}
            title="English"
          >
            English
          </button>
          <button
            type="button"
            onClick={() => onLocaleChange?.("kn")}
            className={`px-2.5 py-1 rounded-md font-medium transition-all ${
              activeLocale === "kn"
                ? "bg-white text-teal-800 shadow-xs font-bold"
                : "text-slate-600 hover:text-slate-900"
            }`}
            title="ಕನ್ನಡ"
          >
            ಕನ್ನಡ
          </button>
        </div>

        <InstallPrompt locale={activeLocale} className="hidden sm:inline-flex" />

        <Badge variant="default">{user.role}</Badge>
        <Button variant="ghost" onClick={onLogout} className="hidden sm:block">
          {t("common", "sign_out")}
        </Button>
      </div>
    </header>
  );
}
