// ════════════════════════════════════════════════════════════
// LISBOA — Sample media catalog
//
// Two sources, all public and CORS-friendly:
//   1. WaveSpeed CDN:  https://static.wavespeed.ai/media/images/...
//      → high-quality AI-generated images from WaveSpeed's model gallery
//   2. Test videos:    https://test-videos.co.uk/vids/...
//      → public, royalty-free MP4 clips that support HTTP range requests
// ════════════════════════════════════════════════════════════

// ───── IMAGES (WaveSpeed AI gallery) ─────

export const HERO_IMAGES = [
  "https://static.wavespeed.ai/media/images/1782298155833776655_4HQ0ajsC.webp",
  "https://static.wavespeed.ai/media/images/1782298162338517347_OnxHR09i.webp",
  "https://static.wavespeed.ai/media/images/1782298168440778577_XY6gqzIS.webp",
  "https://static.wavespeed.ai/media/images/1782298180639774572_hxX6fpyH.webp",
  "https://static.wavespeed.ai/media/images/1782298187972102235_KtBLV4en.webp",
];

export const MODEL_IMAGES = [
  { url: "https://static.wavespeed.ai/media/images/1773982486991777301_pAKnxHQ0.webp", label: "GPT Image 2", desc: "Edição de imagem profissional", cat: "image" },
  { url: "https://static.wavespeed.ai/media/images/1773982485921091987_9RfY7gqA.webp", label: "Seedance 2.0", desc: "Vídeo a partir de imagem", cat: "video" },
  { url: "https://static.wavespeed.ai/media/images/1773982487527428587_7V5eoxHR.webp", label: "Nano Banana 2", desc: "Texto para imagem", cat: "image" },
  { url: "https://static.wavespeed.ai/media/images/1773982488103867536_m9YmHYnM.webp", label: "Video Edit", desc: "Edição de vídeo com IA", cat: "video" },
  { url: "https://static.wavespeed.ai/media/images/1773982488677021111_Z5wmwFPZ.webp", label: "Anime Studio", desc: "Transforme fotos em anime", cat: "anime" },
  { url: "https://static.wavespeed.ai/media/images/1773982486480192004_ShKT2clu.webp", label: "Capas", desc: "Design profissional", cat: "design" },
  { url: "https://static.wavespeed.ai/media/images/1773982487109684599_qpWYmG5z.webp", label: "Edição", desc: "Edição de fotos realista", cat: "edit" },
  { url: "https://static.wavespeed.ai/media/images/1773982486529320898_2EA1uWkK.webp", label: "Avatar", desc: "Avatares animados", cat: "avatar" },
];

export const TOOL_IMAGES = {
  assistant: "https://static.wavespeed.ai/media/images/1773982486991777301_pAKnxHQ0.webp",
  cover: "https://static.wavespeed.ai/media/images/1773982488677021111_Z5wmwFPZ.webp",
  anime: "https://static.wavespeed.ai/media/images/1773982488103867536_m9YmHYnM.webp",
  avatar: "https://static.wavespeed.ai/media/images/1773982487109684599_qpWYmG5z.webp",
  video: "https://static.wavespeed.ai/media/images/1773982485921091987_9RfY7gqA.webp",
  faceswap: "https://static.wavespeed.ai/media/images/1773982486529320898_2EA1uWkK.webp",
  edit: "https://static.wavespeed.ai/media/images/1773982486480192004_ShKT2clu.webp",
  upscale: "https://static.wavespeed.ai/media/images/1773982486991777301_pAKnxHQ0.webp",
  bgremove: "https://static.wavespeed.ai/media/images/1773982487527428587_7V5eoxHR.webp",
  avatarfalante: "https://static.wavespeed.ai/media/images/1773982487109684599_qpWYmG5z.webp",
  music: "https://static.wavespeed.ai/media/images/1773982486219725120_geW0oOkK.webp",
  threed: "https://static.wavespeed.ai/media/images/1773982488677021111_Z5wmwFPZ.webp",
  premium: "https://static.wavespeed.ai/media/images/1782298155833776655_4HQ0ajsC.webp",
  gallery: "https://static.wavespeed.ai/media/images/1782298162338517347_OnxHR09i.webp",
  redeem: "https://static.wavespeed.ai/media/images/1782298168440778577_XY6gqzIS.webp",
} as const;

// ───── VIDEOS (test-videos.co.uk + Google cloud-samples) ─────
// All videos support HTTP range requests → streamable via <video>

