import { Facebook, Linkedin, Twitter, MessageCircle, Link2, Check } from "lucide-react";
import { useState } from "react";
import { Button } from "@/components/ui/button";

interface BlogShareButtonsProps {
  title: string;
  url: string;
}

export function BlogShareButtons({ title, url }: BlogShareButtonsProps) {
  const [copied, setCopied] = useState(false);
  const encodedUrl = encodeURIComponent(url);
  const encodedTitle = encodeURIComponent(title);

  const channels = [
    { icon: Twitter, label: "Share on X", href: `https://x.com/intent/tweet?text=${encodedTitle}&url=${encodedUrl}` },
    { icon: Linkedin, label: "Share on LinkedIn", href: `https://www.linkedin.com/sharing/share-offsite/?url=${encodedUrl}` },
    { icon: Facebook, label: "Share on Facebook", href: `https://www.facebook.com/sharer/sharer.php?u=${encodedUrl}` },
    { icon: MessageCircle, label: "Share on WhatsApp", href: `https://wa.me/?text=${encodedTitle}%20${encodedUrl}` },
  ];

  const handleCopy = async () => {
    await navigator.clipboard.writeText(url);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="flex items-center gap-2 flex-wrap">
      <span className="text-sm font-medium text-muted-foreground mr-1">Share:</span>
      {channels.map((ch) => (
        <a
          key={ch.label}
          href={ch.href}
          target="_blank"
          rel="noopener noreferrer"
          aria-label={ch.label}
          className="w-9 h-9 rounded-xl bg-secondary flex items-center justify-center text-muted-foreground hover:text-primary hover:bg-primary/10 transition-all"
        >
          <ch.icon className="w-4 h-4" />
        </a>
      ))}
      <Button
        variant="ghost"
        size="icon"
        className="w-9 h-9 rounded-xl"
        onClick={handleCopy}
        aria-label="Copy link"
      >
        {copied ? <Check className="w-4 h-4 text-green-500" /> : <Link2 className="w-4 h-4" />}
      </Button>
    </div>
  );
}
