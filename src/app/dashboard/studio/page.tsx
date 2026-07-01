"use client";

import { useRouter } from "next/navigation";
import { useAuth } from "@/lib/contexts/AuthContext";
import { useI18n } from "@/lib/contexts/I18nContext";
import { NeonBackdrop, PremiumBadge } from "@/components/brand";
import { Card, Button } from "@/components/ui";
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
  faceswap: "/dashboard/photo-editor",
  upscale: "/dashboard/gallery-ai",
  bgremove: "/dashboard/photo-editor",
  avatarfalante: "/dashboard/avatar-animator",
  music: "/dashboard/focus-mode",
  threed: "/dashboard/studio",
  redeem: "/dashboard/redeem",
};

export default function StudioPage() {
  const { t } = useI18n();
  const { points } = useAuth();
  const router = useRouter();

  return (
    <div className="relative min-h-screen">
      <NeonBackdrop />
      <div className="relative z-10 px-4 pt-4 pb-32">
        {/* Header */}
        <div className="flex items-center justify-between mb-4">
          <div>
            <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-dim mb-1">{t("studio.kicker")}</p>
            <h1 className="text-3xl font-black">{t("studio.title")}</h1>
          </div>
          <div className="flex items-center gap-1.5 bg-purple/10 border border-purple/20 rounded-full px-3.5 py-1.5">
            <span className="text-yellow-400 text-xs">⚡</span>
            <span className="text-sm font-bold">{points}</span>
            <span className="text-[10px] text-muted">{t("common.pts")}</span>
          </div>
        </div>

        {/* Hero */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="relative min-h-[260px] rounded-[30px] bg-card/50 border border-white/5 p-6 mb-5 overflow-hidden"
        >
          <div className="absolute inset-0 overflow-hidden pointer-events-none">
            <div className="absolute -top-16 -right-10 w-[200px] h-[200px] rounded-full bg-purple/20 blur-[80px]" />
            <div className="absolute bottom-0 left-0 w-[150px] h-[150px] rounded-full bg-cyan/15 blur-[80px]" />
          </div>

          <div className="relative z-10">
            <div className="flex items-center gap-2 mb-3">
              <PremiumBadge>PREMIUM</PremiumBadge>
              <span className="flex items-center gap-1 text-[10px] text-green font-semibold">
                <span className="w-1.5 h-1.5 rounded-full bg-green animate-pulse" />
                {t("common.ready")}
              </span>
            </div>
            <h1 className="text-2xl font-black leading-tight mb-2">{t("studio.heroTitle")}</h1>
            <p className="text-xs text-muted mb-4">{t("studio.heroSubtitle")}</p>
            <Button onClick={() => router.push("/dashboard/assistant")}>{t("studio.openAssistant")}</Button>
          </div>
        </motion.div>

        {/* Quick Flow */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="flex gap-3 mb-5 overflow-x-auto pb-1"
        >
          {[
            { icon: "🎯", label: t("studio.flowChoose"), text: t("studio.flowChooseText") },
            { icon: "📤", label: t("studio.flowSend"), text: t("studio.flowSendText") },
            { icon: "🔄", label: t("studio.flowRedo"), text: t("studio.flowRedoText") },
          ].map((step, i) => (
            <Card key={i} className="min-w-[200px] p-4 flex-shrink-0" glow="cyan">
              <span className="text-2xl mb-2 block">{step.icon}</span>
              <p className="text-sm font-bold mb-1">{step.label}</p>
              <p className="text-xs text-muted">{step.text}</p>
            </Card>
          ))}
        </motion.div>

        {/* Tools Grid */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
        >
          <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-dim mb-3">{t("studio.sectionTitle")}</p>
          <div className="grid grid-cols-2 gap-3">
            {STUDIO_TOOLS.map((tool) => (
              <Card
                key={tool.key}
                className="p-4 cursor-pointer hover:bg-white/5 transition-colors relative overflow-hidden"
                glow={tool.color as any}
                onClick={() => router.push(TOOL_ROUTES[tool.key] || `/dashboard/studio`)}
              >
                <div className="flex items-center justify-between mb-2">
                  <span className="text-2xl">{tool.icon}</span>
                  <span className="text-[10px] font-bold text-dim bg-white/5 px-2 py-0.5 rounded-full">
                    {tool.cost}
                  </span>
                </div>
                <p className="text-sm font-bold">{tool.label}</p>
              </Card>
            ))}
          </div>
        </motion.div>
      </div>
    </div>
  );
}
