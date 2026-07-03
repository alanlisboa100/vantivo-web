"use client";

import { useEffect, useRef, type ReactNode } from "react";
import { createPortal } from "react-dom";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@/lib/utils/cn";
import { X } from "lucide-react";
import { IconButton } from "./primitives";

/* ─────────────────────────────────────────────────────────────
 * BUTTON
 * ──────────────────────────────────────────────────────────── */

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "secondary" | "ghost" | "danger" | "cyber" | "success";
  size?: "sm" | "md" | "lg" | "xl";
  loading?: boolean;
  glow?: boolean;
  fullWidth?: boolean;
  leftIcon?: ReactNode;
  rightIcon?: ReactNode;
}

export function Button({
  className,
  variant = "primary",
  size = "md",
  loading,
  disabled,
  glow,
  fullWidth,
  leftIcon,
  rightIcon,
  children,
  ...props
}: ButtonProps) {
  const base =
    "relative inline-flex items-center justify-center font-bold rounded-xl transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed overflow-hidden group whitespace-nowrap";

  const variants = {
    primary:
      "bg-gradient-to-r from-cyan via-blue to-purple text-white hover:shadow-[0_0_30px_rgba(34,211,238,0.35)] hover:scale-[1.02] active:scale-[0.98]",
    cyber:
      "bg-transparent border border-cyan/30 text-cyan hover:bg-cyan/10 hover:shadow-[0_0_20px_rgba(34,211,238,0.15)]",
    secondary:
      "bg-white/5 border border-white/10 text-text hover:bg-white/10 hover:border-white/20",
    ghost:
      "bg-transparent text-muted hover:text-text hover:bg-white/5",
    danger:
      "bg-red/20 text-red border border-red/30 hover:bg-red/30 hover:shadow-[0_0_20px_rgba(239,68,68,0.2)]",
    success:
      "bg-green/15 text-green border border-green/30 hover:bg-green/25 hover:shadow-[0_0_20px_rgba(53,211,153,0.2)]",
  };

  const sizes = {
    sm: "text-xs px-3 py-1.5 gap-1.5",
    md: "text-sm px-5 py-2.5 gap-2",
    lg: "text-base px-6 py-3 gap-2.5",
    xl: "text-base px-8 py-3.5 gap-3",
  };

  return (
    <button
      className={cn(base, variants[variant], sizes[size], glow && "neon-cyan", fullWidth && "w-full", className)}
      disabled={disabled || loading}
      {...props}
    >
      <span className="absolute inset-0 -translate-x-full group-hover:translate-x-full transition-transform duration-700 shimmer pointer-events-none" />
      {loading ? (
        <span className="inline-flex">
          <svg className="animate-spin h-4 w-4" viewBox="0 0 24 24">
            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
          </svg>
        </span>
      ) : leftIcon}
      <span className="relative z-10 flex items-center gap-inherit">{children}</span>
      {!loading && rightIcon}
    </button>
  );
}

/* ─────────────────────────────────────────────────────────────
 * CARD
 * ──────────────────────────────────────────────────────────── */

interface CardProps {
  className?: string;
  children: React.ReactNode;
  glow?: "cyan" | "purple" | "pink" | "green" | "amber" | "red" | "none";
  onClick?: () => void;
  hover?: boolean;
  glass?: boolean;
}

export function Card({ className, children, glow = "none", onClick, hover = true, glass = true }: CardProps) {
  const glowColors: Record<string, string> = {
    cyan: "shadow-[0_0_30px_rgba(34,211,238,0.12)] border-cyan/15",
    purple: "shadow-[0_0_30px_rgba(168,85,247,0.12)] border-purple/15",
    pink: "shadow-[0_0_30px_rgba(236,72,153,0.12)] border-pink/15",
    green: "shadow-[0_0_30px_rgba(53,211,153,0.12)] border-green/15",
    amber: "shadow-[0_0_30px_rgba(245,158,11,0.12)] border-amber/15",
    red: "shadow-[0_0_30px_rgba(239,68,68,0.12)] border-red/15",
    none: "border-white/5",
  };

  return (
    <div
      onClick={onClick}
      className={cn(
        "relative rounded-[20px] p-5 border transition-all duration-300",
        glass ? "glass-card" : "bg-card/80",
        glowColors[glow],
        hover && "hover:border-cyan/20 hover:shadow-[0_0_40px_rgba(34,211,238,0.12)] hover:-translate-y-0.5",
        onClick && "cursor-pointer active:scale-[0.99]",
        className
      )}
    >
      {children}
    </div>
  );
}

