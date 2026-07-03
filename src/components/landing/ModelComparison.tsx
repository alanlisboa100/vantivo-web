"use client";

import { motion } from "framer-motion";
import { Sparkles, Zap, Trophy } from "lucide-react";
import { cn } from "@/lib/utils/cn";

interface ComparisonRow {
  model: string;
  speed: string;
  quality: string;
  duration?: string;
  resolution?: string;
  price: string;
  best?: boolean;
  badge?: string;
  note?: string;
}

interface ModelComparisonProps {
  title: string;
  subtitle: string;
  columns: string[];
  rows: ComparisonRow[];
  accent?: "cyan" | "purple" | "pink" | "green";
}

export function ModelComparison({ title, subtitle, columns, rows, accent = "cyan" }: ModelComparisonProps) {
  return (
    <div className="relative">
      {/* Background glow */}
      <div
        className={cn(
          "absolute -inset-8 opacity-20 blur-3xl pointer-events-none",
          accent === "cyan" && "bg-cyan/20",
          accent === "purple" && "bg-purple/20",
          accent === "pink" && "bg-pink/20",
          accent === "green" && "bg-green/20"
        )}
      />

      <div className="relative">
        {/* Header */}
        <div className="mb-8 text-center">
          <div className="inline-flex items-center gap-2 mb-3">
            <Trophy size={14} className="text-amber" />
            <span className="text-[10px] font-black uppercase tracking-[0.2em] text-amber">Comparativo</span>
          </div>
          <h3 className="text-2xl sm:text-3xl font-black mb-2">{title}</h3>
          <p className="text-sm text-muted">{subtitle}</p>
        </div>

        {/* Tabela */}
        <div className="rounded-3xl border border-white/5 bg-card/30 backdrop-blur-sm overflow-hidden">
          {/* Header */}
          <div className="hidden md:grid grid-cols-5 gap-4 px-6 py-4 border-b border-white/5 bg-white/[0.02]">
            {columns.map((col, i) => (
              <div
                key={col}
                className={cn(
                  "text-[10px] font-black uppercase tracking-[0.2em]",
                  i === 0 ? "text-text text-left" : "text-dim text-center"
                )}
              >
                {col}
              </div>
            ))}
          </div>

          {/* Rows */}
          <div className="divide-y divide-white/5">
            {rows.map((row, i) => (
              <motion.div
                key={row.model}
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.05, duration: 0.4 }}
                className={cn(
                  "grid grid-cols-2 md:grid-cols-5 gap-3 md:gap-4 px-4 sm:px-6 py-4 items-center transition-colors group",
                  row.best ? "bg-gradient-to-r from-cyan/5 via-purple/5 to-transparent" : "hover:bg-white/[0.02]"
                )}
              >
                {/* Modelo */}
                <div className="flex items-center gap-2">
                  {row.best && (
                    <div className="shrink-0 w-6 h-6 rounded-full bg-gradient-to-br from-amber to-pink flex items-center justify-center">
                      <Sparkles size={11} className="text-white" />
                    </div>
                  )}
                  <div className="min-w-0">
                    <p className={cn("text-sm font-black truncate", row.best && "text-cyan")}>
                      {row.model}
                    </p>
                    {row.badge && (
                      <span className="text-[9px] font-bold uppercase tracking-wider text-amber">
                        {row.badge}
                      </span>
                    )}
                    {row.note && (
                      <span className="text-[9px] font-bold uppercase tracking-wider text-purple">
                        {row.note}
                      </span>
                    )}
                  </div>
                </div>

                {/* Velocidade (mobile: mostra label) */}
                <div className="text-left md:text-center">
                  <span className="md:hidden text-[9px] text-dim uppercase tracking-wider block">Velocidade</span>
                  <p className="text-sm text-muted font-semibold">{row.speed}</p>
                </div>

                {/* Qualidade */}
                <div className="text-left md:text-center">
                  <span className="md:hidden text-[9px] text-dim uppercase tracking-wider block">Qualidade</span>
                  <p className="text-sm font-black text-amber">{row.quality}</p>
                </div>

                {/* Duração ou Resolução */}
                <div className="text-left md:text-center">
                  <span className="md:hidden text-[9px] text-dim uppercase tracking-wider block">
                    {row.duration ? "Duração" : "Resolução"}
                  </span>
                  <p className="text-sm text-muted font-mono">
                    {row.duration || row.resolution}
                  </p>
                </div>

                {/* Preço */}
                <div className="text-left md:text-center col-span-2 md:col-span-1">
                  <span className="md:hidden text-[9px] text-dim uppercase tracking-wider block">Preço</span>
                  <div className="inline-flex items-center gap-1 px-3 py-1 rounded-full bg-cyan/10 border border-cyan/20">
                    <Zap size={11} className="text-cyan" />
                    <span className="text-sm font-black text-cyan">{row.price}</span>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Footnote */}
        <p className="text-center text-xs text-dim mt-4">
          * Pontos são debitados por uso. Cada modelo consome uma quantidade diferente baseada em custo computacional.
        </p>
      </div>
    </div>
  );
}
