"use client";

import { useState, useRef, useEffect } from "react";
import { useI18n } from "@/lib/contexts/I18nContext";
import { useAuth } from "@/lib/contexts/AuthContext";
import { useChatMutation } from "@/lib/trpc/client";
import { NeonBackdrop } from "@/components/brand";
import { Card, Button, Spinner, Badge } from "@/components/ui";
import { motion, AnimatePresence } from "framer-motion";
import type { AIMessage } from "@/lib/types";
import { Send, Bot, User, ImagePlus, X, Sparkles } from "lucide-react";
import { toast } from "sonner";

export default function AssistantPage() {
  const { t } = useI18n();
  const { points } = useAuth();
  const chatMutation = useChatMutation();
  const [messages, setMessages] = useState<AIMessage[]>([]);
  const [input, setInput] = useState("");
  const [uploadedImage, setUploadedImage] = useState<string | null>(null);
  const scrollRef = useRef<HTMLDivElement>(null);
  const fileRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    try {
      const saved = localStorage.getItem("vantivo.chat.messages");
      if (saved) setMessages(JSON.parse(saved));
    } catch {}
  }, []);

  useEffect(() => {
    scrollRef.current?.scrollTo({ top: scrollRef.current.scrollHeight, behavior: "smooth" });
  }, [messages]);

  const saveMessages = (msgs: AIMessage[]) => {
    localStorage.setItem("vantivo.chat.messages", JSON.stringify(msgs.slice(-50)));
  };

  const handleSend = async () => {
    if (!input.trim() && !uploadedImage) return;

    const userMsg: AIMessage = {
      id: Date.now().toString(),
      role: "user",
      content: input.trim() || (uploadedImage ? "Analise esta imagem" : ""),
      imageUrl: uploadedImage || undefined,
      createdAt: new Date(),
    };

    const updated = [...messages, userMsg];
    setMessages(updated);
    saveMessages(updated);
    setInput("");
    setUploadedImage(null);

    try {
      // Try chat first
      const result = await chatMutation.mutateAsync({
        action: "chatV2.send",
        input: {
          prompt: userMsg.content,
          images: uploadedImage ? [uploadedImage] : undefined,
        },
      });

      // If AI detects an image request, auto-generate
      let finalContent = result.text || "Pronto!";
      let finalImageUrl = result.imageUrl;

      if (result.text === "image_request" || (!result.text && userMsg.content.toLowerCase().includes("imagem") || userMsg.content.toLowerCase().includes("arte") || userMsg.content.toLowerCase().includes("crie"))) {
        // Auto-generate image
        try {
          const imgResult = await chatMutation.mutateAsync({
            action: "image.generate",
            input: { prompt: userMsg.content },
          });
          if (imgResult.imageUrl) {
            finalImageUrl = imgResult.imageUrl;
            finalContent = imgResult.text || `Imagem gerada: "${userMsg.content}"`;
          }
        } catch {
          finalContent = result.text || "Não consegui gerar a imagem. Tente de novo.";
        }
      }

      const assistantMsg: AIMessage = {
        id: (Date.now() + 1).toString(),
        role: "assistant",
        content: finalContent,
        imageUrl: finalImageUrl,
        createdAt: new Date(),
      };
      };

      const final = [...updated, assistantMsg];
      setMessages(final);
      saveMessages(final);
    } catch (err: any) {
      const errorMsg: AIMessage = {
        id: (Date.now() + 1).toString(),
        role: "assistant",
        content: err?.message || "Erro ao processar. Tente novamente.",
        createdAt: new Date(),
      };
      const final = [...updated, errorMsg];
      setMessages(final);
      saveMessages(final);
    }
  };

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = (ev) => setUploadedImage(ev.target?.result as string);
    reader.readAsDataURL(file);
  };

  return (
    <div className="relative h-screen flex flex-col">
      <NeonBackdrop />
      <div className="relative z-10 flex flex-col h-full">
        {/* Header */}
        <div className="px-4 pt-4 pb-3 border-b border-white/5 bg-bg/80 backdrop-blur-sm">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-dim mb-1">LISBOA IA</p>
              <h1 className="text-xl font-black">Assistente</h1>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-[10px] text-muted">{t("common.pts")}:</span>
              <div className="flex items-center gap-1 bg-purple/10 border border-purple/20 rounded-full px-3 py-1">
                <span className="text-yellow-400 text-xs">⚡</span>
                <span className="text-sm font-bold">{points}</span>
              </div>
            </div>
          </div>
        </div>

        {/* Messages */}
        <div ref={scrollRef} className="flex-1 overflow-y-auto px-4 py-4 space-y-4">
          {messages.length === 0 && (
            <div className="flex flex-col items-center justify-center h-full text-center">
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
              >
                <Bot size={48} className="text-dim mb-4 mx-auto" />
                <p className="text-lg font-bold mb-1">O que você quer criar hoje?</p>
                <p className="text-sm text-muted max-w-xs mx-auto">
                  Peça imagens, ideias, textos, revisões ou só converse. O LISBOA IA está pronto.
                </p>
                <div className="flex flex-wrap gap-2 justify-center mt-6">
                  {["Crie uma arte cyberpunk", "Melhore esta foto", "Ideias para legenda", "O que é IA?"].map((suggestion, i) => (
                    <button
                      key={i}
                      onClick={() => setInput(suggestion)}
                      className="text-xs bg-panel border border-white/10 rounded-full px-3.5 py-1.5 text-muted hover:text-text hover:border-cyan/30 transition-colors"
                    >
                      {suggestion}
                    </button>
                  ))}
                </div>
              </motion.div>
            </div>
          )}

          <AnimatePresence>
            {messages.map((msg) => (
              <motion.div
                key={msg.id}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className={`flex gap-3 ${msg.role === "user" ? "flex-row-reverse" : ""}`}
              >
                <div
                  className={`w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 mt-1 ${
                    msg.role === "user"
                      ? "bg-cyan text-[#050714]"
                      : "bg-purple/20 text-purple border border-purple/30"
                  }`}
                >
                  {msg.role === "user" ? <User size={14} /> : <Bot size={14} />}
                </div>
                <div
                  className={`max-w-[85%] rounded-2xl p-3.5 ${
                    msg.role === "user"
                      ? "bg-cyan/10 border border-cyan/20"
                      : "bg-card border border-white/10"
                  }`}
                >
                  {msg.imageUrl && msg.role === "user" && (
                    <img src={msg.imageUrl} alt="" className="w-32 h-32 object-cover rounded-xl mb-2" />
                  )}
                  <p className="text-sm whitespace-pre-wrap leading-relaxed">{msg.content}</p>
                  {msg.imageUrl && msg.role === "assistant" && (
                    <img
                      src={msg.imageUrl}
                      alt="Generated"
                      className="mt-2 rounded-xl max-w-full cursor-pointer hover:opacity-90 transition-opacity"
                      onClick={() => window.open(msg.imageUrl, "_blank")}
                    />
                  )}
                </div>
              </motion.div>
            ))}
            {chatMutation.isPending && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="flex gap-3"
              >
                <div className="w-8 h-8 rounded-full bg-purple/20 text-purple border border-purple/30 flex items-center justify-center">
                  <Bot size={14} />
                </div>
                <div className="rounded-2xl p-4 bg-card border border-white/10">
                  <div className="flex gap-1">
                    <span className="w-2 h-2 rounded-full bg-cyan animate-bounce" style={{ animationDelay: "0s" }} />
                    <span className="w-2 h-2 rounded-full bg-cyan animate-bounce" style={{ animationDelay: "0.2s" }} />
                    <span className="w-2 h-2 rounded-full bg-cyan animate-bounce" style={{ animationDelay: "0.4s" }} />
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Input */}
        <div className="px-4 pb-4 pt-2 border-t border-white/5 bg-bg/80 backdrop-blur-sm">
          {uploadedImage && (
            <div className="relative w-16 h-16 mb-2">
              <img src={uploadedImage} alt="" className="w-full h-full object-cover rounded-xl border border-cyan/30" />
              <button
                onClick={() => setUploadedImage(null)}
                className="absolute -top-2 -right-2 w-5 h-5 rounded-full bg-red/80 text-white flex items-center justify-center"
              >
                <X size={10} />
              </button>
            </div>
          )}
          <div className="flex gap-2 items-end">
            <button
              onClick={() => fileRef.current?.click()}
              className="w-11 h-11 rounded-2xl bg-panel border border-white/10 flex items-center justify-center text-dim hover:text-text hover:border-cyan/30 transition-all flex-shrink-0"
            >
              <ImagePlus size={18} />
            </button>
            <input ref={fileRef} type="file" accept="image/*" className="hidden" onChange={handleImageUpload} />
            <div className="flex-1 relative">
              <input
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && !e.shiftKey && (e.preventDefault(), handleSend())}
                placeholder="Digite sua mensagem..."
                className="w-full bg-panel border border-white/10 rounded-2xl px-4 py-3 pr-12 text-sm text-text placeholder:text-dim focus:outline-none focus:border-cyan/50 transition-colors"
              />
            </div>
            <button
              onClick={handleSend}
              disabled={(!input.trim() && !uploadedImage) || chatMutation.isPending}
              className="w-11 h-11 rounded-2xl bg-cyan text-[#050714] flex items-center justify-center disabled:opacity-40 hover:bg-cyan/90 transition-all flex-shrink-0 shadow-[0_0_15px_rgba(34,211,238,0.2)]"
            >
              {chatMutation.isPending ? <Spinner className="h-4 w-4" /> : <Send size={18} />}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
