/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { authStore } from "@/store/authStore";
import RootLayout from "./RootLayout";
import { useEffect, useState } from "react";
import { blockToHtml } from "@/utils/helper";

const ShippingPolicy = () => {
  const { getPolicies } = authStore();

  const [data, setData] = useState<any>([]);

  useEffect(() => {
    const fetch = async () => {
      const res = await getPolicies();
      const filterReturnPolicy = res.filter(
        (item: any) => item?.title === "Shipping Policy"
      );
      const finalData = await blockToHtml(filterReturnPolicy);
      setData(finalData);
    };
    fetch();
  }, []);

  return (
    <RootLayout>
      {data ? (
        <div className="px-5 my-5">
          <div
            className="shadow-2xl rounded-full"
            dangerouslySetInnerHTML={{ __html: data }}
          />
        </div>
      ) : (
        <p>Loading terms...</p>
      )}
    </RootLayout>
  );
};

export default ShippingPolicy;
