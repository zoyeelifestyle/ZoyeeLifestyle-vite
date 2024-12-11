/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { authStore } from "@/store/authStore";
import RootLayout from "./RootLayout";
import { useEffect, useState } from "react";

const ShippingPolicy = () => {
  const { getShippingPolicy } = authStore();

  const [data, setData] = useState<any>([]);

  useEffect(() => {
    const fetch = async () => {
      const res = await getShippingPolicy();
      setData(res);
    };
    fetch();
  }, []);

  return (
    <RootLayout>
      {data ? (
        <div className="px-5">
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
