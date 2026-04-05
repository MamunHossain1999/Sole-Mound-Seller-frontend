/* eslint-disable @typescript-eslint/no-explicit-any */
import { useDeleteReviewMutation, useGetAllReviewsQuery } from "@/redux/api/reviewApi";
import { useEffect, useState } from "react";

import { AiFillStar} from "react-icons/ai";
import { Trash2 } from "lucide-react";

interface Review {
  id: number;
  product: string;
  name: string;
  rating: number;
  date: string;
}

const ReviewTable: React.FC = () => {
 

  const [currentPage, setCurrentPage] = useState(1);
  const [searchTerm, setSearchTerm] = useState("");
  const reviewsPerPage = 5;

  // ✅ Correct hook usage
  const { data, isLoading } = useGetAllReviewsQuery();
  const [deleteReview] = useDeleteReviewMutation();

  // ✅ Transform API data
  const reviews: Review[] =
    data?.data?.map((item: any, ) => ({
      id: item._id , // fallback to index if _id is missing
      product: item.product?.name || "No Product",
      name: item.user?.name || "Anonymous",
      rating: item.rating,
      date: new Date(item.createdAt).toLocaleDateString("en-GB"),
    })) || [];

    const handleDelete = async (id: string) => {
  const confirmDelete = window.confirm("Are you sure?");
  if (!confirmDelete) return;

  try {
    await deleteReview(id).unwrap();
    alert("Deleted successfully");
  } catch (error) {
    console.error(error);
    alert("Delete failed");
  }
};

  // ✅ Filter safe
  const filteredReviews = reviews.filter(
    (review) =>
      review.product.toLowerCase().includes(searchTerm.toLowerCase()) ||
      review.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // ✅ Pagination
  const totalPages = Math.ceil(filteredReviews.length / reviewsPerPage);
  const startIndex = (currentPage - 1) * reviewsPerPage;
  const endIndex = startIndex + reviewsPerPage;
  const currentReviews = filteredReviews.slice(startIndex, endIndex);

  useEffect(() => {
    setCurrentPage(1);
  }, [searchTerm]);

  // ✅ Loading state
  if (isLoading) {
    return <p className="p-4">Loading...</p>;
  }

  return (
    <div className="bg-[#FDF1F7] min-h-screen p-4">
      <h1 className="text-xl font-bold mb-4">Review</h1>

      <div className="bg-white p-4 rounded-md shadow">
        {/* Search */}
        <input
          type="text"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          placeholder="Search..."
          className="w-full mb-4 p-2 border rounded"
        />

        {/* Table */}
        <table className="w-full border-amber-200 table-auto ">
          <thead className="bg-[#FDF1F7]">
            <tr>
              
              <th className="p-2">Product</th>
              <th className="p-2">Name</th>
              <th className="p-2">Rating</th>
              <th className="p-2">Date</th>
              <th className="p-2">Action</th>
            </tr>
          </thead>

          <tbody className="w-full border px-">
            {currentReviews.length > 0 ? (
              currentReviews.map((review) => (
                <tr key={review.id} className="border-t text-sm">
                  <td className="p-2">{review.product}</td>
                  <td className="p-2">{review.name}</td>

                  {/* ⭐ rating */}
                  <td className="p-2 flex">
                    {[...Array(5)].map((_, i) => (
                      <AiFillStar
                        key={i}
                        className={
                          i < review.rating
                            ? "text-orange-500"
                            : "text-gray-300"
                        }
                      />
                    ))}
                  </td>

                  <td className="p-2">{review.date}</td>

                  <td className="p-2 space-x-2">
                    <button  onClick={() => handleDelete(review.id.toString())} className="text-red-500"><Trash2 className="w-5 h-5" /></button>

                    {/* <button
                      className="text-blue-500"
                     onClick={() => navigate(`/review-update/${review.id}`)}
                    >
                      <Edit className="w-5 h-5" />
                    </button> */}
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={6} className="text-center p-4">
                  No Reviews Found
                </td>
              </tr>
            )}
          </tbody>
        </table>

        {/* Pagination */}
        <div className="flex justify-between mt-4 text-sm">
          <p>
            {startIndex + 1} -{" "}
            {Math.min(endIndex, filteredReviews.length)} of{" "}
            {filteredReviews.length}
          </p>

          <div className="flex gap-2">
            <button
              onClick={() => setCurrentPage((p) => Math.max(p - 1, 1))}
            >
              ❮
            </button>

            <span>{currentPage}</span>

            <button
              onClick={() =>
                setCurrentPage((p) => Math.min(p + 1, totalPages))
              }
            >
              ❯
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
export default ReviewTable;