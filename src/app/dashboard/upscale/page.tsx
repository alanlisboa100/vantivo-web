"use client";

import { ToolPage } from "@/components/ToolPage";
import { ToolHero, ExamplesGallery } from "@/components/ui/barrel";
import { ZoomIn } from "lucide-react";
import { TOOL_IMAGES, MODEL_IMAGES } from "@/constants/samples";

export default function UpscalePage() {
  return (
    <div className="px-4 pt-4 pb-32 max-w-3xl mx-auto">
      <ToolHero
        video={{ url: TOOL_IMAGES.upscale, poster: TOOL_IMAGES.upscale }}
        badge="IMAGE UPSCALER"
        title="Upscale"
        subtitle="Aumente a resolução sem perder qualidade"
        description="Transforme imagens de baixa resolução em alta definição. A IA reconstrói detalhes, texturas e nitidez de forma inteligente."
        cost={1}
        icon={ZoomIn}
        color="green"
        features={["Até 4x resolução", "Preserva detalhes", "Remove ruído", "Resultado instantâneo"]}
      />
      <div className="mt-6">
        <ToolPage
          config={{
            action: "gallery.upscaleImage",
            title: "Upscale",
            badge: "UPSCALER",
            badgeColor: "green",
            description: "Aumente a resolução da sua imagem mantendo a qualidade.",
            price: "1 pt",
            acceptsImage: true,
            placeholder: "Selecione uma imagem para upscaling...",
            type: "image",
            examples: [
              { url: MODEL_IMAGES[0].url, label: "Foto de baixa resolução" },
              { url: MODEL_IMAGES[1].url, label: "Screenshot pixelado" },
              { url: MODEL_IMAGES[2].url, label: "Imagem antiga para restaurar" },
              { url: MODEL_IMAGES[3].url, label: "Arte digital para ampliar" },
            ],
          }}
        />
      </div>
      <div className="mt-8">
        <ExamplesGallery
          title="Antes e depois do upscale"
          columns={3}
          items={MODEL_IMAGES.slice(0, 6).map((m) => ({ url: m.url, label: m.label }))}
        />
      </div>
    </div>
  );
}
