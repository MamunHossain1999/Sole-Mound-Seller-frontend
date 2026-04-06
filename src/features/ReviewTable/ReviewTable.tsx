/* eslint-disable @typescript-eslint/no-explicit-any */
import { useDeleteReviewMutation, useGetAllReviewsQuery } from "@/redux/api/reviewApi";
import { useEffect, useState } from "react";
import { AiFillStar } from "react-icons/ai";
import { Trash2, Edit } from "lucide-react";
import { useNavigate } from "react-router-dom";   // 👈 Added for navigation

interface Review {
  id: string;
  product: string;
  name: string;
  rating: number;
  date: string;
}

const ReviewTable: React.FC = () => {
  const navigate = useNavigate();   // 👈 Added

  const [currentPage, setCurrentPage] = useState(1);
  const [searchTerm, setSearchTerm] = useState("");
  const reviewsPerPage = 8;   // একটু বাড়ানো হয়েছে

  const { data, isLoading } = useGetAllReviewsQuery();
  const [deleteReview] = useDeleteReviewMutation();

  // Transform API data
  const reviews: Review[] = data?.data?.map((item: any) => ({
    id: item._id,
    product: item.product?.name || "No Product",
    name: item.user?.name || "Anonymous",
    rating: item.rating,
    date: new Date(item.createdAt).toLocaleDateString("en-GB"),
  })) || [];

  const handleDelete = async (id: string) => {
    const confirmDelete = window.confirm("Are you sure you want to delete this review?");
    if (!confirmDelete) return;

    try {
      await deleteReview(id).unwrap();
      alert("Review deleted successfully");
    } catch (error) {
      console.error(error);
      alert("Failed to delete review");
    }
  };

  // Filter
  const filteredReviews = reviews.filter(
    (review) =>
      review.product.toLowerCase().includes(searchTerm.toLowerCase()) ||
      review.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Pagination
  const totalPages = Math.ceil(filteredReviews.length / reviewsPerPage);
  const startIndex = (currentPage - 1) * reviewsPerPage;
  const endIndex = startIndex + reviewsPerPage;
  const currentReviews = filteredReviews.slice(startIndex, endIndex);

  useEffect(() => {
    setCurrentPage(1);
  }, [searchTerm]);

  if (isLoading) {
    return <div className="p-8 text-center">Loading reviews...</div>;
  }

  return (
    <div className="bg-[#FDF1F7] min-h-screen p-6">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-2xl font-bold mb-6 text-gray-800">All Reviews</h1>

        <div className="bg-white rounded-lg shadow-md overflow-hidden">
          {/* Search Bar */}
          <div className="p-4 border-b">
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Search by product or user name..."
              className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-pink-500"
            />
          </div>

          {/* Table */}
          <div className="overflow-x-auto">
            <table className="w-full table-auto">
              <thead className="bg-[#FDF1F7]">
                <tr className="border-b">
                  <th className="p-4 text-left font-semibold text-gray-700">Product</th>
                  <th className="p-4 text-left font-semibold text-gray-700">User Name</th>
                  <th className="p-4 text-center font-semibold text-gray-700">Rating</th>
                  <th className="p-4 text-left font-semibold text-gray-700">Date</th>
                  <th className="p-4 text-center font-semibold text-gray-700">Action</th>
                </tr>
              </thead>

              <tbody className="divide-y divide-gray-200">
                {currentReviews.length > 0 ? (
                  currentReviews.map((review) => (
                    <tr key={review.id} className="hover:bg-gray-50 transition-colors">
                      <td className="p-4 align-middle">{review.product}</td>
                      <td className="p-4 align-middle">{review.name}</td>

                      {/* Rating Stars */}
                      <td className="p-4">
                        <div className="flex justify-center gap-0.5">
                          {[...Array(5)].map((_, i) => (
                            <AiFillStar
                              key={i}
                              className={`text-xl ${
                                i < review.rating ? "text-orange-500" : "text-gray-300"
                              }`}
                            />
                          ))}
                        </div>
                      </td>

                      <td className="p-4 align-middle text-gray-600">{review.date}</td>

                      {/* Action Buttons */}
                      <td className="p-4">
                        <div className="flex justify-center gap-4">
                          <button
                            onClick={() => navigate(`/review-update/${review.id}`)}
                            className="text-blue-600 hover:text-blue-700 transition-colors"
                            title="Edit Review"
                          >
                            <Edit className="w-5 h-5" />
                          </button>

                          <button
                            onClick={() => handleDelete(review.id)}
                            className="text-red-500 hover:text-red-700 transition-colors"
                            title="Delete Review"
                          >
                            <Trash2 className="w-5 h-5" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan={5} className="text-center p-12 text-gray-500">
                      No reviews found
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>

          {/* Pagination */}
          {totalPages > 1 && (
            <div className="flex items-center justify-between p-4 border-t bg-white">
              <p className="text-sm text-gray-600">
                Showing {startIndex + 1} - {Math.min(endIndex, filteredReviews.length)} of{" "}
                {filteredReviews.length} reviews
              </p>

              <div className="flex gap-2">
                <button
                  onClick={() => setCurrentPage((p) => Math.max(p - 1, 1))}
                  disabled={currentPage === 1}
                  className="px-4 py-2 border rounded-lg disabled:opacity-50 hover:bg-gray-100"
                >
                  Previous
                </button>

                <span className="px-4 py-2 font-medium">
                  Page {currentPage} of {totalPages}
                </span>

                <button
                  onClick={() => setCurrentPage((p) => Math.min(p + 1, totalPages))}
                  disabled={currentPage === totalPages}
                  className="px-4 py-2 border rounded-lg disabled:opacity-50 hover:bg-gray-100"
                >
                  Next
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ReviewTable;