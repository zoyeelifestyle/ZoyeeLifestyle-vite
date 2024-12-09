import FloatingShape from "./FloatingShape";
import HomeCarousal from "./HomeCarousal";

const Hero = () => {
  return (
    <section className="   relative overflow-hidden">
      <FloatingShape
        color="bg-pink-600"
        size="w-64 h-64"
        top="-5%"
        left="10%"
        delay={0}
      />
      <FloatingShape
        color="bg-rose-600"
        size="w-48 h-48"
        top="70%"
        left="80%"
        delay={5}
      />
      <FloatingShape
        color="bg-red-600"
        size="w-32 h-32"
        top="40%"
        left="-10%"
        delay={2}
      />
      <FloatingShape
        color="bg-orange-700"
        size="w-32 h-32"
        top="10%"
        left="-10%"
        delay={2}
      />

      <HomeCarousal />
    </section>
  );
};

export default Hero;
