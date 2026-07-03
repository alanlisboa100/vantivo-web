"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { createClient } from "@/lib/supabase/client";
import { motion } from "framer-motion";
import { LogoWordmark } from "@/components/brand";
import { AuroraBg, NoiseOverlay } from "@/components/ui/barrel";
import { CheckCircle2 } from "lucide-react";

export default function AuthCallbackPage() {
  const router = useRouter();
  const [status, setStatus] = useState<"loading" | "ok" | "error">("loading");

  useEffect(() => {
    const supabase = createClient();
    supabase.auth.getSession().then(({ data: { session }, error }) => {
      if (error) {
        setStatus("error");
        setTimeout(() => router.push("/login"), 1500);
        return;
      }
      if (session) {
        setStatus("ok");
        setTimeout(() => router.push("/dashboard"), 800);
      } else {
        setStatus("error");
        setTimeout(() => router.push("/login"), 1500);
      }
    });
  }, [router]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-bg relative overflow-hidden">
      <AuroraBg intensity="md" className="opacity-40" />
      <NoiseOverlay opacity={0.025} />

      <div className="relative z-10 text-center">
        <LogoWordmark size={32} animated className="justify-center mb-8" />

        {status === "loading" && (
          <>
            <div className="relative inline-block">
              <div className="absolute inset-0 bg-cyan/20 blur-2xl rounded-full animate-pulse" />
              <div className="relative w-16 h-16 rounded-full border-2 border-white/10 border-t-cyan animate-spin" />
            </div>
            <p className="text-sm text-muted mt-6">Confirmando seu login...</p>
          </>
        )}

        {status === "ok" && (
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ type: "spring", stiffness: 300 }}
            className="inline-flex flex-col items-center"
          >
            <div className="w-16 h-16 rounded-full bg-green/20 border border-green/30 flex items-center justify-center mb-4">
              <CheckCircle2 size={32} className="text-green" />
            </div>
            <p className="text-sm font-bold">Login confirmado! Entrando...</p>
          </motion.div>
        )}

        {status === "error" && (
          <div>
            <div className="w-16 h-16 rounded-full bg-red/20 border border-red/30 flex items-center justify-center mx-auto mb-4">
              <span className="text-2xl">⚠️</span>
            </div>
            <p className="text-sm font-bold mb-1">Não foi possível confirmar</p>
            <p className="text-xs text-muted">Redirecionando pro login...</p>
          </div>
        )}
      </div>
    </div>
  );
}
