import { useCallback, useEffect } from "react";
import ProductCard from "./ProductCard";

import { authStore } from "@/store/authStore";
import { Link } from "react-router-dom";
import SketetonWrapper from "./SkeletonWrapper";
import { motion } from "framer-motion";

const AllProducts = () => {
  const { allProducts, getAllProducts, isLoading } = authStore();

  const fetchAllProducts = useCallback(async () => {
    await getAllProducts();
  }, [getAllProducts]);

  useEffect(() => {
    const fetchdata = async () => {
      fetchAllProducts();
    };
    fetchdata();
  }, [fetchAllProducts]);

  useEffect(() => {
    console.log("Product", allProducts);
  }, [allProducts]);

  // Animation variants for the section and the product cards
  const sectionVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { duration: 0.5 } },
  };

  const cardVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5, delay: 0.2 } },
  };

  return (
    <motion.section
      className="w-full my-10 space-y-3"
      variants={sectionVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true }}
    >
      <h2 className=" text-xl md:text-3xl font-semibold text-center text-pink-600">
        Featured Products
      </h2>
      {allProducts.length === 0 ? (
        <p className="text-center">No Products</p>
      ) : (
        <>
          <div className="w-full flex justify-center items-center !mt-10">
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-7 px-5 md:px-16">
              {allProducts?.map((item) => {
                return (
                  <SketetonWrapper key={item?._id} isLoading={isLoading}>
                    <motion.div
                      variants={cardVariants}
                      initial="hidden"
                      whileInView="visible"
                      viewport={{ once: true, margin: "0px 0px -100px 0px" }} // Trigger animation when the card is within view
                    >
                      <ProductCard
                        productId={item?._id}
                        title={item?.title}
                        price={item?.actual_price}
                        discount_price={item?.discount_price}
                        discount={item?.discount}
                        category={item?.category?.title}
                        imageDatas={item?.images}
                        preBook={item?.is_launched}
                      />
                    </motion.div>
                  </SketetonWrapper>
                );
              })}
            </div>
          </div>
        </>
      )}
      {allProducts.length > 8 && (
        <Link to={"/shop"}>
          <div className="flex justify-center items-center !mt-5 md:!mt-12">
            <button className=" px-5 text-sm md:text-base py-2 font-semibold tracking-wide capitalize border-[2px] border-pink-600  text-pink-600 transition-all duration-200 ease-in-out hover:shadow-xl">
              Show More
            </button>
          </div>
        </Link>
      )}
    </motion.section>
  );
};

export default AllProducts;
