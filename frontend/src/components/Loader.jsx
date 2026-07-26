const Loader = ({ text = "Loading..." }) => {
  return (
    <div className="flex flex-col justify-center items-center min-h-[300px] gap-4">
      {/* Spinner */}
      <div className="w-16 h-16 border-4 border-blue-500 border-t-transparent rounded-full animate-spin"></div>

      {/* Loading Text */}
      <h2 className="text-lg font-semibold text-gray-700">
        {text}
      </h2>
    </div>
  );
};

export default Loader;