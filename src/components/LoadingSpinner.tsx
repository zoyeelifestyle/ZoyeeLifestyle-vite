import { CirclesWithBar } from "react-loader-spinner";

const LoadingSpinner = () => {
  return (
    <div className="w-full h-[90vh] gap-3 flex-col flex items-center justify-center">
      <CirclesWithBar
        height="100"
        width="100"
        color="#db2777"
        outerCircleColor="#db2777"
        innerCircleColor="#db2777"
        barColor="#db2777"
        ariaLabel="circles-with-bar-loading"
        wrapperStyle={{}}
        wrapperClass=""
        visible={true}
      />
      <h3 className="text-3xl font-semibold">Loading.....</h3>
    </div>
  );
};

export default LoadingSpinner;
