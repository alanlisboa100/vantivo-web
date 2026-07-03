"use client";

import { LogoWordmark } from "@/components/brand";
import { AuroraBg, NoiseOverlay } from "@/components/ui/barrel";

export default function GlobalLoading() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-bg relative overflow-hidden">
      <AuroraBg intensity="md" className="opacity-40" />
      <NoiseOverlay opacity={0.025} />
      <div className="relative z-10 text-center">
        <LogoWordmark size={32} animated className="justify-center mb-8" />
        <div className="relative inline-block">
          <div className="absolute inset-0 bg-cyan/20 blur-2xl rounded-full animate-pulse" />
          <div className="relative w-12 h-12 rounded-full border-2 border-white/10 border-t-cyan animate-spin" />
        </div>
        <p className="text-sm text-muted mt-5">Carregando...</p>
      </div>
    </div>
  );
}
