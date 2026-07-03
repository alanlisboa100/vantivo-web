"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import {
  Sparkles, Camera, Image as ImageIcon, Wand2, ArrowRight, Crown,
  Zap, History, Plus, ChevronRight, Flame, MessageSquare, Scan,
  TrendingUp, Heart, Bookmark, Settings, Bell, Clock, Video,
} from "lucide-react";
import { useAuth } from "@/lib/contexts/AuthContext";
import { useI18n } from "@/lib/contexts/I18nContext";
import {
  LogoMark, NeonBackdrop, PremiumBadge, AvatarCircle, PointsDisplay,
  SectionHeader, IconTile,
} from "@/components/brand";
import { SHOWCASE_VIDEOS } from "@/constants/samples";
import {
  Card, Button, Chip, StatCard, Section, EmptyState, ProgressBar, Tabs, AuroraBg, NoiseOverlay, IconButton,
  SmartVideo, VideoCard, VideoMarquee,
} from "@/components/ui/barrel";
import { cn } from "@/lib/utils/cn";

const fadeUp = (delay = 0) => ({
  initial: { opacity: 0, y: 24 },
  animate: { opacity: 1, y: 0 },
  transition: { delay, duration: 0.5, ease: [0.16, 1, 0.3, 1] as any },
});

const QUICK_TOOLS = [
  { icon: Wand2, label: "Studio", sub: "Todas as ferramentas", href: "/dashboard/studio", color: "cyan", gradient: "from-cyan/30 via-cyan/5 to-transparent" },
  { icon: MessageSquare, label: "Assistente", sub: "Chat com IA", href: "/dashboard/assistant", color: "purple", gradient: "from-purple/30 via-purple/5 to-transparent" },
  { icon: Camera, label: "Editor", sub: "Edição de fotos", href: "/dashboard/photo-editor", color: "pink", gradient: "from-pink/30 via-pink/5 to-transparent" },
  { icon: Scan, label: "Galeria IA", sub: "Analisar imagens", href: "/dashboard/gallery-ai", color: "green", gradient: "from-green/30 via-green/5 to-transparent" },
];

const RECENT_CATEGORIES = [
  { id: "all", label: "Tudo" },
  { id: "images", label: "Imagens" },
  { id: "videos", label: "Vídeos" },
  { id: "edits", label: "Edições" },
];

const PROMPT_SUGGESTIONS = [
  "Logo minimalista para cafeteria",
  "Selfie em estilo anime Ghibli",
  "Capa de YouTube gaming 4K",
  "Foto de produto em fundo branco",
  "Retrato profissional corporativo",
  "Paisagem cyberpunk noturna",
];

