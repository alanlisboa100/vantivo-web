import { createClient } from "@/lib/supabase/client";

export interface SaveProjectInput {
  type: string;
  title: string;
  description?: string;
  imageUrl?: string;
}

export function saveProjectToLocal(input: SaveProjectInput) {
  try {
    const raw = localStorage.getItem("vantivo.projects.v1");
    const projects = raw ? JSON.parse(raw) : [];

    const newProject = {
      id: `${Date.now()}-${Math.random().toString(36).slice(2, 8)}`,
      title: input.title.slice(0, 100),
      description: input.description?.slice(0, 200) || "",
      imageUrl: input.imageUrl || "",
      type: input.type,
      favorited: false,
      createdAt: new Date().toISOString(),
    };

    projects.unshift(newProject);
    localStorage.setItem("vantivo.projects.v1", JSON.stringify(projects.slice(0, 100)));
    return newProject;
  } catch {
    return null;
  }
}

export async function saveProjectToSupabase(input: SaveProjectInput, userId: string) {
  if (!userId) return;
  try {
    const supabase = createClient();
    await supabase.from("vantivo_projects").insert({
      user_id: userId,
      title: input.title.slice(0, 100),
      description: input.description?.slice(0, 200) || "",
      image_url: input.imageUrl || "",
      type: input.type || "image",
      created_at: new Date().toISOString(),
    });
  } catch {
    // Silently fail - localStorage is the fallback
  }
}

export function saveProject(input: SaveProjectInput) {
  const saved = saveProjectToLocal(input);

  // Try Supabase async (don't await)
  try {
    const supabase = createClient();
    supabase.auth.getSession().then(({ data: { session } }) => {
      if (session?.user?.id) {
        saveProjectToSupabase(input, session.user.id);
      }
    });
  } catch {}

  return saved;
}
