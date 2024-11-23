import { Link } from "react-router-dom";
import BannerImage from "../assets/clothes.png";

const PageBanner = ({
  title,
  isCategory,
}: {
  title: string;
  isCategory: boolean;
}) => {
  return (
    <div className="w-full relative h-[250px] ">
      <img
        src={BannerImage}
        width={1000}
        height={20}
        alt="Page Banner Image"
        className="w-full h-full object-cover"
      />
      <div className="w-full h-full bg-black absolute top-0 left-0 opacity-30"></div>
      <div className="w-full h-full absolute top-0 left-0 flex flex-col justify-center items-center space-y-3 text-white">
        <h2 className="font-bold text-4xl tracking-wider capitalize">
          {title}
        </h2>
        <p className="font-semibold  tracking-widest  flex justify-center items-center gap-2">
          <Link to={"/"}>Home</Link>
          {!isCategory ? (
            <>
              <span>&gt;</span>
              <span className="font-normal capitalize ">{title}</span>{" "}
            </>
          ) : (
            <>
              <span>&gt;</span>
              <span className="font-normal capitalize">Category</span>{" "}
              <span>&gt;</span>
              <span className="font-normal capitalize">{title}</span>{" "}
            </>
          )}
        </p>
      </div>
    </div>
  );
};

export default PageBanner;
