/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable react-hooks/exhaustive-deps */
import { authStore } from "@/store/authStore";
import { Dot, MoveLeftIcon, MoveRightIcon } from "lucide-react";
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Skeleton } from "./ui/skeleton";

const HomeCarousal = () => {
  const { getBanners } = authStore();
  const [imageArray, setImageArray] = useState<any[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const fetchBanner = async () => {
      try {
        const images = await getBanners();
        const formattedImages = images?.map((item: any) => ({
          url: `${item.asset.url}`,
        }));
        setImageArray(formattedImages || []);
      } catch (error) {
        console.error("Error fetching banners:", error);
      }
    };
    fetchBanner();
  }, []);

  const prevSlide = () => {
    const isFirstSlide = currentIndex === 0;
    const newIndex = isFirstSlide ? imageArray.length - 1 : currentIndex - 1;
    setCurrentIndex(newIndex);
  };

  const nextSlide = () => {
    const isLastSlide = currentIndex === imageArray.length - 1;
    const newIndex = isLastSlide ? 0 : currentIndex + 1;
    setCurrentIndex(newIndex);
  };

  useEffect(() => {
    const interval = setInterval(nextSlide, 5000);
    return () => clearInterval(interval);
  }, [currentIndex, imageArray]);

  const goToSlide = (slideIndex: number) => {
    setCurrentIndex(slideIndex);
  };

  return (
    <div className="max-w-full px-2 py-4 md:p-4 h-[250px] sm:h-[300px] md:h-[600px] lg:h-[90vh] w-full mx-auto relative group">
      {imageArray.length > 0 ? (
        <>
          {/* Slide Animation */}
          <AnimatePresence initial={false} mode="wait">
            <motion.div
              key={currentIndex}
              initial={{ opacity: 0, x: 100 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -100 }}
              transition={{ duration: 0.5 }}
              style={{
                backgroundImage: `url(${imageArray[currentIndex].url})`,
              }}
              className="w-full h-full bg-center bg-cover duration-500 rounded-2xl shadow-2xl border-pink-600 border-[5px]"
            ></motion.div>
          </AnimatePresence>

          {/* Navigation Buttons */}
          <motion.div
            onClick={prevSlide}
            className="hidden group-hover:block absolute top-1/2 -translate-x-0 -translate-y-1/2 left-10 text-2xl rounded-full p-2 bg-black/20 text-white cursor-pointer hover:bg-pink-600 transition-all"
            whileHover={{ scale: 1.2 }}
            whileTap={{ scale: 0.9 }}
          >
            <MoveLeftIcon className="w-5 h-5" />
          </motion.div>

          <motion.div
            onClick={nextSlide}
            className="hidden group-hover:block absolute top-1/2 -translate-x-0 -translate-y-1/2 right-10 text-2xl rounded-full p-2 bg-black/20 text-white cursor-pointer hover:bg-pink-600 transition-all"
            whileHover={{ scale: 1.2 }}
            whileTap={{ scale: 0.9 }}
          >
            <MoveRightIcon className="w-5 h-5" />
          </motion.div>

          {/* Dots */}
          <div className="hidden group-hover:flex absolute bottom-10 left-1/2 -translate-x-1/2 gap-2">
            {imageArray.map((_, slideIndex) => (
              <motion.div
                key={slideIndex}
                onClick={() => goToSlide(slideIndex)}
                className={`cursor-pointer ${
                  slideIndex === currentIndex
                    ? "text-pink-600"
                    : "text-gray-300"
                }`}
                whileHover={{ scale: 1.5 }}
              >
                <Dot size={20} strokeWidth={7} />
              </motion.div>
            ))}
          </div>
        </>
      ) : (
        <div className="w-full h-full flex items-center justify-center">
          <Skeleton className="w-full h-full bg-gray-200" />
        </div>
      )}
    </div>
  );
};

export default HomeCarousal;
