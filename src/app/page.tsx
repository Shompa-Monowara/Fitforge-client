
import FAQ from "@/components/home/FAQ";
import Features from "@/components/home/Features";
import Hero from "@/components/home/Hero";
import HowItWorks from "@/components/home/HowItWorks";
import Newsletter from "@/components/home/Newsletter";
import Statistics from "@/components/home/Statistics";
import Testimonials from "@/components/home/Testimonials";


export default function Home() {
  return (
    <div >
      <Hero/>
      <Features/>
      <HowItWorks/>
      <Statistics/>
      <Testimonials/>
      <FAQ/>
      <Newsletter/>
    </div>
  );
}
