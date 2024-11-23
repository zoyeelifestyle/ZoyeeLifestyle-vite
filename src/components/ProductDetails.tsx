import { useEffect, useState } from "react";
import { Facebook, Instagram, ShoppingBag, ShoppingCart } from "lucide-react";
import {
  calculateDiscountedPrice,
  toggleLocalStorageCart,
} from "@/utils/helper";
import toast from "react-hot-toast";
import AdditionalInfo from "./AdditionalInfo";
import Counter from "./Counter";

interface Props {
  productId: number;
  category: string;
  title: string;
  price: number;
  discount: number;
  description: string;
  size: Array<string>;
  color: Array<string>;
}

const ProductDetails = ({
  productId,
  category,
  title,
  price,
  discount,
  description,
  size,
  color,
}: Props) => {
  const [isProductInCart, setIsProductInCart] = useState(false);

  const toggleCart = () => {
    toggleLocalStorageCart("cart", productId);

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

  return (
    <div className="my-5 px-4 sm:px-6 md:px-8 lg:px-12 space-y-5 w-full">
      <div className="-space-y-1">
        <p className="font-medium text-gray-400 tracking-wide capitalize">
          {category}
        </p>
        <h2 className="text-2xl sm:text-3xl font-semibold tracking-wider capitalize">
          {title}
        </h2>
      </div>

      <p className="text-sm sm:text-base text-justify">{description}</p>

      <div className="flex flex-col sm:flex-row gap-5 sm:gap-10">
        <div className="flex flex-col gap-1 font-semibold w-full sm:w-1/2">
          <h4>Size</h4>
          <div className="flex flex-wrap items-center gap-2 text-sm px-1 uppercase">
            {size.map((value, index) => (
              <p
                key={index}
                className="bg-pink-100 hover:bg-pink-400 hover:text-white cursor-pointer duration-200 ease-in-out transition-all px-2 py-1 rounded-md"
              >
                {value}
              </p>
            ))}
          </div>
        </div>
        <div className="flex flex-col gap-1 font-semibold w-full sm:w-1/2">
          <h4>Color</h4>
          <div className="flex flex-wrap items-center gap-2 text-sm px-1">
            {color.map((value, index) => (
              <p
                key={index}
                className="w-7 h-7 rounded-full"
                style={{ backgroundColor: value }}
              ></p>
            ))}
          </div>
        </div>
      </div>

      <div className="flex items-center text-xl gap-3">
        <p className="font-extrabold tracking-wider">
          ₹ {calculateDiscountedPrice(price, discount)}
        </p>
        <p className="font-extrabold text-gray-400 line-through tracking-wider">
          ₹ {price}
        </p>
      </div>

      <Counter total={4} />

      <div className="flex flex-col gap-3 sm:flex-row sm:gap-5">
        <div className="flex px-10 justify-center items-center py-3 gap-5 hover:shadow-2xl capitalize text-white font-semibold bg-pink-600 rounded-md cursor-pointer">
          <ShoppingBag />
          <button>Buy Now</button>
        </div>
        <div
          onClick={toggleCart}
          className="flex justify-center px-10 items-center cursor-pointer gap-5 text-pink-600 font-semibold border-double capitalize border-[3px] py-3 rounded-md hover:shadow-2xl border-pink-600"
        >
          <ShoppingCart />
          <button>
            {isProductInCart ? "Remove From Cart" : "Add To Cart"}
          </button>
        </div>
      </div>
      <div className="">
        <AdditionalInfo
          skuValue="SS001"
          tags={["dress", "fashion", "ladies"]}
          socialMedia={[
            {
              Icon: Facebook,
              link: "https://google.com",
            },
            {
              Icon: Instagram,
              link: "https://google.com",
            },
          ]}
        />
      </div>
    </div>
  );
};

export default ProductDetails;