export const HERO_VIDEOS = [
  {
    url: "https://test-videos.co.uk/vids/bigbuckbunny/mp4/h264/720/Big_Buck_Bunny_720_10s_1MB.mp4",
    poster: "https://static.wavespeed.ai/media/images/1782298155833776655_4HQ0ajsC.webp",
    label: "Seedance 2.0",
    desc: "Animação cinematográfica",
  },
  {
    url: "https://test-videos.co.uk/vids/sintel/mp4/h264/360/Sintel_360_10s_1MB.mp4",
    poster: "https://static.wavespeed.ai/media/images/1782298162338517347_OnxHR09i.webp",
    label: "WAN 2.7",
    desc: "Imagem para vídeo",
  },
  {
    url: "https://test-videos.co.uk/vids/jellyfish/mp4/h264/720/Jellyfish_720_10s_1MB.mp4",
    poster: "https://static.wavespeed.ai/media/images/1782298168440778577_XY6gqzIS.webp",
    label: "Kling 3.0",
    desc: "Motion cinematográfico",
  },
  {
    url: "https://storage.googleapis.com/cloud-samples-data/generative-ai/video/pixel8.mp4",
    poster: "https://static.wavespeed.ai/media/images/1782298180639774572_hxX6fpyH.webp",
    label: "Veo 3.1",
    desc: "Vídeo generativo Google",
  },
  {
    url: "https://test-videos.co.uk/vids/bigbuckbunny/mp4/h264/360/Big_Buck_Bunny_360_10s_2MB.mp4",
    poster: "https://static.wavespeed.ai/media/images/1782298187972102235_KtBLV4en.webp",
    label: "Sora 2",
    desc: "Vídeo OpenAI",
  },
];

export const TOOL_VIDEOS = {
  video: {
    url: "https://test-videos.co.uk/vids/bigbuckbunny/mp4/h264/720/Big_Buck_Bunny_720_10s_2MB.mp4",
    poster: "https://static.wavespeed.ai/media/images/1773982485921091987_9RfY7gqA.webp",
    label: "Vídeo IA",
    desc: "Seedance 2.0 · WAN 2.7 · Veo 3.1",
  },
  avatar: {
    url: "https://test-videos.co.uk/vids/sintel/mp4/h264/360/Sintel_360_10s_2MB.mp4",
    poster: "https://static.wavespeed.ai/media/images/1773982487109684599_qpWYmG5z.webp",
    label: "Avatar Animado",
    desc: "Animação facial com IA",
  },
  avatarfalante: {
    url: "https://test-videos.co.uk/vids/jellyfish/mp4/h264/360/Jellyfish_720_10s_2MB.mp4",
    poster: "https://static.wavespeed.ai/media/images/1773982487109684599_qpWYmG5z.webp",
    label: "Avatar Falante",
    desc: "Lip-sync com ElevenLabs",
  },
  faceswap: {
    url: "https://storage.googleapis.com/cloud-samples-data/generative-ai/video/pixel8.mp4",
    poster: "https://static.wavespeed.ai/media/images/1773982486529320898_2EA1uWkK.webp",
    label: "Face Swap",
    desc: "Troca de rosto em vídeo",
  },
  edit: {
    url: "https://test-videos.co.uk/vids/bigbuckbunny/mp4/h264/360/Big_Buck_Bunny_360_10s_1MB.mp4",
    poster: "https://static.wavespeed.ai/media/images/1773982486480192004_ShKT2clu.webp",
    label: "Edição de Vídeo",
    desc: "Edição com prompts",
  },
  anime: {
    url: "https://test-videos.co.uk/vids/sintel/mp4/h264/360/Sintel_360_10s_1MB.mp4",
    poster: "https://static.wavespeed.ai/media/images/1773982488103867536_m9YmHYnM.webp",
    label: "Anime IA",
    desc: "Vídeo em estilo anime",
  },
} as const;

