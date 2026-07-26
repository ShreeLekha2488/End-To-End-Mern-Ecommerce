import { FaSearch, FaTimes } from "react-icons/fa";

const SearchBar = ({
  searchTerm,
  setSearchTerm,
  onSearch,
  onClear,
}) => {
  const handleSubmit = (e) => {
    e.preventDefault();
    onSearch();
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="w-full max-w-2xl mx-auto flex items-center bg-white rounded-lg shadow-md overflow-hidden"
    >
      {/* Search Input */}
      <input
        type="text"
        placeholder="Search products, brands, categories..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        className="flex-1 px-5 py-3 outline-none text-gray-700"
      />

      {/* Clear Button */}
      {searchTerm && (
        <button
          type="button"
          onClick={onClear}
          className="px-4 text-gray-500 hover:text-red-500"
        >
          <FaTimes />
        </button>
      )}

      {/* Search Button */}
      <button
        type="submit"
        className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 flex items-center gap-2 transition"
      >
        <FaSearch />
        Search
      </button>
    </form>
  );
};

export default SearchBar;