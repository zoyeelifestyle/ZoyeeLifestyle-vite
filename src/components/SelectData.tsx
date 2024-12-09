/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { useEffect, useState } from "react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

const SelectData = ({
  data,
  isColor,
  onSelect,
  setSelectData,
  selectData,
}: {
  data: any;
  isColor?: boolean;
  onSelect?: (item: any) => void;
  setSelectData: (item: any) => void;
  selectData: any;
}) => {
  const [selectedValue, setSelectedValue] = useState<string | null>(null);

  // Handle change when a new item is selected
  const handleSelectChange = (value: string) => {
    setSelectedValue(value);

    // Find the selected item by its value
    const selectedItem = data.find((item: any) => item.value === value);

    // Call the onSelect callback if provided, passing the selected item data
    if (onSelect && selectedItem) {
      onSelect(selectedItem);
    }
  };

  useEffect(() => {
    if (isColor) {
      setSelectData({ ...selectData, color: selectedValue });
    } else {
      setSelectData({ ...selectData, size: selectedValue });
    }
  }, [selectedValue]);

  return (
    <Select onValueChange={handleSelectChange}>
      <SelectTrigger className="">
        <SelectValue placeholder={isColor ? "Color" : "Size"} />
      </SelectTrigger>
      <SelectContent>
        {data.map((item: any) => (
          <SelectItem key={item.value} value={item.value}>
            {isColor ? (
              <div className="flex gap-1 p-1">
                <div
                  style={{ backgroundColor: item.value }}
                  className="w-5 h-5 rounded-full"
                ></div>
                <p className="">{item.label}</p>
              </div>
            ) : (
              <p className="">{item.label}</p>
            )}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
};

export default SelectData;
