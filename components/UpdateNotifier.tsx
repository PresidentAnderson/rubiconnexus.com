"use client";

import { useEffect, useRef, useState } from "react";

/** How often to poll the live deployment for a newer build (ms). */
const POLL_MS = 3 * 60 * 1000;
/** Delay before the first check so we never compete with first paint. */
const FIRST_CHECK_MS = 15 * 1000;

type Copy = { message: string; hint: string; action: string; dismiss: string };

/** Self-contained copy so this component drops into any site unchanged. */
const STRINGS: Record<string, Copy> = {
  en: {
    message: "A new version of the site is available.",
    hint: "Updating takes less than 5 seconds.",
    action: "Update",
    dismiss: "Later",
  },
  fr: {
    message: "Une nouvelle version du site est disponible.",
    hint: "La mise à jour prend moins de 5 secondes.",
    action: "Mettre à jour",
    dismiss: "Plus tard",
  },
  es: {
    message: "Hay una nueva versión del sitio disponible.",
    hint: "La actualización tarda menos de 5 segundos.",
    action: "Actualizar",
    dismiss: "Más tarde",
  },
};

/**
 * Detects when a newer deployment is live and invites the user to refresh.
 *
 * `loadedCommit` is the commit this page was built from (passed from the server
 * layout, fixed for the life of the page). `/api/version` is served no-store
 * from the *current* live deployment, so once a new build ships its commit
 * differs and we surface a dismissible banner with an Update/reload button.
 *
 * Fully self-contained (inline styles + own copy) — drops into any site that
 * exposes a build commit and an `/api/version` route returning `{ commit }`.
 */
export default function UpdateNotifier({
  loadedCommit,
  locale = "en",
}: {
  loadedCommit: string;
  locale?: string;
}) {
  const t = STRINGS[locale?.slice(0, 2).toLowerCase()] ?? STRINGS.en;
  const [pending, setPending] = useState<string | null>(null);
  const loadedRef = useRef(loadedCommit);
  const dismissedRef = useRef<string | null>(null);

  useEffect(() => {
    let active = true;

    async function check() {
      try {
        const res = await fetch("/api/version", { cache: "no-store" });
        if (!res.ok) return;
        const data = (await res.json()) as { commit?: string };
        const live = data.commit;
        if (
          !active ||
          !live ||
          live === loadedRef.current ||
          live === dismissedRef.current
        ) {
          return;
        }
        setPending(live);
      } catch {
        // Offline or a transient hiccup — try again next interval.
      }
    }

    const firstCheck = setTimeout(check, FIRST_CHECK_MS);
    const interval = setInterval(check, POLL_MS);
    const onVisible = () => {
      if (document.visibilityState === "visible") check();
    };
    document.addEventListener("visibilitychange", onVisible);
    window.addEventListener("focus", check);

    return () => {
      active = false;
      clearTimeout(firstCheck);
      clearInterval(interval);
      document.removeEventListener("visibilitychange", onVisible);
      window.removeEventListener("focus", check);
    };
  }, []);

  if (!pending) return null;

  return (
    <div
      role="status"
      aria-live="polite"
      style={{
        position: "fixed",
        bottom: 20,
        left: "50%",
        transform: "translateX(-50%)",
        zIndex: 1000,
        display: "flex",
        flexWrap: "wrap",
        alignItems: "center",
        justifyContent: "center",
        gap: "10px 18px",
        maxWidth: "min(94vw, 540px)",
        padding: "14px 18px",
        borderRadius: 14,
        background: "#111827",
        border: "1px solid rgba(255,255,255,0.12)",
        boxShadow: "0 18px 50px -18px rgba(0,0,0,0.6)",
        color: "#f9fafb",
        fontFamily: "inherit",
        lineHeight: 1.4,
      }}
    >
      <span style={{ display: "flex", flexDirection: "column", gap: 2, minWidth: 0 }}>
        <span style={{ fontSize: "0.95rem", fontWeight: 600 }}>{t.message}</span>
        <span style={{ fontSize: "0.8rem", color: "#9ca3af" }}>{t.hint}</span>
      </span>
      <span style={{ display: "flex", gap: 8, flexShrink: 0 }}>
        <button
          type="button"
          onClick={() => window.location.reload()}
          style={{
            cursor: "pointer",
            border: "none",
            borderRadius: 999,
            padding: "9px 18px",
            fontSize: "0.9rem",
            fontWeight: 600,
            background: "#f9fafb",
            color: "#111827",
          }}
        >
          {t.action}
        </button>
        <button
          type="button"
          onClick={() => {
            dismissedRef.current = pending;
            setPending(null);
          }}
          style={{
            cursor: "pointer",
            borderRadius: 999,
            padding: "9px 14px",
            fontSize: "0.9rem",
            background: "transparent",
            border: "1px solid rgba(255,255,255,0.18)",
            color: "#9ca3af",
          }}
        >
          {t.dismiss}
        </button>
      </span>
    </div>
  );
}
