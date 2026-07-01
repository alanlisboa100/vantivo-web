// Sample images from WaveSpeed CDN (free to use as examples)
// These are public showcase images from WaveSpeed's model gallery

export const SAMPLES = {
  // Hero showcase (high-res, ~1.6-2MB each)
  hero: [
    "https://static.wavespeed.ai/media/images/1782298155833776655_4HQ0ajsC.webp",
    "https://static.wavespeed.ai/media/images/1782298162338517347_OnxHR09i.webp",
    "https://static.wavespeed.ai/media/images/1782298168440778577_XY6gqzIS.webp",
    "https://static.wavespeed.ai/media/images/1782298180639774572_hxX6fpyH.webp",
    "https://static.wavespeed.ai/media/images/1782298187972102235_KtBLV4en.webp",
  ],

  // Model showcase by category
  models: [
    { url: "https://static.wavespeed.ai/media/images/1773982486991777301_pAKnxHQ0.webp", label: "GPT Image 2", desc: "Edição de imagem profissional", cat: "image" },
    { url: "https://static.wavespeed.ai/media/images/1773982485921091987_9RfY7gqA.webp", label: "Seedance 2.0", desc: "Vídeo a partir de imagem", cat: "video" },
    { url: "https://static.wavespeed.ai/media/images/1773982487527428587_7V5eoxHR.webp", label: "Nano Banana 2", desc: "Texto para imagem", cat: "image" },
    { url: "https://static.wavespeed.ai/media/images/1773982485462820141_SWBsOay0.webp", label: "Video Edit", desc: "Edição de vídeo com IA", cat: "video" },
    { url: "https://static.wavespeed.ai/media/images/1773982488103867536_m9YmHYnM.webp", label: "Anime Studio", desc: "Transforme fotos em anime", cat: "anime" },
    { url: "https://static.wavespeed.ai/media/images/1773982488677021111_Z5wmwFPZ.webp", label: "Capas", desc: "Design profissional", cat: "design" },
    { url: "https://static.wavespeed.ai/media/images/1773982486480192004_ShKT2clu.webp", label: "Edição", desc: "Edição de fotos realista", cat: "edit" },
    { url: "https://static.wavespeed.ai/media/images/1773982487109684599_qpWYmG5z.webp", label: "Avatar", desc: "Avatares animados", cat: "avatar" },
  ],

  // Extra samples for new tools (using same CDN)
  extras: [
    { url: "https://static.wavespeed.ai/media/images/1773982486529320898_2EA1uWkK.webp", label: "Face Swap", desc: "Troque rostos em fotos", cat: "face" },
    { url: "https://static.wavespeed.ai/media/images/1773982486219725120_geW0oOkK.webp", label: "Música IA", desc: "Gere música por texto", cat: "audio" },
    { url: "https://static.wavespeed.ai/media/images/1773982488677021111_Z5wmwFPZ.webp", label: "3D Model", desc: "Crie modelos 3D", cat: "3d" },
    { url: "https://static.wavespeed.ai/media/images/1773982486991777301_pAKnxHQ0.webp", label: "Upscale", desc: "Melhore resolução", cat: "upscale" },
    { url: "https://static.wavespeed.ai/media/images/1773982485921091987_9RfY7gqA.webp", label: "Avatar Falante", desc: "Foto que fala", cat: "digital" },
    { url: "https://static.wavespeed.ai/media/images/1773982487527428587_7V5eoxHR.webp", label: "Remover Fundo", desc: "Background remover", cat: "edit" },
  ],
} as const;
