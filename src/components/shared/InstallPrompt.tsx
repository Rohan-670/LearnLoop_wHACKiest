"use client";

import * as React from "react";
import { Download, CheckCircle } from "lucide-react";
import { useTranslation, type Locale } from "@/lib/i18n";

interface InstallPromptProps {
  locale?: string;
  className?: string;
}

export function InstallPrompt({ locale = "en", className = "" }: InstallPromptProps) {
  const { t } = useTranslation(locale as Locale);
  const [deferredPrompt, setDeferredPrompt] = React.useState<any>(null);
  const [isInstalled, setIsInstalled] = React.useState(false);
  const [showHelper, setShowHelper] = React.useState(false);

  React.useEffect(() => {
    // Check if running in standalone mode (already installed)
    if (
      window.matchMedia("(display-mode: standalone)").matches ||
      (window.navigator as any).standalone === true
    ) {
      setIsInstalled(true);
    }

    const handleBeforeInstall = (e: Event) => {
      e.preventDefault();
      setDeferredPrompt(e);
    };

    const handleAppInstalled = () => {
      setIsInstalled(true);
      setDeferredPrompt(null);
      setShowHelper(false);
    };

    window.addEventListener("beforeinstallprompt", handleBeforeInstall);
    window.addEventListener("appinstalled", handleAppInstalled);

    return () => {
      window.removeEventListener("beforeinstallprompt", handleBeforeInstall);
      window.removeEventListener("appinstalled", handleAppInstalled);
    };
  }, []);

  const handleInstallClick = async () => {
    if (deferredPrompt) {
      deferredPrompt.prompt();
      const choice = await deferredPrompt.userChoice;
      if (choice?.outcome === "accepted") {
        setDeferredPrompt(null);
      }
    } else {
      setShowHelper(!showHelper);
    }
  };

  if (isInstalled) {
    return (
      <div className={`inline-flex items-center gap-1.5 px-2.5 py-1 text-xs font-medium text-emerald-700 bg-emerald-50 border border-emerald-200 rounded-md ${className}`}>
        <CheckCircle className="w-3.5 h-3.5" />
        <span>{locale === "kn" ? "ಸ್ಥಾಪಿಸಲಾಗಿದೆ" : "App Installed"}</span>
      </div>
    );
  }

  return (
    <div className="relative inline-block">
      <button
        type="button"
        onClick={handleInstallClick}
        className={`inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold rounded-md transition-all shadow-xs ${
          deferredPrompt
            ? "bg-teal-600 text-white hover:bg-teal-700 animate-pulse"
            : "bg-teal-50 text-teal-800 border border-teal-200 hover:bg-teal-100"
        } ${className}`}
        title={locale === "kn" ? "ಈ ಅಪ್ಲಿಕೇಶನ್ ಅನ್ನು ಸ್ಥಾಪಿಸಿ" : "Install LearnLoop as App"}
      >
        <Download className="w-3.5 h-3.5" />
        <span>{locale === "kn" ? "ಅಪ್ಲಿಕೇಶನ್ ಸ್ಥಾಪಿಸಿ" : "Install App"}</span>
      </button>

      {showHelper && (
        <div className="absolute right-0 top-full mt-2 w-72 p-3 bg-white border border-slate-200 rounded-lg shadow-lg z-50 text-left text-xs text-slate-700 space-y-2">
          <p className="font-semibold text-slate-900">
            {locale === "kn" ? "ಅಪ್ಲಿಕೇಶನ್ ಸ್ಥಾಪಿಸುವುದು ಹೇಗೆ:" : "How to install:"}
          </p>
          <ul className="list-disc list-inside space-y-1 text-slate-600">
            {locale === "kn" ? (
              <>
                <li>ಬ್ರೌಸರ್‌ನ ವಿಳಾಸ ಪಟ್ಟಿಯ (Address bar) ಬಲಭಾಗದಲ್ಲಿರುವ <strong>ಸ್ಥಾಪನೆ (Install)</strong> ಐಕಾನ್ ಕ್ಲಿಕ್ ಮಾಡಿ.</li>
                <li>ಅಥವಾ ಮೆನು (⋮) ತೆರೆದು <strong>&quot;LearnLoop ಸ್ಥಾಪಿಸಿ&quot;</strong> ಆಯ್ಕೆಮಾಡಿ.</li>
              </>
            ) : (
              <>
                <li>Click the <strong>Install icon</strong> in your browser&apos;s address bar (right side).</li>
                <li>Or open the browser menu (⋮) and select <strong>&quot;Install LearnLoop Intelligence...&quot;</strong>.</li>
              </>
            )}
          </ul>
        </div>
      )}
    </div>
  );
}
