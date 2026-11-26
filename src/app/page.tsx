"use client";

import * as React from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/contexts/AuthContext";
import { useTranslation, type Locale, DEFAULT_LOCALE } from "@/lib/i18n";
import { Button } from "@/components/ui/Button";
import { Card, CardTitle } from "@/components/ui/Card";
import { Input } from "@/components/ui/Input";
import { Globe } from "lucide-react";
import { Logo } from "@/components/ui/Logo";

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

  const { t: tx } = useTranslation(locale);

  React.useEffect(() => {
    if (!isLoading && user) {
      if (user.role === "student") router.push("/dashboard/student");
      else if (user.role === "teacher") router.push("/dashboard/teacher");
      else router.push("/dashboard/admin");
    }
  }, [user, isLoading, router]);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    const account = DEMO_ACCOUNTS.find(
      (a) => a.email.toLowerCase() === email.trim().toLowerCase() && a.role === selectedRole
    );
    if (account) {
      login({
        id: account.id,
        email: account.email,
        name: account.name,
        role: account.role,
        locale: locale || account.locale,
        is_active: true,
      });
      if (account.role === "student") router.push("/dashboard/student");
      else if (account.role === "teacher") router.push("/dashboard/teacher");
      else router.push("/dashboard/admin");
    } else {
      setError(
        locale === "kn"
          ? "ಈ ಪಾತ್ರಕ್ಕಾಗಿ ರುಜುವಾತುಗಳು ತಪ್ಪಾಗಿದೆ. ದಯವಿಟ್ಟು ಡೆಮೊ ಖಾತೆಯನ್ನು ಪ್ರಯತ್ನಿಸಿ."
          : "Invalid credentials for this role. Try clicking one of the demo accounts below."
      );
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-slate-50 px-4 py-8">
      <Card className="w-full max-w-md">
        {/* Top Language Toggle */}
        <div className="flex justify-end mb-2">
          <div className="inline-flex items-center rounded-lg border border-slate-200 bg-slate-100 p-0.5 text-xs font-semibold">
            <Globe className="w-3.5 h-3.5 text-slate-500 ml-1.5 mr-1" />
            <button
              type="button"
              onClick={() => setLocale("en")}
              className={`px-2.5 py-1 rounded-md transition-all ${
                locale === "en"
                  ? "bg-white text-teal-800 shadow-xs font-bold"
                  : "text-slate-600 hover:text-slate-900"
              }`}
            >
              English
            </button>
            <button
              type="button"
              onClick={() => setLocale("kn")}
              className={`px-2.5 py-1 rounded-md transition-all ${
                locale === "kn"
                  ? "bg-white text-teal-800 shadow-xs font-bold"
                  : "text-slate-600 hover:text-slate-900"
              }`}
            >
              ಕನ್ನಡ
            </button>
          </div>
        </div>

        <div className="flex justify-center mb-4">
          <Logo size="lg" />
        </div>

        <CardTitle className="text-2xl text-center">{tx("auth", "welcome")}</CardTitle>
        <p className="text-sm text-slate-600 text-center mb-6">{tx("auth", "welcome_sub")}</p>

        <form onSubmit={handleLogin} className="space-y-4" suppressHydrationWarning>
          <Input
            label={tx("auth", "email")}
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
            {tx("auth", "role_select")}
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
                {tx("auth", role)}
              </Button>
            ))}
          </div>

          <div className="mb-4">
            <label className="block text-sm font-medium text-slate-700 mb-2">
              {tx("common", "language")}
            </label>
            <div className="grid grid-cols-2 gap-2 p-1 bg-slate-100 rounded-lg border border-slate-200">
              <button
                type="button"
                onClick={() => setLocale("en")}
                className={`py-2 px-3 text-xs font-medium rounded-md transition-all text-center ${
                  locale === "en"
                    ? "bg-white text-teal-800 shadow-xs font-bold"
                    : "text-slate-600 hover:text-slate-900"
                }`}
              >
                English
              </button>
              <button
                type="button"
                onClick={() => setLocale("kn")}
                className={`py-2 px-3 text-xs font-medium rounded-md transition-all text-center ${
                  locale === "kn"
                    ? "bg-white text-teal-800 shadow-xs font-bold"
                    : "text-slate-600 hover:text-slate-900"
                }`}
              >
                ಕನ್ನಡ (Kannada)
              </button>
            </div>
          </div>

          <Button type="submit" variant="primary" className="w-full" disabled={isLoading} suppressHydrationWarning>
            {tx("auth", "sign_in")}
          </Button>
        </form>

        {error && <p className="mt-3 text-sm text-rose-600 text-center">{error}</p>}

        <div className="mt-6 border-t border-slate-200 pt-4">
          <p className="text-xs text-slate-500 text-center mb-3">{tx("auth", "demo_accounts")} (Click to select)</p>
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
                  <span className="text-[10px] uppercase tracking-wider px-1.5 py-0.5 rounded bg-white text-slate-600 border border-slate-200">
                    {tx("auth", a.role)}
                  </span>
                </div>
                <span className="text-slate-500 font-mono text-[11px]">{a.email}</span>
              </div>
            ))}
          </div>
        </div>

        <p className="mt-6 text-xs text-center text-slate-500">
          {tx("auth", "no_account")}
        </p>
      </Card>
    </div>
  );
}
