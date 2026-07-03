"use client";

import { motion } from "framer-motion";
import { Sparkles } from "lucide-react";
import { cn } from "@/lib/utils/cn";
import type { AIModel } from "@/constants/models";

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
  cyan: "from-cyan/10 to-cyan/0 border-cyan/20",
  purple: "from-purple/10 to-purple/0 border-purple/20",
  pink: "from-pink/10 to-pink/0 border-pink/20",
  green: "from-green/10 to-green/0 border-green/20",
  amber: "from-amber/10 to-amber/0 border-amber/20",
  blue: "from-blue/10 to-blue/0 border-blue/20",
  red: "from-red/10 to-red/0 border-red/20",
};

export function ModelLogo({ model, small = false }: { model: AIModel; small?: boolean }) {
  return (
    <div
      className={cn(
        "group flex items-center gap-2 px-3 sm:px-4 py-2 rounded-2xl border bg-gradient-to-r transition-all duration-300 hover:scale-105 cursor-pointer shrink-0",
        ACCENT_BG[model.accent]
      )}
    >
      <div
        className={cn(
          "shrink-0 rounded-lg overflow-hidden border",
          small ? "w-6 h-6" : "w-8 h-8",
          "border-white/10"
        )}
      >
        <img src={model.sample.image} alt="" className="w-full h-full object-cover" loading="lazy" />
      </div>
      <div className="flex flex-col">
        <span
          className={cn(
            "font-black tracking-tight whitespace-nowrap",
            small ? "text-[11px]" : "text-sm",
            ACCENT_TEXT[model.accent]
          )}
        >
          {model.name}
        </span>
        {!small && (
          <span className="text-[9px] text-dim uppercase tracking-wider font-semibold leading-none mt-0.5">
            {model.provider}
          </span>
        )}
      </div>
    </div>
  );
}

export function ModelMarquee({ models, reverse = false, speed = 40 }: { models: AIModel[]; reverse?: boolean; speed?: number }) {
  return (
    <div className="relative overflow-hidden [mask-image:linear-gradient(to_right,transparent,black_5%,black_95%,transparent)]">
      <div className="flex gap-3 w-max" style={{ animation: `marquee-${reverse ? "rev" : "fwd"} ${speed}s linear infinite` }}>
        {[...models, ...models, ...models].map((m, i) => (
          <ModelLogo key={m.id + i} model={m} small />
        ))}
      </div>
      <style jsx>{`
        @keyframes marquee-fwd {
          from { transform: translateX(0); }
          to { transform: translateX(-33.33%); }
        }
        @keyframes marquee-rev {
          from { transform: translateX(-33.33%); }
          to { transform: translateX(0); }
        }
      `}</style>
    </div>
  );
}

export function ModelMarqueeStack({ models }: { models: AIModel[] }) {
  // Pega metade pra cada linha
  const mid = Math.ceil(models.length / 2);
  const row1 = models.slice(0, mid);
  const row2 = models.slice(mid);

  return (
    <div className="space-y-3 py-4">
      <ModelMarquee models={row1} speed={45} />
      <ModelMarquee models={row2} reverse speed={55} />
    </div>
  );
}

export function ModelStatBar() {
  const stats = [
    { label: "Modelos de imagem", value: "8+", accent: "cyan" as const },
    { label: "Modelos de vídeo", value: "8+", accent: "purple" as const },
    { label: "Atualizações por mês", value: "4", accent: "pink" as const },
    { label: "Provedores globais", value: "7", accent: "green" as const },
  ];

  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
      {stats.map((s, i) => (
        <motion.div
          key={s.label}
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: i * 0.05 }}
          className="text-center p-4 rounded-2xl border border-white/5 bg-white/[0.02] hover:bg-white/[0.04] transition-colors"
        >
          <div className="flex items-center justify-center gap-1.5 mb-1">
            <Sparkles size={11} className={ACCENT_TEXT[s.accent]} />
            <p className={cn("text-2xl sm:text-3xl font-black", ACCENT_TEXT[s.accent])}>{s.value}</p>
          </div>
          <p className="text-[10px] text-dim uppercase tracking-wider font-bold">{s.label}</p>
        </motion.div>
      ))}
    </div>
  );
}
