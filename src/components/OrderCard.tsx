/* eslint-disable @typescript-eslint/no-explicit-any */

import { removeExtra } from "@/utils/helper";

const OrderCard = ({ details }: { details: any }) => {
  return (
    <div className="bg-gradient-to-r border border-pink-600 h-fit shadow-xl rounded-lg overflow-hidden p-6 mb-6 hover:scale-105 transform transition-all duration-300 ease-in-out">
      <div className="flex justify-between items-start space-x-6">
        {/* Left Column */}
        <div className="flex-1 space-y-6">
          {/* Order Header */}
          <div className="flex justify-between items-start text-gray-800">
            <div>
              <p className="text-sm font-semibold text-gray-800">
                Order ID:{" "}
                <span className="font-normal text-gray-600">
                  {details.orderId}
                </span>
              </p>
              <p className="text-lg font-semibold text-gray-800 mt-2">
                Paid Amount:{" "}
                <span className="font-normal text-green-600">
                  ₹{details?.totalPaidPrice}
                </span>
              </p>
            </div>
            {/* Order Status */}
            <div className="flex flex-col items-end">
              <p
                className={`text-sm font-semibold px-4 py-1 rounded-full ${
                  details?.orderStatus === "ordered"
                    ? "bg-emerald-100 text-emerald-700"
                    : details?.orderStatus === "packed"
                    ? "bg-pink-100 text-pink-700"
                    : details?.orderStatus === "shipped"
                    ? "bg-indigo-100 text-indigo-700"
                    : "bg-orange-100 text-orange-700"
                }`}
              >
                {details?.orderStatus}
              </p>
            </div>
          </div>

          {/* Product List */}
          <div className="mt-4 max-h-[250px] overflow-y-auto">
            <h2 className="text-lg font-semibold text-gray-900 mb-4">
              Product Details
            </h2>
            <div className="space-y-4">
              {details?.orderProducts?.map((item: any) => (
                <div
                  className="flex items-center space-x-4 p-3 rounded-lg bg-white shadow-lg hover:shadow-xl transition-all duration-200 ease-in-out"
                  key={item._id}
                >
                  <img
                    src={item?.image}
                    className="w-16 h-16 object-cover rounded-md border-2 border-teal-500"
                    alt={item?.name}
                  />
                  <div className="flex-1">
                    <p className="font-semibold text-gray-800">
                      {removeExtra(item?.name)}
                    </p>
                    <div className="text-sm text-gray-600 flex gap-1 items-center">
                      <p className="">{item?.size}</p>|
                      <div
                        className="w-5 h-5 rounded-full"
                        style={{ backgroundColor: item?.color }}
                      ></div>
                    </div>
                    <p className="text-sm text-gray-500">
                      Qty: {item?.quantity}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Shipping Address */}
          <div className="mt-8">
            <h2 className="text-bases font-semibold text-gray-900 ">
              Shipping Address
            </h2>
            {details?.shippingAddress?.map((item: any) => (
              <div
                key={item._id}
                className="bg-white p-6 rounded-lg shadow-lg hover:shadow-xl transition-all duration-300 ease-in-out"
              >
                <div>
                  <p className="text-sm font-semibold text-gray-800">
                    {item?.username}
                  </p>
                  <p className="text-gray-600 text-sm ">{item?.address1}</p>
                  {item?.address2 && (
                    <p className="text-gray-600 text-sm ">{item?.address2}</p>
                  )}
                  <p className="text-gray-600 text-sm ">{item?.street}</p>
                </div>
                <div>
                  <p className="text-gray-600 text-sm ">
                    {item?.city}, {item?.state}
                  </p>
                  <div className="flex gap-1 items-center">
                    <p className="text-gray-600 text-sm ">{item?.country}</p> -{" "}
                    <p className="text-gray-600 text-sm ">{item?.zipCode}</p>
                  </div>
                  <p className="text-gray-600 flex items-center gap-2 text-sm ">
                    Phone: +91 {item?.phone}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default OrderCard;