export const SHOWCASE_VIDEOS = [
  {
    url: "https://test-videos.co.uk/vids/bigbuckbunny/mp4/h264/720/Big_Buck_Bunny_720_10s_1MB.mp4",
    poster: "https://static.wavespeed.ai/media/images/1782298155833776655_4HQ0ajsC.webp",
    label: "Cinematic",
    desc: "Movimento de câmera suave",
  },
  {
    url: "https://test-videos.co.uk/vids/sintel/mp4/h264/360/Sintel_360_10s_2MB.mp4",
    poster: "https://static.wavespeed.ai/media/images/1782298162338517347_OnxHR09i.webp",
    label: "Anime",
    desc: "Estilo cinematográfico anime",
  },
  {
    url: "https://test-videos.co.uk/vids/jellyfish/mp4/h264/720/Jellyfish_720_10s_1MB.mp4",
    poster: "https://static.wavespeed.ai/media/images/1782298168440778577_XY6gqzIS.webp",
    label: "Natureza",
    desc: "Vida marinha em 4K",
  },
  {
    url: "https://storage.googleapis.com/cloud-samples-data/generative-ai/video/pixel8.mp4",
    poster: "https://static.wavespeed.ai/media/images/1782298180639774572_hxX6fpyH.webp",
    label: "Pixel Art",
    desc: "IA generativa Google",
  },
  {
    url: "https://test-videos.co.uk/vids/bigbuckbunny/mp4/h264/360/Big_Buck_Bunny_360_10s_2MB.mp4",
    poster: "https://static.wavespeed.ai/media/images/1782298187972102235_KtBLV4en.webp",
    label: "Personagem",
    desc: "Animação de personagem",
  },
  {
    url: "https://test-videos.co.uk/vids/jellyfish/mp4/h264/360/Jellyfish_360_10s_2MB.mp4",
    poster: "https://static.wavespeed.ai/media/images/1773982485921091987_9RfY7gqA.webp",
    label: "Subaquático",
    desc: "Ambiente subaquático",
  },
];

// ───── EXTENDED EPIC GALLERIES ─────
// 30+ images e 12+ vídeos pra encher a landing de conteúdo.

