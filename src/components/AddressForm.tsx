/* eslint-disable @typescript-eslint/no-explicit-any */
import { authStore } from "@/store/authStore";
import React, { useEffect, useState } from "react";
import SketetonWrapper from "./SkeletonWrapper";
import { client } from "@/utils/sanityClient";
import { Loader2 } from "lucide-react";
import toast from "react-hot-toast";

const AddressForm = ({
  userId,
  setIsPopupOpen,
  addAddressToUserData,
  addressId,
  editAddressToUserData,
  selectedFormData,
}: {
  setIsPopupOpen: (value: boolean) => void;
  userId: string;
  addAddressToUserData: (newAddress: any) => void;
  editAddressToUserData: (newAddress: any, addressId: string) => void;
  addressId: string;

  selectedFormData: any;
}) => {
  const [formData, setFormData] = useState({
    address1: selectedFormData?.address1 || "",
    address2: selectedFormData?.address2 || "",
    city: selectedFormData?.city || "",
    street: selectedFormData?.street || "",
    state: selectedFormData?.state || "",
    country: selectedFormData?.country || "",
    zipcode: selectedFormData?.zipcode || "",
    phoneNumber: selectedFormData?.phoneNumber || "",
  });

  const { getLogo } = authStore();
  const [logo, setLogo] = useState<string>("");

  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const fetchLogo = async () => {
      const data = await getLogo();
      setLogo(data.url);
    };
    fetchLogo();
  }, [getLogo]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleCancel = () => {
    setIsPopupOpen(false);
  };

  const handleEditAddress = async (addressId: string) => {
    const { address1, street, city, state, zipcode, country, phoneNumber } =
      formData;

    if (
      !address1 ||
      !street ||
      !city ||
      !zipcode ||
      !country ||
      !phoneNumber ||
      !state
    ) {
      toast.error("Please fill all the required Fields");
    } else {
      setIsLoading(true);
      try {
        const updatedAddress = await client
          .patch(addressId)
          .set({
            phone: phoneNumber,
            address1,
            address2: formData.address2,
            street,
            city,
            state,
            zipCode: zipcode,
            country,
          })
          .commit();

        console.log("Address updated successfully:", updatedAddress);
        setIsPopupOpen(false);
        editAddressToUserData(
          {
            phone: phoneNumber,
            address1,
            address2: formData.address2,
            street,
            city,
            state,
            zipCode: zipcode,
            country,
            _id: addressId,
          },
          addressId
        );
        toast.success("Address updated successfully!");
      } catch (error: any) {
        console.error("Error adding address:", error);
        toast.error("Error Updating Address\nPlease Try Again later");
      } finally {
        setIsLoading(false);
      }
    }
  };

  const handleSubmit = async () => {
    const { address1, street, city, state, zipcode, country, phoneNumber } =
      formData;

    if (
      !address1 ||
      !street ||
      !city ||
      !zipcode ||
      !country ||
      !phoneNumber ||
      !state
    ) {
      toast.error("Please fill all the required Fields");
    } else {
      setIsLoading(true);
      try {
        console.log("userId", userId);

        const address = await client.create({
          _type: "address",
          phone: formData.phoneNumber,
          address1: formData.address1,
          address2: formData.address2,
          street: formData.street,
          city: formData.city,
          state: formData.state,
          zipCode: formData.zipcode,
          country: formData.country,
        });

        const addressReference = {
          _key: `address-${address._id}`, // Use a unique value, like the address ID
          _type: "reference",
          _ref: address._id,
        };

        await client
          .patch(userId)
          .setIfMissing({ addresses: [] })
          .append("addresses", [addressReference])
          .commit();

        console.log("Address added and linked to user successfully!");
        // Close the popup after successful submission
        addAddressToUserData(address);
        setIsPopupOpen(false);
      } catch (err) {
        console.error("Error adding address:", err);
      } finally {
        setIsLoading(false);
      }
    }
  };

  return (
    <div className="bg-white p-6 text-xs rounded-sm shadow-md ">
      <div className="w-full flex justify-center">
        <SketetonWrapper isLoading={isLoading}>
          <img src={logo} className="w-28 my-5" alt="Logo" />
        </SketetonWrapper>
      </div>
      <div>
        <div className="mb-4">
          <label
            htmlFor="address1"
            className="block text-sm font-medium text-gray-700"
          >
            Address Line 1 <span className="text-red-500">*</span>
          </label>
          <input
            type="text"
            id="address1"
            name="address1"
            value={formData.address1}
            onChange={handleChange}
            className="mt-1 p-2 w-full border border-gray-300 rounded-sm outline-pink-300"
            required
          />
        </div>

        <div className="mb-4">
          <label
            htmlFor="address2"
            className="block text-sm font-medium text-gray-700"
          >
            Address Line 2
          </label>
          <input
            type="text"
            id="address2"
            name="address2"
            value={formData.address2}
            onChange={handleChange}
            className="mt-1 p-2 w-full border border-gray-300 rounded-sm outline-pink-300"
          />
        </div>

        <div className="flex gap-3">
          <div className="mb-4 flex-1">
            <label
              htmlFor="city"
              className="block text-sm font-medium text-gray-700"
            >
              City <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              id="city"
              name="city"
              placeholder="Eg. Chennai"
              value={formData.city}
              onChange={handleChange}
              className="mt-1 p-2 w-full border border-gray-300 rounded-sm outline-pink-300"
              required
            />
          </div>

          <div className="mb-4 flex-1">
            <label
              htmlFor="street"
              className="block text-sm font-medium text-gray-700"
            >
              Street <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              id="street"
              name="street"
              placeholder="Eg. Kundrathur"
              value={formData.street}
              onChange={handleChange}
              className="mt-1 p-2 w-full border border-gray-300 rounded-sm outline-pink-300"
              required
            />
          </div>
        </div>

        <div className="flex items-center gap-3">
          <div className="mb-4 flex-1">
            <label
              htmlFor="state"
              className="block text-sm font-medium text-gray-700"
            >
              State <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              id="state"
              name="state"
              placeholder="Eg. Tamilnadu"
              value={formData.state}
              onChange={handleChange}
              className="mt-1 p-2 w-full border border-gray-300 rounded-sm outline-pink-300"
              required
            />
          </div>

          <div className="mb-4 flex-1">
            <label
              htmlFor="country"
              className="block text-sm font-medium text-gray-700"
            >
              Country <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              id="country"
              name="country"
              placeholder="Eg. India"
              value={formData.country}
              onChange={handleChange}
              className="mt-1 p-2 w-full border border-gray-300 rounded-sm outline-pink-300"
              required
            />
          </div>
        </div>

        <div className="flex items-end gap-3">
          <div className="mb-4 flex-1">
            <label
              htmlFor="zipcode"
              className="block text-sm font-medium text-gray-700"
            >
              Zipcode <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              id="zipcode"
              name="zipcode"
              placeholder="Eg. 600069"
              value={formData.zipcode}
              onChange={handleChange}
              className="mt-1 p-2 w-full border border-gray-300 rounded-sm outline-pink-300"
              required
            />
          </div>

          <div className="mb-4 flex-1">
            <label
              htmlFor="phoneNumber"
              className="block text-sm font-medium text-gray-700"
            >
              Phone Number <span className="text-red-500">*</span>
            </label>
            <input
              type="tel"
              id="phoneNumber"
              name="phoneNumber"
              placeholder="Eg. +91 9012134524"
              value={formData.phoneNumber}
              onChange={handleChange}
              className="mt-1 p-2 w-full border border-gray-300 rounded-sm outline-pink-300"
              required
            />
          </div>
        </div>

        <div className="flex justify-end gap-4 mt-6">
          <button
            type="button"
            onClick={handleCancel}
            className="px-3 py-1 bg-red-500 font-semibold tracking-wide text-white rounded-md hover:bg-red-600"
          >
            Cancel
          </button>
          {addressId.length ? (
            <button
              onClick={() => handleEditAddress(addressId)}
              className="px-4 py-2 bg-emerald-600 font-semibold text-white rounded-md hover:bg-emerald-700"
            >
              {isLoading ? (
                <Loader2 className="w-4 h-4 animate-spin text-white" />
              ) : (
                "Update"
              )}
            </button>
          ) : (
            <button
              onClick={handleSubmit}
              className="px-4 py-2 bg-blue-600 font-semibold text-white rounded-md hover:bg-blue-700"
            >
              {isLoading ? (
                <Loader2 className="w-4 h-4 animate-spin text-white" />
              ) : (
                "Create"
              )}
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default AddressForm;
