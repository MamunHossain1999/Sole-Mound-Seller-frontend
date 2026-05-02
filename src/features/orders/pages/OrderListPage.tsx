/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useState } from "react";
import { Search } from "lucide-react";
import { IoIosArrowDown } from "react-icons/io";
import shoppingCart from "@/assets/ordarpageImg/Buy.svg";
import { Link } from "react-router-dom";
import DateRangeCalendar from "./DateRangeCalendar";
import Pagination from "./Pagination";
import {
  useDeleteOrderMutation,
  useGetAllOrdersQuery,
} from "@/redux/api/orderApi";
import { toast } from "react-toastify";

const OrderListPage: React.FC = () => {
  const { data: orders = [], isLoading, isError } = useGetAllOrdersQuery();
  const [deleteOrder] = useDeleteOrderMutation();

  // ✅ সব state আগে declare করতে হবে
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [selectedOrderId, setSelectedOrderId] = useState<string | null>(null);
  const [selectedCustomers, setSelectedCustomers] = useState<string[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);
  const [selectedFilter, setSelectedFilter] = useState<string | null>(null);
  const [showDropdown, setShowDropdown] = useState(false);
  const [showCalendar, setShowCalendar] = useState(false);
  const [fromDate, setFromDate] = useState<Date | null>(null);
  const [toDate, setToDate] = useState<Date | null>(null);

  const itemsPerPage = pageSize; // ✅ pageSize অনুযায়ী items দেখাবে

  const getStatusColor = (status: string): string => {
    switch (status?.toLowerCase()) {
      case "pending":
        return "bg-[#F6E3AED1] text-[#505050]";
      case "completed":
        return "bg-[#D3F3DF] text-[#22C55E]";
      case "cancelled":
        return "bg-[#F57E7729] text-[#FF1C1C]";
      case "processing":
        return "bg-[#19466A3D] text-[#5570F1]";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  const stats = {
    total: orders.length,
    pending: orders.filter((o: any) => o.status === "pending").length,
    completed: orders.filter((o: any) => o.status === "completed").length,
    cancelled: orders.filter((o: any) => o.status === "cancelled").length,
    returned: orders.filter((o: any) => o?.returnStatus === "requested").length,
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
        { label: "Returned", value: stats.returned },
        { label: "Damaged", value: 0 },
      ],
    },
  ];

  // ✅ Date range calculator
  const getDateRange = (filter: string): { start: Date; end: Date } | null => {
    const now = new Date();
    const start = new Date();
    const end = new Date();

    switch (filter) {
      case "This Week":
        start.setDate(now.getDate() - now.getDay());
        start.setHours(0, 0, 0, 0);
        end.setHours(23, 59, 59, 999);
        return { start, end };
      case "Last Week":
        start.setDate(now.getDate() - now.getDay() - 7);
        start.setHours(0, 0, 0, 0);
        end.setDate(now.getDate() - now.getDay() - 1);
        end.setHours(23, 59, 59, 999);
        return { start, end };
      case "This Month":
        start.setDate(1);
        start.setHours(0, 0, 0, 0);
        end.setHours(23, 59, 59, 999);
        return { start, end };
      case "Last Month":
        start.setMonth(now.getMonth() - 1, 1);
        start.setHours(0, 0, 0, 0);
        end.setMonth(now.getMonth(), 0);
        end.setHours(23, 59, 59, 999);
        return { start, end };
      case "This Year":
        start.setMonth(0, 1);
        start.setHours(0, 0, 0, 0);
        end.setHours(23, 59, 59, 999);
        return { start, end };
      case "Last Year":
        start.setFullYear(now.getFullYear() - 1, 0, 1);
        start.setHours(0, 0, 0, 0);
        end.setFullYear(now.getFullYear() - 1, 11, 31);
        end.setHours(23, 59, 59, 999);
        return { start, end };
      case "Date Range":
        if (fromDate && toDate) {
          const rangeEnd = new Date(toDate);
          rangeEnd.setHours(23, 59, 59, 999);
          return { start: fromDate, end: rangeEnd };
        }
        return null;
      default:
        return null;
    }
  };

  // ✅ Search + Date filter
  const filteredOrders = orders.filter((order: any) => {
    const matchesSearch =
      order.id?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      order.shipping?.name?.toLowerCase().includes(searchTerm.toLowerCase());

    let matchesDate = true;
    if (selectedFilter) {
      const range = getDateRange(selectedFilter);
      const dateField = order.date || order.createdAt;
      if (range && dateField) {
        const orderDate = new Date(dateField);
        matchesDate = orderDate >= range.start && orderDate <= range.end;
      }
    }

    return matchesSearch && matchesDate;
  });

  // ✅ Checkbox handlers stert
  // ================= CHECKBOX =================

  const handleSelectAll = (checked: boolean) => {
    if (checked) {
      // ⚠️ filteredOrders use করতে হবে (current visible list)
      setSelectedCustomers(filteredOrders.map((order: any) => order.id));
    } else {
      setSelectedCustomers([]);
    }
  };

  const handleSelectCustomer = (id: string, checked: boolean) => {
    setSelectedCustomers((prev) =>
      checked ? [...prev, id] : prev.filter((item) => item !== id),
    );
  };

  const isAllSelected =
    filteredOrders.length > 0 &&
    filteredOrders.every((order: any) => selectedCustomers.includes(order.id));

  const isIndeterminate = selectedCustomers.length > 0 && !isAllSelected;
  // checkbox end

  const totalPages = Math.ceil(filteredOrders.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentOrders = filteredOrders.slice(startIndex, endIndex);

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

  const applyFilter = () => {
    setCurrentPage(1);
    setShowDropdown(false);
  };

  // ✅ Filter clear করার function
  const clearFilter = () => {
    setSelectedFilter(null);
    setFromDate(null);
    setToDate(null);
    setShowCalendar(false);
    setCurrentPage(1);
    setShowDropdown(false);
  };

  // delete order

  const openDeleteModal = (id: string) => {
    setSelectedOrderId(id);
    setIsDeleteModalOpen(true);
  };
  const handleDelete = async () => {
    if (!selectedOrderId) return;

    try {
      await deleteOrder(selectedOrderId).unwrap();

      toast.success("Order deleted successfully");

      setIsDeleteModalOpen(false);
      setSelectedOrderId(null);
    } catch (error) {
      toast.error("Delete failed");
      console.error(error);
    }
  };

  if (isLoading) return <p>Loading...</p>;
  if (isError) return <p className="text-red-500">Error loading orders</p>;

  return (
    <div className="min-h-screen bg-[#FDF1F7] pb-5">
      <div className="w-full mx-auto">
        {/* Header */}
        <div className="mb-6">
          <h1 className="text-base lg:text-2xl font-bold text-[#333843] mb-2">
            Orders
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
              Orders
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
          </nav>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-6 mb-6">
          {orderOverview?.map((group, index) => (
            <div key={index} className="bg-white p-5 rounded-[12px] shadow-sm">
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
              <div className="grid grid-cols-3">
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
              <h2 className="text-base font-semibold text-[#000000]">
                Customer Orders
                {/* ✅ Active filter badge */}
                {selectedFilter && (
                  <span className="ml-2 text-xs bg-[#C8A8E9] text-white px-2 py-0.5 rounded-full">
                    {selectedFilter}
                    <button onClick={clearFilter} className="ml-1 font-bold">
                      ×
                    </button>
                  </span>
                )}
              </h2>
              <div className="flex flex-wrap items-start sm:items-center gap-4 sm:gap-6">
                {/* Search Bar */}
                <div className="relative w-full sm:w-auto">
                  <input
                    type="text"
                    placeholder="Search by name or order ID..."
                    value={searchTerm}
                    onChange={(e) => {
                      setSearchTerm(e.target.value);
                      setCurrentPage(1); // ✅ search করলে page 1 এ যাবে
                    }}
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
                          strokeWidth="1.5"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                        <path
                          d="M14.442 12.3097H14.4512"
                          stroke="#53545C"
                          strokeWidth="1.5"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                        <path
                          d="M10.0045 12.3097H10.0137"
                          stroke="#53545C"
                          strokeWidth="1.5"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                        <path
                          d="M5.55769 12.3097H5.56695"
                          stroke="#53545C"
                          strokeWidth="1.5"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                        <path
                          d="M14.442 16.1964H14.4512"
                          stroke="#53545C"
                          strokeWidth="1.5"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                        <path
                          d="M10.0045 16.1964H10.0137"
                          stroke="#53545C"
                          strokeWidth="1.5"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                        <path
                          d="M5.55769 16.1964H5.56695"
                          stroke="#53545C"
                          strokeWidth="1.5"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                        <path
                          d="M14.0438 1V4.29078"
                          stroke="#53545C"
                          strokeWidth="1.5"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                        <path
                          d="M5.96564 1V4.29078"
                          stroke="#53545C"
                          strokeWidth="1.5"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                        <path
                          fillRule="evenodd"
                          clipRule="evenodd"
                          d="M14.2383 2.57959H5.77096C2.83427 2.57959 1 4.21552 1 7.22262V16.2723C1 19.3266 2.83427 21.0004 5.77096 21.0004H14.229C17.175 21.0004 19 19.355 19 16.3479V7.22262C19.0092 4.21552 17.1842 2.57959 14.2383 2.57959Z"
                          stroke="#53545C"
                          strokeWidth="1.5"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                      </svg>
                    </span>
                    Filter
                  </button>

                  {showDropdown && (
                    <div className="absolute right-0 mt-2 w-72 bg-white rounded-md shadow-lg z-10 border border-gray-200 p-4">
                      <div className="flex justify-between items-center mb-3">
                        <h3 className="font-medium text-base text-[#1F1F1F]">
                          By Date
                        </h3>
                        {/* ✅ Clear button */}
                        {selectedFilter && (
                          <button
                            onClick={clearFilter}
                            className="text-xs text-red-400 hover:text-red-600"
                          >
                            Clear
                          </button>
                        )}
                      </div>
                      <div className="grid grid-cols-2 gap-2 mb-4">
                        {dateOptions.map((option) => (
                          <div
                            key={option}
                            className="flex items-center p-1 rounded text-[#83898C] cursor-pointer"
                            onClick={() => handleFilterClick(option)}
                          >
                            <div className="relative flex items-center justify-center w-5 h-5">
                              <input
                                checked={isAllSelected}
                                ref={(el) => {
                                  if (el) el.indeterminate = isIndeterminate;
                                }}
                                onChange={(e) =>
                                  handleSelectAll(e.target.checked)
                                }
                                className="peer w-full h-full accent-[#C8A8E9] bg-white border border-[#C8A8E9] rounded appearance-none checked:bg-[#C8A8E9] checked:border-transparent"
                              />
                              <span className="pointer-events-none absolute inset-0 flex items-center justify-center text-white text-xs font-bold peer-checked:flex">
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
                          <DateRangeCalendar
                            fromDate={fromDate}
                            toDate={toDate}
                            setFromDate={setFromDate}
                            setToDate={setToDate}
                          />
                        </div>
                      )}

                      <button
                        onClick={applyFilter}
                        className="w-full bg-[#C8A8E9] text-[#FFF] text-base font-semibold py-2 rounded-[8px] hover:bg-purple-300 transition-colors"
                      >
                        Filter
                      </button>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>

          {/* Table */}
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-[#FDF1F7]">
                <tr>
                  <th className="px-6 py-3 text-left text-base font-semibold text-[#505050] tracking-wider">
                    <div className="flex items-center gap-4">
                      <div className="relative flex items-center justify-center w-5 h-5">
                        <input
                          type="checkbox"
                          checked={isAllSelected}
                          ref={(el) => {
                            if (el) el.indeterminate = isIndeterminate;
                          }}
                          onChange={(e) => handleSelectAll(e.target.checked)}
                          className="peer w-full h-full accent-[#C8A8E9] bg-white border border-gray-300 rounded appearance-none checked:bg-[#C8A8E9] checked:border-transparent"
                        />
                        <span className="pointer-events-none absolute inset-0 flex items-center justify-center text-white text-xs font-bold hidden peer-checked:flex">
                          ✓
                        </span>
                      </div>
                      Order ID
                    </div>
                  </th>
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
                {currentOrders?.map((order: any, index: number) => (
                  <tr key={order.id || index} className="hover:bg-gray-50">
                    {/* Checkbox + Order ID */}
                    <td className="px-6 py-4 whitespace-nowrap text-base text-[#6E7079]">
                      <div className="flex items-center gap-4">
                        <div className="relative flex items-center justify-center w-5 h-5">
                          <input
                            type="checkbox"
                            name="select"
                            checked={selectedCustomers.includes(order.id)}
                            onChange={(e) =>
                              handleSelectCustomer(order.id, e.target.checked)
                            }
                            className="peer w-full h-full accent-[#C8A8E9] bg-white border border-gray-300 rounded appearance-none checked:bg-[#C8A8E9] checked:border-transparent"
                          />
                          <span className="pointer-events-none absolute inset-0 flex items-center justify-center text-white text-xs font-bold hidden peer-checked:flex">
                            ✓
                          </span>
                        </div>
                        <span className="text-[#505050] font-semibold">
                          #{order.id?.slice(-6)?.toUpperCase()}
                        </span>
                      </div>
                    </td>

                    {/* Status */}
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span
                        className={`inline-flex px-2 py-1 text-sm font-medium rounded-[8px] ${getStatusColor(order.status)}`}
                      >
                        {order.status}
                      </span>
                    </td>

                    {/* Amount */}
                    <td className="px-6 py-4 whitespace-nowrap text-base text-[#505050]">
                      $
                      {Number(
                        order.summary?.subtotal ??
                          order.totalAmount ??
                          order.amount ??
                          0,
                      ).toFixed(2)}
                    </td>

                    {/* Customer */}
                    <td className="px-6 py-4 whitespace-nowrap text-base text-[#3CA6FC] hover:text-blue-300 cursor-pointer">
                      {order.shipping?.name ?? order.customer ?? "N/A"}
                    </td>

                    {/* Added */}
                    <td className="px-6 py-4 whitespace-nowrap text-base text-[#505050]">
                      {order.date || order.createdAt
                        ? new Date(
                            order.date || order.createdAt,
                          ).toLocaleDateString("en-GB", {
                            day: "2-digit",
                            month: "short",
                            year: "numeric",
                          })
                        : "—"}
                    </td>

                    {/* Method */}
                    <td className="px-6 py-4 whitespace-nowrap text-base text-[#505050]">
                      {order.paymentMethod ?? "—"}
                    </td>

                    {/* Actions */}
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center gap-2">
                        {/* delete */}
                        <button
                          onClick={() => openDeleteModal(order.id)}
                          className="cursor-pointer"
                        >
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="24"
                            height="24"
                            viewBox="0 0 24 24"
                            fill="none"
                          >
                            <path
                              d="M4.687 6.21262L6.8 18.9756C6.89665 19.5599 7.19759 20.0909 7.6492 20.474C8.10081 20.8571 8.67377 21.0675 9.266 21.0676H12.614M19.312 6.21262L17.2 18.9756C17.1033 19.5599 16.8024 20.0909 16.3508 20.474C15.8992 20.8571 15.3262 21.0675 14.734 21.0676H11.386M10.022 11.1156V16.1646M13.978 11.1156V16.1646M2.75 6.21262H21.25M14.777 6.21262V4.43262C14.777 4.03479 14.619 3.65326 14.3377 3.37196C14.0564 3.09065 13.6748 2.93262 13.277 2.93262H10.723C10.3252 2.93262 9.94364 3.09065 9.66234 3.37196C9.38104 3.65326 9.223 4.03479 9.223 4.43262V6.21262H14.777Z"
                              stroke="#505050"
                              stroke-width="1.5"
                              stroke-linecap="round"
                              stroke-linejoin="round"
                            />
                          </svg>
                        </button>

                        {/* view */}
                        <Link
                          to={`/orders-details-page/${order.id}`}
                          className="cursor-pointer"
                        >
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
                        </Link>
                      </div>
                    </td>
                  </tr>
                ))}

                {currentOrders.length === 0 && (
                  <tr>
                    <td
                      colSpan={7}
                      className="px-6 py-10 text-center text-gray-400 text-sm"
                    >
                      No orders found.
                    </td>
                  </tr>
                )}
              </tbody>
              {/* modal show */}
              {isDeleteModalOpen && (
                <div className="fixed inset-0 flex items-center justify-center bg-black/40 z-50">
                  <div className="bg-white p-6 rounded-lg w-[300px]">
                    <h2 className="text-lg font-semibold mb-4">
                      Are you sure?
                    </h2>

                    <div className="flex justify-end gap-3">
                      <button
                        onClick={() => setIsDeleteModalOpen(false)}
                        className="px-4 py-2 cursor-pointer bg-gray-200 rounded"
                      >
                        Cancel
                      </button>

                      <button
                        onClick={handleDelete}
                        className="px-4 py-2 bg-red-500 cursor-pointer text-white rounded"
                      >
                        Delete
                      </button>
                    </div>
                  </div>
                </div>
              )}
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
        </div>
      </div>
    </div>
  );
};

export default OrderListPage;
