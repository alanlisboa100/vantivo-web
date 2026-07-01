export const COLORS = {
  bg: "#050714",
  bg2: "#080D1F",
  card: "#10182F",
  text: "#F8FAFC",
  muted: "#A8B3C7",
  dim: "#64748B",
  cyan: "#22D3EE",
  blue: "#355CFF",
  purple: "#A855F7",
  pink: "#EC4899",
  green: "#35D399",
  amber: "#F59E0B",
  red: "#EF4444",
} as const;

export const ACTION_COSTS: Record<string, number> = {
  "chatV2.send": 1,
  "image.generate": 1,
  "cover.generate": 4,
  "ads.generateVisual": 4,
  "anime.generate": 3,
  "avatar.animate": 35,
  "image.multiedit": 3,
  "gallery.upscaleImage": 1,
  "gallery.analyzeImage": 1,
  "image.analyze": 1,
  "photo-editor.body": 3,
  "photo-editor.tryon": 3,
  "photo-editor.influencer": 3,
  "photo-editor.camera": 3,
};

export const PLANS = [
  { id: "free", name: "Free", points: 0, price: 0, highlight: false },
  {
    id: "premium",
    name: "Start",
    points: 120,
    price: 14.9,
    highlight: false,
  },
  {
    id: "quarterly",
    name: "Pro",
    points: 320,
    price: 34.9,
    highlight: true,
  },
  { id: "yearly", name: "Ultra", points: 700, price: 69.9, highlight: false },
] as const;

export const EXTRA_POINT_PACKS = [
  { id: "bonus-50", title: "Bônus 50", points: 50, price: 9.9 },
  { id: "bonus-120", title: "Bônus 120", points: 120, price: 19.9 },
  { id: "bonus-300", title: "Bônus 300", points: 300, price: 39.9 },
] as const;

export const STUDIO_TOOLS = [
  { key: "assistant", icon: "🧠", label: "Assistente", cost: "1 pt", color: "cyan" },
  { key: "enhance", icon: "✨", label: "Melhorar", cost: "3 pts", color: "blue" },
  { key: "body", icon: "🪞", label: "Editar Corpo", cost: "3 pts", color: "amber" },
  { key: "tryon", icon: "👗", label: "Provar Roupa", cost: "3 pts", color: "pink" },
  { key: "headshot", icon: "📸", label: "Headshot", cost: "3 pts", color: "purple" },
  { key: "camera", icon: "🎬", label: "Câmera", cost: "3 pts", color: "green" },
  { key: "product", icon: "📦", label: "Produto", cost: "3 pts", color: "cyan" },
  { key: "cover", icon: "🖼️", label: "Capas", cost: "4 pts", color: "purple" },
  { key: "anime", icon: "🎌", label: "Anime", cost: "3 pts", color: "pink" },
  { key: "avatar", icon: "👤", label: "Avatar Animado", cost: "35 pts", color: "green" },
  { key: "video", icon: "🎥", label: "Vídeo IA", cost: "Em breve", color: "cyan" },
  { key: "faceswap", icon: "🔄", label: "Face Swap", cost: "Em breve", color: "purple" },
  { key: "upscale", icon: "🔍", label: "Upscale", cost: "Em breve", color: "green" },
  { key: "bgremove", icon: "✂️", label: "Remover Fundo", cost: "Em breve", color: "pink" },
  { key: "avatarfalante", icon: "🗣️", label: "Avatar Falante", cost: "Em breve", color: "amber" },
  { key: "music", icon: "🎵", label: "Música IA", cost: "Em breve", color: "blue" },
  { key: "threed", icon: "🧊", label: "3D Model", cost: "Em breve", color: "green" },
  { key: "redeem", icon: "🎁", label: "Resgatar", cost: "Grátis", color: "amber" },
] as const;
