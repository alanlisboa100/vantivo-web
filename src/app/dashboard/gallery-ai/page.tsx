"use client";

import { useState } from "react";
import { useI18n } from "@/lib/contexts/I18nContext";
import { useAuth } from "@/lib/contexts/AuthContext";
import { useAiMutation } from "@/lib/trpc/client";
import { NeonBackdrop, PremiumBadge } from "@/components/brand";
import { Card, Button, Spinner, Badge } from "@/components/ui";
import { motion } from "framer-motion";
import { ImagePlus, Sparkles, Scan, Languages } from "lucide-react";
import { saveProject } from "@/lib/save-project";
import { toast } from "sonner";

export default function GalleryAiPage() {
  const { t } = useI18n();
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
      });
    } catch (err: any) {
      toast.error(err?.message || "Erro ao processar");
    }
  };

  return (
    <div className="relative min-h-screen">
      <NeonBackdrop />
      <div className="relative z-10 px-4 pt-4 pb-32">
        <div className="mb-6">
          <PremiumBadge className="mb-2">IA VISUAL</PremiumBadge>
          <h1 className="text-3xl font-black">Galeria IA</h1>
          <p className="text-sm text-muted mt-1">Analise imagens com visão computacional.</p>
        </div>

        <div className="flex gap-2 mb-4">
          <button
            onClick={() => setMode("analyze")}
            className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-bold transition-all ${
              mode === "analyze"
                ? "bg-cyan text-[#050714]"
                : "bg-panel border border-white/10 text-muted"
            }`}
          >
            <Scan size={14} />
            Analisar
          </button>
          <button
            onClick={() => setMode("translate")}
            className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-bold transition-all ${
              mode === "translate"
                ? "bg-purple text-white"
                : "bg-panel border border-white/10 text-muted"
            }`}
          >
            <Languages size={14} />
            Traduzir
          </button>
        </div>

        <Card className="mb-4" glow="cyan">
          {uploadedImage ? (
            <div className="relative mb-4">
              <img src={uploadedImage} alt="Upload" className="w-full rounded-2xl" />
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

          <Button
            className="w-full"
            onClick={handleAnalyze}
            loading={analyzeMutation.isPending}
            disabled={!uploadedImage}
          >
            {mode === "analyze" ? <Scan size={16} /> : <Languages size={16} />}
            {mode === "analyze" ? "Analisar" : "Traduzir"}
          </Button>
        </Card>

        {analyzeMutation.isPending && (
          <Card className="p-6 text-center" glow="purple">
            <Spinner className="mx-auto mb-2" />
            <p className="text-sm text-muted">{mode === "analyze" ? "Analisando..." : "Traduzindo..."}</p>
          </Card>
        )}

        {analysis && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <Card className="p-4" glow="none">
              <p className="text-sm whitespace-pre-wrap">{analysis}</p>
            </Card>
          </motion.div>
        )}
      </div>
    </div>
  );
}
