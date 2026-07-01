"use client";

import { ToolPage } from "@/components/ToolPage";

export default function BgRemovePage() {
  return (
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
  );
}
