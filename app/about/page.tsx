import type { Metadata } from "next";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import Link from "next/link";

export const metadata: Metadata = {
  title: "About | Agentic Data Stack",
  description:
    "Learn about the Agentic Data Stack community — an open, vendor-neutral community exploring how modern data stacks evolve to serve AI agents. Founded by DatusAI.",
  openGraph: {
    title: "About | Agentic Data Stack",
    description:
      "An open community exploring how modern data stacks evolve to serve AI agents. Founded by DatusAI.",
    url: "https://agenticdatastack.org/about",
  },
};

export default function AboutPage() {
  return (
    <>
      <Navbar />
      <main className="min-h-screen px-6 py-24">
        <div className="mx-auto max-w-3xl">
          <h1 className="text-4xl font-bold tracking-tight sm:text-5xl">
            About
          </h1>

          <div className="mt-10 space-y-8 text-lg leading-relaxed text-muted">
            <p>
              <strong className="text-foreground">Agentic Data Stack</strong> is
              an open, vendor-neutral community exploring how modern data
              infrastructure evolves to serve AI agents. We bring together data
              engineers, platform teams, and technical leaders who are building
              the next generation of data systems.
            </p>

            <p>
              Our focus is practice-driven and architecture-first. Through{" "}
              <Link href="/blog" className="text-violet-400 hover:text-violet-300">
                deep-dive articles
              </Link>
              , a{" "}
              <Link href="/newsletter" className="text-violet-400 hover:text-violet-300">
                weekly newsletter
              </Link>
              , and a comprehensive{" "}
              <Link href="/resources" className="text-violet-400 hover:text-violet-300">
                resource hub
              </Link>
              , we map the landscape of agentic data tooling — from catalog
              services and lake formats to semantic layers and data agents.
            </p>

            <p>
              Everything we publish is open and community-driven. We welcome
              contributions, feedback, and collaboration from anyone passionate
              about the future of data infrastructure.
            </p>

            <div className="rounded-2xl border border-card-border bg-card-bg/50 p-8">
              <h2 className="text-xl font-semibold text-foreground">
                Founded by DatusAI
              </h2>
              <p className="mt-3 text-base text-muted">
                Agentic Data Stack is founded and maintained by{" "}
                <a
                  href="https://datus.ai"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-violet-400 hover:text-violet-300"
                >
                  DatusAI
                </a>
                , a company focused on bringing AI-native workflows to data
                teams. We started this community because we believe the
                intersection of data engineering and AI agents deserves a
                dedicated, independent space for exploration and learning.
              </p>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
