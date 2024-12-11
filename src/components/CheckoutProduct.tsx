/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable @typescript-eslint/no-explicit-any */

import { useEffect, useState } from "react";
import CheckoutProductCard from "./CheckoutProductCard";
import toast from "react-hot-toast";
import { authStore } from "@/store/authStore";
import { Loader2 } from "lucide-react";
import { calculateDiscountedPrice } from "@/utils/helper";

const CheckoutProduct = ({
  productData,
  total,
  setAppliedCoupon,
}: {
  productData: any;
  total: number;
  setAppliedCoupon: (value: any) => void;
}) => {
  const [allProductDatas, setAllProductDatas] = useState<any>([]);

  const [totalPrice, setTotalPrice] = useState(0);

  const { isLoading, applyCoupon, user, getUserDataFromSanity } = authStore();

  const [couponCode, setCouponCode] = useState("");
  const [couponData, setCouponData] = useState<any>("");
  const [userData, setUserData] = useState<any | null>(null);

  useEffect(() => {
    const fetch = async () => {
      if (user && user.id) {
        try {
          const data = await getUserDataFromSanity(user.id);

          setUserData(data[0]);
        } catch (error) {
          console.error("Error fetching user data:", error);
        }
      }
    };
    fetch();
  }, [user]);

  const checkCoupon = async () => {
    if (couponCode.length === 0) {
      toast.error("Please Enter Coupon");
    } else {
      const couponData = await applyCoupon(couponCode);
      const couponId = couponData?._id;

      const userCoupon = userData?.usedCoupons;
      const filterCoupon =
        userCoupon?.filter((coupon: any) => coupon._id === couponId) || [];

      if (filterCoupon.length) {
        toast.error("Coupon Already Used");
        setCouponData(null);
        setAppliedCoupon(null);
      }

      if (!couponData) {
        toast.error("Invalid Coupon");
        setCouponData(null);
        setAppliedCoupon(null);
      }

      if (couponData && filterCoupon.length == 0) {
        setCouponData(couponData);
        setAppliedCoupon(couponData);

        const newTotal =
          couponData?.discountType === "percentage"
            ? Math.round(
                calculateDiscountedPrice(total, couponData?.discountValue)
              )
            : total - couponData?.discountValue;

        setTotalPrice(newTotal);
      }
    }
  };

  useEffect(() => {
    setAllProductDatas(productData);
    setTotalPrice(total);
  }, []);

  return (
    <div>
      <h3 className="text-xl font-semibold text-pink-600 mb-4">
        Product Details
      </h3>

      <div className="h-[200px] overflow-scroll">
        {allProductDatas.map((item: any) => (
          <CheckoutProductCard
            key={item?.productId}
            name={item?.productName}
            quantity={item?.quantity}
            image={item.img}
            finalPrice={item?.price}
            size={item?.size}
            color={item?.color}
          />
        ))}
      </div>

      <p className="font-semibold tracking-wider text-xl">
        Subtotal: <span className="text-pink-600">₹{total}</span>
      </p>

      <div className="flex items-center gap-2 mt-1">
        <label
          className="text-sm sm:text-base text-gray-700 cursor-pointer"
          htmlFor="coupon"
        >
          Have a coupon?
        </label>
      </div>

      <div className="  flex">
        <input
          type="text"
          placeholder="Enter Coupon Code...."
          onChange={(e) => setCouponCode(e.target.value)}
          value={couponCode}
          className="w-full text-sm border text-gray-600 border-red-200 rounded-l-sm px-2 focus:ring-2 focus:ring-pink-600 outline-none"
        />
        <button
          onClick={checkCoupon}
          className="px-4 py-2 bg-pink-600 text-sm font-semibold text-white rounded-r-sm hover:bg-pink-700 transition-all duration-300 ease-in-out"
        >
          {isLoading ? <Loader2 className="w-4 h-4 animate-spin" /> : "Apply"}
        </button>
      </div>

      {couponData && (
        <div className="">
          <p className="text-emerald-600 font-semibold">Coupon Accepted</p>
          <p className="">
            Discount:{" "}
            {couponData?.discountType === "percentage"
              ? `Extra ${couponData?.discountValue}% off`
              : couponData?.discountType === "fixed" &&
                `-₹${couponData?.discountValue} off`}
          </p>
        </div>
      )}

      <div className="my-4">
        <h3 className="text-lg sm:text-xl font-semibold text-gray-800 flex gap-2 items-center">
          Total:{" "}
          <span className="text-pink-600 flex gap-1 items-center">
            <p className={`${couponData && "line-through"}`}>
              ₹ {!couponData ? Math.round(total) : Math.round(totalPrice)}
            </p>
            <p className="">
              {couponData?.discountType === "percentage"
                ? `₹ ${totalPrice}`
                : couponData?.discountType === "fixed" && `₹ ${totalPrice}`}
            </p>
          </span>
        </h3>
      </div>
    </div>
  );
};

export default CheckoutProduct;
