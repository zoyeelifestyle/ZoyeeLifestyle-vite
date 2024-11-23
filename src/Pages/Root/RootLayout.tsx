// import FloatingShape from "@/components/FloatingShape";
import Footer from "@/components/Footer";
import Navbar from "@/components/Navbar";
import React from "react";

const RootLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="min-h-screen   relative overflow-hidden">
      {/* <FloatingShape
        color="bg-pink-600"
        size="w-64 h-64"
        top="-5%"
        left="10%"
        delay={0}
      />
      <FloatingShape
        color="bg-rose-600"
        size="w-48 h-48"
        top="70%"
        left="80%"
        delay={5}
      />
      <FloatingShape
        color="bg-red-600"
        size="w-32 h-32"
        top="40%"
        left="-10%"
        delay={2}
      /> */}
      <Navbar />
      {children}
      <Footer />
    </div>
  );
};

export default RootLayout;
