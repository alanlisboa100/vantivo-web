"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { Home, Search, ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/barrel";
import { LogoWordmark } from "@/components/brand";
import { AuroraBg, NoiseOverlay } from "@/components/ui/barrel";

export default function NotFound() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-bg relative overflow-hidden p-4">
      <AuroraBg intensity="md" className="opacity-40" />
      <NoiseOverlay opacity={0.025} />

      <div className="relative z-10 text-center max-w-md">
        <LogoWordmark size={28} className="justify-center mb-10" />

        <motion.div
          initial={{ scale: 0.5, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ type: "spring", stiffness: 200, damping: 15 }}
        >
          <h1 className="text-[120px] sm:text-[180px] font-black leading-none">
            <span className="text-gradient-cyan">404</span>
          </h1>
        </motion.div>

        <motion.h2
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="text-2xl sm:text-3xl font-black mb-3"
        >
          Página não encontrada
        </motion.h2>

        <motion.p
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="text-sm text-muted mb-8"
        >
          A página que você procura não existe ou foi movida. Que tal voltar pra home?
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="flex items-center justify-center gap-2 flex-wrap"
        >
          <Link href="/">
            <Button leftIcon={<Home size={14} />}>Voltar pra home</Button>
          </Link>
          <Link href="/dashboard">
            <Button variant="secondary" leftIcon={<ArrowLeft size={14} />}>
              Dashboard
            </Button>
          </Link>
        </motion.div>
      </div>
    </div>
  );
}
