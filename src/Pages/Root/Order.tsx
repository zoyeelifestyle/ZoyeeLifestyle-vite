import OrderCard from "@/components/OrderCard";
import { Link } from "react-router-dom";

/* eslint-disable @typescript-eslint/no-explicit-any */
const Order = ({
  orderDetails,
  title,
}: {
  orderDetails: any;
  title: string;
}) => {
  return (
    <>
      {orderDetails?.length > 0 ? (
        <div>
          <h3 className="font-semibold text-sm md:text-lg capitalize ">
            {title}
          </h3>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-2 my-10">
            {/* Reverse the orderDetails array before mapping */}
            {orderDetails?.reverse().map((order: any, index: number) => {
              return <OrderCard key={index} details={order} />;
            })}
          </div>
        </div>
      ) : (
        <div className="flex flex-col justify-center items-center gap-4">
          <h3 className="font-semibold text-sm md:text-lg text-center">
            Make Your First Order Now
          </h3>

          <div className="">
            <Link to={"/shop"}>
              <button className="px-6 text-white font-semibold rounded-md hover:shadow-lg transition-all duration-200 ease-in-out py-2 bg-pink-600">
                Shop
              </button>
            </Link>
          </div>
        </div>
      )}
    </>
  );
};

export default Order;
