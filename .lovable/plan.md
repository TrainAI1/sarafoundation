

# Plan: Fix Google Search 404 Errors and Website Issues

## Root Cause Analysis

The 404 errors when accessing pages from Google search are caused by **two issues**:

1. **No custom domain connected in Lovable**: The project has no custom domain configured in Lovable's domain settings. Even if DNS records point to Lovable's IP, the domain must also be registered within Lovable's project settings for routing to work. Without this, Lovable's servers don't know which project to serve for `sarafoundationafrica.com`, resulting in a 404.

2. **Sitemap references wrong domain**: The sitemap edge function hardcodes `https://sarafoundation.lovable.app` as the site URL, and `robots.txt` points to the edge function URL. Google is indexing URLs under the `.lovable.app` domain rather than the custom domain.

## Additional Issues Found

| Issue | Details |
|-------|---------|
| OG/Twitter images point to `lovable.dev` placeholder | Social sharing shows Lovable's default image, not Sara Foundation branding |
| Twitter site meta tag says `@Lovable` | Should reference Sara Foundation's Twitter handle |
| No Google Analytics | Tracking not yet implemented (needs Measurement ID) |
| Sitemap domain mismatch | Edge function uses `sarafoundation.lovable.app` instead of custom domain |

## Implementation Plan

### Step 1: Connect Custom Domain (User Action Required)
You need to go to **Project Settings → Domains** and add `sarafoundationafrica.com` and `www.sarafoundationafrica.com`. This is the critical missing step -- without it, no code changes will fix the 404 errors.

### Step 2: Fix Sitemap Domain
Update the sitemap edge function to use the custom domain URL instead of the Lovable staging URL.

### Step 3: Update robots.txt
Update the sitemap URL in `robots.txt` to use the custom domain path (`/sitemap.xml` served by the edge function or a redirect).

### Step 4: Fix Meta Tags in index.html
- Replace OG/Twitter image URLs with Sara Foundation's own image (use an existing asset or the favicon)
- Update `twitter:site` from `@Lovable` to Sara Foundation's handle
- Add `og:url` meta tag with the correct domain

### Step 5: Add Google Analytics
Add the `gtag.js` script to `index.html` once a Measurement ID is provided.

## Files to Change

| File | Change |
|------|--------|
| `supabase/functions/sitemap/index.ts` | Update `SITE_URL` to custom domain |
| `public/robots.txt` | Update sitemap URL to custom domain |
| `index.html` | Fix OG images, twitter handle, add og:url |
| `public/sitemap.xml` | Update URLs to custom domain (static fallback) |

## Critical User Action
Before any code changes take effect on the live custom domain, you **must connect the domain in Project Settings → Domains**. Go to your project settings, click Domains, and add both `sarafoundationafrica.com` and `www.sarafoundationafrica.com`.

