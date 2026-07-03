"use client";

import { motion, type HTMLMotionProps, type Variants } from "framer-motion";
import { forwardRef, type ReactNode } from "react";
import { cn } from "@/lib/utils/cn";

/* ─────────────────────────────────────────────────────────────
 * MOTION PRESETS
 * ──────────────────────────────────────────────────────────── */

export const fadeUp: Variants = {
  hidden: { opacity: 0, y: 24 },
  visible: { opacity: 1, y: 0 },
};

export const fadeIn: Variants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1 },
};

export const scaleIn: Variants = {
  hidden: { opacity: 0, scale: 0.95 },
  visible: { opacity: 1, scale: 1 },
};

export const stagger = (delay = 0.05): Variants => ({
  hidden: {},
  visible: { transition: { staggerChildren: delay, delayChildren: 0.05 } },
});

/* ─────────────────────────────────────────────────────────────
 * GRADIENT TEXT
 * ──────────────────────────────────────────────────────────── */

interface GradientTextProps extends HTMLMotionProps<"span"> {
  children: ReactNode;
  from?: string;
  via?: string;
  to?: string;
  as?: "span" | "h1" | "h2" | "h3" | "p";
}

export function GradientText({
  children,
  from = "var(--cyan)",
  via = "var(--blue)",
  to = "var(--purple)",
  className,
  ...rest
}: GradientTextProps) {
  return (
    <motion.span
      className={cn("inline-block bg-clip-text text-transparent", className)}
      style={{
        backgroundImage: `linear-gradient(120deg, ${from}, ${via}, ${to})`,
        backgroundSize: "200% 200%",
      }}
      animate={{ backgroundPosition: ["0% 50%", "100% 50%", "0% 50%"] }}
      transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
      {...rest}
    >
      {children}
    </motion.span>
  );
}

/* ─────────────────────────────────────────────────────────────
 * AURORA BACKGROUND
 * ──────────────────────────────────────────────────────────── */

interface AuroraBgProps {
  className?: string;
  intensity?: "low" | "md" | "high";
  hue?: "default" | "warm" | "cool" | "vivid";
}

export function AuroraBg({ className, intensity = "md", hue = "default" }: AuroraBgProps) {
  const opacities = { low: 0.15, md: 0.3, high: 0.5 };
  const o = opacities[intensity];

  const palettes = {
    default: ["rgba(34,211,238,0.4)", "rgba(53,92,255,0.4)", "rgba(168,85,247,0.4)", "rgba(236,72,153,0.3)"],
    warm: ["rgba(245,158,11,0.4)", "rgba(239,68,68,0.4)", "rgba(236,72,153,0.4)", "rgba(168,85,247,0.3)"],
    cool: ["rgba(34,211,238,0.5)", "rgba(53,92,255,0.4)", "rgba(168,85,247,0.3)", "rgba(53,211,153,0.3)"],
    vivid: ["rgba(34,211,238,0.6)", "rgba(168,85,247,0.5)", "rgba(236,72,153,0.5)", "rgba(53,211,153,0.4)"],
  };
  const colors = palettes[hue];

  return (
    <div className={cn("absolute inset-0 overflow-hidden pointer-events-none", className)}>
      <div
        className="absolute -top-40 -right-40 w-[600px] h-[600px] rounded-full blur-[140px] orb-animate"
        style={{ background: `radial-gradient(circle, ${colors[0]} 0%, transparent 70%)`, opacity: o }}
      />
      <div
        className="absolute top-1/2 -left-40 w-[500px] h-[500px] rounded-full blur-[120px] orb-animate"
        style={{ background: `radial-gradient(circle, ${colors[1]} 0%, transparent 70%)`, opacity: o * 0.8, animationDelay: "-7s" }}
      />
      <div
        className="absolute -bottom-40 right-1/3 w-[550px] h-[550px] rounded-full blur-[130px] orb-animate"
        style={{ background: `radial-gradient(circle, ${colors[2]} 0%, transparent 70%)`, opacity: o * 0.7, animationDelay: "-14s" }}
      />
      <div
        className="absolute top-1/4 right-1/4 w-[400px] h-[400px] rounded-full blur-[100px] orb-animate"
        style={{ background: `radial-gradient(circle, ${colors[3]} 0%, transparent 70%)`, opacity: o * 0.5, animationDelay: "-3s" }}
      />
    </div>
  );
}

/* ─────────────────────────────────────────────────────────────
 * NOISE / GRAIN OVERLAY (gives premium film grain feel)
 * ──────────────────────────────────────────────────────────── */

export function NoiseOverlay({ className, opacity = 0.04 }: { className?: string; opacity?: number }) {
  return (
    <div
      className={cn("pointer-events-none absolute inset-0 mix-blend-overlay", className)}
      style={{
        opacity,
        backgroundImage: `url("data:image/svg+xml;utf8,<svg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'><filter id='n'><feTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='3' stitchTiles='stitch'/><feColorMatrix values='0 0 0 0 1 0 0 0 0 1 0 0 0 0 1 0 0 0 0.5 0'/></filter><rect width='100%' height='100%' filter='url(%23n)'/></svg>")`,
      }}
    />
  );
}

