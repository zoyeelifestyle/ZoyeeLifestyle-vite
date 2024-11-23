import { useState } from "react";
import { Zoom } from "react-img-zoomer";

const SingleProductImageDisplay = ({
  imageOrVideoUrl,
}: {
  imageOrVideoUrl: Array<string>;
}) => {
  const [mainImage, setMainImage] = useState<string>(imageOrVideoUrl[0]);

  const changeImage = (imageUrl: string) => {
    setMainImage(imageUrl);
  };

  return (
    <div className="w-full">
      <div className="flex flex-col items-center">
        <div className="w-full py-5 flex justify-center items-center">
          <Zoom
            imagesrc={mainImage}
            size={300}
            className="w-full md:w-2/3 lg:w-1/2 rounded-md shadow-xl"
          />
          {/* {isImage(mainImage) ? (
          ) : (
            <video controls style={{ maxWidth: "100%" }}>
              <source src={mainImage} type="video/mp4" />
              Your browser does not support the video tag.
            </video>
          )} */}
        </div>

        {/* Thumbnails */}
        <div className="flex w-full justify-center items-center gap-3 mt-5 overflow-x-auto">
          {imageOrVideoUrl.map((image, index) => {
            return (
              <div key={index} className="flex-shrink-0">
                <img
                  src={image}
                  width={70}
                  height={40}
                  alt="side image"
                  className={`rounded-md cursor-pointer ${
                    image === mainImage && "border-2 border-pink-600"
                  }`}
                  onClick={() => changeImage(image)}
                />
              </div>
            );
            // return isImage(image) ? (

            // ) : (
            //   <video controls width={70} height={40} key={index}>
            //     <source src={image} type="video/mp4" />
            //     Your browser does not support the video tag.
            //   </video>
            // );
          })}
        </div>
      </div>
    </div>
  );
};

export default SingleProductImageDisplay;
