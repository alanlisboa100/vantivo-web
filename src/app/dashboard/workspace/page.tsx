"use client";

import { useState, useEffect } from "react";
import { useAuth } from "@/lib/contexts/AuthContext";
import { useI18n } from "@/lib/contexts/I18nContext";
import { createClient } from "@/lib/supabase/client";
import { NeonBackdrop, PremiumBadge } from "@/components/brand";
import { Card, Button, Badge } from "@/components/ui";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils/cn";
import { X, Download, Heart, Share2, Trash2, Clock } from "lucide-react";
import { toast } from "sonner";

const FILTER_OPTIONS = [
  { key: "all", icon: "📋" },
  { key: "image", icon: "🖼️" },
  { key: "editing", icon: "✏️" },
  { key: "avatar", icon: "👤" },
  { key: "chat", icon: "💬" },
  { key: "bookmarked", icon: "⭐" },
];

interface Project {
  id: string;
  title?: string;
  description?: string;
  imageUrl?: string;
  type?: string;
  favorited?: boolean;
  createdAt?: string;
}

export default function WorkspacePage() {
  const { t } = useI18n();
  const { user, points } = useAuth();
  const [projects, setProjects] = useState<Project[]>([]);
  const [filter, setFilter] = useState("all");
  const [preview, setPreview] = useState<Project | null>(null);
  const [loading, setLoading] = useState(true);

  const loadProjects = async () => {
    setLoading(true);
    try {
      // Load from localStorage first (instant)
      const raw = localStorage.getItem("vantivo.projects.v1");
      const local = raw ? JSON.parse(raw) : [];

      // Try to load from Supabase (best-effort)
      if (user) {
        try {
          const supabase = createClient();
          const { data } = await supabase
            .from("vantivo_projects")
            .select("*")
            .eq("user_id", user.id)
            .order("created_at", { ascending: false })
            .limit(30);

          if (data && data.length > 0) {
            const mapped = data.map((p: any) => ({
              id: p.id,
              title: p.title || "Sem título",
              description: p.description || "",
              imageUrl: p.image_url || p.imageUrl,
              type: p.type || "image",
              favorited: p.favorited || false,
              createdAt: p.created_at,
            }));
            // Merge: Supabase data is source of truth, merge with local favorites
            const merged = mapped.map((m) => {
              const localMatch = local.find((l: any) => l.id === m.id);
              return localMatch ? { ...m, favorited: localMatch.favorited } : m;
            });
            setProjects(merged);
            localStorage.setItem("vantivo.projects.v1", JSON.stringify(merged));
            return;
          }
        } catch {}
      }

      setProjects(local);
    } catch {
      setProjects([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadProjects();
  }, [user]);

  const filtered = projects.filter((p) => {
    if (filter === "all") return true;
    if (filter === "bookmarked") return p.favorited;
    return p.type === filter;
  });

  const toggleFavorite = async (id: string) => {
    const updated = projects.map((p) =>
      p.id === id ? { ...p, favorited: !p.favorited } : p
    );
    setProjects(updated);
    localStorage.setItem("vantivo.projects.v1", JSON.stringify(updated));

    // Sync to Supabase
    if (user) {
      try {
        const supabase = createClient();
        const project = updated.find((p) => p.id === id);
        await supabase
          .from("vantivo_projects")
          .update({ favorited: project?.favorited })
          .eq("id", id);
      } catch {}
    }
  };

  const handleDownload = (url: string) => {
    if (!url) return toast.error("Imagem indisponível");
    const a = document.createElement("a");
    a.href = url;
    a.download = "vantivo-image.png";
    a.click();
  };

  const handleShare = async (url: string) => {
    if (navigator.share) {
      await navigator.share({ url });
    } else {
      await navigator.clipboard.writeText(url);
      toast.success("Link copiado!");
    }
  };

  const favorites = projects.filter((p) => p.favorited).length;

  return (
    <div className="relative min-h-screen">
      <NeonBackdrop />
      <div className="relative z-10 px-4 pt-4 pb-32">
        {/* Header */}
        <div className="flex items-center justify-between mb-4">
          <div>
            <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-dim mb-1">{t("workspace.history")}</p>
            <h1 className="text-3xl font-black">{t("workspace.title")}</h1>
          </div>
          <div className="flex items-center gap-1.5 bg-purple/10 border border-purple/20 rounded-full px-3.5 py-1.5">
            <span className="text-yellow-400 text-xs">⚡</span>
            <span className="text-sm font-bold">{points}</span>
            <span className="text-[10px] text-muted">{t("common.pts")}</span>
          </div>
        </div>

        {/* Hero */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="relative min-h-[200px] rounded-[30px] bg-card/50 border border-white/5 p-6 mb-5 overflow-hidden"
        >
          <div className="absolute inset-0 overflow-hidden pointer-events-none">
            <div className="absolute -top-16 -right-10 w-[180px] h-[180px] rounded-full bg-purple/20 blur-[80px]" />
            <div className="absolute -bottom-10 -left-10 w-[150px] h-[150px] rounded-full bg-cyan/15 blur-[80px]" />
          </div>
          <div className="relative z-10">
            <div className="flex items-center gap-2 mb-3">
              <PremiumBadge>LISBOA</PremiumBadge>
              <span className="flex items-center gap-1 text-[10px] text-green font-semibold">
                <span className="w-1.5 h-1.5 rounded-full bg-green animate-pulse" />
                {t("workspace.active")}
              </span>
            </div>
            <h1 className="text-2xl font-black mb-2">{t("workspace.heroTitle")}</h1>
            <p className="text-xs text-muted mb-4">{t("workspace.heroSubtitle")}</p>
            <div className="grid grid-cols-3 gap-2">
              {[
                { label: projects.length.toString(), sub: t("workspace.items"), color: "purple" },
                { label: projects.filter((p) => p.imageUrl).length.toString(), sub: t("workspace.ready"), color: "green" },
                { label: favorites.toString(), sub: t("workspace.bookmarked"), color: "cyan" },
              ].map((stat, i) => (
                <div key={i} className="bg-white/5 rounded-2xl p-3 text-center border border-white/5">
                  <p className="text-sm font-black" style={{ color: `var(--${stat.color})` }}>{stat.label}</p>
                  <p className="text-[10px] text-muted">{stat.sub}</p>
                </div>
              ))}
            </div>
          </div>
        </motion.div>

        {/* Filters */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="flex gap-2 overflow-x-auto mb-4 pb-1 scrollbar-none"
        >
          {FILTER_OPTIONS.map((f) => (
            <button
              key={f.key}
              onClick={() => setFilter(f.key)}
              className={cn(
                "flex items-center gap-1.5 text-xs font-bold px-3.5 py-2 rounded-full border whitespace-nowrap transition-all",
                filter === f.key
                  ? "bg-cyan text-[#050714] border-cyan shadow-[0_0_15px_rgba(34,211,238,0.3)]"
                  : "bg-transparent text-cyan border-cyan/20 hover:bg-cyan/10"
              )}
            >
              <span>{f.icon}</span>
              {f.key === "all" ? t("workspace.all") :
               f.key === "bookmarked" ? t("workspace.bookmarked") :
               f.key === "image" ? t("workspace.image") :
               f.key === "editing" ? t("workspace.editing") :
               f.key}
            </button>
          ))}
        </motion.div>

        {/* Projects */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
        >
          {loading ? (
            <div className="grid grid-cols-2 gap-3">
              {[1, 2, 3, 4].map((i) => (
                <div key={i} className="rounded-[30px] bg-card/50 border border-white/5 p-4 animate-pulse">
                  <div className="w-full h-[120px] rounded-xl bg-white/5 mb-2" />
                  <div className="h-4 bg-white/5 rounded w-2/3 mb-1" />
                  <div className="h-3 bg-white/5 rounded w-1/2" />
                </div>
              ))}
            </div>
          ) : filtered.length > 0 ? (
            <div className="grid grid-cols-2 gap-3">
              {filtered.map((project) => (
                <Card
                  key={project.id}
                  className="p-3 cursor-pointer overflow-hidden hover:bg-white/5 transition-all border border-white/5"
                  glow="none"
                  onClick={() => setPreview(project)}
                >
                  {project.imageUrl ? (
                    <img
                      src={project.imageUrl}
                      alt={project.title || ""}
                      className="w-full h-[120px] object-cover rounded-xl mb-2"
                      loading="lazy"
                    />
                  ) : (
                    <div className="w-full h-[120px] rounded-xl bg-gradient-to-br from-purple/10 to-cyan/10 flex items-center justify-center mb-2 border border-white/5">
                      <span className="text-3xl">🎨</span>
                    </div>
                  )}
                  <div className="flex items-center justify-between gap-1">
                    <div className="flex-1 min-w-0">
                      <p className="text-xs font-bold truncate">{project.title || "Sem título"}</p>
                      <p className="text-[10px] text-muted truncate">{project.description || ""}</p>
                    </div>
                    <button
                      onClick={(e) => { e.stopPropagation(); toggleFavorite(project.id); }}
                      className="flex-shrink-0 p-1 hover:bg-white/10 rounded-lg transition-colors"
                    >
                      <Heart
                        size={14}
                        className={project.favorited ? "fill-pink text-pink" : "text-dim"}
                      />
                    </button>
                  </div>
                </Card>
              ))}
            </div>
          ) : (
            <Card className="p-8 text-center" glow="none">
              <span className="text-4xl block mb-3">📂</span>
              <p className="text-sm text-muted mb-1">{t("workspace.cleanHistory")}</p>
              <p className="text-xs text-dim mb-4">{t("workspace.nextCreations")}</p>
              <a href="/dashboard/studio">
                <Button size="sm">{t("workspace.openStudio")}</Button>
              </a>
            </Card>
          )}
        </motion.div>
      </div>

      {/* Preview Modal */}
      {preview && (
        <div
          className="fixed inset-0 z-50 bg-black/90 flex items-center justify-center p-4"
          onClick={() => setPreview(null)}
        >
          <div
            className="relative max-w-lg w-full max-h-[90vh] flex flex-col"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between mb-3">
              <div className="flex-1 min-w-0">
                <p className="font-bold truncate">{preview.title || "Sem título"}</p>
                <p className="text-xs text-muted truncate">{preview.description || ""}</p>
              </div>
              <button
                onClick={() => setPreview(null)}
                className="flex-shrink-0 ml-3 w-8 h-8 rounded-full bg-white/10 flex items-center justify-center hover:bg-white/20 transition-colors"
              >
                <X size={16} />
              </button>
            </div>

            {preview.imageUrl ? (
              <img
                src={preview.imageUrl}
                alt={preview.title || ""}
                className="w-full rounded-2xl max-h-[55vh] object-contain bg-black/40"
              />
            ) : (
              <div className="w-full h-48 rounded-2xl bg-gradient-to-br from-purple/10 to-cyan/10 flex items-center justify-center">
                <span className="text-4xl">🎨</span>
              </div>
            )}

            <div className="flex gap-2 mt-4">
              {preview.imageUrl && (
                <>
                  <Button
                    variant="secondary"
                    size="sm"
                    className="flex-1 text-xs"
                    onClick={() => handleDownload(preview.imageUrl!)}
                  >
                    <Download size={14} />
                    Salvar
                  </Button>
                  <Button
                    variant="secondary"
                    size="sm"
                    className="flex-1 text-xs"
                    onClick={() => handleShare(preview.imageUrl!)}
                  >
                    <Share2 size={14} />
                    Compartilhar
                  </Button>
                </>
              )}
              <button
                onClick={() => toggleFavorite(preview.id)}
                className={cn(
                  "p-2.5 rounded-xl border transition-colors",
                  preview.favorited
                    ? "bg-pink/10 border-pink/30 text-pink"
                    : "bg-white/5 border-white/10 text-dim hover:text-text"
                )}
              >
                <Heart size={16} className={preview.favorited ? "fill-pink" : ""} />
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
