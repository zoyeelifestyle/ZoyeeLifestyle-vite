import { removeExtra } from "@/utils/helper";
// import Image from "../assets/category/img1.jpg";

const CheckoutProductCard = ({
  quantity,
  size,
  finalPrice,
  color,
  image,
  name,
}: {
  quantity: number;
  size: string;
  finalPrice: number;
  color: string;
  image: string;
  name: string;
}) => {
  return (
    <div className="py-2 flex gap-2">
      <div className="">
        <img src={image} alt="" className="w-[100px] h-full rounded-md" />
      </div>
      <div className="flex flex-col gap-1">
        <h2 className="font-semibold">{removeExtra(name)}</h2>
        <p>
          Size: <span className="font-semibold">{size}</span>
        </p>
        <p className="flex items-center gap-2">
          Color:{" "}
          <div
            className="w-5 h-5 rounded-full bg-red-800"
            style={{ backgroundColor: color }}
          ></div>
        </p>
        <p>
          Quantity: <span className="font-semibold">{quantity}</span>
        </p>
        <p className="">
          Final Price: <span className="font-semibold">₹ {finalPrice}</span>
        </p>
      </div>
    </div>
  );
};

export default CheckoutProductCard;
