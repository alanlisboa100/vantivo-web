"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import {
  Home, Grid3x3, Folder, User, Crown, MessageSquare, ImagePlus, Scan,
  Clock, Shield, Settings, LogOut, Search, Bell, ChevronDown, Sparkles,
  Plus, Zap, X, Menu, CreditCard, HelpCircle, BookOpen, Languages, Sun, Moon,
  Palette,
} from "lucide-react";
import { useAuth } from "@/lib/contexts/AuthContext";
import { useI18n } from "@/lib/contexts/I18nContext";
import { useTheme } from "@/lib/contexts/ThemeContext";
import { LogoMark, LogoWordmark, PremiumBadge, PointsDisplay, AvatarCircle } from "@/components/brand";
import { Button, IconButton, Input, Modal, Drawer, Tabs, Badge } from "@/components/ui/barrel";
import { cn } from "@/lib/utils/cn";
import { toast } from "sonner";

type NavItem = { href: string; icon: any; label: string; badge?: string; adminOnly?: boolean };

const NAV_PRIMARY: NavItem[] = [
  { href: "/dashboard", icon: Home, label: "Home" },
  { href: "/dashboard/studio", icon: Grid3x3, label: "Studio", badge: "IA" },
  { href: "/dashboard/workspace", icon: Folder, label: "Projetos" },
  { href: "/dashboard/profile", icon: User, label: "Perfil" },
  { href: "/dashboard/premium", icon: Crown, label: "Planos" },
];

const NAV_TOOLS: NavItem[] = [
  { href: "/dashboard/assistant", icon: MessageSquare, label: "Assistente" },
  { href: "/dashboard/photo-editor", icon: ImagePlus, label: "Editor de Fotos" },
  { href: "/dashboard/gallery-ai", icon: Scan, label: "Galeria IA" },
  { href: "/dashboard/focus-mode", icon: Clock, label: "Modo Foco" },
  { href: "/dashboard/admin", icon: Shield, label: "Admin", adminOnly: true },
];

const COMMAND_ITEMS: NavItem[] = [
  ...NAV_PRIMARY,
  ...NAV_TOOLS,
  { href: "/dashboard/cover", icon: ImagePlus, label: "Criar capa" },
  { href: "/dashboard/anime", icon: Sparkles, label: "Anime Studio" },
  { href: "/dashboard/redeem", icon: CreditCard, label: "Resgatar código" },
  { href: "/dashboard/settings", icon: Settings, label: "Configurações" },
  { href: "/dashboard/help", icon: HelpCircle, label: "Ajuda" },
];

/* ─────────────────────────────────────────────────────────────
 * SIDEBAR
 * ──────────────────────────────────────────────────────────── */

