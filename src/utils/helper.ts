import { Data } from "../types/index.types";

// import { generateVideoThumbnail } from "generate-video-dumbnail";

export const removeExtra = (content: string) => {
  return content.length > 15 ? content.slice(0, 15) + "...." : content;
};

export const removeExtraForSingleProduct = (content: string) => {
  return content.length > 15 ? content.slice(0, 15) + "....." : content;
};

export const calculateDiscountedPrice = (
  actualPrice: number,
  discount: number
): number => {
  const discountAmount = actualPrice * (discount / 100);
  const discountedPrice = actualPrice - discountAmount;

  return roundOffTwoDecimal(discountedPrice);
};

export const paginationData = (currentPageNo: number, pageSize: number) => {
  const start: number = (currentPageNo - 1) * pageSize; // start index
  const end: number = currentPageNo * pageSize; // end index (not inclusive)

  return [start, end];
};

export const getFilteredData = (filterBy: string, data: Array<Data>) => {
  // console.log(filterBy);

  if (filterBy === "By Title") {
    return data.sort((a: Data, b: Data) => {
      return a.title.localeCompare(b.title);
    });
  } else if (filterBy === "High to Low") {
    console.log("inside the title");

    return data.sort((a: Data, b: Data) => {
      return b.price - a.price;
    });
  } else if (filterBy === "Low to High") {
    return data.sort((a: Data, b: Data) => {
      return a.price - b.price;
    });
  }

  return data;
};

export const isImage = (url: string) => {
  return /\.(jpg|jpeg|png|gif|bmp|webp)$/i.test(url);
};

export const isVideo = (url: string) => {
  return /\.(mp4|webm|ogg)$/i.test(url);
};

// export const thumbnailGenerator = async (videoUrl: string) => {
//   const THUMBNAIL_POSITION = 1.3;
//   generateVideoThumbnail(videoUrl, THUMBNAIL_POSITION, {
//     size: {
//       width: 640,
//       height: 200,
//     },
//     format: "image/jpeg",
//     quality: 0.88,
//   }).then((thumbnailUrl) => {
//     console.log(thumbnailUrl);
//     return thumbnailUrl;
//   });
// };

export const toggleLocalStorageCart = (
  storageName: string,
  productId: number
) => {
  const cart = JSON.parse(localStorage.getItem(storageName) || "[]");

  const productIndex = cart.indexOf(productId);

  if (productIndex === -1) {
    cart.push(productId);
  } else {
    cart.splice(productIndex, 1);
  }

  localStorage.setItem(storageName, JSON.stringify(cart));
};

export const roundOffTwoDecimal = (price: number) => {
  return Math.round(price * 100) / 100;
};
