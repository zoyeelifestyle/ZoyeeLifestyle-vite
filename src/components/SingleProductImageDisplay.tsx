/* eslint-disable @typescript-eslint/no-explicit-any */
import { useEffect, useState } from "react";
import { Zoom } from "react-img-zoomer";
import SketetonWrapper from "./SkeletonWrapper";
import { authStore } from "@/store/authStore";

interface SingleProductImageDisplayProps {
  imageOrVideoUrl: any[];
}

const SingleProductImageDisplay = ({
  imageOrVideoUrl,
}: SingleProductImageDisplayProps) => {
  const [mainImage, setMainImage] = useState<string>("");

  const { isLoading } = authStore();

  // Update main image when imageOrVideoUrl changes
  useEffect(() => {
    if (imageOrVideoUrl.length > 0 && imageOrVideoUrl[0]?.asset.url) {
      setMainImage(imageOrVideoUrl[0].asset.url);
    }
  }, [imageOrVideoUrl]);

  const changeImage = (imageUrl: string) => {
    setMainImage(imageUrl);
  };

  // Generate image URL with base path
  const getImageUrl = (url: string) => `${url}`;

  return (
    <div className="w-full">
      <div className="flex flex-col items-center">
        <div className="w-full py-5 flex justify-center items-center">
          <SketetonWrapper isLoading={isLoading}>
            <Zoom
              imagesrc={getImageUrl(mainImage)}
              size={300}
              className="w-full md:w-2/3 lg:w-1/2 rounded-md shadow-xl"
            />
          </SketetonWrapper>
        </div>

        {/* Thumbnails */}
        <div className="flex w-full justify-center items-center gap-3 mt-5 overflow-x-auto">
          {imageOrVideoUrl.map((image, index) => (
            <div key={index} className="flex-shrink-0">
              <SketetonWrapper isLoading={isLoading}>
                <img
                  src={getImageUrl(image.asset.url)}
                  width={70}
                  height={40}
                  alt={`side image ${index}`}
                  className={`rounded-md h-[70px] object-cover cursor-pointer ${
                    image?.asset?.url === mainImage
                      ? "border-2 border-pink-600"
                      : ""
                  }`}
                  onClick={() => changeImage(image.asset.url)}
                />
              </SketetonWrapper>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default SingleProductImageDisplay;
