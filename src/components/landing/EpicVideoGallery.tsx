"use client";

import { useState, useRef } from "react";
import { motion } from "framer-motion";
import { Play, Clock, Cpu, Volume2, VolumeX } from "lucide-react";
import { cn } from "@/lib/utils/cn";

interface EpicVideo {
  url: string;
  poster?: string;
  title: string;
  model: string;
  category: string;
  prompt: string;
  duration: string;
  resolution: string;
  accent: string;
}

const ACCENT_BORDER: Record<string, string> = {
  cyan: "hover:border-cyan/60 hover:shadow-[0_0_50px_rgba(34,211,238,0.3)]",
  purple: "hover:border-purple/60 hover:shadow-[0_0_50px_rgba(168,85,247,0.3)]",
  pink: "hover:border-pink/60 hover:shadow-[0_0_50px_rgba(236,72,153,0.3)]",
  green: "hover:border-green/60 hover:shadow-[0_0_50px_rgba(53,211,153,0.3)]",
  amber: "hover:border-amber/60 hover:shadow-[0_0_50px_rgba(245,158,11,0.3)]",
  blue: "hover:border-blue/60 hover:shadow-[0_0_50px_rgba(53,92,255,0.3)]",
  red: "hover:border-red/60 hover:shadow-[0_0_50px_rgba(239,68,68,0.3)]",
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

const ACCENT_BG: Record<string, string> = {
  cyan: "from-cyan/80 to-cyan/40",
  purple: "from-purple/80 to-purple/40",
  pink: "from-pink/80 to-pink/40",
  green: "from-green/80 to-green/40",
  amber: "from-amber/80 to-amber/40",
  blue: "from-blue/80 to-blue/40",
  red: "from-red/80 to-red/40",
};

interface EpicVideoCardProps {
  video: EpicVideo;
  index: number;
  span?: "default" | "wide" | "tall";
}

export function EpicVideoCard({ video, index, span = "default" }: EpicVideoCardProps) {
  const [hovered, setHovered] = useState(false);
  const [muted, setMuted] = useState(true);
  const videoRef = useRef<HTMLVideoElement>(null);

  const aspectClass = {
    default: "aspect-video",
    wide: "aspect-[21/9] sm:col-span-2",
    tall: "aspect-[3/4] sm:row-span-2",
  }[span];

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ delay: (index % 6) * 0.06, duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
      onMouseEnter={() => {
        setHovered(true);
        videoRef.current?.play().catch(() => {});
      }}
      onMouseLeave={() => {
        setHovered(false);
        videoRef.current?.pause();
      }}
      className={cn(
        "group relative overflow-hidden rounded-3xl border border-white/5 bg-card/40 transition-all duration-500",
        ACCENT_BORDER[video.accent],
        aspectClass
      )}
    >
      {/* Vídeo */}
      <video
        ref={videoRef}
        src={video.url}
        poster={video.poster}
        muted={muted}
        loop
        playsInline
        preload="metadata"
        className={cn(
          "absolute inset-0 w-full h-full object-cover transition-transform duration-700",
          hovered ? "scale-105" : "scale-100"
        )}
      />

      {/* Gradient overlay (sempre presente, intensifica no hover) */}
      <div className="absolute inset-0 bg-gradient-to-t from-bg via-bg/40 to-bg/0 opacity-80 group-hover:opacity-95 transition-opacity duration-500" />

      {/* Top-left badge: category */}
      <div className="absolute top-3 left-3 z-10">
        <div className={cn("glass-strong rounded-full px-2.5 py-1 flex items-center gap-1.5")}>
          <span className={cn("w-1.5 h-1.5 rounded-full bg-gradient-to-br", ACCENT_BG[video.accent])} />
          <span className="text-[10px] font-black uppercase tracking-widest text-text">{video.category}</span>
        </div>
      </div>

      {/* Top-right mute toggle */}
      <button
        onClick={(e) => {
          e.stopPropagation();
          setMuted(!muted);
        }}
        className="absolute top-3 right-3 z-10 w-8 h-8 rounded-full glass-strong flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity"
      >
        {muted ? <VolumeX size={13} className="text-muted" /> : <Volume2 size={13} className="text-cyan" />}
      </button>

      {/* Center play indicator (mostra só quando não está tocando) */}
      <div
        className={cn(
          "absolute inset-0 flex items-center justify-center transition-opacity duration-300 pointer-events-none",
          hovered ? "opacity-0" : "opacity-100"
        )}
      >
        <div
          className={cn(
            "w-16 h-16 rounded-full backdrop-blur-md flex items-center justify-center border-2 transition-all",
            "border-white/30 bg-black/20 group-hover:scale-110"
          )}
        >
          <Play size={24} className="text-white ml-0.5" fill="white" />
        </div>
      </div>

      {/* Bottom info */}
      <div className="absolute bottom-0 left-0 right-0 p-4 sm:p-5 z-10">
        <div className="flex items-end justify-between gap-3">
          <div className="min-w-0 flex-1">
            <h3 className="text-base sm:text-lg font-black text-white leading-tight mb-1 truncate">
              {video.title}
            </h3>
            <p className={cn("text-[10px] font-black uppercase tracking-widest mb-2", ACCENT_TEXT[video.accent])}>
              {video.model}
            </p>
            <p className="text-xs text-white/70 line-clamp-1 italic max-w-md">
              &ldquo;{video.prompt}&rdquo;
            </p>
          </div>
          <div className="shrink-0 flex flex-col items-end gap-1.5 text-[10px] text-white/80 font-semibold">
            <div className="flex items-center gap-1 glass-strong rounded-full px-2 py-0.5">
              <Clock size={10} />
              {video.duration}
            </div>
            <div className="flex items-center gap-1 glass-strong rounded-full px-2 py-0.5">
              <Cpu size={10} />
              {video.resolution}
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
}

interface EpicVideoGalleryProps {
  videos: EpicVideo[];
}

export function EpicVideoGallery({ videos }: EpicVideoGalleryProps) {
  // Layout bento: primeiro vídeo grande, depois grid assimétrico
  return (
    <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 sm:gap-4">
      {/* Hero video (full width) */}
      <div className="sm:col-span-3">
        <EpicVideoCard video={videos[0]} index={0} span="wide" />
      </div>

      {/* Bento grid assimétrico */}
      {videos.slice(1, 9).map((video, i) => {
        const colSpan = i % 4 === 0 || i % 4 === 3 ? "sm:col-span-2" : "sm:col-span-1";
        return (
          <div key={video.url + i} className={colSpan}>
            <EpicVideoCard video={video} index={i + 1} />
          </div>
        );
      })}
    </div>
  );
}
