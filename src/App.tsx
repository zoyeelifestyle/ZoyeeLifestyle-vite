import { Navigate, Route, Routes } from "react-router-dom";
import Home from "./Pages/Root/Home";
// import SignIn from "./Pages/Auth/SignIn";
// import SignUp from "./Pages/Auth/SignUp";
// import Profile from "./Pages/Root/Profile";
import Cart from "./Pages/Root/Cart";
import Shop from "./Pages/Root/Shop";
import { authStore } from "./store/authStore";
import { ReactNode, useEffect } from "react";
import LoadingSpinner from "./components/LoadingSpinner";
import SingleProduct from "./Pages/Root/SingleProduct";
import PrivacyPolicy from "./Pages/Root/PrivacyPolicy";
import Terms from "./Pages/Root/Terms";
import ReturnRefund from "./Pages/Root/ReturnRefund";
import CategoryProducts from "./Pages/Root/CategoryProducts";
import Success from "./Pages/Root/Success";
import Failure from "./Pages/Root/Failure";
// import OrderDetails from "./Pages/Root/OrderDetails";
import ShippingDetails from "./Pages/Root/ShippingDetails";
import SignIn from "./Pages/Auth/SignIn";
import SignUp from "./Pages/Auth/SignUp";
// import Profile from "./Pages/Root/Profile";
import UserProfile from "./Pages/Root/UserProfile";

// Protected Route
const ProtectedRoute = ({ children }: { children: ReactNode }) => {
  const { isAuthenticated } = authStore();

  if (!isAuthenticated) {
    return <Navigate to="/sign-in" replace />;
  }
  return children;
};

const OnlyForProfilePage = ({ children }: { children: ReactNode }) => {
  const { isAuthenticated } = authStore();
  if (!isAuthenticated) {
    return <Navigate to="/" replace />;
  }
  return children;
};

//redirect authenticated user to homepage
const RedirectAuthenticatedUser = ({ children }: { children: ReactNode }) => {
  const { isAuthenticated, user } = authStore();

  if (isAuthenticated && user) {
    return <Navigate to="/" replace />;
  }

  return children;
};

const App = () => {
  const { isCheckingAuth, checkAuth } = authStore();

  useEffect(() => {
    checkAuth();
  }, [checkAuth]);

  if (isCheckingAuth) {
    return <LoadingSpinner />;
  }

  return (
    <div className="w-full">
      <Routes>
        <Route path="/" element={<Home />} />
        <Route
          path="/sign-in"
          element={
            <RedirectAuthenticatedUser>
              <SignIn />
            </RedirectAuthenticatedUser>
          }
        />
        <Route
          path="/sign-up"
          element={
            <RedirectAuthenticatedUser>
              <SignUp />
            </RedirectAuthenticatedUser>
          }
        />

        <Route
          path="/profile"
          element={
            <OnlyForProfilePage>
              {/* <Profile /> */}
              <UserProfile />
            </OnlyForProfilePage>
          }
        />

        <Route path="/success" element={<Success />} />
        <Route path="/failure" element={<Failure />} />

        <Route path="/cart" element={<Cart />} />
        {/* <Route path="/getOrderDetail" element={<OrderDetails />} /> */}

        <Route path="/shop" element={<Shop />} />
        <Route path="/shop/:productId" element={<SingleProduct />} />
        <Route path="/category/:categoryId" element={<CategoryProducts />} />
        <Route path="/privacy-policy" element={<PrivacyPolicy />} />
        <Route path="/terms" element={<Terms />} />
        <Route path="/return-&-refund" element={<ReturnRefund />} />

        <Route
          path="/shipping-details/:param"
          element={
            <ProtectedRoute>
              <ShippingDetails />
            </ProtectedRoute>
          }
        />
      </Routes>
    </div>
  );
};

export default App;
