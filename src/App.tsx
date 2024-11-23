import { Navigate, Route, Routes } from "react-router-dom";
import Home from "./Pages/Root/Home";
import SignIn from "./Pages/Auth/SignIn";
import SignUp from "./Pages/Auth/SignUp";
import Profile from "./Pages/Root/Profile";
import Cart from "./Pages/Root/Cart";
import Shop from "./Pages/Root/Shop";
import { authStore } from "./store/authStore";
import { ReactNode, useEffect } from "react";
import LoadingSpinner from "./components/LoadingSpinner";
import SingleProduct from "./Pages/Root/SingleProduct";

// Protected Route
const ProtectedRoute = ({ children }: { children: ReactNode }) => {
  const { isAuthenticated } = authStore();

  if (!isAuthenticated) {
    return <Navigate to="/sign-in" replace />;
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
            <ProtectedRoute>
              <Profile />
            </ProtectedRoute>
          }
        />

        <Route path="/cart" element={<Cart />} />

        <Route path="/shop" element={<Shop />} />
        <Route path="/shop/:productId" element={<SingleProduct />} />
      </Routes>
    </div>
  );
};

export default App;
