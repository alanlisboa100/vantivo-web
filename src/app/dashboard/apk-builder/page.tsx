"use client";

import { useState, useRef } from "react";
import { useAuth } from "@/lib/contexts/AuthContext";
import { useAiMutation } from "@/lib/trpc/client";
import { saveProject } from "@/lib/save-project";
import { PointsDisplay, PremiumBadge } from "@/components/brand";
import { Button, Card, Spinner } from "@/components/ui/barrel";
import { ToolHero, ExamplesGallery } from "@/components/ui/barrel";
import { motion } from "framer-motion";
import { Smartphone, ChevronLeft, Download, Palette } from "lucide-react";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import { TOOL_IMAGES, MODEL_IMAGES } from "@/constants/samples";

export default function ApkBuilderPage() {
  const { points } = useAuth();
  const router = useRouter();
  const mutation = useAiMutation();
  const fileRef = useRef<HTMLInputElement>(null);
  const [appName, setAppName] = useState("");
  const [appUrl, setAppUrl] = useState("");
  const [appDescription, setAppDescription] = useState("");
  const [appIcon, setAppIcon] = useState<string | null>(null);
  const [result, setResult] = useState<string | null>(null);

  const handleIconUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = (ev) => setAppIcon(ev.target?.result as string);
    reader.readAsDataURL(file);
  };

  const handleBuild = async () => {
    if (!appName.trim()) {
      toast.error("Digite o nome do app");
      return;
    }
    if (!appUrl.trim()) {
      toast.error("Digite a URL do site");
      return;
    }

    try {
      const res = await mutation.mutateAsync({
        action: "apk.generate",
        input: {
          prompt: `App: ${appName}\nURL: ${appUrl}\nDescrição: ${appDescription}`,
          appName,
          appUrl,
          appDescription,
          appIcon: appIcon || undefined,
        },
      });

      const apkUrl = res.imageUrl;
      if (apkUrl) {
        setResult(apkUrl);
        saveProject({
          type: "apk",
          title: appName,
          description: appDescription || `App ${appName} criado`,
          imageUrl: appIcon || undefined,
        });
      }

      if (res.text) toast.success(res.text);
    } catch (err: any) {
      toast.error(err?.message || "Erro ao gerar APK");
    }
  };

  return (
    <div className="px-4 pt-4 pb-32 max-w-3xl mx-auto">
      <ToolHero
        video={{ url: TOOL_IMAGES.apkbuilder, poster: TOOL_IMAGES.apkbuilder }}
        badge="WEB INTO APP"
        title="APK Builder"
        subtitle="Transforme qualquer site em app Android"
        description="Cole a URL do seu site ou Progressive Web App e receba um APK pronto para instalar e publicar na Play Store."
        cost={15}
        icon={Smartphone}
        color="amber"
        features={["APK assinado", "Ícone personalizado", "Splash screen", "Pronto para Play Store"]}
      />

      <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }}>
        <Card glow="amber" hover={false} className="p-5 mt-6">
          <div className="flex items-center gap-3 mb-4">
            <button onClick={() => router.push("/dashboard/studio")} className="w-8 h-8 rounded-xl bg-white/5 flex items-center justify-center hover:bg-white/10 transition-colors">
              <ChevronLeft size={18} />
            </button>
            <PremiumBadge variant="amber">APK BUILDER</PremiumBadge>
            <div className="ml-auto">
              <PointsDisplay points={points} />
            </div>
          </div>

          {/* App Icon */}
          <div className="mb-4">
            <p className="text-xs font-bold text-muted mb-2">Ícone do App (opcional)</p>
            {appIcon ? (
              <div className="relative w-20 h-20">
                <img src={appIcon} alt="" className="w-full h-full object-cover rounded-2xl border border-white/10" />
                <button onClick={() => setAppIcon(null)} className="absolute -top-2 -right-2 w-5 h-5 rounded-full bg-red/80 text-white flex items-center justify-center text-xs">×</button>
              </div>
            ) : (
              <label className="block">
                <div className="flex flex-col items-center justify-center h-24 w-24 bg-panel border border-dashed border-white/10 rounded-2xl cursor-pointer hover:bg-white/5 transition-colors">
                  <Palette size={24} className="text-dim mb-1" />
                  <p className="text-[10px] text-muted">Ícone</p>
                </div>
                <input ref={fileRef} type="file" accept="image/*" className="hidden" onChange={handleIconUpload} />
              </label>
            )}
          </div>

          {/* App Name */}
          <div className="mb-3">
            <input
              value={appName}
              onChange={(e) => setAppName(e.target.value)}
              placeholder="Nome do App"
              className="w-full bg-panel border border-white/10 rounded-xl px-4 py-3 text-sm text-text placeholder:text-dim/50 focus:outline-none focus:border-amber/40 transition-colors"
            />
          </div>

          {/* App URL */}
          <div className="mb-3">
            <input
              value={appUrl}
              onChange={(e) => setAppUrl(e.target.value)}
              placeholder="URL do site (ex: https://meusite.com)"
              className="w-full bg-panel border border-white/10 rounded-xl px-4 py-3 text-sm text-text placeholder:text-dim/50 focus:outline-none focus:border-amber/40 transition-colors"
            />
          </div>

          {/* App Description */}
          <div className="mb-4">
            <textarea
              value={appDescription}
              onChange={(e) => setAppDescription(e.target.value)}
              placeholder="Descrição do app (opcional)"
              rows={3}
              className="w-full bg-panel border border-white/10 rounded-xl px-4 py-3 text-sm text-text placeholder:text-dim/50 focus:outline-none focus:border-amber/40 transition-colors resize-none"
            />
          </div>

          <Button onClick={handleBuild} loading={mutation.isPending} glow className="w-full" leftIcon={<Smartphone size={16} />}>
            Gerar APK · 15 pts
          </Button>
        </Card>
      </motion.div>

      {/* Loading */}
      {mutation.isPending && (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="mt-4">
          <Card glow="purple" hover={false} className="p-8 text-center">
            <Spinner className="mx-auto mb-3" size="lg" />
            <p className="text-sm text-muted">Gerando seu APK...</p>
            <p className="text-xs text-dim mt-1">Isso pode levar 1-2 minutos</p>
          </Card>
        </motion.div>
      )}

      {/* Result */}
      {result && (
        <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="mt-4">
          <Card glow="green" hover={false} className="p-5">
            <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-dim mb-3">APK Pronto!</p>
            <div className="flex items-center gap-3 mb-4 p-4 bg-green/10 rounded-xl">
              <Smartphone size={32} className="text-green" />
              <div>
                <p className="font-bold">{appName}</p>
                <p className="text-xs text-muted">Pronto para instalar</p>
              </div>
            </div>
            <Button variant="secondary" className="w-full" onClick={() => {
              const a = document.createElement("a");
              a.href = result;
              a.download = `${appName.replace(/\s+/g, "-").toLowerCase()}.apk`;
              a.click();
            }}>
              <Download size={14} />
              Download APK
            </Button>
          </Card>
        </motion.div>
      )}

      <div className="mt-8">
        <ExamplesGallery
          title="Apps criados com APK Builder"
          columns={3}
          items={MODEL_IMAGES.slice(0, 6).map((m) => ({ url: m.url, label: m.label }))}
        />
      </div>
    </div>
  );
}
