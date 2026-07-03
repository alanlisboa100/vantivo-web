"use client";

import { ToolPage } from "@/components/ToolPage";
import { ToolHero, ExamplesGallery } from "@/components/ui/barrel";
import { MessageSquare } from "lucide-react";
import { TOOL_VIDEOS, MODEL_IMAGES } from "@/constants/samples";

export default function TalkingAvatarPage() {
  return (
    <div className="px-4 pt-4 pb-32 max-w-3xl mx-auto">
      <ToolHero
        video={TOOL_VIDEOS.avatarfalante}
        badge="INFINITETALK · ELEVENLABS"
        title="Avatar Falante"
        subtitle="Foto que fala com lip-sync perfeito"
        description="Transforme qualquer foto num vídeo com áudio sincronizado. Digite o texto, escolha a voz e pronto. Ideal pra vídeos explicativos, anúncios e TikToks."
        cost={8}
        icon={MessageSquare}
        color="amber"
        features={["Lip-sync automático", "Vozes ElevenLabs", "30+ idiomas", "1080p · até 60s"]}
      />
      <div className="mt-6">
        <ToolPage
          config={{
            action: "avatar.talking",
            title: "Avatar Falante",
            badge: "INFINITETALK",
            badgeColor: "amber",
            description: "Transforme qualquer foto em um vídeo com áudio sincronizado. A foto ganha vida e fala o texto que você digitar.",
            price: "8 pts",
            acceptsImage: true,
            placeholder: "Texto que o avatar deve falar...",
            type: "video",
            examples: [
              { url: "https://static.wavespeed.ai/media/images/1773982485921091987_9RfY7gqA.webp", label: "Avatar apresentando produto" },
              { url: "https://static.wavespeed.ai/media/images/1773982486991777301_pAKnxHQ0.webp", label: "Avatar narrando história" },
              { url: "https://static.wavespeed.ai/media/images/1773982487527428587_7V5eoxHR.webp", label: "Cantor virtual" },
            ],
          }}
        />
      </div>
      <div className="mt-8">
        <ExamplesGallery
          title="Inspire-se com avatares falantes"
          columns={3}
          items={MODEL_IMAGES.slice(0, 6).map((m) => ({ url: m.url, label: m.label }))}
        />
      </div>
    </div>
  );
}
