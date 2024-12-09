import AddressCard from "./AddressCard";

/* eslint-disable @typescript-eslint/no-explicit-any */
const AddAddress = ({
  addresses,
  updateUserDataAfterDeletion,
  setIsPopupOpen,
  setSelectedFormData,
  setEditAddressId,
}: {
  // userId: string;
  addresses: any[];
  updateUserDataAfterDeletion: (deletedAddressId: string) => void;
  setIsPopupOpen: (value: boolean) => void;
  setSelectedFormData: (value: any) => void;
  setEditAddressId: (value: string) => void;
}) => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-2 my-10">
      {addresses?.map((item) => (
        <AddressCard
          key={item._id}
          address1={item?.address1}
          address2={item?.address2}
          city={item?.city}
          street={item?.street}
          state={item?.state}
          country={item?.country}
          zipCode={item?.zipCode}
          addressId={item?._id}
          phone={item?.phone}
          updateUserDataAfterDeletion={updateUserDataAfterDeletion}
          setIsPopupOpen={setIsPopupOpen}
          setSelectedFormData={setSelectedFormData}
          setEditAddressId={setEditAddressId}
        />
      ))}
    </div>
  );
};

export default AddAddress;
