/* eslint-disable react-hooks/exhaustive-deps */
import { authStore } from "@/store/authStore";
import { useEffect, useState } from "react";
import SketetonWrapper from "./SkeletonWrapper";

const AuthLogo = ({ width, height }: { width: number; height: number }) => {
  const { getLogo, isLoading } = authStore();

  const [imageUrl, setImageUrl] = useState<string>("");

  useEffect(() => {
    const fetch = async () => {
      const data = await getLogo();
      setImageUrl(data.url);
    };
    fetch();
  }, []);

  return (
    <>
      <SketetonWrapper isLoading={isLoading}>
        {imageUrl ? (
          <img
            src={imageUrl}
            alt="Zoyee Lifestyle Main Logo"
            width={width}
            height={height}
          />
        ) : (
          <p className="">No Logo</p>
        )}
      </SketetonWrapper>
    </>
  );
};

export default AuthLogo;
