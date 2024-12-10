/* eslint-disable react-hooks/exhaustive-deps */
import { authStore } from "@/store/authStore";
import { calculateDiscountedPrice, removeExtra } from "@/utils/helper";
import { Loader2 } from "lucide-react";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";

/* eslint-disable @typescript-eslint/no-explicit-any */
const DirectCheckoutProduct = ({
  productData,
  total,
  setTotal,
  setAppliedCoupon,
}: {
  productData: any;
  setTotal: (value: number) => void;
  total: number;
  setAppliedCoupon: (value: any) => void;
}) => {
  const { isLoading, applyCoupon, user, getUserDataFromSanity } = authStore();

  const [couponCode, setCouponCode] = useState("");
  const [couponData, setCouponData] = useState<any>("");

  const [userData, setUserData] = useState<any | null>(null);

  useEffect(() => {
    setTotal(productData?.price * productData?.quantity);
  }, []);

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
      const filterCoupon = userCoupon.filter(
        (coupon: any) => coupon._id === couponId
      );

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
      }
    }
  };

  useEffect(() => {
    if (couponData?.discountType === "percentage") {
      const value = Math.round(
        calculateDiscountedPrice(
          productData?.price * productData?.quantity,
          couponData?.discountValue
        )
      );

      setTotal(value);
    } else if (couponData?.discountType === "fixed") {
      setTotal(
        productData?.price * productData?.quantity - couponData?.discountValue
      );
    }
  }, [couponData]);

  return (
    <div>
      <h3 className="text-xl font-semibold text-pink-600 mb-4">
        Product Details
      </h3>

      <div className="py-2 flex gap-2">
        <div className="">
          <img
            src={productData?.img}
            alt={productData?.productId}
            className="w-[100px] h-full rounded-md"
          />
        </div>
        <div className="flex flex-col gap-1">
          <h2 className="font-semibold">
            {removeExtra(productData?.productName)}
          </h2>
          <p>
            Size: <span className="font-semibold">{productData.size}</span>
          </p>
          <p className="flex items-center gap-2">
            Color:{" "}
            <div
              className="w-5 h-5 rounded-full"
              style={{ backgroundColor: productData?.color }}
            ></div>
          </p>
          <p>
            Quantity:{" "}
            <span className="font-semibold">{productData?.quantity}</span>
          </p>
          <p className="">
            Final Price:{" "}
            <span className="font-semibold">
              ₹ {Math.round(productData?.price * productData.quantity)}
            </span>
          </p>
        </div>
      </div>

      <div className="font-semibold tracking-wider text-xl">
        <h3 className="text-lg sm:text-xl font-semibold text-gray-800">
          Subtotal:{" "}
          <span className="text-pink-600">
            ₹{Math.round(productData?.price * productData.quantity)}
          </span>
        </h3>

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
              ₹{" "}
              {couponData
                ? Math.round(productData?.price * productData?.quantity)
                : Math.round(productData?.price * productData?.quantity)}
            </p>
            <p className="">
              {couponData?.discountType === "percentage"
                ? `₹ ${total}`
                : couponData?.discountType === "fixed" && `₹ ${total}`}
            </p>
          </span>
        </h3>
      </div>
    </div>
  );
};

export default DirectCheckoutProduct;
