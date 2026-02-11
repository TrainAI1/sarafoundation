import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "sonner";
import { ArrowLeft, Save, Eye } from "lucide-react";

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
        }
      });
    }
  }, [id, isNew]);

  const generateSlug = (text: string) => text.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "");

  const handleTitleChange = (val: string) => {
    setTitle(val);
    if (isNew) setSlug(generateSlug(val));
  };

  const handleSave = async () => {
    if (!title.trim() || !slug.trim()) {
      toast.error("Title and slug are required");
      return;
    }
    setSaving(true);

    const postData = {
      title: title.trim(),
      slug: slug.trim(),
      excerpt: excerpt.trim() || null,
      content,
      category: category.trim() || null,
      cover_image: coverImage.trim() || null,
      author_name: authorName.trim(),
      published,
      published_at: published ? new Date().toISOString() : null,
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
      <div className="flex items-center gap-4 mb-6">
        <Button variant="ghost" size="icon" onClick={() => navigate("/admin/blog")}>
          <ArrowLeft className="w-4 h-4" />
        </Button>
        <h1 className="font-display text-2xl font-bold text-foreground">
          {isNew ? "New Post" : "Edit Post"}
        </h1>
      </div>

      <div className="grid lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 space-y-4">
          <div>
            <Label>Title</Label>
            <Input value={title} onChange={(e) => handleTitleChange(e.target.value)} placeholder="Post title..." />
          </div>
          <div>
            <Label>Slug</Label>
            <Input value={slug} onChange={(e) => setSlug(e.target.value)} placeholder="post-url-slug" />
          </div>
          <div>
            <Label>Excerpt</Label>
            <Textarea value={excerpt} onChange={(e) => setExcerpt(e.target.value)} placeholder="Short description..." rows={2} />
          </div>
          <div>
            <Label>Content (Markdown supported)</Label>
            <Textarea value={content} onChange={(e) => setContent(e.target.value)} placeholder="Write your post content here..." rows={20} className="font-mono text-sm" />
          </div>
        </div>

        <div className="space-y-4">
          <div className="card-modern p-4 space-y-4">
            <h3 className="font-semibold text-foreground">Settings</h3>
            <div>
              <Label>Category</Label>
              <Input value={category} onChange={(e) => setCategory(e.target.value)} placeholder="e.g. Programs" />
            </div>
            <div>
              <Label>Author Name</Label>
              <Input value={authorName} onChange={(e) => setAuthorName(e.target.value)} />
            </div>
            <div>
              <Label>Cover Image URL</Label>
              <Input value={coverImage} onChange={(e) => setCoverImage(e.target.value)} placeholder="https://..." />
            </div>
            <div className="flex items-center gap-2">
              <input type="checkbox" id="published" checked={published} onChange={(e) => setPublished(e.target.checked)} className="rounded" />
              <Label htmlFor="published">Publish immediately</Label>
            </div>
          </div>

          <Button onClick={handleSave} className="w-full" disabled={saving}>
            <Save className="w-4 h-4 mr-2" />
            {saving ? "Saving..." : "Save Post"}
          </Button>
        </div>
      </div>
    </div>
  );
}
