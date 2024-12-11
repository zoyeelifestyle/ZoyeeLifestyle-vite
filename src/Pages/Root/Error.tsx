import { motion } from "framer-motion";
import RootLayout from "./RootLayout";

const Error = () => {
  return (
    <RootLayout>
      <div className="flex justify-center items-center min-h-screen bg-white text-gray-900">
        <motion.div
          className="text-center p-10 max-w-lg"
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
        >
          <motion.h1
            className="text-6xl font-bold mb-4"
            initial={{ opacity: 0, rotate: -45 }}
            animate={{ opacity: 1, rotate: 0 }}
            transition={{ duration: 0.6, ease: "easeOut" }}
          >
            404
          </motion.h1>
          <motion.p
            className="text-xl mb-8"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.6 }}
          >
            Oops! The page you're looking for doesn't exist.
          </motion.p>
          <motion.a
            href="/"
            className="bg-pink-600 text-white py-2 px-4 rounded-md text-lg hover:bg-pink-700 transition duration-300"
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.6, duration: 0.5 }}
          >
            Go Back Home
          </motion.a>
        </motion.div>
      </div>
    </RootLayout>
  );
};

export default Error;
