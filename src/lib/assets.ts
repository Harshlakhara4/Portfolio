// NOTE: Uses node:fs — import only from Server Components / route handlers.
import fs from "node:fs";
import path from "node:path";

/**
 * Returns the given public path (e.g. "/videos/hero-loop.mp4") only when the
 * file actually exists in /public. Otherwise returns null. This lets server
 * components avoid referencing missing assets — so there are no 404s or broken
 * media for optional files the user hasn't supplied yet.
 */
export function existingPublicAsset(publicPath: string | null): string | null {
  if (!publicPath) return null;
  const clean = publicPath.split("?")[0].split("#")[0];
  const rel = clean.replace(/^\//, "");
  try {
    const abs = path.join(process.cwd(), "public", rel);
    return fs.existsSync(abs) ? publicPath : null;
  } catch {
    return null;
  }
}
