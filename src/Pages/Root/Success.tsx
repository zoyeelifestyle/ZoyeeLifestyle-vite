/* eslint-disable @typescript-eslint/no-explicit-any */
import { useEffect, useState } from "react";
import RootLayout from "./RootLayout";
import { authStore } from "@/store/authStore";
import { jsPDF } from "jspdf"; // Import jsPDF

const Success = () => {
  const { fetchOrderDetails } = authStore();

  const [orderData, setOrderData] = useState<any>(null);
  const [orderProducts, setOrderProducts] = useState<any>([]);

  useEffect(() => {
    const fetch = async () => {
      const orderId = JSON.parse(localStorage.getItem("order") || "");
      if (orderId) {
        const orderData = await fetchOrderDetails(orderId);
        if (orderData?.length > 0) {
          setOrderData(orderData[0]);
          setOrderProducts(orderData[0].orderProducts);
        }
      }
    };
    fetch();
  }, [fetchOrderDetails]);

  const generatePDF = () => {
    if (!orderData || !orderProducts || orderProducts.length === 0) {
      alert("No order data available for PDF generation.");
      return;
    }

    const doc = new jsPDF();

    // Set title style
    doc.setFont("helvetica", "bold");
    doc.setFontSize(24);
    doc.setTextColor(40, 53, 147); // Dark blue color
    doc.text(
      `${orderData?.fullName || "Customer"}, Thank You for Your Order!`,
      20,
      20
    );

    // Add Order Details Section
    doc.setFontSize(14);
    doc.setTextColor(0, 0, 0); // Black color
    doc.text(`Order ID: ${orderData?.orderId || "N/A"}`, 20, 40);
    doc.text(`Amount Paid: ₹${orderData?.totalPaidPrice || "0"}`, 20, 50);
    doc.text(`Order Status: ${orderData?.orderStatus || "N/A"}`, 20, 60);

    // Draw a line below order details for separation
    doc.setLineWidth(0.5);
    doc.line(20, 65, 190, 65);

    // Add Products Header
    doc.setFontSize(16);
    doc.setTextColor(40, 53, 147);
    doc.text("Order Details:", 20, 80);

    // Create table-like layout for products
    const startY = 90;
    const lineHeight = 8;
    const headerY = startY - 10;

    // Add headers for product list
    doc.setFontSize(12);
    doc.setTextColor(255, 255, 255); // White for header text
    doc.setFillColor(40, 53, 147); // Dark blue background for header
    doc.rect(20, headerY, 170, 10, "F"); // Header background
    doc.text("Item", 22, headerY + 7);
    doc.text("Size", 80, headerY + 7);
    doc.text("Color", 120, headerY + 7);
    doc.text("Quantity", 160, headerY + 7);

    // Draw the product rows
    let yPosition = startY;
    orderProducts.forEach((product: any) => {
      doc.setFontSize(12);
      doc.setTextColor(0, 0, 0); // Black for regular text
      doc.text(product?.name || "N/A", 20, yPosition); // Ensure product name is a string
      doc.text(product?.size || "N/A", 80, yPosition); // Ensure size is a string
      doc.text(product?.color || "N/A", 120, yPosition); // Ensure color is a string
      doc.text(`${product?.quantity || 0}`, 160, yPosition); // Ensure quantity is a number or default to 0
      yPosition += lineHeight;
    });

    // Draw a line below product details
    doc.setLineWidth(0.5);
    doc.line(20, yPosition, 190, yPosition);

    // Add footer with company info or custom message
    doc.setFontSize(10);
    doc.setTextColor(100, 100, 100); // Gray color for footer
    doc.text("Thank you for shopping with us!", 20, yPosition + 10);
    doc.text(
      "For any queries, contact us at support@company.com",
      20,
      yPosition + 15
    );

    // Save the PDF
    doc.save("order-details.pdf");
  };

  return (
    <RootLayout>
      <div>
        <section className="py-24 relative">
          <div className="w-full max-w-7xl px-4 md:px-5 lg:px-5 mx-auto">
            <div className="w-full flex-col justify-start items-center lg:gap-12 gap-8 inline-flex">
              <div className="w-full flex-col justify-start items-center gap-3 flex">
                <h2 className="text-center text-gray-900 text-3xl font-bold font-manrope leading-normal">
                  {orderData?.fullName}, Thank You for Your Order!
                </h2>
                <p className="text-red-600 text-sm font-semibold">
                  Warn ⚠️: Please Note the orderId for further Enquires.
                </p>
                <div className="justify-center items-center gap-2.5 inline-flex">
                  <h5 className="text-gray-500 text-lg font-normal leading-8">
                    Order ID:{" "}
                    <span className="font-semibold">{orderData?.orderId}</span>
                  </h5>
                </div>
              </div>
              <div className="w-full flex-col justify-start items-center gap-8 flex">
                <h3 className="w-full md:text-start text-center text-gray-900 text-2xl font-bold font-manrope leading-9">
                  Order Details
                </h3>
                <div className="w-full flex-col justify-start items-start gap-5 flex">
                  <div className="w-full flex-col justify-start items-start gap-5 inline-flex border border-gray-200 rounded-2xl lg:p-5 p-4">
                    <div className="w-full flex flex-col gap-5">
                      {orderProducts
                        ?.slice(0, orderProducts.length - 1)
                        ?.map((product: any, index: number) => (
                          <div
                            key={index}
                            className="grid grid-cols-12 w-full px-6 pb-5 justify-start items-center md:gap-8 gap-3 border-b border-gray-300"
                          >
                            <div className="lg:col-span-4 md:col-span-5 col-span-12 justify-start items-center md:gap-6 gap-3 md:pb-5 flex md:flex-row flex-col">
                              <img
                                className="object-cover"
                                src="https://pagedone.io/asset/uploads/1715681934.png"
                                alt="Story Book image"
                              />
                              <div className="flex-col justify-start md:items-start items-center gap-1.5 inline-flex">
                                <h4 className="text-gray-900 text-xl font-medium leading-8">
                                  {product?.name}
                                </h4>
                              </div>
                            </div>
                            <div className="lg:col-span-8 md:col-span-7 col-span-12 w-full justify-start items-center md:gap-8 gap-3 flex md:flex-row flex-col">
                              <h5 className="md:col-span-2 col-span-12 w-full text-center text-gray-500 text-lg font-medium leading-8">
                                {product?.size}
                              </h5>
                              <h5 className="md:col-span-2 col-span-12 w-full text-center text-gray-500 text-lg font-medium leading-8">
                                {product?.color}
                              </h5>

                              <h5 className="md:col-span-2 col-span-12 w-full flex justify-center text-center text-gray-900 text-lg font-medium leading-8">
                                {product?.quantity}
                              </h5>
                            </div>
                          </div>
                        ))}
                    </div>
                  </div>
                  <div className="w-full lg:p-5 p-4 rounded-2xl border border-gray-200 flex-col justify-start items-start gap-5 flex">
                    <div className="px-5 pb-6 border-b border-gray-100 w-full justify-between items-start gap-6 inline-flex">
                      <h5 className="text-pink-600 text-xl font-semibold leading-8">
                        Amount Paid
                      </h5>
                      <h5 className="text-right text-pink-600 text-xl font-semibold leading-8">
                        ₹ {orderData?.totalPaidPrice}
                      </h5>
                    </div>
                  </div>
                </div>
                <div className="w-full justify-end items-center gap-5 flex sm:flex-row flex-col">
                  <button
                    className="md:w-fit w-full px-5 py-2.5 bg-indigo-50 hover:bg-indigo-100 transition-all duration-700 ease-in-out rounded-xl justify-center items-center flex"
                    onClick={generatePDF}
                  >
                    <span className="px-2 py-px text-pink-600 text-base font-semibold leading-relaxed">
                      Download Order
                    </span>
                  </button>
                  <button className="md:w-fit w-full px-5 py-2.5 bg-pink-600 hover:bg-pink-800 transition-all duration-700 ease-in-out rounded-xl shadow-[0px_1px_2px_0px_rgba(16,_24,_40,_0.05)] justify-center items-center flex">
                    <span className="px-2 py-px uppercase text-white text-base font-semibold leading-relaxed">
                      {orderData?.orderStatus}
                    </span>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>
    </RootLayout>
  );
};

export default Success;
