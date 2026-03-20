import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Analytics from "@/components/Analytics";
import StructuredData from "@/components/StructuredData";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Agentic Data Stack: Free Tools & Architecture Guides",
  description:
    "Build AI-ready data systems with 27+ free, open-source tools. Learn agentic architecture patterns, compare components, and deploy intelligent data stacks today.",
  keywords: [
    "agentic data stack",
    "autonomous data engineering",
    "data agents",
    "AI-powered data transformation",
    "semantic layer",
    "intelligent data systems",
  ],
  authors: [{ name: "Agentic Data Stack Community" }],
  creator: "Agentic Data Stack",
  publisher: "Agentic Data Stack",
  metadataBase: new URL("https://agenticdatastack.org"),
  alternates: {
    canonical: "/",
  },
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://agenticdatastack.org",
    title: "Agentic Data Stack: Free Tools & Architecture Guides",
    description:
      "Build AI-ready data systems with 27+ free, open-source tools. Learn agentic architecture patterns, compare components like MCP catalogs, lake formats, and SQL engines. Vendor-neutral and practice-driven.",
    siteName: "Agentic Data Stack",
    images: [
      {
        url: "/images/og-image.png",
        width: 1200,
        height: 630,
        alt: "Agentic Data Stack - Architecture for AI-Powered Data Systems",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Agentic Data Stack: Free Tools & Architecture Guides",
    description:
      "Build AI-ready data systems with 27+ free tools. Learn agentic architecture, compare components, and deploy intelligent stacks. Vendor-neutral & practice-driven.",
    images: ["/images/twitter-card.png"],
    creator: "@AgenticDataStack",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark" suppressHydrationWarning>
      <head>
        <StructuredData />
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <Analytics />
        {children}
      </body>
    </html>
  );
}
