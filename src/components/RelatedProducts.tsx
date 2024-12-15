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
    <div className=" px-5 md:px-16">
      <h2 className="text-xl font-semibold">You May Also Like</h2>
      <div className="">
        <Carousel>
          <CarouselContent className="space-x-4 md:space-x-6 lg:space-x-8">
            {categoryProducts?.slice(0, 5).map((item: any, index: number) => {
              return (
                currentProduct !== item._id && (
                  <CarouselItem
                    className="basis-1/2 xl:basis-1/4 h-full cursor-pointer py-5"
                    key={index}
                  >
                    <ProductCard
                      productId={item?._id}
                      title={item?.title}
                      price={item?.actual_price}
                      discount={item?.discount}
                      discount_price={item?.discount_price}
                      category={item?.category?.title}
                      key={item?.documentId}
                      imageDatas={item?.images}
                      preBook={item?.is_launched}
                      isSoldOut={item?.isSoldOut}
                    />
                  </CarouselItem>
                )
              );
            })}
          </CarouselContent>
        </Carousel>
      </div>
    </div>
  );
};

export default RelatedProducts;
