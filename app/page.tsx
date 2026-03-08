import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
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
        <Evolution />
        <Features />
        <HowItWorks />
        <Tracks />
      </main>
      <Footer />
    </>
  );
}