export const EPIC_VIDEOS = [
  {
    url: "https://test-videos.co.uk/vids/bigbuckbunny/mp4/h264/720/Big_Buck_Bunny_720_10s_1MB.mp4",
    poster: "https://static.wavespeed.ai/media/images/1782298155833776655_4HQ0ajsC.webp",
    title: "Cidade Cyberpunk à Noite",
    model: "Seedance 2.0",
    category: "Cinematic",
    prompt: "Drone cinematográfico sobrevoando cidade cyberpunk à noite, luzes neon, chuva",
    duration: "8s",
    resolution: "1080p",
    accent: "cyan",
  },
  {
    url: "https://test-videos.co.uk/vids/sintel/mp4/h264/360/Sintel_360_10s_1MB.mp4",
    poster: "https://static.wavespeed.ai/media/images/1782298162338517347_OnxHR09i.webp",
    title: "Retrato Anime em Movimento",
    model: "WAN 2.7",
    category: "Anime",
    prompt: "Garota anime com cabelo rosa ao vento, sakura caindo, fundo gradiente",
    duration: "10s",
    resolution: "1080p",
    accent: "pink",
  },
  {
    url: "https://test-videos.co.uk/vids/jellyfish/mp4/h264/720/Jellyfish_720_10s_1MB.mp4",
    poster: "https://static.wavespeed.ai/media/images/1782298168440778577_XY6gqzIS.webp",
    title: "Águas-Vivas Bioluminescentes",
    model: "Veo 3.1",
    category: "Natureza",
    prompt: "Águas-vivas bioluminescentes nadando em mar profundo escuro, partículas de luz",
    duration: "8s",
    resolution: "4K",
    accent: "green",
  },
  {
    url: "https://storage.googleapis.com/cloud-samples-data/generative-ai/video/pixel8.mp4",
    poster: "https://static.wavespeed.ai/media/images/1782298180639774572_hxX6fpyH.webp",
    title: "Pixel Art Animado",
    model: "Sora 2",
    category: "Pixel Art",
    prompt: "Cavaleiro em pixel art andando por floresta encantada, sprites 16-bit",
    duration: "10s",
    resolution: "1080p",
    accent: "amber",
  },
  {
    url: "https://test-videos.co.uk/vids/bigbuckbunny/mp4/h264/360/Big_Buck_Bunny_360_10s_2MB.mp4",
    poster: "https://static.wavespeed.ai/media/images/1782298187972102235_KtBLV4en.webp",
    title: "Coelho em Floresta Mágica",
    model: "Kling 3.0",
    category: "Personagem",
    prompt: "Coelho fofo explorando floresta com cogumelos brilhantes, manhã ensolarada",
    duration: "5s",
    resolution: "1080p",
    accent: "blue",
  },
  {
    url: "https://test-videos.co.uk/vids/sintel/mp4/h264/360/Sintel_360_10s_2MB.mp4",
    poster: "https://static.wavespeed.ai/media/images/1773982485921091987_9RfY7gqA.webp",
    title: "Dragoão de Gelo",
    model: "Hailuo 2",
    category: "Fantasia",
    prompt: "Dragão de gelo cuspindo cristais em montanha nevada, épico cinematográfico",
    duration: "6s",
    resolution: "1080p",
    accent: "purple",
  },
  {
    url: "https://test-videos.co.uk/vids/jellyfish/mp4/h264/360/Jellyfish_360_10s_2MB.mp4",
    poster: "https://static.wavespeed.ai/media/images/1773982488103867536_m9YmHYnM.webp",
    title: "Ondas do Mar",
    model: "Veo 3.1",
    category: "Cinematic",
    prompt: "Ondas do mar batendo em falésia ao pôr do sol, câmera lenta dramática",
    duration: "8s",
    resolution: "4K",
    accent: "cyan",
  },
  {
    url: "https://test-videos.co.uk/vids/bigbuckbunny/mp4/h264/720/Big_Buck_Bunny_720_10s_1MB.mp4",
    poster: "https://static.wavespeed.ai/media/images/1773982488677021111_Z5wmwFPZ.webp",
    title: "Garota em Tóquio Neon",
    model: "Pika 2.2",
    category: "Anime",
    prompt: "Garota em estilo anime parada em rua de Tóquio com letreiros neon",
    duration: "5s",
    resolution: "1080p",
    accent: "pink",
  },
  {
    url: "https://test-videos.co.uk/vids/sintel/mp4/h264/360/Sintel_360_10s_1MB.mp4",
    poster: "https://static.wavespeed.ai/media/images/1773982486480192004_ShKT2clu.webp",
    title: "Produto Flutuando",
    model: "Seedance 2.0",
    category: "Produto",
    prompt: "Frasco de perfume flutuando com partículas de luz, fundo escuro premium",
    duration: "8s",
    resolution: "1080p",
    accent: "amber",
  },
  {
    url: "https://test-videos.co.uk/vids/jellyfish/mp4/h264/720/Jellyfish_720_10s_1MB.mp4",
    poster: "https://static.wavespeed.ai/media/images/1773982487109684599_qpWYmG5z.webp",
    title: "Avatar Falante",
    model: "ElevenLabs",
    category: "Avatar",
    prompt: "Foto de rosto sincronizada com narração em português",
    duration: "5s",
    resolution: "1080p",
    accent: "purple",
  },
  {
    url: "https://storage.googleapis.com/cloud-samples-data/generative-ai/video/pixel8.mp4",
    poster: "https://static.wavespeed.ai/media/images/1773982486529320898_2EA1uWkK.webp",
    title: "Face Swap em Vídeo",
    model: "Pika 2.2",
    category: "Edição",
    prompt: "Troca de rosto em vídeo de dança, mantendo expressão original",
    duration: "5s",
    resolution: "1080p",
    accent: "red",
  },
  {
    url: "https://test-videos.co.uk/vids/bigbuckbunny/mp4/h264/360/Big_Buck_Bunny_360_10s_2MB.mp4",
    poster: "https://static.wavespeed.ai/media/images/1773982486991777301_pAKnxHQ0.webp",
    title: "Paisagem Alpina",
    model: "Veo 3.1",
    category: "Natureza",
    prompt: "Montanhas alpinas ao amanhecer, neblina entre os picos, câmera subindo",
    duration: "8s",
    resolution: "4K",
    accent: "green",
  },
];

