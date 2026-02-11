import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "sonner";
import { Plus, Trash2, Save, Users, Edit } from "lucide-react";

interface TeamMember {
  id: number;
  name: string;
  role: string;
  bio: string;
  photo: string;
  type: "core" | "advisor";
}

const defaultTeam: TeamMember[] = [
  { id: 1, name: "Kalu Sarah", role: "Founder", bio: "Has worked with Goldman Sachs, Bloomberg, and Blackaion Capital.", photo: "", type: "core" },
  { id: 2, name: "Inem Emmanuel", role: "Public Relations Specialist", bio: "Grew social media reach to 5,365+ followers.", photo: "", type: "core" },
  { id: 3, name: "Emediong Joel", role: "Program Manager", bio: "Expanded CAP to 35+ universities across 7 countries.", photo: "", type: "core" },
  { id: 4, name: "Toby Nwanede", role: "3-time Startup Founder", bio: "Partner at PIF; Founded Scintilla Innovations.", photo: "", type: "advisor" },
  { id: 5, name: "Ayoola Ademoye", role: "Business Strategy", bio: "Over 12 years of experience.", photo: "", type: "advisor" },
  { id: 6, name: "Dolapo Dahunsi", role: "HR Leader", bio: "People Operations Specialist at GE.", photo: "", type: "advisor" },
  { id: 7, name: "Fisayo Adeyemi", role: "Business Analysis", bio: "Founder of Rayne Consults.", photo: "", type: "advisor" },
  { id: 8, name: "Mercy Momah", role: "PMO Consultant", bio: "Head, PMO at Flour Mills of Nigeria.", photo: "", type: "advisor" },
  { id: 9, name: "Ayodeji Babatunde", role: "Venture Capital", bio: "Secured $2.3M for tech startups.", photo: "", type: "advisor" },
];

export default function AdminTeam() {
  const [team, setTeam] = useState<TeamMember[]>(defaultTeam);
  const [editing, setEditing] = useState<number | null>(null);
  const [filterType, setFilterType] = useState<"all" | "core" | "advisor">("all");

  const addNew = (type: "core" | "advisor") => {
    const newId = Math.max(...team.map((m) => m.id), 0) + 1;
    const member: TeamMember = { id: newId, name: "", role: "", bio: "", photo: "", type };
    setTeam([...team, member]);
    setEditing(newId);
  };

  const updateField = (id: number, field: keyof TeamMember, value: string) => {
    setTeam((prev) => prev.map((m) => (m.id === id ? { ...m, [field]: value } : m)));
  };

  const remove = (id: number) => {
    if (!confirm("Remove this team member?")) return;
    setTeam((prev) => prev.filter((m) => m.id !== id));
    toast.success("Team member removed");
  };

  const save = () => {
    toast.success("Team saved! (Note: Currently stored locally. Database integration coming soon.)");
    setEditing(null);
  };

  const coreTeam = team.filter((m) => m.type === "core");
  const advisors = team.filter((m) => m.type === "advisor");
  const filtered = filterType === "all" ? team : team.filter((m) => m.type === filterType);

  return (
    <div>
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 mb-6">
        <div>
          <h1 className="font-display text-xl md:text-2xl font-bold text-foreground">Team Members</h1>
          <p className="text-sm text-muted-foreground">{coreTeam.length} core · {advisors.length} advisors</p>
        </div>
        <div className="flex gap-2">
          <Button size="sm" variant="outline" onClick={() => addNew("advisor")}><Plus className="w-3 h-3 mr-1" /> Advisor</Button>
          <Button size="sm" onClick={() => addNew("core")}><Plus className="w-3 h-3 mr-1" /> Core Member</Button>
        </div>
      </div>

      {/* Filter */}
      <div className="flex gap-1 mb-4">
        {(["all", "core", "advisor"] as const).map((f) => (
          <button
            key={f}
            onClick={() => setFilterType(f)}
            className={`px-3 py-1.5 rounded-lg text-xs font-medium capitalize transition-colors ${
              filterType === f ? "bg-primary text-primary-foreground" : "bg-secondary text-muted-foreground hover:text-foreground"
            }`}
          >
            {f === "all" ? `All (${team.length})` : f === "core" ? `Core (${coreTeam.length})` : `Advisors (${advisors.length})`}
          </button>
        ))}
      </div>

      <div className="space-y-2">
        {filtered.map((m) => (
          <div key={m.id} className="card-modern overflow-hidden">
            <div className="p-3 md:p-4 flex items-center justify-between gap-3 cursor-pointer" onClick={() => setEditing(editing === m.id ? null : m.id)}>
              <div className="flex items-center gap-3 min-w-0">
                <div className="w-10 h-10 rounded-full bg-gradient-to-br from-primary/20 to-accent/20 flex items-center justify-center flex-shrink-0">
                  <span className="text-xs font-bold text-primary">{m.name.split(" ").map((n) => n[0]).join("").slice(0, 2)}</span>
                </div>
                <div className="min-w-0">
                  <p className="font-medium text-foreground text-sm truncate">{m.name || "New Member"}</p>
                  <p className="text-xs text-muted-foreground">{m.role} · <span className="capitalize">{m.type}</span></p>
                </div>
              </div>
              <div className="flex items-center gap-1 flex-shrink-0">
                <Button variant="ghost" size="icon" className="w-8 h-8" onClick={(e) => { e.stopPropagation(); setEditing(editing === m.id ? null : m.id); }}>
                  <Edit className="w-3.5 h-3.5" />
                </Button>
                <Button variant="ghost" size="icon" className="w-8 h-8 hover:text-destructive" onClick={(e) => { e.stopPropagation(); remove(m.id); }}>
                  <Trash2 className="w-3.5 h-3.5" />
                </Button>
              </div>
            </div>

            {editing === m.id && (
              <div className="p-3 md:p-4 border-t border-border space-y-3">
                <div className="grid gap-3 sm:grid-cols-2">
                  <div>
                    <Label className="text-xs">Name</Label>
                    <Input value={m.name} onChange={(e) => updateField(m.id, "name", e.target.value)} className="text-sm" />
                  </div>
                  <div>
                    <Label className="text-xs">Role / Title</Label>
                    <Input value={m.role} onChange={(e) => updateField(m.id, "role", e.target.value)} className="text-sm" />
                  </div>
                </div>
                <div>
                  <Label className="text-xs">Bio</Label>
                  <Textarea value={m.bio} onChange={(e) => updateField(m.id, "bio", e.target.value)} rows={3} className="text-sm" />
                </div>
                <div>
                  <Label className="text-xs">Photo URL</Label>
                  <Input value={m.photo} onChange={(e) => updateField(m.id, "photo", e.target.value)} placeholder="https://..." className="text-sm" />
                </div>
              </div>
            )}
          </div>
        ))}
      </div>

      <div className="mt-4">
        <Button onClick={save}><Save className="w-4 h-4 mr-2" /> Save Team</Button>
      </div>
    </div>
  );
}
