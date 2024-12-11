import { motion } from "framer-motion";
import RootLayout from "./RootLayout";

const Success = () => {
  return (
    <RootLayout>
      <div className="flex items-center justify-center min-h-screen bg-white">
        <motion.div
          className="max-w-lg w-full bg-white shadow-lg rounded-lg p-8"
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          {/* Success Icon */}
          <motion.div
            className="flex justify-center mb-6"
            initial={{ opacity: 0, scale: 0.5 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5 }}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-16 w-16 text-green-500"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M5 13l4 4L19 7"
              />
            </svg>
          </motion.div>

          {/* Success Message */}
          <motion.h1
            className="text-3xl font-semibold text-center text-gray-900 mb-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.3 }}
          >
            Order Successful!
          </motion.h1>
          <motion.p
            className="text-center text-gray-600 mb-6"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.4 }}
          >
            Your order has been successfully placed. We are processing it and
            will notify you once it's on its way.
          </motion.p>

          {/* Action Button */}
          <motion.div
            className="flex justify-center"
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.5 }}
          >
            <a
              href="/"
              className="bg-pink-600 text-white py-2 px-6 rounded-lg text-lg font-semibold hover:bg-pink-800 transition duration-300"
            >
              Go to Homepage
            </a>
          </motion.div>
        </motion.div>
      </div>
    </RootLayout>
  );
};

export default Success;
