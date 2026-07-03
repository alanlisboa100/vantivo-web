"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Sparkles, Zap, Clock, Cpu, Check, Play } from "lucide-react";
import type { AIModel } from "@/constants/models";
import { cn } from "@/lib/utils/cn";

const ACCENT_GRADIENT: Record<string, string> = {
  cyan: "from-cyan/20 via-cyan/10 to-transparent",
  purple: "from-purple/20 via-purple/10 to-transparent",
  pink: "from-pink/20 via-pink/10 to-transparent",
  green: "from-green/20 via-green/10 to-transparent",
  amber: "from-amber/20 via-amber/10 to-transparent",
  blue: "from-blue/20 via-blue/10 to-transparent",
  red: "from-red/20 via-red/10 to-transparent",
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

const ACCENT_BORDER: Record<string, string> = {
  cyan: "border-cyan/30 hover:border-cyan/60",
  purple: "border-purple/30 hover:border-purple/60",
  pink: "border-pink/30 hover:border-pink/60",
  green: "border-green/30 hover:border-green/60",
  amber: "border-amber/30 hover:border-amber/60",
  blue: "border-blue/30 hover:border-blue/60",
  red: "border-red/30 hover:border-red/60",
};

const ACCENT_GLOW: Record<string, string> = {
  cyan: "shadow-[0_0_50px_rgba(34,211,238,0.25)]",
  purple: "shadow-[0_0_50px_rgba(168,85,247,0.25)]",
  pink: "shadow-[0_0_50px_rgba(236,72,153,0.25)]",
  green: "shadow-[0_0_50px_rgba(53,211,153,0.25)]",
  amber: "shadow-[0_0_50px_rgba(245,158,11,0.25)]",
  blue: "shadow-[0_0_50px_rgba(53,92,255,0.25)]",
  red: "shadow-[0_0_50px_rgba(239,68,68,0.25)]",
};

export function ModelCard({ model, index = 0 }: { model: AIModel; index?: number }) {
  const [hovered, setHovered] = useState(false);
  const accent = model.accent;
  const isVideo = model.type === "video";

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ delay: (index % 6) * 0.05, duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      whileHover={{ y: -6 }}
      className={cn(
        "group relative overflow-hidden rounded-3xl border bg-card/40 backdrop-blur-sm transition-all duration-500",
        ACCENT_BORDER[accent],
        hovered && ACCENT_GLOW[accent]
      )}
    >
      {/* Hover gradient overlay */}
      <div
        className={cn(
          "absolute inset-0 bg-gradient-to-br opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none",
          ACCENT_GRADIENT[accent]
        )}
      />

      {/* Badge topo */}
      {model.badge && (
        <div className="absolute top-4 right-4 z-20">
          <div
            className={cn(
              "text-[10px] font-black uppercase tracking-widest px-2.5 py-1 rounded-full border",
              model.badge === "Top" && "bg-amber/15 text-amber border-amber/30",
              model.badge === "Novo" && "bg-cyan/15 text-cyan border-cyan/30",
              model.badge === "Preview" && "bg-purple/15 text-purple border-purple/30",
              model.badge === "Beta" && "bg-pink/15 text-pink border-pink/30"
            )}
          >
            {model.badge}
          </div>
        </div>
      )}

      {/* Media preview (vídeo ou imagem) */}
      <div className="relative aspect-[16/10] overflow-hidden bg-bg-2">
        {isVideo && model.sample.video ? (
          <video
            src={model.sample.video}
            poster={model.sample.poster}
            muted
            loop
            playsInline
            autoPlay={hovered}
            className="w-full h-full object-cover"
          />
        ) : (
          <img
            src={model.sample.image}
            alt={model.name}
            className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
            loading="lazy"
          />
        )}

        {/* Gradient mask */}
        <div className="absolute inset-0 bg-gradient-to-t from-bg via-bg/30 to-transparent" />

        {/* Play icon pra vídeo */}
        {isVideo && (
          <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
            <motion.div
              animate={{ scale: hovered ? 1.1 : 1, opacity: hovered ? 0 : 0.7 }}
              className={cn("w-14 h-14 rounded-full backdrop-blur-md flex items-center justify-center border", ACCENT_BORDER[accent], "bg-black/30")}
            >
              <Play size={22} className={cn("ml-0.5", ACCENT_TEXT[accent])} fill="currentColor" />
            </motion.div>
          </div>
        )}

        {/* Provider pill */}
        <div className="absolute bottom-3 left-3 z-10">
          <div className="glass-strong rounded-full px-2.5 py-1 flex items-center gap-1.5">
            <Sparkles size={10} className={ACCENT_TEXT[accent]} />
            <span className="text-[10px] font-black uppercase tracking-widest text-text">{model.provider}</span>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="relative p-5 sm:p-6 space-y-4">
        <div>
          <div className="flex items-baseline gap-2 mb-1.5">
            <h3 className={cn("text-xl sm:text-2xl font-black tracking-tight")}>{model.name}</h3>
            <span className="text-xs text-dim font-mono">v{model.version}</span>
          </div>
          <p className={cn("text-xs font-semibold uppercase tracking-wider", ACCENT_TEXT[accent])}>
            {model.tagline}
          </p>
        </div>

        <p className="text-sm text-muted leading-relaxed line-clamp-2 min-h-[2.5rem]">
          {model.description}
        </p>

        {/* Stats grid */}
        <div className="grid grid-cols-3 gap-2 pt-2 border-t border-white/5">
          <div className="text-center">
            <div className="flex items-center justify-center gap-1 text-dim mb-0.5">
              <Zap size={11} />
            </div>
            <p className="text-sm font-black text-text">{model.points}</p>
            <p className="text-[9px] text-dim uppercase tracking-wider">pontos</p>
          </div>
          <div className="text-center border-x border-white/5">
            <div className="flex items-center justify-center gap-1 text-dim mb-0.5">
              <Clock size={11} />
            </div>
            <p className="text-sm font-black text-text">{model.avgTime}</p>
            <p className="text-[9px] text-dim uppercase tracking-wider">média</p>
          </div>
          <div className="text-center">
            <div className="flex items-center justify-center gap-1 text-dim mb-0.5">
              <Cpu size={11} />
            </div>
            <p className="text-sm font-black text-text">{model.resolution}</p>
            <p className="text-[9px] text-dim uppercase tracking-wider">resolução</p>
          </div>
        </div>

        {/* Best for tags */}
        <div className="flex flex-wrap gap-1.5 pt-1">
          {model.bestFor.slice(0, 3).map((tag) => (
            <span
              key={tag}
              className="text-[10px] font-semibold px-2 py-0.5 rounded-full bg-white/[0.04] text-muted border border-white/5"
            >
              {tag}
            </span>
          ))}
        </div>
      </div>
    </motion.div>
  );
}

