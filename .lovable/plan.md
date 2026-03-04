

# Plan: Fix Favicon, Routing, SEO Links, and Add Google Analytics

## Issue Analysis

1. **Favicon**: The `index.html` correctly references `/favicon.png` and the file exists in `public/`. This should work, but the **published site** may not have the latest changes deployed. You need to click **Publish > Update** to push frontend changes live.

2. **404 Routing Errors on Published Site**: The `_redirects` file exists and is correct (`/*  /index.html  200`). However, these frontend changes only take effect after you click **Update** in the publish dialog. The error format `cpt1::dpdfp-...` confirms this is a server-side 404 from the hosting platform, meaning the `_redirects` file hasn't been deployed yet.

3. **SEO Links Not Working**: Same root cause as #2 -- the pages exist in the code (`/about`, `/blog`, `/contact`, etc.) but the published site hasn't been updated with the latest build including the `_redirects` routing fallback.

4. **Google Analytics**: Needs a GA Measurement ID to inject the `gtag.js` script.

## Implementation

### 1. Add `public/404.html` as a Fallback
Create a `404.html` that redirects to the SPA. This provides a secondary fallback in case `_redirects` isn't picked up by the hosting:

```html
<!DOCTYPE html>
<html>
<head>
  <meta http-equiv="refresh" content="0;url=/">
  <script>
    // Preserve the path for client-side routing
    sessionStorage.setItem('redirect', window.location.pathname);
    window.location.replace('/');
  </script>
</head>
</html>
```

Then in `App.tsx`, read the stored path on mount and navigate to it.

### 2. Google Analytics
Add the `gtag.js` script to `index.html`. Since no Measurement ID has been provided yet, I will ask the user for it.

### 3. Publish Reminder
The user must click **Publish > Update** after these changes to push the frontend to the live site.

---

## Files to Change

| File | Change |
|------|--------|
| `public/404.html` | New fallback redirect page |
| `index.html` | Add Google Analytics `gtag.js` script (once ID provided) |

