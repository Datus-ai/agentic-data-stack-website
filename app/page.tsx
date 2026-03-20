import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import LatestContent from "@/components/LatestContent";
import Evolution from "@/components/Evolution";
import Features from "@/components/Features";
import HowItWorks from "@/components/HowItWorks";
import Tracks from "@/components/Tracks";
import FAQ from "@/components/FAQ";
import Footer from "@/components/Footer";
import { homepageFAQ } from "@/lib/faq-data";

export default function Home() {
  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: homepageFAQ.map((faq) => ({
      "@type": "Question",
      name: faq.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: faq.answer,
      },
    })),
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />
      <Navbar />
      <main>
        <Hero />
        <LatestContent />
        <Evolution />
        <Features />
        <HowItWorks />
        <Tracks />
        <FAQ items={homepageFAQ} />
      </main>
      <Footer />
    </>
  );
}
