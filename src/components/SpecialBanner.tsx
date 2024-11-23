import { SPECIALBANNER } from "@/constants/index.constants";

const SpecialBanner = () => {
  return (
    <section className="p-4  sm:p-6 lg:py-10 flex flex-col md:flex-row justify-evenly bg-pink-50 ">
      {SPECIALBANNER.map((item, index) => (
        <div
          key={index}
          className="flex flex-col sm:flex-row gap-4 sm:gap-6 items-center py-4"
        >
          <item.Icon className="w-16 h-16 sm:w-20 sm:h-20 text-slate-600" />
          <div className="text-center sm:text-left">
            <h3 className="font-semibold text-2xl text-pink-600 sm:text-2xl md:text-3xl">
              {item.title}
            </h3>
            <p className="font-medium capitalize text-gray-500 text-sm sm:text-base md:text-lg tracking-wide mt-2 sm:mt-1">
              {item.subtitle}
            </p>
          </div>
        </div>
      ))}
    </section>
  );
};

export default SpecialBanner;
