"use client";

import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createClient } from "@/lib/supabase/client";
import { AI_ROUTER_URL, SUPABASE_ANON_KEY } from "@/constants/oauth";
import type { AIMessage } from "@/lib/types";

interface AiMutationInput {
  action: string;
  input: Record<string, unknown>;
}

interface AiMutationResult {
  ok: boolean;
  imageUrl?: string;
  text?: string;
  finalBalance?: number;
  error?: string;
}

function parseImageUrl(result: any): string | undefined {
  if (typeof result === "string") return result;
  return (
    result?.imageUrl ||
    result?.image_url ||
    result?.url ||
    result?.image ||
    result?.output?.[0] ||
    result?.data?.output ||
    result?.data?.url
  );
}

export function useAiMutation() {
  const queryClient = useQueryClient();

  return useMutation<AiMutationResult, Error, AiMutationInput>({
    mutationFn: async ({ action, input }) => {
      const supabase = createClient();
      const { data: { session } } = await supabase.auth.getSession();
      if (!session?.access_token) throw new Error("Sessão expirada.");

      const controller = new AbortController();
      const timeout = setTimeout(() => controller.abort(), 150_000);

      try {
        const res = await fetch(AI_ROUTER_URL, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            apikey: SUPABASE_ANON_KEY,
            Authorization: `Bearer ${session.access_token}`,
          },
          body: JSON.stringify({ action, input }),
          signal: controller.signal,
        });

        const data = await res.json();
        if (!res.ok) throw new Error(data?.error || `Erro ${res.status}`);

        const result: AiMutationResult = {
          ok: true,
          imageUrl: parseImageUrl(data),
          text: data?.text || data?.message || data?.response || "",
          finalBalance: data?.finalBalance || data?.final_balance,
        };

        if (result.finalBalance !== undefined) {
          localStorage.setItem("vantivo.points.wallet.v2", String(result.finalBalance));
          queryClient.setQueryData(["points"], result.finalBalance);
        }

        return result;
      } finally {
        clearTimeout(timeout);
      }
    },
  });
}

/**
 * Generates an AI chat message.
 */
export function useChatMutation() {
  return useAiMutation();
}

/**
 * Generates an image via the AI router.
 */
export function useImageGenerationMutation() {
  const mutation = useAiMutation();
  return {
    ...mutation,
    generate: (prompt: string, options?: Record<string, unknown>) =>
      mutation.mutateAsync({
        action: "image.generate",
        input: { prompt, ...options },
      }),
  };
}