export const EPIC_PHOTOS = [
  {
    url: "https://static.wavespeed.ai/media/images/1782298155833776655_4HQ0ajsC.webp",
    title: "Capa Neon Premium",
    model: "GPT Image 2",
    category: "Capas",
    desc: "Texto perfeito + composição cinematográfica",
    accent: "cyan",
  },
  {
    url: "https://static.wavespeed.ai/media/images/1782298162338517347_OnxHR09i.webp",
    title: "Anúncio Cosmético",
    model: "Imagen 4 Ultra",
    category: "Anúncios",
    desc: "Fotorrealismo de revista de luxo",
    accent: "pink",
  },
  {
    url: "https://static.wavespeed.ai/media/images/1782298168440778577_XY6gqzIS.webp",
    title: "Conceito de Personagem",
    model: "Seedream 4",
    category: "Concept Art",
    desc: "Iluminação cinematográfica e composição narrativa",
    accent: "purple",
  },
  {
    url: "https://static.wavespeed.ai/media/images/1782298180639774572_hxX6fpyH.webp",
    title: "Pôr do Sol Cyberpunk",
    model: "GPT Image 2",
    category: "Wallpaper",
    desc: "Fotorrealismo em paisagem urbana futurista",
    accent: "amber",
  },
  {
    url: "https://static.wavespeed.ai/media/images/1782298187972102235_KtBLV4en.webp",
    title: "Retrato Editorial",
    model: "Imagen 4 Ultra",
    category: "Retrato",
    desc: "Iluminação de estúdio, texturas de pele perfeitas",
    accent: "amber",
  },
  {
    url: "https://static.wavespeed.ai/media/images/1773982485921091987_9RfY7gqA.webp",
    title: "Cena Épica de Fantasia",
    model: "Seedream 4",
    category: "Fantasia",
    desc: "Composição narrativa com personagens",
    accent: "blue",
  },
  {
    url: "https://static.wavespeed.ai/media/images/1773982487527428587_7V5eoxHR.webp",
    title: "Selfie em Estilo Ghibli",
    model: "Ghibli AI",
    category: "Anime",
    desc: "Transforme sua foto em arte estilo Ghibli",
    accent: "pink",
  },
  {
    url: "https://static.wavespeed.ai/media/images/1773982488103867536_m9YmHYnM.webp",
    title: "Anime Cyberpunk",
    model: "Ghibli AI",
    category: "Anime",
    desc: "Estilo cyberpunk com traços anime",
    accent: "purple",
  },
  {
    url: "https://static.wavespeed.ai/media/images/1773982488677021111_Z5wmwFPZ.webp",
    title: "Pôster de Evento",
    model: "Qwen Image",
    category: "Design",
    desc: "Tipografia perfeita em pôster promocional",
    accent: "amber",
  },
  {
    url: "https://static.wavespeed.ai/media/images/1773982486480192004_ShKT2clu.webp",
    title: "Mockup de Produto",
    model: "Reve v1",
    category: "Produto",
    desc: "Foto de produto estilo lifestyle autêntico",
    accent: "green",
  },
  {
    url: "https://static.wavespeed.ai/media/images/1773982487109684599_qpWYmG5z.webp",
    title: "Avatar Personalizado",
    model: "Ghibli AI",
    category: "Avatar",
    desc: "Avatar em estilo anime pronto pra redes sociais",
    accent: "cyan",
  },
  {
    url: "https://static.wavespeed.ai/media/images/1773982486529320898_2EA1uWkK.webp",
    title: "Retrato Artístico",
    model: "Imagen 4 Ultra",
    category: "Retrato",
    desc: "Composição com iluminação Rembrandt",
    accent: "pink",
  },
  {
    url: "https://static.wavespeed.ai/media/images/1773982486991777301_pAKnxHQ0.webp",
    title: "Thumbnail YouTube",
    model: "GPT Image 2",
    category: "Capas",
    desc: "Thumbnail com texto chamativo e cores vibrantes",
    accent: "red",
  },
  {
    url: "https://static.wavespeed.ai/media/images/1773982486219725120_geW0oOkK.webp",
    title: "Capa de Álbum",
    model: "Seedream 4",
    category: "Design",
    desc: "Arte de capa com estética conceitual",
    accent: "purple",
  },
  {
    url: "https://static.wavespeed.ai/media/images/1782298155833776655_4HQ0ajsC.webp",
    title: "Reel Vertical",
    model: "Nano Banana 2",
    category: "Anúncios",
    desc: "Formato 9:16 otimizado pra Reels e TikTok",
    accent: "cyan",
  },
  {
    url: "https://static.wavespeed.ai/media/images/1782298162338517347_OnxHR09i.webp",
    title: "Cena Subaquática",
    model: "Imagen 4 Ultra",
    category: "Wallpaper",
    desc: "Paisagem subaquática com corais e peixes",
    accent: "blue",
  },
  {
    url: "https://static.wavespeed.ai/media/images/1782298168440778577_XY6gqzIS.webp",
    title: "Produto em Studio",
    model: "Reve v1",
    category: "Produto",
    desc: "Foto de produto com fundo infinito branco",
    accent: "green",
  },
  {
    url: "https://static.wavespeed.ai/media/images/1782298180639774572_hxX6fpyH.webp",
    title: "Hero Image de Site",
    model: "Seedream 4",
    category: "Design",
    desc: "Hero image pra landing page de SaaS",
    accent: "purple",
  },
];

// ───── LEGACY EXPORT (back-compat) ─────

export const SAMPLES = {
  hero: HERO_IMAGES,
  models: MODEL_IMAGES,
  extras: MODEL_IMAGES.map((m) => ({ ...m, cat: m.cat })),
} as const;
