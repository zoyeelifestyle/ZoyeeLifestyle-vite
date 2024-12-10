/* eslint-disable @typescript-eslint/no-explicit-any */
const ShippingAddress = ({
  addresses,
  setIsChangeAddressModal,
}: {
  addresses: any;
  setIsChangeAddressModal: (value: boolean) => void;
}) => {
  return (
    <div className="border px-5 py-3 rounded-md shadow-md flex items-start justify-between">
      <div key={addresses?._id}>
        <h2 className="font-semibold text-xl">{addresses.username}</h2>
        <h3 className=" text-lg">{addresses.address1}</h3>
        <h3 className=" text-lg">{addresses.address2}</h3>

        <div className="flex items-center gap-2 text-sm">
          <p className="capitalize">{addresses.street}</p>
          <span>,</span>
          <p className="capitalize">{addresses.city}</p>
        </div>

        <p className="text-sm text-gray-600 capitalize">
          <span>{addresses.state}</span>, <span>{addresses.country}</span> -{" "}
          <span>{addresses.zipCode}</span>
        </p>

        {addresses.phone && (
          <p className="text-sm text-gray-600 capitalize">
            Phone: <span>+91 {addresses.phone}</span>
          </p>
        )}
      </div>
      <div
        onClick={() => setIsChangeAddressModal(true)}
        className="font-semibold text-sm text-pink-600 cursor-pointer"
      >
        <p className="">Change</p>
      </div>
    </div>
  );
};

export default ShippingAddress;
