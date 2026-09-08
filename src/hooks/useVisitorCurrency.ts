import { useEffect, useState } from "react";

export type Currency = "USD" | "NGN" | "EUR" | "GBP";

export const CURRENCY_SYMBOL: Record<Currency, string> = { USD: "$", NGN: "₦", EUR: "€", GBP: "£" };

const EUR_COUNTRIES = new Set([
  "AT", "BE", "CY", "EE", "FI", "FR", "DE", "GR", "IE", "IT", "LV", "LT", "LU", "MT", "NL", "PT", "SK", "SI", "ES", "HR",
]);

function currencyForCountry(countryCode?: string | null): Currency {
  const cc = (countryCode || "").toUpperCase();
  if (cc === "NG") return "NGN";
  if (cc === "GB") return "GBP";
  if (EUR_COUNTRIES.has(cc)) return "EUR";
  return "USD";
}

// A rough, no-network fallback so the page still adapts to the visitor even if
// the IP lookup below fails, is blocked, or is slow (private browsing, ad
// blockers, no connectivity, etc).
function currencyFromTimezone(): Currency {
  try {
    const tz = Intl.DateTimeFormat().resolvedOptions().timeZone || "";
    if (tz === "Africa/Lagos") return "NGN";
    if (tz === "Europe/London") return "GBP";
    if (tz.startsWith("Europe/")) return "EUR";
  } catch {
    // Intl unsupported in this environment — fall through to the default.
  }
  return "USD";
}

const STORAGE_KEY = "sfa_visitor_currency";

function readCached(): Currency | null {
  try {
    const cached = sessionStorage.getItem(STORAGE_KEY);
    if (cached === "USD" || cached === "NGN" || cached === "EUR" || cached === "GBP") return cached;
  } catch {
    // sessionStorage can throw in locked-down/private contexts — ignore.
  }
  return null;
}

/**
 * Best-effort detection of the visitor's likely donation currency, so pricing
 * can default to something relevant to them (Naira in Nigeria, pounds in the
 * UK, etc.) instead of always showing every currency at once. Never blocks
 * or throws — always resolves to a sensible currency, and callers can still
 * let the visitor override it.
 */
export function useVisitorCurrency(): { currency: Currency; loading: boolean } {
  const [currency, setCurrency] = useState<Currency>(() => readCached() ?? currencyFromTimezone());
  const [loading, setLoading] = useState(() => readCached() === null);

  useEffect(() => {
    if (readCached() !== null) {
      setLoading(false);
      return;
    }

    let cancelled = false;
    const controller = new AbortController();
    const timeout = setTimeout(() => controller.abort(), 4000);

    fetch("https://ipwho.is/", { signal: controller.signal })
      .then((res) => res.json())
      .then((data) => {
        if (cancelled) return;
        const detected = data && data.success !== false ? currencyForCountry(data.country_code) : currencyFromTimezone();
        setCurrency(detected);
        try {
          sessionStorage.setItem(STORAGE_KEY, detected);
        } catch {
          // Best-effort caching only.
        }
      })
      .catch(() => {
        // Network unavailable/blocked — keep the timezone-based guess already set.
      })
      .finally(() => {
        clearTimeout(timeout);
        if (!cancelled) setLoading(false);
      });

    return () => {
      cancelled = true;
      controller.abort();
      clearTimeout(timeout);
    };
  }, []);

  return { currency, loading };
}
