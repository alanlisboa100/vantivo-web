"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Sparkles, Video, Image as ImageIcon, Wand2, Zap } from "lucide-react";
import { cn } from "@/lib/utils/cn";

const FEED_ITEMS = [
  { user: "Marina S.", action: "gerou", model: "GPT Image 2", type: "image", color: "green" },
  { user: "Diego R.", action: "criou vídeo com", model: "Seedance 2.0", type: "video", color: "cyan" },
  { user: "Camila T.", action: "transformou em anime com", model: "Ghibli AI", type: "image", color: "pink" },
  { user: "Lucas P.", action: "gerou capa com", model: "Nano Banana 2", type: "image", color: "amber" },
  { user: "Bia M.", action: "animou avatar com", model: "Veo 3.1", type: "video", color: "purple" },
  { user: "Rafael O.", action: "editou foto com", model: "Imagen 4 Ultra", type: "image", color: "amber" },
  { user: "Julia M.", action: "gerou", model: "WAN 2.7", type: "video", color: "purple" },
  { user: "Pedro H.", action: "criou com", model: "Sora 2", type: "video", color: "blue" },
  { user: "Ana L.", action: "usou", model: "Qwen Image", type: "image", color: "pink" },
  { user: "Carlos T.", action: "gerou vídeo com", model: "Kling 3.0", type: "video", color: "amber" },
];

const COLOR_MAP: Record<string, { text: string; bg: string; glow: string }> = {
  cyan: { text: "text-cyan", bg: "bg-cyan/10", glow: "shadow-[0_0_20px_rgba(34,211,238,0.2)]" },
  purple: { text: "text-purple", bg: "bg-purple/10", glow: "shadow-[0_0_20px_rgba(168,85,247,0.2)]" },
  pink: { text: "text-pink", bg: "bg-pink/10", glow: "shadow-[0_0_20px_rgba(236,72,153,0.2)]" },
  green: { text: "text-green", bg: "bg-green/10", glow: "shadow-[0_0_20px_rgba(53,211,153,0.2)]" },
  amber: { text: "text-amber", bg: "bg-amber/10", glow: "shadow-[0_0_20px_rgba(245,158,11,0.2)]" },
  blue: { text: "text-blue", bg: "bg-blue/10", glow: "shadow-[0_0_20px_rgba(53,92,255,0.2)]" },
};

export function LiveFeed() {
  const [index, setIndex] = useState(0);
  const [paused, setPaused] = useState(false);

  useEffect(() => {
    if (paused) return;
    const interval = setInterval(() => {
      setIndex((prev) => (prev + 1) % FEED_ITEMS.length);
    }, 2500);
    return () => clearInterval(interval);
  }, [paused]);

  const current = FEED_ITEMS[index];
  const colors = COLOR_MAP[current.color];

  return (
    <div
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
      className={cn(
        "relative inline-flex items-center gap-3 px-4 py-2.5 rounded-full border border-white/10 bg-card/60 backdrop-blur-md transition-all",
        colors.glow
      )}
    >
      {/* Pulse dot */}
      <div className="relative shrink-0">
        <div className={cn("absolute inset-0 rounded-full animate-ping opacity-75", colors.bg)} />
        <div className={cn("relative w-2 h-2 rounded-full", colors.bg.replace("/10", ""))} style={{ backgroundColor: "currentColor" }} />
      </div>

      <AnimatePresence mode="wait">
        <motion.div
          key={index}
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -8 }}
          transition={{ duration: 0.3 }}
          className="flex items-center gap-2 text-xs sm:text-sm whitespace-nowrap"
        >
          {current.type === "video" ? (
            <Video size={13} className={colors.text} />
          ) : (
            <ImageIcon size={13} className={colors.text} />
          )}
          <span className="font-bold text-text">{current.user}</span>
          <span className="text-muted">{current.action}</span>
          <span className={cn("font-black", colors.text)}>{current.model}</span>
        </motion.div>
      </AnimatePresence>
    </div>
  );
}

export function StatsTicker() {
  const [count, setCount] = useState({ images: 1247832, videos: 48291, users: 12483 });

  useEffect(() => {
    const interval = setInterval(() => {
      setCount((prev) => ({
        images: prev.images + Math.floor(Math.random() * 5) + 1,
        videos: prev.videos + Math.floor(Math.random() * 2),
        users: prev.users + (Math.random() > 0.7 ? 1 : 0),
      }));
    }, 1500);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="grid grid-cols-3 gap-2 sm:gap-4 max-w-2xl mx-auto">
      <motion.div
        key={count.images}
        initial={{ scale: 1.05 }}
        animate={{ scale: 1 }}
        className="text-center"
      >
        <p className="text-xl sm:text-2xl font-black text-cyan tabular-nums">
          {(count.images / 1000000).toFixed(2)}M+
        </p>
        <p className="text-[9px] sm:text-[10px] text-dim uppercase tracking-wider font-bold mt-0.5">
          Imagens geradas
        </p>
      </motion.div>
      <motion.div
        key={count.videos}
        initial={{ scale: 1.05 }}
        animate={{ scale: 1 }}
        className="text-center"
      >
        <p className="text-xl sm:text-2xl font-black text-purple tabular-nums">
          {(count.videos / 1000).toFixed(1)}k+
        </p>
        <p className="text-[9px] sm:text-[10px] text-dim uppercase tracking-wider font-bold mt-0.5">
          Vídeos criados
        </p>
      </motion.div>
      <motion.div
        key={count.users}
        initial={{ scale: 1.05 }}
        animate={{ scale: 1 }}
        className="text-center"
      >
        <p className="text-xl sm:text-2xl font-black text-pink tabular-nums">
          {(count.users / 1000).toFixed(1)}k+
        </p>
        <p className="text-[9px] sm:text-[10px] text-dim uppercase tracking-wider font-bold mt-0.5">
          Criadores ativos
        </p>
      </motion.div>
    </div>
  );
}

export function PulsingCTA({ children, onClick, accent = "cyan" }: { children: React.ReactNode; onClick?: () => void; accent?: "cyan" | "purple" | "pink" }) {
  const accentClass = {
    cyan: "from-cyan/20 via-cyan/10",
    purple: "from-purple/20 via-purple/10",
    pink: "from-pink/20 via-pink/10",
  }[accent];

  return (
    <motion.button
      onClick={onClick}
      whileHover={{ scale: 1.03 }}
      whileTap={{ scale: 0.98 }}
      className="group relative inline-flex"
    >
      <div className={cn("absolute -inset-2 rounded-2xl bg-gradient-to-r to-transparent opacity-60 blur-xl group-hover:opacity-100 transition-opacity", accentClass)} />
      <div className="relative inline-flex items-center gap-2 px-6 sm:px-8 py-3 sm:py-3.5 rounded-xl bg-gradient-to-r from-cyan via-blue to-purple text-white font-black shadow-[0_0_30px_rgba(34,211,238,0.4)]">
        <Wand2 size={16} />
        {children}
      </div>
    </motion.button>
  );
}
