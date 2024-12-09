import { LinkPreview } from "./ui/link-preview";

const Copyright = () => {
  return (
    <div className="w-full bg-pink-600 flex-col text-xs sm:text-sm md:text-base md:flex-row text-white flex justify-between items-center px-5 py-1 capitalize">
      <div className="">
        <p className="">
          Copyright © 2024 Zoyee Lifestyle. All rights reverved.
        </p>
      </div>
      <div className="">
        <p className="">
          Designed and Developer by{" "}
          <LinkPreview
            className="font-bold text-white tracking-wide"
            url="https://thenetsense.netlify.app"
          >
            TheNetSense
          </LinkPreview>
        </p>
      </div>
    </div>
  );
};

export default Copyright;
