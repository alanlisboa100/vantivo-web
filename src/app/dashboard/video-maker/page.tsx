"use client";

import { useState } from "react";
import { useAuth } from "@/lib/contexts/AuthContext";
import { useAiMutation } from "@/lib/trpc/client";
import { saveProject } from "@/lib/save-project";
import { PointsDisplay, PremiumBadge } from "@/components/brand";
import { Button, Card, Spinner } from "@/components/ui/barrel";
import { ToolHero, ExamplesGallery } from "@/components/ui/barrel";
import { motion } from "framer-motion";
import { Video, ImagePlus, X, Download, ChevronLeft, Sparkles } from "lucide-react";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import { SHOWCASE_VIDEOS, MODEL_IMAGES } from "@/constants/samples";

const DURATIONS = [
  { value: 5, label: "5s", points: 15 },
  { value: 8, label: "8s", points: 24 },
  { value: 10, label: "10s", points: 30 },
];

const RESOLUTIONS = [
  { value: "480p", label: "480p" },
  { value: "720p", label: "720p" },
  { value: "1080p", label: "1080p" },
];

export default function VideoMakerPage() {
  const { points } = useAuth();
  const router = useRouter();
  const mutation = useAiMutation();
  const [prompt, setPrompt] = useState("");
  const [image, setImage] = useState<string | null>(null);
  const [duration, setDuration] = useState(5);
  const [resolution, setResolution] = useState("720p");
  const [result, setResult] = useState<string | null>(null);

  const selectedDuration = DURATIONS.find((d) => d.value === duration);
  const currentPoints = selectedDuration?.points || 15;

  const handleUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = (ev) => setImage(ev.target?.result as string);
    reader.readAsDataURL(file);
  };

  const handleGenerate = async () => {
    if (!prompt.trim() && !image) {
      toast.error("Descreva a cena ou envie uma imagem");
      return;
    }

    try {
      const inputPayload: Record<string, unknown> = {
        prompt: prompt || "Cena cinematográfica",
        duration,
        resolution,
      };
      if (image) inputPayload.images = [image];

      const res = await mutation.mutateAsync({
        action: "video.generate",
        input: inputPayload,
      });

      if (res.imageUrl) {
        setResult(res.imageUrl);
        saveProject({
          type: "video",
          title: prompt ? prompt.slice(0, 60) : "Vídeo IA",
          description: `${duration}s · ${resolution} · Seedance 2.0`,
          imageUrl: res.imageUrl,
          route: "/dashboard/video-maker",
          status: "ready",
          payload: { duration, resolution, prompt },
        });
      }
      if (res.text) toast.success(res.text);
    } catch (err: any) {
      toast.error(err?.message || "Erro ao gerar vídeo");
    }
  };

  return (
    <div className="px-4 pt-4 pb-32 max-w-3xl mx-auto">
      <ToolHero
        video={SHOWCASE_VIDEOS[0]}
        badge="SEEDANCE 2.0 · WAN 2.7"
        title="Vídeo IA"
        subtitle="Texto ou imagem → vídeo cinematográfico em segundos"
        description="Os melhores modelos de vídeo do mundo numa só ferramenta. Seedance 2.0, WAN 2.7, Veo 3.1, Kling 3.0 e Sora 2."
        cost={currentPoints}
        icon={Video}
        color="cyan"
        features={["1080p · até 10s", "Movimento de câmera", "Áudio sincronizado", "I2V + T2V"]}
      />

      <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }}>
        <Card glow="cyan" hover={false} className="p-5 mt-6">
          <div className="flex items-center gap-3 mb-4">
            <button onClick={() => router.push("/dashboard/studio")} className="w-8 h-8 rounded-xl bg-white/5 flex items-center justify-center hover:bg-white/10 transition-colors">
              <ChevronLeft size={18} />
            </button>
            <PremiumBadge variant="purple">SEEDANCE 2.0</PremiumBadge>
            <div className="ml-auto">
              <PointsDisplay points={points} />
            </div>
          </div>

          {/* Image upload (optional - for I2V) */}
          <div className="mb-4">
            {image ? (
              <div className="relative w-full">
                <img src={image} alt="" className="w-full h-40 object-cover rounded-2xl border border-white/10" />
                <button onClick={() => setImage(null)} className="absolute top-2 right-2 w-7 h-7 rounded-full bg-black/60 text-white flex items-center justify-center">
                  <X size={14} />
                </button>
                <div className="absolute bottom-2 left-2">
                  <span className="text-[10px] bg-cyan/20 text-cyan px-2 py-0.5 rounded-full">Imagem → Vídeo</span>
                </div>
              </div>
            ) : (
              <label className="block">
                <div className="flex flex-col items-center justify-center h-28 bg-panel border border-dashed border-white/10 rounded-2xl cursor-pointer hover:bg-white/5 transition-colors">
                  <ImagePlus size={24} className="text-dim mb-1" />
                  <p className="text-xs text-muted">Imagem de referência (opcional)</p>
                </div>
                <input type="file" accept="image/*" className="hidden" onChange={handleUpload} />
              </label>
            )}
          </div>

          {/* Duration selector */}
          <div className="mb-3">
            <p className="text-xs font-bold text-muted mb-2">Duração</p>
            <div className="flex gap-2">
              {DURATIONS.map((d) => (
                <button
                  key={d.value}
                  onClick={() => setDuration(d.value)}
                  className={`flex-1 py-2.5 rounded-xl text-sm font-bold border transition-all ${
                    duration === d.value
                      ? "bg-cyan/15 border-cyan/40 text-cyan"
                      : "bg-panel border-white/5 text-muted hover:border-white/10"
                  }`}
                >
                  {d.label}
                  <span className="block text-[10px] font-normal opacity-60">{d.points} pts</span>
                </button>
              ))}
            </div>
          </div>

          {/* Resolution selector */}
          <div className="mb-4">
            <p className="text-xs font-bold text-muted mb-2">Resolução</p>
            <div className="flex gap-2">
              {RESOLUTIONS.map((r) => (
                <button
                  key={r.value}
                  onClick={() => setResolution(r.value)}
                  className={`flex-1 py-2 rounded-xl text-xs font-bold border transition-all ${
                    resolution === r.value
                      ? "bg-purple/15 border-purple/40 text-purple"
                      : "bg-panel border-white/5 text-muted hover:border-white/10"
                  }`}
                >
                  {r.label}
                </button>
              ))}
            </div>
          </div>

          {/* Prompt + Generate */}
          <div className="flex gap-2">
            <input
              value={prompt}
              onChange={(e) => setPrompt(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && handleGenerate()}
              placeholder="Descreva a cena do vídeo..."
              className="flex-1 bg-panel border border-white/10 rounded-xl px-4 py-3 text-sm text-text placeholder:text-dim/50 focus:outline-none focus:border-cyan/40 transition-colors"
            />
            <Button onClick={handleGenerate} loading={mutation.isPending} glow>
              <Sparkles size={16} />
              {currentPoints} pts
            </Button>
          </div>
        </Card>
      </motion.div>

      {/* Loading */}
      {mutation.isPending && (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="mt-4">
          <Card glow="purple" hover={false} className="p-8 text-center">
            <Spinner className="mx-auto mb-3" size="lg" />
            <p className="text-sm text-muted">Gerando vídeo com Seedance 2.0...</p>
            <p className="text-xs text-dim mt-1">Vídeos de {duration}s podem levar até 2 minutos</p>
          </Card>
        </motion.div>
      )}

      {/* Result */}
      {result && (
        <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="mt-4">
          <Card glow="green" hover={false} className="p-5">
            <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-dim mb-3">Vídeo Gerado</p>
            <video src={result} controls className="w-full rounded-2xl mb-3" />
            <Button variant="secondary" className="w-full" onClick={() => {
              const a = document.createElement("a");
              a.href = result;
              a.download = `vantivo-video-${Date.now()}.mp4`;
              a.click();
            }}>
              <Download size={14} />
              Salvar Vídeo
            </Button>
          </Card>
        </motion.div>
      )}

      <div className="mt-8">
        <ExamplesGallery
          title="Inspire-se com vídeos da comunidade"
          columns={3}
          items={SHOWCASE_VIDEOS.slice(0, 6).map((v) => ({ ...v, isVideo: true }))}
        />
      </div>
    </div>
  );
}
