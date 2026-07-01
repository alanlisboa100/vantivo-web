"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { useAuth } from "@/lib/contexts/AuthContext";
import { useI18n } from "@/lib/contexts/I18nContext";
import { LogoMark, NeonBackdrop, PremiumBadge } from "@/components/brand";
import { Card, Button, Badge } from "@/components/ui";
import { motion } from "framer-motion";

const stagger = (delay: number) => ({
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  transition: { delay, duration: 0.4, ease: "easeOut" as const },
});

export default function HomePage() {
  const { t } = useI18n();
  const { user, points } = useAuth();
  const [projects, setProjects] = useState<any[]>([]);
  const [welcome, setWelcome] = useState(true);

  useEffect(() => {
    try {
      const raw = localStorage.getItem("vantivo.projects.v1");
      if (raw) setProjects(JSON.parse(raw).slice(0, 6));
      if (localStorage.getItem("vantivo.welcome.dismissed")) setWelcome(false);
    } catch {}
  }, []);

  const dismissWelcome = () => {
    setWelcome(false);
    localStorage.setItem("vantivo.welcome.dismissed", "true");
  };

  const planLabel = user?.plan
    ? ({ free: "FREE", premium: "START", quarterly: "PRO", yearly: "ULTRA" } as Record<string, string>)[user.plan]
    : "FREE";

  return (
    <div className="relative min-h-screen">
      <NeonBackdrop />
      <div className="relative z-10 px-4 pt-4 pb-32">
        {/* Top Bar */}
        <motion.div {...stagger(0)} className="flex items-center justify-between mb-5">
          <Link href="/dashboard/profile" className="flex items-center gap-3 group">
            <div className="w-10 h-10 rounded-full bg-gradient-to-br from-purple via-pink to-cyan flex items-center justify-center text-sm font-bold shadow-[0_0_15px_rgba(168,85,247,0.3)] group-hover:shadow-[0_0_20px_rgba(168,85,247,0.5)] transition-shadow">
              {user?.displayName?.[0] || user?.name?.[0] || user?.email?.[0] || "?"}
            </div>
            <div>
              <p className="text-sm font-bold">{user?.displayName || user?.name || "Usuário"}</p>
              <p className="text-[11px] text-muted capitalize">{planLabel}</p>
            </div>
          </Link>
          <Link
            href="/dashboard/premium"
            className="flex items-center gap-1.5 bg-purple/10 border border-purple/20 rounded-full px-3.5 py-1.5 hover:bg-purple/15 transition-colors"
          >
            <span className="text-yellow-400 text-xs drop-shadow-[0_0_4px_rgba(250,204,21,0.5)]">⚡</span>
            <span className="text-sm font-bold text-text">{points}</span>
            <span className="text-[10px] text-muted">{t("common.pts")}</span>
          </Link>
        </motion.div>

        {/* Welcome */}
        {welcome && projects.length === 0 && (
          <motion.div
            {...stagger(0.05)}
            className="rounded-[20px] bg-gradient-to-r from-cyan/10 via-purple/5 to-transparent border border-cyan/20 p-4 mb-4 flex items-center justify-between"
          >
            <div className="flex items-center gap-3">
              <span className="text-2xl">👋</span>
              <div>
                <p className="text-sm font-bold">{t("home.welcomeTitle", { name: user?.displayName || "" })}</p>
                <p className="text-xs text-muted">{t("home.welcomeText")}</p>
              </div>
            </div>
            <button onClick={dismissWelcome} className="text-xs text-dim hover:text-text px-2 py-1">
              ✕
            </button>
          </motion.div>
        )}

        {/* Hero */}
        <motion.div
          {...stagger(0.1)}
          className="relative min-h-[320px] rounded-[30px] bg-card/50 border border-white/5 p-6 mb-5 overflow-hidden group"
        >
          <div className="absolute inset-0 overflow-hidden pointer-events-none">
            <div className="absolute -top-24 -right-16 w-[260px] h-[260px] rounded-full bg-purple/20 blur-[100px] group-hover:bg-purple/25 transition-all duration-1000" />
            <div className="absolute -bottom-16 -left-8 w-[200px] h-[200px] rounded-full bg-cyan/15 blur-[80px] group-hover:bg-cyan/20 transition-all duration-1000" />
          </div>

          <div className="relative z-10">
            <div className="flex items-center gap-2 mb-4">
              <LogoMark size={28} />
              <PremiumBadge>LISBOA</PremiumBadge>
              <span className="flex items-center gap-1 text-[10px] text-green font-semibold">
                <span className="w-1.5 h-1.5 rounded-full bg-green animate-pulse" />
                {t("common.online")}
              </span>
            </div>

            <h1 className="text-[34px] font-black leading-[1.05] mb-3">
              {t("home.heroTitle")}
            </h1>
            <p className="text-sm text-muted/80 mb-6 max-w-md">{t("home.heroSubtitle")}</p>

            <div className="flex flex-wrap gap-2 mb-6">
              <Link href="/dashboard/studio">
                <Button size="lg" className="shadow-[0_0_25px_rgba(34,211,238,0.25)]">
                  {t("home.createNow")}
                </Button>
              </Link>
              <Link href="/dashboard/assistant">
                <Button variant="secondary" size="lg">
                  {t("home.assistant")}
                </Button>
              </Link>
              {user?.role === "admin" && (
                <Link href="/dashboard/admin">
                  <Button variant="ghost" size="lg">{t("home.admin")}</Button>
                </Link>
              )}
            </div>

            <div className="grid grid-cols-3 gap-2">
              {[
                { label: points + " pts", sub: t("home.plan"), color: "purple" },
                { label: projects.length.toString(), sub: t("home.creations"), color: "cyan" },
                { label: planLabel, sub: t("home.plan"), color: "green" },
              ].map((stat, i) => (
                <div key={i} className="bg-white/5 rounded-2xl p-3 text-center border border-white/5">
                  <p className="text-sm font-black" style={{ color: `var(--${stat.color})` }}>{stat.label}</p>
                  <p className="text-[10px] text-muted">{stat.sub}</p>
                </div>
              ))}
            </div>
          </div>
        </motion.div>

        {/* Tools Grid */}
        <motion.div {...stagger(0.2)} className="mb-5">
          <div className="flex items-center justify-between mb-3">
            <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-dim">{t("home.tools")}</p>
          </div>
          <div className="grid grid-cols-2 gap-3">
            {[
              { icon: "🖼️", label: t("home.toolCovers"), sub: t("home.toolCoversSub"), href: "/dashboard/studio", gradient: "from-purple/20 via-transparent to-transparent" },
              { icon: "📣", label: t("home.toolAds"), sub: t("home.toolAdsSub"), href: "/dashboard/studio", gradient: "from-cyan/20 via-transparent to-transparent" },
              { icon: "🔍", label: t("home.toolGallery"), sub: t("home.toolGallerySub"), href: "/dashboard/gallery-ai", gradient: "from-pink/20 via-transparent to-transparent" },
              { icon: "🧠", label: t("home.toolAssistant"), sub: t("home.toolAssistantSub"), href: "/dashboard/assistant", gradient: "from-amber/20 via-transparent to-transparent" },
            ].map((tool, i) => (
              <motion.div key={i} {...stagger(0.2 + i * 0.05)}>
                <Link href={tool.href}>
                  <Card
                    className="p-4 hover:bg-white/5 transition-all duration-300 cursor-pointer border border-white/5 hover:border-cyan/20 overflow-hidden relative group"
                    glow="none"
                  >
                    <div className={`absolute inset-0 bg-gradient-to-br ${tool.gradient} opacity-0 group-hover:opacity-100 transition-opacity duration-500`} />
                    <div className="relative z-10">
                      <span className="text-2xl block mb-2">{tool.icon}</span>
                      <p className="text-sm font-bold mb-0.5">{tool.label}</p>
                      <p className="text-xs text-muted">{tool.sub}</p>
                    </div>
                  </Card>
                </Link>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* History */}
        <motion.div {...stagger(0.3)}>
          <div className="flex items-center justify-between mb-3">
            <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-dim">{t("home.history")}</p>
            <Link href="/dashboard/workspace" className="text-[11px] text-cyan font-semibold hover:underline">
              {t("home.seeAll")}
            </Link>
          </div>

          {projects.length > 0 ? (
            <div className="space-y-3">
              {projects.slice(0, 1).map((p: any, i: number) => (
                <motion.div key={p.id} {...stagger(0.35)}>
                  <Link href="/dashboard/workspace">
                    <Card className="p-4 hover:bg-white/5 transition-colors cursor-pointer" glow="purple">
                      {p.imageUrl ? (
                        <img src={p.imageUrl} alt={p.title} className="w-full h-36 object-cover rounded-2xl mb-3" loading="lazy" />
                      ) : (
                        <div className="w-full h-36 rounded-2xl bg-gradient-to-br from-purple/10 to-cyan/10 flex items-center justify-center mb-3">
                          <span className="text-3xl">🎨</span>
                        </div>
                      )}
                      <p className="font-bold">{p.title || t("workspace.creations")}</p>
                      <p className="text-xs text-muted">{p.description || ""}</p>
                    </Card>
                  </Link>
                </motion.div>
              ))}
              {projects.length > 1 && (
                <div className="flex gap-2 overflow-x-auto pb-1 scrollbar-none">
                  {projects.slice(1, 5).map((p: any) => (
                    <img
                      key={p.id}
                      src={p.imageUrl}
                      alt=""
                      className="w-[72px] h-[72px] rounded-xl object-cover flex-shrink-0 border border-white/5 hover:border-cyan/30 transition-colors cursor-pointer"
                      loading="lazy"
                    />
                  ))}
                </div>
              )}
            </div>
          ) : (
            <motion.div {...stagger(0.35)}>
              <Card className="p-8 text-center" glow="none">
                <span className="text-4xl block mb-3">🎨</span>
                <p className="text-sm text-muted mb-1">{t("home.noCreationsYet")}</p>
                <p className="text-xs text-dim mb-4">{t("home.startFromStudio")}</p>
                <Link href="/dashboard/studio">
                  <Button size="sm">{t("studio.open")}</Button>
                </Link>
              </Card>
            </motion.div>
          )}
        </motion.div>
      </div>
    </div>
  );
}
