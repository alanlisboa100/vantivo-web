"use client";

import { useEffect } from "react";
import { motion } from "framer-motion";
import { AlertTriangle, RefreshCw, Home } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/barrel";
import { LogoWordmark } from "@/components/brand";
import { AuroraBg, NoiseOverlay } from "@/components/ui/barrel";

export default function GlobalError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error("App error:", error);
  }, [error]);

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
          className="relative inline-block mb-6"
        >
          <div className="absolute inset-0 bg-red/30 blur-2xl rounded-full" />
          <div className="relative w-20 h-20 rounded-3xl bg-red/20 border border-red/30 flex items-center justify-center">
            <AlertTriangle size={36} className="text-red" />
          </div>
        </motion.div>

        <h2 className="text-2xl sm:text-3xl font-black mb-3">
          Algo deu errado
        </h2>
        <p className="text-sm text-muted mb-2">
          Encontramos um problema ao processar sua requisição.
        </p>
        {error.digest && (
          <p className="text-[10px] text-dim font-mono mb-6">Erro: {error.digest}</p>
        )}

        <div className="flex items-center justify-center gap-2 flex-wrap mt-8">
          <Button onClick={reset} leftIcon={<RefreshCw size={14} />}>
            Tentar de novo
          </Button>
          <Link href="/">
            <Button variant="secondary" leftIcon={<Home size={14} />}>
              Voltar pra home
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
}
