"use client";

import { ToolPage } from "@/components/ToolPage";
import { ToolHero, ExamplesGallery } from "@/components/ui/barrel";
import { Video } from "lucide-react";
import { SHOWCASE_VIDEOS } from "@/constants/samples";

export default function VideoMakerPage() {
  return (
    <div className="px-4 pt-4 pb-32 max-w-3xl mx-auto">
      <ToolHero
        video={SHOWCASE_VIDEOS[0]}
        badge="SEEDANCE 2.0 · WAN 2.7"
        title="Vídeo IA"
        subtitle="Texto ou imagem → vídeo cinematográfico em segundos"
        description="Os melhores modelos de vídeo do mundo numa só ferramenta. Seedance 2.0, WAN 2.7, Veo 3.1, Kling 3.0 e Sora 2. Faça upload de uma foto ou descreva a cena."
        cost={5}
        icon={Video}
        color="cyan"
        features={["1080p · até 15s", "Movimento de câmera", "Áudio sincronizado", "I2V + T2V"]}
      />
      <div className="mt-6">
        <ToolPage
          config={{
            action: "video.generate",
            title: "Vídeo IA",
            badge: "SEEDANCE 2.0",
            badgeColor: "purple",
            description: "Transforme texto ou imagens em vídeos cinematográficos com Seedance 2.0 e Wan 2.7.",
            price: "5 pts",
            acceptsImage: true,
            placeholder: "Descreva a cena do vídeo...",
            type: "video",
            examples: [
              { url: "https://static.wavespeed.ai/media/images/1773982485921091987_9RfY7gqA.webp", label: "Driving through a futuristic city at night" },
              { url: "https://static.wavespeed.ai/media/images/1773982485462820141_SWBsOay0.webp", label: "Cinematic aerial shot of mountains" },
              { url: "https://static.wavespeed.ai/media/images/1773982486991777301_pAKnxHQ0.webp", label: "Slow motion waves crashing on beach" },
              { url: "https://static.wavespeed.ai/media/images/1773982487527428587_7V5eoxHR.webp", label: "Time lapse of clouds over city" },
            ],
          }}
        />
      </div>
      <div className="mt-8">
        <ExamplesGallery
          title="Inspire-se com vídeos da comunidade"
          columns={3}
          items={SHOWCASE_VIDEOS.slice(0, 6).map((v) => ({ ...v, isVideo: true }))}
        />
      </div>
    </div>
  );
}
