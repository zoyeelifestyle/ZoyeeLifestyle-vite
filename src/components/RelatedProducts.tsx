/* eslint-disable @typescript-eslint/no-explicit-any */

import { Carousel, CarouselContent, CarouselItem } from "./ui/carouseltwo";
import ProductCard from "./ProductCard";

const RelatedProducts = ({
  categoryProducts,
  currentProduct,
}: {
  categoryProducts: any;
  currentProduct: number;
}) => {
  return (
    <div className="px-3">
      <h2 className="text-xl font-semibold">You May Also Like</h2>
      <div className="">
        <Carousel>
          <CarouselContent className="space-x-4 md:space-x-6 lg:space-x-8">
            {categoryProducts?.slice(0, 4).map((item: any, index: number) => (
              <CarouselItem
                className="basis-1/2 xl:basis-1/4 h-full cursor-pointer py-5"
                key={index}
              >
                {currentProduct !== item.id && (
                  <ProductCard
                    productId={item.id}
                    imgUrl={item.images[0]}
                    title={item.title}
                    price={item.price}
                    discount={20}
                    category={item.category.name}
                    key={item.id}
                  />
                )}
              </CarouselItem>
            ))}
          </CarouselContent>
        </Carousel>
      </div>
    </div>
  );
};

export default RelatedProducts;
