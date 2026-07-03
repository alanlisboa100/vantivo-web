import { cn } from "@/lib/utils/cn";
import { motion } from "framer-motion";
import { useEffect, useRef, type ReactNode } from "react";

/* ─────────────────────────────────────────────────────────────
 * LOGO MARK (gradient square with subtle conic shimmer)
 * ──────────────────────────────────────────────────────────── */

export function LogoMark({ className, size = 48, animated }: { className?: string; size?: number; animated?: boolean }) {
  return (
    <div className="relative inline-flex">
      <svg
        width={size}
        height={size}
        viewBox="0 0 48 48"
        className={cn("flex-shrink-0 relative z-10", className)}
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <defs>
          <linearGradient id={`logo-grad-${size}`} x1="0" y1="0" x2="48" y2="48">
            <stop offset="0%" stopColor="#A855F7" />
            <stop offset="50%" stopColor="#355CFF" />
            <stop offset="100%" stopColor="#22D3EE" />
          </linearGradient>
          <filter id={`logo-glow-${size}`}>
            <feDropShadow dx="0" dy="0" stdDeviation="3" floodColor="#22D3EE" floodOpacity="0.4" />
          </filter>
        </defs>
        <rect width="48" height="48" rx="14" fill={`url(#logo-grad-${size})`} filter={`url(#logo-glow-${size})`} />
        <rect x="2" y="2" width="44" height="44" rx="12" fill="none" stroke="rgba(255,255,255,0.18)" strokeWidth="1" />
        <line x1="16" y1="14" x2="16" y2="34" stroke="rgba(255,255,255,0.25)" strokeWidth="1.5" strokeLinecap="round" />
        <text
          x="24"
          y="32"
          textAnchor="middle"
          fill="white"
          fontSize="26"
          fontWeight="900"
          fontFamily="system-ui, sans-serif"
          letterSpacing="-1.5"
        >
          L
        </text>
      </svg>

      {animated && (
        <>
          <div
            className="absolute -inset-2 rounded-2xl opacity-40 blur-xl animate-pulse"
            style={{
              background:
                "radial-gradient(circle, rgba(34,211,238,0.3) 0%, rgba(168,85,247,0.2) 50%, transparent 70%)",
            }}
          />
          <div
            className="absolute inset-0 rounded-2xl pointer-events-none"
            style={{
              background:
                "linear-gradient(105deg, transparent 30%, rgba(255,255,255,0.15) 50%, transparent 70%)",
              backgroundSize: "200% 200%",
              animation: "shimmer 3s linear infinite",
              mixBlendMode: "overlay",
            }}
          />
        </>
      )}
    </div>
  );
}

export function LogoWordmark({ className, size = 32, animated }: { className?: string; size?: number; animated?: boolean }) {
  return (
    <div className={cn("flex items-center gap-2.5", className)}>
      <LogoMark size={size} animated={animated} />
      <div className="flex flex-col leading-none">
        <span className="font-black text-lg tracking-tight bg-gradient-to-r from-cyan via-blue to-purple bg-clip-text text-transparent">
          LISBOA
        </span>
        {size >= 32 && (
          <span className="text-[9px] font-semibold text-dim uppercase tracking-[0.2em] mt-0.5">
            Creative Studio
          </span>
        )}
      </div>
    </div>
  );
}

/* ─────────────────────────────────────────────────────────────
 * NEON BACKDROP (floating orbs + grid pattern)
 * ──────────────────────────────────────────────────────────── */

export function NeonBackdrop({ className, intensity = "default" }: { className?: string; intensity?: "default" | "subtle" | "intense" }) {
  const opacityMap = { subtle: 0.1, default: 0.2, intense: 0.35 };
  const o = opacityMap[intensity];
  return (
    <div className={cn("absolute inset-0 overflow-hidden pointer-events-none", className)}>
      <div
        className="orb-animate absolute -top-32 -right-20 w-[400px] h-[400px] rounded-full blur-3xl"
        style={{
          background: "radial-gradient(circle, rgba(168,85,247,0.4) 0%, transparent 70%)",
          opacity: o,
        }}
      />
      <div
        className="orb-animate absolute top-1/3 -left-24 w-[360px] h-[360px] rounded-full blur-3xl"
        style={{
          background: "radial-gradient(circle, rgba(34,211,238,0.35) 0%, transparent 70%)",
          opacity: o,
        }}
      />
      <div
        className="orb-animate absolute -bottom-20 right-1/4 w-[340px] h-[340px] rounded-full blur-3xl"
        style={{
          background: "radial-gradient(circle, rgba(53,92,255,0.35) 0%, transparent 70%)",
          opacity: o * 0.75,
        }}
      />
      <div
        className="orb-animate absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[280px] h-[280px] rounded-full blur-3xl"
        style={{
          background: "radial-gradient(circle, rgba(236,72,153,0.25) 0%, transparent 70%)",
          opacity: o * 0.5,
        }}
      />
      <svg
        className="absolute inset-0 w-full h-full opacity-[0.04]"
        viewBox="0 0 100 100"
        preserveAspectRatio="none"
      >
        <line x1="0" y1="20" x2="100" y2="20" stroke="white" strokeWidth="0.3" />
        <line x1="0" y1="40" x2="100" y2="40" stroke="white" strokeWidth="0.3" />
        <line x1="0" y1="60" x2="100" y2="60" stroke="white" strokeWidth="0.3" />
        <line x1="0" y1="80" x2="100" y2="80" stroke="white" strokeWidth="0.3" />
        <line x1="20" y1="0" x2="20" y2="100" stroke="white" strokeWidth="0.3" />
        <line x1="40" y1="0" x2="40" y2="100" stroke="white" strokeWidth="0.3" />
        <line x1="60" y1="0" x2="60" y2="100" stroke="white" strokeWidth="0.3" />
        <line x1="80" y1="0" x2="80" y2="100" stroke="white" strokeWidth="0.3" />
      </svg>
    </div>
  );
}