/* ─────────────────────────────────────────────────────────────
 * INPUT
 * ──────────────────────────────────────────────────────────── */

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
  hint?: string;
  icon?: React.ReactNode;
  rightIcon?: React.ReactNode;
}

export function Input({ className, label, error, hint, icon, rightIcon, ...props }: InputProps) {
  return (
    <div className="flex flex-col gap-1.5">
      {label && (
        <label className="text-xs text-muted font-semibold uppercase tracking-wider">
          {label}
        </label>
      )}
      <div className="relative">
        {icon && (
          <div className="absolute left-3 top-1/2 -translate-y-1/2 text-dim pointer-events-none">{icon}</div>
        )}
        <input
          className={cn(
            "w-full bg-panel border border-white/10 rounded-xl px-4 py-3 text-text placeholder:text-dim/50",
            "focus:outline-none focus:border-cyan/40 focus:ring-1 focus:ring-cyan/20 focus:shadow-[0_0_20px_rgba(34,211,238,0.06)]",
            "transition-all duration-200",
            icon && "pl-10",
            rightIcon && "pr-10",
            error && "border-red/50 focus:border-red/50 focus:ring-red/20",
            className
          )}
          {...props}
        />
        {rightIcon && (
          <div className="absolute right-3 top-1/2 -translate-y-1/2 text-dim">{rightIcon}</div>
        )}
      </div>
      {error ? (
        <span className="text-xs text-red/80">{error}</span>
      ) : hint ? (
        <span className="text-xs text-dim">{hint}</span>
      ) : null}
    </div>
  );
}

/* ─────────────────────────────────────────────────────────────
 * TEXTAREA
 * ──────────────────────────────────────────────────────────── */

interface TextareaProps extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  label?: string;
  error?: string;
  hint?: string;
  autoGrow?: boolean;
}

export function Textarea({ className, label, error, hint, autoGrow, onInput, ...props }: TextareaProps) {
  return (
    <div className="flex flex-col gap-1.5">
      {label && (
        <label className="text-xs text-muted font-semibold uppercase tracking-wider">{label}</label>
      )}
      <textarea
        className={cn(
          "w-full bg-panel border border-white/10 rounded-xl px-4 py-3 text-text placeholder:text-dim/50",
          "focus:outline-none focus:border-cyan/40 focus:ring-1 focus:ring-cyan/20",
          "transition-all duration-200 resize-none",
          error && "border-red/50",
          className
        )}
        onInput={(e) => {
          if (autoGrow) {
            const t = e.currentTarget;
            t.style.height = "auto";
            t.style.height = t.scrollHeight + "px";
          }
          onInput?.(e);
        }}
        {...props}
      />
      {error ? (
        <span className="text-xs text-red/80">{error}</span>
      ) : hint ? (
        <span className="text-xs text-dim">{hint}</span>
      ) : null}
    </div>
  );
}

/* ─────────────────────────────────────────────────────────────
 * SPINNER
 * ──────────────────────────────────────────────────────────── */

export function Spinner({ className, size = "md" }: { className?: string; size?: "sm" | "md" | "lg" | "xl" }) {
  const sizes = { sm: "h-4 w-4", md: "h-5 w-5", lg: "h-8 w-8", xl: "h-12 w-12" };
  return (
    <span className="inline-flex items-center justify-center">
      <svg className={cn("animate-spin text-cyan", sizes[size], className)} viewBox="0 0 24 24">
        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
      </svg>
    </span>
  );
}

/* ─────────────────────────────────────────────────────────────
 * FULL-PAGE LOADER
 * ──────────────────────────────────────────────────────────── */

export function PageLoader({ label = "Carregando..." }: { label?: string }) {
  return (
    <div className="fixed inset-0 z-[100] flex flex-col items-center justify-center gap-4 bg-bg/80 backdrop-blur-sm">
      <div className="relative">
        <div className="absolute inset-0 rounded-full bg-cyan/20 blur-2xl animate-pulse" />
        <Spinner size="xl" />
      </div>
      <p className="text-sm text-muted animate-pulse">{label}</p>
    </div>
  );
}

/* ─────────────────────────────────────────────────────────────
 * BADGE
 * ──────────────────────────────────────────────────────────── */

