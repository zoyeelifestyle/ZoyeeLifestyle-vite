/* eslint-disable @typescript-eslint/no-explicit-any */
import { Link, useParams } from "react-router-dom";
import RootLayout from "./RootLayout";
import { authStore } from "@/store/authStore";
import { useCallback, useEffect, useState } from "react";
import SingleProductBanner from "@/components/SingleProductBanner";
import LoadingSpinner from "@/components/LoadingSpinner";
import SingleProductImageDisplay from "@/components/SingleProductImageDisplay";
import ProductDetails from "@/components/ProductDetails";
import RelatedProducts from "@/components/RelatedProducts";

const SingleProduct = () => {
  const { productId } = useParams();

  const { getSingleProduct, allProducts, getAllProducts } = authStore();

  const [singleProduct, setSingleProduct] = useState<any>(null);

  const fetchCategoryProducts = useCallback(async () => {
    await getAllProducts();
  }, [getAllProducts]);

  useEffect(() => {
    if (productId !== null) {
      const fetchData = async () => {
        const data = await getSingleProduct(productId);
        setSingleProduct(data);
      };
      fetchData();
    }
  }, [productId, getSingleProduct]);

  useEffect(() => {
    fetchCategoryProducts();
  }, [fetchCategoryProducts]);

  return (
    <RootLayout>
      <div>
        {singleProduct ? (
          <div>
            <SingleProductBanner productName={singleProduct.title} />

            <div className="my-10 flex flex-col sm:flex-row gap-10 px-4 sm:px-10">
              <div className="sm:w-1/2">
                <SingleProductImageDisplay
                  imageOrVideoUrl={singleProduct.images}
                />
              </div>

              <div className="sm:w-1/2 flex flex-col gap-5">
                <ProductDetails
                  productId={singleProduct.id}
                  title={singleProduct.title}
                  price={singleProduct.price}
                  description={singleProduct.description}
                  category={singleProduct.category.name}
                  discount={20}
                  size={["M", "L", "XL", "XXL"]}
                  color={["#232133", "#522345", "#984567", "#909090"]}
                />
              </div>
            </div>

            {allProducts.length > 0 && (
              <div className="px-4 sm:px-10">
                <RelatedProducts
                  categoryProducts={allProducts}
                  currentProduct={singleProduct.id}
                />
              </div>
            )}
            {/* <Link to={`/category/${singleProduct.category.id}`}>
              <div className="flex justify-center items-center mb-5">
                <button className=" px-5 py-2 font-semibold tracking-wide capitalize border-[2px] border-gray-400 text-gray-400 hover:text-gray-500 transition-all duration-200 ease-in-out hover:shadow-xl">
                  View More
                </button>
              </div>
            </Link> */}
            <Link to={"/shop"}>
              <div className="flex justify-center items-center mb-5">
                <button className=" px-5 text-sm md:text-base hover:text-white hover:bg-pink-600  py-2 font-semibold tracking-wide capitalize border-[2px] border-pink-600  text-pink-600 transition-all duration-200 ease-in-out hover:shadow-xl">
                  Show More
                </button>
              </div>
            </Link>
          </div>
        ) : (
          <div>
            <LoadingSpinner />
          </div>
        )}
      </div>
    </RootLayout>
  );
};

export default SingleProduct;
