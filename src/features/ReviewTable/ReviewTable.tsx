import React, { useState, useEffect } from "react";
import { FaTrash, FaEye } from "react-icons/fa";
import { AiFillStar } from "react-icons/ai";

interface Review {
  id: number;
  product: string;
  name: string;
  rating: number;
  date: string;
}

const reviews: Review[] = [
  {
    id: 1,
    product: "All Natural Italian-Style",
    name: "Guy Hawkins",
    rating: 4,
    date: "04.12.2019",
  },
  {
    id: 2,
    product: "Organic Tomato Ketchup",
    name: "Leslie Alexander",
    rating: 5,
    date: "08.01.2020",
  },
  {
    id: 3,
    product: "Spicy BBQ Sauce",
    name: "Ronald Richards",
    rating: 3,
    date: "12.05.2021",
  },
  {
    id: 4,
    product: "Classic Mustard",
    name: "Annette Black",
    rating: 4,
    date: "15.03.2022",
  },
  {
    id: 5,
    product: "Creamy Peanut Butter",
    name: "Cody Fisher",
    rating: 5,
    date: "22.06.2021",
  },
  {
    id: 6,
    product: "Chunky Salsa Dip",
    name: "Savannah Nguyen",
    rating: 2,
    date: "10.10.2020",
  },
  {
    id: 7,
    product: "Organic Honey",
    name: "Dianne Russell",
    rating: 5,
    date: "01.02.2023",
  },
  {
    id: 8,
    product: "Extra Virgin Olive Oil",
    name: "Floyd Miles",
    rating: 3,
    date: "19.07.2022",
  },
  {
    id: 9,
    product: "Whole Grain Bread",
    name: "Kristin Watson",
    rating: 4,
    date: "27.09.2019",
  },
  {
    id: 10,
    product: "Vanilla Almond Granola",
    name: "Arlene McCoy",
    rating: 5,
    date: "11.11.2021",
  },
];

const ReviewTable: React.FC = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [searchTerm, setSearchTerm] = useState("");
  const reviewsPerPage = 5;

  // Filter the reviews
  const filteredReviews = reviews.filter(
    (review) =>
      review.product.toLowerCase().includes(searchTerm.toLowerCase()) ||
      review.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Pagination based on filteredReviews
  const totalPages = Math.ceil(filteredReviews.length / reviewsPerPage);
  const startIndex = (currentPage - 1) * reviewsPerPage;
  const endIndex = startIndex + reviewsPerPage;
  const currentReviews = filteredReviews.slice(startIndex, endIndex);

  // Reset to page 1 when search changes
  useEffect(() => {
    setCurrentPage(1);
  }, [searchTerm]);

  return (
    <div className="p-6 bg-pink-50 min-h-screen">
      <h1 className="text-xl font-semibold text-gray-800 mb-2">Review</h1>
      <p className="text-sm text-gray-500 mb-4">Dashboard &gt; Review</p>

      <div className="bg-white p-4 rounded-md shadow">
        <div className="mb-4">
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Search for anything..."
            className="w-full p-2 border rounded-md focus:outline-none focus:ring"
          />
        </div>

        <table className="w-full table-auto border-collapse">
          <thead>
            <tr className="bg-gray-100 text-left text-sm">
              <th className="p-2">#ID</th>
              <th className="p-2">Product</th>
              <th className="p-2">Name</th>
              <th className="p-2">Rating</th>
              <th className="p-2">Date</th>
              <th className="p-2">Action</th>
            </tr>
          </thead>
          <tbody>
            {currentReviews.map((review) => (
              <tr key={review.id} className="border-t text-sm">
                <td className="p-2">{review.id}</td>
                <td className="p-2">{review.product}</td>
                <td className="p-2">{review.name}</td>
                <td className="p-2 flex items-center">
                  {[...Array(review.rating)].map((_, i) => (
                    <AiFillStar key={i} className="text-orange-500" />
                  ))}
                </td>
                <td className="p-2">{review.date}</td>
                <td className="p-2 space-x-3">
                  <button className="text-red-500 hover:text-red-700">
                    <FaTrash />
                  </button>
                  <button className="text-gray-600 hover:text-black">
                    <FaEye />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        {/* Pagination */}
        <div className="flex justify-between items-center mt-4 text-sm">
          <p>
            {startIndex + 1} -{" "}
            {Math.min(endIndex, filteredReviews.length)} of{" "}
            {filteredReviews.length} Reviews
          </p>
          <div className="flex items-center space-x-2">
            <span>Page</span>
            <select
              className="border rounded p-1"
              value={currentPage}
              onChange={(e) => setCurrentPage(Number(e.target.value))}
            >
              {Array.from({ length: totalPages }, (_, i) => (
                <option key={i + 1} value={i + 1}>
                  {i + 1}
                </option>
              ))}
            </select>
            <button
              onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
              disabled={currentPage === 1}
              className="px-2"
            >
              ❮
            </button>
            <button
              onClick={() =>
                setCurrentPage((prev) => Math.min(prev + 1, totalPages))
              }
              disabled={currentPage === totalPages}
              className="px-2"
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