export default function HomePage() {
  const { t } = useI18n();
  const { user, points } = useAuth();
  const [projects, setProjects] = useState<any[]>([]);
  const [welcome, setWelcome] = useState(true);
  const [activeCategory, setActiveCategory] = useState("all");
  const [greeting, setGreeting] = useState("");

  useEffect(() => {
    try {
      const raw = localStorage.getItem("vantivo.projects.v1");
      if (raw) setProjects(JSON.parse(raw).slice(0, 6));
      if (localStorage.getItem("vantivo.welcome.dismissed")) setWelcome(false);
    } catch {}

    const h = new Date().getHours();
    if (h < 6) setGreeting("Boa madrugada");
    else if (h < 12) setGreeting("Bom dia");
    else if (h < 18) setGreeting("Boa tarde");
    else setGreeting("Boa noite");
  }, []);

  const dismissWelcome = () => {
    setWelcome(false);
    localStorage.setItem("vantivo.welcome.dismissed", "true");
  };

  const planLabel = user?.plan
    ? ({ free: "FREE", premium: "START", quarterly: "PRO", yearly: "ULTRA" } as Record<string, string>)[user.plan]
    : "FREE";

  const planColor = user?.plan === "yearly" ? "amber" : user?.plan === "quarterly" ? "cyan" : user?.plan === "premium" ? "purple" : "dim";

  return (
    <div className="relative min-h-screen">
      <NeonBackdrop intensity="subtle" />

      <div className="relative z-10 max-w-6xl mx-auto px-4 sm:px-6 pt-6 pb-32 space-y-6 sm:space-y-8">
        {/* ─── Top Bar (greeting + points) ─── */}
        <motion.div {...fadeUp(0)} className="flex items-center justify-between gap-3">
          <Link href="/dashboard/profile" className="flex items-center gap-3 group min-w-0 flex-1">
            <AvatarCircle
              name={user?.displayName || user?.name || user?.email}
              size="md"
              online
              ring
            />
            <div className="min-w-0 flex-1">
              <p className="text-base sm:text-lg font-black truncate">
                {greeting}, <span className="text-gradient-cyan">{user?.displayName || user?.name?.split(" ")[0] || "Criador"}</span>
              </p>
              <p className="text-xs text-muted truncate">
                {points.toLocaleString("pt-BR")} pontos · Plano {planLabel}
              </p>
            </div>
          </Link>
          <Link href="/dashboard/premium" className="shrink-0">
            <PointsDisplay points={points} />
          </Link>
        </motion.div>

        {/* ─── Welcome banner (new users) ─── */}
        {welcome && projects.length === 0 && (
          <motion.div {...fadeUp(0.05)} className="relative overflow-hidden rounded-3xl p-1">
            <div className="animated-border rounded-3xl">
              <div className="glass-card rounded-[22px] p-5 sm:p-6 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                <div className="flex items-start gap-4">
                  <div className="relative">
                    <div className="absolute inset-0 bg-cyan/20 blur-2xl rounded-full" />
                    <div className="relative w-12 h-12 rounded-2xl bg-gradient-to-br from-cyan/30 to-purple/30 flex items-center justify-center text-2xl">
                      👋
                    </div>
                  </div>
                  <div className="flex-1">
                    <p className="text-base sm:text-lg font-black mb-1">Bem-vindo ao LISBOA!</p>
                    <p className="text-sm text-muted leading-relaxed max-w-md">
                      Crie sua primeira arte em menos de 1 minuto. Você tem <b className="text-cyan">{points} pontos</b> pra começar.
                    </p>
                  </div>
                </div>
                <div className="flex items-center gap-2 shrink-0">
                  <Link href="/dashboard/studio">
                    <Button size="sm" rightIcon={<ArrowRight size={14} />}>
                      Começar
                    </Button>
                  </Link>
                  <IconButton onClick={dismissWelcome} variant="ghost" size="sm">
                    <span className="text-lg leading-none">×</span>
                  </IconButton>
                </div>
              </div>
            </div>
          </motion.div>
        )}

        {/* ─── Hero CTA ─── */}
        <motion.div
          {...fadeUp(0.1)}
          className="relative min-h-[260px] rounded-[28px] overflow-hidden group"
        >
          <div className="absolute inset-0 glass-card rounded-[28px]" />

          {/* Aurora background */}
          <div className="absolute inset-0 overflow-hidden pointer-events-none">
            <div className="absolute -top-24 -right-16 w-[300px] h-[300px] rounded-full bg-purple/20 blur-[120px] group-hover:bg-purple/25 transition-all duration-1000" />
            <div className="absolute -bottom-16 -left-8 w-[240px] h-[240px] rounded-full bg-cyan/15 blur-[100px] group-hover:bg-cyan/20 transition-all duration-1000" />
            <div className="absolute top-1/2 left-1/3 w-[200px] h-[200px] rounded-full bg-blue/10 blur-[80px]" />
          </div>

          <div className="absolute inset-0 bg-dots opacity-30" />

          <div className="relative z-10 p-6 sm:p-8">
            <div className="flex items-center gap-2 mb-3 flex-wrap">
              <PremiumBadge variant="cyan" icon={<Flame size={11} />}>
                {planLabel}
              </PremiumBadge>
              <span className="flex items-center gap-1 text-[10px] text-green font-bold">
                <span className="w-1.5 h-1.5 rounded-full bg-green beacon" />
                Online
              </span>
            </div>

            <h1 className="text-3xl sm:text-4xl md:text-5xl font-black leading-[1.05] mb-3">
              O que vamos <span className="text-gradient-cyan">criar hoje</span>?
            </h1>
            <p className="text-sm sm:text-base text-muted/80 mb-6 max-w-md leading-relaxed">
              12+ ferramentas de IA prontas pra usar. Comece pelo Studio ou peça uma ideia pro assistente.
            </p>

            <div className="flex flex-wrap gap-2 mb-6">
              <Link href="/dashboard/studio">
                <Button size="lg" glow rightIcon={<ArrowRight size={16} />}>
                  Abrir Studio
                </Button>
              </Link>
              <Link href="/dashboard/assistant">
                <Button variant="cyber" size="lg" leftIcon={<MessageSquare size={15} />}>
                  Falar com a IA
                </Button>
              </Link>
            </div>

            {/* Stats row */}
            <div className="grid grid-cols-3 gap-2 sm:gap-3">
              <div className="glass rounded-2xl p-3 border border-white/5 text-center">
                <Zap size={14} className="mx-auto mb-1 text-cyan" />
                <p className="text-base sm:text-lg font-black text-cyan">{points.toLocaleString("pt-BR")}</p>
                <p className="text-[10px] text-muted uppercase tracking-wider font-bold">Pontos</p>
              </div>
              <div className="glass rounded-2xl p-3 border border-white/5 text-center">
                <ImageIcon size={14} className="mx-auto mb-1 text-purple" />
                <p className="text-base sm:text-lg font-black text-purple">{projects.length}</p>
                <p className="text-[10px] text-muted uppercase tracking-wider font-bold">Criações</p>
              </div>
              <div className="glass rounded-2xl p-3 border border-white/5 text-center">
                <Crown size={14} className={cn("mx-auto mb-1", `text-${planColor === "dim" ? "muted" : planColor}`)} />
                <p className={cn("text-base sm:text-lg font-black", `text-${planColor === "dim" ? "muted" : planColor}`)}>{planLabel}</p>
                <p className="text-[10px] text-muted uppercase tracking-wider font-bold">Plano</p>
              </div>
            </div>
          </div>
        </motion.div>

        {/* ─── Quick Tools ─── */}
        <motion.div {...fadeUp(0.2)}>
          <div className="flex items-center justify-between mb-4">
            <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-dim">Acesso rápido</p>
            <Link href="/dashboard/studio" className="text-xs text-cyan font-bold hover:underline flex items-center gap-1">
              Ver tudo <ChevronRight size={12} />
            </Link>
          </div>
          <div className="grid grid-cols-2 gap-3">
            {QUICK_TOOLS.map((tool) => (
              <Link key={tool.href} href={tool.href}>
                <Card className="p-4 cursor-pointer border border-white/5 overflow-hidden relative group" glow="none" hover>
                  <div className={cn("absolute inset-0 bg-gradient-to-br opacity-0 group-hover:opacity-100 transition-opacity duration-500", tool.gradient)} />
                  <div className="relative z-10 flex items-start gap-3">
                    <IconTile variant={tool.color as any} size="md">
                      <tool.icon size={20} />
                    </IconTile>
                    <div className="min-w-0 flex-1">
                      <p className="text-sm font-black mb-0.5 group-hover:text-cyan transition-colors">{tool.label}</p>
                      <p className="text-xs text-muted truncate">{tool.sub}</p>
                    </div>
                  </div>
                </Card>
              </Link>
            ))}
          </div>
        </motion.div>

        {/* ─── Prompt Suggestions ─── */}
        <motion.div {...fadeUp(0.25)}>
          <Card className="p-5" glow="none" hover={false} glass>
            <div className="flex items-center gap-2 mb-3">
              <Sparkles size={14} className="text-cyan" />
              <p className="text-sm font-bold">Sugestões pra você</p>
            </div>
            <div className="flex flex-wrap gap-2">
              {PROMPT_SUGGESTIONS.map((p) => (
                <button
                  key={p}
                  onClick={() => {
                    navigator.clipboard.writeText(p);
                    // copy + nav
                    if (typeof window !== "undefined") {
                      window.location.href = "/dashboard/studio";
                    }
                  }}
                  className="text-xs px-3 py-1.5 rounded-full bg-white/[0.04] border border-white/5 text-muted hover:bg-white/[0.08] hover:text-text hover:border-cyan/20 transition-all"
                >
                  {p}
                </button>
              ))}
            </div>
          </Card>
        </motion.div>

        {/* ─── Vídeo Showcase ─── */}
        <motion.div {...fadeUp(0.32)}>
          <div className="flex items-center justify-between mb-4">
            <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-dim flex items-center gap-2">
              <Video size={11} className="text-cyan" /> Vídeos em destaque
            </p>
            <Link href="/dashboard/video-maker" className="text-xs text-cyan font-bold hover:underline flex items-center gap-1">
              Criar vídeo <ChevronRight size={12} />
            </Link>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {SHOWCASE_VIDEOS.slice(0, 2).map((v, i) => (
              <VideoCard key={i} video={v} aspect="video" />
            ))}
          </div>
        </motion.div>

        {/* ─── History ─── */}
        <motion.div {...fadeUp(0.3)}>
          <div className="flex items-center justify-between mb-4">
            <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-dim">Histórico recente</p>
            <Link href="/dashboard/workspace" className="text-xs text-cyan font-bold hover:underline flex items-center gap-1">
              Ver tudo <ChevronRight size={12} />
            </Link>
          </div>

          {projects.length > 0 ? (
            <div className="space-y-3">
              <Link href="/dashboard/workspace">
                <Card className="p-4" glow="purple" hover>
                  {projects[0].imageUrl ? (
                    <img src={projects[0].imageUrl} alt={projects[0].title} className="w-full h-44 sm:h-52 object-cover rounded-2xl mb-3" loading="lazy" />
                  ) : (
                    <div className="w-full h-44 sm:h-52 rounded-2xl bg-gradient-to-br from-purple/10 via-cyan/5 to-transparent flex items-center justify-center mb-3">
                      <span className="text-5xl float">🎨</span>
                    </div>
                  )}
                  <div className="flex items-start justify-between gap-3">
                    <div className="min-w-0 flex-1">
                      <p className="font-bold text-sm truncate">{projects[0].title || "Criação recente"}</p>
                      <p className="text-xs text-muted mt-0.5 line-clamp-2">{projects[0].description || ""}</p>
                    </div>
                    <Chip variant="cyan" size="sm">Recente</Chip>
                  </div>
                </Card>
              </Link>
              {projects.length > 1 && (
                <div className="flex gap-2 overflow-x-auto pb-1" style={{ scrollbarWidth: "none" }}>
                  {projects.slice(1, 6).map((p: any) => (
                    <img
                      key={p.id}
                      src={p.imageUrl}
                      alt=""
                      className="w-20 h-20 sm:w-24 sm:h-24 rounded-2xl object-cover flex-shrink-0 border border-white/5 hover:border-cyan/30 transition-all cursor-pointer"
                      loading="lazy"
                    />
                  ))}
                </div>
              )}
            </div>
          ) : (
            <EmptyState
              icon="✨"
              title="Nenhuma criação ainda"
              description="Comece pelo Studio e suas artes aparecem aqui automaticamente."
              action={
                <Link href="/dashboard/studio">
                  <Button leftIcon={<Plus size={14} />}>Abrir Studio</Button>
                </Link>
              }
            />
          )}
        </motion.div>
      </div>
    </div>
  );
}
