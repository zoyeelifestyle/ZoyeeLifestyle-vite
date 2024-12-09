import Hero from "@/components/Hero";
import RootLayout from "./RootLayout";
import Category from "@/components/Category";
import AllProducts from "@/components/AllProducts";
import SpecialBanner from "@/components/SpecialBanner";
import About from "@/components/About";

const Home = () => {
  return (
    <RootLayout>
      <div className="">
        <Hero />
        <div className="hidden md:block">
          <SpecialBanner />
          <Category />
        </div>
        <div className="md:hidden">
          <Category />
        </div>
        <About />
        <AllProducts />
      </div>
    </RootLayout>
  );
};

export default Home;
