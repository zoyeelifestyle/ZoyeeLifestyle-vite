/* eslint-disable react-hooks/exhaustive-deps */

import { useEffect, useState } from "react";
import { Check, SlidersHorizontal } from "lucide-react";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import {
  Command,
  CommandGroup,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";

const filterData = [
  {
    value: "htl",
    label: "High to Low",
  },
  {
    value: "lth",
    label: "Low to High",
  },

  {
    value: "title",
    label: "By Title",
  },
];

const filterSet = [
  {
    cate: "price",
    list: [
      {
        value: "htl",
        label: "High to Low",
      },
      {
        value: "lth",
        label: "Low to High",
      },
    ],
  },

  {
    cate: "Others",
    list: [
      {
        value: "title",
        label: "By Title",
      },
    ],
  },
];

export function FilterComboBox({
  filter,
  setFilter,
}: {
  filter: string;
  setFilter: (value: string) => void;
}) {
  const [open, setOpen] = useState(false);
  const [value, setValue] = useState("");

  useEffect(() => {
    const selectedOption = filterData.find((item) => item.value === value);
    if (selectedOption) {
      setFilter(selectedOption.label);
    }
  }, [value]);

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          role="combobox"
          aria-expanded={open}
          className="text-sm md:text-base font-semibold capitalize tracking-wide text-pink-600 border-pink-600 border-[1px] hover:shadow-2xl transition-all duration-200 ease-in-out"
        >
          <SlidersHorizontal className="w-6 h-6" />
          {value
            ? filterData.find((item) => item.value === value)?.label
            : filter}
          {/* {filter} */}
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-[200px] p-0">
        <Command>
          <CommandList>
            {filterSet.map((item, index) => (
              <div key={index}>
                <h2 className="text-left ml-4 font-semibold tracking-wide mt-2 capitalize">
                  {item.cate}
                </h2>
                <CommandGroup>
                  {item.list.map((framework) => (
                    <CommandItem
                      key={framework.value}
                      value={framework.value}
                      onSelect={(currentValue) => {
                        const newValue =
                          currentValue === value ? "" : currentValue;
                        setValue(newValue);
                        setOpen(false);
                      }}
                      className="capitalize"
                    >
                      {framework.label}
                      <Check
                        className={cn(
                          "ml-auto",
                          value === framework.value
                            ? "opacity-100"
                            : "opacity-0"
                        )}
                      />
                    </CommandItem>
                  ))}
                </CommandGroup>
              </div>
            ))}

            {/* <div
              onClick={() => {
                setFilter("Filter");
                setValue("");
              }}
              className="p-3 cursor-pointer text-red-500 flex items-center gap-1 hover:bg-red-500 duration-300 hover:text-white ease-in-out transition-all"
            >
              <CircleX className="w-5 h-5" />
              <h3>Clear Filter</h3>
            </div> */}
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  );
}
