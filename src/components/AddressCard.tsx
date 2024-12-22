/* eslint-disable @typescript-eslint/no-explicit-any */

import { client } from "@/utils/sanityClient";
import { EllipsisVertical, Pencil, Trash } from "lucide-react";
import { useState } from "react";
import toast from "react-hot-toast";

// Defining TypeScript types for props
interface AddressCardProps {
  username: string;
  address1: string;
  address2: string;
  city: string;
  street: string;
  country: string;
  zipCode: string;
  state: string;
  addressId: string;
  phone: string;
  updateUserDataAfterDeletion: (deletedAddressId: string) => void;
  setIsPopupOpen: (value: boolean) => void;
  setSelectedFormData: (value: any) => void;
  setEditAddressId: (value: string) => void;
}

const AddressCard = ({
  username,
  phone,
  address1,
  address2,
  city,
  street,
  country,
  zipCode,
  state,
  updateUserDataAfterDeletion,
  setIsPopupOpen,
  setSelectedFormData,
  addressId,
  setEditAddressId,
}: AddressCardProps) => {
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);

  // Handle delete address logic
  const handleDeleteAddress = async (addressId: string) => {
    setLoading(true);

    try {
      // Fetch users linked to this address
      const users = await client.fetch(
        `*[_type == "users" && references(*[_type == "address" && _id == $addressId]._id)]`,
        { addressId }
      );
      // console.log("Users to update:", users);

      // Update users' addresses by removing the deleted one
      for (const user of users) {
        const updatedAddresses = user.addresses.filter(
          (address: any) => address._ref !== addressId
        );

        await client
          .patch(user._id)
          .set({ addresses: updatedAddresses })
          .commit();
        // .then((updatedUser) => console.log("Updated User:", updatedUser));
      }

      // Delete the address from the database
      // await client.delete(addressId);
      // console.log("Deleted Address Response:", deleteResponse);
      toast.success("Address Removed Successfully");

      if (updateUserDataAfterDeletion) {
        updateUserDataAfterDeletion(addressId); // Call the function to update state in UserProfile
      }

      setLoading(false);
    } catch (error) {
      console.error("Error during delete and update:", error);
      setLoading(false);
      toast.error("Failed to delete address.");
    }
  };

  // Handle address edit (functionality can be added later)
  const handleEditAddress = (addressId: string) => {
    // TODO: Implement edit functionality

    setSelectedFormData({
      username,
      address1,
      address2,
      city,
      street,
      state,
      country,
      zipcode: zipCode,
      phoneNumber: phone,
    });
    setEditAddressId(addressId);
    setIsPopupOpen(true);
  };

  return (
    <div className="bg-white border rounded-lg shadow-lg p-4 mb-4 relative hover:shadow-xl transition duration-300 ease-out">
      <h2 className="font-semibold text-xl">{username}</h2>
      <h3 className=" text-lg">{address1}</h3>
      <h3 className=" text-lg">{address2}</h3>

      <div className="flex items-center gap-2 text-sm">
        <p className="capitalize">{street}</p>
        <span>,</span>
        <p className="capitalize">{city}</p>
      </div>

      <p className="text-sm text-gray-600 capitalize">
        <span>{state}</span>, <span>{country}</span> - <span>{zipCode}</span>
      </p>

      {phone && (
        <p className="text-sm text-gray-600 capitalize">
          Phone: <span>{phone}</span>
        </p>
      )}

      <div
        onClick={() => setOpen((prev) => !prev)}
        className="absolute top-2 right-2 cursor-pointer duration-200 transition-all ease-out px-1 rounded-full hover:bg-gray-100 py-1"
      >
        <EllipsisVertical className="w-5 h-5 text-gray-500" />
      </div>

      {open && (
        <div className="absolute flex flex-col gap-1 rounded-sm text-xs top-8 right-4 bg-white shadow-lg border border-gray-300">
          <div
            className="flex items-center gap-2 text-emerald-600 cursor-pointer hover:bg-gray-100 p-2 rounded-t"
            onClick={() => handleEditAddress(addressId)}
          >
            <Pencil className="w-4 h-4" />
            <p>Edit</p>
          </div>
          <div
            className="flex items-center gap-2 cursor-pointer text-red-600 hover:bg-gray-100 p-2 rounded-b"
            onClick={() => handleDeleteAddress(addressId)}
          >
            <Trash className="w-4 h-4" />
            <p>Delete</p>
          </div>
        </div>
      )}

      {loading && (
        <div className="absolute top-0 left-0 w-full h-full bg-opacity-50 bg-gray-600 flex items-center justify-center rounded-lg">
          <span className="text-white text-lg">Deleting...</span>
        </div>
      )}
    </div>
  );
};

export default AddressCard;
