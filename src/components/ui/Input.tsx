"use client";

import * as React from "react";
import { cn } from "@/lib/utils";

export interface InputProps
  extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
  className?: string;
}

export function Input({ label, error, className, ...props }: InputProps) {
  return (
    <div className={cn("mb-4", className)}>
      {label && <label className="block text-sm font-medium text-slate-700 mb-1.5">{label}</label>}
      <input
        suppressHydrationWarning
        className={cn(
          "block w-full rounded-md border bg-white px-3 py-2 text-sm text-slate-900 placeholder:text-slate-400 focus:border-teal-600 focus:ring-1 focus:ring-teal-600 focus:outline-none",
          error ? "border-rose-500 focus:ring-rose-500" : "border-slate-200"
        )}
        {...props}
      />
      {error && <p className="mt-1 text-xs text-rose-600">{error}</p>}
    </div>
  );
}

export interface TextareaProps
  extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  label?: string;
  error?: string;
  className?: string;
}

export function Textarea({ label, error, className, ...props }: TextareaProps) {
  return (
    <div className={cn("mb-4", className)}>
      {label && <label className="block text-sm font-medium text-slate-700 mb-1.5">{label}</label>}
      <textarea
        suppressHydrationWarning
        className={cn(
          "block w-full rounded-md border bg-white px-3 py-2 text-sm text-slate-900 placeholder:text-slate-400 focus:border-teal-600 focus:ring-1 focus:ring-teal-600 focus:outline-none",
          error ? "border-rose-500 focus:ring-rose-500" : "border-slate-200",
          "min-h-[80px]"
        )}
        {...props}
      />
      {error && <p className="mt-1 text-xs text-rose-600">{error}</p>}
    </div>
  );
}
