import HomeHero from "@/components/sections/homepage/HomeHero";
import AboutIntroSection from "@/components/sections/homepage/AboutIntroSection";
import CoursesCarouselSection from "@/components/sections/homepage/CoursesCarouselSection";
import TripsShowcaseSection from "@/components/sections/homepage/TripsShowcaseSection";
import TestimonialsSection from "@/components/sections/homepage/TestimonialsSection";
import CtaBannerSection from "@/components/sections/homepage/CtaBannerSection";

export default function Page() {
  return (
    <>
      <HomeHero />
      <AboutIntroSection />
      <CoursesCarouselSection />
      <TripsShowcaseSection />
      <TestimonialsSection />
      <CtaBannerSection />
    </>
  );
}
