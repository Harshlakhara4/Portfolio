import { profile } from "@/data/profile";
import { existingPublicAsset } from "@/lib/assets";
import { HeroContent } from "./HeroContent";

/**
 * Server wrapper: resolves optional media on disk so the client never
 * references a missing file (no 404s, no broken video). The animated gradient
 * + poster act as the cinematic fallback whenever the video is absent.
 */
export function HeroSection() {
  const videoSrc = existingPublicAsset(profile.heroVideo);
  const posterSrc = existingPublicAsset(profile.heroPoster);

  return <HeroContent videoSrc={videoSrc} posterSrc={posterSrc} />;
}
