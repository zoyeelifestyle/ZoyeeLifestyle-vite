/* eslint-disable react-hooks/exhaustive-deps */
import AuthLayout from "./AuthLayout";

import { useFormik } from "formik";
import { loginFormSchema } from "../../schemas/schema";

import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { authStore } from "@/store/authStore";
import { Loader2 } from "lucide-react";
import { useEffect } from "react";

const SignIn = () => {
  const { isLoading, signin, error, checkAuth } = authStore();

  useEffect(() => {
    const fetch = async () => {
      await checkAuth();
    };
    fetch();
    // console.log(data);
  }, []);

  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    validationSchema: loginFormSchema,
    onSubmit: async (values) => {
      await signin(values.email, values.password);
    },
  });

  const { errors, touched, values, handleChange, handleSubmit } = formik;
  return (
    <AuthLayout>
      <motion.div
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="flex justify-center items-center bg-gray-100 rounded-lg shadow-xl"
      >
        <div className="w-full max-w-md bg-white shadow-lg rounded-lg p-8">
          <h1 className="text-3xl font-bold text-center mb-4">Welcome Back!</h1>
          <p className="text-gray-500 text-center mb-6 capitalize font-medium">
            Sign in to <span className="text-pink-600">Zoyee LifeStyle</span>
          </p>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label
                htmlFor="email"
                className="block text-sm font-medium text-gray-700"
              >
                Email Address<span className="text-red-500">*</span>
              </label>
              <input
                name="email"
                type="email"
                placeholder="Enter your email"
                value={values.email}
                onChange={handleChange}
                className="w-full mt-1 px-4 py-2 border rounded-md shadow-sm focus:ring-primary focus:border-primary sm:text-sm"
              />
              {touched.email && errors.email && (
                <p className="mt-1 text-red-500 text-sm">{errors.email}</p>
              )}
            </div>
            <div>
              <label
                htmlFor="password"
                className="block text-sm font-medium text-gray-700"
              >
                Password<span className="text-red-500">*</span>
              </label>
              <input
                name="password"
                type="password"
                placeholder="Enter your password"
                value={values.password}
                onChange={handleChange}
                className="w-full mt-1 px-4 py-2 border rounded-md shadow-sm focus:ring-primary focus:border-primary sm:text-sm"
              />
              {touched.password && errors.password && (
                <p className="mt-1 text-red-500 text-sm">{errors.password}</p>
              )}
            </div>
            {error && (
              <p className="text-red-500 font-semibold mb-2">{error}</p>
            )}

            <Button
              type="submit"
              className="w-full bg-pink-600 tracking-wider text-white py-3 rounded-md text-sm font-medium hover:bg-primary-dark transition"
            >
              {isLoading ? (
                <Loader2 className="w-6 h-6 animate-spin mx-auto" />
              ) : (
                "Sign In"
              )}
            </Button>
          </form>
          <div className="text-center mt-4">
            <p className="text-sm text-gray-500">
              Don&apos;t have an account?{" "}
              <Link to="/sign-up" className="text-pink-600 hover:underline">
                Sign Up
              </Link>
            </p>
          </div>
        </div>
      </motion.div>
    </AuthLayout>
  );
};

export default SignIn;
