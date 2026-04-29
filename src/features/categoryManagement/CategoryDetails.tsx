import React from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useGetSingleCategoryQuery } from "@/redux/api/categoryApi";

const CategoryDetails: React.FC = () => {
  const { name } = useParams<{ name: string }>();
  const navigate = useNavigate();

  const { data, isLoading, isError } = useGetSingleCategoryQuery(
    name as string
  );

  const category = data?.data; 



  if (isLoading) {
    return <p className="p-6">Loading category...</p>;
  }

  if (isError || !category) {
    return <p className="p-6 text-red-500">Category not found</p>;
  }

  return (
    <div className="min-h-screen p-6 bg-gray-50">

      {/* Back Button */}
      <button
        onClick={() => navigate(-1)}
        className="mb-4 px-4 py-2 bg-white border rounded hover:bg-gray-100"
      >
        ← Back
      </button>

      {/* Header */}
      <div className="bg-white rounded-xl p-6 shadow">

        <div className="flex items-center gap-4">
          <img
            src={category.image || "/placeholder.png"}
            alt={category.name}
            className="w-20 h-20 rounded-lg object-cover"
          />

          <div>
            <h1 className="text-2xl font-bold text-gray-800">
              {category.name}
            </h1>

            <p className="text-sm text-gray-500">
              Status:{" "}
              <span
                className={`font-semibold ${
                  category.status === "active"
                    ? "text-green-600"
                    : "text-red-500"
                }`}
              >
                {category.status}
              </span>
            </p>
          </div>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-6">

          <div className="p-4 bg-gray-100 rounded-lg">
            <p className="text-sm text-gray-500">Sales</p>
            <h2 className="text-xl font-bold">{category.sales}</h2>
          </div>

          <div className="p-4 bg-gray-100 rounded-lg">
            <p className="text-sm text-gray-500">Stock</p>
            <h2 className="text-xl font-bold">{category.stock}</h2>
          </div>

          <div className="p-4 bg-gray-100 rounded-lg">
            <p className="text-sm text-gray-500">Added Products</p>
            <h2 className="text-xl font-bold">{category.added}</h2>
          </div>

        </div>

        {/* Date */}
        <div className="mt-6 text-sm text-gray-500">
          Created At:{" "}
          {category.date
            ? new Date(category.date).toLocaleDateString("en-GB", {
                day: "2-digit",
                month: "short",
                year: "numeric",
              })
            : "N/A"}
        </div>

      </div>
    </div>
  );
};

export default CategoryDetails;