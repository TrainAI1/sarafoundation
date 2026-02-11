import { useEffect, useState, useRef, useCallback } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { ImageUpload } from "@/components/admin/ImageUpload";
import { toast } from "sonner";
import {
  ArrowLeft, Save, Eye, EyeOff, ExternalLink, Bold, Italic, Heading1, Heading2, Heading3,
  List, ListOrdered, Link2, Image, Quote, Code, Minus, Columns2
} from "lucide-react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

const categories = ["Programs", "Women in Tech", "Career", "Partnership", "Success Stories", "Industry", "Annual Report", "General"];

// Simple markdown to HTML for preview
function markdownToHtml(md: string): string {
  let html = md
    .replace(/^### (.+)$/gm, '<h3 class="text-lg font-bold mt-4 mb-2">$1</h3>')
    .replace(/^## (.+)$/gm, '<h2 class="text-xl font-bold mt-5 mb-2">$1</h2>')
    .replace(/^# (.+)$/gm, '<h1 class="text-2xl font-bold mt-6 mb-3">$1</h1>')
    .replace(/\*\*(.+?)\*\*/g, '<strong>$1</strong>')
    .replace(/\*(.+?)\*/g, '<em>$1</em>')
    .replace(/`(.+?)`/g, '<code class="bg-secondary px-1 py-0.5 rounded text-sm">$1</code>')
    .replace(/^\- (.+)$/gm, '<li class="ml-4 list-disc">$1</li>')
    .replace(/^\d+\. (.+)$/gm, '<li class="ml-4 list-decimal">$1</li>')
    .replace(/^> (.+)$/gm, '<blockquote class="border-l-4 border-primary pl-4 italic text-muted-foreground my-2">$1</blockquote>')
    .replace(/^---$/gm, '<hr class="my-4 border-border" />')
    .replace(/\[(.+?)\]\((.+?)\)/g, '<a href="$2" class="text-primary underline">$1</a>')
    .replace(/!\[(.+?)\]\((.+?)\)/g, '<img src="$2" alt="$1" class="rounded-lg my-2 max-w-full" />')
    .replace(/\n\n/g, '</p><p class="mb-3">')
    .replace(/\n/g, '<br />');
  return `<p class="mb-3">${html}</p>`;
}

export default function AdminBlogEditor() {
  const { id } = useParams();
  const isNew = id === "new";
  const navigate = useNavigate();
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  const [title, setTitle] = useState("");
  const [slug, setSlug] = useState("");
  const [excerpt, setExcerpt] = useState("");
  const [content, setContent] = useState("");
  const [category, setCategory] = useState("");
  const [coverImage, setCoverImage] = useState("");
  const [authorName, setAuthorName] = useState("Sara Foundation");
  const [published, setPublished] = useState(false);
  const [saving, setSaving] = useState(false);
  const [charCount, setCharCount] = useState(0);
  const [showPreview, setShowPreview] = useState(false);
  const [hasUnsavedChanges, setHasUnsavedChanges] = useState(false);

  useEffect(() => {
    if (!isNew && id) {
      supabase.from("blog_posts").select("*").eq("id", id).single().then(({ data }) => {
        if (data) {
          setTitle(data.title);
          setSlug(data.slug);
          setExcerpt(data.excerpt || "");
          setContent(data.content);
          setCategory(data.category || "");
          setCoverImage(data.cover_image || "");
          setAuthorName(data.author_name);
          setPublished(data.published);
          setCharCount(data.content.length);
        }
      });
    }
  }, [id, isNew]);

  // Unsaved changes warning
  useEffect(() => {
    const handler = (e: BeforeUnloadEvent) => {
      if (hasUnsavedChanges) { e.preventDefault(); e.returnValue = ""; }
    };
    window.addEventListener("beforeunload", handler);
    return () => window.removeEventListener("beforeunload", handler);
  }, [hasUnsavedChanges]);

  const markChanged = () => setHasUnsavedChanges(true);

  const generateSlug = (text: string) => text.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "");

  const handleTitleChange = (val: string) => {
    setTitle(val); markChanged();
    if (isNew) setSlug(generateSlug(val));
  };

  const handleContentChange = (val: string) => {
    setContent(val); setCharCount(val.length); markChanged();
  };

  // Toolbar actions
  const insertMarkdown = useCallback((before: string, after: string = "", placeholder: string = "") => {
    const ta = textareaRef.current;
    if (!ta) return;
    const start = ta.selectionStart;
    const end = ta.selectionEnd;
    const selected = content.substring(start, end) || placeholder;
    const newContent = content.substring(0, start) + before + selected + after + content.substring(end);
    setContent(newContent);
    setCharCount(newContent.length);
    markChanged();
    setTimeout(() => {
      ta.focus();
      ta.setSelectionRange(start + before.length, start + before.length + selected.length);
    }, 10);
  }, [content]);

  const toolbarActions = [
    { icon: Bold, label: "Bold", action: () => insertMarkdown("**", "**", "bold text") },
    { icon: Italic, label: "Italic", action: () => insertMarkdown("*", "*", "italic text") },
    { icon: Heading1, label: "H1", action: () => insertMarkdown("\n# ", "\n", "Heading 1") },
    { icon: Heading2, label: "H2", action: () => insertMarkdown("\n## ", "\n", "Heading 2") },
    { icon: Heading3, label: "H3", action: () => insertMarkdown("\n### ", "\n", "Heading 3") },
    { icon: List, label: "Bullet List", action: () => insertMarkdown("\n- ", "\n", "list item") },
    { icon: ListOrdered, label: "Numbered List", action: () => insertMarkdown("\n1. ", "\n", "list item") },
    { icon: Quote, label: "Quote", action: () => insertMarkdown("\n> ", "\n", "quote") },
    { icon: Code, label: "Code", action: () => insertMarkdown("`", "`", "code") },
    { icon: Link2, label: "Link", action: () => insertMarkdown("[", "](url)", "link text") },
    { icon: Image, label: "Image", action: () => insertMarkdown("![", "](image-url)", "alt text") },
    { icon: Minus, label: "Divider", action: () => insertMarkdown("\n\n---\n\n") },
  ];

  const handleSave = async (shouldPublish?: boolean) => {
    if (!title.trim() || !slug.trim()) {
      toast.error("Title and slug are required");
      return;
    }
    setSaving(true);

    const pub = shouldPublish !== undefined ? shouldPublish : published;
    const postData = {
      title: title.trim(),
      slug: slug.trim(),
      excerpt: excerpt.trim() || null,
      content,
      category: category.trim() || null,
      cover_image: coverImage.trim() || null,
      author_name: authorName.trim(),
      published: pub,
      published_at: pub ? new Date().toISOString() : null,
    };

    try {
      if (isNew) {
        const { error } = await supabase.from("blog_posts").insert(postData);
        if (error) throw error;
        toast.success("Post created!");
      } else {
        const { error } = await supabase.from("blog_posts").update(postData).eq("id", id);
        if (error) throw error;
        toast.success("Post updated!");
      }
      setHasUnsavedChanges(false);
      navigate("/admin/blog");
    } catch (err: any) {
      toast.error(err.message);
    } finally {
      setSaving(false);
    }
  };

  const wordCount = content.trim() ? content.trim().split(/\s+/).length : 0;
  const readTime = Math.max(1, Math.ceil(wordCount / 200));

  return (
    <div>
      <div className="flex items-center justify-between gap-4 mb-6 flex-wrap">
        <div className="flex items-center gap-3">
          <Button variant="ghost" size="icon" onClick={() => {
            if (hasUnsavedChanges && !confirm("You have unsaved changes. Leave anyway?")) return;
            navigate("/admin/blog");
          }} className="flex-shrink-0">
            <ArrowLeft className="w-4 h-4" />
          </Button>
          <h1 className="font-display text-xl md:text-2xl font-bold text-foreground">
            {isNew ? "New Post" : "Edit Post"}
          </h1>
          {hasUnsavedChanges && (
            <span className="text-xs bg-accent/10 text-accent px-2 py-0.5 rounded-full">Unsaved</span>
          )}
        </div>
        <div className="flex items-center gap-2">
          <Button variant="outline" size="sm" onClick={() => setShowPreview(!showPreview)}>
            <Columns2 className="w-3 h-3 mr-1" />
            {showPreview ? "Editor Only" : "Preview"}
          </Button>
          {!isNew && published && (
            <Button variant="outline" size="sm" asChild>
              <a href={`/blog/${slug}`} target="_blank" rel="noopener noreferrer">
                <ExternalLink className="w-3 h-3 mr-1" /> View on Site
              </a>
            </Button>
          )}
        </div>
      </div>

      <div className="grid lg:grid-cols-3 gap-4 md:gap-6">
        <div className={`${showPreview ? 'lg:col-span-1' : 'lg:col-span-2'} space-y-4`}>
          <div className="card-modern p-4 md:p-5 space-y-4">
            <div>
              <Label className="text-xs font-medium">Title</Label>
              <Input value={title} onChange={(e) => handleTitleChange(e.target.value)} placeholder="Post title..." className="text-lg font-semibold" />
            </div>
            <div>
              <Label className="text-xs font-medium">URL Slug</Label>
              <div className="flex items-center gap-2">
                <span className="text-xs text-muted-foreground">/blog/</span>
                <Input value={slug} onChange={(e) => { setSlug(e.target.value); markChanged(); }} placeholder="post-url-slug" className="text-sm" />
              </div>
            </div>
            <div>
              <Label className="text-xs font-medium">Excerpt</Label>
              <Textarea value={excerpt} onChange={(e) => { setExcerpt(e.target.value); markChanged(); }} placeholder="Short description for search results and previews..." rows={2} className="text-sm" />
            </div>
          </div>

          <div className="card-modern p-4 md:p-5">
            {/* Formatting Toolbar */}
            <div className="flex items-center gap-0.5 mb-3 flex-wrap border-b border-border pb-3">
              {toolbarActions.map((action) => (
                <button
                  key={action.label}
                  onClick={action.action}
                  title={action.label}
                  className="w-8 h-8 rounded-lg flex items-center justify-center text-muted-foreground hover:text-foreground hover:bg-secondary transition-colors"
                >
                  <action.icon className="w-4 h-4" />
                </button>
              ))}
            </div>

            <div className="flex items-center justify-between mb-2">
              <Label className="text-xs font-medium">Content (Markdown)</Label>
              <div className="flex items-center gap-3 text-xs text-muted-foreground">
                <span>{wordCount} words</span>
                <span>{readTime} min read</span>
                <span>{charCount.toLocaleString()} chars</span>
              </div>
            </div>
            <Textarea
              ref={textareaRef}
              value={content}
              onChange={(e) => handleContentChange(e.target.value)}
              placeholder="Write your post content here using Markdown..."
              rows={showPreview ? 18 : 24}
              className="font-mono text-sm leading-relaxed"
            />
          </div>
        </div>

        {/* Live Preview Panel */}
        {showPreview && (
          <div className="lg:col-span-1">
            <div className="card-modern p-5 sticky top-4">
              <h3 className="font-semibold text-foreground text-sm mb-3 flex items-center gap-2">
                <Eye className="w-4 h-4" /> Live Preview
              </h3>
              <div className="prose prose-sm max-w-none text-foreground overflow-y-auto max-h-[600px]">
                {coverImage && (
                  <img src={coverImage} alt="Cover" className="w-full h-32 object-cover rounded-lg mb-4" />
                )}
                {title && <h1 className="text-xl font-bold mb-2">{title}</h1>}
                {excerpt && <p className="text-muted-foreground text-sm italic mb-4">{excerpt}</p>}
                <div
                  className="text-sm leading-relaxed [&_h1]:text-2xl [&_h1]:font-bold [&_h1]:mt-6 [&_h1]:mb-3 [&_h2]:text-xl [&_h2]:font-bold [&_h2]:mt-5 [&_h2]:mb-2 [&_h3]:text-lg [&_h3]:font-bold [&_h3]:mt-4 [&_h3]:mb-2 [&_strong]:font-bold [&_em]:italic [&_a]:text-primary [&_a]:underline [&_code]:bg-secondary [&_code]:px-1 [&_code]:rounded [&_blockquote]:border-l-4 [&_blockquote]:border-primary [&_blockquote]:pl-4 [&_blockquote]:italic [&_li]:ml-4 [&_hr]:my-4 [&_hr]:border-border [&_img]:rounded-lg [&_img]:max-w-full"
                  dangerouslySetInnerHTML={{ __html: markdownToHtml(content) }}
                />
              </div>
            </div>
          </div>
        )}

        {/* Sidebar */}
        <div className={`space-y-4 ${showPreview ? 'lg:col-span-1' : ''}`}>
          {/* Publish Actions */}
          <div className="card-modern p-4 space-y-3">
            <h3 className="font-semibold text-foreground text-sm flex items-center gap-2">
              {published ? <Eye className="w-4 h-4 text-success" /> : <EyeOff className="w-4 h-4 text-muted-foreground" />}
              {published ? "Published" : "Draft"}
            </h3>
            <div className="flex gap-2">
              <Button onClick={() => handleSave(false)} variant="outline" className="flex-1" size="sm" disabled={saving}>
                Save Draft
              </Button>
              <Button onClick={() => handleSave(true)} className="flex-1" size="sm" disabled={saving}>
                {saving ? "Saving..." : "Publish"}
              </Button>
            </div>
          </div>

          {/* Settings */}
          <div className="card-modern p-4 space-y-3">
            <h3 className="font-semibold text-foreground text-sm">Post Settings</h3>
            <div>
              <Label className="text-xs">Category</Label>
              <Select value={category} onValueChange={(v) => { setCategory(v); markChanged(); }}>
                <SelectTrigger className="text-sm">
                  <SelectValue placeholder="Select category" />
                </SelectTrigger>
                <SelectContent>
                  {categories.map((c) => (
                    <SelectItem key={c} value={c}>{c}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div>
              <Label className="text-xs">Author Name</Label>
              <Input value={authorName} onChange={(e) => { setAuthorName(e.target.value); markChanged(); }} className="text-sm" />
            </div>
            <div>
              <Label className="text-xs">Cover Image</Label>
              <ImageUpload
                value={coverImage}
                onChange={(url) => { setCoverImage(url); markChanged(); }}
                folder="blog-covers"
                label="Upload Cover Image"
                aspectRatio="landscape"
              />
            </div>
          </div>

          {/* SEO Preview */}
          <div className="card-modern p-4 space-y-2">
            <h3 className="font-semibold text-foreground text-sm">SEO Preview</h3>
            <div className="bg-secondary rounded-lg p-3">
              <p className="text-primary text-sm font-medium truncate">{title || "Post title"}</p>
              <p className="text-xs text-success truncate">sarafoundation.lovable.app/blog/{slug || "post-slug"}</p>
              <p className="text-xs text-muted-foreground line-clamp-2 mt-1">{excerpt || "Post description will appear here..."}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
