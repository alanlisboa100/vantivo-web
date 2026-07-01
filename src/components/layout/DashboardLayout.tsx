"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useAuth } from "@/lib/contexts/AuthContext";
import { useI18n } from "@/lib/contexts/I18nContext";
import { LogoMark } from "@/components/brand";
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
  };

  return (
    <svg
      className={cn("w-5 h-5", className)}
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
  const { user } = useAuth();
  const { t } = useI18n();

  return (
    <aside className="hidden lg:flex flex-col w-64 h-screen fixed left-0 top-0 bg-bg border-r border-white/5 z-50">
      <Link href="/dashboard" className="flex items-center gap-3 px-6 py-5 border-b border-white/5">
        <LogoMark size={36} />
        <span className="font-black text-lg">LISBOA</span>
      </Link>

      <nav className="flex-1 p-3 space-y-1 overflow-y-auto">
        <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-dim px-3 pt-4 pb-2">
          Principal
        </p>
        {NAV_ITEMS.map((item) => {
          const active = pathname === item.href;
          return (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                "flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-semibold transition-all",
                active
                  ? "bg-cyan/10 text-cyan border border-cyan/20"
                  : "text-muted hover:text-text hover:bg-white/5"
              )}
            >
              <NavIcon name={item.icon} />
              {item.label}
            </Link>
          );
        })}

        <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-dim px-3 pt-6 pb-2">
          Ferramentas
        </p>
        {HIDDEN_ITEMS.map((item) => {
          if (item.adminOnly && user?.role !== "admin") return null;
          const active = pathname.startsWith(item.href);
          return (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                "flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-semibold transition-all",
                active
                  ? "bg-purple/10 text-purple border border-purple/20"
                  : "text-muted hover:text-text hover:bg-white/5"
              )}
            >
              <NavIcon name={item.icon} />
              {item.label}
            </Link>
          );
        })}
      </nav>

      {user && (
        <div className="p-4 border-t border-white/5">
          <Link
            href="/dashboard/profile"
            className="flex items-center gap-3 px-3 py-2 rounded-xl hover:bg-white/5 transition-colors"
          >
            <div className="w-8 h-8 rounded-full bg-gradient-to-br from-purple to-cyan flex items-center justify-center text-xs font-bold">
              {user.displayName?.[0] || user.name?.[0] || user.email?.[0] || "?"}
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-sm font-semibold truncate">{user.displayName || user.name || user.email}</p>
              <p className="text-[11px] text-dim truncate">{user.email}</p>
            </div>
          </Link>
        </div>
      )}
    </aside>
  );
}

function BottomNav() {
  const pathname = usePathname();
  const { user } = useAuth();

  return (
    <nav className="lg:hidden fixed bottom-0 left-0 right-0 z-50 px-3 pb-[env(safe-area-inset-bottom,6px)] pt-0">
      <div className="bg-[rgba(5,7,20,0.97)] border border-cyan/20 rounded-[34px] shadow-[0_0_30px_rgba(34,211,238,0.15)] px-3 py-2 flex items-center justify-around">
        {NAV_ITEMS.map((item) => {
          const active = pathname === item.href;
          return (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                "flex flex-col items-center gap-0.5 px-3 py-2 rounded-xl transition-all relative",
                active ? "text-cyan" : "text-dim hover:text-muted"
              )}
            >
              <NavIcon name={item.icon} className={cn("w-5 h-5", active && "drop-shadow-[0_0_8px_rgba(34,211,238,0.5)]")} />
              {active && <span className="absolute -top-0.5 w-1 h-1 rounded-full bg-cyan" />}
            </Link>
          );
        })}
        {user?.role === "admin" && (
          <Link
            href="/dashboard/admin"
            className={cn(
              "flex flex-col items-center gap-0.5 px-3 py-2 rounded-xl transition-all",
              pathname.startsWith("/dashboard/admin") ? "text-purple" : "text-dim hover:text-muted"
            )}
          >
            <NavIcon name="shield" className="w-5 h-5" />
          </Link>
        )}
      </div>
    </nav>
  );
}

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen bg-bg">
      <Sidebar />
      <div className="lg:pl-64 pb-20 lg:pb-0">
        <main className="min-h-screen">{children}</main>
      </div>
      <BottomNav />
    </div>
  );
}
