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
    return `<p class="no-terms">No Terms Available</p>`;
  }

  return data
    .map((term: any) => {
      const contentHtml = term.content
        .map((block: any) => {
          if (block._type === "block") {
            return `
              <p class="term-paragraph">
                ${block.children
                  .map((child: any) => (child.text ? child.text : ""))
                  .join("")}
              </p>`;
          } else if (block._type === "image") {
            return `
              <div class="term-image">
                <img src="${block.imageUrl}" alt="${
              block.alt || "Image"
            }" class="responsive-image" />
              </div>`;
          } else {
            return ``;
          }
        })
        .join("");

      return `
        <section class="term-section ">
          <h2 class="term-title ">${term.title}</h2>
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
  const orderProductIds = [];

  if (paymentData.product && typeof paymentData.product === "object") {
    const products = Object.values(paymentData.product);

    for (const product of products) {
      try {
        // Create an orderProduct entry for each product
        const productDetails = product as any;

        const orderProduct = await createDocument("orderProduct", {
          productId: productDetails.productId,
          name: productDetails.productName, // Ensure to use the correct key (e.g., productName)
          size: productDetails.size,
          color: productDetails.color,
          quantity: productDetails.quantity,
          image: productDetails.img,
        });

        // Store the product ID to reference later in the order
        orderProductIds.push(orderProduct._id);
      } catch (error) {
        console.error(
          "Error creating orderProduct for product",
          product,
          error
        );
      }
    }
  } else {
    console.error("paymentData.product is not an object or is undefined");
  }

  return orderProductIds;
};

export const createDocument = async (type: any, data: any) => {
  try {
    const response = await client.create({
      _type: type, // 'orderProduct' or 'order' depending on what type you're creating
      ...data, // data to be saved in the document
    });
    return response;
  } catch (error: any) {
    console.error("Error creating document:", error);
    throw error;
  }
};

export const createOrder = async (paymentData: any, orderProductIds: any) => {
  const order = await createDocument("order", {
    orderId: paymentData.txnid,
    transactionId: paymentData.txnid,
    totalPaidPrice: paymentData.amount,
    orderProducts: orderProductIds.map((id: any, index: number) => ({
      _ref: id,
      _key: `${id}-${index}`,
    })),
    email: paymentData.email,
    phone: paymentData.user.phone,
    fullName: paymentData.user.fullName,
    address1: paymentData.user.address1,
    address2: paymentData.user.address2,
    city: paymentData.user.city,
    state: paymentData.user.state,
    country: paymentData.user.country,
    zipcode: paymentData.user.zipcode,
  });

  return order;
};

export const processOrder = async (data: any) => {
  try {
    const orderProductIds = await createOrderProducts(data.paymentData);

    const order = await createOrder(data.paymentData, orderProductIds);

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

    console.log("Order created successfully:", order);
  } catch (error: any) {
    console.error("Error creating order", error);
  }
};
