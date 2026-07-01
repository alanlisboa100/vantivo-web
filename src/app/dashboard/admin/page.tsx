"use client";

import { useState, useEffect } from "react";
import { useAuth } from "@/lib/contexts/AuthContext";
import { useI18n } from "@/lib/contexts/I18nContext";
import { createClient } from "@/lib/supabase/client";
import { NeonBackdrop } from "@/components/brand";
import { Card, Button, Input, Badge, Spinner } from "@/components/ui";
import { motion } from "framer-motion";
import { toast } from "sonner";
import { Shield } from "lucide-react";

export default function AdminPage() {
  const { user } = useAuth();
  const { t } = useI18n();
  const [users, setUsers] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadUsers();
  }, []);

  const loadUsers = async () => {
    setLoading(true);
    try {
      const supabase = createClient();
      const { data } = await supabase
        .from("profiles")
        .select("*")
        .order("created_at", { ascending: false });
      if (data) setUsers(data);
    } catch (err) {
      toast.error("Erro ao carregar usuários");
    } finally {
      setLoading(false);
    }
  };

  const updatePlan = async (userId: string, plan: string) => {
    try {
      const supabase = createClient();
      await supabase.from("profiles").update({ plan }).eq("id", userId);
      toast.success("Plano atualizado!");
      loadUsers();
    } catch {
      toast.error("Erro ao atualizar");
    }
  };

  const updatePoints = async (userId: string, points: number) => {
    try {
      const supabase = createClient();
      await supabase.from("profiles").update({ points }).eq("id", userId);
      toast.success("Pontos atualizados!");
      loadUsers();
    } catch {
      toast.error("Erro ao atualizar");
    }
  };

  if (user?.role !== "admin") {
    return (
      <div className="min-h-screen flex items-center justify-center p-4">
        <Card className="p-8 text-center" glow="none">
          <Shield size={40} className="text-red mx-auto mb-3" />
          <p className="text-lg font-bold mb-2">Acesso restrito</p>
          <p className="text-sm text-muted">Você não tem permissão para acessar esta página.</p>
        </Card>
      </div>
    );
  }

  return (
    <div className="relative min-h-screen">
      <NeonBackdrop />
      <div className="relative z-10 px-4 pt-4 pb-32">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h1 className="text-2xl font-black">Admin</h1>
            <p className="text-sm text-muted">Gerenciar usuários</p>
          </div>
          <Badge color="purple">ADMIN</Badge>
        </div>

        {loading ? (
          <div className="flex justify-center py-12">
            <Spinner />
          </div>
        ) : (
          <div className="space-y-3">
            {users.map((u: any) => (
              <motion.div
                key={u.id}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
              >
                <Card className="p-4" glow="none">
                  <div className="flex items-center justify-between mb-3">
                    <div>
                      <p className="font-bold text-sm">{u.full_name || u.email}</p>
                      <p className="text-xs text-muted">{u.email}</p>
                    </div>
                    <div className="flex gap-1">
                      <Badge color={u.plan === "yearly" ? "green" : u.plan === "quarterly" ? "cyan" : "amber"}>
                        {u.plan}
                      </Badge>
                      <Badge color={u.status === "active" ? "green" : "red"}>
                        {u.status}
                      </Badge>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-xs text-muted">⚡ {u.points || 0} pts</span>
                    <select
                      value={u.plan || "free"}
                      onChange={(e) => updatePlan(u.id, e.target.value)}
                      className="text-xs bg-panel border border-white/10 rounded-lg px-2 py-1 text-text"
                    >
                      <option value="free">Free</option>
                      <option value="premium">Start</option>
                      <option value="quarterly">Pro</option>
                      <option value="yearly">Ultra</option>
                    </select>
                    <input
                      type="number"
                      defaultValue={u.points || 0}
                      className="w-20 text-xs bg-panel border border-white/10 rounded-lg px-2 py-1 text-text"
                      onBlur={(e) => {
                        const val = parseInt(e.target.value);
                        if (!isNaN(val) && val !== u.points) updatePoints(u.id, val);
                      }}
                    />
                  </div>
                </Card>
              </motion.div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
