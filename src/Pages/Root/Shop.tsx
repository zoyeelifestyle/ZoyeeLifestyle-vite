/* eslint-disable @typescript-eslint/no-explicit-any */
import { authStore } from "@/store/authStore";
import RootLayout from "./RootLayout";
import { useEffect, useState } from "react";
import { getFilteredData, paginationData } from "@/utils/helper";
import LoadingSpinner from "@/components/LoadingSpinner";
import PageBanner from "@/components/PageBanner";
import Filter from "@/components/Filter";
import SpecialBanner from "@/components/SpecialBanner";
import ProductCard from "@/components/ProductCard";
import PaginationSection from "@/components/PaginationSection";

const Shop = () => {
  const { allProducts, getAllProducts, isLoading } = authStore();

  const [currentPage, setCurrentPage] = useState(1);
  const [productPerPage, setProductPerPage] = useState(16);
  const [totalPossiblePage, setTotalPossiblePage] = useState(0);

  const [filterData, setFilterData] = useState<any[]>([]);

  const [filter, setFilter] = useState<string>("Filter");

  useEffect(() => {
    if (allProducts && allProducts.length > 0) {
      setTotalPossiblePage(Math.ceil(allProducts.length / productPerPage));
    } else {
      setTotalPossiblePage(0);
    }
  }, [allProducts, productPerPage]);

  useEffect(() => {
    const fetchData = async () => {
      const newFilteredData = await getFilteredData(filter, allProducts);

      setFilterData([...newFilteredData]);
    };
    fetchData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [filter]);

  const [productSlice, setProductSlice] = useState<{
    start: number;
    end: number;
  }>({
    start: 0,
    end: productPerPage,
  });

  useEffect(() => {
    getAllProducts();
  }, [getAllProducts]);

  useEffect(() => {
    const fetchStartAndEnd = async () => {
      const [start, end] = await paginationData(currentPage, productPerPage);
      setProductSlice({ start, end });
    };
    fetchStartAndEnd();
  }, [currentPage, productPerPage]);

  return (
    <RootLayout>
      <div className="w-full">
        {isLoading ? (
          <div className="w-full">
            <LoadingSpinner />
          </div>
        ) : (
          <>
            <PageBanner isCategory={false} title="shop" />
            <Filter
              setProductPerPage={setProductPerPage}
              filter={filter}
              setFilter={setFilter}
              start={allProducts.length ? productSlice.start + 1 : 0}
              end={
                allProducts.length > productSlice.end
                  ? productSlice.end
                  : allProducts.length
              }
              total={allProducts.length}
            />
            <div className="w-full flex justify-center items-center my-10 lg:px-28">
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 px-3 md:px-16">
                {(filterData.length > 0 ? filterData : allProducts)
                  .slice(productSlice.start, productSlice.end)
                  .map((item) => {
                    return (
                      <ProductCard
                        productId={item?._id}
                        title={item?.title}
                        price={item?.actual_price}
                        discount_price={item?.discount_price}
                        discount={item?.discount}
                        category={item?.category?.title}
                        key={item?._id}
                        imageDatas={item?.images}
                      />
                    );
                  })}
              </div>
            </div>
            {allProducts.length == 0 && (
              <div className="text-center w-full mb-16">
                <p className="">No Products</p>
              </div>
            )}

            {allProducts.length > productPerPage && (
              <PaginationSection
                currentPage={currentPage}
                setCurrentPage={setCurrentPage}
                totalPossiblePage={totalPossiblePage}
              />
            )}

            <SpecialBanner />
          </>
        )}
      </div>
    </RootLayout>
  );
};

export default Shop;
