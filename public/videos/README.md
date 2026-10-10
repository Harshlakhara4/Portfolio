# Videos

Drop your real media files here. Nothing in this folder is required — the site
has graceful fallbacks everywhere a video is referenced.

## Hero background video (optional)

- **Expected path:** `public/videos/hero-loop.mp4` (configurable in
  `src/data/profile.ts` → `heroVideo`).
- The hero checks whether this file exists **at build/render time**. If it is
  missing, the hero renders an animated cinematic gradient + poster instead —
  so there is never a broken video or a 404 in the console.
- Recommended: a short (8–15s), muted, subtle, dark loop. Keep it small
  (ideally < 4–5 MB). Encode as H.264 MP4, 1080p or 720p.
- Respect copyright — only use footage you own or are licensed to use.

## Work-in-Motion walkthroughs (optional)

- Referenced from `src/data/videos.ts` via each item's `src` field.
- Leave `src: null` and the item shows an animated UI-mockup preview instead
  (no heavy media loads automatically).
- Add a real file here, e.g. `public/videos/careerpur-walkthrough.mp4`, then set
  `src: "/videos/careerpur-walkthrough.mp4"` on the matching item.
