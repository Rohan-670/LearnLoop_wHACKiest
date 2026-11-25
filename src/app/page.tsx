"use client";

import * as React from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/contexts/AuthContext";
import { t, LOCALES, DEFAULT_LOCALE, type Locale } from "@/lib/i18n";
import { Button } from "@/components/ui/Button";
import { Card, CardTitle } from "@/components/ui/Card";
import { Input } from "@/components/ui/Input";

const DEMO_ACCOUNTS = [
  {
    id: "stu-1",
    email: "ananya@example.in",
    name: "Ananya",
    role: "student" as const,
    locale: "kn" as const,
    grade: "8",
  },
  {
    id: "tea-1",
    email: "ramesh@example.in",
    name: "Ramesh Teacher",
    role: "teacher" as const,
    locale: "en" as const,
  },
  {
    id: "adm-1",
    email: "admin@example.in",
    name: "School Admin",
    role: "administrator" as const,
    locale: "en" as const,
  },
];

export default function LoginPage() {
  const router = useRouter();
  const { user, login, isLoading } = useAuth();
  const [email, setEmail] = React.useState("");
  const [locale, setLocale] = React.useState<Locale>(DEFAULT_LOCALE);
  const [error, setError] = React.useState("");
  const [selectedRole, setSelectedRole] = React.useState<"student" | "teacher" | "administrator">("student");

  React.useEffect(() => {
    if (!isLoading && user) {
      if (user.role === "student") router.push("/dashboard/student");
      else if (user.role === "teacher") router.push("/dashboard/teacher");
      else router.push("/dashboard/admin");
    }
  }, [user, isLoading, router]);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    const account = DEMO_ACCOUNTS.find((a) => a.email.toLowerCase() === email.trim().toLowerCase() && a.role === selectedRole);
    if (account) {
      login({ id: account.id, email: account.email, name: account.name, role: account.role, locale: account.locale, is_active: true });
      if (account.role === "student") router.push("/dashboard/student");
      else if (account.role === "teacher") router.push("/dashboard/teacher");
      else router.push("/dashboard/admin");
    } else {
      setError("Invalid credentials for this role. Try clicking one of the demo accounts below.");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-slate-50 px-4">
      <Card className="w-full max-w-md">
        <CardTitle className="text-2xl text-center">{t("auth", "welcome")}</CardTitle>
        <p className="text-sm text-slate-600 text-center mb-6">{t("auth", "welcome_sub")}</p>

        <form onSubmit={handleLogin} className="space-y-4" suppressHydrationWarning>
          <Input
            label={t("auth", "email")}
            type="email"
            value={email}
            onChange={(e) => {
              setEmail(e.target.value);
              setError("");
            }}
            placeholder="ananya@example.in"
            required
            suppressHydrationWarning
          />
          <label className="block text-sm font-medium text-slate-700 mb-2">
            {t("auth", "role_select")}
          </label>
          <div className="grid grid-cols-3 gap-2">
            {(["student", "teacher", "administrator"] as const).map((role) => (
              <Button
                key={role}
                type="button"
                variant={selectedRole === role ? "primary" : "outline"}
                onClick={() => {
                  setSelectedRole(role);
                  setError("");
                }}
                disabled={isLoading}
                suppressHydrationWarning
              >
                {t("auth", role)}
              </Button>
            ))}
          </div>
          <div className="mb-4">
            <label className="block text-sm font-medium text-slate-700 mb-2">{t("common", "language")}</label>
            <select
              value={locale}
              onChange={(e) => setLocale(e.target.value as Locale)}
              className="w-full rounded-md border border-slate-200 bg-white px-3 py-2 text-sm"
              suppressHydrationWarning
            >
              {LOCALES.map((l) => (
                <option key={l} value={l}>
                  {l === "en" ? t("common", "english") : l === "kn" ? t("common", "kannada") : t("common", "hindi")}
                </option>
              ))}
            </select>
          </div>
          <Button type="submit" variant="primary" className="w-full" disabled={isLoading} suppressHydrationWarning>
            {t("auth", "sign_in")}
          </Button>
        </form>

        {error && <p className="mt-3 text-sm text-rose-600 text-center">{error}</p>}

        <div className="mt-6 border-t border-slate-200 pt-4">
          <p className="text-xs text-slate-500 text-center mb-3">{t("auth", "demo_accounts")} (Click to select)</p>
          <div className="space-y-1.5 text-xs">
            {DEMO_ACCOUNTS.map((a) => (
              <div
                key={a.id}
                onClick={() => {
                  setEmail(a.email);
                  setSelectedRole(a.role);
                  setLocale(a.locale);
                  setError("");
                }}
                className="flex items-center justify-between p-2.5 bg-slate-100 hover:bg-slate-200 cursor-pointer rounded transition-colors"
                title={`Click to fill ${a.name}`}
              >
                <div className="flex items-center gap-2">
                  <span className="font-semibold text-slate-800">{a.name}</span>
                  <span className="text-[10px] uppercase tracking-wider px-1.5 py-0.5 rounded bg-white text-slate-600 border border-slate-200">{a.role}</span>
                </div>
                <span className="text-slate-500 font-mono text-[11px]">{a.email}</span>
              </div>
            ))}
          </div>
        </div>

        <p className="mt-6 text-xs text-center text-slate-500">
          {t("auth", "no_account")}
        </p>
      </Card>
    </div>
  );
}
