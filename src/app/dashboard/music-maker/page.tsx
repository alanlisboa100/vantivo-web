"use client";

import { ToolPage } from "@/components/ToolPage";
import { ToolHero, ExamplesGallery } from "@/components/ui/barrel";
import { Music } from "lucide-react";
import { TOOL_IMAGES, MODEL_IMAGES } from "@/constants/samples";

export default function MusicMakerPage() {
  return (
    <div className="px-4 pt-4 pb-32 max-w-3xl mx-auto">
      <ToolHero
        video={{ url: TOOL_IMAGES.music, poster: TOOL_IMAGES.music }}
        badge="MINIMAX MUSIC-01"
        title="Música IA"
        subtitle="Crie músicas completas com inteligência artificial"
        description="Descreva o estilo, mood e instrumentos. A IA gera uma música profissional em segundos. Ideal para vídeos, podcasts e projetos criativos."
        cost={2}
        icon={Music}
        color="blue"
        features={["Até 60 segundos", "Diversos estilos", "Vocal ou instrumental", "Download MP3"]}
      />
      <div className="mt-6">
        <ToolPage
          config={{
            action: "music.generate",
            title: "Música IA",
            badge: "MINIMAX",
            badgeColor: "blue",
            description: "Crie músicas completas descrevendo estilo, mood e instrumentos.",
            price: "2 pts",
            acceptsImage: false,
            placeholder: "Ex: Uma música pop alegre com guitarra e bateria, estilo verão...",
            type: "audio",
            examples: [
              { url: MODEL_IMAGES[0].url, label: "Pop animado para TikTok" },
              { url: MODEL_IMAGES[1].url, label: "Lo-fi para estudar" },
              { url: MODEL_IMAGES[2].url, label: "Trilha épica para trailer" },
              { url: MODEL_IMAGES[3].url, label: "Funk brasileiro com batida forte" },
            ],
          }}
        />
      </div>
      <div className="mt-8">
        <ExamplesGallery
          title="Inspire-se com criações musicais"
          columns={3}
          items={MODEL_IMAGES.slice(0, 6).map((m) => ({ url: m.url, label: m.label }))}
        />
      </div>
    </div>
  );
}
