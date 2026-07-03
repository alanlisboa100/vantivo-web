"use client";

import { useEffect, useRef, useState, type ReactNode } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Play, Volume2, VolumeX, Loader2, Image as ImageIcon } from "lucide-react";
import { cn } from "@/lib/utils/cn";

/* ─────────────────────────────────────────────────────────────
 * SmartVideo — autoplay, muted, looping, lazy, with poster fallback
 * ──────────────────────────────────────────────────────────── */

interface SmartVideoProps {
  src: string;
  poster?: string;
  className?: string;
  autoPlay?: boolean;
  loop?: boolean;
  muted?: boolean;
  controls?: boolean;
  playsInline?: boolean;
  preload?: "none" | "metadata" | "auto";
  onClick?: () => void;
}

export function SmartVideo({
  src,
  poster,
  className,
  autoPlay = true,
  loop = true,
  muted = true,
  controls = false,
  playsInline = true,
  preload = "metadata",
  onClick,
}: SmartVideoProps) {
  const ref = useRef<HTMLVideoElement>(null);
  const [isPlaying, setIsPlaying] = useState(autoPlay);
  const [isMuted, setIsMuted] = useState(muted);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [posterFailed, setPosterFailed] = useState(false);

  useEffect(() => {
    const v = ref.current;
    if (!v) return;
    const onPlay = () => setIsPlaying(true);
    const onPause = () => setIsPlaying(false);
    const onLoaded = () => setLoading(false);
    const onError = () => { setError(true); setLoading(false); };
    v.addEventListener("play", onPlay);
    v.addEventListener("pause", onPause);
    v.addEventListener("loadeddata", onLoaded);
    v.addEventListener("error", onError);
    return () => {
      v.removeEventListener("play", onPlay);
      v.removeEventListener("pause", onPause);
      v.removeEventListener("loadeddata", onLoaded);
      v.removeEventListener("error", onError);
    };
  }, []);

  return (
    <div className={cn("relative overflow-hidden bg-black/20", className)} onClick={onClick}>
      {!error ? (
        <video
          ref={ref}
          src={src}
          poster={poster && !posterFailed ? poster : undefined}
          autoPlay={autoPlay}
          loop={loop}
          muted={muted}
          playsInline={playsInline}
          preload={preload}
          controls={controls}
          className="w-full h-full object-cover"
        />
      ) : poster && !posterFailed ? (
        <img src={poster} alt="" className="w-full h-full object-cover" onError={() => setPosterFailed(true)} />
      ) : (
        <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-cyan/10 to-purple/10">
          <ImageIcon className="text-muted" size={32} />
        </div>
      )}

      {/* Loading shimmer */}
      {loading && !error && (
        <div className="absolute inset-0 bg-gradient-to-br from-white/5 via-white/0 to-white/5 bg-[length:200%_100%] animate-shimmer pointer-events-none" />
      )}

      {/* Mute/unmute control — only when controls is on or hover */}
      {autoPlay && !error && (
        <button
          onClick={(e) => {
            e.stopPropagation();
            if (ref.current) {
              ref.current.muted = !ref.current.muted;
              setIsMuted(ref.current.muted);
            }
          }}
          className="absolute bottom-2 right-2 w-7 h-7 rounded-full bg-black/50 backdrop-blur-sm flex items-center justify-center text-white/80 hover:text-white hover:bg-black/70 transition opacity-0 group-hover:opacity-100"
          aria-label={isMuted ? "Ativar som" : "Silenciar"}
        >
          {isMuted ? <VolumeX size={12} /> : <Volume2 size={12} />}
        </button>
      )}
    </div>
  );
}

/* ─────────────────────────────────────────────────────────────
 * VideoCard — overlay info on top of looping video
 * ──────────────────────────────────────────────────────────── */

interface VideoCardProps {
  video: { url: string; poster?: string; label: string; desc?: string };
  className?: string;
  aspect?: "square" | "video" | "portrait" | "wide";
  showOverlay?: boolean;
  rounded?: "md" | "lg" | "xl" | "2xl" | "3xl";
  onClick?: () => void;
}

export function VideoCard({
  video,
  className,
  aspect = "video",
  showOverlay = true,
  rounded = "2xl",
  onClick,
}: VideoCardProps) {
  const aspects = {
    square: "aspect-square",
    video: "aspect-video",
    portrait: "aspect-[3/4]",
    wide: "aspect-[21/9]",
  };
  const rounds = { md: "rounded-lg", lg: "rounded-xl", xl: "rounded-2xl", "2xl": "rounded-3xl", "3xl": "rounded-[32px]" };

  return (
    <motion.div
      whileHover={{ y: -4, scale: 1.02 }}
      transition={{ type: "spring", stiffness: 400, damping: 25 }}
      className={cn(
        "group relative cursor-pointer overflow-hidden border border-white/5 hover:border-cyan/20 transition-all duration-300",
        rounds[rounded],
        className
      )}
      onClick={onClick}
    >
      <SmartVideo
        src={video.url}
        poster={video.poster}
        className={cn("w-full", aspects[aspect])}
      />

      {showOverlay && (
        <>
          <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent pointer-events-none" />
          <div className="absolute bottom-0 left-0 right-0 p-3 sm:p-4">
            <p className="text-sm font-black text-text leading-tight">{video.label}</p>
            {video.desc && <p className="text-xs text-muted mt-0.5 line-clamp-1">{video.desc}</p>}
          </div>
          <div className="absolute top-3 right-3 w-8 h-8 rounded-full bg-black/40 backdrop-blur-sm flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
            <Play size={12} className="text-white fill-white ml-0.5" />
          </div>
        </>
      )}
    </motion.div>
  );
}

