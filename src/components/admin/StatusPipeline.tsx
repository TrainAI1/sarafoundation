import { Check, Clock, FileSearch, Star, ThumbsDown } from "lucide-react";
import { cn } from "@/lib/utils";

export const APPLICATION_STATUSES = [
  { key: "new", label: "New", icon: Clock, color: "text-muted-foreground" },
  { key: "review", label: "In Review", icon: FileSearch, color: "text-primary" },
  { key: "shortlisted", label: "Shortlisted", icon: Star, color: "text-accent" },
  { key: "accepted", label: "Accepted", icon: Check, color: "text-[hsl(var(--success))]" },
  { key: "rejected", label: "Rejected", icon: ThumbsDown, color: "text-destructive" },
] as const;

export type ApplicationStatus = typeof APPLICATION_STATUSES[number]["key"];

export function statusBadge(status: string | null | undefined) {
  const s = APPLICATION_STATUSES.find((x) => x.key === status) ?? APPLICATION_STATUSES[0];
  return (
    <span className={cn("inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-xs font-medium bg-secondary", s.color)}>
      <s.icon className="w-3 h-3" />
      {s.label}
    </span>
  );
}

interface Props {
  current: string | null | undefined;
  onChange: (status: ApplicationStatus) => void;
  disabled?: boolean;
}

export default function StatusPipeline({ current, onChange, disabled }: Props) {
  return (
    <div className="flex flex-wrap gap-1.5">
      {APPLICATION_STATUSES.map((s) => {
        const active = current === s.key;
        return (
          <button
            key={s.key}
            disabled={disabled}
            onClick={() => onChange(s.key)}
            className={cn(
              "inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-medium transition-colors border",
              active
                ? "bg-primary text-primary-foreground border-primary"
                : "bg-card border-border text-muted-foreground hover:text-foreground hover:border-primary/40",
              disabled && "opacity-50 cursor-not-allowed"
            )}
          >
            <s.icon className="w-3 h-3" />
            {s.label}
          </button>
        );
      })}
    </div>
  );
}