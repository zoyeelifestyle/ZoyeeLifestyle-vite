import { motion } from "framer-motion";
import { Link, useLocation } from "react-router-dom";
import AuthLogo from "./AuthLogo";
import { NAVLINKS } from "@/constants/index.constants";
import { ShoppingBagIcon, UserCircle } from "lucide-react";
import { useEffect, useState } from "react";
import SidebarSheet from "./SidebarSheet";
import { Button } from "./ui/button";
import { authStore } from "@/store/authStore";

const Navbar = () => {
  const location = useLocation();

  const [cartLength, setCartLength] = useState(0);

  const { user } = authStore();

  const updateCartLength = () => {
    const cartData = JSON.parse(localStorage.getItem("cart") || "[]");
    setCartLength(cartData.length);
  };

  useEffect(() => {
    updateCartLength();

    const handleStorageChange = (e: StorageEvent) => {
      if (e.key === "cart") {
        updateCartLength();
      }
    };

    window.addEventListener("storage", handleStorageChange);

    return () => {
      window.removeEventListener("storage", handleStorageChange);
    };
  }, []);

  useEffect(() => {
    const interval = setInterval(updateCartLength, 1000);

    // Cleanup the interval on unmount
    return () => {
      clearInterval(interval);
    };
  }, []);

  return (
    <motion.nav
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="w-full sticky z-[9999] top-0 left-0   flex justify-between items-center px-6 py-4 lg:px-12 lg:py-4 bg-white shadow-md"
    >
      {/* Logo Section */}
      <Link to="/">
        <AuthLogo width={100} height={30} />
      </Link>

      {/* Navigation Links */}
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5, delay: 0.2 }}
        className="hidden lg:flex gap-6 items-center"
      >
        {NAVLINKS.map((item, index) => (
          <Link
            key={index}
            to={item.link}
            className={`${
              location.pathname === item.link
                ? "font-semibold text-pink-600"
                : "text-gray-600"
            } font-medium hover:text-pink-600 transition-all`}
          >
            <p className="tracking-wide text-base lg:text-lg">{item.label}</p>
          </Link>
        ))}
      </motion.div>

      {/* Action Icons */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.3 }}
        className="flex items-center gap-5 lg:gap-7"
      >
        <div className="items-center gap-5 lg:gap-7 hidden sm:flex">
          {user ? (
            <Link to={"/profile"}>
              <UserCircle
                className={`w-6 h-6 lg:w-7 lg:h-7 cursor-pointer ${
                  location.pathname === "/profile" && "text-pink-600"
                }`}
              />
            </Link>
          ) : (
            <Link to={"/sign-in"}>
              <Button className="bg-pink-600 hover:bg-pink-700 tracking-wider">
                Sign In
              </Button>
            </Link>
          )}

          <Link to={"/cart"}>
            <div className="relative">
              <ShoppingBagIcon
                className={`w-6 h-6 lg:w-7 lg:h-7 cursor-pointer ${
                  location.pathname === "/cart" && "text-pink-600"
                }`}
              />
              {cartLength > 0 && (
                <div className="absolute -top-2 -right-3 bg-pink-600 px-2 rounded-full text-xs py-1 text-white font-bold">
                  {cartLength}
                </div>
              )}
            </div>
          </Link>
        </div>

        {/* Mobile Menu Icon (Optional) */}
        <div className="lg:hidden cursor-pointer  flex items-center">
          <SidebarSheet cartLength={cartLength} />
        </div>
      </motion.div>
    </motion.nav>
  );
};

export default Navbar;
