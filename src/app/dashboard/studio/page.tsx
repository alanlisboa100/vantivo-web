"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import {
  Sparkles, Image as ImageIcon, MessageSquare, Camera, Wand2, Box,
  ChevronRight, Lock, Star, Zap, Search, Filter, Crown, Smartphone,
} from "lucide-react";
import { useAuth } from "@/lib/contexts/AuthContext";
import { useI18n } from "@/lib/contexts/I18nContext";
import { STUDIO_TOOLS } from "@/constants/theme";
import { SHOWCASE_VIDEOS, EPIC_PHOTOS } from "@/constants/samples";
import { LogoMark, PremiumBadge, SectionHeader, IconTile } from "@/components/brand";
import {
  Button, Card, Input, Chip, Tabs, Section, EmptyState, AuroraBg, NoiseOverlay,
} from "@/components/ui/barrel";
import { cn } from "@/lib/utils/cn";
import { toast } from "sonner";

const TOOL_ROUTES: Record<string, string> = {
  assistant: "/dashboard/assistant",
  enhance: "/dashboard/photo-editor",
  body: "/dashboard/photo-editor",
  tryon: "/dashboard/photo-editor",
  headshot: "/dashboard/photo-editor",
  camera: "/dashboard/photo-editor",
  product: "/dashboard/photo-editor",
  cover: "/dashboard/covers",
  anime: "/dashboard/anime-studio",
  avatar: "/dashboard/avatar-animator",
  video: "/dashboard/video-maker",
  faceswap: "/dashboard/face-swap",
  upscale: "/dashboard/upscale",
  bgremove: "/dashboard/bg-remove",
  avatarfalante: "/dashboard/talking-avatar",
  music: "/dashboard/music-maker",
  threed: "/dashboard/3d-model",
  apkbuilder: "/dashboard/apk-builder",
  redeem: "/dashboard/redeem",
};

const CATEGORIES = [
  { id: "all", label: "Todas" },
  { id: "criacao", label: "Criação" },
  { id: "edicao", label: "Edição" },
  { id: "video", label: "Vídeo" },
  { id: "premium", label: "Premium" },
];

const TOOL_CATEGORY: Record<string, string> = {
  assistant: "criacao", enhance: "edicao", body: "edicao", tryon: "edicao",
  headshot: "edicao", camera: "edicao", product: "edicao", cover: "criacao",
  anime: "criacao", avatar: "video", video: "video", faceswap: "edicao",
  upscale: "edicao", bgremove: "edicao", avatarfalante: "video", music: "criacao",
  threed: "criacao", apkbuilder: "premium", redeem: "premium",
};

const ICON_MAP: Record<string, any> = {
  assistant: MessageSquare, enhance: Sparkles, body: Wand2, tryon: Camera,
  headshot: Camera, camera: ImageIcon, product: Box, cover: ImageIcon,
  anime: Sparkles, avatar: Wand2, video: ImageIcon, faceswap: Wand2,
  upscale: ImageIcon, bgremove: ImageIcon, avatarfalante: MessageSquare,
  music: Sparkles, threed: Box, apkbuilder: Smartphone, redeem: Star,
};