export function Badge({
  children,
  color = "cyan",
  size = "sm",
  icon,
}: {
  children: React.ReactNode;
  color?: string;
  size?: "sm" | "md" | "lg";
  icon?: ReactNode;
}) {
  const colors: Record<string, string> = {
    cyan: "bg-cyan/10 text-cyan border-cyan/20",
    purple: "bg-purple/10 text-purple border-purple/20",
    green: "bg-green/10 text-green border-green/20",
    amber: "bg-amber/10 text-amber border-amber/20",
    pink: "bg-pink/10 text-pink border-pink/20",
    red: "bg-red/10 text-red border-red/20",
    blue: "bg-blue/10 text-blue border-blue/20",
  };

  const sizes = {
    sm: "text-[10px] px-2.5 py-1",
    md: "text-xs px-3 py-1.5",
    lg: "text-sm px-4 py-2",
  };

  return (
    <span
      className={cn(
        "font-bold uppercase tracking-widest rounded-full border inline-flex items-center gap-1.5",
        colors[color] || colors.cyan,
        sizes[size]
      )}
    >
      {icon}
      {children}
    </span>
  );
}

/* ─────────────────────────────────────────────────────────────
 * DIVIDER
 * ──────────────────────────────────────────────────────────── */

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

/* ─────────────────────────────────────────────────────────────
 * KBD
 * ──────────────────────────────────────────────────────────── */

export function Kbd({ children }: { children: React.ReactNode }) {
  return (
    <kbd className="px-2 py-0.5 text-[10px] font-mono bg-white/5 border border-white/10 rounded-md text-dim">
      {children}
    </kbd>
  );
}

/* ─────────────────────────────────────────────────────────────
 * MODAL
 * ──────────────────────────────────────────────────────────── */

interface ModalProps {
  open: boolean;
  onClose: () => void;
  children: ReactNode;
  title?: string;
  description?: string;
  size?: "sm" | "md" | "lg" | "xl" | "full";
  className?: string;
}

export function Modal({ open, onClose, children, title, description, size = "md", className }: ModalProps) {
  const sizes = {
    sm: "max-w-sm",
    md: "max-w-md",
    lg: "max-w-2xl",
    xl: "max-w-4xl",
    full: "max-w-[95vw]",
  };

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && onClose();
    document.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [open, onClose]);

  if (typeof window === "undefined") return null;

  return createPortal(
    <AnimatePresence>
      {open && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[200] bg-black/70 backdrop-blur-sm"
            onClick={onClose}
          />
          <div className="fixed inset-0 z-[201] flex items-center justify-center p-4 pointer-events-none">
            <motion.div
              initial={{ opacity: 0, scale: 0.92, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.92, y: 20 }}
              transition={{ type: "spring", stiffness: 400, damping: 30 }}
              className={cn(
                "relative w-full glass-strong rounded-3xl p-6 sm:p-8 pointer-events-auto max-h-[90vh] overflow-y-auto",
                sizes[size],
                className
              )}
            >
              <div className="flex items-start justify-between gap-4 mb-5">
                <div className="min-w-0 flex-1">
                  {title && <h2 className="text-lg sm:text-xl font-black">{title}</h2>}
                  {description && <p className="text-sm text-muted mt-1">{description}</p>}
                </div>
                <IconButton onClick={onClose} aria-label="Fechar" variant="ghost" size="sm">
                  <X size={16} />
                </IconButton>
              </div>
              {children}
            </motion.div>
          </div>
        </>
      )}
    </AnimatePresence>,
    document.body
  );
}

/* ─────────────────────────────────────────────────────────────
 * DRAWER (bottom sheet on mobile, side on desktop)
 * ──────────────────────────────────────────────────────────── */

interface DrawerProps {
  open: boolean;
  onClose: () => void;
  children: ReactNode;
  title?: string;
  side?: "right" | "bottom";
}

export function Drawer({ open, onClose, children, title, side = "right" }: DrawerProps) {
  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && onClose();
    document.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [open, onClose]);

  if (typeof window === "undefined") return null;

  const isSide = side === "right";

  return createPortal(
    <AnimatePresence>
      {open && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[200] bg-black/70 backdrop-blur-sm"
            onClick={onClose}
          />
          <motion.div
            initial={isSide ? { x: "100%" } : { y: "100%" }}
            animate={isSide ? { x: 0 } : { y: 0 }}
            exit={isSide ? { x: "100%" } : { y: "100%" }}
            transition={{ type: "spring", stiffness: 400, damping: 40 }}
            className={cn(
              "fixed z-[201] glass-strong p-6 overflow-y-auto",
              isSide
                ? "right-0 top-0 bottom-0 w-full sm:w-[420px] border-l border-white/10"
                : "bottom-0 left-0 right-0 max-h-[90vh] rounded-t-3xl border-t border-white/10"
            )}
          >
            <div className="flex items-center justify-between mb-4">
              {title && <h2 className="text-lg font-black">{title}</h2>}
              <IconButton onClick={onClose} aria-label="Fechar" variant="ghost" size="sm">
                <X size={16} />
              </IconButton>
            </div>
            {children}
          </motion.div>
        </>
      )}
    </AnimatePresence>,
    document.body
  );
}

