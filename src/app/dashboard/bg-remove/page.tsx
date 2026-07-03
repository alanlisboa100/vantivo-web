"use client";

import { ToolPage } from "@/components/ToolPage";
import { ToolHero, ExamplesGallery } from "@/components/ui/barrel";
import { Scissors } from "lucide-react";
import { MODEL_IMAGES, TOOL_IMAGES } from "@/constants/samples";

export default function BgRemovePage() {
  return (
    <div className="px-4 pt-4 pb-32 max-w-3xl mx-auto">
      <ToolHero
        video={{ url: TOOL_IMAGES.bgremove }}
        badge="BG REMOVER"
        title="Remover Fundo"
        subtitle="Corte perfeito em 1 segundo"
        description="IA detecta o objeto principal e remove o fundo com precisão de pixel. Ideal pra produto, retrato e composição."
        cost={1}
        icon={Scissors}
        color="green"
        features={["Detecção automática", "PNG transparente", "4K · alta resolução", "Resultado instantâneo"]}
      />
      <div className="mt-6">
        <ToolPage
          config={{
            action: "bg.remove",
            title: "Remover Fundo",
            badge: "BG REMOVER",
            badgeColor: "green",
            description: "Remova o fundo de qualquer imagem automaticamente com IA. Perfeito para produtos, retratos e muito mais.",
            price: "1 pt",
            acceptsImage: true,
            placeholder: "Descrição opcional...",
            type: "image",
            examples: [
              { url: "https://static.wavespeed.ai/media/images/1773982487527428587_7V5eoxHR.webp", label: "Remover fundo de produto" },
              { url: "https://static.wavespeed.ai/media/images/1773982486991777301_pAKnxHQ0.webp", label: "Remover fundo de retrato" },
              { url: "https://static.wavespeed.ai/media/images/1773982485921091987_9RfY7gqA.webp", label: "Isolar objeto" },
            ],
          }}
        />
      </div>
      <div className="mt-8">
        <ExamplesGallery
          title="Veja o resultado da IA"
          columns={3}
          items={MODEL_IMAGES.slice(0, 6).map((m) => ({ url: m.url, label: m.label }))}
        />
      </div>
    </div>
  );
}
