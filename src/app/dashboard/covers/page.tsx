"use client";

import { useState } from "react";
import { useAuth } from "@/lib/contexts/AuthContext";
import { useImageGenerationMutation } from "@/lib/trpc/client";
import { Card, Button, Input, Spinner } from "@/components/ui/barrel";
import { ToolHero, ExamplesGallery } from "@/components/ui/barrel";
import { motion } from "framer-motion";
import { ImagePlus, X, Sparkles } from "lucide-react";
import { saveProject } from "@/lib/save-project";
import { toast } from "sonner";
import { MODEL_IMAGES } from "@/constants/samples";
import { ImageIcon } from "lucide-react";

export default function StudioCoversPage() {
  const { points } = useAuth();
  const generateMutation = useImageGenerationMutation();
  const [prompt, setPrompt] = useState("");
  const [imageUrl, setImageUrl] = useState<string | null>(null);
  const [uploadedImage, setUploadedImage] = useState<string | null>(null);

  const handleGenerate = async () => {
    if (!prompt && !uploadedImage) return;
    try {
      const result = await generateMutation.mutateAsync({
        action: "image.generate",
        input: { prompt: prompt || "criativo design digital moderno", images: uploadedImage ? [uploadedImage] : undefined, engine: "cover" },
      });
      if (result.imageUrl) {
        setImageUrl(result.imageUrl);
        saveProject({ type: "image", title: prompt ? `Capa: ${prompt.slice(0, 60)}` : "Capa criada", description: "Capa ou anúncio gerado com IA", imageUrl: result.imageUrl });
      }
      if (result.text) toast.success(result.text);
    } catch (err: any) {
      toast.error(err?.message || "Erro ao gerar");
    }
  };

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = (ev) => setUploadedImage(ev.target?.result as string);
    reader.readAsDataURL(file);
  };

  return (
    <div className="px-4 pt-4 pb-32 max-w-3xl mx-auto">
      <ToolHero
        video={{ url: "https://test-videos.co.uk/vids/jellyfish/mp4/h264/720/Jellyfish_720_10s_1MB.mp4", poster: "https://static.wavespeed.ai/media/images/1773982488677021111_Z5wmwFPZ.webp" }}
        badge="CAPAS & ANÚNCIOS"
        title="Capas Profissionais"
        subtitle="YouTube, Instagram, TikTok — pronto pra postar"
        description="Crie capas e anúncios profissionais com a IA. Layouts otimizados pra cada plataforma, com texto, cores e estilo que vendem."
        cost={12}
        icon={ImageIcon}
        color="purple"
        features={["YouTube · Instagram · TikTok", "Texto automático", "Cores que vendem", "4K · pronto pra postar"]}
      />

      <Card className="mt-6" glow="cyan">
        <div className="flex flex-col gap-4">
          <Input
            label="Descreva sua ideia"
            value={prompt}
            onChange={(e) => setPrompt(e.target.value)}
            placeholder="Ex: capa para YouTube tech futurista roxo e ciano..."
          />

          {uploadedImage && (
            <div className="relative w-32 h-32">
              <img src={uploadedImage} alt="Upload" className="w-full h-full object-cover rounded-xl" />
              <button onClick={() => setUploadedImage(null)} className="absolute -top-2 -right-2 w-6 h-6 rounded-full bg-red/80 text-white flex items-center justify-center">
                <X size={12} />
              </button>
            </div>
          )}

          <div className="flex gap-2">
            <label className="flex-1">
              <div className="flex items-center justify-center gap-2 bg-panel border border-white/10 rounded-xl px-4 py-3 cursor-pointer hover:bg-white/5 transition-colors">
                <ImagePlus size={16} />
                <span className="text-sm">Adicionar imagem base</span>
              </div>
              <input type="file" accept="image/*" className="hidden" onChange={handleImageUpload} />
            </label>
            <Button onClick={handleGenerate} loading={generateMutation.isPending} className="flex-shrink-0" leftIcon={<Sparkles size={16} />}>Gerar</Button>
          </div>
        </div>
      </Card>

      {generateMutation.isPending && (
        <Card className="mt-4 p-8 text-center" glow="purple">
          <Spinner className="mx-auto mb-3" />
          <p className="text-sm text-muted">Gerando sua imagem...</p>
        </Card>
      )}

      {imageUrl && (
        <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} className="mt-4">
          <Card className="p-4" glow="cyan">
            <img src={imageUrl} alt="Generated" className="w-full rounded-2xl mb-3" />
            <div className="flex gap-2">
              <Button variant="secondary" size="sm" className="flex-1" onClick={() => { const a = document.createElement("a"); a.href = imageUrl; a.download = "vantivo-cover.png"; a.click(); }}>Salvar</Button>
              <Button variant="secondary" size="sm" className="flex-1" onClick={() => navigator.clipboard.writeText(imageUrl)}>Copiar link</Button>
            </div>
          </Card>
        </motion.div>
      )}

      <div className="mt-8">
        <ExamplesGallery
          title="Inspire-se com capas profissionais"
          columns={4}
          items={MODEL_IMAGES.slice(0, 8).map((m) => ({ url: m.url, label: m.label }))}
        />
      </div>
    </div>
  );
}
