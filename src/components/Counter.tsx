import { Minus, Plus } from "lucide-react";
import { useState } from "react";
import toast from "react-hot-toast";

const Counter = ({ total }: { total: number }) => {
  const [count, setCount] = useState(1);

  const increment = () => {
    if (total > count) {
      setCount((prev) => prev + 1);
    } else {
      toast(`Only ${total} Stocks We Have`, {
        icon: "⚠️",
      });
    }
  };

  const decrement = () => {
    if (count > 1) {
      setCount((prev) => prev - 1);
    } else {
      toast("Quantity Should Be Greater Than 1", {
        icon: "⚠️",
      });
    }
  };

  return (
    <>
      <div className="flex  items-center gap-4">
        <div className="flex items-center gap-2 sm:gap-4 shadow-xl bg-gray-100 rounded-md">
          <div
            onClick={decrement}
            className="px-3 sm:px-4 py-2 cursor-pointer transition-all duration-200 ease-in-out hover:bg-gray-300 rounded-md"
          >
            <Minus className="w-5 h-5 sm:w-6 sm:h-6" />
          </div>
          <p className="font-extrabold text-lg sm:text-xl">{count}</p>
          <div
            onClick={increment}
            className="px-3 sm:px-4 py-2 cursor-pointer transition-all duration-200 ease-in-out hover:bg-gray-300 rounded-md"
          >
            <Plus className="w-5 h-5 sm:w-6 sm:h-6" />
          </div>
        </div>
      </div>

      {total < 7 && (
        <p className="text-red-400 font-semibold sm:text-left mt-2">
          Hurry Up! Only {total} Left
        </p>
      )}
    </>
  );
};

export default Counter;
