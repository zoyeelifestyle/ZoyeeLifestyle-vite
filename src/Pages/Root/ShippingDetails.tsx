/* eslint-disable react-hooks/exhaustive-deps */
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
import ShippingAddress from "@/components/ShippingAddress";
import { Loader2, Plus } from "lucide-react";
import { client } from "@/utils/sanityClient";

const ShippingDetails = () => {
  const { param } = useParams();
  const { user, getUserDataFromSanity, handleBuyNow } = authStore();
  const [userData, setUserData] = useState<any | null>(null);
  const [displayAddress, setDisplayAddress] = useState<any | null>(null);
  const [productData, setProductData] = useState<any[]>([]); // Make sure this is an array
  const [total, setTotal] = useState<number>(0);
  const [isLoading, setIsLoading] = useState(false);

  const [appliedCoupon, setAppliedCoupon] = useState<any | null>(null);

  // State for modal and form data
  const [showModal, setShowModal] = useState<boolean>(false);
  const [newAddress, setNewAddress] = useState({
    username: "",
    address1: "",
    address2: "",
    city: "",
    state: "",
    country: "",
    zipcode: "",
    phone: "",
    street: "",
  });

  const [addresses, setAddresses] = useState<any | null>(null);
  const [isChangeAddressModal, setIsChangeAddressModal] =
    useState<boolean>(false);

  const handleBuy = async () => {
    // console.log("User Address", displayAddress);
    // console.log("Total Price", total);
    // console.log("Product", productData);
    const alignedData = {
      product: productData,
      userInfo: userData,
      shippingAddress: displayAddress,
      appliedCoupon,
      total,
    };
    await handleBuyNow(alignedData);
    // console.log(alignedData);
  };

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    const {
      username,
      address1,
      address2,
      city,
      state,
      country,
      zipcode,
      phone,
      street,
    } = newAddress;

    if (
      !username ||
      !address1 ||
      !city ||
      !state ||
      !country ||
      !zipcode ||
      !phone ||
      !street
    ) {
      toast.error("Please fill all the required fields");
    }

    setIsLoading(true);
    try {
      const address = await client.create({
        _type: "address",
        phone,
        address1,
        address2,
        street,
        city,
        state,
        zipCode: zipcode,
        country,
        username,
      });

      const addressReference = {
        _key: `address-${address._id}`, // Use a unique value, like the address ID
        _type: "reference",
        _ref: address._id,
      };

      await client
        .patch(userData?._id)
        .setIfMissing({ addresses: [] })
        .append("addresses", [addressReference])
        .commit();

      toast.success("New Address Added");

      setDisplayAddress(newAddress);
      setAddresses((prevAddress: any) => {
        const newValues = [...prevAddress, newAddress];
        return newValues;
      });
    } catch (error) {
      console.error("Error Adding new address", error);
      toast.error("Error Adding New Address");
    } finally {
      setShowModal(false);
      setIsLoading(false);
    }
  };

  const handleInputChange = (e: any) => {
    const { name, value } = e.target;
    setNewAddress({
      ...newAddress,
      [name]: value,
    });
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
          setProductData(product);
        }
      } catch (error) {
        console.error("Failed to decrypt data:", error);
        toast.error("Failed to load product data.");
      }
    }
  }, [param]);

  // Total calculation whenever `productData` changes
  useEffect(() => {
    let totalPrice = 0;
    productData.forEach((item: any) => {
      totalPrice += item.price * item.quantity;
    });
    setTotal(totalPrice);
  }, [productData]);

  useEffect(() => {
    const fetch = async () => {
      if (user && user.id) {
        try {
          const data = await getUserDataFromSanity(user.id);
          setDisplayAddress(
            data[0]?.addresses[data[0]?.addresses.length - 1] || null
          );
          setUserData(data[0]);
          setAddresses(data[0]?.addresses);
        } catch (error) {
          console.error("Error fetching user data:", error);
          setDisplayAddress(null);
        }
      }
    };
    fetch();
  }, [user]);

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
            className="space-y-3"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
          >
            {displayAddress && (
              <div className="w-full flex justify-end">
                <div
                  onClick={() => {
                    setNewAddress({
                      username: "",
                      address1: "",
                      address2: "",
                      city: "",
                      state: "",
                      country: "",
                      zipcode: "",
                      phone: "",
                      street: "",
                    });
                    setShowModal(true);
                  }}
                  className="flex items-center gap-1 bg-pink-200 px-3 py-2 cursor-pointer text-pink-600 font-semibold capitalize hover:bg-pink-600 hover:text-white transition-all duration-200 ease-in-out rounded-sm"
                >
                  <Plus className="w-4 h-4" />
                  <button className="text-xs">Create New</button>
                </div>
              </div>
            )}

            {!displayAddress && (
              <div
                onClick={() => {
                  setNewAddress({
                    username: "",
                    address1: "",
                    address2: "",
                    city: "",
                    state: "",
                    country: "",
                    zipcode: "",
                    phone: "",
                    street: "",
                  });
                  setShowModal(true);
                }}
                className="w-full cursor-pointer hover:bg-pink-200 transition-all duration-200 ease-out bg-pink-100 py-5 rounded-md font-semibold text-center text-pink-600"
              >
                Add New Address
              </div>
            )}
            {displayAddress && (
              <ShippingAddress
                addresses={displayAddress}
                setIsChangeAddressModal={setIsChangeAddressModal}
              />
            )}
          </motion.div>
          {isChangeAddressModal && (
            <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
              <div className="bg-white p-8 rounded-lg shadow-xl w-11/12 sm:w-96 max-w-md">
                <h3 className="text-3xl font-bold mb-6 text-center">
                  Select Address
                </h3>

                {/* Scrollable Address List */}
                <div className="space-y-4 h-[250px] sm:h-[350px] overflow-y-auto">
                  {addresses?.map((address: any) => (
                    <div
                      key={address?._id}
                      className="flex justify-between items-center p-4 bg-gray-50 rounded-lg shadow-sm cursor-pointer hover:bg-gray-100 transition duration-300 ease-in-out"
                      onClick={() => {
                        setDisplayAddress(address);
                        setIsChangeAddressModal(false);
                      }}
                    >
                      <div className="flex flex-col space-y-1">
                        <h2 className="font-semibold text-lg text-gray-800">
                          {address?.username}
                        </h2>
                        <p className="text-sm text-gray-600">
                          {address?.address1}
                        </p>{" "}
                        <p className="text-sm text-gray-600">
                          {address?.address2}
                        </p>
                        <p className="text-sm text-gray-600">
                          {address?.street}, {address?.city}
                        </p>
                        <p className="text-sm text-gray-600">
                          {address?.state}, {address?.country} -{" "}
                          {address?.zipCode}
                        </p>
                      </div>
                      <div className="text-sm text-pink-600 font-medium">
                        Select
                      </div>
                    </div>
                  ))}
                </div>

                {/* Cancel Button */}
                <button
                  onClick={() => setIsChangeAddressModal(false)}
                  className="w-full py-2 mt-6 text-white bg-gray-600 rounded-lg hover:bg-gray-700 transition duration-200 ease-in-out"
                >
                  Cancel
                </button>
              </div>
            </div>
          )}

          <motion.div
            className="space-y-6"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3 }}
          >
            <div className="bg-gray-100 p-6 rounded-lg shadow-lg">
              {productData.length > 0 && productData[0]?.where === "direct" ? (
                <DirectCheckoutProduct
                  productData={productData[0]}
                  total={total}
                  setTotal={setTotal}
                  setAppliedCoupon={setAppliedCoupon}
                />
              ) : (
                productData.length > 0 &&
                productData[0]?.where === "cart" && (
                  <CheckoutProduct
                    productData={productData}
                    total={total}
                    setAppliedCoupon={setAppliedCoupon}
                  />
                )
              )}
              <motion.button
                onClick={handleBuy}
                className="w-full p-3 bg-pink-600 text-white font-semibold rounded-md hover:bg-pink-700 focus:outline-none focus:ring-2 focus:ring-pink-500 mt-6"
                whileHover={{ scale: 1.05 }}
              >
                Proceed to Checkout
              </motion.button>
            </div>
          </motion.div>
        </div>
      </motion.div>

      {/* Modal for Address Form */}
      {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
          <div className="bg-white p-6 rounded-lg shadow-lg w-96">
            <h3 className="text-2xl font-semibold mb-4">Enter New Address</h3>
            <form onSubmit={handleSubmit}>
              <div className="space-y-3">
                <input
                  type="text"
                  name="username"
                  placeholder="Full Name"
                  value={newAddress.username}
                  onChange={handleInputChange}
                  className="w-full text-sm p-1 border border-gray-300 rounded outline-pink-600"
                  required
                />

                <input
                  type="text"
                  name="address1"
                  placeholder="Address Line 1"
                  required
                  value={newAddress.address1}
                  onChange={handleInputChange}
                  className="w-full text-sm p-1 border border-gray-300 rounded outline-pink-600"
                />

                <input
                  type="text"
                  name="address2"
                  placeholder="Address Line 2"
                  value={newAddress.address2}
                  onChange={handleInputChange}
                  className="w-full text-sm p-1 border border-gray-300 rounded outline-pink-600"
                />
                <div className=" flex gap-3 items-center">
                  <input
                    type="text"
                    name="city"
                    placeholder="City"
                    value={newAddress.city}
                    onChange={handleInputChange}
                    className="w-full text-sm p-1 border border-gray-300 rounded outline-pink-600"
                    required
                  />
                  <input
                    type="text"
                    name="street"
                    placeholder="Street"
                    value={newAddress.street}
                    onChange={handleInputChange}
                    className="w-full text-sm p-1 border border-gray-300 rounded outline-pink-600"
                    required
                  />
                </div>
                <div className="flex gap-3 items-center">
                  <input
                    type="text"
                    name="state"
                    placeholder="State"
                    value={newAddress.state}
                    onChange={handleInputChange}
                    className="w-full text-sm p-1 border border-gray-300 rounded outline-pink-600"
                    required
                  />

                  <input
                    type="text"
                    placeholder="Country"
                    required
                    name="country"
                    value={newAddress.country}
                    onChange={handleInputChange}
                    className="w-full p-1 text-sm border border-gray-300 rounded outline-pink-600"
                  />
                </div>
                <div className="flex gap-3 items-center">
                  <input
                    type="text"
                    name="zipcode"
                    placeholder="Zipcode"
                    value={newAddress.zipcode}
                    onChange={handleInputChange}
                    className="w-full text-sm p-1 border border-gray-300 rounded outline-pink-600"
                    required
                  />
                  <input
                    type="text"
                    name="phone"
                    placeholder="Phone"
                    required
                    value={newAddress.phone}
                    onChange={handleInputChange}
                    className="w-full p-1 text-sm border border-gray-300 rounded outline-pink-600"
                  />
                </div>
                <div className="flex items-center justify-end">
                  <div className="flex gap-2 items-center">
                    <button
                      type="submit"
                      className="w-full text-sm py-1 px-3 bg-pink-600 shadow-md text-white font-semibold rounded-md "
                    >
                      {!isLoading ? (
                        "Save"
                      ) : (
                        <Loader2 className="w-4 h-4 animate-spin" />
                      )}
                    </button>
                    <button
                      type="button"
                      onClick={() => setShowModal(false)}
                      className="w-full text-sm py-1 px-3 shadow-md bg-gray-300 text-black font-semibold rounded-md"
                    >
                      Cancel
                    </button>
                  </div>
                </div>
              </div>
            </form>
          </div>
        </div>
      )}
    </RootLayout>
  );
};

export default ShippingDetails;
