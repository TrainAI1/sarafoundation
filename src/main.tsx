import { createRoot } from "react-dom/client";
import App from "./App.tsx";
import "./index.css";
import { APP_UPDATE_EVENT, APP_VERSION, APP_VERSION_RELOAD_KEY, APP_VERSION_STORAGE_KEY } from "./config/app-version";

const markCurrentVersion = () => {
  localStorage.setItem(APP_VERSION_STORAGE_KEY, APP_VERSION);
  localStorage.removeItem(APP_VERSION_RELOAD_KEY);
};

try {
  const storedVersion = localStorage.getItem(APP_VERSION_STORAGE_KEY);
  const reloadVersion = localStorage.getItem(APP_VERSION_RELOAD_KEY);

  if (!storedVersion) {
    markCurrentVersion();
  } else if (storedVersion !== APP_VERSION && reloadVersion !== APP_VERSION) {
    localStorage.setItem(APP_VERSION_RELOAD_KEY, APP_VERSION);
    localStorage.setItem(APP_VERSION_STORAGE_KEY, APP_VERSION);
    (window.location.reload as (forceReload?: boolean) => void)(true);
  } else if (storedVersion !== APP_VERSION) {
    markCurrentVersion();
  }
} catch {
  // localStorage can be unavailable in restricted browsers; continue without blocking render.
}

const isInIframe = (() => {
  try {
    return window.self !== window.top;
  } catch {
    return true;
  }
})();

const isPreviewHost =
  window.location.hostname.includes("id-preview--") ||
  window.location.hostname.includes("lovableproject.com") ||
  window.location.hostname.includes("localhost") ||
  window.location.hostname.includes("127.0.0.1");

if ("serviceWorker" in navigator) {
  if (isPreviewHost || isInIframe) {
    navigator.serviceWorker.getRegistrations().then((registrations) => {
      registrations.forEach((registration) => registration.unregister());
    });
  } else {
    const hardReload = () => {
      (window.location.reload as (forceReload?: boolean) => void)(true);
    };

    window.addEventListener("load", () => {
      navigator.serviceWorker
        .register(`/sw.js?v=${encodeURIComponent(APP_VERSION)}`)
        .then((registration) => {
          registration.update();

          registration.addEventListener("updatefound", () => {
            const nextWorker = registration.installing;
            if (!nextWorker) return;

            nextWorker.addEventListener("statechange", () => {
              if (nextWorker.state === "installed" && navigator.serviceWorker.controller) {
                window.dispatchEvent(new CustomEvent(APP_UPDATE_EVENT));
                nextWorker.postMessage({ type: "SKIP_WAITING" });
              }
            });
          });

          const refreshInterval = window.setInterval(() => registration.update(), 10 * 60 * 1000);
          window.addEventListener("beforeunload", () => window.clearInterval(refreshInterval));
          document.addEventListener("visibilitychange", () => {
            if (document.visibilityState === "visible") registration.update();
          });
        })
        .catch(() => undefined);

      navigator.serviceWorker.addEventListener("controllerchange", hardReload);
    });
  }
}

createRoot(document.getElementById("root")!).render(<App />);