function Sidebar({ onClose }: { onClose?: () => void }) {
  const pathname = usePathname();
  const { user, points, logout } = useAuth();
  const { t } = useI18n();
  const router = useRouter();
  const [toolsOpen, setToolsOpen] = useState(true);

  const isActive = (href: string) => href === "/dashboard" ? pathname === "/dashboard" : pathname.startsWith(href);

  return (
    <aside className="flex flex-col w-64 h-screen shrink-0">
      <div className="absolute inset-0 bg-bg/85 backdrop-blur-2xl border-r border-white/5" />
      <div className="absolute inset-0 bg-dots opacity-20" />

      <div className="relative flex flex-col h-full">
        {/* Logo */}
        <Link
          href="/dashboard"
          onClick={onClose}
          className="flex items-center gap-3 px-5 h-[68px] border-b border-white/5 group"
        >
          <LogoMark size={32} />
          <div className="flex flex-col leading-none">
            <span className="font-black text-base tracking-tight bg-gradient-to-r from-cyan to-purple bg-clip-text text-transparent">
              LISBOA
            </span>
            {user?.plan && user.plan !== "free" && (
              <span className="text-[9px] font-bold text-dim uppercase tracking-wider mt-0.5">
                {user.plan === "premium" ? "Start" : user.plan === "quarterly" ? "Pro" : "Ultra"}
              </span>
            )}
          </div>
        </Link>

        {/* Quick action */}
        <div className="px-3 pt-3">
          <Button
            fullWidth
            size="sm"
            leftIcon={<Plus size={14} />}
            onClick={() => router.push("/dashboard/studio")}
          >
            Nova criação
          </Button>
        </div>

        {/* Navigation */}
        <nav className="flex-1 p-3 space-y-0.5 overflow-y-auto">
          {NAV_PRIMARY.map((item) => {
            const active = isActive(item.href);
            return (
              <Link
                key={item.href}
                href={item.href}
                onClick={onClose}
                className={cn(
                  "group relative flex items-center gap-3 px-3 py-2 rounded-xl text-sm font-semibold transition-all duration-200",
                  active ? "text-white" : "text-muted hover:text-text hover:bg-white/[0.04]"
                )}
              >
                {active && (
                  <motion.div
                    layoutId="sidebar-active"
                    className="absolute inset-0 bg-gradient-to-r from-cyan/15 via-purple/10 to-transparent rounded-xl border border-cyan/20"
                    transition={{ type: "spring", stiffness: 400, damping: 30 }}
                  />
                )}
                <div className="relative z-10 flex items-center gap-3 w-full">
                  <div className={cn(
                    "flex items-center justify-center w-7 h-7 rounded-lg transition-all",
                    active ? "bg-cyan/20 text-cyan" : "text-muted group-hover:text-text"
                  )}>
                    <item.icon size={15} />
                  </div>
                  <span className="flex-1">{item.label}</span>
                  {item.badge && (
                    <span className="text-[9px] font-black px-1.5 py-0.5 rounded-md bg-gradient-to-r from-cyan to-purple text-white">
                      {item.badge}
                    </span>
                  )}
                </div>
              </Link>
            );
          })}

          {/* Tools section */}
          <div className="pt-4">
            <button
              onClick={() => setToolsOpen(!toolsOpen)}
              className="flex items-center justify-between w-full px-3 py-2 text-[10px] font-bold uppercase tracking-[0.2em] text-dim hover:text-muted transition-colors"
            >
              <span>Ferramentas</span>
              <ChevronDown size={12} className={cn("transition-transform", !toolsOpen && "-rotate-90")} />
            </button>
            <AnimatePresence initial={false}>
              {toolsOpen && (
                <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: "auto", opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.2 }}
                  className="overflow-hidden"
                >
                  <div className="space-y-0.5 pt-0.5">
                    {NAV_TOOLS.map((item) => {
                      if (item.adminOnly && user?.role !== "admin") return null;
                      const active = isActive(item.href);
                      return (
                        <Link
                          key={item.href}
                          href={item.href}
                          onClick={onClose}
                          className={cn(
                            "group relative flex items-center gap-3 px-3 py-2 rounded-xl text-sm font-semibold transition-all duration-200",
                            active ? "text-white" : "text-muted hover:text-text hover:bg-white/[0.04]"
                          )}
                        >
                          {active && (
                            <div className="absolute inset-0 bg-gradient-to-r from-purple/15 to-pink/10 rounded-xl border border-purple/20" />
                          )}
                          <div className="relative z-10 flex items-center gap-3 w-full">
                            <div className={cn(
                              "flex items-center justify-center w-7 h-7 rounded-lg transition-all",
                              active ? "bg-purple/20 text-purple" : "text-muted group-hover:text-text"
                            )}>
                              <item.icon size={15} />
                            </div>
                            <span>{item.label}</span>
                          </div>
                        </Link>
                      );
                    })}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </nav>

        {/* Plan card */}
        {user && (
          <div className="p-3">
            <div className="relative rounded-2xl overflow-hidden p-3 bg-gradient-to-br from-cyan/10 via-purple/10 to-pink/10 border border-white/5">
              <div className="absolute -top-8 -right-8 w-20 h-20 rounded-full bg-cyan/20 blur-2xl" />
              <div className="relative">
                <p className="text-[10px] font-bold uppercase tracking-wider text-dim mb-1">Seu plano</p>
                <p className="text-sm font-black mb-2">
                  {user.plan === "free" ? "Free" : user.plan === "premium" ? "Start" : user.plan === "quarterly" ? "Pro" : "Ultra"}
                </p>
                <div className="flex items-center gap-1.5 text-xs mb-3">
                  <Zap size={12} className="text-cyan" />
                  <span className="font-bold">{points.toLocaleString("pt-BR")}</span>
                  <span className="text-muted">pontos</span>
                </div>
                <Link href="/dashboard/premium" onClick={onClose}>
                  <Button size="sm" variant="primary" fullWidth>
                    Fazer upgrade
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        )}

        {/* User footer */}
        {user && (
          <div className="p-3 border-t border-white/5">
            <UserMenu user={user} onLogout={logout} />
          </div>
        )}
      </div>
    </aside>
  );
}

