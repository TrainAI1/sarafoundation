import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "sonner";
import { ArrowLeft, Save, Eye, EyeOff, ExternalLink } from "lucide-react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

const categories = ["Programs", "Women in Tech", "Career", "Partnership", "Success Stories", "Industry", "Annual Report", "General"];

export default function AdminBlogEditor() {
  const { id } = useParams();
  const isNew = id === "new";
  const navigate = useNavigate();

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

  const generateSlug = (text: string) => text.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "");

  const handleTitleChange = (val: string) => {
    setTitle(val);
    if (isNew) setSlug(generateSlug(val));
  };

  const handleContentChange = (val: string) => {
    setContent(val);
    setCharCount(val.length);
  };

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
      navigate("/admin/blog");
    } catch (err: any) {
      toast.error(err.message);
    } finally {
      setSaving(false);
    }
  };

  return (
    <div>
      <div className="flex items-center justify-between gap-4 mb-6 flex-wrap">
        <div className="flex items-center gap-3">
          <Button variant="ghost" size="icon" onClick={() => navigate("/admin/blog")} className="flex-shrink-0">
            <ArrowLeft className="w-4 h-4" />
          </Button>
          <h1 className="font-display text-xl md:text-2xl font-bold text-foreground">
            {isNew ? "New Post" : "Edit Post"}
          </h1>
        </div>
        <div className="flex items-center gap-2">
          {!isNew && published && (
            <Button variant="outline" size="sm" asChild>
              <a href={`/blog/${slug}`} target="_blank" rel="noopener noreferrer">
                <ExternalLink className="w-3 h-3 mr-1" /> Preview
              </a>
            </Button>
          )}
        </div>
      </div>

      <div className="grid lg:grid-cols-3 gap-4 md:gap-6">
        <div className="lg:col-span-2 space-y-4">
          <div className="card-modern p-4 md:p-5 space-y-4">
            <div>
              <Label className="text-xs font-medium">Title</Label>
              <Input value={title} onChange={(e) => handleTitleChange(e.target.value)} placeholder="Post title..." className="text-lg font-semibold" />
            </div>
            <div>
              <Label className="text-xs font-medium">URL Slug</Label>
              <div className="flex items-center gap-2">
                <span className="text-xs text-muted-foreground">/blog/</span>
                <Input value={slug} onChange={(e) => setSlug(e.target.value)} placeholder="post-url-slug" className="text-sm" />
              </div>
            </div>
            <div>
              <Label className="text-xs font-medium">Excerpt</Label>
              <Textarea value={excerpt} onChange={(e) => setExcerpt(e.target.value)} placeholder="Short description for search results and previews..." rows={2} className="text-sm" />
            </div>
          </div>

          <div className="card-modern p-4 md:p-5">
            <div className="flex items-center justify-between mb-2">
              <Label className="text-xs font-medium">Content</Label>
              <span className="text-xs text-muted-foreground">{charCount.toLocaleString()} chars</span>
            </div>
            <Textarea
              value={content}
              onChange={(e) => handleContentChange(e.target.value)}
              placeholder="Write your post content here...&#10;&#10;You can use Markdown formatting:&#10;# Heading 1&#10;## Heading 2&#10;**bold** and *italic*&#10;- bullet points&#10;[links](url)"
              rows={24}
              className="font-mono text-sm leading-relaxed"
            />
          </div>
        </div>

        <div className="space-y-4">
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
              <Select value={category} onValueChange={setCategory}>
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
              <Input value={authorName} onChange={(e) => setAuthorName(e.target.value)} className="text-sm" />
            </div>
            <div>
              <Label className="text-xs">Cover Image URL</Label>
              <Input value={coverImage} onChange={(e) => setCoverImage(e.target.value)} placeholder="https://..." className="text-sm" />
              {coverImage && (
                <div className="mt-2 rounded-lg overflow-hidden border border-border">
                  <img src={coverImage} alt="Cover preview" className="w-full h-32 object-cover" onError={(e) => { (e.target as HTMLImageElement).style.display = 'none'; }} />
                </div>
              )}
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
