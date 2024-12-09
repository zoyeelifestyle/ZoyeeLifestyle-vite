import { motion, useAnimation } from "framer-motion";
import { useInView } from "react-intersection-observer";
import { useEffect } from "react";
import { SPECIALBANNER } from "@/constants/index.constants";

const SpecialBanner = () => {
  const controls = useAnimation();
  const [ref, inView] = useInView({ threshold: 0.2 });

  useEffect(() => {
    if (inView) {
      controls.start("visible");
    }
  }, [controls, inView]);

  const containerVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.8, staggerChildren: 0.2 },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, scale: 0.8 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: { duration: 0.5 },
    },
  };

  return (
    <motion.section
      ref={ref}
      className="p-4 sm:p-6 lg:py-10 flex flex-col md:flex-row justify-evenly bg-pink-50"
      variants={containerVariants}
      initial="hidden"
      animate={controls}
    >
      {SPECIALBANNER.map((item, index) => (
        <motion.div
          key={index}
          className="flex flex-col sm:flex-row gap-4 sm:gap-6 items-center py-4"
          variants={itemVariants}
        >
          <item.Icon className="w-10 h-10 sm:w-20 sm:h-20 text-zinc-600" />
          <div className="text-center sm:text-left">
            <h3 className="font-semibold text-pink-600 sm:text-lg md:text-xl">
              {item.title}
            </h3>
            <p className="font-medium capitalize text-gray-500 text-sm tracking-wide mt-2 sm:mt-1">
              {item.subtitle}
            </p>
          </div>
        </motion.div>
      ))}
    </motion.section>
  );
};

export default SpecialBanner;
