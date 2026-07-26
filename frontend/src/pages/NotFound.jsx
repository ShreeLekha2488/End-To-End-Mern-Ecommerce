import { Link } from "react-router-dom";
import { FaHome, FaExclamationTriangle } from "react-icons/fa";

const NotFound = () => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-blue-50 to-indigo-100 px-6">
      <div className="bg-white shadow-2xl rounded-2xl p-10 text-center max-w-lg w-full">

        <FaExclamationTriangle
          className="mx-auto text-red-500 mb-6"
          size={80}
        />

        <h1 className="text-7xl font-bold text-blue-600 mb-4">
          404
        </h1>

        <h2 className="text-3xl font-bold text-gray-800 mb-4">
          Page Not Found
        </h2>

        <p className="text-gray-600 mb-8">
          Sorry, the page you are looking for doesn't exist or has been moved.
        </p>

        <Link
          to="/"
          className="inline-flex items-center gap-3 bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg font-semibold transition duration-300"
        >
          <FaHome />
          Back to Home
        </Link>

      </div>
    </div>
  );
};

export default NotFound;