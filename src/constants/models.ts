// ════════════════════════════════════════════════════════════
// LISBOA — AI Model Catalog
//
// Single source of truth para todos os modelos de IA de vídeo
// e imagem disponíveis na plataforma. Cada entrada carrega:
//   - id, nome, provedor, versão
//   - tipo (image | video | both)
//   - pontos por uso, latência média
//   - strengths: array de bullets
//   - bestFor: casos de uso ideais
//   - resolution / duration suportados
//   - sampleMedia: thumbnail + vídeo de demonstração
//   - badge: "Novo", "Top", "Preview", "Beta"
// ════════════════════════════════════════════════════════════

export type ModelType = "image" | "video" | "both";
export type ModelBadge = "Novo" | "Top" | "Preview" | "Beta" | "Em breve";

export interface AIModel {
  id: string;
  name: string;
  provider: string;
  version: string;
  type: ModelType;
  category: "flagship" | "fast" | "artistic" | "realistic" | "anime" | "3d" | "utility";
  tagline: string;
  description: string;
  strengths: string[];
  bestFor: string[];
  points: number;
  avgTime: string; // ex: "12s", "2min", "1min30"
  resolution: string;
  duration?: string; // só para vídeo
  badge?: ModelBadge;
  sample: {
    poster: string;
    video?: string;
    image: string;
  };
  accent: "cyan" | "purple" | "pink" | "green" | "amber" | "blue" | "red";
}

// ───── IMAGE MODELS ─────

const IMG_GPT = "https://static.wavespeed.ai/media/images/1782298155833776655_4HQ0ajsC.webp";
const IMG_NANO = "https://static.wavespeed.ai/media/images/1782298162338517347_OnxHR09i.webp";
const IMG_FLUX = "https://static.wavespeed.ai/media/images/1782298168440778577_XY6gqzIS.webp";
const IMG_HERO = "https://static.wavespeed.ai/media/images/1782298180639774572_hxX6fpyH.webp";
const IMG_AURA = "https://static.wavespeed.ai/media/images/1782298187972102235_KtBLV4en.webp";
const IMG_WAN = "https://static.wavespeed.ai/media/images/1773982485921091987_9RfY7gqA.webp";
const IMG_KLING = "https://static.wavespeed.ai/media/images/1773982487527428587_7V5eoxHR.webp";
const IMG_ANIME = "https://static.wavespeed.ai/media/images/1773982488103867536_m9YmHYnM.webp";
const IMG_COVER = "https://static.wavespeed.ai/media/images/1773982488677021111_Z5wmwFPZ.webp";
const IMG_AVATAR = "https://static.wavespeed.ai/media/images/1773982487109684599_qpWYmG5z.webp";
const IMG_EDIT = "https://static.wavespeed.ai/media/images/1773982486480192004_ShKT2clu.webp";
const IMG_FACE = "https://static.wavespeed.ai/media/images/1773982486529320898_2EA1uWkK.webp";
const IMG_GALLERY = "https://static.wavespeed.ai/media/images/1773982486991777301_pAKnxHQ0.webp";

// ───── VIDEOS ─────

const VID_BBB_720 = "https://test-videos.co.uk/vids/bigbuckbunny/mp4/h264/720/Big_Buck_Bunny_720_10s_1MB.mp4";
const VID_SINTEL_360 = "https://test-videos.co.uk/vids/sintel/mp4/h264/360/Sintel_360_10s_1MB.mp4";
const VID_JELLY_720 = "https://test-videos.co.uk/vids/jellyfish/mp4/h264/720/Jellyfish_720_10s_1MB.mp4";
const VID_PIXEL = "https://storage.googleapis.com/cloud-samples-data/generative-ai/video/pixel8.mp4";
const VID_BBB_360 = "https://test-videos.co.uk/vids/bigbuckbunny/mp4/h264/360/Big_Buck_Bunny_360_10s_2MB.mp4";
const VID_SINTEL_360_2 = "https://test-videos.co.uk/vids/sintel/mp4/h264/360/Sintel_360_10s_2MB.mp4";
const VID_JELLY_360 = "https://test-videos.co.uk/vids/jellyfish/mp4/h264/360/Jellyfish_360_10s_2MB.mp4";

