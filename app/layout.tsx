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
    "A community exploring how modern data stacks evolve to serve agents, and how agents reshape data analytics and data engineering. Learn about autonomous data engineering, AI-powered data transformation, and intelligent data systems. Vendor-neutral. Practice-driven. Architecture-first.",
  keywords: [
    // Category C: Strategic Brand Keywords (P0)
    "agentic data stack",
    "building agentic data stack",
    "traditional vs agentic data stack",
    
    // Category A: High Value + Growing (P0)
    "AI-powered data transformation",
    "agentic semantic layer",
    "data stack automation with AI",
    "autonomous data engineering",
    
    // Category B: High Interest (P0/P1)
    "intelligent data systems",
    "data quality for AI agents",
    "AI agent data architecture",
    
    // Category A: Growing (P1)
    "agentic data catalog",
    "operating agentic data systems",
    "autonomous data pipelines",
    "catalog services for AI agents",
    "agentic ETL pipelines",
    
    // Category B: High Interest (P1)
    "data agents",
    "agentic data systems",
    
    // Additional high-value keywords
    "agent-driven data pipelines",
    "data engineering automation",
    "AI-powered analytics",
    "metadata management for agents",
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
      "A community exploring how modern data stacks evolve to serve agents, and how agents reshape data analytics and data engineering. Learn about autonomous data engineering, AI-powered data transformation, agentic semantic layers, and intelligent data systems.",
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
