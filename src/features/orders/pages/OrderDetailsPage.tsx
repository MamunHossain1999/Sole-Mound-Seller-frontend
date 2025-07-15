import React, { useState } from "react";
import { Search } from "lucide-react";
import { IoIosArrowDown } from "react-icons/io";
import shoppingCart from "@/assets/ordarpageImg/Buy.svg";
import { Link } from "react-router-dom";
import DateRangeCalendar from "./DateRangeCalendar";
import Pagination from "./Pagination";

interface Order {
  id: string;
  status: "Pending" | "Complete" | "Cancelled" | "On the way" | "In Progress";
  amount: number;
  customer: string;
  orderType: string;
  added: string;
  method: string;
}

const OrderDetailsPage: React.FC = () => {
  const ordersData: Order[] = [
    {
      id: "53469-73",
      status: "Pending",
      amount: 56.234,
      customer: "Ashley Foster",
      orderType: "Company Delivery",
      added: "29 Dec 2022",
      method: "Mastercard",
    },
    {
      id: "53469-74",
      status: "Complete",
      amount: 51.885,
      customer: "Elsa Parker",
      orderType: "Company Delivery",
      added: "24 Dec 2022",
      method: "Visa",
    },
    {
      id: "53469-75",
      status: "Cancelled",
      amount: 56.519,
      customer: "Eric Lawson",
      orderType: "Company Delivery",
      added: "12 Dec 2022",
      method: "Mastercard",
    },
    {
      id: "53469-76",
      status: "On the way",
      amount: 59.48,
      customer: "Colin Hunt",
      orderType: "Company Delivery",
      added: "21 Oct 2022",
      method: "Visa",
    },
    {
      id: "53469-77",
      status: "Complete",
      amount: 50.09,
      customer: "Georgia White",
      orderType: "Company Delivery",
      added: "21 Oct 2022",
      method: "Mastercard",
    },
    {
      id: "53469-78",
      status: "Cancelled",
      amount: 54.162,
      customer: "Kate Richards",
      orderType: "Company Delivery",
      added: "21 Oct 2022",
      method: "Mastercard",
    },
    {
      id: "53469-79",
      status: "On the way",
      amount: 56.578,
      customer: "Nash Ellis",
      orderType: "Company Delivery",
      added: "19 Sep 2022",
      method: "Mastercard",
    },
    {
      id: "53469-80",
      status: "In Progress",
      amount: 56.462,
      customer: "Jackson Brooks",
      orderType: "Company Delivery",
      added: "19 Sep 2022",
      method: "Mastercard",
    },
    {
      id: "53469-81",
      status: "Complete",
      amount: 53.0,
      customer: "Arthur Knight",
      orderType: "Company Delivery",
      added: "19 Sep 2022",
      method: "Mastercard",
    },
    {
      id: "53469-82",
      status: "Complete",
      amount: 5298,
      customer: "Lucia James",
      orderType: "Company Delivery",
      added: "10 Aug 2022",
      method: "Mastercard",
    },
  ];

  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);
  const itemsPerPage = 10;
  const getStatusColor = (status: string): string => {
    switch (status) {
      case "Pending":
        return "bg-[#F6E3AED1] text-[#505050]";
      case "Complete":
        return "bg-[#D3F3DF] text-[#22C55E]";
      case "Cancelled":
        return "bg-[#F57E7729] text-[#FF1C1C]";
      case "On the way":
        return "bg-[#FFE0E0] text-[#CC5F5F]";
      case "In Progress":
        return "bg-[#19466A3D] text-[#5570F1]";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  const stats = {
    total: ordersData.length,
    pending: ordersData.filter((o) => o.status === "Pending").length,
    completed: ordersData.filter((o) => o.status === "Complete").length,
    cancelled: ordersData.filter((o) => o.status === "Cancelled").length,
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
        { label: "Returned", value: 0 },
        { label: "Damaged", value: 0 },
      ],
    },
  ];

  const filteredOrders = ordersData.filter(
    (order) =>
      order.customer.toLowerCase().includes(searchTerm.toLowerCase()) ||
      order.id.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const totalPages = Math.ceil(filteredOrders.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentOrders = filteredOrders.slice(startIndex, endIndex);

  //   filter orders by date if a filter is selected
  const [selectedFilter, setSelectedFilter] = useState<string | null>(null);
  const [showDropdown, setShowDropdown] = useState(false);
  const [showCalendar, setShowCalendar] = useState(false);
  //   date sorting er jnno
  const [fromDate, setFromDate] = useState<Date | null>(null);
  const [toDate, setToDate] = useState<Date | null>(null);

  const dateOptions = [
    "This Week",
    "Last Week",
    "This Month",
    "Last Month",
    "This Year",
    "Last Year",
    "Date Range",
  ];

  const handleFilterClick = (option: string) => {
    if (option === "Date Range") {
      setShowCalendar(true);
      setSelectedFilter(option);
    } else {
      setShowCalendar(false);
      setSelectedFilter(option === selectedFilter ? null : option);
    }
  };

  //   filter data
  const applyFilter = () => {
    console.log("Applied filter:", {
      selectedFilter,
    });
    setShowDropdown(false);
  };

  return (
    <div className="min-h-screen bg-[#FDF1F7] pb-5">
      <div className="w-full mx-auto">
        {/* Header */}
        <div className="mb-6">
          <h1 className="text-base lg:text-2xl font-bold text-[#333843] mb-2">
            Order Details
          </h1>
          <nav className="flex">
            <Link to="/" className="text-sm font-medium text-[#A8537B]">
              Dashboard
            </Link>
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
            <Link to="/orders" className="text-sm font-medium text-[#A8537B]">
              Order List
            </Link>
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
            <span className="text-sm font-medium text-[#919191]">
              Order Details
            </span>
          </nav>
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

        {/* Customer Orders Section */}
        <div className="bg-white rounded-lg shadow-sm">
          <div className="p-6 border-b border-gray-200">
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 sm:gap-6">
              {/* Title */}
              <h2 className="text-base font-semibold text-[#000000]">
                Customer Orders
              </h2>

              {/* search bar and controls */}
              <div className="flex flex-wrap items-start sm:items-center gap-4 sm:gap-6">
                {/* Search Bar */}
                <div className="relative w-full sm:w-auto">
                  <input
                    type="text"
                    placeholder="Search product..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pl-4 pr-10 py-2 w-full sm:w-64 border border-[#B6B7BC] rounded-[12px] focus:outline-none focus:ring-2 focus:ring-purple-300 focus:border-transparent"
                  />
                  <Search className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                </div>

                {/* Filter Button */}
                <div className="relative">
                  <button
                    className="bg-[#C8A8E9] text-[#1F1F1F] px-4 py-2 rounded-lg flex items-center gap-2 hover:bg-purple-300 transition-colors"
                    onClick={() => setShowDropdown(!showDropdown)}
                  >
                    <span className="w-5 h-5 flex items-center justify-center">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="20"
                        height="22"
                        viewBox="0 0 20 22"
                        fill="none"
                      >
                        <path
                          d="M1.09277 8.40445H18.9167"
                          stroke="#53545C"
                          stroke-width="1.5"
                          stroke-linecap="round"
                          stroke-linejoin="round"
                        />
                        <path
                          d="M14.442 12.3097H14.4512"
                          stroke="#53545C"
                          stroke-width="1.5"
                          stroke-linecap="round"
                          stroke-linejoin="round"
                        />
                        <path
                          d="M10.0045 12.3097H10.0137"
                          stroke="#53545C"
                          stroke-width="1.5"
                          stroke-linecap="round"
                          stroke-linejoin="round"
                        />
                        <path
                          d="M5.55769 12.3097H5.56695"
                          stroke="#53545C"
                          stroke-width="1.5"
                          stroke-linecap="round"
                          stroke-linejoin="round"
                        />
                        <path
                          d="M14.442 16.1964H14.4512"
                          stroke="#53545C"
                          stroke-width="1.5"
                          stroke-linecap="round"
                          stroke-linejoin="round"
                        />
                        <path
                          d="M10.0045 16.1964H10.0137"
                          stroke="#53545C"
                          stroke-width="1.5"
                          stroke-linecap="round"
                          stroke-linejoin="round"
                        />
                        <path
                          d="M5.55769 16.1964H5.56695"
                          stroke="#53545C"
                          stroke-width="1.5"
                          stroke-linecap="round"
                          stroke-linejoin="round"
                        />
                        <path
                          d="M14.0438 1V4.29078"
                          stroke="#53545C"
                          stroke-width="1.5"
                          stroke-linecap="round"
                          stroke-linejoin="round"
                        />
                        <path
                          d="M5.96564 1V4.29078"
                          stroke="#53545C"
                          stroke-width="1.5"
                          stroke-linecap="round"
                          stroke-linejoin="round"
                        />
                        <path
                          fill-rule="evenodd"
                          clip-rule="evenodd"
                          d="M14.2383 2.57959H5.77096C2.83427 2.57959 1 4.21552 1 7.22262V16.2723C1 19.3266 2.83427 21.0004 5.77096 21.0004H14.229C17.175 21.0004 19 19.355 19 16.3479V7.22262C19.0092 4.21552 17.1842 2.57959 14.2383 2.57959Z"
                          stroke="#53545C"
                          stroke-width="1.5"
                          stroke-linecap="round"
                          stroke-linejoin="round"
                        />
                      </svg>
                    </span>
                    Filter
                  </button>

                  {showDropdown && (
                    <div className="absolute right-0 mt-2 w-72 bg-white rounded-md shadow-lg z-10 border border-gray-200 p-4">
                      <h3 className="font-medium text-base text-[#1F1F1F] mb-3">
                        By Date
                      </h3>

                      <div className="grid grid-cols-2 gap-2 mb-4">
                        {dateOptions.map((option) => (
                          <div
                            key={option}
                            className={`flex items-center p-1 rounded ${
                              selectedFilter === option
                                ? "text-[#83898C] text-base"
                                : "text-[#83898C]"
                            }`}
                            onClick={() => handleFilterClick(option)}
                          >
                            <div className="relative flex items-center justify-center w-5 h-5">
                              <input
                                type="checkbox"
                                checked={selectedFilter === option}
                                readOnly
                                name="selectAll"
                                className="peer w-full h-full accent-[#C8A8E9] bg-white border border-gray-300 rounded appearance-none checked:bg-[#C8A8E9] checked:border-transparent"
                              />
                              <span className="pointer-events-none absolute inset-0 flex items-center justify-center text-white text-xs font-bold peer-checked:flex ">
                                ✓
                              </span>
                            </div>
                            <label className="ml-2 text-sm text-gray-700 cursor-pointer">
                              {option}
                            </label>
                          </div>
                        ))}
                      </div>

                      {showCalendar && (
                        <div className="mb-4">
                          {/* From / To Toggle Button */}
                          <DateRangeCalendar
                            fromDate={fromDate}
                            toDate={toDate}
                            setFromDate={setFromDate}
                            setToDate={setToDate}
                          />
                        </div>
                      )}

                      {/* button */}
                      <button
                        onClick={applyFilter}
                        className="w-full bg-[#C8A8E9] text-[#1F1F1F] text-base font-semibold py-2 rounded-[8px] hover:bg-purple-300 transition-colors"
                      >
                        Filter
                      </button>
                    </div>
                  )}
                </div>

                {/* Share Button */}
                <button className="w-full sm:w-auto bg-[#C8A8E9] text-base text-[#1F1F1F] px-4 py-2 rounded-[8px] flex items-center justify-center sm:justify-start gap-3 hover:bg-purple-300 transition-colors">
                  <span className="w-[18px] h-[18px] flex items-center justify-center">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="20"
                      height="20"
                      viewBox="0 0 20 20"
                      fill="none"
                    >
                      <path
                        d="M13.8325 6.17463L8.10904 11.9592L1.59944 7.88767C0.66675 7.30414 0.860765 5.88744 1.91572 5.57893L17.3712 1.05277C18.3373 0.769629 19.2326 1.67283 18.9456 2.642L14.3731 18.0868C14.0598 19.1432 12.6512 19.332 12.0732 18.3953L8.10601 11.9602"
                        stroke="#53545C"
                        stroke-width="1.5"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                      />
                    </svg>
                  </span>
                  Share
                </button>
              </div>
            </div>
          </div>
          {/* Table */}
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-[#FDF1F7]">
                <tr>
                  {/* Checkbox + Order ID */}
                  <th className="px-6 py-3 text-left text-base font-semibold text-[#505050] tracking-wider">
                    <div className="flex items-center gap-4">
                      <div className="relative flex items-center justify-center w-5 h-5">
                        <input
                          type="checkbox"
                          name="selectAll"
                          className="peer w-full h-full accent-[#C8A8E9] bg-white border border-gray-300 rounded appearance-none checked:bg-[#C8A8E9] checked:border-transparent"
                        />
                        <span className="pointer-events-none absolute inset-0 flex items-center justify-center text-white text-xs font-bold peer-checked:flex hidden">
                          ✓
                        </span>
                      </div>
                      Order ID
                    </div>
                  </th>

                  {/* Status */}
                  <th className="px-6 py-3 text-left text-base font-semibold text-[#505050] tracking-wider">
                    <div className="flex items-center cursor-pointer">
                      Status
                      <svg
                        className="ml-2 w-4 h-4"
                        viewBox="0 0 16 16"
                        fill="none"
                      >
                        <path
                          fillRule="evenodd"
                          clipRule="evenodd"
                          d="M3.65 6.16c.19-.21.51-.21.7 0l3.3 3.59c.19.21.51.21.7 0l3.3-3.59c.19-.21.51-.21.7 0 .19.21.19.56 0 .77L9.06 10.52a1 1 0 01-1.48 0L3.65 6.93a.55.55 0 010-.77z"
                          fill="#505050"
                        />
                      </svg>
                    </div>
                  </th>

                  <th className="px-6 py-3 text-left text-base font-semibold text-[#505050] tracking-wider">
                    Amount
                  </th>
                  <th className="px-6 py-3 text-left text-base font-semibold text-[#505050] tracking-wider">
                    Customer
                  </th>
                  <th className="px-6 py-3 text-left text-base font-semibold text-[#505050] tracking-wider">
                    Order Type
                  </th>

                  {/* Added */}
                  <th className="px-6 py-3 text-left text-base font-semibold text-[#505050] tracking-wider">
                    <div className="flex items-center cursor-pointer">
                      Added
                      <svg
                        className="ml-2 w-4 h-4"
                        viewBox="0 0 16 16"
                        fill="none"
                      >
                        <path
                          fillRule="evenodd"
                          clipRule="evenodd"
                          d="M3.65 6.16c.19-.21.51-.21.7 0l3.3 3.59c.19.21.51.21.7 0l3.3-3.59c.19-.21.51-.21.7 0 .19.21.19.56 0 .77L9.06 10.52a1 1 0 01-1.48 0L3.65 6.93a.55.55 0 010-.77z"
                          fill="#505050"
                        />
                      </svg>
                    </div>
                  </th>

                  <th className="px-6 py-3 text-left text-base font-semibold text-[#505050] tracking-wider">
                    Method
                  </th>
                  <th className="px-6 py-3 text-left text-base font-semibold text-[#505050] tracking-wider">
                    Action
                  </th>
                </tr>
              </thead>

              <tbody className="bg-white divide-y divide-gray-200">
                {currentOrders?.map((order, index) => (
                  <tr key={index} className="hover:bg-gray-50">
                    {/* Checkbox + Order ID */}
                    <td className="px-6 py-4 whitespace-nowrap text-base text-[#6E7079]">
                      <div className="flex items-center gap-4">
                        <div className="relative flex items-center justify-center w-5 h-5">
                          <input
                            type="checkbox"
                            name="select"
                            className="peer w-full h-full accent-[#C8A8E9] bg-white border border-gray-300 rounded appearance-none checked:bg-[#C8A8E9] checked:border-transparent"
                          />
                          <span className="pointer-events-none absolute inset-0 flex items-center justify-center text-white text-xs font-bold peer-checked:flex hidden">
                            ✓
                          </span>
                        </div>
                        <span className="text-[#505050] font-semibold">
                          #{order.id}
                        </span>
                      </div>
                    </td>

                    {/* Status */}
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span
                        className={`inline-flex px-2 py-1 text-sm font-medium rounded-[8px] ${getStatusColor(
                          order.status
                        )}`}
                      >
                        {order.status}
                      </span>
                    </td>

                    {/* Amount */}
                    <td className="px-6 py-4 whitespace-nowrap text-base text-[#505050]">
                      ${order.amount.toFixed(3)}
                    </td>

                    {/* Customer */}
                    <td className="px-6 py-4 whitespace-nowrap text-base text-[#3CA6FC] hover:text-blue-300 cursor-pointer">
                      {order.customer}
                    </td>

                    {/* Order Type */}
                    <td className="px-6 py-4 whitespace-nowrap text-base text-[#6E7079]">
                      {order.orderType}
                    </td>

                    {/* Added */}
                    <td className="px-6 py-4 whitespace-nowrap text-base text-[#505050]">
                      {order.added}
                    </td>

                    {/* Method */}
                    <td className="px-6 py-4 whitespace-nowrap text-base text-[#505050]">
                      {order.method}
                    </td>

                    {/* Actions */}
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center gap-2">
                        {/* Edit */}
                        <button className="cursor-pointer">
                          <svg width="16" height="16" fill="none">
                            <path
                              d="M8 13.333H14M11.25 1.472c.3-.302.71-.472 1.14-.472.21 0 .42.042.615.123.195.081.373.2.522.35.15.15.268.327.35.523.08.194.122.404.123.615 0 .211-.042.421-.123.617a1.7 1.7 0 01-.35.521L4.037 13.24 1 14l.759-3.037L11.25 1.472Z"
                              stroke="#505050"
                              strokeWidth="2"
                              strokeLinecap="round"
                              strokeLinejoin="round"
                            />
                          </svg>
                        </button>
                        {/* View */}
                        <button className="cursor-pointer">
                          <svg width="24" height="24" fill="none">
                            <path
                              d="M22 12c-1.747 3.576-6.123 7-10 7s-8.253-3.424-10-7"
                              stroke="#505050"
                              strokeWidth="1.4"
                              strokeLinecap="round"
                              strokeLinejoin="round"
                            />
                            <path
                              d="M22 12c-1.747-3.576-6.122-7-10-7S3.747 8.424 2 12"
                              stroke="#505050"
                              strokeWidth="1.4"
                              strokeLinecap="round"
                              strokeLinejoin="round"
                            />
                            <circle
                              cx="12"
                              cy="12"
                              r="3"
                              stroke="#505050"
                              strokeWidth="1.4"
                              strokeLinecap="round"
                              strokeLinejoin="round"
                            />
                          </svg>
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          {/* Pagination */}
          <Pagination
            currentPage={currentPage}
            totalPages={totalPages}
            pageSize={pageSize}
            totalItems={filteredOrders.length}
            startIndex={startIndex}
            endIndex={endIndex}
            onPageChange={setCurrentPage}
            onPageSizeChange={(size) => {
              setPageSize(size);
              setCurrentPage(1);
            }}
          />
          ;
        </div>
      </div>
    </div>
  );
};

export default OrderDetailsPage;
