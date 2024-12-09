/* eslint-disable @typescript-eslint/no-explicit-any */
import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import RootLayout from "./RootLayout";
import toast from "react-hot-toast";

import { useParams } from "react-router-dom";

import CryptoJS from "crypto-js";
import DirectCheckoutProduct from "@/components/DirectCheckoutProduct";
import CheckoutProduct from "@/components/CheckoutProduct";
import { authStore } from "@/store/authStore";

const ShippingDetails = () => {
  const { param } = useParams();

  const { handleBuyNow } = authStore();

  const [formData, setFormData] = useState({
    fullName: "",
    address1: "",
    address2: "",
    city: "",
    state: "",
    country: "",
    zipcode: "",
    email: "",
    phone: "",
  });

  const [productData, setProductData] = useState<any>([]);

  const [total, setTotal] = useState<number>(0);

  const handleChange = (e: any) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    const { fullName, email, phone, address2, city, state, country, zipcode } =
      formData;

    if (!fullName) {
      toast.error("Please Fill the Name");
    }
    if (!email) {
      toast.error("Please Fill the Email");
    }
    if (!phone) {
      toast.error("Please Fill the phone");
    }
    if (!address2) {
      toast.error("Please Fill the Address");
    }
    if (!city) {
      toast.error("Please Fill the City");
    }
    if (!state) {
      toast.error("Please Fill the State");
    }
    if (!country) {
      toast.error("Please Fill the Country");
    }

    if (!zipcode) {
      toast.error("Please Fill the Zipcode");
    }

    const finalProduct = {
      product: {
        ...productData,
        price: total,
      },
      userInfo: {
        ...formData,
      },
    };

    if (
      fullName &&
      email &&
      phone &&
      address2 &&
      city &&
      state &&
      country &&
      zipcode
    ) {
      await handleBuyNow(finalProduct);
      console.log("Final Product", finalProduct);
    }
  };

  useEffect(() => {
    if (param) {
      try {
        const decodedData = decodeURIComponent(param);
        const bytes = CryptoJS.AES.decrypt(decodedData, "secret-key");
        const decryptedData = bytes.toString(CryptoJS.enc.Utf8);
        const product = JSON.parse(decryptedData);
        if (product?.where) {
          setProductData([product]);
        } else {
          const updatedProductData = product;
          setProductData(updatedProductData);
          let totalPrice = 0;

          if (Array.isArray(updatedProductData)) {
            updatedProductData.forEach((item: any) => {
              totalPrice += item.price * item.quantity;
            });
          } else {
            totalPrice = updatedProductData.price * updatedProductData.quantity;
          }

          setTotal(totalPrice);
        }
      } catch (error) {
        console.error("Failed to decrypt data:", error);
        toast.error("Failed to load product data.");
      }
    }
  }, [param]);

  return (
    <RootLayout>
      <motion.div
        className="container md:mx-auto p-6 max-w-6xl bg-white shadow-lg rounded-lg my-5 border border-pink-500"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
      >
        <h2 className="text-3xl font-semibold text-gray-800">
          Shipping Details
        </h2>
        <motion.div
          className="text-red-600 font-semibold tracking-wide text-sm mb-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
        >
          <p>Please provide valid details. This cannot be changed later.</p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* User Details Section */}
          <motion.div
            className="space-y-6"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
          ></motion.div>

          {/* Product Details Section */}
          <motion.div
            className="space-y-6"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3 }}
          >
            <div className="bg-gray-100 p-6 rounded-lg shadow-lg">
              {productData[0]?.where === "direct" ? (
                <DirectCheckoutProduct
                  productData={productData[0]}
                  total={total}
                  setTotal={setTotal}
                />
              ) : (
                productData[0]?.where === "cart" && (
                  <CheckoutProduct productData={productData} total={total} />
                )
              )}
              <motion.button
                onClick={handleSubmit}
                className="w-full p-3 bg-pink-600 text-white font-semibold rounded-md hover:bg-pink-700 focus:outline-none focus:ring-2 focus:ring-pink-500 mt-6"
                whileHover={{ scale: 1.05 }}
              >
                Proceed to Checkout
              </motion.button>
            </div>
          </motion.div>
        </div>
      </motion.div>
    </RootLayout>
  );
};

export default ShippingDetails;