export const IMAGE_MODELS: AIModel[] = [
  {
    id: "gpt-image-2",
    name: "GPT Image 2",
    provider: "OpenAI",
    version: "2.0",
    type: "image",
    category: "flagship",
    tagline: "O estado da arte em geração de imagens",
    description:
      "Modelo topo de linha da OpenAI. Compreende contexto longo, escreve texto legível dentro da imagem, segue instruções complexas e entrega fotorrealismo cinematográfico.",
    strengths: [
      "Renderiza texto legível em qualquer imagem",
      "Entende prompts longos e contexto semântico",
      "Fotorrealismo cinematográfico",
      "Edição de imagem por instrução em linguagem natural",
    ],
    bestFor: ["Capas com texto", "Anúncios", "Materiais de marketing", "Pôsteres"],
    points: 2,
    avgTime: "8s",
    resolution: "2048×2048",
    badge: "Top",
    sample: { poster: IMG_GPT, image: IMG_GPT },
    accent: "green",
  },
  {
    id: "nano-banana-2",
    name: "Nano Banana 2",
    provider: "Google DeepMind",
    version: "2.0",
    type: "image",
    category: "flagship",
    tagline: "Velocidade absurda, qualidade absurda",
    description:
      "Modelo otimizado do Google DeepMind que entrega resultados quase instantâneos sem abrir mão de fidelidade. Ideal pra iteração rápida em produção.",
    strengths: [
      "Latência sub-2s na maioria dos prompts",
      "Excelente em composições complexas",
      "Cores vibrantes e naturais",
      "Suporte multilíngue nativo",
    ],
    bestFor: ["Produção em escala", "Iteração rápida", "Posts pra redes sociais", "Brainstorm visual"],
    points: 1,
    avgTime: "4s",
    resolution: "1536×1536",
    badge: "Top",
    sample: { poster: IMG_NANO, image: IMG_NANO },
    accent: "cyan",
  },
  {
    id: "flux-2-klein",
    name: "Flux 2 Klein",
    provider: "Black Forest Labs",
    version: "2.0 · 4B",
    type: "image",
    category: "fast",
    tagline: "Pequeno no tamanho, gigante no resultado",
    description:
      "Versão destilada do Flux 2 com 4B de parâmetros. Equilibra custo e qualidade como ninguém — perfeito pra uso diário em volume.",
    strengths: [
      "Modelo leve (4B) com qualidade de旗舰",
      "Excelente custo-benefício",
      "Bom em estilos artísticos e realistas",
      "Saída consistente em prompts longos",
    ],
    bestFor: ["Uso diário", "Geração em lote", "Thumbnails", "Avatares"],
    points: 1,
    avgTime: "5s",
    resolution: "1024×1024",
    sample: { poster: IMG_FLUX, image: IMG_FLUX },
    accent: "blue",
  },
  {
    id: "seedream-4",
    name: "Seedream 4",
    provider: "ByteDance",
    version: "4.0",
    type: "image",
    category: "artistic",
    tagline: "Composições cinematográficas em um clique",
    description:
      "Modelo chinês focado em composição narrativa. Cria cenas com profundidade, iluminação dramática e estética de filme.",
    strengths: [
      "Iluminação cinematográfica",
      "Excelente em cenas com personagens",
      "Paletas de cor cinematográficas",
      "Ótimo pra concept art",
    ],
    bestFor: ["Concept art", "Storyboards", "Capas cinematográficas", "Wallpapers"],
    points: 2,
    avgTime: "10s",
    resolution: "1920×1920",
    badge: "Novo",
    sample: { poster: IMG_HERO, image: IMG_HERO },
    accent: "purple",
  },
  {
    id: "imagen-4-ultra",
    name: "Imagen 4 Ultra",
    provider: "Google",
    version: "4.0 Ultra",
    type: "image",
    category: "realistic",
    tagline: "Fotorrealismo que engana qualquer olho",
    description:
      "Versão premium do Imagen 4 do Google. Líder em benchmarks de realismo, com texturas de pele, cabelo e materiais indistinguíveis de fotografia.",
    strengths: [
      "Texturas hiper-realistas",
      "Pele, cabelo e materiais perfeitos",
      "Excelente em retrato e moda",
      "Iluminação natural impecável",
    ],
    bestFor: ["Retratos", "Campanhas de moda", "Mockups de produto", "Editorial"],
    points: 3,
    avgTime: "12s",
    resolution: "2048×2048",
    badge: "Top",
    sample: { poster: IMG_AURA, image: IMG_AURA },
    accent: "amber",
  },
  {
    id: "qwen-image",
    name: "Qwen Image",
    provider: "Alibaba",
    version: "1.0",
    type: "image",
    category: "artistic",
    tagline: "Renderização de texto em chinês e inglês",
    description:
      "Modelo open-weight da Alibaba com renderização de texto multilíngue impecável. Cria pôsteres, logos e infográficos com tipografia perfeita.",
    strengths: [
      "Texto multilíngue (chinês, inglês, símbolos)",
      "Layout e tipografia precisos",
      "Bom em design gráfico e editorial",
      "Suporte a caracteres especiais",
    ],
    bestFor: ["Pôsteres com texto", "Infográficos", "Logos conceituais", "Design editorial"],
    points: 2,
    avgTime: "9s",
    resolution: "1536×1536",
    sample: { poster: IMG_COVER, image: IMG_COVER },
    accent: "pink",
  },
  {
    id: "reve-v1",
    name: "Reve v1",
    provider: "Reve AI",
    version: "1.0",
    type: "image",
    category: "realistic",
    tagline: "Prompts em linguagem natural, sem complicação",
    description:
      "Modelo novo focado em seguir instruções coloquiais. Você escreve como fala e ele entende — sem precisar de prompt engineering.",
    strengths: [
      "Compreende prompts coloquiais",
      "Excelente em fotografia lifestyle",
      "Bom em composição de cena",
      "Estilo 'foto tirada' autêntico",
    ],
    bestFor: ["Lifestyle", "Conteúdo UGC", "Posts pra Instagram", "Mockups casuais"],
    points: 1,
    avgTime: "6s",
    resolution: "1024×1024",
    badge: "Novo",
    sample: { poster: IMG_EDIT, image: IMG_EDIT },
    accent: "green",
  },
  {
    id: "ghibli-ai",
    name: "Ghibli AI",
    provider: "LISBOA",
    version: "Studio",
    type: "image",
    category: "anime",
    tagline: "Estúdio Ghibli em um único prompt",
    description:
      "Modelo fine-tuned da LISBOA treinado em estética de anime clássico. Transforma selfies em retratos estilo Ghibli, Shoujo, Cyberpunk ou Shounen.",
    strengths: [
      "Estilos: Ghibli, Shoujo, Shounen, Cyberpunk",
      "Preserva identidade da pessoa",
      "Traços de pintura aquarela",
      "Mantém expressões faciais",
    ],
    bestFor: ["Avatares de perfil", "Presentes personalizados", "Merch", "Fan art"],
    points: 3,
    avgTime: "10s",
    resolution: "1536×1536",
    badge: "Top",
    sample: { poster: IMG_ANIME, image: IMG_ANIME },
    accent: "pink",
  },
];