/* ─────────────────────────────────────────────────────────────
 * USER MENU
 * ──────────────────────────────────────────────────────────── */

function UserMenu({ user, onLogout }: { user: any; onLogout: () => Promise<void> }) {
  const router = useRouter();
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false);
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  const handleLogout = async () => {
    setOpen(false);
    await onLogout();
    router.push("/");
  };

  return (
    <div ref={ref} className="relative">
      <button
        onClick={() => setOpen(!open)}
        className="w-full flex items-center gap-3 p-2 rounded-xl hover:bg-white/[0.04] transition-colors group"
      >
        <AvatarCircle name={user.displayName || user.name || user.email} size="sm" online />
        <div className="flex-1 min-w-0 text-left">
          <p className="text-sm font-semibold truncate group-hover:text-cyan transition-colors">
            {user.displayName || user.name || user.email?.split("@")[0]}
          </p>
          <p className="text-[10px] text-dim truncate">
            {user.plan === "free" ? user.email : `${user.email}`}
          </p>
        </div>
        <ChevronDown size={14} className={cn("text-dim transition-transform", open && "rotate-180")} />
      </button>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: 8, scale: 0.96 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 8, scale: 0.96 }}
            transition={{ duration: 0.15 }}
            className="absolute bottom-full left-0 right-0 mb-2 glass-strong rounded-2xl p-2 border border-white/10 shadow-[0_0_40px_rgba(0,0,0,0.5)]"
          >
            <Link
              href="/dashboard/profile"
              onClick={() => setOpen(false)}
              className="flex items-center gap-3 px-3 py-2 rounded-lg text-sm hover:bg-white/5 transition-colors"
            >
              <User size={14} className="text-dim" />
              <span>Meu perfil</span>
            </Link>
            <Link
              href="/dashboard/premium"
              onClick={() => setOpen(false)}
              className="flex items-center gap-3 px-3 py-2 rounded-lg text-sm hover:bg-white/5 transition-colors"
            >
              <Crown size={14} className="text-amber" />
              <span>Planos & pontos</span>
            </Link>
            <Link
              href="/dashboard/settings"
              onClick={() => setOpen(false)}
              className="flex items-center gap-3 px-3 py-2 rounded-lg text-sm hover:bg-white/5 transition-colors"
            >
              <Settings size={14} className="text-dim" />
              <span>Configurações</span>
            </Link>
            <div className="my-1 h-px bg-white/5" />
            <button
              onClick={handleLogout}
              className="w-full flex items-center gap-3 px-3 py-2 rounded-lg text-sm hover:bg-red/10 text-red transition-colors"
            >
              <LogOut size={14} />
              <span>Sair</span>
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

/* ─────────────────────────────────────────────────────────────
 * TOPBAR
 * ──────────────────────────────────────────────────────────── */

function Topbar({ onMenu, onOpenSearch, onOpenNotif }: { onMenu: () => void; onOpenSearch: () => void; onOpenNotif: () => void }) {
  const { user, points } = useAuth();
  return (
    <header className="sticky top-0 z-30 backdrop-blur-xl bg-bg/70 border-b border-white/5">
      <div className="h-16 px-4 lg:px-6 flex items-center justify-between gap-3">
        <div className="flex items-center gap-2">
          <IconButton onClick={onMenu} variant="ghost" size="sm" className="lg:hidden">
            <Menu size={18} />
          </IconButton>
          <button
            onClick={onOpenSearch}
            className="hidden sm:flex items-center gap-2 px-3 py-1.5 rounded-xl bg-white/[0.04] border border-white/5 hover:bg-white/[0.08] hover:border-white/10 transition-colors text-sm text-muted hover:text-text min-w-[200px] lg:min-w-[280px]"
          >
            <Search size={14} />
            <span className="flex-1 text-left">Buscar...</span>
            <kbd className="hidden md:inline text-[10px] font-mono px-1.5 py-0.5 rounded bg-white/5 border border-white/10">⌘K</kbd>
          </button>
        </div>

        <div className="flex items-center gap-2">
          <Link href="/dashboard/premium" className="hidden sm:block">
            <PointsDisplay points={points} className="!text-xs" />
          </Link>
          <IconButton onClick={onOpenNotif} variant="ghost" size="sm" className="relative">
            <Bell size={16} />
            <span className="absolute top-1.5 right-1.5 w-1.5 h-1.5 rounded-full bg-pink shadow-[0_0_6px_rgba(236,72,153,0.6)]" />
          </IconButton>
        </div>
      </div>
    </header>
  );
}

