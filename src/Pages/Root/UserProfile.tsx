/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { useEffect, useState } from "react";
import RootLayout from "./RootLayout";
import { authStore } from "@/store/authStore";

import SketetonWrapper from "@/components/SkeletonWrapper";
import { LogOut, Plus } from "lucide-react";
import { Separator } from "@/components/ui/separator";
import AddAddress from "@/components/AddAddress";
import AddressForm from "@/components/AddressForm";
import Order from "./Order";

const UserProfile = () => {
  const { user, getUserDataFromSanity, isLoading, signout } = authStore();
  const [userData, setUserData] = useState<any | null>([]);
  const [isPopupOpen, setIsPopupOpen] = useState(false);

  const [selectedFormData, setSelectedFormData] = useState({
    username: "",
    address1: "",
    address2: "",
    city: "",
    street: "",
    state: "",
    country: "",
    zipcode: "",
    phoneNumber: "",
  });

  const [editAddressId, setEditAddressId] = useState("");

  useEffect(() => {
    const fetch = async () => {
      if (user && user.id) {
        try {
          const data = await getUserDataFromSanity(user.id);
          console.log("data", data);
          setUserData(data);
        } catch (error) {
          console.error("Error fetching user data:", error);
          setUserData([]);
        }
      }
    };

    fetch();
  }, [user]);

  const addAddressToUserData = (newAddress: any) => {
    setUserData((prevUserData: any) => {
      const updatedUserData = { ...prevUserData };
      updatedUserData[0].addresses.push(newAddress);
      return updatedUserData;
    });
  };

  const editAddressToUserData = (newAddress: any, addressId: string) => {
    const newData = { ...userData };
    const newFilterAddress = newData[0].addresses.filter(
      (item: any) => item._id !== addressId
    );
    newFilterAddress.push(newAddress);

    const finalData = [{ ...newData[0], addresses: newFilterAddress }];
    // console.log("Final Data", finalData);

    setUserData(finalData);
  };

  const updateUserDataAfterDeletion = (deletedAddressId: string) => {
    setUserData((prevUserData: any) => {
      const updatedUserData = { ...prevUserData };
      updatedUserData[0].addresses = updatedUserData[0].addresses.filter(
        (address: any) => address._id !== deletedAddressId
      );
      return updatedUserData;
    });
  };

  return (
    <RootLayout>
      <div className="">
        <div className="border rounded-sm px-5 py-4 mx-5 md:mx-20 mt-5">
          <SketetonWrapper isLoading={isLoading}>
            <>
              {userData ? (
                <div className="flex flex-col md:flex-row justify-between items-center md:items-start gap-4">
                  <div className="flex flex-col md:flex-row items-center gap-4 w-full md:w-auto">
                    <div className="text-center md:text-left">
                      <h3 className="text-xl font-semibold">
                        {userData[0]?.username || "User"}{" "}
                      </h3>
                      <p className="text-sm font-semibold text-gray-500">
                        {userData[0]?.email || "No email available"}{" "}
                      </p>
                    </div>
                  </div>
                  <div className="mt-4 md:mt-0 hidden md:block">
                    <div
                      onClick={async () => {
                        await signout();
                      }}
                      className="bg-red-100 px-2 py-2 text-red-500 rounded-full hover:bg-red-500 cursor-pointer hover:text-white duration-300 ease-in-out transition-all"
                    >
                      <LogOut className="w-5 h-5" />
                    </div>
                  </div>
                </div>
              ) : (
                <div>No User Data Available</div>
              )}
            </>
          </SketetonWrapper>
          <div className="my-5">
            <Separator />
          </div>
          <div className="">
            <div className="flex justify-between items-center flex-co  md:justify-between">
              <div className="">
                <SketetonWrapper isLoading={isLoading}>
                  {userData?.[0]?.addresses?.length > 0 && (
                    <p className="text-sm md:text-lg font-semibold">
                      {userData[0]?.addresses.length > 1
                        ? "Addresses"
                        : "Address"}
                    </p>
                  )}
                </SketetonWrapper>
              </div>
              <div
                onClick={() => {
                  setEditAddressId("");
                  setSelectedFormData({
                    address1: "",
                    address2: "",
                    city: "",
                    street: "",
                    state: "",
                    country: "",
                    zipcode: "",
                    phoneNumber: "",
                    username: "",
                  });
                  setIsPopupOpen((prev) => !prev);
                }}
                className="flex items-center gap-1 bg-pink-200 px-3 py-2 cursor-pointer text-pink-600 font-semibold capitalize hover:bg-pink-600 hover:text-white transition-all duration-200 ease-in-out rounded-sm"
              >
                <Plus className="w-4 h-4" />
                <button className="text-xs">Add Address</button>
              </div>
            </div>
            {userData && userData[0]?.addresses && (
              <AddAddress
                setEditAddressId={setEditAddressId}
                addresses={userData[0].addresses}
                updateUserDataAfterDeletion={updateUserDataAfterDeletion}
                setIsPopupOpen={setIsPopupOpen}
                setSelectedFormData={setSelectedFormData}
              />
            )}
            {isPopupOpen && (
              <div className="fixed inset-0 flex justify-center items-center bg-black bg-opacity-50 z-50">
                <AddressForm
                  setIsPopupOpen={setIsPopupOpen}
                  userId={userData?.[0]?._id} // Optional chaining for userId
                  addAddressToUserData={addAddressToUserData}
                  editAddressToUserData={editAddressToUserData}
                  selectedFormData={selectedFormData}
                  addressId={editAddressId}
                />
              </div>
            )}
          </div>
          <div className="my-5">
            <Separator />
          </div>
          {userData && userData[0]?.preOrders && (
            <Order
              title="Pre Order Details"
              orderDetails={userData[0].preOrders}
            />
          )}
          <div className="my-5">
            <Separator />
          </div>
          {userData && userData[0]?.orderDetails && (
            <Order
              title="Order Details"
              orderDetails={userData[0].orderDetails}
            />
          )}
        </div>
      </div>
    </RootLayout>
  );
};

export default UserProfile;
