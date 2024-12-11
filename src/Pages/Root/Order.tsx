import OrderCard from "@/components/OrderCard";

/* eslint-disable @typescript-eslint/no-explicit-any */
const Order = ({ orderDetails }: { orderDetails: any }) => {
  console.log("order details", orderDetails);

  return (
    <div>
      <h3>Order Details</h3>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-2 my-10">
        {orderDetails?.map((order: any, index: number) => {
          return <OrderCard key={index} details={order} />;
        })}
      </div>
    </div>
  );
};

export default Order;
