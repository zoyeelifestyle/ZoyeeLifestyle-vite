import { Menu, ShoppingBagIcon, UserCircle } from "lucide-react";
import AuthLogo from "./AuthLogo";
import { Link, useLocation } from "react-router-dom";
import { motion } from "framer-motion";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "./ui/sheet";
import { NAVLINKS } from "@/constants/index.constants";
import { Button } from "./ui/button";
import { authStore } from "@/store/authStore";

const SidebarSheet = ({ cartLength }: { cartLength: number }) => {
  const { pathname } = useLocation();

  const { user } = authStore();

  return (
    <Sheet>
      <SheetTrigger>
        <Menu className="w-6 h-6" />
      </SheetTrigger>
      <SheetContent>
        <SheetHeader>
          <SheetTitle>
            <AuthLogo width={150} height={20} />
          </SheetTitle>
          <div className="text-left ml-4 pt-4">
            {/* Links Animation */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              {NAVLINKS.map((item, index) => {
                return (
                  <Link
                    key={index}
                    to={item.link}
                    className={`${
                      pathname === item.link
                        ? "font-semibold text-pink-600"
                        : "text-gray-600"
                    } font-medium hover:text-pink-600 transition-all`}
                  >
                    <p className="tracking-wide text-lg mb-2 lg:text-lg">
                      {item.label}
                    </p>
                  </Link>
                );
              })}
            </motion.div>
          </div>

          {/* Action Icons */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="flex items-center gap-5 lg:gap-7 ml-4 sm:hidden"
          >
            {/* Profile Icon */}
            {user ? (
              <Link to={"/profile"}>
                <UserCircle
                  className={`w-7 h-7 cursor-pointer ${
                    location.pathname === "/profile" && "text-primary"
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

            {/* Search Icon */}
            {/* <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.4 }}
            >
              <Search className="w-7 h-7 cursor-pointer text-gray-600 hover:text-primary transition-all" />
            </motion.div> */}

            {/* Wishlist Icon */}
            {/* <Link href={"/wishlist"}>
              <motion.div
                initial={{ scale: 0.8 }}
                animate={{ scale: 1 }}
                transition={{ duration: 0.3 }}
              >
                <Heart
                  className={`w-7 h-7 cursor-pointer ${
                    params === "/wishlist" ? "text-primary" : "text-gray-600"
                  }`}
                />
              </motion.div>
            </Link> */}

            {/* Cart Icon */}
            <Link to={"/cart"}>
              <motion.div
                initial={{ scale: 0.8 }}
                animate={{ scale: 1 }}
                transition={{ duration: 0.3 }}
                className="relative"
              >
                <ShoppingBagIcon
                  className={`w-7 h-7 cursor-pointer ${
                    pathname === "/cart" && "text-pink-600"
                  }`}
                />
                {cartLength > 0 && (
                  <div className="absolute -top-2 -right-3 bg-pink-600 px-2 rounded-full text-xs py-1 text-white font-bold">
                    {cartLength}
                  </div>
                )}
              </motion.div>
            </Link>
          </motion.div>
        </SheetHeader>
      </SheetContent>
    </Sheet>
  );
};

export default SidebarSheet;
