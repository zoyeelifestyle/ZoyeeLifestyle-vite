/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState, useEffect } from "react";
import { ShoppingCart } from "lucide-react";
import toast from "react-hot-toast";
import { Link } from "react-router-dom";
import CustomTooltip from "./CustomTooltip";
import {
  calculateDiscountedPrice,
  removeExtra,
  toggleLocalStorageCart,
} from "../utils/helper";
import { motion } from "framer-motion";

interface Props {
  productId: string;
  title: string;
  category: string;
  price: number;
  discount?: number;
  discount_price?: number;
  imageDatas: Array<any>;
  preBook: boolean;
  isSoldOut: boolean;
}

const ProductCard = ({
  title,
  category,
  price,
  discount,
  productId,
  imageDatas,
  discount_price,
  preBook,
  isSoldOut,
}: Props) => {
  const [isInCart, setIsInCart] = useState<boolean>(false);
  const [displayImage, setDisplayImage] = useState(0);

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
    <motion.div
      className="bg-gray-50 cursor-pointer transition-transform transform hover:scale-105 hover:shadow-lg hover:bg-gray-100"
      initial={{ opacity: 0, scale: 0.95 }}
      whileInView={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
    >
      <div className="relative w-full">
        <Link to={`/shop/${productId}`}>
          {/* Image Zoom Animation */}
          <motion.img
            src={`${imageDatas[displayImage].asset.url}`}
            alt={title}
            className="object-cover border-[2px] w-full h-[200px] md:h-[300px] transition-opacity duration-500 ease-in-out hover:opacity-80"
            onMouseEnter={() =>
              setDisplayImage((prev) =>
                prev < imageDatas.length - 1 ? prev + 1 : 0
              )
            }
            onMouseLeave={() => setDisplayImage(0)}
            initial={{ scale: 1 }}
            whileHover={{ scale: 1.1 }}
            transition={{ duration: 0.3 }}
          />
        </Link>
        {discount && (
          <div className="px-2 text-sm rounded-[20px] font-semibold absolute top-3 right-3 z-20 bg-white tracking-wider text-emerald-700">
            {/* -{discount}% */}
            <CustomTooltip
              p={`${discount}% Off`}
              text="Discount"
              color="bg-green-600"
            />
          </div>
        )}
        {isSoldOut && (
          <div className="absolute top-1/2  -translate-y-1/2 md:py-5 py-2 md:text-xl  w-full bg-pink-600 text-white font-semibold">
            <p className="text-center">Sold Out</p>
          </div>
        )}
        {preBook
          ? !isSoldOut && (
              <motion.div
                onClick={cartBtnClicked}
                className={`p-2 text-sm rounded-full flex justify-center items-center font-semibold absolute bottom-3 right-3 z-20 tracking-wider ${
                  isInCart ? "text-white bg-pink-600" : "text-pink-600 bg-white"
                } transition-all duration-200`}
                initial={{ scale: 0.8, opacity: 0 }}
                whileInView={{ scale: 1, opacity: 1 }}
                transition={{ duration: 0.4, type: "spring", stiffness: 300 }}
              >
                <CustomTooltip
                  Icon={ShoppingCart}
                  text={`${!isInCart ? "Add To Cart" : "Remove From Cart"}`}
                />
              </motion.div>
            )
          : !isSoldOut && (
              <motion.div
                className={` text-sm rounded-full flex justify-center border border-pink-600 bg-white items-center font-semibold absolute left-3 bottom-3 z-20 tracking-widers transition-all duration-200`}
                initial={{ scale: 0.8, opacity: 0 }}
                whileInView={{ scale: 1, opacity: 1 }}
                transition={{ duration: 0.4, type: "spring", stiffness: 300 }}
              >
                <p className="text-xs px-2 text-indigo-700 ">pre-book</p>
              </motion.div>
            )}
      </div>
      <Link to={`/shop/${productId}`}>
        <div className="space-y-1 px-3 py-3">
          {/* Title Animation */}
          <motion.h2
            className="font-semibold text-sm md:text-base lg:text-lg"
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            {removeExtra(title)}
          </motion.h2>
          <p className="text-gray-500 text-xs md:text-sm tracking-wide">
            {category}
          </p>
          <div className="flex justify-between">
            {/* Price Animation */}
            {discount && (
              <motion.p
                className="font-extrabold text-sm md:text-xl"
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.3 }}
              >
                ₹ {Math.round(calculateDiscountedPrice(price, discount))}
              </motion.p>
            )}
            {discount_price && (
              <motion.p
                className="font-extrabold text-sm md:text-xl"
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.3 }}
              >
                ₹ {discount_price}
              </motion.p>
            )}
            {(discount || discount_price) && (
              <p className="text-gray-400 text-sm font-extrabold line-through md:text-xl">
                ₹ {price}
              </p>
            )}
            {!discount && !discount_price && (
              <p className="text-sm font-extrabold md:text-xl">₹ {price}</p>
            )}
          </div>
        </div>
      </Link>
    </motion.div>
  );
};

export default ProductCard;
