import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carouseltwo";

import { authStore } from "./../store/authStore";
import { useCallback, useEffect } from "react";
import { Link } from "react-router-dom";
import SketetonWrapper from "./SkeletonWrapper";

const CategoryCarousel = () => {
  const { categories, getAllCategories, isLoading } = authStore();

  const fetchCategoryProducts = useCallback(async () => {
    await getAllCategories();
  }, [getAllCategories]);

  useEffect(() => {
    const func = async () => {
      await fetchCategoryProducts();
    };
    func();
  }, [fetchCategoryProducts]);

  return (
    <Carousel>
      {categories.length == 0 ? (
        <p className="text-center text-xl">No Categories</p>
      ) : (
        <SketetonWrapper isLoading={isLoading}>
          <CarouselContent className="md:space-x-6 px-5 lg:space-x-8">
            {categories.map((item, index) => {
              return (
                <SketetonWrapper key={index} isLoading={isLoading}>
                  <CarouselItem
                    key={index}
                    className="basis-1/3 flex justify-center xl:basis-1/4 h-full cursor-pointer md:py-5"
                  >
                    <Link
                      to={`/category/${item?._id}`}
                      className="flex justify-center items-center flex-col"
                    >
                      <img
                        src={`${item?.image?.asset?.url}`}
                        className="w-[100px] transition-all shadow-2xl duration-300 ease-in-out h-[100px] md:h-[300px] md:w-full rounded-full md:rounded-none hover:scale-105 object-cover "
                        alt={item?.title}
                      />
                      <h3 className="text-sm capitalize text-center font-semibold tracking-wider pt-4 sm:text-2xl md:text-xl lg:text-2xl">
                        {item?.title}
                      </h3>
                    </Link>
                  </CarouselItem>
                </SketetonWrapper>
              );
            })}
          </CarouselContent>
        </SketetonWrapper>
      )}

      {/* Carousel Navigation */}
      {categories.length !== 0 && (
        <div className="hidden space-x-4 py-5 md:flex justify-center md:justify-between">
          <CarouselPrevious className="p-2 rounded-full bg-gray-300 hover:bg-gray-400 transition-all" />
          <CarouselNext className="p-2 rounded-full bg-gray-300 hover:bg-gray-400 transition-all" />
        </div>
      )}
    </Carousel>
  );
};

export default CategoryCarousel;
