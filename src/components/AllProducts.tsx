import { useEffect } from "react";
import ProductCard from "./ProductCard";

import { authStore } from "@/store/authStore";
import { Link } from "react-router-dom";

const AllProducts = () => {
  const { allProducts, getAllProducts } = authStore();

  useEffect(() => {
    getAllProducts();
  }, [getAllProducts]);

  return (
    <section className="w-full my-5 space-y-3">
      <h2 className=" text-xl md:text-3xl font-semibold text-center text-pink-600">
        Featured Products
      </h2>
      <div className="w-full flex justify-center items-center !mt-5">
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-7 px-5 md:px-16">
          {allProducts?.slice(0, 8).map((item) => {
            return (
              <ProductCard
                productId={item.id}
                imgUrl={item.images[0]}
                title={item.title}
                price={item.price}
                discount={20}
                category={item.category.name}
                key={item.id}
              />
            );
          })}
        </div>
      </div>
      {allProducts.length > 8 && (
        <Link to={"/shop"}>
          <div className="flex justify-center items-center !mt-5 md:!mt-12">
            <button className=" px-5 text-sm md:text-base py-2 font-semibold tracking-wide capitalize border-[2px] border-pink-600  text-pink-600 transition-all duration-200 ease-in-out hover:shadow-xl">
              Show More
            </button>
          </div>
        </Link>
      )}
    </section>
  );
};

export default AllProducts;
