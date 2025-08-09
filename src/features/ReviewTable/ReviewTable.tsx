import React, { useState, useEffect } from "react";
import { AiFillStar } from "react-icons/ai";
import { useNavigate } from "react-router";

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
  const navigate = useNavigate()
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
    <div className="bg-[#FDF1F7] min-h-screen">
      {/* hearder */}
      <div className="flex items-center justify-between mb-8 ">
        <div>
          <h1 className="text-lg md:text-2xl font-bold text-[#333843]">
            Review
          </h1>
          <div className="flex items-center mt-1">
            <span className="text-[#A8537B] text-sm font-normal">
              Dashboard
            </span>
            <span className="mx-2 ">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="18"
                height="18"
                viewBox="0 0 18 18"
                fill="none"
              >
                <path
                  fill-rule="evenodd"
                  clip-rule="evenodd"
                  d="M6.59467 3.96967C6.30178 4.26256 6.30178 4.73744 6.59467 5.03033L10.5643 9L6.59467 12.9697C6.30178 13.2626 6.30178 13.7374 6.59467 14.0303C6.88756 14.3232 7.36244 14.3232 7.65533 14.0303L12.4205 9.26516C12.5669 9.11872 12.5669 8.88128 12.4205 8.73484L7.65533 3.96967C7.36244 3.67678 6.88756 3.67678 6.59467 3.96967Z"
                  fill="#B6B7BC"
                />
              </svg>
            </span>
            <span className="text-[#919191] text-sm font-normal">Review</span>
          </div>
        </div>
      </div>

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
          <thead className="bg-[#FDF1F7]">
            <tr className="text-[#1F1F1F] text-left text-base">
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
                    <AiFillStar key={i} className="text-[#FF7C0B]" />
                  ))}
                </td>
                <td className="p-2">{review.date}</td>
                <td className="p-2 space-x-3">
                  <button className="cursor-pointer">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="25"
                      height="25"
                      viewBox="0 0 25 25"
                      fill="none"
                    >
                      <path
                        d="M4.88622 6.87375L6.99922 19.6367C7.09587 20.221 7.39681 20.752 7.84842 21.1352C8.30003 21.5183 8.87299 21.7286 9.46522 21.7288H12.8132M19.5112 6.87375L17.3992 19.6367C17.3026 20.221 17.0016 20.752 16.55 21.1352C16.0984 21.5183 15.5254 21.7286 14.9332 21.7288H11.5852M10.2212 11.7768V16.8258M14.1772 11.7768V16.8258M2.94922 6.87375H21.4492M14.9762 6.87375V5.09375C14.9762 4.69593 14.8182 4.31439 14.5369 4.03309C14.2556 3.75179 13.874 3.59375 13.4762 3.59375H10.9222C10.5244 3.59375 10.1429 3.75179 9.86156 4.03309C9.58025 4.31439 9.42222 4.69593 9.42222 5.09375V6.87375H14.9762Z"
                        stroke="#505050"
                        stroke-width="1.5"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                      />
                    </svg>
                  </button>
                  <button className="cursor-pointer" onClick={() => navigate("/product-details")}>
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="25"
                      height="25"
                      viewBox="0 0 25 25"
                      fill="none"
                    >
                      <path
                        fill-rule="evenodd"
                        clip-rule="evenodd"
                        d="M22.1992 12.6604C20.4523 16.2366 16.0767 19.6602 12.199 19.6602C8.32123 19.6602 3.94568 16.2366 2.19922 12.6599"
                        stroke="#505050"
                        stroke-width="1.4"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                      />
                      <path
                        fill-rule="evenodd"
                        clip-rule="evenodd"
                        d="M22.1992 12.6604C20.4523 9.08414 16.0774 5.66016 12.1997 5.66016C8.32192 5.66016 3.94568 9.0833 2.19922 12.6599"
                        stroke="#505050"
                        stroke-width="1.4"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                      />
                      <path
                        d="M15.1992 12.6602C15.1992 14.317 13.8561 15.6602 12.1992 15.6602C10.5424 15.6602 9.19922 14.317 9.19922 12.6602C9.19922 11.0033 10.5424 9.66016 12.1992 9.66016C13.8561 9.66016 15.1992 11.0033 15.1992 12.6602Z"
                        stroke="#505050"
                        stroke-width="1.4"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                      />
                    </svg>
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        {/* Pagination */}
        <div className="flex justify-between items-center mt-4 text-sm">
          <p>
            {startIndex + 1} - {Math.min(endIndex, filteredReviews.length)} of{" "}
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
              className="px-2 cursor-pointer"
            >
              ❮
            </button>
            <button
              onClick={() =>
                setCurrentPage((prev) => Math.min(prev + 1, totalPages))
              }
              disabled={currentPage === totalPages}
              className="px-2 cursor-pointer"
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
