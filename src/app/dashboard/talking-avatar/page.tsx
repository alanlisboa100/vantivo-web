"use client";

import { ToolPage } from "@/components/ToolPage";

export default function TalkingAvatarPage() {
  return (
    <ToolPage
      config={{
        action: "avatar.talking",
        title: "Avatar Falante",
        badge: "INFINITETALK",
        badgeColor: "amber",
        description: "Transforme qualquer foto em um vídeo com áudio sincronizado. A foto ganha vida e fala o texto que você digitar.",
        price: "10 pts",
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
  );
}
