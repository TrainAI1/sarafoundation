import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { useNavigate } from "react-router-dom";

export type AdminRole = "admin" | "editor" | "moderator";

export interface AdminContext {
  loading: boolean;
  userId: string | null;
  email: string | null;
  roles: AdminRole[];
  isAdmin: boolean;
  canEditContent: boolean;
  canModerate: boolean;
  canManageUsers: boolean;
}

const EMPTY: AdminContext = {
  loading: true,
  userId: null,
  email: null,
  roles: [],
  isAdmin: false,
  canEditContent: false,
  canModerate: false,
  canManageUsers: false,
};

export function useAdmin(): AdminContext {
  const [ctx, setCtx] = useState<AdminContext>(EMPTY);
  const navigate = useNavigate();

  useEffect(() => {
    let cancelled = false;

    const check = async () => {
      const { data: { session } } = await supabase.auth.getSession();
      if (!session) {
        navigate("/admin/login");
        return;
      }
      const userId = session.user.id;
      const email = session.user.email ?? null;

      const [{ data: isAdminData }, { data: rolesData }] = await Promise.all([
        supabase.rpc("is_admin"),
        supabase.from("user_roles").select("role").eq("user_id", userId),
      ]);

      const isAdmin = Boolean(isAdminData);
      const roles = ((rolesData ?? []) as { role: string }[])
        .map((r) => r.role as AdminRole)
        .filter((r) => ["admin", "editor", "moderator"].includes(r));

      // Admin email fallback (matches is_admin() DB logic) — still ensure role list shows admin
      if (isAdmin && !roles.includes("admin")) roles.push("admin");

      const canEditContent = isAdmin || roles.includes("editor");
      const canModerate = isAdmin || roles.includes("moderator");

      if (!isAdmin && !canEditContent && !canModerate) {
        await supabase.auth.signOut();
        navigate("/admin/login");
        return;
      }

      if (!cancelled) {
        setCtx({
          loading: false,
          userId,
          email,
          roles,
          isAdmin,
          canEditContent,
          canModerate,
          canManageUsers: isAdmin,
        });
      }
    };

    const { data: { subscription } } = supabase.auth.onAuthStateChange((event) => {
      if (event === "SIGNED_OUT") navigate("/admin/login");
    });

    check();
    return () => {
      cancelled = true;
      subscription.unsubscribe();
    };
  }, [navigate]);

  return ctx;
}
