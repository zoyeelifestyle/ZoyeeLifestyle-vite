import { authStore } from "@/store/authStore";
import RootLayout from "./RootLayout";
import { useEffect, useState } from "react";
import { Data } from "@/types/index.types";
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

  const [filterData, setFilterData] = useState<Data[]>([]);

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
              start={productSlice.start + 1}
              end={productSlice.end}
              total={allProducts.length}
            />
            <div className="w-full flex justify-center items-center !my-12">
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 px-3 md:px-16">
                {(filterData.length > 0 ? filterData : allProducts)
                  .slice(productSlice.start, productSlice.end)
                  .map((item) => {
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
