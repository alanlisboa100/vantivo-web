"use client";

import { useState } from "react";
import { useI18n } from "@/lib/contexts/I18nContext";
import { useAuth } from "@/lib/contexts/AuthContext";
import { useImageGenerationMutation } from "@/lib/trpc/client";
import { NeonBackdrop, PremiumBadge } from "@/components/brand";
import { Card, Button, Spinner, Badge } from "@/components/ui";
import { motion } from "framer-motion";
import { ImagePlus, Sparkles, Video, X } from "lucide-react";
import { saveProject } from "@/lib/save-project";
import { toast } from "sonner";

export default function AvatarAnimatorPage() {
  const { t } = useI18n();
  const { points } = useAuth();
  const generateMutation = useImageGenerationMutation();
  const [uploadedImage, setUploadedImage] = useState<string | null>(null);
  const [result, setResult] = useState<string | null>(null);

  const handleUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = (ev) => setUploadedImage(ev.target?.result as string);
    reader.readAsDataURL(file);
  };

  const handleAnimate = async () => {
    if (!uploadedImage) return;
    try {
      const result = await generateMutation.mutateAsync({
        action: "avatar.animate",
        input: {
          images: [uploadedImage],
          prompt: "animate this photo with natural movement",
        },
      });
      if (result.imageUrl) {
        setResult(result.imageUrl);
        saveProject({
          type: "avatar",
          title: "Avatar Animado",
          description: "Animação de avatar com IA",
          imageUrl: result.imageUrl,
        });
      }
    } catch (err: any) {
      toast.error(err?.message || "Erro ao animar");
    }
  };

  return (
    <div className="relative min-h-screen">
      <NeonBackdrop />
      <div className="relative z-10 px-4 pt-4 pb-32">
        <div className="mb-6">
          <PremiumBadge className="mb-2">ANIMAÇÃO</PremiumBadge>
          <h1 className="text-3xl font-black">Avatar Animado</h1>
          <p className="text-sm text-muted mt-1">Transforme fotos em vídeos animados com IA.</p>
        </div>

        <Card className="mb-4" glow="green">
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
            <label className="block mb-4">
              <div className="flex flex-col items-center justify-center h-40 bg-panel border border-dashed border-white/10 rounded-2xl cursor-pointer hover:bg-white/5 transition-colors">
                <ImagePlus size={32} className="text-dim mb-2" />
                <p className="text-sm text-muted">Escolher foto</p>
              </div>
              <input type="file" accept="image/*" className="hidden" onChange={handleUpload} />
            </label>
          )}

          <div className="flex items-center justify-between mb-3">
            <Badge color="green">35 pts</Badge>
            <p className="text-xs text-muted">SCAIL-2 Animation</p>
          </div>

          <Button
            className="w-full"
            onClick={handleAnimate}
            loading={generateMutation.isPending}
            disabled={!uploadedImage}
          >
            <Video size={16} />
            Animar Avatar
          </Button>
        </Card>

        {generateMutation.isPending && (
          <Card className="p-6 text-center" glow="green">
            <Spinner className="mx-auto mb-2" />
            <p className="text-sm text-muted">Criando animação...</p>
          </Card>
        )}

        {result && (
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
          >
            <Card className="p-4" glow="green">
              <img src={result} alt="Animation result" className="w-full rounded-2xl mb-3" />
              <Button
                variant="secondary"
                className="w-full"
                onClick={() => {
                  const a = document.createElement("a");
                  a.href = result;
                  a.download = "vantivo-avatar-animated.png";
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
