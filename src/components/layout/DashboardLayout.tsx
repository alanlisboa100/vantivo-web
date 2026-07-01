"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useAuth } from "@/lib/contexts/AuthContext";
import { useI18n } from "@/lib/contexts/I18nContext";
import { LogoMark, PremiumBadge } from "@/components/brand";
import { cn } from "@/lib/utils/cn";

const NAV_ITEMS = [
  { href: "/dashboard", icon: "home", label: "Home" },
  { href: "/dashboard/studio", icon: "grid-3x3", label: "Studio" },
  { href: "/dashboard/workspace", icon: "folder", label: "Projetos" },
  { href: "/dashboard/profile", icon: "user", label: "Perfil" },
  { href: "/dashboard/premium", icon: "crown", label: "Planos" },
];

const HIDDEN_ITEMS = [
  { href: "/dashboard/assistant", icon: "message-square", label: "Assistente" },
  { href: "/dashboard/photo-editor", icon: "image-plus", label: "Editor" },
  { href: "/dashboard/gallery-ai", icon: "scan", label: "Galeria IA" },
  { href: "/dashboard/focus-mode", icon: "clock", label: "Foco" },
  { href: "/dashboard/admin", icon: "shield", label: "Admin", adminOnly: true },
];

function NavIcon({ name, className }: { name: string; className?: string }) {
  const icons: Record<string, string> = {
    home: "M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6",
    "grid-3x3": "M3 3h7v7H3V3zm11 0h7v7h-7V3zm-11 11h7v7H3v-7zm11 0h7v7h-7v-7z",
    folder: "M2 6a2 2 0 012-2h5l2 2h5a2 2 0 012 2v6a2 2 0 01-2 2H4a2 2 0 01-2-2V6z",
    user: "M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z",
    crown: "M12 2l3 7h7l-5 4 2 7-7-4-7 4 2-7-5-4h7l3-7z",
    "message-square": "M21 15a2 2 0 01-2 2H7l-4 4V5a2 2 0 012-2h14a2 2 0 012 2v10z",
    "image-plus": "M15 8h.01M12 20H5a2 2 0 01-2-2V6a2 2 0 012-2h10a2 2 0 012 2v3m-2 10h4m-2-2v4",
    scan: "M3 7V5a2 2 0 012-2h2M3 17v2a2 2 0 002 2h2M17 3h2a2 2 0 012 2v2M17 21h2a2 2 0 002-2v-2",
    clock: "M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z",
    shield: "M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z",
    chevron: "M9 5l7 7-7 7",
  };

  return (
    <svg
      className={cn("w-5 h-5 shrink-0", className)}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d={icons[name] || icons.home} />
    </svg>
  );
}

