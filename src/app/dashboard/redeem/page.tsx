"use client";

import { useState } from "react";
import { useI18n } from "@/lib/contexts/I18nContext";
import { useAuth } from "@/lib/contexts/AuthContext";
import { NeonBackdrop, PremiumBadge } from "@/components/brand";
import { Card, Button, Input, Badge } from "@/components/ui";
import { motion } from "framer-motion";
import { Gift } from "lucide-react";
import { toast } from "sonner";

export default function RedeemCodePage() {
  const { t } = useI18n();
  const { points } = useAuth();
  const [code, setCode] = useState("");

  const handleRedeem = () => {
    if (!code.trim()) return;
    toast.info("Resgate será implementado com validação no backend!");
  };

  return (
    <div className="relative min-h-screen">
      <NeonBackdrop />
      <div className="relative z-10 px-4 pt-4 pb-32">
        <div className="mb-6">
          <PremiumBadge className="mb-2">RESGATE</PremiumBadge>
          <h1 className="text-3xl font-black">Resgatar Código</h1>
          <p className="text-sm text-muted mt-1">Ative pontos recebidos.</p>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <Card className="p-6 text-center" glow="amber">
            <Gift size={48} className="text-amber mx-auto mb-4" />
            <p className="text-lg font-bold mb-1">Tem um código promocional?</p>
            <p className="text-sm text-muted mb-4">Digite abaixo e libere seus pontos.</p>

            <Input
              value={code}
              onChange={(e) => setCode(e.target.value)}
              placeholder="EX: LISBOA-XXXX"
              className="text-center uppercase tracking-[0.2em]"
            />

            <Button className="mt-3 w-full" onClick={handleRedeem}>
              Resgatar
            </Button>
          </Card>
        </motion.div>
      </div>
    </div>
  );
}
