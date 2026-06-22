import { Button } from "@/components/ui/button";
import { Download, Trash2, X, Tag } from "lucide-react";
import {
  DropdownMenu, DropdownMenuTrigger, DropdownMenuContent, DropdownMenuItem,
} from "@/components/ui/dropdown-menu";
import { APPLICATION_STATUSES } from "@/components/admin/StatusPipeline";

interface Props {
  count: number;
  onClear: () => void;
  onExport?: () => void;
  onDelete?: () => void;
  onStatusChange?: (status: string) => void;
}

export default function BulkActionsBar({ count, onClear, onExport, onDelete, onStatusChange }: Props) {
  if (count === 0) return null;
  return (
    <div className="sticky top-14 lg:top-0 z-10 mb-4 flex flex-wrap items-center gap-2 bg-card border border-primary/30 shadow-md rounded-xl px-4 py-2">
      <span className="text-sm font-semibold text-foreground">{count} selected</span>
      <div className="flex-1" />
      {onStatusChange && (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button size="sm" variant="outline" className="gap-1.5"><Tag className="w-3.5 h-3.5" /> Set Status</Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            {APPLICATION_STATUSES.map((s) => (
              <DropdownMenuItem key={s.key} onClick={() => onStatusChange(s.key)}>
                <s.icon className="w-3.5 h-3.5 mr-2" /> {s.label}
              </DropdownMenuItem>
            ))}
          </DropdownMenuContent>
        </DropdownMenu>
      )}
      {onExport && (
        <Button size="sm" variant="outline" onClick={onExport} className="gap-1.5">
          <Download className="w-3.5 h-3.5" /> Export CSV
        </Button>
      )}
      {onDelete && (
        <Button size="sm" variant="outline" onClick={onDelete} className="gap-1.5 text-destructive hover:text-destructive">
          <Trash2 className="w-3.5 h-3.5" /> Delete
        </Button>
      )}
      <Button size="sm" variant="ghost" onClick={onClear} className="gap-1">
        <X className="w-3.5 h-3.5" /> Clear
      </Button>
    </div>
  );
}