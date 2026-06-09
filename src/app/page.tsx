import Hero from "@/components/sections/Hero";
import Story from "@/components/sections/Story";
import Services from "@/components/sections/Services";
import Brands from "@/components/sections/Brands";
import Travel from "@/components/sections/Travel";
import Instagram from "@/components/sections/Instagram";
import Stats from "@/components/sections/Stats";
import Contact from "@/components/sections/Contact";
import Footer from "@/components/sections/Footer";

export default function Home() {
  return (
    <main>
      <Hero />
      <Story />
      <Services />
      <Brands />
      <Travel />
      <Instagram />
      <Stats />
      <Contact />
      <Footer />
    </main>
  );
}
