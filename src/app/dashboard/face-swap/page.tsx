"use client";

import { ToolPage } from "@/components/ToolPage";
import { ToolHero, ExamplesGallery } from "@/components/ui/barrel";
import { UserCircle2 } from "lucide-react";
import { TOOL_VIDEOS, MODEL_IMAGES } from "@/constants/samples";

export default function FaceSwapPage() {
  return (
    <div className="px-4 pt-4 pb-32 max-w-3xl mx-auto">
      <ToolHero
        video={TOOL_VIDEOS.faceswap}
        badge="FACE SWAP"
        title="Troca de Rosto"
        subtitle="Troque rostos entre fotos com precisão realista"
        description="Envie a foto original e a foto com o rosto de referência. A IA faz a troca mantendo iluminação, ângulo e expressão naturais."
        cost={2}
        icon={UserCircle2}
        color="purple"
        features={["Preserva iluminação", "Mantém expressão", "Foto ou vídeo", "Múltiplos rostos"]}
      />
      <div className="mt-6">
        <ToolPage
          config={{
            action: "faceswap",
            title: "Face Swap",
            badge: "TROCA DE ROSTO",
            badgeColor: "purple",
            description: "Troque rostos entre fotos com precisão realista. Envie a foto original e a foto com o rosto de referência.",
            price: "2 pts",
            acceptsImage: true,
            acceptsMultipleImages: true,
            minImages: 2,
            placeholder: "Descrição opcional...",
            type: "image",
            examples: [
              { url: "https://static.wavespeed.ai/media/images/1773982486529320898_2EA1uWkK.webp", label: "Troca de rosto profissional" },
              { url: "https://static.wavespeed.ai/media/images/1773982486991777301_pAKnxHQ0.webp", label: "Troca de rosto em grupo" },
              { url: "https://static.wavespeed.ai/media/images/1773982485921091987_9RfY7gqA.webp", label: "Face swap artístico" },
            ],
          }}
        />
      </div>
      <div className="mt-8">
        <ExamplesGallery
          title="Inspire-se com trocas da comunidade"
          columns={3}
          items={MODEL_IMAGES.slice(0, 6).map((m) => ({ url: m.url, label: m.label }))}
        />
      </div>
    </div>
  );
}
