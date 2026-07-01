"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/lib/contexts/AuthContext";
import { useI18n } from "@/lib/contexts/I18nContext";
import { useTheme } from "@/lib/contexts/ThemeContext";
import { createClient } from "@/lib/supabase/client";
import { NeonBackdrop, PremiumBadge } from "@/components/brand";
import { Card, Button, Badge, Input } from "@/components/ui";
import { motion } from "framer-motion";
import { toast } from "sonner";
import { LogOut, User } from "lucide-react";

export default function ProfilePage() {
  const { t, locale, setLocale } = useI18n();
  const { user, points, logout, refreshProfile } = useAuth();
  const { theme, setTheme } = useTheme();
  const router = useRouter();
  const [displayName, setDisplayName] = useState("");
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    if (user?.displayName) setDisplayName(user.displayName);
  }, [user]);

  const handleSaveProfile = async () => {
    if (!user) return;
    setSaving(true);
    try {
      const supabase = createClient();
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
    { label: "🔥", value: `${user?.streak || 0}`, sub: "dias" },
    { label: "⚡", value: `${points}`, sub: t("common.pts") },
    { label: "💎", value: planLabel, sub: "plano" },
  ];

  return (
    <div className="relative min-h-screen">
      <NeonBackdrop />
      <div className="relative z-10 px-4 pt-4 pb-32">
        {/* Hero Card */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="rounded-[30px] bg-card border border-white/5 overflow-hidden mb-5"
        >
          <div className="h-[120px] bg-gradient-to-r from-purple/40 via-cyan/30 to-blue/30 relative">
            <div className="absolute inset-0 bg-black/20" />
            <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,rgba(168,85,247,0.3),transparent_70%)]" />
          </div>

          <div className="px-6 pb-6 -mt-10 relative">
            <div className="w-20 h-20 rounded-full bg-gradient-to-br from-purple via-pink to-cyan border-4 border-bg flex items-center justify-center text-2xl font-black shadow-[0_0_30px_rgba(168,85,247,0.4)]">
              {user?.displayName?.[0] || user?.name?.[0] || user?.email?.[0] || <User size={24} />}
            </div>

            <div className="mt-3">
              <div className="flex items-center gap-2 mb-1">
                <h2 className="text-xl font-bold">{user?.displayName || user?.name || "Usuário"}</h2>
                <Badge color={user?.plan === "yearly" ? "green" : user?.plan === "quarterly" ? "cyan" : "purple"}>
                  {planLabel}
                </Badge>
              </div>
              <p className="text-sm text-muted">{user?.email}</p>
            </div>

            <div className="grid grid-cols-3 gap-2 mt-4">
              {stats.map((stat, i) => (
                <div key={i} className="bg-white/5 rounded-2xl p-3 text-center border border-white/5">
                  <span className="text-lg">{stat.label}</span>
                  <p className="text-sm font-black">{stat.value}</p>
                  <p className="text-[10px] text-muted">{stat.sub}</p>
                </div>
              ))}
            </div>
          </div>
        </motion.div>

        {/* Edit Profile */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
        >
          <Card className="mb-4" glow="cyan">
            <p className="text-xs font-bold uppercase tracking-wider text-dim mb-4">Editar perfil</p>
            <div className="flex flex-col gap-3">
              <Input
                label="Nome exibido"
                value={displayName}
                onChange={(e) => setDisplayName(e.target.value)}
                placeholder="Seu nome"
              />
              <Button onClick={handleSaveProfile} loading={saving} size="sm">
                Salvar perfil
              </Button>
            </div>
          </Card>
        </motion.div>

        {/* Quick Links */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="grid grid-cols-2 gap-3 mb-5"
        >
          {[
            { icon: "🎨", label: "Avatar", href: "/dashboard/anime-studio" },
            { icon: "💎", label: "Planos", href: "/dashboard/premium" },
            { icon: "🖼️", label: "Projetos", href: "/dashboard/workspace" },
            { icon: "🎯", label: "Foco", href: "/dashboard/focus-mode" },
          ].map((item, i) => (
            <Card
              key={i}
              className="p-4 cursor-pointer hover:bg-white/5 transition-colors border border-white/5"
              glow="none"
              onClick={() => router.push(item.href)}
            >
              <span className="text-2xl mb-1 block">{item.icon}</span>
              <p className="text-sm font-bold">{item.label}</p>
            </Card>
          ))}
        </motion.div>

        {/* Settings */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
        >
          <Card className="mb-4" glow="none">
            <p className="text-xs font-bold uppercase tracking-wider text-dim mb-4">Conta</p>
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-sm">Idioma</span>
                <button
                  onClick={() => setLocale(locale === "pt-BR" ? "en" : "pt-BR")}
                  className="text-xs font-bold text-cyan bg-cyan/10 px-3 py-1.5 rounded-lg border border-cyan/20 hover:bg-cyan/15 transition-colors"
                >
                  {t("profile.languageLabel")}
                </button>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm">Tema</span>
                <div className="flex gap-1">
                  {(["dark", "feminine", "light"] as const).map((t) => (
                    <button
                      key={t}
                      onClick={() => setTheme(t)}
                      className={`text-[10px] font-bold uppercase px-2.5 py-1.5 rounded-lg border transition-all ${
                        theme === t
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

          <Card className="border-red/20" glow="none">
            <Button variant="ghost" className="w-full justify-start text-red hover:bg-red/10" onClick={handleLogout}>
              <LogOut size={16} />
              Sair da conta
            </Button>
          </Card>
        </motion.div>
      </div>
    </div>
  );
}
