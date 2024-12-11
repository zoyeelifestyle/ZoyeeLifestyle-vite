import { useEffect } from "react";
import RootLayout from "./RootLayout";
import { authStore } from "@/store/authStore";
import "../../App.css";

const PrivacyPolicy = () => {
  const { getPrivacyData, privacyData } = authStore();

  useEffect(() => {
    getPrivacyData();
  }, []);

  return (
    <RootLayout>
      {privacyData ? (
        <div className="px-5">
          <div
            className="shadow-2xl rounded-full"
            dangerouslySetInnerHTML={{ __html: privacyData }}
          />
        </div>
      ) : (
        <p>Loading terms...</p>
      )}
    </RootLayout>
  );
};

export default PrivacyPolicy;
