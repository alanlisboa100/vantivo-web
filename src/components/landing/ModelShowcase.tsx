"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Play, Pause, Sparkles, Cpu, Zap, Clock, ChevronLeft, ChevronRight } from "lucide-react";
import { cn } from "@/lib/utils/cn";
import type { AIModel } from "@/constants/models";

const ACCENT_BG: Record<string, string> = {
  cyan: "from-cyan/20 via-cyan/5",
  purple: "from-purple/20 via-purple/5",
  pink: "from-pink/20 via-pink/5",
  green: "from-green/20 via-green/5",
  amber: "from-amber/20 via-amber/5",
  blue: "from-blue/20 via-blue/5",
  red: "from-red/20 via-red/5",
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
  cyan: "border-cyan/30",
  purple: "border-purple/30",
  pink: "border-pink/30",
  green: "border-green/30",
  amber: "border-amber/30",
  blue: "border-blue/30",
  red: "border-red/30",
};

interface ModelShowcaseProps {
  models: AIModel[];
}

export function ModelShowcase({ models }: ModelShowcaseProps) {
  const [active, setActive] = useState(0);
  const [playing, setPlaying] = useState(true);
  const model = models[active];
  const isVideo = model.type === "video" && model.sample.video;

  const next = () => setActive((prev) => (prev + 1) % models.length);
  const prev = () => setActive((p) => (p - 1 + models.length) % models.length);

  return (
    <div className="grid grid-cols-1 lg:grid-cols-5 gap-4 sm:gap-6">
      {/* Stage: vídeo/imagem grande */}
      <div className="lg:col-span-3 order-2 lg:order-1">
        <motion.div
          key={model.id}
          initial={{ opacity: 0, scale: 0.98 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.4 }}
          className={cn(
            "relative overflow-hidden rounded-3xl border bg-card/40 aspect-video group",
            ACCENT_BORDER[model.accent]
          )}
        >
          <AnimatePresence mode="wait">
            {isVideo ? (
              <motion.video
                key={model.id + "-v"}
                src={model.sample.video}
                poster={model.sample.poster}
                autoPlay={playing}
                muted
                loop
                playsInline
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.5 }}
                className="absolute inset-0 w-full h-full object-cover"
              />
            ) : (
              <motion.img
                key={model.id + "-i"}
                src={model.sample.image}
                alt={model.name}
                initial={{ opacity: 0, scale: 1.05 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.5 }}
                className="absolute inset-0 w-full h-full object-cover"
              />
            )}
          </AnimatePresence>

          {/* Gradient base */}
          <div className="absolute inset-0 bg-gradient-to-t from-bg via-bg/20 to-transparent pointer-events-none" />

          {/* Play/pause */}
          {isVideo && (
            <button
              onClick={() => setPlaying(!playing)}
              className="absolute top-4 right-4 z-10 w-11 h-11 rounded-full glass-strong flex items-center justify-center hover:scale-110 transition-transform"
            >
              {playing ? <Pause size={16} className="text-text" /> : <Play size={16} className="text-text ml-0.5" fill="currentColor" />}
            </button>
          )}

          {/* Top-left badge */}
          <div className="absolute top-4 left-4 z-10 flex items-center gap-2">
            {model.badge && (
              <div
                className={cn(
                  "text-[10px] font-black uppercase tracking-widest px-2.5 py-1 rounded-full border backdrop-blur-md",
                  model.badge === "Top" && "bg-amber/15 text-amber border-amber/30",
                  model.badge === "Novo" && "bg-cyan/15 text-cyan border-cyan/30",
                  model.badge === "Preview" && "bg-purple/15 text-purple border-purple/30"
                )}
              >
                {model.badge}
              </div>
            )}
            <div className="text-[10px] font-black uppercase tracking-widest px-2.5 py-1 rounded-full bg-black/50 text-text border border-white/10 backdrop-blur-md">
              {model.type === "video" ? "Vídeo" : "Imagem"}
            </div>
          </div>

          {/* Bottom info */}
          <div className="absolute bottom-0 left-0 right-0 p-5 sm:p-7 z-10">
            <div className="flex items-center gap-2 mb-2">
              <Sparkles size={12} className={ACCENT_TEXT[model.accent]} />
              <span className={cn("text-[10px] font-black uppercase tracking-[0.2em]", ACCENT_TEXT[model.accent])}>
                {model.provider} · v{model.version}
              </span>
            </div>
            <h3 className="text-3xl sm:text-4xl font-black mb-2 text-white leading-tight">
              {model.name}
            </h3>
            <p className="text-sm sm:text-base text-white/80 leading-relaxed max-w-xl">
              {model.description}
            </p>
          </div>

          {/* Nav arrows */}
          <button
            onClick={prev}
            className="absolute left-3 top-1/2 -translate-y-1/2 z-10 w-10 h-10 rounded-full glass-strong flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity hover:scale-110"
            aria-label="Anterior"
          >
            <ChevronLeft size={18} className="text-text" />
          </button>
          <button
            onClick={next}
            className="absolute right-3 top-1/2 -translate-y-1/2 z-10 w-10 h-10 rounded-full glass-strong flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity hover:scale-110"
            aria-label="Próximo"
          >
            <ChevronRight size={18} className="text-text" />
          </button>
        </motion.div>

        {/* Stats inline */}
        <div className="grid grid-cols-4 gap-2 sm:gap-3 mt-3 sm:mt-4">
          <div className="rounded-2xl border border-white/5 bg-card/40 p-3 sm:p-4">
            <div className="flex items-center gap-1.5 text-dim mb-1.5">
              <Zap size={11} />
              <span className="text-[9px] font-bold uppercase tracking-wider">Custo</span>
            </div>
            <p className={cn("text-lg sm:text-xl font-black", ACCENT_TEXT[model.accent])}>{model.points} pts</p>
          </div>
          <div className="rounded-2xl border border-white/5 bg-card/40 p-3 sm:p-4">
            <div className="flex items-center gap-1.5 text-dim mb-1.5">
              <Clock size={11} />
              <span className="text-[9px] font-bold uppercase tracking-wider">Tempo</span>
            </div>
            <p className="text-lg sm:text-xl font-black text-text">{model.avgTime}</p>
          </div>
          <div className="rounded-2xl border border-white/5 bg-card/40 p-3 sm:p-4">
            <div className="flex items-center gap-1.5 text-dim mb-1.5">
              <Cpu size={11} />
              <span className="text-[9px] font-bold uppercase tracking-wider">Resolução</span>
            </div>
            <p className="text-lg sm:text-xl font-black text-text">{model.resolution}</p>
          </div>
          <div className="rounded-2xl border border-white/5 bg-card/40 p-3 sm:p-4">
            <div className="flex items-center gap-1.5 text-dim mb-1.5">
              <Sparkles size={11} />
              <span className="text-[9px] font-bold uppercase tracking-wider">Duração</span>
            </div>
            <p className="text-lg sm:text-xl font-black text-text">{model.duration || "—"}</p>
          </div>
        </div>
      </div>

      {/* Lista lateral de modelos */}
      <div className="lg:col-span-2 order-1 lg:order-2">
        <div className="sticky top-20 space-y-2 max-h-[700px] overflow-y-auto pr-1 custom-scrollbar">
          <p className="text-[10px] font-black uppercase tracking-[0.2em] text-dim mb-3 px-1">
            {models.length} modelos disponíveis
          </p>
          {models.map((m, i) => {
            const isActive = i === active;
            return (
              <motion.button
                key={m.id}
                onClick={() => setActive(i)}
                onMouseEnter={() => setActive(i)}
                whileHover={{ x: 4 }}
                className={cn(
                  "w-full text-left flex items-center gap-3 p-3 rounded-2xl border transition-all duration-300",
                  isActive
                    ? `bg-gradient-to-r ${ACCENT_BG[m.accent]} ${ACCENT_BORDER[m.accent]}`
                    : "border-white/5 bg-white/[0.02] hover:bg-white/[0.05] hover:border-white/10"
                )}
              >
                <div className="relative w-12 h-12 rounded-xl overflow-hidden shrink-0">
                  <img src={m.sample.image} alt="" className="w-full h-full object-cover" />
                  <div className={cn("absolute inset-0 bg-gradient-to-br opacity-40", ACCENT_BG[m.accent])} />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-1.5">
                    <h4 className="text-sm font-black truncate">{m.name}</h4>
                    {m.badge === "Top" && <Sparkles size={10} className="text-amber shrink-0" />}
                  </div>
                  <p className={cn("text-[10px] uppercase tracking-wider font-bold truncate", isActive ? ACCENT_TEXT[m.accent] : "text-dim")}>
                    {m.provider} · {m.points} pts · {m.avgTime}
                  </p>
                </div>
                {isActive && (
                  <motion.div
                    layoutId="active-indicator"
                    className="w-1.5 h-10 rounded-full bg-gradient-to-b from-cyan to-purple"
                  />
                )}
              </motion.button>
            );
          })}
        </div>
      </div>
    </div>
  );
}
