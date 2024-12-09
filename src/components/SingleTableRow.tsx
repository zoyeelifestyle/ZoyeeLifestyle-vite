/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable @typescript-eslint/no-explicit-any */
import {
  calculateDiscountedPrice,
  removeExtra,
  roundOffTwoDecimal,
  toggleLocalStorageCart,
} from "@/utils/helper";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { TableCell, TableRow } from "./ui/table";
import { Link } from "react-router-dom";
import CustomTooltip from "./CustomTooltip";
import { Minus, Plus, Trash2 } from "lucide-react";
import SelectData from "./SelectData";

const SingleTableRow = ({
  productName,
  price,
  discount,
  discountPrice,
  setTotalPrice,
  totalPrice,
  productImage,
  productId,
  cartData,
  setCartData,
  sizes,
  colors,
  allCartProductData,
  setAllCartProductData,
}: {
  productName: string;
  price: number;
  discount?: number;
  discountPrice?: number;
  setTotalPrice: (value: number) => void;
  totalPrice: number;
  productImage: string;
  productId: string;
  cartData: any[];
  setCartData: (value: any) => void;
  sizes: any;
  colors: any;
  allCartProductData: any;
  setAllCartProductData: (item: any) => void;
}) => {
  const [quantity, setQuantity] = useState(1);
  const [subTotal, setSubTotal] = useState(1);

  const total = 50;

  const [newSizes, setNewSizes] = useState<any>([]);
  const [newColors, setNewColors] = useState<any>([]);

  const [selectData, setSelectData] = useState<any>({
    size: "",
    color: "",
  });

  const displayPrice = discountPrice
    ? discountPrice
    : discount
    ? Math.round(calculateDiscountedPrice(price, discount))
    : price;

  useEffect(() => {
    if (selectData.size && selectData.color) {
      const product = {
        where: "cart",
        productName: productName,
        price: displayPrice,
        size: selectData.size,
        color: selectData.color,
        quantity,
        productId,
        img: productImage,
      };

      setAllCartProductData([...allCartProductData, product]);
    }
  }, [selectData, displayPrice]);

  useEffect(() => {
    const updatedSizes = sizes.map((item: any) => ({
      label: item,
      value: item,
    }));
    setNewSizes(updatedSizes);

    const updateColor = colors.map((item: any) => ({
      label: item.hex,
      value: item.hex,
    }));

    setNewColors(updateColor);
  }, [sizes, colors]);

  const increaseQuantity = () => {
    if (total > quantity) {
      setQuantity((prev) => prev + 1);
      const newSubTotal = quantity * displayPrice;
      setTotalPrice(totalPrice + newSubTotal - (quantity - 1) * displayPrice);
    } else {
      toast(`Only ${total} Stocks We Have`, {
        icon: "⚠️",
      });
    }
  };

  const decreaseQuantity = () => {
    if (quantity > 1) {
      setQuantity((prev) => prev - 1);
      setTotalPrice(totalPrice - displayPrice);
    } else {
      toast("Quantity Should Be Greater Than 1", {
        icon: "⚠️",
      });
    }
  };

  // Update the subtotal whenever quantity changes
  useEffect(() => {
    const newSubTotal = quantity * displayPrice;
    setSubTotal(newSubTotal);
  }, [quantity, displayPrice, setTotalPrice]);

  const removeFromCart = () => {
    const newCartData = cartData.filter((item) => item._id !== productId);

    setCartData(newCartData);
    toggleLocalStorageCart("cart", productId);
    toast.success("Product Removed From Cart");
  };

  return (
    <TableRow className="">
      <TableCell className="text-center flex justify-center items-center flex-col gap-2">
        <div className="relative">
          <Link to={`/shop/${productId}`}>
            <img
              src={productImage}
              width={100}
              height={100}
              alt={productName || "Product Image"}
              className="rounded-md sm:w-[80px] sm:h-[80px] md:w-[90px] md:h-[90px] lg:w-[100px] lg:h-[100px]"
            />
          </Link>
          <div
            onClick={removeFromCart}
            className="absolute top-1 left-1 bg-white hover:shadow-xl cursor-pointer hover:bg-red-500 text-red-500  hover:text-white transition-all duration-200 ease-in-out px-2 py-2 flex justify-center items-center rounded-full"
          >
            <CustomTooltip Icon={Trash2} text="Remove" />
          </div>
        </div>
        <p className="font-medium capitalize text-xs sm:text-sm md:text-base lg:text-lg">
          {productName ? removeExtra(productName) : "No Name"}
        </p>
      </TableCell>
      <TableCell className="text-center text-xs sm:text-sm md:text-base lg:text-lg">
        {roundOffTwoDecimal(displayPrice)} {/* Show the display price here */}
      </TableCell>
      <TableCell className="text-center text-xs sm:text-sm md:text-base lg:text-lg">
        <SelectData
          data={newSizes}
          setSelectData={setSelectData}
          selectData={selectData}
        />
      </TableCell>
      <TableCell className="text-center text-xs sm:text-sm md:text-base lg:text-lg">
        <SelectData
          data={newColors}
          isColor
          setSelectData={setSelectData}
          selectData={selectData}
        />
      </TableCell>
      <TableCell className="mx-auto">
        <div className="w-full h-full">
          <div className="flex items-center justify-center gap-3">
            <div
              className="p-1 bg-gray-100 cursor-pointer"
              onClick={decreaseQuantity}
            >
              <Minus className="w-3 h-3 sm:w-4 sm:h-4 md:w-5 md:h-5 lg:w-6 lg:h-6" />
            </div>
            <div className="text-xs sm:text-sm md:text-base lg:text-lg">
              {quantity}
            </div>
            <div
              className="p-1 bg-gray-100 cursor-pointer"
              onClick={increaseQuantity}
            >
              <Plus className="w-3 h-3 sm:w-4 sm:h-4 md:w-5 md:h-5 lg:w-6 lg:h-6" />
            </div>
          </div>
        </div>
      </TableCell>
      <TableCell className="text-center text-xs sm:text-sm md:text-base lg:text-lg">
        {roundOffTwoDecimal(subTotal)}
      </TableCell>
    </TableRow>
  );
};

export default SingleTableRow;
