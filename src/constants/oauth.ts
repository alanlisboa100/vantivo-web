export const SUPABASE_URL =
  process.env.NEXT_PUBLIC_SUPABASE_URL ||
  "https://frcnaraherfzduyvqqxf.supabase.co";
export const SUPABASE_ANON_KEY =
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || "";
export const AI_ROUTER_URL =
  process.env.NEXT_PUBLIC_VANTIVO_AI_ROUTER_URL ||
  `${SUPABASE_URL}/functions/v1/vantivo-ai-router`;
export const ADMIN_EMAIL = (
  process.env.NEXT_PUBLIC_ADMIN_EMAIL || "alanlisboapires@gmail.com"
).toLowerCase();
export const SITE_URL =
  process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000";
export const AI_TIMEOUT_MS = 150_000;
