import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carouseltwo";

import { authStore } from "./../store/authStore";
import { useEffect } from "react";
import { Link } from "react-router-dom";

const CategoryCarousel = () => {
  const { categories, getAllCategories } = authStore();

  useEffect(() => {
    const func = async () => {
      await getAllCategories();
    };
    func();
  }, [getAllCategories]);

  return (
    <Carousel>
      <CarouselContent className=" hidden md:flex  md:space-x-6 px-5 lg:space-x-8">
        {categories.map((item, index) => {
          return (
            <CarouselItem
              key={index}
              className="md:basis-1/2 lg:basis-1/3 flex justify-center xl:basis-1/4 h-full cursor-pointer"
            >
              <Link to={`/category/${item?.id}`}>
                <img
                  src={item.image}
                  className="w-full h-full rounded-2xl object-cover"
                  alt={item.name}
                />
                <h3 className="text-sm text-center font-semibold tracking-wider pt-4 sm:text-2xl md:text-xl lg:text-2xl">
                  {item.name}
                </h3>
              </Link>
            </CarouselItem>
          );
        })}
      </CarouselContent>
      <CarouselContent className=" md:hidden  md:space-x-6 px-5 lg:space-x-8">
        {categories.map((item, index) => {
          return (
            <CarouselItem
              key={index}
              className="basis-1/3 flex justify-center xl:basis-1/4 h-full cursor-pointer"
            >
              <Link to={`/category/${item?.id}`}>
                <img
                  src={item.image}
                  className="w-[100px] h-[100px] rounded-full object-cover"
                  alt={item.name}
                />
                <h3 className="text-sm text-center font-semibold tracking-wider pt-4 sm:text-2xl md:text-xl lg:text-2xl">
                  {item.name}
                </h3>
              </Link>
            </CarouselItem>
          );
        })}
      </CarouselContent>

      {/* Carousel Navigation */}
      <div className="hidden space-x-4 py-5 md:flex justify-center md:justify-between">
        <CarouselPrevious className="p-2 rounded-full bg-gray-300 hover:bg-gray-400 transition-all" />
        <CarouselNext className="p-2 rounded-full bg-gray-300 hover:bg-gray-400 transition-all" />
      </div>
    </Carousel>
  );
};

export default CategoryCarousel;
