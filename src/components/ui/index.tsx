"use client";

import { cn } from "@/lib/utils/cn";

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "secondary" | "ghost" | "danger" | "cyber";
  size?: "sm" | "md" | "lg";
  loading?: boolean;
  glow?: boolean;
}

export function Button({
  className,
  variant = "primary",
  size = "md",
  loading,
  disabled,
  glow,
  children,
  ...props
}: ButtonProps) {
  const base =
    "relative inline-flex items-center justify-center font-bold rounded-xl transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed overflow-hidden group";

  const variants = {
    primary:
      "bg-gradient-to-r from-cyan to-blue text-white hover:shadow-[0_0_30px_rgba(34,211,238,0.3)] hover:scale-[1.02] active:scale-[0.98]",
    cyber:
      "bg-transparent border border-cyan/30 text-cyan hover:bg-cyan/10 hover:shadow-[0_0_20px_rgba(34,211,238,0.15)]",
    secondary:
      "bg-white/5 border border-white/10 text-text hover:bg-white/10 hover:border-white/20",
    ghost:
      "bg-transparent text-muted hover:text-text hover:bg-white/5",
    danger:
      "bg-red/20 text-red border border-red/30 hover:bg-red/30 hover:shadow-[0_0_20px_rgba(239,68,68,0.15)]",
  };

  const sizes = {
    sm: "text-xs px-3 py-1.5 gap-1.5",
    md: "text-sm px-5 py-2.5 gap-2",
    lg: "text-base px-6 py-3 gap-2.5",
  };

  return (
    <button
      className={cn(base, variants[variant], sizes[size], glow && "neon-cyan", className)}
      disabled={disabled || loading}
      {...props}
    >
      {/* Shimmer overlay on hover */}
      <span className="absolute inset-0 -translate-x-full group-hover:translate-x-full transition-transform duration-700 shimmer pointer-events-none" />

      {loading && (
        <span className="inline-block">
          <svg className="animate-spin h-4 w-4" viewBox="0 0 24 24">
            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
          </svg>
        </span>
      )}
      <span className="relative z-10">{children}</span>
    </button>
  );
}

interface CardProps {
  className?: string;
  children: React.ReactNode;
  glow?: "cyan" | "purple" | "pink" | "green" | "amber" | "none";
  onClick?: () => void;
  hover?: boolean;
}

export function Card({ className, children, glow = "none", onClick, hover = true }: CardProps) {
  const glowColors: Record<string, string> = {
    cyan: "shadow-[0_0_30px_rgba(34,211,238,0.12)] border-cyan/15",
    purple: "shadow-[0_0_30px_rgba(168,85,247,0.12)] border-purple/15",
    pink: "shadow-[0_0_30px_rgba(236,72,153,0.12)] border-pink/15",
    green: "shadow-[0_0_30px_rgba(53,211,153,0.12)] border-green/15",
    amber: "shadow-[0_0_30px_rgba(245,158,11,0.12)] border-amber/15",
    none: "border-white/5",
  };

  return (
    <div
      onClick={onClick}
      className={cn(
        "glass-card rounded-[20px] p-5",
        glowColors[glow],
        hover &&
          "hover:border-cyan/20 hover:shadow-[0_0_40px_rgba(34,211,238,0.1)] hover:-translate-y-0.5",
        onClick && "cursor-pointer",
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
  icon?: React.ReactNode;
}

export function Input({ className, label, error, icon, ...props }: InputProps) {
  return (
    <div className="flex flex-col gap-1.5">
      {label && (
        <label className="text-xs text-muted font-semibold uppercase tracking-wider">
          {label}
        </label>
      )}
      <div className="relative">
        {icon && (
          <div className="absolute left-3 top-1/2 -translate-y-1/2 text-dim">{icon}</div>
        )}
        <input
          className={cn(
            "w-full bg-panel border border-white/10 rounded-xl px-4 py-3 text-text placeholder:text-dim/50",
            "focus:outline-none focus:border-cyan/40 focus:ring-1 focus:ring-cyan/20 focus:shadow-[0_0_20px_rgba(34,211,238,0.06)]",
            "transition-all duration-200",
            icon && "pl-10",
            error && "border-red/50 focus:border-red/50 focus:ring-red/20",
            className
          )}
          {...props}
        />
      </div>
      {error && <span className="text-xs text-red/80">{error}</span>}
    </div>
  );
}

export function Spinner({ className, size = "md" }: { className?: string; size?: "sm" | "md" | "lg" }) {
  const sizes = { sm: "h-4 w-4", md: "h-5 w-5", lg: "h-8 w-8" };
  return (
    <span className="inline-flex items-center justify-center">
      <svg className={cn("animate-spin text-cyan", sizes[size], className)} viewBox="0 0 24 24">
        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
      </svg>
    </span>
  );
}

export function Badge({
  children,
  color = "cyan",
  size = "sm",
}: {
  children: React.ReactNode;
  color?: string;
  size?: "sm" | "md";
}) {
  const colors: Record<string, string> = {
    cyan: "bg-cyan/10 text-cyan border-cyan/20",
    purple: "bg-purple/10 text-purple border-purple/20",
    green: "bg-green/10 text-green border-green/20",
    amber: "bg-amber/10 text-amber border-amber/20",
    pink: "bg-pink/10 text-pink border-pink/20",
    red: "bg-red/10 text-red border-red/20",
  };

  const sizes = {
    sm: "text-[10px] px-2.5 py-1",
    md: "text-xs px-3 py-1.5",
  };

  return (
    <span
      className={cn(
        "font-bold uppercase tracking-widest rounded-full border inline-flex items-center gap-1",
        colors[color] || colors.cyan,
        sizes[size]
      )}
    >
      {children}
    </span>
  );
}

export function Divider({ className, label }: { className?: string; label?: string }) {
  if (label) {
    return (
      <div className={cn("flex items-center gap-3", className)}>
        <div className="flex-1 h-px bg-gradient-to-r from-transparent via-white/10 to-transparent" />
        <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-dim">{label}</span>
        <div className="flex-1 h-px bg-gradient-to-r from-transparent via-white/10 to-transparent" />
      </div>
    );
  }
  return <div className={cn("h-px bg-gradient-to-r from-transparent via-white/10 to-transparent", className)} />;
}

export function Kbd({ children }: { children: React.ReactNode }) {
  return (
    <kbd className="px-2 py-0.5 text-[10px] font-mono bg-white/5 border border-white/10 rounded-md text-dim">
      {children}
    </kbd>
  );
}
