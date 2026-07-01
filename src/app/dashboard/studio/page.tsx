"use client";

import { useRouter } from "next/navigation";
import { useAuth } from "@/lib/contexts/AuthContext";
import { useI18n } from "@/lib/contexts/I18nContext";
import { PointsDisplay, PremiumBadge } from "@/components/brand";
import { Button } from "@/components/ui";
import { STUDIO_TOOLS } from "@/constants/theme";
import { motion } from "framer-motion";

const TOOL_ROUTES: Record<string, string> = {
  assistant: "/dashboard/assistant",
  enhance: "/dashboard/photo-editor",
  body: "/dashboard/photo-editor",
  tryon: "/dashboard/photo-editor",
  headshot: "/dashboard/photo-editor",
  camera: "/dashboard/photo-editor",
  product: "/dashboard/photo-editor",
  cover: "/dashboard/studio/covers",
  anime: "/dashboard/anime-studio",
  avatar: "/dashboard/avatar-animator",
  video: "/dashboard/video-maker",
  faceswap: "/dashboard/face-swap",
  upscale: "/dashboard/gallery-ai",
  bgremove: "/dashboard/bg-remove",
  avatarfalante: "/dashboard/talking-avatar",
  music: "/dashboard/focus-mode",
  threed: "/dashboard/studio",
  redeem: "/dashboard/redeem",
};

const CATEGORIES = [
  { id: "all", label: "Todas" },
  { id: "criacao", label: "Criação" },
  { id: "edicao", label: "Edição" },
  { id: "video", label: "Vídeo" },
  { id: "avancado", label: "Avançado" },
];

const TOOL_CATEGORY: Record<string, string> = {
  assistant: "criacao",
  enhance: "edicao",
  body: "edicao",
  tryon: "edicao",
  headshot: "edicao",
  camera: "edicao",
  product: "edicao",
  cover: "criacao",
  anime: "criacao",
  avatar: "video",
  video: "video",
  faceswap: "edicao",
  upscale: "avancado",
  bgremove: "edicao",
  avatarfalante: "video",
  music: "avancado",
  threed: "avancado",
  redeem: "avancado",
};

export default function StudioPage() {
  const { t } = useI18n();
  const { points } = useAuth();
  const router = useRouter();

  return (
    <div className="min-h-screen bg-bg">
      {/* ─── Hero Section ─── */}
      <section className="relative px-4 pt-8 pb-12 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-cyan/5 via-transparent to-transparent" />
        <div className="absolute top-0 right-0 w-[400px] h-[400px] bg-purple/10 rounded-full blur-[150px] orb-animate opacity-30" />
        <div className="absolute bottom-0 left-0 w-[300px] h-[300px] bg-cyan/8 rounded-full blur-[120px] orb-animate opacity-20" style={{ animationDelay: "-7s" }} />

        <div className="relative z-10 max-w-5xl mx-auto">
          <div className="flex items-center justify-between mb-4">
            <div>
              <PremiumBadge variant="cyan">LISBOA STUDIO</PremiumBadge>
              <h1 className="text-4xl font-black mt-2">Ferramentas Criativas</h1>
              <p className="text-muted mt-1 max-w-xl">
                Gere imagens, edite fotos, crie vídeos, transforme em anime, e muito mais — tudo com IA.
              </p>
            </div>
            <div className="hidden sm:block">
              <PointsDisplay points={points} />
            </div>
          </div>
        </div>
      </section>

      {/* ─── Tools Grid ─── */}
      <section className="px-4 pb-32">
        <div className="max-w-5xl mx-auto">
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3">
            {STUDIO_TOOLS.map((tool, i) => {
              const isAvailable = !tool.cost.includes("Breve");
              return (
                <motion.button
                  key={tool.key}
                  initial={{ opacity: 0, y: 15 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.03, duration: 0.3 }}
                  onClick={() => isAvailable && router.push(TOOL_ROUTES[tool.key] || "/dashboard/studio")}
                  disabled={!isAvailable}
                  className="group relative text-left p-4 rounded-2xl border border-white/5 bg-card/30 hover:bg-card/60 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed overflow-hidden"
                >
                  {/* Hover glow */}
                  <div className={`absolute inset-0 bg-gradient-to-br from-${tool.color}/10 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500`} />

                  <div className="relative z-10">
                    {/* Icon with colored background */}
                    <div className={`w-11 h-11 rounded-xl flex items-center justify-center text-xl mb-3 transition-transform duration-300 group-hover:scale-110`}
                      style={{ background: `color-mix(in srgb, var(--${tool.color}) 15%, transparent)` }}>
                      {tool.icon}
                    </div>

                    <p className="text-sm font-bold mb-1 group-hover:text-cyan transition-colors">{tool.label}</p>

                    {/* Cost badge */}
                    <span className={`inline-block text-[10px] font-bold px-2 py-0.5 rounded-full border ${
                      isAvailable
                        ? "text-green border-green/20 bg-green/5"
                        : "text-dim border-white/10 bg-white/5"
                    }`}>
                      {isAvailable ? tool.cost : "🔜"}
                    </span>
                  </div>
                </motion.button>
              );
            })}
          </div>
        </div>
      </section>
    </div>
  );
}
