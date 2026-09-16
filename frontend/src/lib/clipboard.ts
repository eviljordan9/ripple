/** Copy text even when the Clipboard API is blocked (iframes, permissions). */
export async function copyToClipboard(text: string): Promise<boolean> {
  if (typeof navigator !== "undefined" && navigator.clipboard?.writeText) {
    try {
      await navigator.clipboard.writeText(text);
      return true;
    } catch {
      // Permissions Policy / insecure context — try the execCommand path.
    }
  }
  return fallbackCopy(text);
}

function fallbackCopy(text: string): boolean {
  if (typeof document === "undefined") return false;
  const el = document.createElement("textarea");
  el.value = text;
  el.setAttribute("readonly", "");
  el.setAttribute("aria-hidden", "true");
  el.style.position = "fixed";
  el.style.top = "0";
  el.style.left = "0";
  el.style.width = "1px";
  el.style.height = "1px";
  el.style.padding = "0";
  el.style.border = "none";
  el.style.opacity = "0";
  document.body.appendChild(el);
  el.focus();
  el.select();
  el.setSelectionRange(0, text.length);
  let ok = false;
  try {
    ok = document.execCommand("copy");
  } catch {
    ok = false;
  } finally {
    document.body.removeChild(el);
  }
  return ok;
}

export function isEmbeddedPreview(): boolean {
  return typeof window !== "undefined" && window.parent !== window;
}

export function pollSharePath(slug: string): string {
  return `/p/${slug}`;
}

export function pollSharePayload(slug: string): { text: string; kind: "code" | "url" } {
  if (typeof window === "undefined" || isEmbeddedPreview()) {
    return { text: slug, kind: "code" };
  }
  return { text: `${window.location.origin}/p/${slug}`, kind: "url" };
}

export function pollShareUrl(slug: string): string {
  if (typeof window === "undefined") return pollSharePath(slug);
  if (isEmbeddedPreview()) return slug;
  return `${window.location.origin}/p/${slug}`;
}

export function parseJoinInput(raw: string): string {
  const t = raw.trim();
  if (!t) return "";
  const fromPath = (value: string) => {
    const match = value.match(/\/p\/([A-Za-z0-9]+)/i);
    return match ? match[1].toUpperCase() : "";
  };
  try {
    const slug = fromPath(new URL(t).pathname);
    if (slug) return slug;
  } catch {
    // not a URL
  }
  const nested = fromPath(t);
  if (nested) return nested;
  return t.toUpperCase().replace(/[^A-Z0-9]/g, "").slice(0, 16);
}
