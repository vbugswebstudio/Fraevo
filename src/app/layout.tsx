import type { Metadata, Viewport } from "next";
import { Inter, JetBrains_Mono, Space_Grotesk } from "next/font/google";
import { ChatProvider } from "@/components/chat/ChatContext";
import { CursorGlow } from "@/components/CursorGlow";
import "./globals.css";

const space = Space_Grotesk({
  variable: "--font-space",
  subsets: ["latin"],
  display: "swap",
});

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
});

const jetbrains = JetBrains_Mono({
  variable: "--font-jetbrains",
  subsets: ["latin"],
  display: "swap",
});

const SITE_URL = "https://fraevo.com";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: "Fraevo — AI-Native Software Engineering",
    template: "%s | Fraevo",
  },
  description:
    "Fraevo builds AI-powered software, digital products and intelligent systems for businesses that want to move faster.",
  keywords: [
    "AI software development",
    "AI engineering company",
    "custom software development",
    "AI development company",
    "RAG development",
    "AI agent development",
    "software engineering company",
    "custom AI solutions",
    "AI-native engineering",
  ],
  authors: [{ name: "Fraevo" }],
  creator: "Fraevo",
  publisher: "Fraevo",
  openGraph: {
    title: "Fraevo — AI-Native Software Engineering",
    description:
      "Software, shipped at speed. AI-native software engineering for companies that want to build, launch and scale faster.",
    url: SITE_URL,
    siteName: "Fraevo",
    type: "website",
    locale: "en_US",
  },
  twitter: {
    card: "summary_large_image",
    title: "Fraevo — AI-Native Software Engineering",
    description:
      "Software, shipped at speed. AI-native software engineering for companies that want to build, launch and scale faster.",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  icons: {
    icon: [{ url: "/icon.svg", type: "image/svg+xml" }],
  },
};

export const viewport: Viewport = {
  themeColor: "#0a0b0d",
  width: "device-width",
  initialScale: 1,
};

const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Organization",
      "@id": `${SITE_URL}/#organization`,
      name: "Fraevo",
      url: SITE_URL,
      description:
        "AI-native software engineering company. We design, build and scale intelligent digital products, custom software and automation.",
      email: "hello@fraevo.com",
      logo: {
        "@type": "ImageObject",
        url: `${SITE_URL}/icon.svg`,
      },
      sameAs: [
        "https://www.linkedin.com/company/fraevo",
        "https://github.com/fraevo",
      ],
    },
    {
      "@type": "WebSite",
      "@id": `${SITE_URL}/#website`,
      url: SITE_URL,
      name: "Fraevo",
      publisher: { "@id": `${SITE_URL}/#organization` },
      inLanguage: "en",
    },
  ],
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html
      lang="en"
      className={`${space.variable} ${inter.variable} ${jetbrains.variable} antialiased`}
    >
      <body className="bg-bg text-ink">
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
        <ChatProvider>
          <CursorGlow />
          {children}
        </ChatProvider>
      </body>
    </html>
  );
}