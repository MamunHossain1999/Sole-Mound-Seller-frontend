/* eslint-disable @typescript-eslint/no-explicit-any */
import { useGetAllOrdersQuery } from "@/redux/api/orderApi";

const LatestOrder = () => {
  const { data: orders = [] } = useGetAllOrdersQuery({});

  // latest first
  const latestOrders = [...orders].sort(
    (a: any, b: any) =>
      new Date(b.createdAt || b.date).getTime() -
      new Date(a.createdAt || a.date).getTime(),
  );

  const recentOrders = latestOrders.slice(0, 5);

  return (
    <div className="lg:col-span-2">
      <div className="bg-white rounded-[12px] shadow-lg">
        <div className="border-b px-4 py-4">
          <h2 className="text-base lg:text-[20px] font-bold text-[#1F1F1F]">
            Latest Orders
          </h2>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className=" bg-[#FDF1F7]">
                <th className="text-left text-base lg:text-[20px] font-bold text-[#A8537B] px-4 py-3">
                  Products
                </th>
                <th className="text-left text-base font-bold text-[#8B909A] px-4 py-3 lg:text-[20px]">
                  Order ID
                </th>
                <th className="text-left text-base font-bold text-[#8B909A] px-6 py-3 lg:text-[20px]">
                  Date
                </th>
                <th className="text-left text-base font-bold text-[#8B909A] px-6 py-3 lg:text-[20px]">
                  Status
                </th>
                <th className="text-left text-base font-bold text-[#8B909A] pl-6 py-3 lg:text-[20px]">
                  Amount
                </th>
              </tr>
            </thead>
            <tbody>
              {recentOrders?.map((order, index) => (
                <tr key={index} className="">
                  <td className="px-4 py-3 text-sm font-medium text-[#1F1F1F]">
                    {order.products?.[0]?.name || "N/A"}
                  </td>
                  <td className="px-6 py-3 text-base font-normal text-[#1F1F1F]">
                    {order.id.slice(0, 8)}...
                  </td>
                  <td className="px-6 py-3 text-base font-normal text-[#1F1F1F]">
                    {order.date}
                  </td>
                  <td className="px-6 py-3">
                    <span
                      className={`inline-flex items-center gap-2 text-sm font-normal ${
                        order.status === "completed"
                          ? "text-[#1F1F1F]"
                          : "text-[#1F1F1F]"
                      }`}
                    >
                      <span
                        className={`w-2 h-2 rounded-full ${
                          order.status === "completed"
                            ? "bg-[#22C55E]"
                            : "bg-[#FFC61C]"
                        }`}
                      ></span>
                      {order.status}
                    </span>
                  </td>
                  <td className="px-6 py-3 text-base font-normal text-[#1F1F1F]">
                    {order.total.toFixed(2)}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default LatestOrder;
