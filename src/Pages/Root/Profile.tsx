/* eslint-disable @typescript-eslint/no-explicit-any */
import { useEffect, useRef, useState } from "react";
import { authStore } from "@/store/authStore"; // Assuming authStore contains logout method
import RootLayout from "./RootLayout";
import { UserCircle, Edit, LogOut } from "lucide-react"; // Add LogOut icon
import Order from "@/components/Order";
import { client } from "@/utils/sanityClient";

const Profile = () => {
  const { user, getUserOtherData, updateUserData, signout } = authStore();

  const [userOtherData, setUserOtherData] = useState({
    name: "",
    phone: "",
    profile: "",
    street: "",
    city: "",
    state: "",
    zipCode: "",
    country: "",
  });

  const [isEditMode, setIsEditMode] = useState(false);
  const [userDocId, setUserDocId] = useState("");
  const [editableData, setEditableData] = useState({
    name: "",
    phone: "",
    profile: "",
    street: "",
    city: "",
    state: "",
    zipCode: "",
    country: "",
  });

  const [newProfileImage, setNewProfileImage] = useState<string | null>(null);

  useEffect(() => {
    const fetch = async () => {
      if (user?.email) {
        const data = await getUserOtherData(user.id);
        console.log("userdata", data);

        setUserDocId(data[0]._id);

        setUserOtherData({
          ...userOtherData,
          name: data[0].name,
          phone: data[0].phone,
          street: data[0].shippingAddress.street,
          city: data[0].shippingAddress.city,
          state: data[0].shippingAddress.state,
          country: data[0].shippingAddress.country,
          zipCode: data[0].shippingAddress.zipCode,
          profile: data[0].profile?.asset?.url,
        });

        setEditableData({
          ...editableData,
          name: data[0].name,
          phone: data[0].phone,
          street: data[0].shippingAddress.street,
          city: data[0].shippingAddress.city,
          state: data[0].shippingAddress.state,
          country: data[0].shippingAddress.country,
          zipCode: data[0].shippingAddress.zipCode,
          profile: data[0].profile?.asset?.url,
        });
      }
    };
    fetch();
  }, [user]);

  // Handle form change
  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setEditableData({
      ...editableData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSaveChanges = async () => {
    try {
      // Prepare the updated user data
      const updatedData = {
        ...editableData,
        profile: newProfileImage || editableData.profile, // Replace the old profile image with the new one
      };

      // Save the changes using the updateUserData function
      await updateUserData(userDocId, updatedData);

      setIsEditMode(false); // Exit edit mode
    } catch (error: any) {
      console.error("Error while saving changes:", error.message);
    }
  };

  const imageRef = useRef<HTMLInputElement | null>(null);

  const handleChangeImage = () => {
    if (imageRef.current) {
      imageRef.current.click();
    }
  };

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]; // Get the selected file
    if (file) {
      try {
        // Use Sanity's asset upload API to upload the image
        const asset = await client.assets.upload("image", file, {
          filename: file.name, // You can also pass other metadata
        });

        const imageUrl = asset.url;
        setNewProfileImage(imageUrl);
        const reader = new FileReader();
        reader.onloadend = () => {
          setNewProfileImage(reader.result as string);
        };
        reader.readAsDataURL(file);
      } catch (error) {
        console.error("Error uploading image:", error);
      }
    }
  };

  // Logout function
  const handleLogout = () => {
    signout();
  };

  return (
    <RootLayout>
      {user?.email ? (
        <div className="space-y-8 px-4 sm:px-6 py-8">
          {/* Profile Header */}
          <div
            className={`bg-white p-6 rounded-lg shadow-md flex flex-col sm:flex-row ${
              isEditMode ? "items-start" : "items-center"
            } space-y-6 sm:space-y-0 sm:space-x-6 relative`}
          >
            {isEditMode ? (
              <>
                <div
                  className="relative cursor-pointer"
                  onClick={handleChangeImage}
                >
                  <img
                    src={newProfileImage || userOtherData?.profile || ""}
                    className="rounded-full w-28 h-28 sm:w-32 sm:h-32"
                    alt="Profile"
                  />
                  <Edit className="absolute right-1 text-pink-600 bottom-1 bg-white w-5 h-5" />
                </div>

                <input
                  ref={imageRef}
                  type="file"
                  className="hidden"
                  onChange={handleImageUpload}
                />
              </>
            ) : userOtherData?.profile || newProfileImage ? (
              <img
                src={newProfileImage || userOtherData?.profile}
                className="rounded-full w-28 h-28 sm:w-32 sm:h-32"
                alt=""
              />
            ) : (
              <UserCircle className="w-20 h-20 sm:w-24 sm:h-24 text-pink-600" />
            )}

            <div className="flex flex-col gap-3">
              <p className="text-2xl font-bold text-gray-800">
                {isEditMode ? (
                  <input
                    type="text"
                    name="name"
                    value={editableData.name}
                    onChange={handleChange}
                    className="text-2xl border w-full focus:outline-none py-1 px-1 rounded-[3px]"
                  />
                ) : (
                  userOtherData?.name || "No Name"
                )}
              </p>
              <p className="text-lg text-gray-600">{user.email}</p>
              <div className="space-y-1">
                <p className="text-sm font-medium text-gray-700">
                  <span className="font-semibold">Phone: </span>
                  {isEditMode ? (
                    <input
                      type="text"
                      name="phone"
                      value={editableData.phone}
                      onChange={handleChange}
                      className="text-sm border w-full p-1  focus:outline-none rounded-[3px]"
                    />
                  ) : (
                    <span className="text-gray-500">
                      {userOtherData?.phone || "No Number"}
                    </span>
                  )}
                </p>
                <p
                  className={`text-sm font-medium text-gray-700 ${
                    isEditMode && "flex flex-col gap-1"
                  } `}
                >
                  <span className="font-semibold">Shipping Address: </span>
                  {isEditMode ? (
                    <div className="space-y-2">
                      <input
                        type="text"
                        name="street"
                        value={editableData.street}
                        onChange={handleChange}
                        placeholder="Street"
                        className="text-sm border focus:outline-none p-1 rounded-[3px] w-full"
                      />
                      <input
                        type="text"
                        name="city"
                        value={editableData.city}
                        onChange={handleChange}
                        placeholder="City"
                        className="text-sm border focus:outline-none p-1 rounded-[3px] w-full"
                      />
                      <input
                        type="text"
                        name="state"
                        value={editableData.state}
                        onChange={handleChange}
                        placeholder="State"
                        className="text-sm border focus:outline-none p-1 rounded-[3px] w-full"
                      />
                      <input
                        type="text"
                        name="zipCode"
                        value={editableData.zipCode}
                        onChange={handleChange}
                        placeholder="Zip Code"
                        className="text-sm border focus:outline-none p-1 rounded-[3px] w-full"
                      />
                      <input
                        type="text"
                        name="country"
                        value={editableData.country}
                        onChange={handleChange}
                        placeholder="Country"
                        className="text-sm border focus:outline-none p-1 rounded-[3px] w-full"
                      />
                    </div>
                  ) : (
                    <span className="text-gray-500">
                      {`${userOtherData?.street}, ${userOtherData?.city}, ${userOtherData?.state}, ${userOtherData?.zipCode}, ${userOtherData?.country}`}
                    </span>
                  )}
                </p>
              </div>
            </div>

            {/* Edit icon at the top-right */}
            {!isEditMode && (
              <div
                onClick={() => setIsEditMode(!isEditMode)}
                className="absolute top-4 right-4 cursor-pointer text-gray-500 hover:text-gray-800"
              >
                <Edit className="w-6 h-6" />
              </div>
            )}
            {isEditMode && (
              <button
                onClick={handleSaveChanges}
                className="absolute top-4 right-4 cursor-pointer text-lg tracking-wide text-white bg-pink-600 px-4 py-1 rounded-xl font-semibold hover:shadow-xl transition-all duration-200 ease-in-out"
              >
                Save
              </button>
            )}
          </div>

          {/* Orders Section */}
          {/* <Order userEmail={user?.email} userId={user?.id} /> */}

          {/* Logout Button */}
          <button
            onClick={handleLogout}
            className="bg-red-600 text-white py-2 px-4 rounded-lg mt-4 hover:bg-red-700"
          >
            <LogOut className="w-5 h-5 inline-block mr-2" />
            Logout
          </button>
        </div>
      ) : (
        <h1 className="text-xl text-center text-gray-600">
          User profile is unavailable.
        </h1>
      )}
    </RootLayout>
  );
};

export default Profile;