/* ─────────────────────────────────────────────────────────────
 * PREMIUM BADGE
 * ──────────────────────────────────────────────────────────── */

export function PremiumBadge({
  children,
  className,
  variant = "cyan",
  icon,
}: {
  children: ReactNode;
  className?: string;
  variant?: "cyan" | "purple" | "gold" | "pink" | "amber" | "green" | "red" | "blue";
  icon?: ReactNode;
}) {
  const variants = {
    cyan: "border-cyan/20 bg-cyan/5 text-cyan shadow-[0_0_20px_rgba(34,211,238,0.1)]",
    purple: "border-purple/20 bg-purple/5 text-purple shadow-[0_0_20px_rgba(168,85,247,0.1)]",
    gold: "border-amber/20 bg-amber/5 text-amber shadow-[0_0_20px_rgba(245,158,11,0.1)]",
    pink: "border-pink/20 bg-pink/5 text-pink shadow-[0_0_20px_rgba(236,72,153,0.1)]",
    amber: "border-amber/20 bg-amber/5 text-amber shadow-[0_0_20px_rgba(245,158,11,0.1)]",
    green: "border-green/20 bg-green/5 text-green shadow-[0_0_20px_rgba(53,211,153,0.1)]",
    red: "border-red/20 bg-red/5 text-red shadow-[0_0_20px_rgba(239,68,68,0.1)]",
    blue: "border-blue/20 bg-blue/5 text-blue shadow-[0_0_20px_rgba(53,92,255,0.1)]",
  };

  return (
    <span
      className={cn(
        "inline-flex items-center gap-1.5 text-[10px] font-bold uppercase tracking-[0.2em] px-3 py-1.5 rounded-full border",
        variants[variant],
        className
      )}
    >
      {icon}
      {children}
    </span>
  );
}

/* ─────────────────────────────────────────────────────────────
 * POINTS DISPLAY
 * ──────────────────────────────────────────────────────────── */

export function PointsDisplay({
  points,
  className,
  label,
  icon = "star",
}: {
  points: number;
  className?: string;
  label?: string;
  icon?: "star" | "zap" | "sparkles";
}) {
  const iconPath = {
    star: "M12 2l3 7h7l-5 4 2 7-7-4-7 4 2-7-5-4h7l3-7z",
    zap: "M13 2L3 14h9l-1 8 10-12h-9l1-8z",
    sparkles: "M12 3v3m0 12v3M3 12h3m12 0h3M5.6 5.6l2.1 2.1m8.6 8.6l2.1 2.1M5.6 18.4l2.1-2.1m8.6-8.6l2.1-2.1",
  }[icon];

  return (
    <div
      className={cn(
        "inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-cyan/5 border border-cyan/20 text-cyan text-xs font-bold",
        "hover:bg-cyan/10 hover:border-cyan/30 transition-colors",
        className
      )}
    >
      <svg className="w-3.5 h-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
        <path d={iconPath} />
      </svg>
      <span>{points.toLocaleString("pt-BR")}</span>
      {label && <span className="text-cyan/70 text-[10px] uppercase tracking-wider">{label}</span>}
    </div>
  );
}

/* ─────────────────────────────────────────────────────────────
 * AVATAR CIRCLE (gradient initial avatar with online dot)
 * ──────────────────────────────────────────────────────────── */

