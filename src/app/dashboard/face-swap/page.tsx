"use client";

import { ToolPage } from "@/components/ToolPage";

export default function FaceSwapPage() {
  return (
    <ToolPage
      config={{
        action: "faceswap",
        title: "Face Swap",
        badge: "TROCA DE ROSTO",
        badgeColor: "purple",
        description: "Troque rostos entre fotos com precisão realista. Envie a foto original e a foto com o rosto de referência.",
        price: "3 pts",
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
  );
}