function Sidebar() {
  const pathname = usePathname();
  const { user, points } = useAuth();
  const { t } = useI18n();
  const [toolsOpen, setToolsOpen] = useState(false);
  const hasTools = HIDDEN_ITEMS.some(
    (item) => !item.adminOnly || user?.role === "admin"
  );

  return (
    <aside className="hidden lg:flex flex-col w-64 h-screen fixed left-0 top-0 z-50">
      {/* Glass background */}
      <div className="absolute inset-0 bg-bg/80 backdrop-blur-2xl border-r border-white/5" />
      <div className="absolute inset-0 bg-dots opacity-30" />

      {/* Content */}
      <div className="relative flex flex-col h-full">
        {/* Logo */}
        <Link
          href="/dashboard"
          className="flex items-center gap-3 px-6 h-[72px] border-b border-white/5 group"
        >
          <div className="relative">
            <LogoMark size={36} />
            <div className="absolute -inset-1 gradient-cyan rounded-lg opacity-0 group-hover:opacity-20 blur-md transition-opacity" />
          </div>
          <div>
            <span className="font-black text-lg tracking-tight bg-gradient-to-r from-cyan to-purple bg-clip-text text-transparent">
              LISBOA
            </span>
            {user?.plan && user.plan !== "free" && (
              <p className="text-[10px] font-semibold text-dim -mt-0.5">
                {t(`plan_${user.plan}`) || user.plan}
              </p>
            )}
          </div>
        </Link>

        {/* Navigation */}
        <nav className="flex-1 p-3 space-y-1 overflow-y-auto">
          <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-dim px-3 pt-4 pb-2">
            {t("nav_principal") || "Principal"}
          </p>
          {NAV_ITEMS.map((item) => {
            const active = pathname === item.href;
            return (
              <Link
                key={item.href}
                href={item.href}
                className={cn(
                  "group relative flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-semibold transition-all duration-200",
                  active
                    ? "text-white"
                    : "text-muted hover:text-text hover:bg-white/[0.04]"
                )}
              >
                {active && (
                  <div className="absolute inset-0 bg-gradient-to-r from-cyan/15 via-purple/10 to-transparent rounded-xl border border-cyan/20 shadow-[0_0_20px_rgba(34,211,238,0.06)]" />
                )}
                <div
                  className={cn(
                    "relative z-10 flex items-center gap-3 w-full",
                    active && "drop-shadow-[0_0_8px_rgba(34,211,238,0.3)]"
                  )}
                >
                  <div
                    className={cn(
                      "flex items-center justify-center w-8 h-8 rounded-lg transition-all duration-200",
                      active
                        ? "bg-cyan/20 text-cyan"
                        : "text-muted group-hover:text-text group-hover:bg-white/5"
                    )}
                  >
                    <NavIcon name={item.icon} />
                  </div>
                  <span>{t(item.label.toLowerCase()) || item.label}</span>
                </div>
              </Link>
            );
          })}

          {hasTools && (
            <>
              <div className="pt-4">
                <button
                  onClick={() => setToolsOpen(!toolsOpen)}
                  className="flex items-center justify-between w-full px-3 py-2 text-[10px] font-bold uppercase tracking-[0.2em] text-dim hover:text-muted transition-colors group"
                >
                  <span>{t("nav_tools") || "Ferramentas"}</span>
                  <NavIcon
                    name="chevron"
                    className={cn(
                      "w-4 h-4 transition-transform duration-200",
                      toolsOpen && "rotate-90"
                    )}
                  />
                </button>
              </div>

              {(toolsOpen ? HIDDEN_ITEMS : HIDDEN_ITEMS.slice(0, 2)).map((item) => {
                if (item.adminOnly && user?.role !== "admin") return null;
                const active = pathname.startsWith(item.href);
                return (
                  <Link
                    key={item.href}
                    href={item.href}
                    className={cn(
                      "group relative flex items-center gap-3 px-3 py-2 rounded-xl text-sm font-semibold transition-all duration-200",
                      active
                        ? "text-white"
                        : "text-muted hover:text-text hover:bg-white/[0.04]"
                    )}
                  >
                    {active && (
                      <div className="absolute inset-0 bg-gradient-to-r from-purple/15 via-pink/10 to-transparent rounded-xl border border-purple/20 shadow-[0_0_20px_rgba(168,85,247,0.06)]" />
                    )}
                    <div
                      className={cn(
                        "relative z-10 flex items-center gap-3 w-full",
                        active && "drop-shadow-[0_0_8px_rgba(168,85,247,0.3)]"
                      )}
                    >
                      <div
                        className={cn(
                          "flex items-center justify-center w-8 h-8 rounded-lg transition-all duration-200",
                          active
                            ? "bg-purple/20 text-purple"
                            : "text-muted group-hover:text-text group-hover:bg-white/5"
                        )}
                      >
                        <NavIcon name={item.icon} />
                      </div>
                      <span>{item.label}</span>
                    </div>
                  </Link>
                );
              })}

              {!toolsOpen && HIDDEN_ITEMS.length > 2 && (
                <button
                  onClick={() => setToolsOpen(true)}
                  className="flex items-center gap-2 px-3 py-2 ml-2 text-xs text-dim hover:text-muted transition-colors"
                >
                  <span className="w-1 h-1 rounded-full bg-dim" />
                  <span className="w-1 h-1 rounded-full bg-dim" />
                  <span className="w-1 h-1 rounded-full bg-dim" />
                  <span className="ml-1 text-[11px]">
                    +{HIDDEN_ITEMS.length - 2} mais
                  </span>
                </button>
              )}
            </>
          )}
        </nav>

        {/* User footer */}
        {user && (
          <div className="relative p-3 border-t border-white/5">
            <Link
              href="/dashboard/profile"
              className="group relative flex items-center gap-3 p-2 rounded-xl hover:bg-white/[0.04] transition-all duration-200"
            >
              <div className="relative shrink-0">
                <div className="w-9 h-9 rounded-full bg-gradient-to-br from-cyan via-purple to-pink flex items-center justify-center text-sm font-bold shadow-[0_0_20px_rgba(34,211,238,0.15)]">
                  {user.displayName?.[0] || user.name?.[0] || user.email?.[0] || "?"}
                </div>
                <div className="absolute -bottom-0.5 -right-0.5 w-3 h-3 bg-green rounded-full border-2 border-bg" />
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-semibold truncate group-hover:text-cyan transition-colors">
                  {user.displayName || user.name || user.email?.split("@")[0]}
                </p>
                <p className="text-[11px] text-dim truncate">
                  {user.plan !== "free"
                    ? `${points} pts`
                    : user.email}
                </p>
              </div>
              <div className="shrink-0">
                <div className="w-6 h-6 rounded-full bg-white/5 flex items-center justify-center group-hover:bg-white/10 transition-colors">
                  <NavIcon
                    name="chevron"
                    className="w-3 h-3 text-dim rotate-90"
                  />
                </div>
              </div>
            </Link>
          </div>
        )}
      </div>
    </aside>
  );
}

