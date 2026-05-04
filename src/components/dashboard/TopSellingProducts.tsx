/* eslint-disable @typescript-eslint/no-explicit-any */

import { useGetAllCategoriesQuery } from "@/redux/api/categoryApi";
import { useGetTopCategoriesQuery } from "@/redux/api/topCategoryApi";

const TopSellingAndBrands = () => {
  const { data: categories = [], isLoading } = useGetTopCategoriesQuery();
  const { data: brands = [] } = useGetAllCategoriesQuery();

  // top brands sort by total orders
  const sortedBrands = [...brands].sort(
    (a: any, b: any) => (b.sales || b.total || 0) - (a.sales || a.total || 0),
  );

  const top5Brands = sortedBrands.slice(0, 5);

  if (isLoading) {
    return <p className="text-center py-10">Loading...</p>;
  }

  return (
    <div className="grid grid-cols-1 lg:grid-cols-5 gap-6">
      {/* ================= TOP SELLING ================= */}
      <div className="lg:col-span-3 bg-[#FDF1F7] rounded-xl shadow-sm">
        <h2 className="text-lg font-bold text-[#1F1F1F] bg-white px-4 py-5 rounded-t-xl">
          Top Selling Products
        </h2>

        <div className="overflow-x-auto">
          <table className="w-full min-w-[600px]">
            <thead>
              <tr>
                <th className="text-left px-4 py-3">Category</th>
                <th className="text-left px-4 py-3">Total Order</th>
                <th className="text-left px-4 py-3">Status</th>
                <th className="text-left px-4 py-3">Price</th>
              </tr>
            </thead>

            <tbody>
              {categories.map((item: any, index: number) => (
                <tr key={index} className="bg-white">
                  <td className="px-4 py-3 flex items-center gap-3">
                    <img src={item.image?.[0]} className="w-8 h-8 rounded" />
                    <span>{item._id}</span>
                  </td>

                  <td className="px-4 py-3">{item.total}</td>

                  <td className="px-4 py-3">
                    <span
                      className={
                        item.total > 2 ? "text-green-500" : "text-red-500"
                      }
                    >
                      {item.total > 2 ? "Stock" : "Low"}
                    </span>
                  </td>

                  <td className="px-4 py-3">${item.totalPrice || 0}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* ================= TOP BRANDS ================= */}
      <div className="lg:col-span-2 bg-[#FDF1F7] rounded-xl shadow-sm">
        <h2 className="text-lg font-bold bg-white px-4 py-5 rounded-t-xl">
          Top Brands
        </h2>

        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr>
                <th className="text-left px-4 py-3">Brand</th>
                <th className="text-left px-4 py-3">Orders</th>
              </tr>
            </thead>

            <tbody>
              {top5Brands?.map((item: any, index: number) => (
                <tr key={index} className="bg-white">
                  <td className="px-4 py-3 flex items-center gap-3">
                    <img src={item.image} className="w-6 h-6 rounded" />
                    <span>{item.name || item._id}</span>
                  </td>

                  <td className="px-4 py-3">{item.sales || item.total || 0}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default TopSellingAndBrands;
