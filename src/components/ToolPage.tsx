"use client";

import { useState, useRef } from "react";
import { useAuth } from "@/lib/contexts/AuthContext";
import { useAiMutation } from "@/lib/trpc/client";
import { saveProject } from "@/lib/save-project";
import { PointsDisplay, PremiumBadge } from "@/components/brand";
import { Button, Card, Spinner } from "@/components/ui";
import { motion } from "framer-motion";
import { ImagePlus, Sparkles, X, Download, ChevronLeft } from "lucide-react";
import { toast } from "sonner";
import { useRouter } from "next/navigation";

interface ToolConfig {
  action: string;
  title: string;
  badge: string;
  badgeColor?: string;
  description: string;
  price: string;
  acceptsImage: boolean;
  acceptsMultipleImages?: boolean;
  minImages?: number;
  acceptVideo?: boolean;
  placeholder?: string;
  examples: { url: string; label: string }[];
  type: "image" | "video" | "audio" | "model";
}

export function ToolPage({ config }: { config: ToolConfig }) {
  const { points } = useAuth();
  const router = useRouter();
  const mutation = useAiMutation();
  const [input, setInput] = useState("");
  const [images, setImages] = useState<string[]>([]);
  const [result, setResult] = useState<string | null>(null);
  const fileRef = useRef<HTMLInputElement>(null);

  const handleUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = (ev) => {
      const url = ev.target?.result as string;
      if (config.acceptsMultipleImages) {
        setImages((prev) => [...prev, url].slice(0, 6));
      } else {
        setImages([url]);
      }
    };
    reader.readAsDataURL(file);
  };

  const handleGenerate = async () => {
    const inputPayload: Record<string, unknown> = {
      prompt: input || config.placeholder || "",
    };
    if (images.length > 0) {
      inputPayload.images = config.acceptsMultipleImages ? images : [images[0]];
    }
    if (config.acceptVideo) {
      // Placeholder para upload de vídeo
    }

    try {
      const result = await mutation.mutateAsync({
        action: config.action,
        input: inputPayload,
      });
      const mediaUrl = result.imageUrl || "";
      if (mediaUrl) setResult(mediaUrl);

      saveProject({
        type: config.action,
        title: input ? input.slice(0, 60) : config.title,
        description: `Criado com ${config.title}`,
        imageUrl: mediaUrl,
      });

      if (result.text) toast.success(result.text);
    } catch (err: any) {
      toast.error(err?.message || `Erro ao processar`);
    }
  };

  return (
    <div className="min-h-screen bg-bg">
      {/* Header */}
      <div className="px-4 pt-6 pb-4 border-b border-white/5">
        <div className="max-w-5xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-3">
            <button onClick={() => router.push("/dashboard/studio")} className="w-8 h-8 rounded-xl bg-white/5 flex items-center justify-center hover:bg-white/10 transition-colors">
              <ChevronLeft size={18} />
            </button>
            <div>
              <PremiumBadge variant={config.badgeColor as any || "cyan"}>{config.badge}</PremiumBadge>
              <h1 className="text-2xl font-black mt-1">{config.title}</h1>
            </div>
          </div>
          <PointsDisplay points={points} />
        </div>
      </div>

      {/* Content */}
      <div className="max-w-5xl mx-auto px-4 py-6 pb-32">
        {/* Examples Row */}
        <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="mb-6">
          <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-dim mb-3">Exemplos</p>
          <div className="flex gap-3 overflow-x-auto pb-2" style={{ scrollbarWidth: "none" }}>
            {config.examples.map((ex, i) => (
              <button
                key={i}
                onClick={() => setInput(ex.label)}
                className="group flex-shrink-0 w-36 rounded-2xl overflow-hidden border border-white/5 hover:border-cyan/30 transition-all"
              >
                <img src={ex.url} alt={ex.label} className="w-36 h-24 object-cover group-hover:scale-105 transition-transform" loading="lazy" />
                <p className="text-[10px] font-semibold text-dim p-2 truncate text-left">{ex.label}</p>
              </button>
            ))}
          </div>
        </motion.div>

        {/* Input Card */}
        <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }}>
          <Card glow="cyan" hover={false} className="p-5">
            {/* Image upload */}
            {config.acceptsImage && (
              <div className="mb-4">
                {images.length > 0 ? (
                  <div className="flex gap-2 flex-wrap">
                    {images.map((img, i) => (
                      <div key={i} className="relative w-24 h-24">
                        <img src={img} alt="" className="w-full h-full object-cover rounded-xl border border-white/10" />
                        <button onClick={() => setImages(images.filter((_, j) => j !== i))} className="absolute -top-2 -right-2 w-5 h-5 rounded-full bg-red/80 text-white flex items-center justify-center">
                          <X size={10} />
                        </button>
                      </div>
                    ))}
                    {config.acceptsMultipleImages && images.length < 6 && (
                      <button onClick={() => fileRef.current?.click()} className="w-24 h-24 rounded-xl border border-dashed border-white/10 flex items-center justify-center hover:border-cyan/30 transition-colors">
                        <ImagePlus size={20} className="text-dim" />
                      </button>
                    )}
                  </div>
                ) : (
                  <label className="block">
                    <div className="flex flex-col items-center justify-center h-32 bg-panel border border-dashed border-white/10 rounded-2xl cursor-pointer hover:bg-white/5 transition-colors">
                      <ImagePlus size={28} className="text-dim mb-2" />
                      <p className="text-sm text-muted">
                        {config.acceptVideo ? "Escolher foto ou vídeo" : "Escolher foto"}
                      </p>
                    </div>
                    <input ref={fileRef} type="file" accept={config.acceptVideo ? "image/*,video/*" : "image/*"} className="hidden" onChange={handleUpload} />
                  </label>
                )}
              </div>
            )}

            {/* Text input */}
            <div className="flex gap-2">
              <input
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && handleGenerate()}
                placeholder={config.placeholder || "Descreva o que quer criar..."}
                className="flex-1 bg-panel border border-white/10 rounded-xl px-4 py-3 text-sm text-text placeholder:text-dim/50 focus:outline-none focus:border-cyan/40 transition-colors"
              />
              <Button onClick={handleGenerate} loading={mutation.isPending} glow>
                <Sparkles size={16} />
                {config.price}
              </Button>
            </div>
          </Card>
        </motion.div>

        {/* Loading */}
        {mutation.isPending && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="mt-4">
            <Card glow="purple" hover={false} className="p-8 text-center">
              <Spinner className="mx-auto mb-3" size="lg" />
              <p className="text-sm text-muted">Processando sua solicitação...</p>
              <p className="text-xs text-dim mt-1">Isso pode levar alguns segundos</p>
            </Card>
          </motion.div>
        )}

        {/* Result */}
        {result && (
          <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="mt-4">
            <Card glow="green" hover={false} className="p-5">
              <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-dim mb-3">Resultado</p>
              {config.type === "image" && (
                <img src={result} alt="Result" className="w-full rounded-2xl mb-3" />
              )}
              {config.type === "video" && (
                <video src={result} controls className="w-full rounded-2xl mb-3" />
              )}
              {config.type === "audio" && (
                <audio src={result} controls className="w-full mb-3" />
              )}
              <Button variant="secondary" className="w-full" onClick={() => {
                const a = document.createElement("a");
                a.href = result;
                a.download = `vantivo-${config.action}-${Date.now()}.png`;
                a.click();
              }}>
                <Download size={14} />
                Salvar
              </Button>
            </Card>
          </motion.div>
        )}
      </div>
    </div>
  );
}
