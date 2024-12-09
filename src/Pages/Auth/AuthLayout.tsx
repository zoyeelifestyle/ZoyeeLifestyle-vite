import { ReactNode } from "react";

import AuthBanner from "../../assets/clothes.png";
import AuthLogo from "@/components/AuthLogo";

const AuthLayout = ({ children }: { children: ReactNode }) => {
  return (
    <div className="w-full h-screen relative bg-gray-100">
      <div className="w-full h-full relative">
        <img
          src={AuthBanner}
          alt="Auth Image"
          className="w-full h-full object-cover absolute top-0 left-0"
        />
        <div className="absolute inset-0 bg-black opacity-30"></div>
        <div className="absolute cursor-pointer top-5 left-5 bg-white px-4 py-2 rounded-full shadow-md">
          <AuthLogo width={100} height={20} />
        </div>
      </div>

      <div className="absolute inset-0 flex justify-center items-center px-4">
        <div className="bg-white shadow-lg rounded-lg p-6 sm:p-8 w-full max-w-md">
          {children}
        </div>
      </div>
    </div>
  );
};

export default AuthLayout;
