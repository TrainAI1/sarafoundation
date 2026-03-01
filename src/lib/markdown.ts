// Shared markdown to HTML converter (content is admin-authored, safe for dangerouslySetInnerHTML)
export function markdownToHtml(md: string): string {
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
