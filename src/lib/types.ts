export type UserPlan = "free" | "premium" | "quarterly" | "yearly";
export type UserRole = "user" | "admin";
export type UserStatus = "active" | "blocked";

export interface User {
  id: string;
  name: string;
  email: string;
  plan: UserPlan;
  streak: number;
  role: UserRole;
  status: UserStatus;
  createdAt: Date;
  lastLoginAt?: Date;
  termsAccepted?: boolean;
  photoUrl?: string;
  displayName?: string;
}

export type FocusSession = {
  id: string;
  userId: string;
  duration: number;
  type: "focus" | "break";
  completedAt: Date;
};

export type Goal = {
  id: string;
  userId: string;
  title: string;
  sessionsTarget: number;
  sessionsCompleted: number;
};

export type AIMessage = {
  id: string;
  role: "user" | "assistant";
  content: string;
  imageUrl?: string;
  createdAt: Date;
};

export const PLAN_LABELS: Record<UserPlan, string> = {
  free: "FREE",
  premium: "START",
  quarterly: "PRO",
  yearly: "ULTRA",
};

export const PLAN_POINTS: Record<UserPlan, number> = {
  free: 0,
  premium: 120,
  quarterly: 320,
  yearly: 700,
};

export const PLAN_PRICES: Record<UserPlan, number> = {
  free: 0,
  premium: 14.9,
  quarterly: 34.9,
  yearly: 69.9,
};

export const LEVELS = [
  { name: "Novato", minSessions: 0 },
  { name: "Aprendiz", minSessions: 5 },
  { name: "Dedicado", minSessions: 15 },
  { name: "Expert", minSessions: 30 },
  { name: "Mestre", minSessions: 50 },
  { name: "Lenda", minSessions: 100 },
] as const;
