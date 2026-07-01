"use client";

import { createBrowserClient } from "@supabase/ssr";
import { SUPABASE_URL, SUPABASE_ANON_KEY } from "@/constants/oauth";

export const createClient = () =>
  createBrowserClient(SUPABASE_URL, SUPABASE_ANON_KEY);
