"use client";

import { useState } from "react";
import { useAuth } from "@/lib/contexts/AuthContext";
import { useImageGenerationMutation } from "@/lib/trpc/client";
import { Card, Button, Input, Spinner } from "@/components/ui/barrel";
import { ToolHero, ExamplesGallery } from "@/components/ui/barrel";
import { motion } from "framer-motion";
import { ImagePlus, X, Camera } from "lucide-react";
import { saveProject } from "@/lib/save-project";
import { toast } from "sonner";
import { TOOL_VIDEOS, MODEL_IMAGES } from "@/constants/samples";

const QUICK_TOOLS = [
  { key: "enhance", label: "✨ Melhorar" },
  { key: "body", label: "🪞 Corpo" },
  { key: "tryon", label: "👗 Roupa" },
  { key: "headshot", label: "📸 Headshot" },
  { key: "camera", label: "🎬 Câmera" },
  { key: "product", label: "📦 Produto" },
];

export default function PhotoEditorPage() {
  const { points } = useAuth();
  const generateMutation = useImageGenerationMutation();
  const [uploadedImage, setUploadedImage] = useState<string | null>(null);
  const [prompt, setPrompt] = useState("");
  const [result, setResult] = useState<string | null>(null);

  const handleUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = (ev) => setUploadedImage(ev.target?.result as string);
    reader.readAsDataURL(file);
  };

  const handleEdit = async (mode: string) => {
    if (!uploadedImage) return toast.error("Adicione uma foto primeiro");
    try {
      const result = await generateMutation.mutateAsync({
        action: "image.generate",
        input: { images: [uploadedImage], prompt: prompt || `aplicar edição: ${mode}`, engine: mode },
      });
      if (result.imageUrl) {
        setResult(result.imageUrl);
        saveProject({ type: "photo", title: prompt ? `Edição: ${prompt.slice(0, 60)}` : "Foto editada", description: `Edição aplicada: ${mode}`, imageUrl: result.imageUrl });
      }
    } catch (err: any) {
      toast.error(err?.message || "Erro ao processar");
    }
  };

  return (
    <div className="px-4 pt-4 pb-32 max-w-3xl mx-auto">
      <ToolHero
        video={TOOL_VIDEOS.edit}
        badge="QWEN IMAGE · FLUX KONTEXT"
        title="Editor de Fotos IA"
        subtitle="Melhorar, corpo, roupa, ângulo, fundo — tudo com prompt"
        description="Editor de fotos completo com IA. Melhoria automática, edição de corpo, provador virtual, mudança de ângulo, troca de fundo. Tudo natural, sem Photoshop."
        cost={3}
        icon={Camera}
        color="cyan"
        features={["Melhoria com 1 clique", "Editar corpo", "Provar roupa virtual", "Trocar ângulo de câmera", "Remover objeto", "Upscale 4K"]}
      />

      <Card className="mt-6" glow="cyan">
        {uploadedImage ? (
          <div className="relative mb-4">
            <img src={uploadedImage} alt="Upload" className="w-full rounded-2xl" />
            <button onClick={() => setUploadedImage(null)} className="absolute top-2 right-2 w-8 h-8 rounded-full bg-black/60 text-white flex items-center justify-center">
              <X size={16} />
            </button>
          </div>
        ) : (
          <label className="block">
            <div className="flex flex-col items-center justify-center h-40 bg-panel border border-dashed border-white/10 rounded-2xl cursor-pointer hover:bg-white/5 transition-colors">
              <ImagePlus size={32} className="text-dim mb-2" />
              <p className="text-sm text-muted">Adicionar foto</p>
            </div>
            <input type="file" accept="image/*" className="hidden" onChange={handleUpload} />
          </label>
        )}

        <Input
          label="O que você quer fazer?"
          value={prompt}
          onChange={(e) => setPrompt(e.target.value)}
          placeholder="Ex: melhorar iluminação, fundo mais claro..."
        />

        <div className="flex flex-wrap gap-2 mt-3">
          {QUICK_TOOLS.map((tool) => (
            <button
              key={tool.key}
              onClick={() => handleEdit(tool.key)}
              disabled={!uploadedImage || generateMutation.isPending}
              className="text-xs font-semibold bg-panel border border-white/10 rounded-xl px-3 py-2 hover:bg-white/5 transition-colors disabled:opacity-50"
            >
              {tool.label}
            </button>
          ))}
        </div>
      </Card>

      {generateMutation.isPending && (
        <Card className="mt-4 p-6 text-center" glow="purple">
          <Spinner className="mx-auto mb-2" />
          <p className="text-sm text-muted">Processando...</p>
        </Card>
      )}

      {result && (
        <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} className="mt-4">
          <Card className="p-4" glow="cyan">
            <img src={result} alt="Result" className="w-full rounded-2xl mb-3" />
            <Button variant="secondary" className="w-full" onClick={() => { const a = document.createElement("a"); a.href = result; a.download = "vantivo-edit.png"; a.click(); }}>Salvar</Button>
          </Card>
        </motion.div>
      )}

      <div className="mt-8">
        <ExamplesGallery
          title="Veja o que dá pra fazer"
          columns={3}
          items={MODEL_IMAGES.slice(0, 6).map((m) => ({ url: m.url, label: m.label }))}
        />
      </div>
    </div>
  );
}
