"use client";

import { ToolPage } from "@/components/ToolPage";
import { ToolHero, ExamplesGallery } from "@/components/ui/barrel";
import { Box } from "lucide-react";
import { TOOL_IMAGES, MODEL_IMAGES } from "@/constants/samples";

export default function ThreeDModelPage() {
  return (
    <div className="px-4 pt-4 pb-32 max-w-3xl mx-auto">
      <ToolHero
        video={{ url: TOOL_IMAGES.threed, poster: TOOL_IMAGES.threed }}
        badge="HUNYUAN 3D V2.1"
        title="Modelo 3D"
        subtitle="Transforme imagens ou texto em modelos 3D"
        description="Envie uma foto ou descreva o objeto. A IA gera um modelo 3D completo em formato GLB, pronto para usar em jogos, AR ou impressão 3D."
        cost={5}
        icon={Box}
        color="green"
        features={["Formato GLB", "Texturizado", "Pronto para AR/VR", "Alta qualidade"]}
      />
      <div className="mt-6">
        <ToolPage
          config={{
            action: "threed.generate",
            title: "Modelo 3D",
            badge: "HUNYUAN 3D",
            badgeColor: "green",
            description: "Transforme uma imagem em modelo 3D ou descreva o que quer criar.",
            price: "5 pts",
            acceptsImage: true,
            placeholder: "Ex: Um vaso decorativo moderno com padrões geométricos...",
            type: "image",
            examples: [
              { url: MODEL_IMAGES[0].url, label: "Vaso decorativo moderno" },
              { url: MODEL_IMAGES[1].url, label: "Personagem para jogo" },
              { url: MODEL_IMAGES[2].url, label: "Peça de mobiliário" },
              { url: MODEL_IMAGES[3].url, label: "Escultura abstrata" },
            ],
          }}
        />
      </div>
      <div className="mt-8">
        <ExamplesGallery
          title="Modelos 3D gerados por IA"
          columns={3}
          items={MODEL_IMAGES.slice(0, 6).map((m) => ({ url: m.url, label: m.label }))}
        />
      </div>
    </div>
  );
}