export default function StudioPage() {
  const { t } = useI18n();
  const { points } = useAuth();
  const router = useRouter();
  const [query, setQuery] = useState("");
  const [activeCategory, setActiveCategory] = useState("all");

  const isAvailable = (cost: string) => !cost.includes("Breve");
  const isPremium = (cost: string) => cost.includes("50") || cost.includes("15") || cost.includes("12");

  const filteredTools = STUDIO_TOOLS.filter((t) => {
    const matchesQuery = query === "" || t.label.toLowerCase().includes(query.toLowerCase());
    const matchesCategory = activeCategory === "all" || TOOL_CATEGORY[t.key] === activeCategory;
    return matchesQuery && matchesCategory;
  });

  const availableCount = STUDIO_TOOLS.filter((t) => isAvailable(t.cost)).length;

  return (
    <div className="min-h-screen bg-bg relative">
      {/* ─── Hero ─── */}
      <section className="relative px-4 sm:px-6 pt-8 sm:pt-12 pb-8 sm:pb-10 overflow-hidden">
        <AuroraBg intensity="low" className="opacity-40" />
        <div className="absolute top-0 right-0 w-[400px] h-[400px] bg-purple/10 rounded-full blur-[150px] orb-animate opacity-30" />
        <div className="absolute bottom-0 left-0 w-[300px] h-[300px] bg-cyan/8 rounded-full blur-[120px] orb-animate opacity-20" style={{ animationDelay: "-7s" }} />

        <div className="relative z-10 max-w-5xl mx-auto">
          <div className="flex items-start sm:items-center justify-between gap-3 flex-col sm:flex-row mb-5">
            <div>
              <PremiumBadge variant="cyan" icon={<Sparkles size={11} />}>
                LISBOA Studio
              </PremiumBadge>
              <h1 className="text-3xl sm:text-4xl md:text-5xl font-black mt-3 leading-[1.05]">
                <span className="text-gradient-cyan">Ferramentas</span> criativas
              </h1>
              <p className="text-sm sm:text-base text-muted mt-2 max-w-xl leading-relaxed">
                {availableCount} ferramentas de IA prontas pra usar. Sem prompt complicado, sem setup.
              </p>
            </div>
            <div className="flex items-center gap-2 text-xs sm:text-sm text-muted">
              <Zap size={14} className="text-cyan" />
              <span className="font-bold text-cyan">{points.toLocaleString("pt-BR")}</span>
              <span>pontos disponíveis</span>
            </div>
          </div>

          {/* Search + filter */}
          <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-2">
            <div className="flex-1">
              <Input
                placeholder="Buscar ferramenta..."
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                icon={<Search size={14} />}
              />
            </div>
          </div>
        </div>
      </section>

      {/* ─── Category tabs ─── */}
      <div className="relative z-10 max-w-5xl mx-auto px-4 sm:px-6 mb-6 overflow-x-auto" style={{ scrollbarWidth: "none" }}>
        <Tabs
          value={activeCategory}
          onChange={(v) => setActiveCategory(v as string)}
          tabs={CATEGORIES.map((c) => ({ id: c.id, label: c.label }))}
        />
      </div>

      {/* ─── Showcase Carousel ─── */}
      {activeCategory === "all" && query === "" && (
        <section className="relative z-10 max-w-5xl mx-auto px-4 sm:px-6 mb-8">
          <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-dim mb-3">
            Criações da comunidade
          </p>
          <div className="flex gap-3 overflow-x-auto pb-2" style={{ scrollbarWidth: "none" }}>
            {SHOWCASE_VIDEOS.slice(0, 4).map((video, i) => (
              <motion.div
                key={`v-${i}`}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: i * 0.08 }}
                className="flex-shrink-0 w-48 rounded-2xl overflow-hidden border border-white/5 hover:border-cyan/20 hover:shadow-[0_0_24px_rgba(34,211,238,0.1)] transition-all cursor-pointer group"
              >
                <div className="relative">
                  <video
                    src={video.url}
                    poster={video.poster}
                    muted
                    loop
                    playsInline
                    className="w-full h-28 object-cover group-hover:scale-105 transition-transform duration-500"
                    onMouseEnter={(e) => e.currentTarget.play()}
                    onMouseLeave={(e) => { e.currentTarget.pause(); e.currentTarget.currentTime = 0; }}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                  <div className="absolute bottom-2 left-2">
                    <p className="text-[10px] font-bold text-text">{video.label}</p>
                    <p className="text-[9px] text-dim">{video.desc}</p>
                  </div>
                </div>
              </motion.div>
            ))}
            {EPIC_PHOTOS.slice(0, 4).map((img, i) => (
              <motion.div
                key={`img-${i}`}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: (i + 4) * 0.08 }}
                className="flex-shrink-0 w-48 rounded-2xl overflow-hidden border border-white/5 hover:border-purple/20 hover:shadow-[0_0_24px_rgba(168,85,247,0.1)] transition-all cursor-pointer group"
              >
                <div className="relative">
                  <img src={img.url} alt={img.title} className="w-full h-28 object-cover group-hover:scale-105 transition-transform duration-500" loading="lazy" />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                  <div className="absolute bottom-2 left-2">
                    <p className="text-[10px] font-bold text-text">{img.title}</p>
                    <p className="text-[9px] text-dim">{img.model}</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </section>
      )}

      {/* ─── Tools Grid ─── */}
      <section className="relative z-10 max-w-5xl mx-auto px-4 sm:px-6 pb-32">
        {filteredTools.length === 0 ? (
          <EmptyState
            icon="🔍"
            title="Nenhuma ferramenta encontrada"
            description="Tente outra categoria ou termo de busca."
            action={
              <Button variant="secondary" onClick={() => { setQuery(""); setActiveCategory("all"); }}>
                Limpar filtros
              </Button>
            }
          />
        ) : (
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3 sm:gap-4">
            {filteredTools.map((tool, i) => {
              const available = isAvailable(tool.cost);
              const premium = isPremium(tool.cost);
              const Icon = ICON_MAP[tool.key] || Sparkles;
              return (
                <motion.button
                  key={tool.key}
                  initial={{ opacity: 0, y: 16 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.03, duration: 0.4 }}
                  onClick={() => {
                    if (!available) {
                      toast("Em breve! Essa ferramenta está chegando.", { icon: "🚧" });
                      return;
                    }
                    router.push(TOOL_ROUTES[tool.key] || "/dashboard/studio");
                  }}
                  className={cn(
                    "group relative text-left p-4 sm:p-5 rounded-2xl border border-white/5 transition-all duration-300 overflow-hidden",
                    available
                      ? "bg-card/30 hover:bg-card/70 hover:border-cyan/20 hover:shadow-[0_0_30px_rgba(34,211,238,0.08)] cursor-pointer"
                      : "bg-card/10 cursor-not-allowed opacity-60"
                  )}
                >
                  {/* Hover glow */}
                  <div className={cn(
                    "absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500",
                    available && "bg-gradient-to-br",
                    available && tool.color === "cyan" && "from-cyan/10 via-cyan/5 to-transparent",
                    available && tool.color === "purple" && "from-purple/10 via-purple/5 to-transparent",
                    available && tool.color === "pink" && "from-pink/10 via-pink/5 to-transparent",
                    available && tool.color === "green" && "from-green/10 via-green/5 to-transparent",
                    available && tool.color === "amber" && "from-amber/10 via-amber/5 to-transparent",
                    available && tool.color === "blue" && "from-blue/10 via-blue/5 to-transparent"
                  )} />

                  <div className="relative z-10">
                    <div className="flex items-start justify-between mb-3">
                      <IconTile variant={tool.color as any} size="md" className="group-hover:scale-110 transition-transform duration-300">
                        <Icon size={18} />
                      </IconTile>
                      {premium && (
                        <Crown size={12} className="text-amber shrink-0" />
                      )}
                    </div>

                    <p className={cn(
                      "text-sm font-black mb-1.5 transition-colors",
                      available ? "group-hover:text-cyan" : ""
                    )}>
                      {tool.label}
                    </p>

                    <div className="flex items-center gap-1.5 flex-wrap">
                      {available ? (
                        <Chip variant="green" size="sm">
                          <Zap size={9} /> {tool.cost}
                        </Chip>
                      ) : (
                        <Chip size="sm">
                          <Lock size={9} /> Em breve
                        </Chip>
                      )}
                    </div>
                  </div>

                  {available && (
                    <ChevronRight
                      size={16}
                      className="absolute top-3 right-3 text-dim opacity-0 group-hover:opacity-100 group-hover:translate-x-0.5 transition-all"
                    />
                  )}
                </motion.button>
              );
            })}
          </div>
        )}
      </section>
    </div>
  );
}
