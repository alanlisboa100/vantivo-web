"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { useAuth } from "@/lib/contexts/AuthContext";
import { useI18n } from "@/lib/contexts/I18nContext";
import { LogoMark, NeonBackdrop, PremiumBadge, AvatarCircle, PointsDisplay } from "@/components/brand";
import { Card, Button } from "@/components/ui";
import { motion } from "framer-motion";

const fadeUp = (delay: number) => ({
  initial: { opacity: 0, y: 24 },
  animate: { opacity: 1, y: 0 },
  transition: { delay, duration: 0.5, ease: "easeOut" as const },
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

  const tools = [
    { icon: "🎨", label: t("home.toolCovers"), sub: "Capas e anúncios", href: "/dashboard/studio", gradient: "from-purple/20 via-transparent to-transparent" },
    { icon: "🤖", label: "Assistente", sub: "Chat com IA", href: "/dashboard/assistant", gradient: "from-cyan/20 via-transparent to-transparent" },
    { icon: "📸", label: "Editor", sub: "Edição de fotos", href: "/dashboard/photo-editor", gradient: "from-pink/20 via-transparent to-transparent" },
    { icon: "🖼️", label: "Galeria IA", sub: "Analisar imagens", href: "/dashboard/gallery-ai", gradient: "from-green/20 via-transparent to-transparent" },
  ];

  return (
    <div className="relative min-h-screen">
      <NeonBackdrop />
      <div className="relative z-10 px-4 pt-4 pb-32 space-y-5">
        {/* ─── Top Bar ─── */}
        <motion.div {...fadeUp(0)} className="flex items-center justify-between">
          <Link href="/dashboard/profile" className="flex items-center gap-3 group">
            <AvatarCircle name={user?.displayName || user?.name || user?.email} size="md" />
            <div>
              <p className="text-sm font-bold group-hover:text-cyan transition-colors">
                {user?.displayName || user?.name || "Usuário"}
              </p>
              <p className="text-[11px] text-muted">{t("common.pts")} disponíveis</p>
            </div>
          </Link>
          <Link href="/dashboard/premium">
            <PointsDisplay points={points} />
          </Link>
        </motion.div>

        {/* ─── Welcome ─── */}
        {welcome && projects.length === 0 && (
          <motion.div {...fadeUp(0.05)} className="animated-border rounded-[20px]">
            <div className="glass-card rounded-[20px] p-4 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <span className="text-3xl float">👋</span>
                <div>
                  <p className="text-sm font-bold">{t("home.welcomeTitle", { name: user?.displayName || "" })}</p>
                  <p className="text-xs text-muted">{t("home.welcomeText")}</p>
                </div>
              </div>
              <button onClick={dismissWelcome} className="text-xs text-dim hover:text-text px-2 py-1 rounded-lg hover:bg-white/5 transition-colors">
                ✕
              </button>
            </div>
          </motion.div>
        )}

        {/* ─── Hero ─── */}
        <motion.div {...fadeUp(0.1)} className="relative min-h-[300px] rounded-[30px] overflow-hidden group">
          {/* Glass background */}
          <div className="absolute inset-0 glass-card rounded-[30px]" />
          
          {/* Gradient orbs */}
          <div className="absolute inset-0 overflow-hidden pointer-events-none">
            <div className="absolute -top-24 -right-16 w-[300px] h-[300px] rounded-full bg-purple/20 blur-[120px] group-hover:bg-purple/25 transition-all duration-1000" />
            <div className="absolute -bottom-16 -left-8 w-[240px] h-[240px] rounded-full bg-cyan/15 blur-[100px] group-hover:bg-cyan/20 transition-all duration-1000" />
            <div className="absolute top-1/2 left-1/3 w-[200px] h-[200px] rounded-full bg-blue/10 blur-[80px]" />
          </div>

          {/* Grid dots */}
          <div className="absolute inset-0 bg-dots opacity-40" />

          <div className="relative z-10 p-6">
            <div className="flex items-center gap-2 mb-4">
              <LogoMark size={24} animated />
              <PremiumBadge variant="cyan">LISBOA</PremiumBadge>
              <span className="flex items-center gap-1 text-[10px] text-green font-bold">
                <span className="w-1.5 h-1.5 rounded-full bg-green animate-pulse" />
                Online
              </span>
            </div>

            <h1 className="text-[34px] font-black leading-[1.05] mb-3 text-gradient-cyan">
              {t("home.heroTitle")}
            </h1>
            <p className="text-sm text-muted/80 mb-6 max-w-md">{t("home.heroSubtitle")}</p>

            <div className="flex flex-wrap gap-2 mb-6">
              <Link href="/dashboard/studio">
                <Button size="lg" glow className="shadow-[0_0_30px_rgba(34,211,238,0.3)]">
                  {t("home.createNow")}
                </Button>
              </Link>
              <Link href="/dashboard/assistant">
                <Button variant="cyber" size="lg">
                  {t("home.assistant")}
                </Button>
              </Link>
            </div>

            <div className="grid grid-cols-3 gap-2">
              {[
                { label: `${points}`, sub: t("home.plan"), color: "var(--purple)", icon: "⚡" },
                { label: String(projects.length), sub: "criações", color: "var(--cyan)", icon: "🎨" },
                { label: planLabel, sub: "plano", color: "var(--green)", icon: "💎" },
              ].map((stat, i) => (
                <div key={i} className="glass rounded-2xl p-3 text-center border border-white/5">
                  <span className="text-xs">{stat.icon}</span>
                  <p className="text-sm font-black mt-0.5" style={{ color: stat.color }}>{stat.label}</p>
                  <p className="text-[10px] text-muted mt-0.5">{stat.sub}</p>
                </div>
              ))}
            </div>
          </div>
        </motion.div>

        {/* ─── Tools ─── */}
        <motion.div {...fadeUp(0.2)}>
          <div className="flex items-center justify-between mb-3">
            <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-dim">Acesso rápido</p>
          </div>
          <div className="grid grid-cols-2 gap-3">
            {tools.map((tool, i) => (
              <Link key={i} href={tool.href}>
                <Card
                  className="p-4 cursor-pointer border border-white/5 overflow-hidden relative group"
                  glow="none"
                  hover
                >
                  <div className={`absolute inset-0 bg-gradient-to-br ${tool.gradient} opacity-0 group-hover:opacity-100 transition-opacity duration-500`} />
                  <div className="relative z-10">
                    <span className="text-2xl block mb-2 drop-shadow-[0_0_8px_rgba(255,255,255,0.1)]">{tool.icon}</span>
                    <p className="text-sm font-bold mb-0.5">{tool.label}</p>
                    <p className="text-xs text-muted">{tool.sub}</p>
                  </div>
                </Card>
              </Link>
            ))}
          </div>
        </motion.div>

        {/* ─── History ─── */}
        <motion.div {...fadeUp(0.3)}>
          <div className="flex items-center justify-between mb-3">
            <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-dim">{t("home.history")}</p>
            <Link href="/dashboard/workspace" className="text-[11px] text-cyan font-bold hover:underline">
              {t("home.seeAll")}
            </Link>
          </div>

          {projects.length > 0 ? (
            <div className="space-y-3">
              <Link href="/dashboard/workspace">
                <Card className="p-4" glow="purple" hover>
                  {projects[0].imageUrl ? (
                    <img src={projects[0].imageUrl} alt={projects[0].title} className="w-full h-40 object-cover rounded-2xl mb-3" loading="lazy" />
                  ) : (
                    <div className="w-full h-40 rounded-2xl bg-gradient-to-br from-purple/10 via-cyan/5 to-transparent flex items-center justify-center mb-3">
                      <span className="text-4xl">🎨</span>
                    </div>
                  )}
                  <p className="font-bold text-sm">{projects[0].title || "Criação recente"}</p>
                  <p className="text-xs text-muted mt-0.5">{projects[0].description || ""}</p>
                </Card>
              </Link>
              {projects.length > 1 && (
                <div className="flex gap-2 overflow-x-auto pb-1" style={{ scrollbarWidth: 'none' }}>
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
            <Card className="p-8 text-center" glow="none" hover={false}>
              <div className="w-16 h-16 rounded-full bg-gradient-to-br from-purple/20 to-cyan/20 flex items-center justify-center mx-auto mb-4">
                <span className="text-3xl">✨</span>
              </div>
              <p className="text-sm text-muted mb-1">{t("home.noCreationsYet")}</p>
              <p className="text-xs text-dim mb-4">{t("home.startFromStudio")}</p>
              <Link href="/dashboard/studio">
                <Button size="sm">{t("studio.open")}</Button>
              </Link>
            </Card>
          )}
        </motion.div>
      </div>
    </div>
  );
}
