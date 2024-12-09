// import FloatingShape from "@/components/FloatingShape";
import Copyright from "@/components/Copyright";
import Footer from "@/components/Footer";
import Navbar from "@/components/Navbar";
import React from "react";

const RootLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="">
      <Navbar />
      {children}
      <Footer />
      <Copyright />
    </div>
  );
};

export default RootLayout;
