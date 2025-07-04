import { ChevronLeft, ChevronRight } from "lucide-react";
import React, { useEffect, useState } from "react";

const LocalWordPressMedia = () => {
  const [mediaItems, setMediaItems] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [loading, setLoading] = useState(true);
  const [selectedMedia, setSelectedMedia] = useState(null);
  const [showModal, setShowModal] = useState(false);

  const perPage = 8;

  useEffect(() => {
    const fetchMedia = async () => {
      setLoading(true);
      try {
        const response = await fetch(
          `http://localhost/wordpress/wp-json/wp/v2/media?per_page=${perPage}&page=${currentPage}`
        );

        const totalPagesHeader = response.headers.get("X-WP-TotalPages");
        if (totalPagesHeader) {
          setTotalPages(parseInt(totalPagesHeader));
        }

        const data = await response.json();
        setMediaItems(data);
      } catch (error) {
        console.error("Error fetching media:", error);
        setMediaItems([]);
      } finally {
        setLoading(false);
      }
    };

    fetchMedia();
  }, [currentPage]);

  const handlePrev = () => {
    setCurrentPage((prev) => Math.max(prev - 1, 1));
  };

  const handleNext = () => {
    setCurrentPage((prev) => Math.min(prev + 1, totalPages));
  };

  const handleViewOriginal = async (id) => {
    try {
      const response = await fetch(
        `http://localhost/wordpress/wp-json/wp/v2/media/${id}`
      );
      const data = await response.json();
      setSelectedMedia(data);
      setShowModal(true);
    } catch (error) {
      console.error("Error fetching media by ID:", error);
    }
  };

  return (
    <div className="p-6 max-w-6xl mx-auto">
      <h1 className="text-2xl font-semibold mb-6 text-center">Media Library</h1>

      {loading ? (
        <div className="flex justify-center items-center h-40">
          <p className="text-gray-500 text-lg">Loading...</p>
        </div>
      ) : (
        <>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 mb-6">
            {mediaItems.map((item) => (
              <div
                key={item.id}
                className="bg-white rounded-2xl shadow-md hover:shadow-lg transition duration-300 overflow-hidden"
              >
                <img
                  src={item.source_url}
                  alt={item.title.rendered}
                  className="w-full h-48 object-cover"
                />
                <div className="p-4">
                  <h2 className="text-sm font-medium text-gray-700">
                    {item.title.rendered || "Untitled"}
                  </h2>
                  <button
                    onClick={() => handleViewOriginal(item.id)}
                    className="text-blue-500 text-xs mt-2 inline-block hover:underline"
                  >
                    View Original
                  </button>
                </div>
              </div>
            ))}
          </div>

          <div className="flex justify-center gap-2">
            <button
              onClick={handlePrev}
              disabled={currentPage === 1}
              className={`rounded bg-gray-200 hover:bg-gray-300 transition ${
                currentPage === 1 ? "opacity-50 cursor-not-allowed" : ""
              }`}
            >
              <ChevronLeft />
            </button>
            <span className="text-white font-medium">
              Page {currentPage} of {totalPages}
            </span>
            <button
              onClick={handleNext}
              disabled={currentPage === totalPages}
              className={`rounded bg-gray-200 hover:bg-gray-300 transition ${
                currentPage === totalPages
                  ? "opacity-50 cursor-not-allowed"
                  : ""
              }`}
            >
              <ChevronRight />
            </button>
          </div>
        </>
      )}

      {/* Modal for Viewing Original Image */}
      {showModal && selectedMedia && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 max-w-lg w-full relative">
            <button
              onClick={() => setShowModal(false)}
              className="absolute top-2 right-2 text-gray-500 hover:text-gray-700 text-2xl"
            >
              &times;
            </button>
            <img
              src={selectedMedia.source_url}
              alt={selectedMedia.title?.rendered}
              className="w-full object-contain rounded bg-black"
            />
          </div>
        </div>
      )}
    </div>
  );
};

export default LocalWordPressMedia;