/* ─────────────────────────────────────────────────────────────
 * COMMAND PALETTE
 * ──────────────────────────────────────────────────────────── */

function CommandPalette({ open, onClose }: { open: boolean; onClose: () => void }) {
  const [q, setQ] = useState("");
  const router = useRouter();

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [open, onClose]);

  const items = COMMAND_ITEMS.filter((i) =>
    q === "" || i.label.toLowerCase().includes(q.toLowerCase())
  );

  const handleSelect = (href: string) => {
    router.push(href);
    setQ("");
    onClose();
  };

  return (
    <Modal open={open} onClose={onClose} size="md" className="!p-0">
      <div className="p-3 border-b border-white/5">
        <Input
          autoFocus
          placeholder="Buscar ferramentas, páginas, ações..."
          value={q}
          onChange={(e) => setQ(e.target.value)}
          icon={<Search size={14} />}
        />
      </div>
      <div className="max-h-80 overflow-y-auto p-2">
        {items.length === 0 ? (
          <p className="text-center text-muted text-sm py-8">Nada encontrado pra &ldquo;{q}&rdquo;</p>
        ) : (
          items.map((item) => (
            <button
              key={item.href}
              onClick={() => handleSelect(item.href)}
              className="w-full flex items-center gap-3 px-3 py-2.5 rounded-lg hover:bg-white/5 text-left transition-colors"
            >
              <div className="w-8 h-8 rounded-lg bg-white/5 flex items-center justify-center text-muted">
                <item.icon size={14} />
              </div>
              <span className="text-sm font-semibold flex-1">{item.label}</span>
              {item.badge && <Badge color="cyan" size="sm">{item.badge}</Badge>}
            </button>
          ))
        )}
      </div>
      <div className="p-3 border-t border-white/5 flex items-center justify-between text-[10px] text-dim">
        <span className="flex items-center gap-2">
          <kbd className="px-1.5 py-0.5 rounded bg-white/5 border border-white/10">↑↓</kbd>
          navegar
        </span>
        <span className="flex items-center gap-2">
          <kbd className="px-1.5 py-0.5 rounded bg-white/5 border border-white/10">↵</kbd>
          abrir
        </span>
        <span className="flex items-center gap-2">
          <kbd className="px-1.5 py-0.5 rounded bg-white/5 border border-white/10">esc</kbd>
          fechar
        </span>
      </div>
    </Modal>
  );
}

/* ─────────────────────────────────────────────────────────────
 * NOTIFICATIONS DRAWER
 * ──────────────────────────────────────────────────────────── */

function NotificationsDrawer({ open, onClose }: { open: boolean; onClose: () => void }) {
  return (
    <Drawer open={open} onClose={onClose} title="Notificações" side="right">
      <div className="space-y-3">
        <div className="p-4 rounded-2xl border border-cyan/20 bg-cyan/5">
          <div className="flex items-start gap-3">
            <div className="w-9 h-9 rounded-xl bg-cyan/20 flex items-center justify-center shrink-0">
              <Sparkles size={16} className="text-cyan" />
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-sm font-bold mb-0.5">Novo modelo disponível</p>
              <p className="text-xs text-muted leading-relaxed">GPT Image 2 já tá no Studio. Gera imagens com qualidade absurda.</p>
              <p className="text-[10px] text-dim mt-2">há 2h</p>
            </div>
          </div>
        </div>

        <div className="p-4 rounded-2xl border border-purple/20 bg-purple/5">
          <div className="flex items-start gap-3">
            <div className="w-9 h-9 rounded-xl bg-purple/20 flex items-center justify-center shrink-0">
              <Crown size={16} className="text-purple" />
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-sm font-bold mb-0.5">Upgrade com 30% off</p>
              <p className="text-xs text-muted leading-relaxed">Aproveite o desconto anual. Termina em 3 dias.</p>
              <p className="text-[10px] text-dim mt-2">há 1d</p>
            </div>
          </div>
        </div>

        <div className="p-4 rounded-2xl border border-white/5 bg-white/[0.02]">
          <div className="flex items-start gap-3">
            <div className="w-9 h-9 rounded-xl bg-white/5 flex items-center justify-center shrink-0">
              <BookOpen size={16} className="text-muted" />
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-sm font-bold mb-0.5">Bem-vindo ao LISBOA!</p>
              <p className="text-xs text-muted leading-relaxed">Confira os tutoriais e crie sua primeira imagem em 2 minutos.</p>
              <p className="text-[10px] text-dim mt-2">há 3d</p>
            </div>
          </div>
        </div>
      </div>
    </Drawer>
  );
}

