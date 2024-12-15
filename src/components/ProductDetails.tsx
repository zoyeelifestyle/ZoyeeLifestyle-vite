/* eslint-disable @typescript-eslint/no-explicit-any */
import { useEffect, useState } from "react";
import { ShoppingBag, ShoppingCart } from "lucide-react";
import {
  calculateDiscountedPrice,
  toggleLocalStorageCart,
} from "@/utils/helper";
import toast from "react-hot-toast";
import AdditionalInfo from "./AdditionalInfo";
import Counter from "./Counter";
import { authStore } from "@/store/authStore";
import SketetonWrapper from "./SkeletonWrapper";
import { useNavigate } from "react-router-dom";

import CryptoJS from "crypto-js";

// import { useNavigate } from "react-router-dom";

interface Props {
  productId: string;
  category: string;
  title: string;
  price: number;
  discount: number;
  discounted_price: number;
  description: string;
  size: Array<any>;
  color: Array<any>;
  tags: Array<string>;
  skuValue: string;
  isLaunched: boolean;
  image: string;
  isSoldOut: boolean;
}

const ProductDetails = ({
  productId,
  category,
  title,
  price,
  discount,
  discounted_price,
  description,
  size,
  color,
  tags,
  skuValue,
  isLaunched,
  image,
  isSoldOut,
}: Props) => {
  const navigate = useNavigate();

  const [isProductInCart, setIsProductInCart] = useState(false);
  const { isLoading } = authStore();

  const [selectedSize, setSelectedSize] = useState("");
  const [selectedColor, setSelectedColor] = useState("");
  const [quantity, setQuantity] = useState(1);

  const toggleCart = () => {
    toggleLocalStorageCart("cart", `${productId}`);

    const cart = JSON.parse(localStorage.getItem("cart") || "[]");
    setIsProductInCart(cart.includes(productId));

    if (!isProductInCart) {
      toast.success("Product Added To Cart");
    } else {
      toast.success("Product Removed From Cart");
    }
  };

  useEffect(() => {
    const cart = JSON.parse(localStorage.getItem("cart") || "[]");
    setIsProductInCart(cart.includes(productId));
  }, [productId]);

  // const navigate = useNavigate();

  const buyNow = async () => {
    if (!selectedSize) {
      toast("Select Preferred Size", {
        icon: "👗",
      });
      return;
    }

    if (!selectedColor) {
      toast("Select Preferred Color", {
        icon: "👗",
      });
      return;
    }

    // const data = await getUserOtherData(user.id);

    if (selectedColor && selectedSize && quantity) {
      const product = {
        where: "direct",
        preorder: !isLaunched,
        productName: title,
        price: discounted_price
          ? discounted_price
          : Math.round(calculateDiscountedPrice(price, discount)),

        size: selectedSize,
        color: selectedColor,
        quantity,
        productId,
        img: image,
      };

      const encryptedData = CryptoJS.AES.encrypt(
        JSON.stringify(product),
        "secret-key"
      ).toString();

      const encodedEncryptedData = encodeURIComponent(encryptedData);

      navigate(`/shipping-details/${encodedEncryptedData}`);
    }
  };

  return (
    <div className="my-5 px-4 sm:px-6 md:px-8 lg:px-12 space-y-5 w-full">
      <div className="space-y-1">
        <div className="font-medium inline-block  text-gray-400 tracking-wide capitalize">
          <SketetonWrapper isLoading={isLoading}>{category}</SketetonWrapper>
        </div>

        <SketetonWrapper isLoading={isLoading}>
          <h2 className="text-2xl sm:text-3xl font-semibold tracking-wider capitalize">
            {title}
          </h2>
        </SketetonWrapper>
      </div>

      <SketetonWrapper isLoading={isLoading}>
        <p className="text-sm sm:text-base text-justify">{description}</p>
      </SketetonWrapper>

      <div className="flex flex-col sm:flex-row gap-5 sm:gap-10">
        <div className="flex flex-col gap-1 font-semibold w-full sm:w-1/2">
          <h4>Size</h4>
          <SketetonWrapper isLoading={isLoading}>
            <div className="flex flex-wrap items-center gap-2 text-sm px-1 uppercase">
              {size.map((item, index) => (
                <p
                  key={index}
                  onClick={() => setSelectedSize(item)}
                  className={`bg-pink-100 ${
                    selectedSize === item && "bg-pink-400 text-white"
                  } hover:bg-pink-400 hover:text-white cursor-pointer duration-200 ease-in-out transition-all px-2 py-1 rounded-md`}
                >
                  {item}
                </p>
              ))}
            </div>
          </SketetonWrapper>
        </div>
        <div className="flex flex-col gap-1 font-semibold w-full sm:w-1/2">
          <h4>Color</h4>
          <SketetonWrapper isLoading={isLoading}>
            <div className="flex flex-wrap items-center gap-2 text-sm px-1">
              {color.map((value, index) => (
                <p
                  onClick={() => setSelectedColor(value.hex)}
                  key={index}
                  className={`w-7 h-7 rounded-full cursor-pointer ${
                    selectedColor === value.hex &&
                    "border-[3px] border-pink-600"
                  } `}
                  style={{ backgroundColor: value.hex }}
                ></p>
              ))}
            </div>
          </SketetonWrapper>
        </div>
      </div>

      <div className="">
        <div className="flex items-center text-xl gap-3">
          <p className="font-extrabold tracking-wider">
            <SketetonWrapper isLoading={isLoading}>
              {discounted_price
                ? `₹ ${discounted_price}`
                : discount &&
                  `₹ ${Math.round(
                    calculateDiscountedPrice(price, discount)
                  )}  (${discount}% Off)`}
            </SketetonWrapper>
          </p>
          <p
            className={`font-extrabold ${
              !discount && !discounted_price ? "" : "text-gray-400 line-through"
            }  tracking-wider`}
          >
            <SketetonWrapper isLoading={isLoading}>₹ {price}</SketetonWrapper>
          </p>
        </div>
        <div className="text-xs font-medium text-gray-500">
          <p className="">Shipping and Tax Included</p>
        </div>
      </div>

      <Counter total={10} quantity={quantity} setQuantity={setQuantity} />

      <div className="flex flex-col gap-3 sm:flex-row sm:gap-5">
        {isSoldOut ? (
          <button
            disabled={true}
            className="flex px-10 justify-center items-center py-3 gap-5 hover:shadow-2xl capitalize text-white font-semibold bg-gray-600 transition-all duration-200 ease-in-out rounded-md cursor-not-allowed opacity-65"
          >
            Sold Out!
          </button>
        ) : !isLaunched ? (
          <div
            onClick={buyNow}
            className="flex px-10 justify-center items-center py-3 gap-5 hover:shadow-2xl capitalize text-white font-semibold bg-emerald-600 transition-all duration-200 ease-in-out rounded-md cursor-pointer"
          >
            <button>Pre-Book Now!</button>
          </div>
        ) : (
          <div
            onClick={buyNow}
            className="flex px-10 justify-center items-center py-3 gap-5 hover:shadow-2xl capitalize text-white font-semibold bg-pink-600 rounded-md cursor-pointer"
          >
            <ShoppingBag />
            <button>Buy Now</button>
          </div>
        )}

        {!isSoldOut && isLaunched && (
          <div
            onClick={toggleCart}
            className="flex justify-center px-10 items-center cursor-pointer gap-5 text-pink-600 font-semibold border-double capitalize border-[3px] py-3 rounded-md hover:shadow-2xl border-pink-600"
          >
            <ShoppingCart />
            <button>
              {isProductInCart ? "Remove From Cart" : "Add To Cart"}
            </button>
          </div>
        )}
      </div>
      <div className="">
        <AdditionalInfo skuValue={skuValue} tags={tags} />
      </div>
    </div>
  );
};

export default ProductDetails;
