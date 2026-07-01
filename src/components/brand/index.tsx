import { cn } from "@/lib/utils/cn";

export function LogoMark({ className, size = 48 }: { className?: string; size?: number }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 48 48"
      className={cn("flex-shrink-0", className)}
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <rect width="48" height="48" rx="14" fill="url(#logo-gradient)" />
      <text
        x="24"
        y="31"
        textAnchor="middle"
        fill="white"
        fontSize="24"
        fontWeight="900"
        fontFamily="system-ui"
      >
        L
      </text>
      <defs>
        <linearGradient id="logo-gradient" x1="0" y1="0" x2="48" y2="48">
          <stop offset="0%" stopColor="#7C3AED" />
          <stop offset="50%" stopColor="#355CFF" />
          <stop offset="100%" stopColor="#22D3EE" />
        </linearGradient>
      </defs>
    </svg>
  );
}

export function LogoWordmark({ className, size = 32 }: { className?: string; size?: number }) {
  return (
    <div className={cn("flex items-center gap-2.5", className)}>
      <LogoMark size={size} />
      <span className="font-black text-lg tracking-tight" style={{ fontFamily: "system-ui" }}>
        LISBOA
      </span>
    </div>
  );
}

export function NeonBackdrop({ className }: { className?: string }) {
  return (
    <div className={cn("absolute inset-0 overflow-hidden pointer-events-none", className)}>
      <div
        className="orb-animate absolute -top-32 -right-20 w-[320px] h-[320px] rounded-full opacity-20 blur-3xl"
        style={{ background: "radial-gradient(circle, rgba(168,85,247,0.5) 0%, transparent 70%)" }}
      />
      <div
        className="orb-animate absolute top-1/3 -left-24 w-[280px] h-[280px] rounded-full opacity-20 blur-3xl"
        style={{ background: "radial-gradient(circle, rgba(34,211,238,0.4) 0%, transparent 70%)" }}
      />
      <div
        className="orb-animate absolute -bottom-20 right-1/4 w-[300px] h-[300px] rounded-full opacity-15 blur-3xl"
        style={{ background: "radial-gradient(circle, rgba(53,92,255,0.4) 0%, transparent 70%)" }}
      />
      <svg className="absolute inset-0 w-full h-full opacity-[0.03]" viewBox="0 0 100 100" preserveAspectRatio="none">
        <line x1="0" y1="20" x2="100" y2="20" stroke="white" strokeWidth="0.5" />
        <line x1="0" y1="40" x2="100" y2="40" stroke="white" strokeWidth="0.5" />
        <line x1="0" y1="60" x2="100" y2="60" stroke="white" strokeWidth="0.5" />
        <line x1="0" y1="80" x2="100" y2="80" stroke="white" strokeWidth="0.5" />
      </svg>
    </div>
  );
}

export function PremiumBadge({ children, className }: { children: React.ReactNode; className?: string }) {
  return (
    <span className={cn("text-[10px] font-bold uppercase tracking-[0.2em] px-3 py-1.5 rounded-full border border-cyan/20 bg-cyan/5 text-cyan", className)}>
      {children}
    </span>
  );
}
