"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { LogoWordmark, NeonBackdrop, PremiumBadge } from "@/components/brand";
import { Button, Card } from "@/components/ui";
import { Sparkles, Image, Camera, Palette, Brain, Clock, ChevronDown } from "lucide-react";
import { useState } from "react";

const FEATURES = [
  { icon: <Sparkles size={24} />, title: "Geração de Imagens", desc: "Crie artes profissionais com IA em segundos. Descreva o que quer ver e pronto." },
  { icon: <Camera size={24} />, title: "Editor de Fotos", desc: "Melhore, edite corpo, troque roupa, mude ângulos — tudo com comandos simples." },
  { icon: <Image size={24} />, title: "Capas & Anúncios", desc: "Design pronto para YouTube, Instagram e TikTok. Sem precisar de Photoshop." },
  { icon: <Palette size={24} />, title: "Anime Studio", desc: "Transforme selfies em arte anime com estilos como Ghibli, Shoujo e Cyberpunk." },
  { icon: <Brain size={24} />, title: "Assistente IA", desc: "Converse, peça ideias de legenda, revise textos e crie conteúdo." },
  { icon: <Clock size={24} />, title: "Modo Foco", desc: "Timer pomodoro inteligente com metas, streaks e gamificação." },
];

const FAQ = [
  { q: "Preciso baixar algum aplicativo?", a: "Não! A versão web funciona direto no navegador. Também temos app nativo para Android." },
  { q: "Como funcionam os pontos?", a: "Cada ação (gerar imagem, editar foto, conversar) gasta pontos. Você ganha pontos ao assinar um plano ou comprar pacotes extras." },
  { q: "Posso testar antes de pagar?", a: "Sim! Crie uma conta gratuita e explore o Studio. Alguns recursos são liberados para teste." },
  { q: "Minhas criações ficam salvas?", a: "Sim, tudo fica salvo automaticamente no seu histórico e pode ser acessado de qualquer dispositivo." },
  { q: "Qual a diferença entre os planos?", a: "A diferença é a quantidade de pontos por mês. Quanto mais pontos, mais criações você pode fazer." },
  { q: "O LISBOA funciona em inglês também?", a: "Sim! O suporte é completo em português e inglês. Você alterna no perfil." },
];