export function ModelCardCompact({ model, index = 0 }: { model: AIModel; index?: number }) {
  const accent = model.accent;
  return (
    <motion.div
      initial={{ opacity: 0, x: 20 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true }}
      transition={{ delay: (index % 4) * 0.04, duration: 0.4 }}
      className={cn(
        "group flex items-center gap-3 p-3 rounded-2xl border border-white/5 bg-card/40 hover:bg-card/70 transition-all",
        "hover:border-white/10"
      )}
    >
      <div className="relative w-12 h-12 rounded-xl overflow-hidden shrink-0">
        <img src={model.sample.image} alt={model.name} className="w-full h-full object-cover" loading="lazy" />
        <div className={cn("absolute inset-0 bg-gradient-to-br opacity-30", ACCENT_GRADIENT[accent])} />
      </div>
      <div className="flex-1 min-w-0">
        <div className="flex items-center gap-1.5">
          <h4 className="text-sm font-black truncate">{model.name}</h4>
          {model.badge === "Top" && <Sparkles size={10} className="text-amber shrink-0" />}
        </div>
        <p className="text-[10px] text-dim uppercase tracking-wider truncate">{model.provider} · {model.avgTime}</p>
      </div>
      <div className="text-right shrink-0">
        <p className={cn("text-sm font-black", ACCENT_TEXT[accent])}>{model.points}</p>
        <p className="text-[9px] text-dim uppercase tracking-wider">pts</p>
      </div>
    </motion.div>
  );
}

export function ModelStrengthsList({ strengths }: { strengths: string[] }) {
  return (
    <ul className="space-y-1.5">
      {strengths.map((s, i) => (
        <motion.li
          key={s}
          initial={{ opacity: 0, x: -8 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ delay: i * 0.05 }}
          className="flex items-start gap-2 text-sm text-muted"
        >
          <div className="shrink-0 mt-0.5 w-4 h-4 rounded-full bg-cyan/15 flex items-center justify-center">
            <Check size={10} className="text-cyan" />
          </div>
          {s}
        </motion.li>
      ))}
    </ul>
  );
}
