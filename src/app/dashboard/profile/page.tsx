"use client";

import { useState, useEffect, useRef } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/lib/contexts/AuthContext";
import { useI18n } from "@/lib/contexts/I18nContext";
import { useTheme } from "@/lib/contexts/ThemeContext";
import { createClient } from "@/lib/supabase/client";
import { NeonBackdrop, PremiumBadge, AvatarCircle, PointsDisplay } from "@/components/brand";
import { Card, Button, Badge, Input, Divider } from "@/components/ui/barrel";
import { motion } from "framer-motion";
import { toast } from "sonner";
import {
  LogOut, User, Camera, Image, Settings, Palette, Globe,
  Crown, Clock, Sparkles, Shield, ChevronRight, Save, Upload
} from "lucide-react";

const fadeUp = (delay: number) => ({
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  transition: { delay, duration: 0.4, ease: "easeOut" as const },
});

export default function ProfilePage() {
  const { t, locale, setLocale } = useI18n();
  const { user, points, logout, refreshProfile } = useAuth();
  const { theme: currentTheme, setTheme } = useTheme();
  const router = useRouter();
  const supabase = createClient();

  const [displayName, setDisplayName] = useState("");
  const [saving, setSaving] = useState(false);
  const [photoUploading, setPhotoUploading] = useState(false);
  const [coverUploading, setCoverUploading] = useState(false);
  const [photoUrl, setPhotoUrl] = useState<string | null>(null);
  const [coverUrl, setCoverUrl] = useState<string | null>(null);

  const photoRef = useRef<HTMLInputElement>(null);
  const coverRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (user?.displayName) setDisplayName(user.displayName);
    if (user?.photoUrl) setPhotoUrl(user.photoUrl);
  }, [user]);

  const uploadFile = async (file: File, type: "avatar" | "cover"): Promise<string | null> => {
    const ext = file.name.split(".").pop() || "png";
    const userId = user?.id || "anonymous";
    const fileName = `${type}-${userId}-${Date.now()}.${ext}`;
    const filePath = `${userId}/${fileName}`;

    const { error } = await supabase.storage
      .from("vantivo-projects")
      .upload(filePath, file, { upsert: true });

    if (error) {
      // Try to create bucket if it doesn't exist
      if (error.message?.includes("bucket") || error.message?.includes("not found")) {
        toast.error("Bucket de armazenamento não configurado. Contate o admin.");
        return null;
      }
      toast.error("Erro ao fazer upload: " + error.message);
      return null;
    }

    const { data: urlData } = supabase.storage
      .from("vantivo-projects")
      .getPublicUrl(filePath);

    return urlData?.publicUrl || null;
  };

  const handlePhotoUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file || !user) return;
    setPhotoUploading(true);
    try {
      const url = await uploadFile(file, "avatar");
      if (url) {
        setPhotoUrl(url);
        const { error } = await supabase
          .from("profiles")
          .update({ photo_url: url, updated_at: new Date().toISOString() })
          .eq("id", user.id);
        if (error) throw error;
        await refreshProfile();
        toast.success("Foto de perfil atualizada!");
      }
    } catch (err: any) {
      toast.error(err?.message || "Erro ao atualizar foto");
    } finally {
      setPhotoUploading(false);
    }
  };

  const handleCoverUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file || !user) return;
    setCoverUploading(true);
    try {
      const url = await uploadFile(file, "cover");
      if (url) {
        setCoverUrl(url);
        const { error } = await supabase
          .from("profiles")
          .update({ cover_url: url, updated_at: new Date().toISOString() })
          .eq("id", user.id);
        if (error) throw error;
        toast.success("Foto de capa atualizada!");
      }
    } catch (err: any) {
      toast.error(err?.message || "Erro ao atualizar capa");
    } finally {
      setCoverUploading(false);
    }
  };

  const handleSaveProfile = async () => {
    if (!user) return;
    setSaving(true);
    try {
      const { error } = await supabase
        .from("profiles")
        .update({
          display_name: displayName,
          full_name: displayName,
          updated_at: new Date().toISOString(),
        })
        .eq("id", user.id);
      if (error) throw error;
      await refreshProfile();
      toast.success("Perfil salvo!");
    } catch (err: any) {
      toast.error(err?.message || "Erro ao salvar perfil");
    } finally {
      setSaving(false);
    }
  };

  const handleLogout = async () => {
    await logout();
    router.push("/login");
  };

  const planLabel = user?.plan
    ? ({ free: "FREE", premium: "START", quarterly: "PRO", yearly: "ULTRA" } as Record<string, string>)[user.plan]
    : "FREE";

  const stats = [
    { icon: Clock, value: `${user?.streak || 0}`, label: "dias", color: "var(--cyan)" },
    { icon: Sparkles, value: `${points}`, label: "pts", color: "var(--purple)" },
    { icon: Crown, value: planLabel, label: "plano", color: planLabel === "ULTRA" ? "var(--amber)" : "var(--green)" },
  ];

  return (
    <div className="relative min-h-screen">
      <NeonBackdrop />
      <div className="relative z-10 px-4 pt-4 pb-32 space-y-5">
        {/* ─── Hero Card with Cover ─── */}
        <motion.div {...fadeUp(0)} className="rounded-[28px] overflow-hidden border border-white/5 glass-card">
          {/* Cover */}
          <div className="relative h-[160px] group">
            <div className={`absolute inset-0 ${coverUrl ? '' : 'bg-gradient-to-r from-purple/40 via-cyan/30 to-blue/30'}`}>
              {coverUrl && (
                <img src={coverUrl} alt="Cover" className="w-full h-full object-cover" />
              )}
              <div className="absolute inset-0 bg-black/30" />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
            </div>

            {/* Cover upload button */}
            <button
              onClick={() => coverRef.current?.click()}
              disabled={coverUploading}
              className="absolute top-3 right-3 w-9 h-9 rounded-full bg-black/40 backdrop-blur-sm border border-white/10 flex items-center justify-center text-white/70 hover:text-white hover:bg-black/60 transition-all disabled:opacity-50"
            >
              {coverUploading ? <div className="spinner !w-4 !h-4" /> : <Camera size={15} />}
            </button>
            <input ref={coverRef} type="file" accept="image/*" className="hidden" onChange={handleCoverUpload} />
          </div>

          {/* Profile info */}
          <div className="px-5 pb-5 -mt-12 relative">
            {/* Avatar */}
            <div className="relative inline-block group">
              <div className="w-24 h-24 rounded-full border-4 border-bg overflow-hidden shadow-[0_0_30px_rgba(168,85,247,0.3)]">
                {photoUrl ? (
                  <img src={photoUrl} alt="" className="w-full h-full object-cover" />
                ) : (
                  <AvatarCircle name={user?.displayName || user?.name || user?.email} size="xl" className="!rounded-full" />
                )}
              </div>
              <button
                onClick={() => photoRef.current?.click()}
                disabled={photoUploading}
                className="absolute -bottom-1 -right-1 w-8 h-8 rounded-full bg-cyan text-[#050714] flex items-center justify-center border-2 border-bg shadow-[0_0_15px_rgba(34,211,238,0.3)] hover:scale-110 transition-transform disabled:opacity-50"
              >
                {photoUploading ? <div className="spinner !w-3 !h-3 !border-[#050714]" /> : <Camera size={14} />}
              </button>
              <input ref={photoRef} type="file" accept="image/*" className="hidden" onChange={handlePhotoUpload} />
            </div>

            <div className="mt-3">
              <div className="flex items-center gap-2 mb-1">
                <h2 className="text-xl font-bold">{user?.displayName || user?.name || "Usuário"}</h2>
                <Badge color={user?.plan === "yearly" ? "green" : user?.plan === "quarterly" ? "cyan" : "purple"}>
                  {planLabel}
                </Badge>
                {user?.role === "admin" && (
                  <Badge color="amber">ADMIN</Badge>
                )}
              </div>
              <p className="text-sm text-muted">{user?.email}</p>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-3 gap-2 mt-4">
              {stats.map((stat, i) => (
                <div key={i} className="glass rounded-2xl p-3 text-center border border-white/5">
                  <stat.icon size={14} className="mx-auto mb-1" style={{ color: stat.color }} />
                  <p className="text-sm font-black" style={{ color: stat.color }}>{stat.value}</p>
                  <p className="text-[10px] text-muted">{stat.label}</p>
                </div>
              ))}
            </div>
          </div>
        </motion.div>

        {/* ─── Edit Profile ─── */}
        <motion.div {...fadeUp(0.1)}>
          <Card glow="none" hover={false} className="p-5">
            <div className="flex items-center gap-2 mb-4">
              <User size={14} className="text-cyan" />
              <p className="text-xs font-bold uppercase tracking-wider text-dim">Editar Perfil</p>
            </div>
            <div className="flex flex-col gap-3">
              <Input
                label="Nome exibido"
                value={displayName}
                onChange={(e) => setDisplayName(e.target.value)}
                placeholder="Seu nome"
                icon={<User size={16} />}
              />
              <Button onClick={handleSaveProfile} loading={saving} size="sm" glow>
                <Save size={14} />
                Salvar
              </Button>
            </div>
          </Card>
        </motion.div>

        {/* ─── Quick Links ─── */}
        <motion.div {...fadeUp(0.2)}>
          <div className="flex items-center gap-2 mb-3">
            <Sparkles size={12} className="text-dim" />
            <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-dim">Acesso Rápido</p>
          </div>
          <div className="grid grid-cols-2 gap-3">
            {[
              { icon: "🎨", label: "Avatar / Anime", href: "/dashboard/anime-studio", gradient: "from-purple/20" },
              { icon: "💎", label: "Planos", href: "/dashboard/premium", gradient: "from-cyan/20" },
              { icon: "🖼️", label: "Projetos", href: "/dashboard/workspace", gradient: "from-pink/20" },
              { icon: "🎯", label: "Modo Foco", href: "/dashboard/focus-mode", gradient: "from-green/20" },
            ].map((item, i) => (
              <Card
                key={i}
                className="p-4 cursor-pointer border border-white/5 overflow-hidden relative group"
                glow="none"
                hover
                onClick={() => router.push(item.href)}
              >
                <div className={`absolute inset-0 bg-gradient-to-br ${item.gradient} via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500`} />
                <div className="relative z-10">
                  <span className="text-2xl mb-1 block">{item.icon}</span>
                  <p className="text-sm font-bold">{item.label}</p>
                </div>
              </Card>
            ))}
          </div>
        </motion.div>

        {/* ─── Settings ─── */}
        <motion.div {...fadeUp(0.3)}>
          <Card glow="none" hover={false} className="p-5">
            <div className="flex items-center gap-2 mb-4">
              <Settings size={14} className="text-cyan" />
              <p className="text-xs font-bold uppercase tracking-wider text-dim">Configurações</p>
            </div>
            <div className="space-y-4">
              {/* Language */}
              <div className="flex items-center justify-between p-3 rounded-xl bg-white/[0.03] border border-white/5">
                <div className="flex items-center gap-3">
                  <Globe size={16} className="text-dim" />
                  <div>
                    <p className="text-sm font-semibold">Idioma</p>
                    <p className="text-[11px] text-dim">{locale === "pt-BR" ? "Português" : "English"}</p>
                  </div>
                </div>
                <button
                  onClick={() => setLocale(locale === "pt-BR" ? "en" : "pt-BR")}
                  className="text-xs font-bold text-cyan bg-cyan/10 px-3 py-1.5 rounded-lg border border-cyan/20 hover:bg-cyan/15 transition-all"
                >
                  {t("profile.languageLabel")}
                </button>
              </div>

              {/* Theme */}
              <div className="flex items-center justify-between p-3 rounded-xl bg-white/[0.03] border border-white/5">
                <div className="flex items-center gap-3">
                  <Palette size={16} className="text-dim" />
                  <div>
                    <p className="text-sm font-semibold">Tema</p>
                    <p className="text-[11px] text-dim capitalize">{currentTheme}</p>
                  </div>
                </div>
                <div className="flex gap-1">
                  {(["dark", "feminine", "light"] as const).map((t) => (
                    <button
                      key={t}
                      onClick={() => setTheme(t)}
                      className={`text-[11px] font-bold uppercase px-2.5 py-1.5 rounded-lg border transition-all ${
                        currentTheme === t
                          ? "bg-cyan/10 text-cyan border-cyan/20 shadow-[0_0_10px_rgba(34,211,238,0.2)]"
                          : "text-dim border-white/10 hover:text-text hover:border-white/30"
                      }`}
                    >
                      {t === "dark" ? "🌙" : t === "feminine" ? "🌸" : "☀️"}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </Card>
        </motion.div>

        {/* ─── Danger Zone ─── */}
        <motion.div {...fadeUp(0.4)}>
          <Card glow="none" hover={false} className="p-5 border-red/20">
            <div className="flex items-center gap-2 mb-2">
              <Shield size={14} className="text-red" />
              <p className="text-xs font-bold uppercase tracking-wider text-red">Conta</p>
            </div>
            <button
              onClick={handleLogout}
              className="flex items-center gap-3 w-full p-3 rounded-xl hover:bg-red/5 transition-colors text-red"
            >
              <LogOut size={16} />
              <span className="text-sm font-semibold">Sair da conta</span>
            </button>
          </Card>
        </motion.div>
      </div>
    </div>
  );
}
