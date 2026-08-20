UPDATE public.blog_posts
SET title = replace(title, 'Career Advancement Program', 'Community Access & Participation Pathway'),
    excerpt = replace(coalesce(excerpt,''), 'Career Advancement Program', 'Community Access & Participation Pathway'),
    content = replace(coalesce(content,''), 'Career Advancement Program', 'Community Access & Participation Pathway')
WHERE (coalesce(title,'') || coalesce(excerpt,'') || coalesce(content,'')) LIKE '%Career Advancement Program%';