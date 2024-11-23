/* eslint-disable react-hooks/exhaustive-deps */
import { Dot, MoveLeftIcon, MoveRightIcon } from "lucide-react";
import { useState, useEffect } from "react";

const HomeCarousal = () => {
  const slides = [
    {
      url: "https://images.unsplash.com/photo-1731641904795-2873e1da5ac1?q=80&w=3275&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    },
    {
      url: "https://images.unsplash.com/photo-1731762512307-2271665eb149?q=80&w=3284&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    },
    {
      url: "https://images.unsplash.com/photo-1731848358192-e0c766b66031?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxmZWF0dXJlZC1waG90b3MtZmVlZHwxMnx8fGVufDB8fHx8fA%3D%3D",
    },
    {
      url: "https://images.unsplash.com/photo-1731946717704-5476dc2884b4?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxmZWF0dXJlZC1waG90b3MtZmVlZHw0MHx8fGVufDB8fHx8fA%3D%3D",
    },
  ];

  const [currentIndex, setCurrentIndex] = useState(0);

  const prevSlide = () => {
    const isFirstSlide = currentIndex === 0;
    const newIndex = isFirstSlide ? slides.length - 1 : currentIndex - 1;
    setCurrentIndex(newIndex);
  };

  const nextSlide = () => {
    const isLastSlide = currentIndex === slides.length - 1;
    const newIndex = isLastSlide ? 0 : currentIndex + 1;
    setCurrentIndex(newIndex);
  };

  // Automatically change slide every 5 seconds
  useEffect(() => {
    const interval = setInterval(nextSlide, 5000); // Change slide every 5 seconds
    return () => clearInterval(interval); // Cleanup interval on component unmount
  }, [currentIndex]);

  const goToSlide = (slideIndex: number) => {
    setCurrentIndex(slideIndex);
  };

  return (
    <div className="max-w-full p-4 md:p-0 h-[300px] md:h-[600px] lg:h-screen w-full mx-auto  relative group">
      {/* Slide Image */}
      <div
        style={{ backgroundImage: `url(${slides[currentIndex].url})` }}
        className="w-full h-full  bg-center bg-cover duration-500 rounded-2xl md:rounded-none"
      ></div>

      {/* Left Navigation */}
      <div
        onClick={prevSlide}
        className="hidden group-hover:block  absolute top-1/2 -translate-x-0 -translate-y-1/2 left-5 text-2xl rounded-full p-2 bg-black/20 text-white cursor-pointer hover:bg-pink-600 transition-all"
      >
        <MoveLeftIcon className="w-5 h-5" />
      </div>

      {/* Right Navigation */}
      <div
        onClick={nextSlide}
        className="hidden group-hover:block absolute top-1/2 -translate-x-0 -translate-y-1/2 right-5 text-2xl rounded-full p-2 bg-black/20 text-white cursor-pointer hover:bg-pink-600 transition-all"
      >
        <MoveRightIcon className="w-5 h-5" />
      </div>

      {/* Dots Navigation */}
      <div className="hidden group-hover:flex absolute bottom-5 left-1/2 -translate-x-1/2  gap-2">
        {slides.map((_, slideIndex) => (
          <div
            key={slideIndex}
            onClick={() => goToSlide(slideIndex)}
            className={`cursor-pointer  ${
              slideIndex === currentIndex ? "text-pink-600" : "text-gray-300"
            }`}
          >
            <Dot size={20} strokeWidth={7} />
          </div>
        ))}
      </div>
    </div>
  );
};

export default HomeCarousal;