export default function LandingPage() {
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  return (
    <div className="relative min-h-screen bg-bg overflow-hidden">
      <NeonBackdrop />

      {/* Nav */}
      <nav className="relative z-20 flex items-center justify-between px-6 py-4 max-w-6xl mx-auto">
        <LogoWordmark size={28} />
        <div className="flex items-center gap-2">
          <Link href="/login">
            <Button variant="ghost" size="sm">Entrar</Button>
          </Link>
          <Link href="/signup">
            <Button size="sm">Criar conta</Button>
          </Link>
        </div>
      </nav>

      {/* Hero */}
      <section className="relative z-20 max-w-6xl mx-auto px-6 pt-20 pb-24 text-center">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.2 }}
          >
            <PremiumBadge className="mb-5">Estúdio Criativo com IA</PremiumBadge>
          </motion.div>

          <h1 className="text-5xl md:text-7xl font-black leading-[1.05] mb-5">
            Transforme ideias em{" "}
            <span className="bg-gradient-to-r from-purple via-cyan to-blue bg-clip-text text-transparent">
              artes profissionais
            </span>
          </h1>
          <p className="text-lg text-muted max-w-2xl mx-auto mb-8 leading-relaxed">
            Crie, edite e transforme imagens com IA premium. Capas, anúncios, anime, avatar animado, editor de fotos e muito mais — tudo em um só lugar, sem complicação.
          </p>
          <motion.div
            className="flex items-center justify-center gap-3 flex-wrap"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
          >
            <Link href="/signup">
              <Button size="lg" className="text-base px-8 py-4 shadow-[0_0_30px_rgba(34,211,238,0.3)]">
                Começar grátis
              </Button>
            </Link>
            <Link href="/login">
              <Button variant="secondary" size="lg" className="text-base px-8 py-4">
                Já tenho conta
              </Button>
            </Link>
          </motion.div>
        </motion.div>

        {/* Scroll indicator */}
        <motion.div
          className="mt-16 text-dim"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1, y: [0, 8, 0] }}
          transition={{ delay: 0.8, y: { duration: 2, repeat: Infinity } }}
        >
          <ChevronDown size={24} className="mx-auto" />
        </motion.div>
      </section>

      {/* Features */}
      <section className="relative z-20 max-w-6xl mx-auto px-6 pb-24">
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true, margin: "-100px" }}
          className="text-center mb-14"
        >
          <PremiumBadge className="mb-4">Ferramentas</PremiumBadge>
          <h2 className="text-4xl font-black mb-3">Tudo que você precisa para criar</h2>
          <p className="text-muted max-w-xl mx-auto">
            Do rascunho à arte final — ferramentas premium pra criar, editar e transformar.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {FEATURES.map((feature, i) => (
            <motion.div
              key={feature.title}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ delay: i * 0.08 }}
            >
              <Card className="p-6 h-full group hover:border-cyan/20 transition-all duration-300" glow="none">
                <div className="w-10 h-10 rounded-xl bg-cyan/10 text-cyan flex items-center justify-center mb-4 group-hover:bg-cyan/20 transition-colors">
                  {feature.icon}
                </div>
                <h3 className="text-lg font-bold mb-2">{feature.title}</h3>
                <p className="text-sm text-muted leading-relaxed">{feature.desc}</p>
              </Card>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Plans */}
      <section className="relative z-20 max-w-6xl mx-auto px-6 pb-24">
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true, margin: "-100px" }}
          className="text-center mb-14"
        >
          <PremiumBadge className="mb-4">Preços</PremiumBadge>
          <h2 className="text-4xl font-black mb-3">Planos simples e transparentes</h2>
          <p className="text-muted">Escolha o plano ideal para o seu ritmo de criação.</p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-5 max-w-4xl mx-auto">
          {[
            { name: "Start", price: "R$ 14,90", pts: "120 pts/mês", highlight: false, color: "purple" },
            { name: "Pro", price: "R$ 34,90", pts: "320 pts/mês", highlight: true, color: "cyan" },
            { name: "Ultra", price: "R$ 69,90", pts: "700 pts/mês", highlight: false, color: "green" },
          ].map((plan, i) => (
            <motion.div
              key={plan.name}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
            >
              <Card
                className={`p-6 text-center relative h-full ${
                  plan.highlight
                    ? "border-cyan/40 shadow-[0_0_40px_rgba(34,211,238,0.12)] scale-105 md:scale-110"
                    : ""
                }`}
                glow={plan.highlight ? "cyan" : "none"}
              >
                {plan.highlight && (
                  <div className="absolute -top-3 left-1/2 -translate-x-1/2">
                    <PremiumBadge>Mais usado</PremiumBadge>
                  </div>
                )}
                <div className="mt-4">
                  <h3 className="text-xl font-black mb-1">{plan.name}</h3>
                  <p className="text-4xl font-black mb-1">{plan.price}</p>
                  <p className="text-sm text-muted mb-6">/mês · {plan.pts}</p>
                  <Link href="/signup">
                    <Button variant={plan.highlight ? "primary" : "secondary"} className="w-full">
                      Assinar {plan.name}
                    </Button>
                  </Link>
                </div>
              </Card>
            </motion.div>
          ))}
        </div>
      </section>

      {/* FAQ */}
      <section className="relative z-20 max-w-3xl mx-auto px-6 pb-24">
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true, margin: "-100px" }}
          className="text-center mb-12"
        >
          <PremiumBadge className="mb-4">FAQ</PremiumBadge>
          <h2 className="text-3xl font-black mb-3">Perguntas frequentes</h2>
        </motion.div>

        <div className="space-y-3">
          {FAQ.map((item, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.05 }}
            >
              <button
                onClick={() => setOpenFaq(openFaq === i ? null : i)}
                className="w-full text-left"
              >
                <Card className={`p-4 transition-all ${openFaq === i ? "border-cyan/20" : ""}`} glow="none">
                  <div className="flex items-center justify-between">
                    <span className="font-bold text-sm">{item.q}</span>
                    <ChevronDown
                      size={16}
                      className={`text-dim transition-transform ${openFaq === i ? "rotate-180" : ""}`}
                    />
                  </div>
                  {openFaq === i && (
                    <motion.p
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: "auto" }}
                      className="text-sm text-muted mt-3 leading-relaxed"
                    >
                      {item.a}
                    </motion.p>
                  )}
                </Card>
              </button>
            </motion.div>
          ))}
        </div>
      </section>

      {/* CTA final */}
      <section className="relative z-20 max-w-3xl mx-auto px-6 pb-24 text-center">
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
        >
          <Card className="p-10" glow="cyan">
            <h2 className="text-3xl font-black mb-3">Pronto para criar?</h2>
            <p className="text-muted mb-6 max-w-md mx-auto">
              Junte-se a milhares de criadores que já transformam suas ideias em arte com IA.
            </p>
            <Link href="/signup">
              <Button size="lg" className="text-base px-10 py-4">
                Criar conta gratuita
              </Button>
            </Link>
          </Card>
        </motion.div>
      </section>

      {/* Footer */}
      <footer className="relative z-20 border-t border-white/5 py-8 text-center">
        <div className="max-w-6xl mx-auto px-6">
          <LogoWordmark size={20} className="justify-center mb-3" />
          <p className="text-sm text-dim">
            © 2026 LISBOA. Todos os direitos reservados.
          </p>
        </div>
      </footer>
    </div>
  );
}
