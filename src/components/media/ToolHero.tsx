"use client";

import { motion } from "framer-motion";
import { type LucideIcon, ChevronRight, Sparkles, Zap } from "lucide-react";
import Link from "next/link";
import { SmartVideo, AuroraBg, NoiseOverlay } from "@/components/ui/barrel";
import { PremiumBadge, IconTile } from "@/components/brand";
import { Chip } from "@/components/ui/barrel";
import type { ReactNode } from "react";

interface ToolHeroProps {
  video: { url: string; poster?: string };
  badge: string;
  title: string;
  subtitle?: string;
  description: string;
  cost: string | number;
  costLabel?: string;
  icon: LucideIcon;
  color: "cyan" | "purple" | "pink" | "green" | "amber" | "blue";
  features?: string[];
  className?: string;
  children?: ReactNode;
}

export function ToolHero({
  video,
  badge,
  title,
  subtitle,
  description,
  cost,
  costLabel = "pontos",
  icon: Icon,
  color,
  features = [],
  className,
  children,
}: ToolHeroProps) {
  return (
    <div className={`relative overflow-hidden rounded-[28px] border border-white/5 ${className || ""}`}>
      {/* Video bg */}
      <div className="absolute inset-0">
        <SmartVideo src={video.url} poster={video.poster} className="w-full h-full" />
        <div className="absolute inset-0 bg-gradient-to-br from-bg/90 via-bg/70 to-bg/90" />
        <AuroraBg intensity="md" hue={color === "cyan" ? "cool" : color === "pink" ? "warm" : "default"} className="opacity-50" />
        <NoiseOverlay opacity={0.02} />
      </div>

      <div className="relative z-10 p-6 sm:p-8">
        <div className="flex items-center gap-2 mb-3 flex-wrap">
          <PremiumBadge variant={color as any} icon={<Sparkles size={11} />}>{badge}</PremiumBadge>
          <Chip variant="cyan" size="sm" icon={<Zap size={9} />}>{cost} {costLabel}</Chip>
        </div>

        <div className="flex items-start gap-4 mb-4">
          <IconTile variant={color} size="lg">
            <Icon size={24} />
          </IconTile>
          <div className="flex-1 min-w-0">
            <h1 className="text-2xl sm:text-3xl md:text-4xl font-black leading-tight">
              {title}
            </h1>
            {subtitle && <p className="text-sm text-muted mt-1">{subtitle}</p>}
          </div>
        </div>

        <p className="text-sm sm:text-base text-muted leading-relaxed max-w-2xl mb-5">
          {description}
        </p>

        {features.length > 0 && (
          <div className="flex flex-wrap gap-2 mb-2">
            {features.map((f) => (
              <span key={f} className="text-xs px-2.5 py-1 rounded-full bg-white/[0.04] border border-white/5 text-muted">
                ✓ {f}
              </span>
            ))}
          </div>
        )}

        {children}
      </div>
    </div>
  );
}

/* ─────────────────────────────────────────────────────────────
 * ExamplesGallery — grid de vídeos/imagens de exemplo
 * ──────────────────────────────────────────────────────────── */

interface ExamplesGalleryProps {
  items: { url: string; label?: string; poster?: string; isVideo?: boolean }[];
  title?: string;
  columns?: 2 | 3 | 4;
  className?: string;
}

export function ExamplesGallery({ items, title, columns = 3, className }: ExamplesGalleryProps) {
  const cols = {
    2: "grid-cols-2",
    3: "grid-cols-2 sm:grid-cols-3",
    4: "grid-cols-2 sm:grid-cols-3 lg:grid-cols-4",
  };
  return (
    <div className={className}>
      {title && (
        <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-dim mb-3">
          {title}
        </p>
      )}
      <div className={`grid gap-2 sm:gap-3 ${cols[columns]}`}>
        {items.map((item, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.05, duration: 0.4 }}
            className="group relative rounded-2xl overflow-hidden border border-white/5 hover:border-cyan/20 transition-all cursor-pointer"
          >
            {item.isVideo ? (
              <SmartVideo src={item.url} poster={item.poster} className="w-full aspect-square" />
            ) : (
              <img src={item.url} alt={item.label || ""} className="w-full aspect-square object-cover group-hover:scale-110 transition-transform duration-500" loading="lazy" />
            )}
            {item.label && (
              <div className="absolute inset-x-0 bottom-0 p-2.5 bg-gradient-to-t from-black/90 to-transparent">
                <p className="text-[10px] font-bold text-text line-clamp-1">{item.label}</p>
              </div>
            )}
          </motion.div>
        ))}
      </div>
    </div>
  );
}
