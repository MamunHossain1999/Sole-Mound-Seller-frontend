import React, { useState } from "react";
import { Search, ChevronDown, ChevronLeft, ChevronRight } from "lucide-react";
import { Link, useParams } from "react-router-dom";
import { useGetUserByIdQuery } from "@/redux/api/userApi";
import { useGetAllOrdersQuery } from "@/redux/api/orderApi";

// ===================== Types =====================

interface Shipping {
  name: string;
  email: string;
  phone: string;
  address: string;
  city: string;
  country: string;
  postalCode: string;
}

interface OrderSummary {
  total?: number;
}

interface Order {
  id?: string;
  transactionId?: string;
  userId?: string;
  name?: string;
  image?: string;
  quantity?: number;
  status?: string;
  total?: string | number;
  summary?: OrderSummary;
  date?: string;
  shipping?: Shipping;
}

interface UserProfile {
  name?: string;
  email?: string;
  phone?: string;
  avatar?: string;
  address?: string;
  shipping?: Shipping;
}

// ===================== Constants =====================

const ITEMS_PER_PAGE = 10;

// ===================== Helpers =====================

const getStatusColor = (status: string = ""): string => {
  switch (status) {
    case "paid":
      return "bg-green-100 text-green-700";
    case "pending":
      return "bg-yellow-100 text-yellow-700";
    case "unpaid":
      return "bg-red-100 text-red-700";
    case "Delivered":
      return "bg-blue-100 text-blue-700";
    default:
      return "bg-gray-100 text-gray-700";
  }
};

const formatTotal = (order: Order): string => {
  if (typeof order.total === "string") return order.total;
  return `$${(order.summary?.total ?? 0).toFixed(2)}`;
};

// ===================== Sub-components =====================

const BreadcrumbArrow: React.FC = () => (
  <span className="mx-2">
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="18"
      height="18"
      viewBox="0 0 18 18"
      fill="none"
    >
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M6.59467 3.96967C6.30178 4.26256 6.30178 4.73744 6.59467 5.03033L10.5643 9L6.59467 12.9697C6.30178 13.2626 6.30178 13.7374 6.59467 14.0303C6.88756 14.3232 7.36244 14.3232 7.65533 14.0303L12.4205 9.26516C12.5669 9.11872 12.5669 8.88128 12.4205 8.73484L7.65533 3.96967C7.36244 3.67678 6.88756 3.67678 6.59467 3.96967Z"
        fill="#B6B7BC"
      />
    </svg>
  </span>
);

interface StatCardProps {
  icon: React.ReactNode;
  label: string;
  value: string | number;
}

const StatCard: React.FC<StatCardProps> = ({ icon, label, value }) => (
  <div className="bg-white rounded-lg p-6 shadow-sm">
    <div className="flex items-center">
      <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center">
        {icon}
      </div>
      <div className="ml-4">
        <p className="text-sm text-gray-600">{label}</p>
        <p className="text-2xl font-semibold text-gray-900">{value}</p>
      </div>
    </div>
  </div>
);

// ===================== Main Component =====================

