"use client";

import { cn } from "@/lib/utils/cn";

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "secondary" | "ghost" | "danger";
  size?: "sm" | "md" | "lg";
  loading?: boolean;
}

export function Button({
  className,
  variant = "primary",
  size = "md",
  loading,
  disabled,
  children,
  ...props
}: ButtonProps) {
  const base = "inline-flex items-center justify-center font-bold rounded-xl transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed";

  const variants = {
    primary: "bg-cyan text-[#050714] hover:bg-cyan/90",
    secondary: "bg-transparent border border-cyan/30 text-cyan hover:bg-cyan/10",
    ghost: "bg-transparent text-muted hover:text-text hover:bg-white/5",
    danger: "bg-red/20 text-red border border-red/30 hover:bg-red/30",
  };

  const sizes = {
    sm: "text-xs px-3 py-1.5 gap-1.5",
    md: "text-sm px-5 py-2.5 gap-2",
    lg: "text-base px-6 py-3 gap-2.5",
  };

  return (
    <button
      className={cn(base, variants[variant], sizes[size], className)}
      disabled={disabled || loading}
      {...props}
    >
      {loading && (
        <span className="inline-block">
          <svg className="animate-spin h-4 w-4" viewBox="0 0 24 24">
            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
          </svg>
        </span>
      )}
      {children}
    </button>
  );
}

interface CardProps {
  className?: string;
  children: React.ReactNode;
  glow?: "cyan" | "purple" | "pink" | "green" | "amber" | "none";
  onClick?: () => void;
}

export function Card({ className, children, glow = "none", onClick }: CardProps) {
  const glowColors: Record<string, string> = {
    cyan: "shadow-[0_0_30px_rgba(34,211,238,0.15)] border-cyan/20",
    purple: "shadow-[0_0_30px_rgba(168,85,247,0.15)] border-purple/20",
    pink: "shadow-[0_0_30px_rgba(236,72,153,0.15)] border-pink/20",
    green: "shadow-[0_0_30px_rgba(53,211,153,0.15)] border-green/20",
    amber: "shadow-[0_0_30px_rgba(245,158,11,0.15)] border-amber/20",
    none: "border-white/5",
  };

  return (
    <div
      onClick={onClick}
      className={cn(
        "rounded-[30px] bg-card border backdrop-blur-sm p-5",
        glowColors[glow],
        onClick && "cursor-pointer hover:bg-white/5 transition-colors",
        className
      )}
    >
      {children}
    </div>
  );
}

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
}

export function Input({ className, label, error, ...props }: InputProps) {
  return (
    <div className="flex flex-col gap-1.5">
      {label && <label className="text-xs text-muted font-semibold uppercase tracking-wider">{label}</label>}
      <input
        className={cn(
          "w-full bg-panel border border-white/10 rounded-xl px-4 py-3 text-text placeholder:text-dim",
          "focus:outline-none focus:border-cyan/50 focus:ring-1 focus:ring-cyan/20",
          "transition-all duration-200",
          error && "border-red/50",
          className
        )}
        {...props}
      />
      {error && <span className="text-xs text-red">{error}</span>}
    </div>
  );
}

export function Spinner({ className }: { className?: string }) {
  return (
    <span className="inline-block">
      <svg className={cn("animate-spin h-5 w-5 text-cyan", className)} viewBox="0 0 24 24">
        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
      </svg>
    </span>
  );
}

export function Badge({ children, color = "cyan" }: { children: React.ReactNode; color?: string }) {
  const colors: Record<string, string> = {
    cyan: "bg-cyan/10 text-cyan border-cyan/20",
    purple: "bg-purple/10 text-purple border-purple/20",
    green: "bg-green/10 text-green border-green/20",
    amber: "bg-amber/10 text-amber border-amber/20",
    pink: "bg-pink/10 text-pink border-pink/20",
  };

  return (
    <span className={cn("text-[10px] font-bold uppercase tracking-widest px-2.5 py-1 rounded-full border", colors[color] || colors.cyan)}>
      {children}
    </span>
  );
}