// ───── VIDEO MODELS ─────

export const VIDEO_MODELS: AIModel[] = [
  {
    id: "seedance-2",
    name: "Seedance 2.0",
    provider: "ByteDance",
    version: "2.0 Pro",
    type: "video",
    category: "flagship",
    tagline: "O melhor modelo de imagem-para-vídeo da atualidade",
    description:
      "Modelo chinês que virou referência em i2v (image-to-video). Movimento de câmera cinematográfico, física realista, expressões faciais naturais.",
    strengths: [
      "Movimento de câmera cinematográfico",
      "Física e dinâmicas realistas",
      "Expressões faciais naturais",
      "Suporta imagem ou texto como entrada",
    ],
    bestFor: ["Anúncios", "Capas animadas", "Reels", "Trailers curtos"],
    points: 35,
    avgTime: "1min30",
    resolution: "1080p",
    duration: "até 10s",
    badge: "Top",
    sample: { poster: IMG_WAN, video: VID_BBB_720, image: IMG_WAN },
    accent: "cyan",
  },
  {
    id: "wan-2-7",
    name: "WAN 2.7",
    provider: "Alibaba",
    version: "2.7",
    type: "video",
    category: "flagship",
    tagline: "Imagem para vídeo com coerência temporal absurda",
    description:
      "Modelo open-weight do Alibaba com consistência temporal líder. Personagens não 'derretem' entre frames, objetos mantêm identidade ao longo do vídeo.",
    strengths: [
      "Coerência temporal líder do mercado",
      "Mantém identidade de personagens",
      "Bom em cenas complexas com múltiplos objetos",
      "Suporta até 15s de duração",
    ],
    bestFor: ["Narrativas", "Vinhetas", "Animações com personagens", "Cenas longas"],
    points: 35,
    avgTime: "2min",
    resolution: "1080p",
    duration: "até 15s",
    sample: { poster: IMG_WAN, video: VID_SINTEL_360, image: IMG_WAN },
    accent: "purple",
  },
  {
    id: "veo-3-1",
    name: "Veo 3.1",
    provider: "Google DeepMind",
    version: "3.1",
    type: "video",
    category: "flagship",
    tagline: "Qualidade de cinema, direto do Google",
    description:
      "Modelo generativo de vídeo do Google DeepMind. 4K nativo, compreensão física avançada, câmera virtual profissional.",
    strengths: [
      "Resolução até 4K",
      "Compreensão de física avançada",
      "Movimentos de câmera profissionais",
      "Excelente em paisagens e natureza",
    ],
    bestFor: ["Paisagens", "Vinhetas de marca", "Trailers", "Vídeos editoriais"],
    points: 50,
    avgTime: "3min",
    resolution: "4K",
    duration: "até 8s",
    badge: "Novo",
    sample: { poster: IMG_HERO, video: VID_JELLY_720, image: IMG_HERO },
    accent: "green",
  },
  {
    id: "kling-3-0",
    name: "Kling 3.0",
    provider: "Kuaishou",
    version: "3.0",
    type: "video",
    category: "fast",
    tagline: "Velocidade brutal, qualidade premium",
    description:
      "Modelo chinês focado em velocidade. Entrega vídeos em segundos sem perder a qualidade de movimento. Ideal pra testar ideias rápido.",
    strengths: [
      "Latência sub-30s",
      "Ótimo pra prototipagem",
      "Bom em motion graphics",
      "Suporta edição por prompt",
    ],
    bestFor: ["Testes rápidos", "Motion graphics", "Vinhetas curtas", "Prototipagem"],
    points: 25,
    avgTime: "30s",
    resolution: "1080p",
    duration: "até 5s",
    sample: { poster: IMG_KLING, video: VID_PIXEL, image: IMG_KLING },
    accent: "amber",
  },
  {
    id: "sora-2",
    name: "Sora 2",
    provider: "OpenAI",
    version: "2.0",
    type: "video",
    category: "flagship",
    tagline: "O modelo que definiu a categoria",
    description:
      "Sucessor do Sora original. Compreensão semântica de mundo, simulação física, narrativa complexa. O mais aguardado da categoria.",
    strengths: [
      "Compreensão de mundo e física",
      "Narrativas complexas",
      "Câmera virtual profissional",
      "Consistência em cenas longas",
    ],
    bestFor: ["Storytelling", "Trailers", "Demonstrações de produto", "Publicidade"],
    points: 50,
    avgTime: "3min",
    resolution: "1080p",
    duration: "até 10s",
    badge: "Preview",
    sample: { poster: IMG_KLING, video: VID_BBB_360, image: IMG_KLING },
    accent: "blue",
  },
  {
    id: "pika-2-2",
    name: "Pika 2.2",
    provider: "Pika Labs",
    version: "2.2",
    type: "video",
    category: "artistic",
    tagline: "Edição e transformação de vídeo por prompt",
    description:
      "Especialista em editar e transformar vídeos existentes. Troba cenários, adiciona elementos, muda estilo — tudo por prompt.",
    strengths: [
      "Edição de vídeo por prompt",
      "Adiciona/remove elementos",
      "Muda estilo do vídeo",
      "Funciona em clipes curtos",
    ],
    bestFor: ["VFX simples", "Troca de cenário", "Restyling", "Adição de elementos"],
    points: 30,
    avgTime: "1min",
    resolution: "1080p",
    duration: "até 5s",
    sample: { poster: IMG_AVATAR, video: VID_SINTEL_360_2, image: IMG_AVATAR },
    accent: "pink",
  },
  {
    id: "hailuo-2",
    name: "Hailuo 2",
    provider: "MiniMax",
    version: "2.0",
    type: "video",
    category: "fast",
    tagline: "O novo queridinho, rápido e criativo",
    description:
      "Modelo chinês de nova geração com foco em criatividade. Entrega vídeos surpreeendentes em segundos, com bom humor visual.",
    strengths: [
      "Latência baixa",
      "Bom em cenas criativas e surpreeendentes",
      "Suporta texto e imagem",
      "Custo baixo",
    ],
    bestFor: ["Vinhetas pra redes", "Conteúdo viral", "Memes", "Humor visual"],
    points: 20,
    avgTime: "20s",
    resolution: "1080p",
    duration: "até 6s",
    badge: "Novo",
    sample: { poster: IMG_HERO, video: VID_JELLY_360, image: IMG_HERO },
    accent: "red",
  },
  {
    id: "lipsync-elevenlabs",
    name: "ElevenLabs LipSync",
    provider: "ElevenLabs",
    version: "v2",
    type: "video",
    category: "utility",
    tagline: "Lip-sync perfeito em qualquer rosto",
    description:
      "Sincronização labial de altíssima fidelidade. Cole um áudio e uma foto — o modelo gera um vídeo com o rosto falando perfeitamente sincronizado.",
    strengths: [
      "Lip-sync realista",
      "Suporta múltiplos idiomas",
      "Funciona com qualquer foto frontal",
      "Áudio até 5min",
    ],
    bestFor: ["Avatares falantes", "Dublagem", "Narração", "Cursos online"],
    points: 25,
    avgTime: "45s",
    resolution: "1080p",
    duration: "até 5min",
    sample: { poster: IMG_AVATAR, video: VID_BBB_720, image: IMG_AVATAR },
    accent: "purple",
  },
];

