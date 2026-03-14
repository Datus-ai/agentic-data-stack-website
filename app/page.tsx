import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import LatestContent from "@/components/LatestContent";
import Evolution from "@/components/Evolution";
import Features from "@/components/Features";
import HowItWorks from "@/components/HowItWorks";
import Tracks from "@/components/Tracks";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <>
      <Navbar />
      <main>
        <Hero />
        <LatestContent />
        <Evolution />
        <Features />
        <HowItWorks />
        <Tracks />
      </main>
      <Footer />
    </>
  );
}
