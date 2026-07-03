"use client";

import { motion } from "framer-motion";
import { Sparkles, Palette, Image as ImageIcon, Camera, Brain, Video, Zap, Shield, Star, Heart } from "lucide-react";
import { LogoWordmark, PremiumBadge, AvatarCircle, IconTile } from "@/components/brand";
import { AuroraBg, NoiseOverlay, Badge } from "@/components/ui/barrel";
import type { ReactNode } from "react";

const SHOWCASES = [
  { icon: Sparkles, text: "Gere imagens com IA em segundos", color: "cyan" as const, gradient: "from-cyan/20 to-blue/20" },
  { icon: Palette, text: "Transforme fotos em arte anime", color: "pink" as const, gradient: "from-pink/20 to-purple/20" },
  { icon: ImageIcon, text: "Crie capas profissionais", color: "purple" as const, gradient: "from-purple/20 to-pink/20" },
  { icon: Camera, text: "Edite com comandos simples", color: "green" as const, gradient: "from-green/20 to-cyan/20" },
  { icon: Brain, text: "Assistente IA sempre disponível", color: "blue" as const, gradient: "from-blue/20 to-cyan/20" },
  { icon: Video, text: "Vídeos com Seedance 2.0 e Wan 2.7", color: "amber" as const, gradient: "from-amber/20 to-pink/20" },
];

const TESTIMONIAL_AUTH = [
  { name: "Marina S.", role: "YouTuber", avatar: "M" },
  { name: "Diego R.", role: "Social Media", avatar: "D" },
  { name: "Camila T.", role: "Designer", avatar: "C" },
];

const STATS_AUTH = [
  { value: "12k+", label: "Criadores" },
  { value: "1.2M", label: "Imagens" },
  { value: "4.9★", label: "Avaliação" },
];

export default function AuthLayout({ children }: { children: ReactNode }) {
  return (
    <div className="min-h-screen flex bg-bg overflow-hidden">
      {/* ─── Left Side: Visual Showcase ─── */}
      <div className="hidden lg:flex flex-1 relative items-center justify-center p-8 xl:p-12">
        {/* Background layers */}
        <div className="absolute inset-0 overflow-hidden">
          <AuroraBg intensity="md" />
          <div className="absolute inset-0 bg-grid opacity-30" />
          <NoiseOverlay opacity={0.025} />
        </div>

        <div className="relative z-10 max-w-lg w-full">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          >
            <LogoWordmark size={32} animated />
            <h2 className="text-3xl xl:text-4xl font-black mt-6 mb-3 leading-tight">
              Sua criatividade,
              <br />
              <span className="text-gradient-cyan">potencializada por IA</span>.
            </h2>
            <p className="text-base text-muted leading-relaxed">
              12+ ferramentas premium numa só plataforma. Crie, edite e transforme imagens como um profissional.
            </p>
          </motion.div>

          {/* Features list */}
          <div className="mt-8 space-y-2.5">
            {SHOWCASES.map((item, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, x: -16 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.2 + i * 0.08, duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
                className="flex items-center gap-3 p-3 rounded-2xl bg-white/[0.03] border border-white/5 hover:bg-white/[0.06] hover:border-white/10 transition-all group"
              >
                <IconTile variant={item.color} size="md" className="group-hover:scale-110 transition-transform shrink-0">
                  <item.icon size={18} />
                </IconTile>
                <span className="text-sm font-semibold text-muted group-hover:text-text transition-colors">
                  {item.text}
                </span>
              </motion.div>
            ))}
          </div>

          {/* Social proof footer */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.7 }}
            className="mt-10 flex items-center gap-4 flex-wrap"
          >
            <div className="flex -space-x-2">
              {TESTIMONIAL_AUTH.map((t) => (
                <AvatarCircle key={t.name} name={t.avatar} size="sm" />
              ))}
            </div>
            <div className="text-xs text-muted">
              <div className="flex items-center gap-1">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} size={11} className="fill-amber text-amber" />
                ))}
                <span className="font-bold text-text ml-1">4.9</span>
              </div>
              <p>+12k criadores usando LISBOA</p>
            </div>
          </motion.div>
        </div>
      </div>

      {/* ─── Right Side: Form ─── */}
      <div className="flex-1 flex items-center justify-center p-4 sm:p-6 lg:p-12 relative">
        {/* Mobile orbs */}
        <div className="absolute inset-0 lg:hidden overflow-hidden">
          <AuroraBg intensity="low" />
        </div>

        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
          className="relative z-10 w-full max-w-md"
        >
          {children}
        </motion.div>
      </div>
    </div>
  );
}