/* ─────────────────────────────────────────────────────────────
 * VideoGrid — grid of looping video cards
 * ──────────────────────────────────────────────────────────── */

interface VideoGridProps {
  videos: { url: string; poster?: string; label: string; desc?: string }[];
  className?: string;
  columns?: 2 | 3 | 4;
  aspect?: "square" | "video" | "portrait" | "wide";
}

export function VideoGrid({ videos, className, columns = 3, aspect = "video" }: VideoGridProps) {
  const cols = {
    2: "grid-cols-2",
    3: "grid-cols-2 md:grid-cols-3",
    4: "grid-cols-2 md:grid-cols-3 lg:grid-cols-4",
  };
  return (
    <div className={cn("grid gap-3 sm:gap-4", cols[columns], className)}>
      {videos.map((v, i) => (
        <motion.div
          key={v.url + i}
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-50px" }}
          transition={{ delay: i * 0.06, duration: 0.5 }}
        >
          <VideoCard video={v} aspect={aspect} />
        </motion.div>
      ))}
    </div>
  );
}

/* ─────────────────────────────────────────────────────────────
 * VideoMarquee — infinite horizontal scroll of video cards
 * ──────────────────────────────────────────────────────────── */

interface VideoMarqueeProps {
  videos: { url: string; poster?: string; label: string; desc?: string }[];
  className?: string;
  speed?: number;
  reverse?: boolean;
}

export function VideoMarquee({ videos, className, speed = 40, reverse = false }: VideoMarqueeProps) {
  return (
    <div
      className={cn(
        "group relative flex overflow-hidden",
        "[mask-image:linear-gradient(to_right,transparent,black_10%,black_90%,transparent)]",
        className
      )}
    >
      {[0, 1].map((dup) => (
        <div
          key={dup}
          className="flex shrink-0 gap-3 sm:gap-4 pr-3 sm:pr-4 group-hover:[animation-play-state:paused]"
          style={{ animation: `marquee ${speed}s linear infinite${reverse ? " reverse" : ""}` }}
        >
          {videos.map((v, i) => (
            <div key={`${dup}-${i}`} className="w-56 sm:w-72 shrink-0">
              <VideoCard video={v} aspect="video" showOverlay={false} rounded="xl" />
            </div>
          ))}
        </div>
      ))}
    </div>
  );
}

/* ─────────────────────────────────────────────────────────────
 * VideoHero — full-bleed video background with content overlay
 * ──────────────────────────────────────────────────────────── */

interface VideoHeroProps {
  video: { url: string; poster?: string };
  className?: string;
  children: ReactNode;
  intensity?: "low" | "md" | "high";
  showBadge?: boolean;
  badgeText?: string;
}

export function VideoHero({ video, className, children, intensity = "md", showBadge, badgeText }: VideoHeroProps) {
  const overlay = { low: "from-bg/60", md: "from-bg/80", high: "from-bg/95" };
  return (
    <div className={cn("relative overflow-hidden", className)}>
      {/* Video background */}
      <div className="absolute inset-0">
        <SmartVideo src={video.url} poster={video.poster} className="w-full h-full" />
        <div className={cn("absolute inset-0 bg-gradient-to-br via-bg/40 to-bg/80", overlay[intensity])} />
      </div>

      {/* Optional badge */}
      {showBadge && (
        <div className="absolute top-4 right-4 z-20">
          <div className="glass-strong rounded-full px-3 py-1.5 flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-red-500 animate-pulse" />
            <span className="text-[10px] font-black uppercase tracking-wider">{badgeText || "Preview"}</span>
          </div>
        </div>
      )}

      <div className="relative z-10">{children}</div>
    </div>
  );
}

/* ─────────────────────────────────────────────────────────────
 * SplitVideoShowcase — half image / half video comparison
 * ──────────────────────────────────────────────────────────── */

interface SplitVideoShowcaseProps {
  beforeImage: string;
  afterVideo: { url: string; poster?: string };
  beforeLabel?: string;
  afterLabel?: string;
  className?: string;
}

export function SplitVideoShowcase({
  beforeImage,
  afterVideo,
  beforeLabel = "Antes",
  afterLabel = "Depois (IA)",
  className,
}: SplitVideoShowcaseProps) {
  const [showAfter, setShowAfter] = useState(false);

  return (
    <div className={cn("relative aspect-video rounded-2xl overflow-hidden border border-white/10 group", className)}>
      {/* Before image */}
      <AnimatePresence mode="wait">
        {!showAfter ? (
          <motion.img
            key="before"
            src={beforeImage}
            alt=""
            initial={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="absolute inset-0 w-full h-full object-cover"
          />
        ) : (
          <motion.div
            key="after"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="absolute inset-0"
          >
            <SmartVideo src={afterVideo.url} poster={afterVideo.poster} className="w-full h-full" />
          </motion.div>
        )}
      </AnimatePresence>

      {/* Labels */}
      <div className="absolute top-3 left-3 z-10">
        <div className="glass-strong rounded-full px-2.5 py-1 text-[10px] font-black uppercase tracking-wider">
          {showAfter ? afterLabel : beforeLabel}
        </div>
      </div>

      {/* Toggle button */}
      <button
        onClick={() => setShowAfter(!showAfter)}
        className="absolute bottom-3 right-3 z-10 glass-strong rounded-full px-4 py-2 text-xs font-bold hover:scale-105 transition-transform flex items-center gap-2"
      >
        <span className={`w-1.5 h-1.5 rounded-full ${showAfter ? "bg-cyan" : "bg-muted"}`} />
        {showAfter ? "Mostrar antes" : "Ver em ação"}
      </button>
    </div>
  );
}