export const ALL_MODELS: AIModel[] = [...IMAGE_MODELS, ...VIDEO_MODELS];

// ───── GROUPED COMPARISONS ─────

export const VIDEO_COMPARISON = {
  title: "Comparativo de modelos de vídeo",
  subtitle: "Qual modelo usar pra cada caso?",
  columns: ["Modelo", "Velocidade", "Qualidade", "Duração", "Preço"],
  rows: [
    { model: "Seedance 2.0", speed: "1min30", quality: "★★★★★", duration: "10s", price: "35 pts", best: true },
    { model: "WAN 2.7", speed: "2min", quality: "★★★★★", duration: "15s", price: "35 pts" },
    { model: "Veo 3.1", speed: "3min", quality: "★★★★★", duration: "8s", price: "50 pts", badge: "4K" },
    { model: "Kling 3.0", speed: "30s", quality: "★★★★", duration: "5s", price: "25 pts", best: true, note: "Mais rápido" },
    { model: "Sora 2", speed: "3min", quality: "★★★★★", duration: "10s", price: "50 pts", badge: "Preview" },
    { model: "Hailuo 2", speed: "20s", quality: "★★★★", duration: "6s", price: "20 pts", best: true, note: "Melhor custo" },
  ],
};

export const IMAGE_COMPARISON = {
  title: "Comparativo de modelos de imagem",
  subtitle: "Escolha o modelo certo pra cada projeto",
  columns: ["Modelo", "Velocidade", "Qualidade", "Resolução", "Preço"],
  rows: [
    { model: "GPT Image 2", speed: "8s", quality: "★★★★★", resolution: "2048×2048", price: "2 pts", best: true },
    { model: "Nano Banana 2", speed: "4s", quality: "★★★★★", resolution: "1536×1536", price: "1 pt", best: true, note: "Mais rápido" },
    { model: "Flux 2 Klein", speed: "5s", quality: "★★★★", resolution: "1024×1024", price: "1 pt", note: "Mais barato" },
    { model: "Imagen 4 Ultra", speed: "12s", quality: "★★★★★", resolution: "2048×2048", price: "3 pts" },
    { model: "Ghibli AI", speed: "10s", quality: "★★★★★", resolution: "1536×1536", price: "3 pts", badge: "Anime" },
    { model: "Qwen Image", speed: "9s", quality: "★★★★", resolution: "1536×1536", price: "2 pts", note: "Texto perfeito" },
  ],
};