/* ─────────────────────────────────────────────────────────────
 * TABS
 * ──────────────────────────────────────────────────────────── */

interface TabsProps<T extends string> {
  tabs: { id: T; label: string; icon?: ReactNode; count?: number }[];
  value: T;
  onChange: (id: T) => void;
  className?: string;
  variant?: "pill" | "underline";
}

export function Tabs<T extends string>({ tabs, value, onChange, className, variant = "pill" }: TabsProps<T>) {
  if (variant === "underline") {
    return (
      <div className={cn("flex items-center gap-1 border-b border-white/5 overflow-x-auto", className)}>
        {tabs.map((t) => {
          const active = t.id === value;
          return (
            <button
              key={t.id}
              onClick={() => onChange(t.id)}
              className={cn(
                "relative px-4 py-2.5 text-sm font-semibold whitespace-nowrap transition-colors flex items-center gap-2",
                active ? "text-cyan" : "text-muted hover:text-text"
              )}
            >
              {t.icon}
              {t.label}
              {typeof t.count === "number" && (
                <span className={cn("text-[10px] px-1.5 py-0.5 rounded-full", active ? "bg-cyan/20" : "bg-white/5")}>{t.count}</span>
              )}
              {active && (
                <motion.div
                  layoutId="tab-underline"
                  className="absolute bottom-0 left-0 right-0 h-0.5 bg-gradient-to-r from-cyan to-purple"
                />
              )}
            </button>
          );
        })}
      </div>
    );
  }

  return (
    <div className={cn("inline-flex p-1 rounded-2xl bg-white/[0.04] border border-white/5", className)}>
      {tabs.map((t) => {
        const active = t.id === value;
        return (
          <button
            key={t.id}
            onClick={() => onChange(t.id)}
            className={cn(
              "relative px-3 sm:px-4 py-1.5 text-xs sm:text-sm font-semibold rounded-xl transition-colors flex items-center gap-2 whitespace-nowrap",
              active ? "text-text" : "text-muted hover:text-text"
            )}
          >
            {active && (
              <motion.div
                layoutId="tab-pill"
                className="absolute inset-0 rounded-xl bg-gradient-to-r from-cyan/20 to-purple/20 border border-cyan/20"
                transition={{ type: "spring", stiffness: 400, damping: 30 }}
              />
            )}
            <span className="relative z-10 flex items-center gap-1.5">
              {t.icon}
              {t.label}
              {typeof t.count === "number" && (
                <span className={cn("text-[10px] px-1.5 py-0.5 rounded-full", active ? "bg-bg/50" : "bg-white/5")}>
                  {t.count}
                </span>
              )}
            </span>
          </button>
        );
      })}
    </div>
  );
}

/* ─────────────────────────────────────────────────────────────
 * PROGRESS BAR
 * ──────────────────────────────────────────────────────────── */

export function ProgressBar({
  value,
  max = 100,
  color = "cyan",
  size = "md",
  showLabel,
  className,
}: {
  value: number;
  max?: number;
  color?: "cyan" | "purple" | "green" | "amber" | "red" | "gradient";
  size?: "sm" | "md" | "lg";
  showLabel?: boolean;
  className?: string;
}) {
  const pct = Math.max(0, Math.min(100, (value / max) * 100));
  const sizes = { sm: "h-1", md: "h-1.5", lg: "h-2" };
  const colors = {
    cyan: "bg-cyan",
    purple: "bg-purple",
    green: "bg-green",
    amber: "bg-amber",
    red: "bg-red",
    gradient: "bg-gradient-to-r from-cyan via-blue to-purple",
  };
  return (
    <div className={cn("w-full", className)}>
      <div className={cn("w-full rounded-full bg-white/5 overflow-hidden", sizes[size])}>
        <motion.div
          className={cn("h-full rounded-full", colors[color])}
          initial={{ width: 0 }}
          animate={{ width: `${pct}%` }}
          transition={{ duration: 0.6, ease: "easeOut" }}
        />
      </div>
      {showLabel && (
        <p className="text-[10px] text-dim mt-1.5 font-semibold">{Math.round(pct)}%</p>
      )}
    </div>
  );
}
