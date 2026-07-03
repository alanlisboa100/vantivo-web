"use client";

import { useState } from "react";
import { useImageGenerationMutation } from "@/lib/trpc/client";
import { Card, Button, Spinner } from "@/components/ui/barrel";
import { ToolHero, ExamplesGallery } from "@/components/ui/barrel";
import { motion } from "framer-motion";
import { ImagePlus, X, Sparkles } from "lucide-react";
import { saveProject } from "@/lib/save-project";
import { toast } from "sonner";
import { TOOL_VIDEOS, MODEL_IMAGES } from "@/constants/samples";
import { Palette } from "lucide-react";

const ANIME_STYLES = [
  { id: "shoujo", name: "Shojo", icon: "🌸", desc: "Feminino e romântico" },
  { id: "shonen", name: "Shonen", icon: "⚡", desc: "Energético e dinâmico" },
  { id: "ghibli", name: "Ghibli", icon: "🍃", desc: "Estilo Studio Ghibli" },
  { id: "cyberpunk", name: "Cyberpunk", icon: "🤖", desc: "Futurista neon" },
];

export default function AnimeStudioPage() {
  const generateMutation = useImageGenerationMutation();
  const [uploadedImage, setUploadedImage] = useState<string | null>(null);
  const [selectedStyle, setSelectedStyle] = useState<string | null>(null);
  const [result, setResult] = useState<string | null>(null);

  const handleUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = (ev) => setUploadedImage(ev.target?.result as string);
    reader.readAsDataURL(file);
  };

  const handleGenerate = async () => {
    if (!uploadedImage || !selectedStyle) return toast.error("Selecione uma foto e um estilo");
    try {
      const result = await generateMutation.mutateAsync({
        action: "anime.generate",
        input: { images: [uploadedImage], style: selectedStyle, prompt: `transform this photo into ${selectedStyle} anime style` },
      });
      if (result.imageUrl) {
        setResult(result.imageUrl);
        saveProject({ type: "anime", title: `Anime ${selectedStyle}`, description: `Estilo ${selectedStyle}`, imageUrl: result.imageUrl, route: "/dashboard/anime-studio", status: "ready" });
      }
    } catch (err: any) {
      toast.error(err?.message || "Erro ao gerar");
    }
  };

  return (
    <div className="px-4 pt-4 pb-32 max-w-3xl mx-auto">
      <ToolHero
        video={TOOL_VIDEOS.anime}
        badge="ANIME STUDIO"
        title="Transforme fotos em anime"
        subtitle="4 estilos icônicos · Ghibli, Shoujo, Shonen, Cyberpunk"
        description="Upload da sua foto, escolhe o estilo, clica em gerar. Em segundos você tem uma versão anime de você mesmo com qualidade profissional."
        cost={12}
        icon={Palette}
        color="pink"
        features={["4 estilos icônicos", "Mantém traços do rosto", "4K · pronto pra postar"]}
      />

      <Card className="mt-6" glow="pink">
        {uploadedImage ? (
          <div className="relative mb-4">
            <img src={uploadedImage} alt="Upload" className="w-full rounded-2xl" />
            <button onClick={() => setUploadedImage(null)} className="absolute top-2 right-2 w-8 h-8 rounded-full bg-black/60 text-white flex items-center justify-center">
              <X size={16} />
            </button>
          </div>
        ) : (
          <label className="block mb-4">
            <div className="flex flex-col items-center justify-center h-40 bg-panel border border-dashed border-white/10 rounded-2xl cursor-pointer hover:bg-white/5 transition-colors">
              <ImagePlus size={32} className="text-dim mb-2" />
              <p className="text-sm text-muted">Escolher foto</p>
            </div>
            <input type="file" accept="image/*" className="hidden" onChange={handleUpload} />
          </label>
        )}

        <p className="text-xs font-bold uppercase tracking-wider text-dim mb-3">Estilo</p>
        <div className="grid grid-cols-2 gap-2 mb-4">
          {ANIME_STYLES.map((style) => (
            <button
              key={style.id}
              onClick={() => setSelectedStyle(style.id)}
              className={`p-3 rounded-xl border text-left transition-all ${
                selectedStyle === style.id ? "bg-pink/10 border-pink/30 text-pink" : "bg-panel border-white/10 hover:bg-white/5"
              }`}
            >
              <span className="text-lg block mb-1">{style.icon}</span>
              <p className="text-xs font-bold">{style.name}</p>
              <p className="text-[10px] text-muted">{style.desc}</p>
            </button>
          ))}
        </div>

        <Button className="w-full" onClick={handleGenerate} loading={generateMutation.isPending} disabled={!uploadedImage || !selectedStyle} leftIcon={<Sparkles size={16} />}>
          Gerar Anime
        </Button>
      </Card>

      {generateMutation.isPending && (
        <Card className="mt-4 p-6 text-center" glow="pink">
          <Spinner className="mx-auto mb-2" />
          <p className="text-sm text-muted">Transformando em anime...</p>
        </Card>
      )}

      {result && (
        <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} className="mt-4">
          <Card className="p-4" glow="pink">
            <img src={result} alt="Anime result" className="w-full rounded-2xl mb-3" />
            <Button variant="secondary" className="w-full" onClick={() => {
              const a = document.createElement("a");
              a.href = result;
              a.download = "vantivo-anime.png";
              a.click();
            }}>Salvar</Button>
          </Card>
        </motion.div>
      )}

      <div className="mt-8">
        <ExamplesGallery
          title="Exemplos de transformações"
          columns={3}
          items={MODEL_IMAGES.filter(m => m.cat === "anime" || m.cat === "image").slice(0, 6).map((m) => ({ url: m.url, label: m.label }))}
        />
      </div>
    </div>
  );
}
