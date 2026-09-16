import { resolveParentEmbedderOrigin } from "./preview-embedder-origin";

export {
  isGrokEmbedderOrigin,
  isSandboxPreviewGuestHost,
  resolveParentEmbedderOrigin,
} from "./preview-embedder-origin";

export type PreviewHostBridgeOptions = {
  navigate?: (path: string) => void;
  getRoutePaths?: () => string[];
};

export function installPreviewHostBridge(_options: PreviewHostBridgeOptions = {}): () => void {
  if (typeof window === "undefined") return () => {};
  const parentOrigin = resolveParentEmbedderOrigin(
    window.parent === window,
    document.referrer,
    typeof location.ancestorOrigins !== "undefined" && location.ancestorOrigins.length > 0
      ? location.ancestorOrigins[0]
      : null,
    window.location.hostname,
  );
  if (parentOrigin === null) return () => {};
  return () => {};
}
