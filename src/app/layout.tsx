import type { Metadata, Viewport } from "next";
import { Inter, Space_Grotesk, JetBrains_Mono } from "next/font/google";
import { profile } from "@/data/profile";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-sans",
  display: "swap",
});

const spaceGrotesk = Space_Grotesk({
  subsets: ["latin"],
  variable: "--font-display",
  display: "swap",
});

const jetbrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-mono",
  display: "swap",
});

export const viewport: Viewport = {
  themeColor: "#08090D",
  width: "device-width",
  initialScale: 1,
  colorScheme: "dark",
};

export const metadata: Metadata = {
  metadataBase: new URL(profile.siteUrl),
  title: {
    default: profile.siteName,
    template: `%s — ${profile.name}`,
  },
  description: profile.metaDescription,
  applicationName: profile.siteName,
  authors: [{ name: profile.name }],
  creator: profile.name,
  keywords: [
    "Full-Stack Developer",
    "Freelance Developer",
    "Next.js Developer",
    "React Developer",
    "Node.js",
    "Web Application Development",
    "Admin Dashboard Development",
    "Harsh Lakhara",
  ],
  alternates: {
    canonical: "/",
  },
  openGraph: {
    type: "website",
    url: profile.siteUrl,
    title: profile.siteName,
    description: profile.metaDescription,
    siteName: profile.siteName,
    images: [
      {
        url: profile.ogImage,
        width: 1200,
        height: 630,
        alt: `${profile.name} — ${profile.title}`,
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: profile.siteName,
    description: profile.metaDescription,
    images: [profile.ogImage],
  },
  robots: {
    index: true,
    follow: true,
  },
  icons: {
    icon: [{ url: "/favicon.svg", type: "image/svg+xml" }],
  },
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html
      lang="en"
      className={`${inter.variable} ${spaceGrotesk.variable} ${jetbrainsMono.variable}`}
    >
      <body>
        <a
          href="#main"
          className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[100] focus:rounded-lg focus:bg-violet focus:px-4 focus:py-2 focus:text-sm focus:font-medium focus:text-white"
        >
          Skip to content
        </a>
        {children}
      </body>
    </html>
  );
}
