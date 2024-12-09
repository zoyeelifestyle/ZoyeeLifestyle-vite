/* eslint-disable @typescript-eslint/no-explicit-any */
import CartTable from "@/components/CartTable";
import LoadingSpinner from "@/components/LoadingSpinner";
import PageBanner from "@/components/PageBanner";
import { authStore } from "@/store/authStore";
import { calculateDiscountedPrice } from "@/utils/helper";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import RootLayout from "./RootLayout";
import { ChevronRight } from "lucide-react";
import toast from "react-hot-toast";

import { useNavigate } from "react-router-dom";

import CryptoJS from "crypto-js";

const CartPage = () => {
  const [cartData, setCartData] = useState<any>([]);
  const [totalPrice, setTotalPrice] = useState<number>(0);

  const { getSingleProduct, isLoading } = authStore();

  const [allCartProductData, setAllCartProductData] = useState<any>([]);

  const navigate = useNavigate();

  useEffect(() => {
    const productIds = JSON.parse(localStorage.getItem("cart") || "[]");

    if (productIds.length === 0) {
      setCartData([]);
      return;
    }

    const fetchProducts = async () => {
      try {
        const products = await Promise.all(
          productIds.map(async (id: any) => {
            const data = await getSingleProduct(id);
            return data;
          })
        );
        setCartData(products);
      } catch (error) {
        console.error("Error fetching cart products:", error);
      }
    };

    fetchProducts();
  }, [getSingleProduct]);

  useEffect(() => {
    const total = cartData.reduce((sum: number, item: any) => {
      const itemPrice = calculateDiscountedPrice(
        parseFloat(item.actual_price) || 0,
        20
      );
      return sum + itemPrice;
    }, 0);

    setTotalPrice(Number(total.toFixed(2)));
  }, [cartData]);

  const handleContinue = () => {
    if (cartData.length !== allCartProductData.length) {
      toast.error("Please Select all the details");
    } else {
      console.log("Cart Data", cartData);
      const encryptedData = CryptoJS.AES.encrypt(
        JSON.stringify(allCartProductData),
        "secret-key"
      ).toString();

      const encodedEncryptedData = encodeURIComponent(encryptedData);

      navigate(`/shipping-details/${encodedEncryptedData}`);
    }
  };

  return (
    <RootLayout>
      <div className="">
        {isLoading ? (
          <LoadingSpinner />
        ) : (
          <div>
            <PageBanner isCategory={false} title="Cart" />
            {cartData.length > 0 ? (
              <>
                <CartTable
                  cartData={cartData}
                  setTotalPrice={setTotalPrice}
                  totalPrice={totalPrice}
                  setCartData={setCartData}
                  setAllCartProductData={setAllCartProductData}
                  allCartProductData={allCartProductData}
                />

                <div className="px-5 w-full flex justify-end pb-10 cursor-pointer md:pr-28">
                  <div className="">
                    <div
                      onClick={handleContinue}
                      className="w-full flex gap-2 items-center px-4 py-2 rounded-md bg-pink-600 text-white font-semibold hover:opacity-90 hover:shadow-lg transition-all duration-300 ease-in-out"
                    >
                      <p className="">Continue</p>
                      <ChevronRight className="w-5 h-5" />
                    </div>
                  </div>
                </div>
              </>
            ) : (
              <div className="w-full h-[50vh] flex flex-col justify-center items-center gap-4 text-center">
                <p className="text-lg sm:text-xl">No Products In Cart</p>
                <div className="mt-4">
                  <Link
                    to="/shop"
                    className="px-6 py-3 rounded-md hover:opacity-90 hover:shadow-lg bg-pink-600 font-semibold tracking-wide text-white"
                  >
                    Back To Shop
                  </Link>
                </div>
              </div>
            )}
          </div>
        )}
      </div>
    </RootLayout>
  );
};

export default CartPage;
