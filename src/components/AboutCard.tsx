import { authStore } from "@/store/authStore";
import { AnimatedTestimonials } from "./ui/animated-testimonials";
import { useEffect } from "react";

export function AboutCard() {
  const { getAboutCard, aboutCard } = authStore();

  useEffect(() => {
    const fetch = async () => {
      await getAboutCard();
    };
    fetch();
  }, []);

  return (
    <>
      {aboutCard ? (
        <AnimatedTestimonials testimonials={aboutCard} />
      ) : (
        <div className="">No Card Found</div>
      )}
    </>
  );
}
