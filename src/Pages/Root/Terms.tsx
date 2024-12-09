import { useEffect } from "react";
import RootLayout from "./RootLayout";
import { authStore } from "@/store/authStore";
import "../../App.css";

const Terms = () => {
  const { getOtherData, otherData } = authStore();

  useEffect(() => {
    const fetch = async () => {
      await getOtherData();
    };
    fetch();
  }, [getOtherData]);

  return (
    <RootLayout>
      {otherData ? (
        <div className="px-5">
          <div
            className="shadow-2xl rounded-full"
            dangerouslySetInnerHTML={{ __html: otherData }}
          />
        </div>
      ) : (
        <p>Loading terms...</p>
      )}
    </RootLayout>
  );
};

export default Terms;
