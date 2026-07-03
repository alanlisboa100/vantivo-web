"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { ZoomIn } from "lucide-react";
import { cn } from "@/lib/utils/cn";

interface EpicPhoto {
  url: string;
  title: string;
  model: string;
  category: string;
  desc: string;
  accent: string;
}

const ACCENT_TEXT: Record<string, string> = {
  cyan: "text-cyan",
  purple: "text-purple",
  pink: "text-pink",
  green: "text-green",
  amber: "text-amber",
  blue: "text-blue",
  red: "text-red",
};

const ACCENT_GRADIENT: Record<string, string> = {
  cyan: "from-cyan/20 to-transparent",
  purple: "from-purple/20 to-transparent",
  pink: "from-pink/20 to-transparent",
  green: "from-green/20 to-transparent",
  amber: "from-amber/20 to-transparent",
  blue: "from-blue/20 to-transparent",
  red: "from-red/20 to-transparent",
};

const ACCENT_CHIP: Record<string, string> = {
  cyan: "bg-cyan/15 text-cyan border-cyan/30",
  purple: "bg-purple/15 text-purple border-purple/30",
  pink: "bg-pink/15 text-pink border-pink/30",
  green: "bg-green/15 text-green border-green/30",
  amber: "bg-amber/15 text-amber border-amber/30",
  blue: "bg-blue/15 text-blue border-blue/30",
  red: "bg-red/15 text-red border-red/30",
};

interface EpicPhotoCardProps {
  photo: EpicPhoto;
  index: number;
  size?: "sm" | "md" | "lg";
}

export function EpicPhotoCard({ photo, index, size = "md" }: EpicPhotoCardProps) {
  const [hovered, setHovered] = useState(false);
  const aspectClass = {
    sm: "aspect-square",
    md: "aspect-[4/3]",
    lg: "aspect-[16/10]",
  }[size];

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ delay: (index % 6) * 0.04, duration: 0.5 }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      whileHover={{ y: -4 }}
      className={cn(
        "group relative overflow-hidden rounded-2xl border border-white/5 bg-card/40 cursor-pointer",
        "hover:border-white/15 transition-all duration-500",
        aspectClass
      )}
    >
      <img
        src={photo.url}
        alt={photo.title}
        className={cn(
          "absolute inset-0 w-full h-full object-cover transition-transform duration-700",
          hovered ? "scale-110" : "scale-100"
        )}
        loading="lazy"
      />

      {/* Color accent gradient on hover */}
      <div
        className={cn(
          "absolute inset-0 bg-gradient-to-t via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500",
          ACCENT_GRADIENT[photo.accent]
        )}
        style={{ backgroundImage: `linear-gradient(to top, var(--bg) 0%, transparent 60%, transparent 100%)` }}
      />

      {/* Dark base overlay */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/95 via-black/30 to-transparent" />

      {/* Top-left category chip */}
      <div className="absolute top-3 left-3 z-10">
        <span
          className={cn(
            "text-[9px] font-black uppercase tracking-[0.2em] px-2.5 py-1 rounded-full border backdrop-blur-md",
            ACCENT_CHIP[photo.accent]
          )}
        >
          {photo.category}
        </span>
      </div>

      {/* Top-right zoom icon */}
      <div
        className={cn(
          "absolute top-3 right-3 z-10 w-8 h-8 rounded-full glass-strong flex items-center justify-center transition-all",
          hovered ? "opacity-100 scale-100" : "opacity-0 scale-75"
        )}
      >
        <ZoomIn size={13} className="text-text" />
      </div>

      {/* Bottom info */}
      <div className="absolute bottom-0 left-0 right-0 p-3 sm:p-4 z-10">
        <h3 className="text-sm sm:text-base font-black text-white leading-tight mb-0.5">
          {photo.title}
        </h3>
        <p className={cn("text-[10px] font-black uppercase tracking-widest mb-1", ACCENT_TEXT[photo.accent])}>
          {photo.model}
        </p>
        <p
          className={cn(
            "text-xs text-white/70 leading-snug transition-all duration-500",
            hovered ? "opacity-100 max-h-12" : "opacity-0 max-h-0 overflow-hidden"
          )}
        >
          {photo.desc}
        </p>
      </div>
    </motion.div>
  );
}

interface EpicPhotoGalleryProps {
  photos: EpicPhoto[];
}

export function EpicPhotoGallery({ photos }: EpicPhotoGalleryProps) {
  // Padrão de tamanhos pra criar layout masonry-like
  const sizes: Array<"lg" | "md" | "sm" | "md" | "md" | "sm"> = [
    "lg",
    "md",
    "sm",
    "md",
    "md",
    "sm",
    "md",
    "lg",
    "sm",
    "md",
    "md",
    "sm",
    "md",
    "md",
    "sm",
    "md",
    "lg",
    "md",
  ];

  return (
    <div className="columns-1 sm:columns-2 lg:columns-3 gap-3 sm:gap-4">
      {photos.map((photo, i) => (
        <div key={photo.url + i} className="mb-3 sm:mb-4 break-inside-avoid">
          <EpicPhotoCard photo={photo} index={i} size={sizes[i % sizes.length]} />
        </div>
      ))}
    </div>
  );
}
