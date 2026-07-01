"use client";

import { useAuth } from "@/lib/contexts/AuthContext";
import { useI18n } from "@/lib/contexts/I18nContext";
import { NeonBackdrop, PremiumBadge } from "@/components/brand";
import { Card, Button, Badge } from "@/components/ui";
import { motion } from "framer-motion";
import { PLANS, EXTRA_POINT_PACKS } from "@/constants/theme";
import { cn } from "@/lib/utils/cn";
import { toast } from "sonner";

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
        <div className="mb-6">
          <PremiumBadge className="mb-2">PLANOS</PremiumBadge>
          <h1 className="text-3xl font-black mb-2">{t("premium.title")}</h1>
          <p className="text-sm text-muted mb-4">{t("premium.subtitle")}</p>
          <div className="flex items-center gap-1.5 bg-purple/10 border border-purple/20 rounded-full px-4 py-2 w-fit">
            <span className="text-yellow-400 text-sm">⚡</span>
            <span className="text-lg font-bold">{points}</span>
            <span className="text-xs text-muted">{t("premium.available")}</span>
          </div>
        </div>

        {/* Plan Cards */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="space-y-4 mb-8"
        >
          {PLANS.filter((p) => p.id !== "free").map((plan, i) => (
            <motion.div
              key={plan.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1 }}
            >
              <Card
                className={cn(
                  "p-6 relative overflow-hidden",
                  plan.highlight && "border-cyan/40 shadow-[0_0_40px_rgba(34,211,238,0.15)]"
                )}
                glow={plan.highlight ? "cyan" : "none"}
              >
                {plan.highlight && (
                  <div className="absolute top-3 right-3">
                    <Badge color="cyan">{t("premium.mostUsed")}</Badge>
                  </div>
                )}
                <div className="flex items-center justify-between mb-4">
                  <div>
                    <h3 className="text-lg font-black">{plan.name}</h3>
                    <p className="text-sm text-muted">{plan.points} {t("common.points")}</p>
                  </div>
                  <div className="text-right">
                    <p className="text-2xl font-black">R$ {plan.price.toFixed(2).replace(".", ",")}</p>
                    <p className="text-xs text-muted">/mês</p>
                  </div>
                </div>
                <Button
                  className="w-full"
                  variant={plan.highlight ? "primary" : "secondary"}
                  onClick={() => handleSubscribe(plan.id)}
                >
                  {t("premium.subscribe")}
                </Button>
              </Card>
            </motion.div>
          ))}
        </motion.div>

        {/* Extra Point Packs */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
        >
          <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-dim mb-3">{t("premium.extraPoints")}</p>
          <div className="space-y-3">
            {EXTRA_POINT_PACKS.map((pack) => (
              <Card key={pack.id} className="p-4 flex items-center justify-between" glow="none">
                <div className="flex items-center gap-3">
                  <span className="text-2xl">⚡</span>
                  <div>
                    <p className="text-sm font-bold">{pack.title}</p>
                    <p className="text-[11px] text-muted">{pack.points} {t("common.points")}</p>
                  </div>
                </div>
                <div className="text-right">
                  <p className="text-sm font-bold">R$ {pack.price.toFixed(2).replace(".", ",")}</p>
                  <button
                    className="text-xs text-cyan font-semibold hover:underline"
                    onClick={() => handleBuyPack(pack.id)}
                  >
                    {t("premium.buy")}
                  </button>
                </div>
              </Card>
            ))}
          </div>
        </motion.div>
      </div>
    </div>
  );
}
