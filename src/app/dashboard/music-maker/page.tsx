"use client";

import { useState } from "react";
import { useAuth } from "@/lib/contexts/AuthContext";
import { useAiMutation } from "@/lib/trpc/client";
import { saveProject } from "@/lib/save-project";
import { PointsDisplay, PremiumBadge } from "@/components/brand";
import { Button, Card, Spinner } from "@/components/ui/barrel";
import { ToolHero, ExamplesGallery } from "@/components/ui/barrel";
import { motion } from "framer-motion";
import { Music, Download, ChevronLeft, Sparkles } from "lucide-react";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import { TOOL_IMAGES, MODEL_IMAGES } from "@/constants/samples";

const DURATIONS = [
  { value: 15, label: "15s", points: 3 },
  { value: 30, label: "30s", points: 5 },
  { value: 60, label: "60s", points: 10 },
];

const STYLES = [
  { value: "pop", label: "Pop" },
  { value: "rock", label: "Rock" },
  { value: "hip-hop", label: "Hip Hop" },
  { value: "electronic", label: "Eletrônica" },
  { value: "lo-fi", label: "Lo-fi" },
  { value: "funk", label: "Funk" },
  { value: "sertanejo", label: "Sertanejo" },
  { value: "classical", label: "Clássica" },
  { value: "jazz", label: "Jazz" },
  { value: "ambient", label: "Ambient" },
];

const TEMPOS = [
  { value: "slow", label: "Lento" },
  { value: "medium", label: "Médio" },
  { value: "fast", label: "Rápido" },
];

