import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Mail, X } from "lucide-react";
import { toast } from "sonner";

interface Props {
  recipients: string[];
  mode: "single" | "bulk";
  title?: string;
  defaultSubject?: string;
  onClose: () => void;
  onSent?: (info: { subject: string; body: string; recipients: string[] }) => void;
}

export default function EmailDialog({ recipients, mode, title, defaultSubject = "", onClose, onSent }: Props) {
  const [subject, setSubject] = useState(defaultSubject);
  const [body, setBody] = useState("");

  const send = () => {
    if (!recipients.length) {
      toast.error("No recipients.");
      return;
    }
    const s = encodeURIComponent(subject);
    const b = encodeURIComponent(body);
    const mailto =
      mode === "single"
        ? `mailto:${recipients[0]}?subject=${s}&body=${b}`
        : `mailto:?bcc=${recipients.join(",")}&subject=${s}&body=${b}`;
    window.location.href = mailto;
    toast.success(`Opening your email client with ${recipients.length} recipient${recipients.length > 1 ? "s" : ""}.`);
    onSent?.({ subject, body, recipients });
    onClose();
  };

  const copy = () => {
    navigator.clipboard.writeText(recipients.join(", "));
    toast.success(`Copied ${recipients.length} email${recipients.length > 1 ? "s" : ""} to clipboard.`);
  };

  return (
    <div
      className="fixed inset-0 z-[60] flex items-end sm:items-center justify-center p-0 sm:p-4 bg-foreground/40"
      onClick={onClose}
    >
      <div
        className="bg-card w-full sm:max-w-lg rounded-t-2xl sm:rounded-2xl shadow-2xl max-h-[90vh] overflow-y-auto"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="sticky top-0 bg-card border-b border-border px-5 py-3 flex items-center justify-between">
          <h3 className="font-display font-bold text-foreground flex items-center gap-2">
            <Mail className="w-4 h-4" />
            {title || (mode === "single" ? "Email applicant" : `Email ${recipients.length} applicants`)}
          </h3>
          <Button variant="ghost" size="icon" onClick={onClose}>
            <X className="w-4 h-4" />
          </Button>
        </div>
        <div className="p-5 space-y-4 text-sm">
          <div className="rounded-xl bg-secondary/40 p-3 text-xs text-muted-foreground">
            {mode === "single" ? (
              <p><strong>To:</strong> {recipients[0]}</p>
            ) : (
              <>
                <p className="font-semibold text-foreground mb-1">
                  {recipients.length} recipients (sent as BCC for privacy)
                </p>
                <p className="line-clamp-3 break-words">
                  {recipients.slice(0, 8).join(", ")}
                  {recipients.length > 8 && ` …and ${recipients.length - 8} more`}
                </p>
              </>
            )}
          </div>
          <div>
            <Label htmlFor="email-subject" className="text-xs">Subject</Label>
            <Input
              id="email-subject"
              value={subject}
              onChange={(e) => setSubject(e.target.value)}
              placeholder="Update from Sara Foundation"
              className="mt-1 rounded-xl"
            />
          </div>
          <div>
            <Label htmlFor="email-body" className="text-xs">Message</Label>
            <Textarea
              id="email-body"
              value={body}
              onChange={(e) => setBody(e.target.value)}
              placeholder="Hi, we have an update on your application..."
              className="mt-1 rounded-xl min-h-[160px]"
            />
          </div>
          <p className="text-[11px] text-muted-foreground">
            This opens your default email client (Gmail, Outlook, Apple Mail) with the message pre-filled. Review before sending.
          </p>
          <div className="flex flex-col-reverse sm:flex-row gap-2 sm:justify-between">
            <Button variant="outline" size="sm" onClick={copy} className="rounded-xl">
              Copy emails
            </Button>
            <Button onClick={send} size="sm" className="rounded-xl">
              <Mail className="w-4 h-4" /> Open in email client
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}