/* ─────────────────────────────────────────────────────────────
 * SECTION (semantic + animated wrapper)
 * ──────────────────────────────────────────────────────────── */

interface SectionProps {
  id?: string;
  className?: string;
  children: ReactNode;
  containerClassName?: string;
  as?: "section" | "div" | "article";
}

export function Section({ id, className, children, containerClassName, as = "section" }: SectionProps) {
  return (
    <motion.section
      id={id}
      className={cn("relative px-4 sm:px-6 py-16 sm:py-24", className)}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-80px" }}
      variants={stagger(0.08)}
    >
      <div className={cn("relative mx-auto max-w-6xl", containerClassName)}>{children}</div>
    </motion.section>
  );
}

/* ─────────────────────────────────────────────────────────────
 * STAT CARD
 * ──────────────────────────────────────────────────────────── */

interface StatCardProps {
  value: ReactNode;
  label: string;
  icon?: ReactNode;
  color?: "cyan" | "purple" | "pink" | "green" | "amber" | "blue";
  className?: string;
}

export function StatCard({ value, label, icon, color = "cyan", className }: StatCardProps) {
  const colors: Record<string, string> = {
    cyan: "from-cyan/20 to-cyan/0 text-cyan",
    purple: "from-purple/20 to-purple/0 text-purple",
    pink: "from-pink/20 to-pink/0 text-pink",
    green: "from-green/20 to-green/0 text-green",
    amber: "from-amber/20 to-amber/0 text-amber",
    blue: "from-blue/20 to-blue/0 text-blue",
  };

  return (
    <motion.div
      variants={fadeUp}
      whileHover={{ y: -4 }}
      transition={{ type: "spring", stiffness: 300, damping: 20 }}
      className={cn(
        "group relative overflow-hidden rounded-2xl border border-white/5 bg-card/60 backdrop-blur-sm p-5 sm:p-6",
        "hover:border-white/10 transition-colors",
        className
      )}
    >
      <div className={cn("absolute inset-0 bg-gradient-to-br opacity-0 group-hover:opacity-100 transition-opacity duration-500", colors[color])} />
      <div className="relative flex items-start gap-4">
        {icon && (
          <div className={cn("shrink-0 w-10 h-10 rounded-xl flex items-center justify-center bg-white/5", colors[color].split(" ")[2])}>
            {icon}
          </div>
        )}
        <div className="min-w-0 flex-1">
          <p className={cn("text-2xl sm:text-3xl font-black tracking-tight", colors[color].split(" ")[2])}>{value}</p>
          <p className="text-xs text-muted mt-0.5 uppercase tracking-wider font-semibold">{label}</p>
        </div>
      </div>
    </motion.div>
  );
}

/* ─────────────────────────────────────────────────────────────
 * MARQUEE
 * ──────────────────────────────────────────────────────────── */

interface MarqueeProps {
  children: ReactNode;
  className?: string;
  speed?: number;
  pauseOnHover?: boolean;
  reverse?: boolean;
}

export function Marquee({ children, className, speed = 30, pauseOnHover = true, reverse = false }: MarqueeProps) {
  return (
    <div
      className={cn(
        "group relative flex overflow-hidden",
        pauseOnHover && "[mask-image:linear-gradient(to_right,transparent,black_10%,black_90%,transparent)]",
        className
      )}
    >
      <div
        className={cn("flex shrink-0 gap-8 pr-8", pauseOnHover && "group-hover:[animation-play-state:paused]")}
        style={{ animation: `marquee ${speed}s linear infinite${reverse ? " reverse" : ""}` }}
      >
        {children}
      </div>
      <div
        className={cn("flex shrink-0 gap-8 pr-8", pauseOnHover && "group-hover:[animation-play-state:paused]")}
        style={{ animation: `marquee ${speed}s linear infinite${reverse ? " reverse" : ""}` }}
        aria-hidden="true"
      >
        {children}
      </div>
      <style jsx>{`
        @keyframes marquee {
          from { transform: translateX(0); }
          to { transform: translateX(-100%); }
        }
      `}</style>
    </div>
  );
}

/* ─────────────────────────────────────────────────────────────
 * SKELETON
 * ──────────────────────────────────────────────────────────── */

interface SkeletonProps {
  className?: string;
  rounded?: "sm" | "md" | "lg" | "xl" | "full";
}

export function Skeleton({ className, rounded = "md" }: SkeletonProps) {
  const r = { sm: "rounded", md: "rounded-lg", lg: "rounded-2xl", xl: "rounded-3xl", full: "rounded-full" };
  return <div className={cn("skeleton", r[rounded], className)} />;
}