function BottomNav() {
  const pathname = usePathname();
  const { user } = useAuth();

  return (
    <nav className="lg:hidden fixed bottom-0 left-0 right-0 z-50 px-3 pb-[env(safe-area-inset-bottom,6px)] pt-0">
      <div className="glass-strong rounded-[34px] px-3 py-2 flex items-center justify-around shadow-[0_0_60px_rgba(34,211,238,0.08)]">
        {NAV_ITEMS.map((item) => {
          const active = pathname === item.href;
          return (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                "relative flex flex-col items-center gap-0.5 px-3 py-2 rounded-xl transition-all duration-200",
                active ? "text-cyan" : "text-dim hover:text-muted"
              )}
            >
              {active && (
                <div className="absolute inset-0 bg-cyan/10 rounded-xl border border-cyan/20" />
              )}
              <div className="relative">
                <NavIcon
                  name={item.icon}
                  className={cn(
                    "w-5 h-5 transition-all duration-200",
                    active && "drop-shadow-[0_0_8px_rgba(34,211,238,0.5)]"
                  )}
                />
                {active && (
                  <span className="absolute -top-1 -right-1 w-2 h-2 rounded-full bg-cyan shadow-[0_0_6px_rgba(34,211,238,0.6)]" />
                )}
              </div>
            </Link>
          );
        })}
        {user?.role === "admin" && (
          <Link
            href="/dashboard/admin"
            className={cn(
              "flex flex-col items-center gap-0.5 px-3 py-2 rounded-xl transition-all",
              pathname.startsWith("/dashboard/admin")
                ? "text-purple"
                : "text-dim hover:text-muted"
            )}
          >
            <NavIcon name="shield" className="w-5 h-5" />
          </Link>
        )}
      </div>
    </nav>
  );
}

function FloatingOrbs() {
  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden z-0">
      <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-cyan/5 rounded-full blur-[120px] orb-animate opacity-40" />
      <div className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-purple/5 rounded-full blur-[100px] orb-animate opacity-30" style={{ animationDelay: "-7s" }} />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-blue/4 rounded-full blur-[150px] orb-animate opacity-20" style={{ animationDelay: "-14s" }} />
    </div>
  );
}

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen bg-bg relative">
      <FloatingOrbs />
      <Sidebar />
      <div className="lg:pl-64 pb-20 lg:pb-0 relative z-10">
        <main className="min-h-screen">{children}</main>
      </div>
      <BottomNav />
    </div>
  );
}
