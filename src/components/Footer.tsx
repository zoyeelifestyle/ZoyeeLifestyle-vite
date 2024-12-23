/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { FOOTERHELP, FOOTERLINKS } from "@/constants/index.constants";
import AuthLogo from "./AuthLogo";
import { Link } from "react-router-dom";
import { BackgroundBeamsWithCollision } from "./ui/background-beams-with-collision";
import { authStore } from "@/store/authStore";
import { useEffect, useState } from "react";
import SketetonWrapper from "./SkeletonWrapper";

const Footer = () => {
  const { getBasicInfo, isLoading } = authStore();

  const [basicDetails, setBasicDetails] = useState<any | null>(null);

  useEffect(() => {
    const fetch = async () => {
      const data = await getBasicInfo();

      setBasicDetails(data);
    };
    fetch();
  }, []);

  return (
    <BackgroundBeamsWithCollision>
      <section className="w-full flex flex-col lg:flex-row gap-4 lg:gap-0  px-7 lg:px-0 items-start py-8 lg:py-20 justify-evenly bg-gray-50">
        {/* <div className="flex lg:hidden flex-col pb-10 items-center justify-center w-full gap-2">
          <h3 className="font-semibold  text-pink-600 text-xl tracking-wide">
            Newsletter
          </h3>
          <div className="flex items-center gap-2 bg-white p-2 rounded-lg shadow-md">
            <input
              type="text"
              placeholder="Your Email"
              className="text-sm outline-none border border-gray-300 px-4 py-2 rounded-l-lg w-full"
            />
            <button className="px-4 font-medium text-sm py-2 bg-gray-100 text-pink-600 rounded-r-lg transition-all duration-200 ease-in-out hover:bg-pink-600 hover:text-white">
              Subscribe
            </button>
          </div>
        </div> */}

        <div className="flex flex-col gap-3 items-start">
          <div className="hidden lg:block">
            <AuthLogo width={200} height={40} />
          </div>
          <div className="flex lg:hidden">
            <AuthLogo width={200} height={40} />
          </div>
          <address className="">
            <SketetonWrapper isLoading={isLoading}>
              <p className="font-medium text-sm md:text-lg">
                {basicDetails && `${basicDetails[0].address}`}
              </p>
            </SketetonWrapper>
          </address>
        </div>

        <div className="flex flex-col gap-2">
          <h3 className="font-semibold  md:text-lg text-pink-600">Links</h3>
          <div className="flex flex-col gap-1 text-sm font-medium ">
            {FOOTERLINKS.map((item, index) => (
              <Link to={item.link} key={index}>
                <p className="">{item.label}</p>
              </Link>
            ))}
          </div>
        </div>
        <div className="flex flex-col gap-2">
          <h3 className="font-semibold md:text-lg text-pink-600">Help</h3>
          <div className="flex flex-col gap-1 text-sm font-medium">
            {FOOTERHELP.map((item, index) => (
              <Link to={item.link} key={index}>
                <p className="">{item.label}</p>
              </Link>
            ))}
          </div>
        </div>
      </section>
    </BackgroundBeamsWithCollision>
  );
};

export default Footer;
