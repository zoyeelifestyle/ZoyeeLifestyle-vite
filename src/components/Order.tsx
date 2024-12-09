/* eslint-disable @typescript-eslint/no-explicit-any */
import { useEffect, useState } from "react";

const Order = ({
  userEmail,
  userId,
}: {
  userEmail: string;
  userId: string;
}) => {
  useEffect(() => {
    fetchOrders(userEmail, userId);
  }, []);

  const [orders, setOrders] = useState<any[]>([]);

  // Fetch user orders (mocking here)
  const fetchOrders = async (userEmail: string, userId: string) => {
    console.log("UserData: ", { email: userEmail, _id: userId });

    // Mock data for orders
    const mockOrders = [
      { id: 1, date: "2024-11-10", totalAmount: 99.99, status: "Shipped" },
      { id: 2, date: "2024-10-25", totalAmount: 49.49, status: "Delivered" },
    ];

    setOrders(mockOrders);
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow-lg">
      <h2 className="text-2xl font-semibold text-gray-800 mb-4">Your Orders</h2>
      {orders.length > 0 ? (
        <ul className="space-y-4">
          {orders.map((order) => (
            <li
              key={order.id}
              className="p-5 bg-gray-50 border border-gray-200 rounded-lg shadow-sm flex justify-between items-center"
            >
              <div>
                <p className="font-semibold text-gray-700">
                  Order ID: #{order.id}
                </p>
                <p className="text-sm text-gray-500">{order.date}</p>
              </div>
              <div className="flex items-center space-x-4">
                <p className="font-medium text-lg text-gray-800">
                  ${order.totalAmount.toFixed(2)}
                </p>
                <span
                  className={`px-3 py-1 text-xs rounded-full ${
                    order.status === "Shipped"
                      ? "bg-blue-500 text-white"
                      : "bg-green-500 text-white"
                  }`}
                >
                  {order.status}
                </span>
              </div>
            </li>
          ))}
        </ul>
      ) : (
        <p className="text-gray-600">You have no orders yet.</p>
      )}
    </div>
  );
};

export default Order;
