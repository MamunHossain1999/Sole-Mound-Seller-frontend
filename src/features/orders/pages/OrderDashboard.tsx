import { Plus } from "lucide-react";
import { Link, NavLink } from "react-router-dom";
import shoppingCart from "@/assets/ordarpageImg/order.svg";
import buy from "@/assets/ordarpageImg/Buy.svg";
import { IoIosArrowDown } from "react-icons/io";
import { useGetAllOrdersQuery } from "@/redux/api/orderApi";

const OrderDashboard: React.FC = () => {
  const { data: orders = [], isLoading, isError } = useGetAllOrdersQuery();

  const stats = {
    total: orders.length,

    pending: orders.filter((o) => o.status === "pending").length,
    completed: orders.filter((o) => o.status === "completed").length,
    cancelled: orders.filter((o) => o.status === "cancelled").length,

    // ✅ correct return count
    returned: orders.filter((o) => o?.returnStatus === "requested").length,
  };

  const orderOverview = [
    {
      title: "Orders Overview",
      metrics: [
        { label: "All Orders", value: stats.total },
        { label: "Pending", value: stats.pending },
        { label: "Completed", value: stats.completed },
      ],
    },
    {
      title: "Issues Summary",
      metrics: [
        { label: "Cancelled", value: stats.cancelled },

        // ✅ FIX HERE
        { label: "Returned", value: stats.returned },

        { label: "Damaged", value: 0 },
      ],
    },
  ];

  if (isLoading) return <p>Loading...</p>;
  if (isError) return <p className="text-red-500">Error loading orders</p>;
  return (
    <div className="min-h-screen">
      <div className="mx-auto">
        {/* Header */}
        <div className="p- mb-4 flex flex-col lg:flex-row justify-between items-start lg:items-center gap-4 lg:gap-0">
          {/* Left - Title and Breadcrumb */}
          <div>
            <p className="text-base lg:text-2xl font-bold text-[#333843]">
              Orders
            </p>
            <div className="flex items-center flex-wrap space-x-1 text-sm mt-1">
              <NavLink to="/" className="font-medium">
                <span className="text-[#A8537B] text-sm font-medium">
                  Dashboard
                </span>
              </NavLink>
              <span className="text-gray-500">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="20"
                  height="20"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="lucide lucide-chevron-right"
                >
                  <path d="m9 18 6-6-6-6" />
                </svg>
              </span>

              <NavLink to="/orders">
                <span className="text-[#A8537B] text-sm font-medium">
                  Orders
                </span>
              </NavLink>
              <span className="text-gray-500">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="20"
                  height="20"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="lucide lucide-chevron-right"
                >
                  <path d="m9 18 6-6-6-6" />
                </svg>
              </span>

              <NavLink to="/orders-list">
                <span className="text-[#919191] text-sm font-medium">
                  Order list
                </span>
              </NavLink>
            </div>
          </div>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-6 mb-6">
          {orderOverview.map((group, index) => (
            <div key={index} className="bg-white p-5 rounded-[12px] shadow-sm">
              {/* Top: Icon + This Week Dropdown */}
              <div className="flex justify-between items-center mb-4">
                <div className="bg-[#FDF1F7] p-3 rounded-md">
                  <img
                    src={shoppingCart}
                    alt="Shopping Cart"
                    className="text-[#1F1F1F]"
                  />
                </div>
                <p className="text-xs font-bold text-[#919191] flex items-center gap-1">
                  This Week <IoIosArrowDown className="w-4 h-4" />
                </p>
              </div>

              {/* Bottom: Metrics */}
              <div className="grid grid-cols-3 ">
                {group.metrics.map((metric, i) => (
                  <div key={i}>
                    <p className="text-sm font-medium text-[#919191]">
                      {metric.label}
                    </p>
                    <p className="text-base lg:text-xl font-semibold text-[#1F1F1F]">
                      {metric.value}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>

        {/* Orders Table */}
        <div className="bg-white flex items-center justify-center h-[650px] rounded-[12px] ">
          <div className="bg-[#FDF1F7] w-[351px] h-[366px] mx-auto rounded-[12px] shadow-sm flex items-center justify-center">
            <div className="flex flex-col items-center justify-center py-16">
              <div className="bg-[#F1DAFC] p-6 rounded-[30px] mb-6  flex items-center justify-center">
                <img
                  src={buy}
                  alt="Shopping Cart"
                  className="w-[46.25px] h-[45.104px] "
                />
              </div>
              <h2 className="text-base lg:text-xl font-bold text-[#1F1F1F] mb-2">
                No Orders Yet?
              </h2>
              <p className="text-[#919191] font-medium text-sm text-center mb-6 max-w-md mx-6">
                Add products to your store and start selling to see orders here
              </p>
              <Link
                to="/products-form"
                className="!bg-[#C8A8E9] text-[#1F1F1F] cursor-pointer text-base font-semibold px-6 py-3 rounded-lg flex items-center gap-2 hover:bg-purple-300"
              >
                Add New Products <Plus className="w-6 h-6" />
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OrderDashboard;
