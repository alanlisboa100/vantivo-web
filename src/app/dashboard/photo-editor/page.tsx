"use client";

import { useState } from "react";
import { useI18n } from "@/lib/contexts/I18nContext";
import { useAuth } from "@/lib/contexts/AuthContext";
import { useImageGenerationMutation } from "@/lib/trpc/client";
import { NeonBackdrop, PremiumBadge } from "@/components/brand";
import { Card, Button, Input, Spinner, Badge } from "@/components/ui";
import { motion } from "framer-motion";
import { ImagePlus, Sparkles, X } from "lucide-react";
import { toast } from "sonner";

export default function PhotoEditorPage() {
  const { t } = useI18n();
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
        action: `image.generate`,
        input: {
          images: [uploadedImage],
          prompt: prompt || `aplicar edição: ${mode}`,
          engine: mode,
        },
      });
      if (result.imageUrl) setResult(result.imageUrl);
    } catch (err: any) {
      toast.error(err?.message || "Erro ao processar");
    }
  };

  return (
    <div className="relative min-h-screen">
      <NeonBackdrop />
      <div className="relative z-10 px-4 pt-4 pb-32">
        <div className="mb-6">
          <PremiumBadge className="mb-2">EDITOR IA</PremiumBadge>
          <h1 className="text-3xl font-black">Editor de Fotos</h1>
          <p className="text-sm text-muted mt-1">Envie uma foto, escreva o que deseja mudar ou use um atalho rápido.</p>
        </div>

        <Card className="mb-4" glow="cyan">
          {uploadedImage ? (
            <div className="relative mb-4">
              <img src={uploadedImage} alt="Upload" className="w-full rounded-2xl" />
              <button
                onClick={() => setUploadedImage(null)}
                className="absolute top-2 right-2 w-8 h-8 rounded-full bg-black/60 text-white flex items-center justify-center"
              >
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
            {[
              { key: "enhance", label: "✨ Melhorar" },
              { key: "body", label: "🪞 Corpo" },
              { key: "tryon", label: "👗 Roupa" },
            ].map((tool) => (
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
          <Card className="p-6 text-center" glow="purple">
            <Spinner className="mx-auto mb-2" />
            <p className="text-sm text-muted">Processando...</p>
          </Card>
        )}

        {result && (
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
          >
            <Card className="p-4" glow="cyan">
              <img src={result} alt="Result" className="w-full rounded-2xl mb-3" />
              <Button
                variant="secondary"
                className="w-full"
                onClick={() => {
                  const a = document.createElement("a");
                  a.href = result;
                  a.download = "vantivo-edit.png";
                  a.click();
                }}
              >
                Salvar
              </Button>
            </Card>
          </motion.div>
        )}
      </div>
    </div>
  );
}
