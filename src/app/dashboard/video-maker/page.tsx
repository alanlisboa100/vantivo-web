"use client";

import { ToolPage } from "@/components/ToolPage";

export default function VideoMakerPage() {
  return (
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
  );
}