/* ─────────────────────────────────────────────────────────────
 * MOBILE BOTTOM NAV
 * ──────────────────────────────────────────────────────────── */

function MobileBottomNav() {
  const pathname = usePathname();
  const { user } = useAuth();
  const isActive = (href: string) => href === "/dashboard" ? pathname === "/dashboard" : pathname.startsWith(href);
  const items = NAV_PRIMARY.slice(0, 5);
  return (
    <nav className="lg:hidden fixed bottom-0 left-0 right-0 z-40 px-3 pb-[env(safe-area-inset-bottom,8px)] pt-1">
      <div className="glass-strong rounded-[28px] px-2 py-1.5 flex items-center justify-around shadow-[0_0_60px_rgba(34,211,238,0.1)]">
        {items.map((item) => {
          const active = isActive(item.href);
          return (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                "relative flex flex-col items-center gap-0.5 px-2 sm:px-3 py-1.5 rounded-xl transition-all",
                active ? "text-cyan" : "text-dim"
              )}
            >
              {active && (
                <motion.div layoutId="mobile-active" className="absolute inset-0 bg-cyan/10 rounded-xl border border-cyan/20" />
              )}
              <item.icon size={18} className="relative" />
              <span className="relative text-[9px] font-semibold">{item.label}</span>
            </Link>
          );
        })}
      </div>
    </nav>
  );
}

/* ─────────────────────────────────────────────────────────────
 * FLOATING ORBS
 * ──────────────────────────────────────────────────────────── */

function FloatingOrbs() {
  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden z-0">
      <div className="absolute top-1/4 left-1/4 w-[500px] h-[500px] bg-cyan/4 rounded-full blur-[140px] orb-animate opacity-30" />
      <div className="absolute bottom-1/4 right-1/4 w-[400px] h-[400px] bg-purple/4 rounded-full blur-[120px] orb-animate opacity-20" style={{ animationDelay: "-7s" }} />
    </div>
  );
}

/* ─────────────────────────────────────────────────────────────
 * MAIN LAYOUT
 * ──────────────────────────────────────────────────────────── */

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [notifOpen, setNotifOpen] = useState(false);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === "k") {
        e.preventDefault();
        setSearchOpen(true);
      }
    };
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, []);

  return (
    <div className="min-h-screen bg-bg relative">
      <FloatingOrbs />
      <CommandPalette open={searchOpen} onClose={() => setSearchOpen(false)} />
      <NotificationsDrawer open={notifOpen} onClose={() => setNotifOpen(false)} />

      {/* Desktop sidebar */}
      <div className="hidden lg:block fixed left-0 top-0 z-40">
        <Sidebar />
      </div>

      {/* Mobile sidebar drawer */}
      <AnimatePresence>
        {mobileOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setMobileOpen(false)}
              className="lg:hidden fixed inset-0 z-50 bg-black/60 backdrop-blur-sm"
            />
            <motion.div
              initial={{ x: "-100%" }}
              animate={{ x: 0 }}
              exit={{ x: "-100%" }}
              transition={{ type: "spring", stiffness: 400, damping: 40 }}
              className="lg:hidden fixed left-0 top-0 bottom-0 z-50 w-72"
            >
              <Sidebar onClose={() => setMobileOpen(false)} />
            </motion.div>
          </>
        )}
      </AnimatePresence>

      <div className="lg:pl-64 relative z-10 pb-24 lg:pb-0">
        <Topbar
          onMenu={() => setMobileOpen(true)}
          onOpenSearch={() => setSearchOpen(true)}
          onOpenNotif={() => setNotifOpen(true)}
        />
        <main className="min-h-[calc(100vh-64px)]">{children}</main>
      </div>

      <MobileBottomNav />
    </div>
  );
}
