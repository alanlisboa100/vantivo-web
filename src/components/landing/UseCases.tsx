"use client";

import { motion } from "framer-motion";
import { ArrowUpRight, Sparkles, Camera, Wand2, Video, Music, Box, Layers } from "lucide-react";
import { cn } from "@/lib/utils/cn";
import type { AIModel } from "@/constants/models";

interface UseCase {
  id: string;
  title: string;
  description: string;
  example: string;
  icon: any;
  model: AIModel;
  accent: "cyan" | "purple" | "pink" | "green" | "amber" | "blue" | "red";
  metric: string;
  metricLabel: string;
}

const ACCENT_BG: Record<string, string> = {
  cyan: "from-cyan/15 to-cyan/0 border-cyan/20",
  purple: "from-purple/15 to-purple/0 border-purple/20",
  pink: "from-pink/15 to-pink/0 border-pink/20",
  green: "from-green/15 to-green/0 border-green/20",
  amber: "from-amber/15 to-amber/0 border-amber/20",
  blue: "from-blue/15 to-blue/0 border-blue/20",
  red: "from-red/15 to-red/0 border-red/20",
};

const ACCENT_TEXT: Record<string, string> = {
  cyan: "text-cyan",
  purple: "text-purple",
  pink: "text-pink",
  green: "text-green",
  amber: "text-amber",
  blue: "text-blue",
  red: "text-red",
};

const ACCENT_GLOW: Record<string, string> = {
  cyan: "group-hover:shadow-[0_0_60px_rgba(34,211,238,0.25)]",
  purple: "group-hover:shadow-[0_0_60px_rgba(168,85,247,0.25)]",
  pink: "group-hover:shadow-[0_0_60px_rgba(236,72,153,0.25)]",
  green: "group-hover:shadow-[0_0_60px_rgba(53,211,153,0.25)]",
  amber: "group-hover:shadow-[0_0_60px_rgba(245,158,11,0.25)]",
  blue: "group-hover:shadow-[0_0_60px_rgba(53,92,255,0.25)]",
  red: "group-hover:shadow-[0_0_60px_rgba(239,68,68,0.25)]",
};

interface UseCaseCardProps {
  useCase: UseCase;
  index: number;
}

export function UseCaseCard({ useCase, index }: UseCaseCardProps) {
  const Icon = useCase.icon;

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ delay: (index % 4) * 0.08, duration: 0.5 }}
      whileHover={{ y: -6 }}
      className={cn(
        "group relative overflow-hidden rounded-3xl border bg-card/40 backdrop-blur-sm transition-all duration-500",
        ACCENT_BG[useCase.accent],
        ACCENT_GLOW[useCase.accent]
      )}
    >
      {/* Background image overlay (useCase.model.sample.image) com blur e gradient */}
      <div className="absolute inset-0 opacity-30 group-hover:opacity-50 transition-opacity duration-700">
        <img
          src={useCase.model.sample.image}
          alt=""
          className="w-full h-full object-cover scale-110 group-hover:scale-100 transition-transform duration-1000"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-bg via-bg/70 to-bg/30" />
      </div>

      <div className="relative p-6 sm:p-7 flex flex-col h-full min-h-[280px]">
        {/* Top: icon + model badge */}
        <div className="flex items-start justify-between mb-4">
          <div
            className={cn(
              "w-12 h-12 rounded-2xl flex items-center justify-center border bg-black/30",
              ACCENT_BG[useCase.accent]
            )}
          >
            <Icon size={22} className={ACCENT_TEXT[useCase.accent]} />
          </div>
          <div className="flex items-center gap-1.5">
            <Sparkles size={11} className={ACCENT_TEXT[useCase.accent]} />
            <span className={cn("text-[10px] font-black uppercase tracking-widest", ACCENT_TEXT[useCase.accent])}>
              {useCase.model.name}
            </span>
          </div>
        </div>

        {/* Title + desc */}
        <h3 className="text-xl sm:text-2xl font-black mb-2 leading-tight">{useCase.title}</h3>
        <p className="text-sm text-muted leading-relaxed mb-4">{useCase.description}</p>

        {/* Example prompt */}
        <div className="rounded-2xl border border-white/5 bg-black/40 backdrop-blur-md p-3 mb-4">
          <p className="text-[10px] font-bold uppercase tracking-wider text-dim mb-1.5">Exemplo de prompt</p>
          <p className="text-xs text-muted leading-relaxed italic">&ldquo;{useCase.example}&rdquo;</p>
        </div>

        {/* Spacer */}
        <div className="flex-1" />

        {/* Bottom: metric + arrow */}
        <div className="flex items-end justify-between pt-4 border-t border-white/5">
          <div>
            <p className={cn("text-2xl font-black", ACCENT_TEXT[useCase.accent])}>{useCase.metric}</p>
            <p className="text-[10px] text-dim uppercase tracking-wider font-bold mt-0.5">{useCase.metricLabel}</p>
          </div>
          <div
            className={cn(
              "w-9 h-9 rounded-full flex items-center justify-center border bg-black/30 transition-all",
              ACCENT_BG[useCase.accent]
            )}
          >
            <ArrowUpRight size={16} className={ACCENT_TEXT[useCase.accent]} />
          </div>
        </div>
      </div>
    </motion.div>
  );
}

interface UseCasesGridProps {
  useCases: UseCase[];
}

export function UseCasesGrid({ useCases }: UseCasesGridProps) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
      {useCases.map((uc, i) => (
        <UseCaseCard key={uc.id} useCase={uc} index={i} />
      ))}
    </div>
  );
}

// Helpers pra montar use cases
export const ICON_MAP = {
  Sparkles,
  Camera,
  Wand2,
  Video,
  Music,
  Box,
  Layers,
} as const;
