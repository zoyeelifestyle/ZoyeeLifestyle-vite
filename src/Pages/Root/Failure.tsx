import { Link } from "react-router-dom";
import RootLayout from "./RootLayout";
import { motion } from "framer-motion";

const Failure = () => {
  return (
    <RootLayout>
      <div className="flex justify-center items-center min-h-screen bg-gray-100 p-4">
        <motion.div
          className="bg-white p-8 rounded-lg shadow-lg text-center max-w-lg w-full"
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.8 }}
          transition={{ duration: 0.6 }}
        >
          {/* Error Icon (using an emoji for simplicity) */}
          <motion.div
            className="text-red-500 text-6xl mb-4"
            initial={{ rotate: -20 }}
            animate={{ rotate: 0 }}
            transition={{ duration: 0.5 }}
          >
            😞
          </motion.div>

          {/* Main failure message */}
          <motion.h1
            className="text-3xl font-semibold text-gray-800 mb-4"
            initial={{ y: -20 }}
            animate={{ y: 0 }}
            transition={{ duration: 0.4 }}
          >
            Oops! Something Went Wrong.
          </motion.h1>

          {/* Description */}
          <motion.p
            className="text-gray-600 text-lg mb-6"
            initial={{ x: -20 }}
            animate={{ x: 0 }}
            transition={{ duration: 0.4 }}
          >
            We're sorry, but we were unable to complete your request. Please try
            again later or contact support.
          </motion.p>

          {/* Button to try again */}
          <Link to="/shop">
            <motion.button
              className="bg-red-500 text-white py-2 px-6 rounded-lg hover:bg-red-600 transition duration-300"
              initial={{ scale: 0.9 }}
              animate={{ scale: 1 }}
              transition={{ duration: 0.3 }}
            >
              Back To Shop
            </motion.button>
          </Link>
        </motion.div>
      </div>
    </RootLayout>
  );
};

export default Failure;
