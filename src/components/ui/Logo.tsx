"use client";

import * as React from "react";
import Link from "next/link";

interface LogoProps {
  size?: "sm" | "md" | "lg" | "xl";
  showText?: boolean;
  className?: string;
  href?: string;
}

export function LogoMark({ size = 36, className = "" }: { size?: number; className?: string }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 48 48"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={`shrink-0 ${className}`}
    >
      <defs>
        <linearGradient id="ll-grad-primary" x1="4" y1="8" x2="44" y2="40" gradientUnits="userSpaceOnUse">
          <stop offset="0%" stopColor="#0d9488" />
          <stop offset="50%" stopColor="#06b6d4" />
          <stop offset="100%" stopColor="#10b981" />
        </linearGradient>
        <linearGradient id="ll-grad-accent" x1="12" y1="12" x2="36" y2="36" gradientUnits="userSpaceOnUse">
          <stop offset="0%" stopColor="#38bdf8" />
          <stop offset="100%" stopColor="#14b8a6" />
        </linearGradient>
        <filter id="ll-glow" x="-20%" y="-20%" width="140%" height="140%">
          <feDropShadow dx="0" dy="2" stdDeviation="3" floodColor="#0d9488" floodOpacity="0.25" />
        </filter>
      </defs>

      {/* Background Rounded Shield / Tile */}
      <rect width="48" height="48" rx="12" fill="#0f172a" />

      {/* The Dynamic Learning Loop (Infinity Ribbon Intertwined with Book Pages) */}
      <g filter="url(#ll-glow)">
        {/* Left Loop - Foundation / Student */}
        <path
          d="M14 24C14 19.5817 17.5817 16 22 16C25.5 16 28 19 30 22C32 25 34.5 28 38 28C41.3137 28 44 25.3137 44 22C44 18.6863 41.3137 16 38 16"
          stroke="url(#ll-grad-primary)"
          strokeWidth="3.5"
          strokeLinecap="round"
          strokeLinejoin="round"
          fill="none"
        />

        {/* Right Loop - Growth / Mastery */}
        <path
          d="M34 24C34 28.4183 30.4183 32 26 32C22.5 32 20 29 18 26C16 23 13.5 20 10 20C6.68629 20 4 22.6863 4 26C4 29.3137 6.68629 32 10 32"
          stroke="url(#ll-grad-primary)"
          strokeWidth="3.5"
          strokeLinecap="round"
          strokeLinejoin="round"
          fill="none"
        />

        {/* Central Insight Core - Light of Knowledge */}
        <circle cx="24" cy="24" r="3.5" fill="#38bdf8" />
        <circle cx="24" cy="24" r="1.5" fill="#ffffff" />

        {/* Knowledge Spark Accent */}
        <path
          d="M24 11V14M24 34V37M17 17L19 19M29 29L31 31"
          stroke="#06b6d4"
          strokeWidth="1.75"
          strokeLinecap="round"
        />
      </g>
    </svg>
  );
}

export function Logo({
  size = "md",
  showText = true,
  className = "",
  href = "/",
}: LogoProps) {
  const pixelSizes = {
    sm: 28,
    md: 36,
    lg: 44,
    xl: 56,
  };

  const textSizes = {
    sm: "text-base",
    md: "text-lg",
    lg: "text-xl",
    xl: "text-2xl",
  };

  const badgeSizes = {
    sm: "text-[9px] px-1",
    md: "text-[10px] px-1.5",
    lg: "text-xs px-2",
    xl: "text-xs px-2.5",
  };

  const content = (
    <div className={`inline-flex items-center gap-2.5 group select-none ${className}`}>
      <LogoMark size={pixelSizes[size]} className="transition-transform duration-300 group-hover:scale-105" />
      {showText && (
        <div className="flex flex-col leading-tight">
          <div className="flex items-center gap-1.5">
            <span className={`font-black tracking-tight text-slate-900 ${textSizes[size]}`}>
              Learn<span className="bg-gradient-to-r from-teal-600 to-cyan-600 bg-clip-text text-transparent">Loop</span>
            </span>
          </div>
          <span className="text-[10px] font-semibold tracking-wider text-slate-400 uppercase">
            Intelligence
          </span>
        </div>
      )}
    </div>
  );

  if (href) {
    return (
      <Link href={href} className="inline-flex items-center focus:outline-none">
        {content}
      </Link>
    );
  }

  return content;
}