export default function MusicMakerPage() {
  const { points } = useAuth();
  const router = useRouter();
  const mutation = useAiMutation();
  const [prompt, setPrompt] = useState("");
  const [duration, setDuration] = useState(30);
  const [style, setStyle] = useState("pop");
  const [tempo, setTempo] = useState("medium");
  const [instrumental, setInstrumental] = useState(false);
  const [result, setResult] = useState<string | null>(null);

  const selectedDuration = DURATIONS.find((d) => d.value === duration);
  const currentPoints = selectedDuration?.points || 5;

  const handleGenerate = async () => {
    if (!prompt.trim()) {
      toast.error("Descreva a música que quer criar");
      return;
    }

    try {
      const res = await mutation.mutateAsync({
        action: "music.generate",
        input: {
          prompt,
          duration,
          style,
          tempo,
          instrumental,
        },
      });

      if (res.imageUrl) {
        setResult(res.imageUrl);
        saveProject({
          type: "music",
          title: prompt.slice(0, 60),
          description: `${duration}s · ${style} · ${tempo} · ${instrumental ? "Instrumental" : "Com vocal"}`,
          imageUrl: res.imageUrl,
          route: "/dashboard/music-maker",
          status: "ready",
          payload: { duration, style, tempo, instrumental, prompt },
        });
      }
      if (res.text) toast.success(res.text);
    } catch (err: any) {
      toast.error(err?.message || "Erro ao gerar música");
    }
  };

  return (
    <div className="px-4 pt-4 pb-32 max-w-3xl mx-auto">
      <ToolHero
        video={{ url: TOOL_IMAGES.music, poster: TOOL_IMAGES.music }}
        badge="MINIMAX MUSIC-01"
        title="Música IA"
        subtitle="Crie músicas completas com inteligência artificial"
        description="Descreva o estilo, mood e instrumentos. A IA gera uma música profissional em segundos."
        cost={currentPoints}
        icon={Music}
        color="blue"
        features={["Até 60 segundos", "Diversos estilos", "Vocal ou instrumental", "Download MP3"]}
      />

      <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }}>
        <Card glow="blue" hover={false} className="p-5 mt-6">
          <div className="flex items-center gap-3 mb-4">
            <button onClick={() => router.push("/dashboard/studio")} className="w-8 h-8 rounded-xl bg-white/5 flex items-center justify-center hover:bg-white/10 transition-colors">
              <ChevronLeft size={18} />
            </button>
            <PremiumBadge variant="blue">MINIMAX MUSIC-01</PremiumBadge>
            <div className="ml-auto">
              <PointsDisplay points={points} />
            </div>
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
                      ? "bg-blue/15 border-blue/40 text-blue"
                      : "bg-panel border-white/5 text-muted hover:border-white/10"
                  }`}
                >
                  {d.label}
                  <span className="block text-[10px] font-normal opacity-60">{d.points} pts</span>
                </button>
              ))}
            </div>
          </div>

          {/* Style selector */}
          <div className="mb-3">
            <p className="text-xs font-bold text-muted mb-2">Estilo</p>
            <div className="flex gap-2 overflow-x-auto pb-1" style={{ scrollbarWidth: "none" }}>
              {STYLES.map((s) => (
                <button
                  key={s.value}
                  onClick={() => setStyle(s.value)}
                  className={`flex-shrink-0 px-3 py-1.5 rounded-lg text-xs font-semibold border transition-all ${
                    style === s.value
                      ? "bg-blue/15 border-blue/40 text-blue"
                      : "bg-panel border-white/5 text-muted hover:border-white/10"
                  }`}
                >
                  {s.label}
                </button>
              ))}
            </div>
          </div>

          {/* Tempo selector */}
          <div className="mb-3">
            <p className="text-xs font-bold text-muted mb-2">Tempo</p>
            <div className="flex gap-2">
              {TEMPOS.map((t) => (
                <button
                  key={t.value}
                  onClick={() => setTempo(t.value)}
                  className={`flex-1 py-2 rounded-xl text-xs font-bold border transition-all ${
                    tempo === t.value
                      ? "bg-blue/15 border-blue/40 text-blue"
                      : "bg-panel border-white/5 text-muted hover:border-white/10"
                  }`}
                >
                  {t.label}
                </button>
              ))}
            </div>
          </div>

          {/* Instrumental toggle */}
          <div className="mb-4">
            <button
              onClick={() => setInstrumental(!instrumental)}
              className={`w-full py-2.5 rounded-xl text-sm font-bold border transition-all ${
                instrumental
                  ? "bg-blue/15 border-blue/40 text-blue"
                  : "bg-panel border-white/5 text-muted hover:border-white/10"
              }`}
            >
              {instrumental ? "🎹 Instrumental" : "🎤 Com Vocal"}
            </button>
          </div>

          {/* Prompt + Generate */}
          <div className="flex gap-2">
            <input
              value={prompt}
              onChange={(e) => setPrompt(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && handleGenerate()}
              placeholder="Ex: Uma música pop alegre com guitarra e bateria..."
              className="flex-1 bg-panel border border-white/10 rounded-xl px-4 py-3 text-sm text-text placeholder:text-dim/50 focus:outline-none focus:border-blue/40 transition-colors"
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
            <p className="text-sm text-muted">Compondo sua música com MiniMax...</p>
            <p className="text-xs text-dim mt-1">Músicas de {duration}s podem levar até 1 minuto</p>
          </Card>
        </motion.div>
      )}

      {/* Result */}
      {result && (
        <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="mt-4">
          <Card glow="green" hover={false} className="p-5">
            <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-dim mb-3">Música Gerada</p>
            <audio src={result} controls className="w-full mb-3" />
            <Button variant="secondary" className="w-full" onClick={() => {
              const a = document.createElement("a");
              a.href = result;
              a.download = `vantivo-music-${Date.now()}.mp3`;
              a.click();
            }}>
              <Download size={14} />
              Salvar Música
            </Button>
          </Card>
        </motion.div>
      )}

      <div className="mt-8">
        <ExamplesGallery
          title="Inspire-se com criações musicais"
          columns={3}
          items={MODEL_IMAGES.slice(0, 6).map((m) => ({ url: m.url, label: m.label }))}
        />
      </div>
    </div>
  );
}
