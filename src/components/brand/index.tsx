import { cn } from "@/lib/utils/cn";

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
            <feDropShadow dx="0" dy="0" stdDeviation="4" floodColor="#22D3EE" floodOpacity="0.3" />
          </filter>
        </defs>
        <rect width="48" height="48" rx="14" fill={`url(#logo-grad-${size})`} filter={`url(#logo-glow-${size})`} />
        {/* Inner glass highlight */}
        <rect x="2" y="2" width="44" height="44" rx="12" fill="none" stroke="rgba(255,255,255,0.12)" strokeWidth="1" />

        {/* Accent line */}
        <line x1="16" y1="14" x2="16" y2="34" stroke="rgba(255,255,255,0.2)" strokeWidth="1.5" strokeLinecap="round" />

        <text
          x="24"
          y="31"
          textAnchor="middle"
          fill="white"
          fontSize="24"
          fontWeight="900"
          fontFamily="system-ui, sans-serif"
          letterSpacing="-1"
        >
          L
        </text>
      </svg>

      {/* Glow aura behind */}
      {animated && (
        <div
          className="absolute -inset-2 rounded-full opacity-30 blur-xl animate-pulse"
          style={{
            background:
              "radial-gradient(circle, rgba(34,211,238,0.3) 0%, rgba(168,85,247,0.2) 50%, transparent 70%)",
          }}
        />
      )}
    </div>
  );
}

export function LogoWordmark({ className, size = 32, animated }: { className?: string; size?: number; animated?: boolean }) {
  return (
    <div className={cn("flex items-center gap-2.5", className)}>
      <LogoMark size={size} animated={animated} />
      <div>
        <span className="font-black text-lg tracking-tight bg-gradient-to-r from-cyan via-blue to-purple bg-clip-text text-transparent">
          LISBOA
        </span>
      </div>
    </div>
  );
}

export function NeonBackdrop({ className }: { className?: string }) {
  return (
    <div className={cn("absolute inset-0 overflow-hidden pointer-events-none", className)}>
      {/* Orbs */}
      <div
        className="orb-animate absolute -top-32 -right-20 w-[320px] h-[320px] rounded-full opacity-20 blur-3xl"
        style={{
          background:
            "radial-gradient(circle, rgba(168,85,247,0.4) 0%, transparent 70%)",
        }}
      />
      <div
        className="orb-animate absolute top-1/3 -left-24 w-[280px] h-[280px] rounded-full opacity-20 blur-3xl"
        style={{
          background:
            "radial-gradient(circle, rgba(34,211,238,0.3) 0%, transparent 70%)",
        }}
      />
      <div
        className="orb-animate absolute -bottom-20 right-1/4 w-[300px] h-[300px] rounded-full opacity-15 blur-3xl"
        style={{
          background:
            "radial-gradient(circle, rgba(53,92,255,0.3) 0%, transparent 70%)",
        }}
      />
      {/* Grid pattern */}
      <svg
        className="absolute inset-0 w-full h-full opacity-[0.03]"
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

export function PremiumBadge({
  children,
  className,
  variant = "cyan",
}: {
  children: React.ReactNode;
  className?: string;
  variant?: "cyan" | "purple" | "gold";
}) {
  const variants = {
    cyan:
      "border-cyan/20 bg-cyan/5 text-cyan shadow-[0_0_20px_rgba(34,211,238,0.1)]",
    purple:
      "border-purple/20 bg-purple/5 text-purple shadow-[0_0_20px_rgba(168,85,247,0.1)]",
    gold:
      "border-amber/20 bg-amber/5 text-amber shadow-[0_0_20px_rgba(245,158,11,0.1)]",
  };

  return (
    <span
      className={cn(
        "inline-flex items-center gap-1.5 text-[10px] font-bold uppercase tracking-[0.2em] px-3 py-1.5 rounded-full border",
        variants[variant],
        className
      )}
    >
      {variant === "gold" && (
        <svg className="w-3 h-3" viewBox="0 0 24 24" fill="currentColor">
          <path d="M12 2l3 7h7l-5 4 2 7-7-4-7 4 2-7-5-4h7l3-7z" />
        </svg>
      )}
      {children}
    </span>
  );
}

export function PointsDisplay({
  points,
  className,
}: {
  points: number;
  className?: string;
}) {
  return (
    <div
      className={cn(
        "inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-cyan/5 border border-cyan/20 text-cyan text-xs font-bold",
        className
      )}
    >
      <svg className="w-3.5 h-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
        <path d="M12 2l3 7h7l-5 4 2 7-7-4-7 4 2-7-5-4h7l3-7z" />
      </svg>
      {points.toLocaleString("pt-BR")}
    </div>
  );
}

export function AvatarCircle({
  name,
  size = "md",
  className,
}: {
  name?: string;
  size?: "sm" | "md" | "lg" | "xl";
  className?: string;
}) {
  const sizes = { sm: "w-8 h-8 text-xs", md: "w-10 h-10 text-sm", lg: "w-14 h-14 text-lg", xl: "w-20 h-20 text-2xl" };
  const initial = (name || "?")?.[0]?.toUpperCase() || "?";

  return (
    <div
      className={cn(
        "relative rounded-full bg-gradient-to-br from-cyan via-purple to-pink flex items-center justify-center font-bold text-white shrink-0",
        "shadow-[0_0_30px_rgba(34,211,238,0.2)]",
        sizes[size],
        className
      )}
    >
      <div className="absolute inset-0 rounded-full bg-black/10" />
      <span className="relative z-10">{initial}</span>
    </div>
  );
}
