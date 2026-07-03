"use client";

import { useState } from "react";
import { useAuth } from "@/lib/contexts/AuthContext";
import { useAiMutation } from "@/lib/trpc/client";
import { Card, Button, Spinner } from "@/components/ui/barrel";
import { ToolHero, ExamplesGallery } from "@/components/ui/barrel";
import { motion } from "framer-motion";
import { ImagePlus, Scan, Languages } from "lucide-react";
import { saveProject } from "@/lib/save-project";
import { toast } from "sonner";
import { MODEL_IMAGES } from "@/constants/samples";

export default function GalleryAiPage() {
  const { points } = useAuth();
  const analyzeMutation = useAiMutation();
  const [uploadedImage, setUploadedImage] = useState<string | null>(null);
  const [analysis, setAnalysis] = useState<string | null>(null);
  const [mode, setMode] = useState<"analyze" | "translate">("analyze");

  const handleUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = (ev) => setUploadedImage(ev.target?.result as string);
    reader.readAsDataURL(file);
  };

  const handleAnalyze = async () => {
    if (!uploadedImage) return;
    try {
      const result = await analyzeMutation.mutateAsync({
        action: mode === "analyze" ? "gallery.analyzeImage" : "image.generate",
        input: {
          images: [uploadedImage],
          prompt: mode === "translate" ? "traduzir texto da imagem para português mantendo o design original" : "analise esta imagem em detalhes",
        },
      });
      const text = result.text || "Imagem processada!";
      setAnalysis(text);
      saveProject({
        type: "analysis",
        title: mode === "analyze" ? "Análise de imagem" : "Imagem traduzida",
        description: text.slice(0, 80),
        imageUrl: result.imageUrl || uploadedImage || undefined,
        route: "/dashboard/gallery-ai",
        status: "ready",
      });
    } catch (err: any) {
      toast.error(err?.message || "Erro ao processar");
    }
  };

  return (
    <div className="px-4 pt-4 pb-32 max-w-3xl mx-auto">
      <ToolHero
        video={{ url: "https://test-videos.co.uk/vids/sintel/mp4/h264/360/Sintel_360_10s_1MB.mp4", poster: "https://static.wavespeed.ai/media/images/1782298162338517347_OnxHR09i.webp" }}
        badge="MOLMO 2 · VISION AI"
        title="Galeria IA"
        subtitle="Visão computacional avançada pra suas imagens"
        description="Faça upload de uma imagem e a IA analisa, descreve, traduz ou responde perguntas sobre ela. Perfeito pra organizar acervo, entender gráficos e traduzir textos em fotos."
        cost={1}
        icon={Scan}
        color="cyan"
        features={["Análise detalhada", "Tradução visual", "OCR inteligente", "Perguntas sobre imagem"]}
      />

      <div className="mt-6 flex gap-2">
        <button onClick={() => setMode("analyze")} className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-bold transition-all ${mode === "analyze" ? "bg-cyan text-[#050714]" : "bg-panel border border-white/10 text-muted"}`}>
          <Scan size={14} /> Analisar
        </button>
        <button onClick={() => setMode("translate")} className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-bold transition-all ${mode === "translate" ? "bg-purple text-white" : "bg-panel border border-white/10 text-muted"}`}>
          <Languages size={14} /> Traduzir
        </button>
      </div>

      <Card className="mt-4" glow="cyan">
        {uploadedImage ? (
          <div className="relative mb-4">
            <img src={uploadedImage} alt="Upload" className="w-full rounded-2xl" />
            <button onClick={() => setUploadedImage(null)} className="absolute top-2 right-2 w-8 h-8 rounded-full bg-black/60 text-white flex items-center justify-center text-xs">×</button>
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

        <Button className="w-full" onClick={handleAnalyze} loading={analyzeMutation.isPending} disabled={!uploadedImage} leftIcon={mode === "analyze" ? <Scan size={16} /> : <Languages size={16} />}>
          {mode === "analyze" ? "Analisar" : "Traduzir"}
        </Button>
      </Card>

      {analyzeMutation.isPending && (
        <Card className="mt-4 p-6 text-center" glow="purple">
          <Spinner className="mx-auto mb-2" />
          <p className="text-sm text-muted">{mode === "analyze" ? "Analisando..." : "Traduzindo..."}</p>
        </Card>
      )}

      {analysis && (
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="mt-4">
          <Card className="p-4">
            <p className="text-sm whitespace-pre-wrap">{analysis}</p>
          </Card>
        </motion.div>
      )}

      <div className="mt-8">
        <ExamplesGallery
          title="O que a IA pode analisar"
          columns={3}
          items={MODEL_IMAGES.slice(0, 6).map((m) => ({ url: m.url, label: m.label }))}
        />
      </div>
    </div>
  );
}
