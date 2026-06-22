import { useCallback } from "react";
import { supabase } from "@/integrations/supabase/client";
import { useAdmin } from "@/hooks/useAdmin";

export interface AuditEntry {
  action: string;
  entity?: string;
  entity_id?: string;
  summary?: string;
  metadata?: Record<string, unknown>;
}

export function useAuditLog() {
  const { userId, email } = useAdmin();

  const log = useCallback(
    async (entry: AuditEntry) => {
      if (!userId) return;
      try {
        await supabase.from("admin_audit_log").insert({
          actor_id: userId,
          actor_email: email,
          action: entry.action,
          entity: entry.entity ?? null,
          entity_id: entry.entity_id ?? null,
          summary: entry.summary ?? null,
          metadata: (entry.metadata ?? {}) as never,
        });
      } catch {
        // best-effort; never block UI
      }
    },
    [userId, email]
  );

  return { log };
}