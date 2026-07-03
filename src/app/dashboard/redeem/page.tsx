"use client";

import { useState } from "react";
import { useI18n } from "@/lib/contexts/I18nContext";
import { useAuth } from "@/lib/contexts/AuthContext";
import { Card, Button, Input } from "@/components/ui/barrel";
import { ToolHero, ExamplesGallery } from "@/components/ui/barrel";
import { motion } from "framer-motion";
import { Gift, Sparkles } from "lucide-react";
import { toast } from "sonner";
import { MODEL_IMAGES } from "@/constants/samples";

export default function RedeemCodePage() {
  const { t } = useI18n();
  const { points } = useAuth();
  const [code, setCode] = useState("");

  const handleRedeem = () => {
    if (!code.trim()) return;
    toast.info("Resgate será implementado com validação no backend!");
  };

  return (
    <div className="px-4 pt-4 pb-32 max-w-3xl mx-auto">
      <ToolHero
        video={{ url: "https://test-videos.co.uk/vids/bigbuckbunny/mp4/h264/360/Big_Buck_Bunny_360_10s_2MB.mp4", poster: "https://static.wavespeed.ai/media/images/1782298187972102235_KtBLV4en.webp" }}
        badge="RESGATE"
        title="Resgatar Código"
        subtitle="Ative pontos e créditos promocionais"
        description="Tem um código de presente, parceria ou promoção? Digite aqui pra ativar pontos extras e desbloquear recursos premium."
        cost={0}
        costLabel="grátis"
        icon={Gift}
        color="amber"
        features={["Códigos de presente", "Parcerias", "Promoções sazonais", "Créditos de campanha"]}
      />

      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="mt-6">
        <Card className="p-6 text-center" glow="amber">
          <Gift size={48} className="text-amber mx-auto mb-4" />
          <p className="text-lg font-bold mb-1">Tem um código promocional?</p>
          <p className="text-sm text-muted mb-4">Digite abaixo e libere seus pontos.</p>
          <Input value={code} onChange={(e) => setCode(e.target.value)} placeholder="EX: LISBOA-XXXX" className="text-center uppercase tracking-[0.2em]" />
          <Button className="mt-3 w-full" onClick={handleRedeem} leftIcon={<Sparkles size={16} />}>Resgatar</Button>
        </Card>
      </motion.div>

      <div className="mt-8">
        <ExamplesGallery
          title="Criações com pontos de presente"
          columns={3}
          items={MODEL_IMAGES.slice(0, 6).map((m) => ({ url: m.url, label: m.label }))}
        />
      </div>
    </div>
  );
}