/* ─────────────────────────────────────────────────────────────
 * EMPTY STATE
 * ──────────────────────────────────────────────────────────── */

interface EmptyStateProps {
  icon?: ReactNode;
  title: string;
  description?: string;
  action?: ReactNode;
  className?: string;
}

export function EmptyState({ icon, title, description, action, className }: EmptyStateProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      className={cn(
        "flex flex-col items-center justify-center text-center p-8 sm:p-12 rounded-3xl border border-white/5 bg-white/[0.02]",
        className
      )}
    >
      {icon && (
        <div className="relative mb-4">
          <div className="absolute inset-0 bg-cyan/20 blur-2xl rounded-full" />
          <div className="relative w-16 h-16 rounded-2xl bg-gradient-to-br from-cyan/20 via-purple/20 to-pink/20 flex items-center justify-center text-3xl border border-white/5">
            {icon}
          </div>
        </div>
      )}
      <h3 className="text-base sm:text-lg font-bold mb-1">{title}</h3>
      {description && <p className="text-sm text-muted max-w-sm mb-5">{description}</p>}
      {action}
    </motion.div>
  );
}

/* ─────────────────────────────────────────────────────────────
 * TOOLTIP (lightweight, no portal)
 * ──────────────────────────────────────────────────────────── */

interface TooltipProps {
  content: string;
  children: ReactNode;
  side?: "top" | "bottom";
  className?: string;
}

export function Tooltip({ content, children, side = "top", className }: TooltipProps) {
  return (
    <span className={cn("relative inline-flex group", className)}>
      {children}
      <span
        className={cn(
          "pointer-events-none absolute left-1/2 -translate-x-1/2 z-50 px-2.5 py-1.5 rounded-lg",
          "bg-bg-2/95 border border-white/10 text-[11px] font-semibold text-text whitespace-nowrap",
          "opacity-0 group-hover:opacity-100 transition-opacity duration-200 backdrop-blur-md",
          "shadow-[0_0_20px_rgba(34,211,238,0.08)]",
          side === "top" ? "bottom-full mb-2" : "top-full mt-2"
        )}
      >
        {content}
      </span>
    </span>
  );
}

/* ─────────────────────────────────────────────────────────────
 * ICON BUTTON
 * ──────────────────────────────────────────────────────────── */

interface IconButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "ghost" | "glass" | "danger";
  size?: "sm" | "md" | "lg";
  active?: boolean;
}

export const IconButton = forwardRef<HTMLButtonElement, IconButtonProps>(function IconButton(
  { className, variant = "ghost", size = "md", active, children, ...props },
  ref
) {
  const variants = {
    primary: "bg-cyan/15 text-cyan border border-cyan/30 hover:bg-cyan/20 hover:shadow-[0_0_20px_rgba(34,211,238,0.2)]",
    glass: "bg-white/[0.04] border border-white/10 text-text hover:bg-white/[0.08] hover:border-white/20 backdrop-blur-sm",
    ghost: "text-muted hover:text-text hover:bg-white/5",
    danger: "bg-red/10 text-red border border-red/20 hover:bg-red/20",
  };
  const sizes = {
    sm: "w-8 h-8",
    md: "w-10 h-10",
    lg: "w-12 h-12",
  };
  return (
    <button
      ref={ref}
      className={cn(
        "inline-flex items-center justify-center rounded-xl transition-all duration-200 active:scale-95",
        variants[variant],
        sizes[size],
        active && "ring-2 ring-cyan/30",
        className
      )}
      {...props}
    >
      {children}
    </button>
  );
});

/* ─────────────────────────────────────────────────────────────
 * CHIP / PILL
 * ──────────────────────────────────────────────────────────── */

interface ChipProps {
  children: ReactNode;
  variant?: "default" | "cyan" | "purple" | "pink" | "green" | "amber" | "red";
  size?: "sm" | "md";
  icon?: ReactNode;
  className?: string;
}

export function Chip({ children, variant = "default", size = "sm", icon, className }: ChipProps) {
  const variants = {
    default: "bg-white/[0.04] border-white/10 text-muted",
    cyan: "bg-cyan/10 border-cyan/20 text-cyan",
    purple: "bg-purple/10 border-purple/20 text-purple",
    pink: "bg-pink/10 border-pink/20 text-pink",
    green: "bg-green/10 border-green/20 text-green",
    amber: "bg-amber/10 border-amber/20 text-amber",
    red: "bg-red/10 border-red/20 text-red",
  };
  const sizes = { sm: "text-[10px] px-2.5 py-1", md: "text-xs px-3 py-1.5" };
  return (
    <span
      className={cn(
        "inline-flex items-center gap-1.5 rounded-full border font-semibold uppercase tracking-wider",
        variants[variant],
        sizes[size],
        className
      )}
    >
      {icon}
      {children}
    </span>
  );
}