const CustomerDetailsPage: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [currentPage, setCurrentPage] = useState<number>(1);

  const { id } = useParams<{ id: string }>();

  const { data: profile, isLoading } = useGetUserByIdQuery(id as string);
  const { data: rawOrders = [] } = useGetAllOrdersQuery({});

  const typedProfile = profile as UserProfile | undefined;
  const allOrders = rawOrders as Order[];

  // Filter orders for this user
  const userOrders: Order[] = allOrders.filter((order) => order.userId === id);

  // Total amount spent
  const totalAmount: number = userOrders.reduce(
    (sum, order) => sum + (order.summary?.total ?? 0),
    0,
  );

  // Search filter
  const filteredOrders: Order[] = userOrders.filter((item) => {
    const search = searchTerm.toLowerCase();
    const name = item.name?.toLowerCase() ?? "";
    const transactionId = item.transactionId?.toLowerCase() ?? "";
    return name.includes(search) || transactionId.includes(search);
  });

  // Pagination
  const totalPages: number = Math.ceil(filteredOrders.length / ITEMS_PER_PAGE);

  const paginatedOrders: Order[] = filteredOrders.slice(
    (currentPage - 1) * ITEMS_PER_PAGE,
    currentPage * ITEMS_PER_PAGE,
  );

  const handlePageChange = (page: number): void => {
    if (page >= 1 && page <= totalPages) {
      setCurrentPage(page);
    }
  };

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>): void => {
    setSearchTerm(e.target.value);
    setCurrentPage(1);
  };

  const handleClearSearch = (): void => {
    setSearchTerm("");
    setCurrentPage(1);
  };

  const getPageNumbers = (): number[] => {
    const maxVisible = 5;
    let start = Math.max(1, currentPage - Math.floor(maxVisible / 2));
    const end = Math.min(totalPages, start + maxVisible - 1);
    if (end - start + 1 < maxVisible) {
      start = Math.max(1, end - maxVisible + 1);
    }
    return Array.from({ length: end - start + 1 }, (_, i) => start + i);
  };

  const shipping = userOrders?.[0]?.shipping ?? null;

  // ---- Loading state ----
  if (isLoading) {
    return (
      <div className="bg-pink-50 min-h-screen p-6 flex items-center justify-center">
        <p className="text-lg">Loading profile...</p>
      </div>
    );
  }

  // ---- Render ----
  return (
    <div className="min-h-screen bg-gray-50">
      {/* ── Header ── */}
      <div className="flex items-center justify-between mb-8 p-4">
        <div>
          <h1 className="text-lg md:text-2xl font-bold text-[#333843]">
            Customers Details
          </h1>
          <div className="flex items-center mt-1">
            <span className="text-[#A8537B] text-sm font-normal">
              <Link to="/">Dashboard</Link>
            </span>
            <BreadcrumbArrow />
            <span className="text-[#A8537B] text-sm font-normal">
              <Link to="/customers">All Customers</Link>
            </span>
            <BreadcrumbArrow />
            <span className="text-[#919191] text-sm font-normal">
              Customer Details
            </span>
          </div>
        </div>
      </div>

      <div className="mx-auto py-8">
        {/* ── Stats Cards ── */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <StatCard
            label="Total Balance"
            value={`$${totalAmount.toFixed(2)}`}
            icon={
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="20"
                height="18"
                viewBox="0 0 20 18"
                fill="none"
              >
                <path
                  d="M14.5137 0C17.9599 0 19.9961 1.97865 19.9961 5.33789V5.375H15.7617C13.7911 5.3785 12.195 6.9351 12.1914 8.85645C12.1887 10.7822 13.7866 12.346 15.7617 12.3486H20V12.6543C20 16.0135 17.9637 17.9999 14.5176 18H5.4834C2.03638 17.9999 0 16.0135 0 12.6543V5.33789C0 1.9787 2.03638 6.02137e-05 5.4834 0H14.5137ZM4.73926 3.875C4.31996 3.87689 3.97951 4.20849 3.97754 4.61816C3.97576 5.02974 4.31717 5.3653 4.73926 5.36719H10.3906C10.8127 5.36524 11.1541 5.02959 11.1523 4.61719C11.1503 4.20573 10.8049 3.87327 10.3828 3.875H4.73926Z"
                  fill="#C8A8E9"
                />
                <path
                  opacity="0.4"
                  d="M14.0374 9.29706C14.2465 10.2482 15.0805 10.9175 16.0326 10.9001H19.2825C19.6787 10.9001 20 10.572 20 10.1664V7.63488C19.9991 7.23022 19.6787 6.90126 19.2825 6.90039H15.9561C14.8731 6.90387 13.9983 7.80284 14 8.91067C14 9.04033 14.0128 9.17 14.0374 9.29706Z"
                  fill="#C8A8E9"
                />
                <circle cx="16" cy="8.90039" r="1" fill="#C8A8E9" />
              </svg>
            }
          />

          <StatCard
            label="Total Orders"
            value={userOrders.length}
            icon={
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="21"
                height="21"
                viewBox="0 0 21 21"
                fill="none"
              >
                <path
                  opacity="0.4"
                  fillRule="evenodd"
                  clipRule="evenodd"
                  d="M3.91064 18.5884C3.91064 17.7484 4.59064 17.0684 5.43064 17.0684C6.26064 17.0684 6.94064 17.7484 6.94064 18.5884C6.94064 19.4184 6.26064 20.0984 5.43064 20.0984C4.59064 20.0984 3.91064 19.4184 3.91064 18.5884ZM15.1606 18.5884C15.1606 17.7484 15.8406 17.0684 16.6806 17.0684C17.5106 17.0684 18.1906 17.7484 18.1906 18.5884C18.1906 19.4184 17.5106 20.0984 16.6806 20.0984C15.8406 20.0984 15.1606 19.4184 15.1606 18.5884Z"
                  fill="#C8A8E9"
                />
                <path
                  fillRule="evenodd"
                  clipRule="evenodd"
                  d="M18.1907 4.34933C18.8007 4.34933 19.2007 4.55933 19.6007 5.01933C20.0007 5.47933 20.0707 6.13933 19.9807 6.73833L19.0307 13.2983C18.8507 14.5593 17.7707 15.4883 16.5007 15.4883H5.59074C4.26074 15.4883 3.16074 14.4683 3.05074 13.1493L2.13074 2.24833L0.620742 1.98833C0.220742 1.91833 -0.0592579 1.52833 0.0107421 1.12833C0.0807421 0.71833 0.470742 0.44833 0.880742 0.50833L3.26574 0.86833C3.60574 0.92933 3.85574 1.20833 3.88574 1.54833L4.07574 3.78833C4.10574 4.10933 4.36574 4.34933 4.68574 4.34933H18.1907ZM12.1307 9.54833H14.9007C15.3207 9.54833 15.6507 9.20833 15.6507 8.79833C15.6507 8.37833 15.3207 8.04833 14.9007 8.04833H12.1307C11.7107 8.04833 11.3807 8.37833 11.3807 8.79833C11.3807 9.20833 11.7107 9.54833 12.1307 9.54833Z"
                  fill="#C8A8E9"
                />
              </svg>
            }
          />

          <StatCard
            label="Rewards Point"
            value={1400}
            icon={
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="20"
                height="20"
                viewBox="0 0 20 20"
                fill="none"
              >
                <path
                  opacity="0.4"
                  d="M10.9763 1.11361L13.2028 5.58789C13.3668 5.91205 13.6799 6.13717 14.041 6.18719L19.042 6.91556C19.3341 6.95658 19.5992 7.11066 19.7782 7.34578C19.9552 7.5779 20.0312 7.87205 19.9882 8.1612C19.9532 8.40132 19.8402 8.62343 19.6672 8.79352L16.0434 12.3063C15.7783 12.5514 15.6583 12.9146 15.7223 13.2698L16.6145 18.2083C16.7095 18.8046 16.3144 19.3669 15.7223 19.48C15.4783 19.519 15.2282 19.478 15.0082 19.3659L10.5472 17.0417C10.2161 16.8746 9.82505 16.8746 9.49398 17.0417L5.03303 19.3659C4.48491 19.657 3.80576 19.4589 3.5007 18.9187C3.38767 18.7036 3.34766 18.4584 3.38467 18.2193L4.27686 13.2798C4.34088 12.9256 4.21985 12.5604 3.95579 12.3153L0.332017 8.80452C-0.0990758 8.38831 -0.112079 7.70296 0.30301 7.27175C0.312012 7.26274 0.322015 7.25274 0.332017 7.24273C0.504054 7.06764 0.730102 6.95658 0.974155 6.92757L5.97523 6.1982C6.33531 6.14717 6.64837 5.92406 6.81341 5.59789L8.95987 1.11361C9.15091 0.729419 9.547 0.490297 9.97709 0.500302H10.1111C10.4842 0.545325 10.8093 0.776443 10.9763 1.11361Z"
                  fill="#C8A8E9"
                />
                <path
                  d="M9.99201 16.9171C9.79831 16.9231 9.6096 16.9752 9.43987 17.0682L5.00072 19.3871C4.45756 19.6464 3.80756 19.4452 3.50303 18.9258C3.39021 18.7136 3.34927 18.4704 3.38721 18.2322L4.27384 13.3032C4.33375 12.9449 4.21394 12.5806 3.95334 12.3284L0.327937 8.81848C-0.102398 8.39713 -0.110386 7.70556 0.310963 7.27421C0.316954 7.26821 0.321947 7.2632 0.327937 7.2582C0.499672 7.08806 0.72133 6.97597 0.959961 6.94094L5.96523 6.20433C6.32767 6.1583 6.64219 5.93211 6.80194 5.60384L8.97758 1.06312C9.18426 0.696818 9.58065 0.478639 10 0.501658C9.99201 0.798902 9.99201 16.715 9.99201 16.9171Z"
                  fill="#C8A8E9"
                />
              </svg>
            }
          />
        </div>

        {/* ── Customer Profile Card ── */}
        <div className="bg-white rounded-lg p-6 shadow-sm mb-8">
          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <div className="w-16 h-16 bg-gray-300 rounded-full flex items-center justify-center overflow-hidden">
                <img
                  src={typedProfile?.avatar}
                  alt="Profile"
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="ml-4">
                <div className="flex items-center">
                  <h2 className="text-lg font-semibold text-gray-900">
                    {typedProfile?.name ?? "N/A"}
                  </h2>
                  <span className="ml-2 w-2 h-2 bg-green-500 rounded-full" />
                </div>
                <p className="text-sm text-gray-600">
                  {typedProfile?.email ?? "N/A"}
                </p>
                <p className="text-sm text-gray-600">
                  Phone: {typedProfile?.phone ?? "N/A"}
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* ── Details + Transaction Grid ── */}
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Customer Details Sidebar */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-lg p-6 shadow-sm">
              <div className="flex items-center justify-between mb-4">
                <h3 className="font-semibold text-gray-900">
                  Customer Details
                </h3>
                <span className="px-2 py-1 bg-green-100 text-green-700 text-xs rounded-full">
                  Active User
                </span>
              </div>
              <div className="space-y-4 text-sm">
                <div>
                  <p className="text-gray-600">Account ID</p>
                  <p className="font-medium text-blue-600">#{id}</p>
                </div>
                <div>
                  <p className="text-gray-600">Wallet Balance</p>
                  <p className="font-medium text-blue-600">
                    ${totalAmount.toFixed(2)}
                  </p>
                </div>
                <div>
                  <p className="text-gray-600">Delivery Address</p>

                  {shipping ? (
                    <>
                      <p className="font-medium">{shipping.name}</p>
                      <p className="text-sm">{shipping.address}</p>
                      <p className="text-sm">
                        {shipping.city} {shipping.postalCode}
                      </p>
                      <p className="text-xs text-gray-500">
                        {shipping.country}
                      </p>
                    </>
                  ) : (
                    <p className="text-red-500 text-sm">
                      No delivery address found
                    </p>
                  )}
                </div>
                <div>
                  <p className="text-gray-600">Language</p>
                  <p className="font-medium">English</p>
                </div>
                <div>
                  <p className="text-gray-600">Total Orders</p>
                  <p className="font-medium text-blue-600">
                    {userOrders.length}
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Transaction History */}
          <div className="lg:col-span-3">
            <div className="bg-white rounded-lg shadow-sm">
              {/* Table Header */}
              <div className="p-6 border-b border-gray-200">
                <div className="flex items-center justify-between">
                  <h3 className="font-semibold text-gray-900">
                    Transaction History
                  </h3>
                  <div className="flex items-center space-x-3">
                    <div className="relative">
                      <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-4 h-4" />
                      <input
                        type="text"
                        placeholder="Search by name or transaction id..."
                        value={searchTerm}
                        onChange={handleSearch}
                        className="pl-10 pr-8 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent w-64"
                      />
                      {searchTerm && (
                        <button
                          onClick={handleClearSearch}
                          className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-red-500"
                        >
                          ✕
                        </button>
                      )}
                    </div>
                  </div>
                </div>
              </div>

              {/* Table */}
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead className="bg-gray-50">
                    <tr>
                      {(
                        [
                          { label: "Invoice ID", sortable: true },
                          { label: "Product", sortable: false },
                          { label: "Status", sortable: true },
                          { label: "Total", sortable: false },
                          { label: "Date", sortable: true },
                        ] as { label: string; sortable: boolean }[]
                      ).map(({ label, sortable }) => (
                        <th
                          key={label}
                          className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                        >
                          {sortable ? (
                            <div className="flex items-center">
                              {label} <ChevronDown className="ml-1 w-4 h-4" />
                            </div>
                          ) : (
                            label
                          )}
                        </th>
                      ))}
                    </tr>
                  </thead>

                  <tbody className="bg-white divide-y divide-gray-200">
                    {paginatedOrders.length > 0 ? (
                      paginatedOrders.map((transaction, index) => (
                        <tr
                          key={transaction.id ?? index}
                          className="hover:bg-gray-50"
                        >
                          <td className="px-6 py-4 whitespace-nowrap">
                            <span className="text-blue-600 font-medium">
                              {transaction.transactionId ??
                                transaction.id ??
                                "N/A"}
                            </span>
                          </td>

                          <td className="px-6 py-4 whitespace-nowrap">
                            <div className="flex items-center">
                              <div className="w-10 h-10 bg-gray-200 rounded-lg mr-3 overflow-hidden">
                                <img
                                  src={transaction.image}
                                  alt={transaction.name ?? "product"}
                                  className="w-full h-full object-cover"
                                />
                              </div>
                              <div>
                                <p className="text-sm font-medium text-gray-900">
                                  {transaction.name ?? "N/A"}
                                </p>
                                {transaction.quantity != null && (
                                  <p className="text-xs text-gray-500">
                                    Qty: {transaction.quantity}
                                  </p>
                                )}
                              </div>
                            </div>
                          </td>

                          <td className="px-6 py-4 whitespace-nowrap">
                            <span
                              className={`px-2 py-1 text-xs rounded-full ${getStatusColor(transaction.status)}`}
                            >
                              {transaction.status ?? "N/A"}
                            </span>
                          </td>

                          <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                            {formatTotal(transaction)}
                          </td>

                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                            {transaction.date ?? "N/A"}
                          </td>
                        </tr>
                      ))
                    ) : (
                      <tr>
                        <td
                          colSpan={5}
                          className="px-6 py-10 text-center text-gray-400 text-sm"
                        >
                          No orders found.
                        </td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>

              {/* Pagination */}
              {totalPages > 1 && (
                <div className="px-6 py-4 border-t border-gray-200 flex items-center justify-between">
                  <p className="text-sm text-gray-500">
                    Showing{" "}
                    <span className="font-medium">
                      {(currentPage - 1) * ITEMS_PER_PAGE + 1}
                    </span>{" "}
                    –{" "}
                    <span className="font-medium">
                      {Math.min(
                        currentPage * ITEMS_PER_PAGE,
                        filteredOrders.length,
                      )}
                    </span>{" "}
                    of{" "}
                    <span className="font-medium">{filteredOrders.length}</span>{" "}
                    orders
                  </p>

                  <div className="flex items-center space-x-1">
                    <button
                      onClick={() => handlePageChange(currentPage - 1)}
                      disabled={currentPage === 1}
                      className="p-2 rounded-lg border border-gray-300 text-gray-500 hover:bg-gray-50 disabled:opacity-40 disabled:cursor-not-allowed transition-colors"
                    >
                      <ChevronLeft className="w-4 h-4" />
                    </button>

                    {getPageNumbers().map((page) => (
                      <button
                        key={page}
                        onClick={() => handlePageChange(page)}
                        className={`w-9 h-9 rounded-lg text-sm font-medium transition-colors ${
                          page === currentPage
                            ? "bg-purple-500 text-white border border-purple-500"
                            : "border border-gray-300 text-gray-700 hover:bg-gray-50"
                        }`}
                      >
                        {page}
                      </button>
                    ))}

                    <button
                      onClick={() => handlePageChange(currentPage + 1)}
                      disabled={currentPage === totalPages}
                      className="p-2 rounded-lg border border-gray-300 text-gray-500 hover:bg-gray-50 disabled:opacity-40 disabled:cursor-not-allowed transition-colors"
                    >
                      <ChevronRight className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CustomerDetailsPage;
