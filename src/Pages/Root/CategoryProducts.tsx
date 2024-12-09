/* eslint-disable @typescript-eslint/no-explicit-any */
import { useParams } from "react-router-dom";
import RootLayout from "./RootLayout";
import { authStore } from "@/store/authStore";
import LoadingSpinner from "@/components/LoadingSpinner";
import PageBanner from "@/components/PageBanner";
import Filter from "@/components/Filter";
import { useEffect, useState } from "react";
import ProductCard from "@/components/ProductCard";
import { getFilteredData, paginationData } from "@/utils/helper";
import PaginationSection from "@/components/PaginationSection";

const CategoryProducts = () => {
  const { categoryId } = useParams();
  const {
    isLoading,
    getCategoryDetailsWithId,
    categoryProducts,
    categoryTitle,
  } = authStore();

  const [filter, setFilter] = useState<string>("Filter");
  const [productPerPage, setProductPerPage] = useState(8);
  const [currentPage, setCurrentPage] = useState(1);
  const [filterData, setFilterData] = useState<any[]>([]);
  const [totalPossiblePage, setTotalPossiblePage] = useState(0);

  const [productSlice, setProductSlice] = useState<{
    start: number;
    end: number;
  }>({
    start: 0,
    end: productPerPage,
  });

  useEffect(() => {
    if (categoryProducts && categoryProducts.length > 0) {
      setTotalPossiblePage(Math.ceil(categoryProducts.length / productPerPage));
    } else {
      setTotalPossiblePage(0);
    }
  }, [categoryProducts, productPerPage]);

  useEffect(() => {
    const fetchData = async () => {
      const newFilteredData = await getFilteredData(filter, categoryProducts);
      setFilterData([...newFilteredData]);
    };
    fetchData();
  }, [filter, categoryProducts]);

  useEffect(() => {
    const fetchStartAndEnd = async () => {
      const [start, end] = await paginationData(currentPage, productPerPage);
      setProductSlice({ start, end });
    };
    fetchStartAndEnd();
  }, [currentPage, productPerPage]);

  useEffect(() => {
    const fetchCategory = async () => {
      setFilter("Filter");
      setCurrentPage(1);
      setProductSlice({ start: 0, end: productPerPage });
      setFilterData([]);
      await getCategoryDetailsWithId(categoryId);
    };
    fetchCategory();
  }, [categoryId, getCategoryDetailsWithId, productPerPage]);

  return (
    <RootLayout>
      <div className="w-full">
        {isLoading ? (
          <LoadingSpinner />
        ) : (
          <>
            {categoryTitle && (
              <PageBanner isCategory={true} title={categoryTitle} />
            )}
            <Filter
              setProductPerPage={setProductPerPage}
              filter={filter}
              setFilter={setFilter}
              start={categoryProducts.length ? productSlice.start + 1 : 0}
              end={
                categoryProducts.length > productSlice.end
                  ? productSlice.end
                  : categoryProducts.length
              }
              total={categoryProducts.length}
            />
            <div className="w-full flex justify-center items-center my-10 lg:px-28">
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 px-3 md:px-16">
                {(filterData.length > 0 ? filterData : categoryProducts)
                  .slice(productSlice.start, productSlice.end)
                  .map((item) => {
                    return (
                      <ProductCard
                        productId={item?._id}
                        title={item?.title}
                        price={item?.actual_price}
                        discount_price={item?.discount_price}
                        discount={item?.discount}
                        category={categoryTitle}
                        key={item?._id}
                        imageDatas={item?.images}
                      />
                    );
                  })}
              </div>
            </div>

            {categoryProducts.length === 0 && (
              <div className="text-center w-full mb-16">
                <p>No Products</p>
              </div>
            )}

            {categoryProducts.length > productPerPage && (
              <PaginationSection
                currentPage={currentPage}
                setCurrentPage={setCurrentPage}
                totalPossiblePage={totalPossiblePage}
              />
            )}
          </>
        )}
      </div>
    </RootLayout>
  );
};

export default CategoryProducts;
