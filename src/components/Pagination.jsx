// components/Pagination.jsx
export default function Pagination({ currentPage, totalPages, onPageChange }) {
  const pages = [...Array(totalPages)].map((_, i) => i + 1);

  return (
    <div className="flex justify-center space-x-2 mt-6">
      {pages.map((num) => (
        <button
          key={num}
          onClick={() => onPageChange(num)}
          className={`px-3 py-1 rounded-full text-sm ${
            num === currentPage
              ? "bg-blue-500 text-white"
              : "bg-gray-200 text-gray-800"
          }`}
        >
          {num}
        </button>
      ))}
    </div>
  );
}
