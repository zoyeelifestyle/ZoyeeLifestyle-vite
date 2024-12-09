/* eslint-disable @typescript-eslint/no-explicit-any */

import SingleTableRow from "./SingleTableRow";
import { Table, TableBody, TableHead, TableHeader, TableRow } from "./ui/table";

const CartTable = ({
  cartData,
  setTotalPrice,
  totalPrice,
  setCartData,
  allCartProductData,
  setAllCartProductData,
}: {
  cartData: any;
  setTotalPrice: (value: number) => void;
  totalPrice: number;
  setCartData: (value: any) => void;
  allCartProductData: any;
  setAllCartProductData: (item: any) => void;
}) => {
  return (
    <div className="overflow-x-auto p-2">
      <Table>
        <TableHeader className="bg-pink-600 text-xs md:text-sm">
          <TableRow>
            <TableHead className="text-white text-center px-2 py-1">
              Product
            </TableHead>
            <TableHead className="text-white text-center px-2 py-1">
              Price(₹)
            </TableHead>{" "}
            <TableHead className="text-white text-center px-2 py-1">
              Size
            </TableHead>{" "}
            <TableHead className="text-white text-center px-2 py-1">
              Color
            </TableHead>
            <TableHead className="text-white text-center px-2 py-1">
              Quantity
            </TableHead>
            <TableHead className="text-white text-center px-2 py-1">
              SubTotal(₹)
            </TableHead>
          </TableRow>
        </TableHeader>
        <TableBody className="text-xs md:text-sm">
          {cartData?.map((item: any, index: number) => {
            const cartImage = item?.images[0]?.asset.url;

            return (
              <SingleTableRow
                allCartProductData={allCartProductData}
                setAllCartProductData={setAllCartProductData}
                key={index}
                productName={item?.title}
                price={item?.actual_price}
                discount={item?.discount}
                discountPrice={item?.discount_price}
                productImage={`${cartImage}`}
                setTotalPrice={setTotalPrice}
                totalPrice={totalPrice}
                productId={item?._id}
                cartData={cartData}
                setCartData={setCartData}
                sizes={item?.sizes}
                colors={item.colors}
              />
            );
          })}
        </TableBody>
      </Table>
    </div>
  );
};

export default CartTable;
