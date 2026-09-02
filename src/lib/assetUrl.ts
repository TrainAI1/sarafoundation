/**
 * CDN assets are served from Lovable infrastructure at /__l5e/assets-v1/...
 * Custom domains do not proxy that path, so on non-Lovable hosts we resolve
 * the pointer URL against the canonical Lovable origin.
 */
const CANONICAL_ORIGIN = "https://sarafoundation.lovable.app";

type AssetPointer = { url: string };

export function assetUrl(pointer: AssetPointer | string): string {
  const url = typeof pointer === "string" ? pointer : pointer.url;
  if (!url.startsWith("/__l5e/")) return url;
  if (typeof window === "undefined") return `${CANONICAL_ORIGIN}${url}`;
  const host = window.location.hostname;
  const isLovableHost =
    host === "localhost" ||
    host === "127.0.0.1" ||
    host.endsWith("lovable.app") ||
    host.endsWith("lovableproject.com") ||
    host.endsWith("lovable.dev");
  return isLovableHost ? url : `${CANONICAL_ORIGIN}${url}`;
}
