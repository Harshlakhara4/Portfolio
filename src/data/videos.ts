/**
 * VIDEO SHOWCASE ("Work in Motion")
 * -----------------------------------------------------------------------------
 * Each item shows a thumbnail first; the video source loads lazily and plays
 * only when the visitor explicitly opens it.
 *
 * - `src` can be a local file under /public/videos (recommended) OR null.
 * - When `src` is null, the item renders as an animated UI-mockup preview
 *   (labelled as a walkthrough preview) so the section never looks empty and
 *   never auto-loads heavy media. Add real walkthroughs later by setting `src`.
 * - `poster` is optional; a generated gradient poster is used when absent.
 */

export interface ShowcaseVideo {
  id: string;
  title: string;
  description: string;
  /** Local video path, e.g. "/videos/careerpur-walkthrough.mp4", or null */
  src: string | null;
  poster: string | null;
  accent: "violet" | "sky" | "mixed";
  /** Honest label for the thumbnail */
  tag: string;
}

export const showcaseVideos: ShowcaseVideo[] = [
  {
    id: "careerpur-reel",
    title: "CareerPur — Roadmap Experience",
    description:
      "A walkthrough of the career catalog and structured roadmap interface.",
    src: null,
    poster: null,
    accent: "violet",
    tag: "Walkthrough preview",
  },
  {
    id: "wewagad-reel",
    title: "WeWagad — Admin Modules",
    description:
      "How dynamic site sections and creator content are managed from the admin side.",
    src: null,
    poster: null,
    accent: "sky",
    tag: "Walkthrough preview",
  },
  {
    id: "dashboard-reel",
    title: "Dashboard Interactions",
    description:
      "CRUD workflows, filtering, and operational views from admin-panel work.",
    src: null,
    poster: null,
    accent: "mixed",
    tag: "UI interaction preview",
  },
  {
    id: "booking-reel",
    title: "Booking Flow Concept",
    description:
      "Route search, availability, and trip booking flow from the booking concept.",
    src: null,
    poster: null,
    accent: "violet",
    tag: "Concept preview",
  },
];
