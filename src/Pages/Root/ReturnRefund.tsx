/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { useEffect, useState } from "react";
import RootLayout from "./RootLayout";
import { authStore } from "@/store/authStore";
import { blockToHtml } from "@/utils/helper";

const ReturnRefund = () => {
  const { getPolicies } = authStore();

  const [data, setData] = useState<any>([]);

  useEffect(() => {
    const fetch = async () => {
      const res = await getPolicies();
      const filterReturnPolicy = res.filter(
        (item: any) => item?.title === "Refund Policy"
      );
      const finalData = await blockToHtml(filterReturnPolicy);
      setData(finalData);
    };
    fetch();
  }, []);

  useEffect(() => {
    console.log("Refund Policy", data);
  }, [data]);

  return (
    <RootLayout>
      {data ? (
        <div className="px-5 my-5">
          <div className="" dangerouslySetInnerHTML={{ __html: data }} />
        </div>
      ) : (
        <p>Loading terms...</p>
      )}
    </RootLayout>
  );
};

export default ReturnRefund;
