"use client";

import { useAuth } from "@/lib/contexts/AuthContext";
import { useI18n } from "@/lib/contexts/I18nContext";
import { NeonBackdrop, PremiumBadge } from "@/components/brand";
import { Card, Button, Badge } from "@/components/ui";
import { motion } from "framer-motion";
import { PLANS, EXTRA_POINT_PACKS } from "@/constants/theme";
import { cn } from "@/lib/utils/cn";
import { toast } from "sonner";
import { Zap, Star, Crown, Sparkles, Gift, TrendingUp, Check, ArrowRight } from "lucide-react";

const PLAN_ICONS = {
  premium: <Zap size={28} />,
  quarterly: <Crown size={28} />,
  yearly: <Sparkles size={28} />,
};

const PLAN_COLORS = {
  premium: { border: "border-purple/30", glow: "purple", bg: "from-purple/20", badge: "purple" },
  quarterly: { border: "border-cyan/40", glow: "cyan", bg: "from-cyan/20", badge: "cyan" },
  yearly: { border: "border-amber/30", glow: "amber", bg: "from-amber/20", badge: "amber" },
};

const FEATURES = [
  "Geração de imagens IA",
  "Editor de fotos premium",
  "Anime Studio",
  "Avatar animado",
  "Galeria inteligente",
  "Modo Foco",
  "Suporte prioritário",
  "Sem anúncios",
];

export default function PremiumPage() {
  const { t } = useI18n();
  const { points, user } = useAuth();

  const handleSubscribe = (plan: string) => {
    toast.info("Checkout será implementado em breve!");
  };

  const handleBuyPack = (pack: string) => {
    toast.info("Compra de pacotes será implementada em breve!");
  };

  const planLabel = user?.plan ? { free: "FREE", premium: "START", quarterly: "PRO", yearly: "ULTRA" }[user.plan] : "FREE";

  return (
    <div className="relative min-h-screen">
      <NeonBackdrop />
      <div className="relative z-10 px-4 pt-4 pb-32">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8 text-center"
        >
          <PremiumBadge className="mb-3">Planos</PremiumBadge>
          <h1 className="text-[40px] font-black leading-tight mb-3">
            Pontos para<br />
            <span className="bg-gradient-to-r from-purple via-cyan to-blue bg-clip-text text-transparent">
              transformar ideias
            </span>
          </h1>
          <p className="text-muted text-sm max-w-sm mx-auto">{t("premium.subtitle")}</p>

          <div className="flex items-center justify-center gap-2 mt-5">
            <div className="flex items-center gap-1.5 bg-gradient-to-r from-purple/20 to-cyan/20 border border-purple/20 rounded-full px-4 py-2">
              <Zap size={16} className="text-yellow-400" />
              <span className="text-lg font-bold">{points}</span>
              <span className="text-xs text-muted">{t("premium.available")}</span>
            </div>
          </div>
        </motion.div>

        {/* Plan Cards */}
        <div className="space-y-4 mb-10">
          {PLANS.filter((p) => p.id !== "free").map((plan, i) => {
            const colors = PLAN_COLORS[plan.id as keyof typeof PLAN_COLORS];
            const icon = PLAN_ICONS[plan.id as keyof typeof PLAN_ICONS];

            return (
              <motion.div
                key={plan.id}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.12 }}
              >
                <Card
                  className={cn(
                    "p-0 overflow-hidden relative group transition-all duration-500",
                    plan.highlight
                      ? "border-cyan/40 shadow-[0_0_50px_rgba(34,211,238,0.12)]"
                      : "border-white/5 hover:border-white/20"
                  )}
                  glow={plan.highlight ? "cyan" : "none"}
                >
                  {/* Highlight gradient bar */}
                  {plan.highlight && (
                    <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-cyan to-transparent" />
                  )}

                  <div className="p-6">
                    <div className="flex items-start justify-between mb-4">
                      <div className="flex items-center gap-3">
                        <div className={cn(
                          "w-12 h-12 rounded-2xl flex items-center justify-center",
                          `bg-${colors.badge}/10 text-${colors.badge}`
                        )}>
                          {icon}
                        </div>
                        <div>
                          <div className="flex items-center gap-2">
                            <h3 className="text-xl font-bold">{plan.name}</h3>
                            {plan.highlight && (
                              <span className="text-[10px] font-bold uppercase tracking-wider bg-cyan/10 text-cyan px-2 py-0.5 rounded-full border border-cyan/20">
                                {t("premium.mostUsed")}
                              </span>
                            )}
                          </div>
                          <p className="text-sm text-muted">{plan.points} {t("common.points")}/mês</p>
                        </div>
                      </div>
                      <div className="text-right">
                        <p className="text-3xl font-black">R$ {plan.price.toFixed(2).replace(".", ",")}</p>
                        <p className="text-xs text-muted">/mês</p>
                      </div>
                    </div>

                    {/* Features */}
                    <div className="grid grid-cols-2 gap-1.5 mb-5">
                      {FEATURES.slice(0, plan.highlight ? 8 : 4).map((feat) => (
                        <div key={feat} className="flex items-center gap-1.5 text-xs text-muted">
                          <Check size={12} className="text-green shrink-0" />
                          {feat}
                        </div>
                      ))}
                    </div>

                    <Button
                      className={cn(
                        "w-full group",
                        plan.highlight
                          ? "shadow-[0_0_25px_rgba(34,211,238,0.2)]"
                          : ""
                      )}
                      variant={plan.highlight ? "primary" : "secondary"}
                      size="lg"
                      onClick={() => handleSubscribe(plan.id)}
                    >
                      {t("premium.subscribe")}
                      <ArrowRight size={16} className="group-hover:translate-x-0.5 transition-transform" />
                    </Button>
                  </div>
                </Card>
              </motion.div>
            );
          })}
        </div>

        {/* Extra Point Packs */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
        >
          <div className="flex items-center gap-2 mb-4">
            <Gift size={16} className="text-purple" />
            <p className="text-xs font-bold uppercase tracking-[0.2em] text-muted">{t("premium.extraPoints")}</p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            {EXTRA_POINT_PACKS.map((pack, i) => {
              const valueRatio = (pack.points / pack.price).toFixed(0);
              return (
                <motion.div
                  key={pack.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.45 + i * 0.08 }}
                >
                  <Card
                    className="p-5 text-center cursor-pointer hover:bg-white/5 transition-all border-white/5 hover:border-cyan/20 group"
                    glow="none"
                    onClick={() => handleBuyPack(pack.id)}
                  >
                    <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-amber/20 to-yellow-20 flex items-center justify-center mx-auto mb-3">
                      <TrendingUp size={18} className="text-amber" />
                    </div>
                    <p className="text-lg font-bold mb-1">{pack.title}</p>
                    <p className="text-2xl font-black mb-1">
                      R$ {pack.price.toFixed(2).replace(".", ",")}
                    </p>
                    <p className="text-sm text-muted mb-2">{pack.points} {t("common.points")}</p>
                    <div className="inline-flex items-center gap-1 text-[10px] font-bold uppercase tracking-wider bg-green/10 text-green px-2.5 py-1 rounded-full">
                      <TrendingUp size={10} />
                      ~{valueRatio} pts/R$
                    </div>
                  </Card>
                </motion.div>
              );
            })}
          </div>
        </motion.div>
      </div>
    </div>
  );
}
