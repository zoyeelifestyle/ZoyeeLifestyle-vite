/* eslint-disable @typescript-eslint/no-explicit-any */
import { Data } from "../types/index.types";
import { client } from "./sanityClient";

export const removeExtra = (content: string) => {
  return content.length > 15 ? content.slice(0, 15) + "...." : content;
};

export const removeExtraForSingleProduct = (content: string) => {
  return content.length > 15 ? content.slice(0, 15) + "....." : content;
};

export const calculateDiscountedPrice = (
  actualPrice: number,
  discount: number
): number => {
  const discountAmount = actualPrice * (discount / 100);
  const discountedPrice = actualPrice - discountAmount;

  return roundOffTwoDecimal(discountedPrice);
};

export const paginationData = (currentPageNo: number, pageSize: number) => {
  const start: number = (currentPageNo - 1) * pageSize; // start index
  const end: number = currentPageNo * pageSize; // end index (not inclusive)

  return [start, end];
};

export const getFilteredData = (filterBy: string, data: Array<Data>) => {
  // console.log(filterBy);

  if (filterBy === "By Title") {
    return data.sort((a: Data, b: Data) => {
      return a.title.localeCompare(b.title);
    });
  } else if (filterBy === "High to Low") {
    return data.sort((a: Data, b: Data) => {
      return b.actual_price - a.actual_price;
    });
  } else if (filterBy === "Low to High") {
    return data.sort((a: Data, b: Data) => {
      return a.actual_price - b.actual_price;
    });
  }

  return data;
};

export const isImage = (url: string) => {
  return /\.(jpg|jpeg|png|gif|bmp|webp)$/i.test(url);
};

export const isVideo = (url: string) => {
  return /\.(mp4|webm|ogg)$/i.test(url);
};

export const toggleLocalStorageCart = (
  storageName: string,
  productId: string
) => {
  const cart = JSON.parse(localStorage.getItem(storageName) || "[]");

  const productIndex = cart.indexOf(productId);

  if (productIndex === -1) {
    cart.push(productId);
  } else {
    cart.splice(productIndex, 1);
  }

  localStorage.setItem(storageName, JSON.stringify(cart));
};

export const roundOffTwoDecimal = (price: number) => {
  return Math.round(price * 100) / 100;
};
export const blockToHtml = (data: any) => {
  if (!data || data.length === 0) {
    return `<p class="text-xl text-gray-500 italic text-center mt-10">No Terms Available</p>`;
  }

  // console.log("Block to Html", data);

  return data
    .map((term: any) => {
      const contentHtml = term.content
        .map((block: any) => {
          if (block._type === "block" && block.style) {
            // Check the block style and return corresponding HTML
            switch (block.style) {
              case "h1":
                return `
                  <div class="mb-6">
                    <h1 class="text-4xl font-bold text-gray-900 mb-4">${block.children
                      .map((child: any) => (child.text ? child.text : ""))
                      .join("")}</h1>
                  </div>`;
              case "h2":
                return `
                  <div class="mb-6">
                    <h2 class="text-3xl font-semibold text-gray-800 mb-4">${block.children
                      .map((child: any) => (child.text ? child.text : ""))
                      .join("")}</h2>
                  </div>`;
              case "h3":
                return `
                  <div class="mb-6">
                    <h3 class="text-xl font-medium text-gray-700 mb-4">${block.children
                      .map((child: any) => (child.text ? child.text : ""))
                      .join("")}</h3>
                  </div>`;
              case "h4":
                return `
                  <div class="mb-6">
                    <h4 class="text-xl font-semibold text-gray-600 mb-4">${block.children
                      .map((child: any) => (child.text ? child.text : ""))
                      .join("")}</h4>
                  </div>`;
              case "h5":
                return `
                  <div class="mb-6">
                    <h5 class="text-lg font-medium text-gray-600 mb-4">${block.children
                      .map((child: any) => (child.text ? child.text : ""))
                      .join("")}</h5>
                  </div>`;
              case "h6":
                return `
                  <div class="mb-6">
                    <h6 class="text-base font-medium text-gray-600 mb-4">${block.children
                      .map((child: any) => (child.text ? child.text : ""))
                      .join("")}</h6>
                  </div>`;
              default:
                // Default to normal paragraph style
                return `
                  <div class="mb-6">
                    <p class="text-lg text-gray-700 leading-relaxed text-justify">
                      ${block.children
                        .map((child: any) => (child.text ? child.text : ""))
                        .join("")}
                    </p>
                  </div>`;
            }
          } else if (block._type === "image") {
            return `
              <div class="relative mb-6 text-center">
                <img src="${block.imageUrl}" alt="${
              block.alt || "Image"
            }" class="w-full h-auto rounded-lg transition-transform duration-300 ease-in-out transform hover:scale-105" />
                ${
                  block.caption
                    ? `<figcaption class="text-sm text-gray-500 mt-2">${block.caption}</figcaption>`
                    : ""
                }
              </div>`;
          } else {
            return ``;
          }
        })
        .join("");

      return `
        <section class="py-8 px-5 md:p-10  mb-10 border border-pink-600 rounded-lg bg-gray-50 shadow-2xl">
          <h2 class="text-3xl font-semibold text-gray-800 mb-6 border-b-2 pb-2">${term.title}</h2>
          <div class="term-content">${contentHtml}</div>
        </section>
      `;
    })
    .join("");
};

