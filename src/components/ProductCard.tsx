import {
  calculateDiscountedPrice,
  removeExtra,
  toggleLocalStorageCart,
} from "../utils/helper";
import { ShoppingCart } from "lucide-react";

import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { Link } from "react-router-dom";
import CustomTooltip from "./CustomTooltip";

interface Props {
  productId: number;
  imgUrl: string;
  title: string;
  category: string;
  price: number;
  discount: number;
}

const ProductCard = ({
  imgUrl,
  title,
  category,
  price,
  discount,
  productId,
}: Props) => {
  const [isInCart, setIsInCart] = useState<boolean>(false);

  const cartBtnClicked = () => {
    toggleLocalStorageCart("cart", productId);

    const getData = JSON.parse(localStorage.getItem("cart") || "[]");
    setIsInCart(getData.includes(productId));
    if (!isInCart) {
      toast.success("Product Added To Cart");
    } else {
      toast.success("Product Removed From Cart");
    }
  };

  useEffect(() => {
    const getLocalStorageCartDetail = () => {
      const getData = JSON.parse(localStorage.getItem("cart") || "[]");
      setIsInCart(getData.includes(productId));
    };
    getLocalStorageCartDetail();
  }, [productId]);

  return (
    <div className="bg-gray-50 cursor-pointer w-fit transition-transform transform hover:scale-105 hover:shadow-lg hover:bg-gray-100">
      <div className="relative w-full">
        <Link to={`/shop/${productId}`}>
          <img
            src={imgUrl}
            alt={title}
            width={250}
            height={30}
            className="object-cover w-full transition-all duration-300 hover:opacity-80 "
          />
        </Link>
        <div className="px-2  text-sm rounded-[20px] font-semibold absolute top-3 right-3 z-20 bg-white tracking-wider text-emerald-700">
          {/* -{discount}% */}
          <CustomTooltip p={"-20%"} text="Discount" color="bg-green-600" />
        </div>
        <div
          onClick={cartBtnClicked}
          className={`p-2 text-sm rounded-full flex justify-center items-center font-semibold absolute bottom-3 right-3 z-20 tracking-wider ${
            isInCart ? "text-white bg-pink-600" : "text-pink-600 bg-white"
          }  transition-all duration-200 `}
        >
          <CustomTooltip
            Icon={ShoppingCart}
            text={`${!isInCart ? "Add To Cart" : "Remove From Cart"}`}
          />
          {/* <ShoppingCart className="w-4 h-4" /> */}
        </div>
      </div>
      <Link to={`/shop/${productId}`}>
        <div className="space-y-1 px-3 py-1">
          <h2 className="font-semibold  md:text-2xl">{removeExtra(title)}</h2>
          <p className="text-gray-500 text-sm tracking-wide">{category}</p>
          <div className="flex justify-between">
            <p className="font-extrabold  md:text-xl">
              ₹ {calculateDiscountedPrice(price, discount)}
            </p>
            <p className="text-gray-400 font-extrabold line-through md:text-xl">
              ₹ {price}
            </p>
          </div>
        </div>
      </Link>
    </div>
  );
};

export default ProductCard;
