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
  title: "Agentic Data Stack — How Data Systems Evolve for Agents",
  description:
    "A community exploring how modern data stacks evolve to serve agents, and how agents reshape data analytics and data engineering. Vendor-neutral. Practice-driven. Architecture-first.",
  keywords: [
    "agentic data stack",
    "AI data infrastructure",
    "data agents",
    "autonomous data engineering",
    "AI-powered analytics",
    "agent-driven pipelines",
    "data engineering automation",
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
    title: "Agentic Data Stack — How Data Systems Evolve for Agents",
    description:
      "A community exploring how modern data stacks evolve to serve agents, and how agents reshape data analytics and data engineering.",
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
    title: "Agentic Data Stack — How Data Systems Evolve for Agents",
    description:
      "A community exploring how modern data stacks evolve to serve agents. Vendor-neutral. Practice-driven. Architecture-first.",
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