export const getCheckoutProductIds = async () => {
  const getId = JSON.parse(localStorage.getItem("checkout") || "[]");

  return getId;
};

export const createOrderProducts = async (paymentData: any) => {
  const orderProductIds: any[] = [];

  if (Array.isArray(paymentData.product)) {
    for (const item of paymentData.product) {
      try {
        const orderProduct = await createDocument("orderProduct", {
          productId: item.productId,
          name: item.productName,
          size: item.size,
          color: item.color,
          quantity: item.quantity,
          image: item.img,
          actualProduct: [
            {
              _type: "reference",
              _ref: item.productId,
              _key: `actual-product-${item?.productId}`,
            },
          ],
        });

        orderProductIds.push(orderProduct._id);
      } catch (error) {
        console.error("Error creating orderProduct for product", item, error);
      }
    }
  } else {
    console.error("No products found in paymentData");
  }

  return orderProductIds;
};

export const createDocument = async (type: any, data: any) => {
  try {
    const response = await client.create({
      _type: type,
      ...data,
    });
    return response;
  } catch (error: any) {
    console.error("Error creating document:", error);
    throw error;
  }
};

export const createOrder = async (
  paymentData: any,
  orderProductIds: any[],
  shippingDetails: any[],
  isPreorder: boolean
) => {
  if (!orderProductIds || orderProductIds.length === 0) {
    throw new Error("No order products found");
  }

  if (!shippingDetails || shippingDetails.length === 0) {
    throw new Error("No shipping details provided");
  }

  // Validate shipping details before using them
  const validShippingDetails = shippingDetails.map(
    (item: any, index: number) => {
      if (!item || !item._id) {
        throw new Error("Shipping detail is invalid or missing _id");
      }
      return {
        _ref: item._id,
        _key: `shipping-detail-${index}`,
      };
    }
  );

  // Ensure the order products have a unique _key
  const orderProducts = orderProductIds.map((id: string, index: number) => ({
    _ref: id, // Only use _ref, no key field
    _key: `order-product-${index}`, // Add a unique key (e.g., by index)
  }));

  if (isPreorder) {
    // Proceed to create the order
    const order = await createDocument("preOrder", {
      orderId: paymentData.txnid,
      transactionId: paymentData.txnid,
      totalPaidPrice: paymentData.amount,
      orderProducts: orderProducts,
      shippingAddress: validShippingDetails,
      orderStatus: "ordered",
      paymentStatus: "pending",
      createdAt: new Date(Date.now()).toISOString(),
    });
    return order;
  } else {
    // Proceed to create the order
    const order = await createDocument("order", {
      orderId: paymentData.txnid,
      transactionId: paymentData.txnid,
      totalPaidPrice: paymentData.amount,
      orderProducts: orderProducts,
      shippingAddress: validShippingDetails,
      orderStatus: "ordered",
      paymentStatus: "pending",
      createdAt: new Date(Date.now()).toISOString(),
    });
    return order;
  }
};

export const processOrder = async (data: any) => {
  try {
    const isPreorder = data.paymentData.product[0].preorder;
    const orderProductIds = await createOrderProducts(data.paymentData);
    const shippingDetails = [data.paymentData.shippingAddress];
    const order = await createOrder(
      data.paymentData,
      orderProductIds,
      shippingDetails,
      isPreorder
    );
    const userId = data.paymentData.user._id;
    const orderReference = {
      _type: "reference",
      _ref: order._id,
      _key: `${isPreorder ? "pre-order-id" : "order-id"}-${order._id}`,
    };
    await client
      .patch(userId)
      .setIfMissing({ orderDetails: [] })
      .append(`${isPreorder ? "preOrders" : "orderDetails"}`, [orderReference])
      .commit();

    if (data.paymentData.appliedCoupon.length > 0) {
      await client
        .patch(userId)
        .setIfMissing({ usedCoupons: [] })
        .append("usedCoupons", [
          {
            _type: "reference",
            _ref: data.paymentData.appliedCoupon[0]._id,
            _key: `coupon-id-${data.paymentData.appliedCoupon[0]._id}`,
          },
        ])
        .commit();
    }

    if (data.paymentData.product[0].where === "cart") {
      localStorage.removeItem("cart");
    }
    // Redirect to payment URL
    const form = document.createElement("form");
    form.method = "POST";
    form.action = data.payUrl;
    Object.keys(data.paymentData).forEach((key) => {
      const input = document.createElement("input");
      input.type = "hidden";
      input.name = key;
      input.value = data.paymentData[key];
      form.appendChild(input);
    });
    document.body.appendChild(form);
    form.submit();
    console.log("foem", form);
    console.log("Order created successfully:", order);
  } catch (error: any) {
    console.error("Error creating order", error);
  }
};
