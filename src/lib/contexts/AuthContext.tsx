"use client";

import {
  createContext,
  useContext,
  useEffect,
  useState,
  useCallback,
  type ReactNode,
} from "react";
import { createClient } from "@/lib/supabase/client";
import type { User } from "@/lib/types";
import { ADMIN_EMAIL } from "@/constants/oauth";
import type { Session } from "@supabase/supabase-js";

interface AuthContextType {
  user: User | null;
  session: Session | null;
  points: number;
  isAuthenticated: boolean;
  isLoading: boolean;
  login: (email: string, password: string) => Promise<void>;
  signup: (name: string, email: string, password: string) => Promise<void>;
  logout: () => Promise<void>;
  loginWithGoogle: () => Promise<void>;
  refreshProfile: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType>({} as AuthContextType);

function mapUser(supabaseUser: any, profile: any): User {
  const isAdmin = supabaseUser?.email?.toLowerCase() === ADMIN_EMAIL;
  return {
    id: supabaseUser?.id || profile?.id || "",
    name: profile?.full_name || supabaseUser?.user_metadata?.name || "",
    email: supabaseUser?.email || "",
    plan: isAdmin ? "yearly" : profile?.plan || "free",
    streak: profile?.streak || 0,
    role: isAdmin ? "admin" : profile?.role || "user",
    status: profile?.status || "active",
    createdAt: new Date(profile?.created_at || Date.now()),
    photoUrl: profile?.photo_url || "",
    coverUrl: profile?.cover_url || "",
    displayName: profile?.display_name || profile?.full_name || "",
  };
}

export function AuthProvider({ children }: { children: ReactNode }) {
  const supabase = useCallback(() => createClient(), []);
  const [user, setUser] = useState<User | null>(null);
  const [session, setSession] = useState<Session | null>(null);
  const [points, setPoints] = useState(0);
  const [isLoading, setIsLoading] = useState(true);

  const refreshProfile = useCallback(async () => {
    const {
      data: { session: s },
    } = await supabase().auth.getSession();
    if (!s?.user) return;

    const { data: profile } = await supabase()
      .from("profiles")
      .select("*")
      .eq("id", s.user.id)
      .maybeSingle();

    const isAdmin = s.user.email?.toLowerCase() === ADMIN_EMAIL;

    if (!profile) {
      const { data: newProfile } = await supabase()
        .from("profiles")
        .upsert({
          id: s.user.id,
          email: s.user.email,
          full_name: s.user.user_metadata?.name || "",
          points: isAdmin ? 9999 : 0,
          plan: isAdmin ? "yearly" : "free",
          status: "active",
        })
        .select()
        .single();

      if (newProfile) {
        setPoints(newProfile.points || 0);
        setUser(mapUser(s.user, newProfile));
        localStorage.setItem("vantivo.points.wallet.v2", String(newProfile.points || 0));
      }
      return;
    }

    if (isAdmin && (profile.points < 9999 || profile.plan !== "yearly")) {
      await supabase()
        .from("profiles")
        .update({ points: 9999, plan: "yearly", status: "active" })
        .eq("id", s.user.id);
      profile.points = 9999;
      profile.plan = "yearly";
    }

    setPoints(profile.points || 0);
    setUser(mapUser(s.user, profile));
    localStorage.setItem("vantivo.points.wallet.v2", String(profile.points || 0));
  }, [supabase]);

  useEffect(() => {
    let mounted = true;

    supabase()
      .auth.getSession()
      .then(({ data: { session: s } }) => {
        if (!mounted) return;
        setSession(s);
        if (s) {
          refreshProfile().finally(() => setIsLoading(false));
        } else {
          setIsLoading(false);
        }
      });

    const {
      data: { subscription },
    } = supabase().auth.onAuthStateChange((_event, s) => {
      if (!mounted) return;
      setSession(s);
      if (s) refreshProfile();
      else {
        setUser(null);
        setPoints(0);
      }
    });

    return () => {
      mounted = false;
      subscription.unsubscribe();
    };
  }, [supabase, refreshProfile]);

  const login = useCallback(
    async (email: string, password: string) => {
      const { error } = await supabase().auth.signInWithPassword({ email, password });
      if (error) throw error;
    },
    [supabase]
  );

  const signup = useCallback(
    async (name: string, email: string, password: string) => {
      const { error } = await supabase().auth.signUp({
        email,
        password,
        options: { data: { name, plan: "free" } },
      });
      if (error) throw error;
    },
    [supabase]
  );

  const logout = useCallback(async () => {
    await supabase().auth.signOut();
    setUser(null);
    setSession(null);
    setPoints(0);
  }, [supabase]);

  const loginWithGoogle = useCallback(async () => {
    const { error } = await supabase().auth.signInWithOAuth({
      provider: "google",
      options: { redirectTo: `${window.location.origin}/callback` },
    });
    if (error) throw error;
  }, [supabase]);

  return (
    <AuthContext.Provider
      value={{
        user,
        session,
        points,
        isAuthenticated: !!session,
        isLoading,
        login,
        signup,
        logout,
        loginWithGoogle,
        refreshProfile,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => useContext(AuthContext);