export function AvatarCircle({
  name,
  size = "md",
  className,
  online,
  ring,
}: {
  name?: string;
  size?: "xs" | "sm" | "md" | "lg" | "xl" | "2xl";
  className?: string;
  online?: boolean;
  ring?: boolean;
}) {
  const sizes = {
    xs: "w-6 h-6 text-[10px]",
    sm: "w-8 h-8 text-xs",
    md: "w-10 h-10 text-sm",
    lg: "w-14 h-14 text-lg",
    xl: "w-20 h-20 text-2xl",
    "2xl": "w-28 h-28 text-4xl",
  };
  const dotSize = { xs: "w-1.5 h-1.5", sm: "w-2 h-2", md: "w-2.5 h-2.5", lg: "w-3 h-3", xl: "w-3.5 h-3.5", "2xl": "w-4 h-4" };
  const initial = (name || "?")?.[0]?.toUpperCase() || "?";

  return (
    <div className={cn("relative inline-flex", className)}>
      {ring && (
        <div className="absolute -inset-1 rounded-full conic-ring opacity-60 blur-[2px]" />
      )}
      <div
        className={cn(
          "relative rounded-full bg-gradient-to-br from-cyan via-purple to-pink flex items-center justify-center font-black text-white shrink-0",
          "shadow-[0_0_30px_rgba(34,211,238,0.2)]",
          sizes[size]
        )}
      >
        <div className="absolute inset-0 rounded-full bg-black/10" />
        <span className="relative z-10">{initial}</span>
      </div>
      {online && (
        <span
          className={cn(
            "absolute bottom-0 right-0 rounded-full bg-green border-2 border-bg beacon",
            dotSize[size]
          )}
        />
      )}
    </div>
  );
}

/* ─────────────────────────────────────────────────────────────
 * SPOTLIGHT CARD (mouse-tracking glow border)
 * ──────────────────────────────────────────────────────────── */

export function SpotlightCard({
  children,
  className,
  glowColor = "rgba(34,211,238,0.15)",
}: {
  children: ReactNode;
  className?: string;
  glowColor?: string;
}) {
  const ref = useRef<HTMLDivElement>(null);

  const onMove = (e: React.MouseEvent) => {
    const el = ref.current;
    if (!el) return;
    const r = el.getBoundingClientRect();
    el.style.setProperty("--mx", `${e.clientX - r.left}px`);
    el.style.setProperty("--my", `${e.clientY - r.top}px`);
  };

  return (
    <div
      ref={ref}
      onMouseMove={onMove}
      className={cn(
        "group relative overflow-hidden rounded-2xl border border-white/5 bg-card/60 backdrop-blur-sm",
        "transition-all duration-300 hover:border-white/10",
        className
      )}
      style={{
        background: `radial-gradient(400px circle at var(--mx, 50%) var(--my, 50%), ${glowColor}, transparent 50%)`,
      }}
    >
      <div className="relative z-10 bg-card/40 rounded-2xl h-full w-full">{children}</div>
    </div>
  );
}

/* ─────────────────────────────────────────────────────────────
 * ICON CHIP (rounded gradient tile for category icons)
 * ──────────────────────────────────────────────────────────── */

export function IconTile({
  children,
  className,
  variant = "cyan",
  size = "md",
}: {
  children: ReactNode;
  className?: string;
  variant?: "cyan" | "purple" | "pink" | "green" | "amber" | "blue" | "red";
  size?: "sm" | "md" | "lg" | "xl";
}) {
  const variants = {
    cyan: "from-cyan/30 via-cyan/10 to-transparent text-cyan border-cyan/20",
    purple: "from-purple/30 via-purple/10 to-transparent text-purple border-purple/20",
    pink: "from-pink/30 via-pink/10 to-transparent text-pink border-pink/20",
    green: "from-green/30 via-green/10 to-transparent text-green border-green/20",
    amber: "from-amber/30 via-amber/10 to-transparent text-amber border-amber/20",
    blue: "from-blue/30 via-blue/10 to-transparent text-blue border-blue/20",
    red: "from-red/30 via-red/10 to-transparent text-red border-red/20",
  };
  const sizes = {
    sm: "w-9 h-9",
    md: "w-12 h-12",
    lg: "w-16 h-16",
    xl: "w-20 h-20",
  };
  return (
    <div
      className={cn(
        "relative inline-flex items-center justify-center rounded-2xl border bg-gradient-to-br",
        "shadow-[inset_0_0_20px_rgba(255,255,255,0.02)]",
        variants[variant],
        sizes[size],
        className
      )}
    >
      {children}
    </div>
  );
}

/* ─────────────────────────────────────────────────────────────
 * SECTION HEADER (pre-styled header for sections)
 * ──────────────────────────────────────────────────────────── */

export function SectionHeader({
  badge,
  title,
  description,
  align = "center",
  className,
  children,
}: {
  badge?: ReactNode;
  title: ReactNode;
  description?: ReactNode;
  align?: "left" | "center";
  className?: string;
  children?: ReactNode;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
      className={cn(
        "mb-10 sm:mb-14 flex flex-col gap-3",
        align === "center" ? "items-center text-center" : "items-start text-left",
        className
      )}
    >
      {badge}
      <h2 className="text-3xl sm:text-4xl md:text-5xl font-black leading-[1.05] max-w-3xl">{title}</h2>
      {description && <p className="text-muted max-w-2xl text-base sm:text-lg leading-relaxed">{description}</p>}
      {children}
    </motion.div>
  );
}
