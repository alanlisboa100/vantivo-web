"use client";

import { useState, useEffect } from "react";
import { useI18n } from "@/lib/contexts/I18nContext";
import { useAuth } from "@/lib/contexts/AuthContext";
import { NeonBackdrop, PremiumBadge } from "@/components/brand";
import { Card, Button, Badge } from "@/components/ui";
import { motion, AnimatePresence } from "framer-motion";
import { toast } from "sonner";
import { Clock, Play, Square, Trophy } from "lucide-react";

const PRESETS = [
  { key: "quickStudy", icon: "📚", minutes: 25, desc: "Para revisar matéria, ler artigo ou praticar exercício." },
  { key: "taskFocus", icon: "🎯", minutes: 40, desc: "Para estudar, codar, escrever ou projetar." },
  { key: "deepSession", icon: "🧘", minutes: 60, desc: "Para prova, projeto grande ou fluxo contínuo." },
];

export default function FocusModePage() {
  const { t, locale } = useI18n();
  const { points } = useAuth();
  const [timer, setTimer] = useState(0);
  const [running, setRunning] = useState(false);
  const [completed, setCompleted] = useState(false);
  const [selectedPreset, setSelectedPreset] = useState<number | null>(null);

  // Timer countdown effect
  useEffect(() => {
    if (!running || timer <= 0) return;
    const id = setInterval(() => {
      setTimer((prev) => {
        if (prev <= 1) {
          setRunning(false);
          setCompleted(true);
          // Save session to localStorage history
          const session = { id: Date.now(), duration: timer, completedAt: new Date().toISOString() };
          try {
            const history = JSON.parse(localStorage.getItem("vantivo.focus.history") || "[]");
            history.push(session);
            localStorage.setItem("vantivo.focus.history", JSON.stringify(history.slice(-30)));
          } catch {}
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
    return () => clearInterval(id);
  }, [running, timer]);

  const startTimer = (minutes: number, index: number) => {
    if (running) return;
    if (points < 1) {
      toast.error(t("common.insufficientPoints"));
      return;
    }
    setCompleted(false);
    setSelectedPreset(index);
    setTimer(minutes * 60);
    setRunning(true);
    toast.success(`Sessão de ${minutes}min iniciada!`);
  };

  const stopTimer = () => {
    setRunning(false);
    setTimer(0);
    setSelectedPreset(null);
    toast.info("Sessão encerrada.");
  };

  const formatTime = (s: number) => {
    const m = Math.floor(s / 60);
    const sec = s % 60;
    return `${m.toString().padStart(2, "0")}:${sec.toString().padStart(2, "0")}`;
  };

  const progress = selectedPreset !== null && PRESETS[selectedPreset]
    ? ((PRESETS[selectedPreset].minutes * 60 - timer) / (PRESETS[selectedPreset].minutes * 60)) * 100
    : 0;

  return (
    <div className="relative min-h-screen">
      <NeonBackdrop />
      <div className="relative z-10 px-4 pt-4 pb-32">
        <div className="mb-6">
          <PremiumBadge className="mb-2">FOCO</PremiumBadge>
          <h1 className="text-3xl font-black">Modo Foco</h1>
          <p className="text-sm text-muted mt-1">Foco para estudar ou finalizar tarefa. Custa 1 ponto por sessão.</p>
        </div>

        {/* Presets */}
        {!running && !completed && (
          <div className="space-y-3 mb-6">
            {PRESETS.map((preset, i) => (
              <motion.div
                key={preset.key}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.1 }}
              >
                <Card
                  className="p-4 cursor-pointer hover:bg-white/5 transition-colors border border-white/10 hover:border-cyan/30"
                  glow={selectedPreset === i ? "cyan" : "none"}
                  onClick={() => startTimer(preset.minutes, i)}
                >
                  <div className="flex items-center gap-3">
                    <span className="text-2xl">{preset.icon}</span>
                    <div className="flex-1">
                      <p className="font-bold text-sm">{preset.minutes}min — {t(`focus.${preset.key}`)}</p>
                      <p className="text-xs text-muted">{preset.desc}</p>
                    </div>
                    <div className="text-right flex items-center gap-2">
                      <span className="text-[10px] text-dim bg-white/5 px-2 py-1 rounded-full">1 pt</span>
                      <Play size={18} className="text-cyan" />
                    </div>
                  </div>
                </Card>
              </motion.div>
            ))}
          </div>
        )}

        {/* Timer running */}
        <AnimatePresence>
          {running && (
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
            >
              <Card className="p-8 text-center" glow="cyan">
                {/* Circular progress */}
                <div className="relative w-48 h-48 mx-auto mb-6">
                  <svg className="w-full h-full -rotate-90" viewBox="0 0 100 100">
                    <circle cx="50" cy="50" r="42" fill="none" stroke="rgba(34,211,238,0.15)" strokeWidth="6" />
                    <circle
                      cx="50" cy="50" r="42" fill="none" stroke="#22D3EE" strokeWidth="6"
                      strokeDasharray={`${2 * Math.PI * 42}`}
                      strokeDashoffset={`${2 * Math.PI * 42 * (1 - progress / 100)}`}
                      strokeLinecap="round"
                      className="transition-all duration-1000 ease-linear"
                    />
                  </svg>
                  <div className="absolute inset-0 flex items-center justify-center flex-col">
                    <span className="text-5xl font-black font-mono tracking-wider">{formatTime(timer)}</span>
                    <span className="text-xs text-muted mt-1">
                      {PRESETS[selectedPreset!]?.minutes}min
                    </span>
                  </div>
                </div>

                <Button variant="danger" onClick={stopTimer} className="mx-auto">
                  <Square size={16} />
                  Encerrar
                </Button>
              </Card>
            </motion.div>
          )}

          {/* Completed */}
          {completed && (
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
            >
              <Card className="p-8 text-center" glow="green">
                <Trophy size={48} className="text-green mx-auto mb-3" />
                <p className="text-xl font-black mb-1">Foco concluído!</p>
                <p className="text-sm text-muted mb-4">Sessão finalizada com sucesso.</p>
                <div className="flex gap-2 justify-center">
                  <Button onClick={() => { setCompleted(false); setSelectedPreset(null); }}>
                    Nova sessão
                  </Button>
                  <Button variant="secondary" onClick={() => { setCompleted(false); setSelectedPreset(null); }}>
                    Fechar
                  </Button>
                </div>
              </Card>
            </motion.div>
          )}
        </AnimatePresence>

        {/* History */}
        {!running && !completed && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3 }}
          >
            <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-dim mb-3">Histórico</p>
            <Card className="p-4 text-center" glow="none">
              <Clock size={24} className="text-dim mx-auto mb-2" />
              <p className="text-sm text-muted">Suas sessões aparecem aqui.</p>
            </Card>
          </motion.div>
        )}
      </div>
    </div>
  );
}
