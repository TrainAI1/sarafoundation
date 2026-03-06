

# Plan: Fix SEO 404 Errors and Remaining Issues

## Problem Analysis

The custom domain `sarafoundationafrica.com` **is connected** in Lovable settings. All code references already use the correct domain. The remaining 404 errors when visiting deep links (e.g., `/programs/cap`, `/partnership`) have two potential causes:

1. **SPA routing on the hosting layer**: This is a Single Page Application. When a user (or Google's crawler) directly navigates to `sarafoundationafrica.com/programs/cap`, the server must return `index.html` for all routes. The project has `_redirects` and `404.html` fallback mechanisms, but the `404.html` uses a JavaScript-based redirect which **search engine crawlers cannot execute**. Googlebot sees the 404 page, not the actual content.

2. **`vercel.json` conflict**: The project contains a `vercel.json` with rewrite rules. This file is irrelevant on Lovable hosting and could cause confusion. It should be removed.

3. **Stale Google index**: Google previously indexed pages that returned 404s. Even after fixes, it takes time for Google to re-crawl and update its index. A re-submission of the sitemap via Google Search Console will accelerate this.

## Implementation Plan

### Step 1: Improve 404.html for crawler compatibility
Replace the JavaScript-only redirect in `public/404.html` with a proper meta refresh that also includes a `<noscript>` fallback, and add a visible link. However, the real fix is ensuring the `_redirects` file works -- on Lovable hosting, `_redirects` with `/* /index.html 200` should handle all routes before `404.html` is ever reached.

### Step 2: Remove vercel.json
This file is a Vercel-specific config and has no effect on Lovable hosting. It should be deleted to avoid confusion.

### Step 3: Add prerendering meta tags for better SEO
Add `<meta name="fragment" content="!">` to `index.html` to signal to crawlers that the page uses JavaScript rendering. While modern Googlebot renders JavaScript, this helps with other crawlers.

### Step 4: Ensure publish/update is done
After changes, you must click **Publish → Update** for frontend changes to go live on the custom domain.

### Step 5: Resubmit sitemap in Google Search Console
After deploying, go to [Google Search Console](https://search.google.com/search-console) and:
- Submit `https://sarafoundationafrica.com/sitemap.xml`
- Request re-indexing of affected pages
- Remove any old `sarafoundation.lovable.app` entries if present

## Files to Change

| File | Change |
|------|--------|
| `public/404.html` | Improve with better meta refresh and noscript fallback |
| `vercel.json` | Delete (Vercel-specific, not needed on Lovable) |
| `index.html` | Add fragment meta tag for crawler compatibility |

## User Actions Required
- **Publish → Update** after changes are deployed
- **Resubmit sitemap** in Google Search Console
- **Request re-indexing** of key pages showing 404 in Google results

