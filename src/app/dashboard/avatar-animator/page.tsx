"use client";

import { useState } from "react";
import { useAuth } from "@/lib/contexts/AuthContext";
import { useImageGenerationMutation } from "@/lib/trpc/client";
import { Card, Button, Spinner, Badge } from "@/components/ui/barrel";
import { ToolHero, ExamplesGallery } from "@/components/ui/barrel";
import { SmartVideo } from "@/components/ui/barrel";
import { motion } from "framer-motion";
import { ImagePlus, X, Wand2 } from "lucide-react";
import { saveProject } from "@/lib/save-project";
import { toast } from "sonner";
import { TOOL_VIDEOS, MODEL_IMAGES } from "@/constants/samples";
import { UserCircle2 } from "lucide-react";

export default function AvatarAnimatorPage() {
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
        input: { images: [uploadedImage], prompt: "animate this photo with natural movement" },
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
    <div className="px-4 pt-4 pb-32 max-w-3xl mx-auto">
      <ToolHero
        video={TOOL_VIDEOS.avatar}
        badge="SCAIL 2.0"
        title="Avatar Animado"
        subtitle="Dê vida às suas fotos com animação facial realista"
        description="Transforme qualquer foto num avatar com movimentos naturais de cabeça, olhos e boca. Perfeito pra vídeos de Instagram, TikTok e YouTube."
        cost={50}
        icon={UserCircle2}
        color="green"
        features={["Movimento facial natural", "Eye tracking", "Lip-sync opcional", "1080p · até 10s"]}
      />

      <Card className="mt-6" glow="green">
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

        <Button className="w-full" onClick={handleAnimate} loading={generateMutation.isPending} disabled={!uploadedImage} leftIcon={<Wand2 size={16} />}>
          Animar Avatar
        </Button>
      </Card>

      {generateMutation.isPending && (
        <Card className="mt-4 p-6 text-center" glow="green">
          <Spinner className="mx-auto mb-2" />
          <p className="text-sm text-muted">Criando animação...</p>
        </Card>
      )}

      {result && (
        <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} className="mt-4">
          <Card className="p-4" glow="green">
            <img src={result} alt="Animation result" className="w-full rounded-2xl mb-3" />
            <Button variant="secondary" className="w-full" onClick={() => {
              const a = document.createElement("a");
              a.href = result;
              a.download = "vantivo-avatar-animated.png";
              a.click();
            }}>Salvar</Button>
          </Card>
        </motion.div>
      )}

      <div className="mt-8">
        <ExamplesGallery
          title="Inspire-se com avatares animados"
          columns={3}
          items={MODEL_IMAGES.slice(0, 6).map((m) => ({ url: m.url, label: m.label }))}
        />
      </div>
    </div>
  );
}
