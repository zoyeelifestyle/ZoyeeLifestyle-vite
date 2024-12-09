import { motion } from "framer-motion";
import CategoryCarousel from "./CategoryCarousel";

const Category = () => {
  return (
    <section className="w-full text-justify md:text-center space-y-3 my-10 md:mt-20">
      <motion.h2
        className="text-lg md:text-3xl font-semibold capitalize pl-5 text-pink-600"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        Category
      </motion.h2>

      <motion.p
        className="text-base hidden md:block  capitalize font-medium tracking-wide px-5 py-5"
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.5, delay: 0.2 }}
      >
        Lorem ipsum dolor sit, amet consectetur adipisicing elit. Ad aliquam
        laudantium, odio laboriosam pariatur temporibus similique alias maxime
        praesentium ullam natus ex fugiat, debitis qui dolores nesciunt aperiam
        exercitationem porro.
      </motion.p>

      <div className=" md:px-28 ">
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5, delay: 0.4 }}
        >
          <CategoryCarousel />
        </motion.div>
      </div>
    </section>
  );
};

export default Category;
