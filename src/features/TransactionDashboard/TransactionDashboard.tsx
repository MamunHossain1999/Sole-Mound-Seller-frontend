import React, { useState } from "react";
import { Search, ChevronLeft, ChevronRight } from "lucide-react"; // Added icons
import { useGetAllOrdersQuery } from "@/redux/api/orderApi";
import { useNavigate } from "react-router";

const TransactionDashboard: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedMethod, setSelectedMethod] = useState("");
  const [selectedTransaction, setSelectedTransaction] = useState<string | null>(null);
  
  // --- Pagination State ---
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10; 

  const navigate = useNavigate();
  const { data: transactions = [], isLoading, isError } = useGetAllOrdersQuery();

  // Helper for Payment Icons (kept your logic)
  const getPaymentIcon = (method?: string) => {
    const normalized = method?.toLowerCase();
    switch (normalized) {
      case "mastercard":
        return (
          <div className="flex items-center space-x-2">
            <div className="flex">
              <div className="w-5 h-3 bg-red-500 rounded-l-full"></div>
              <div className="w-5 h-3 bg-yellow-500 rounded-r-full -ml-2"></div>
            </div>
            <span className="text-sm text-gray-500">Mastercard</span>
          </div>
        );
      case "visa":
        return (
          <div className="flex items-center space-x-2">
            <div className="px-2 py-1 bg-blue-600 text-white text-xs font-bold rounded">VISA</div>
            <span className="text-sm text-gray-500">Visa</span>
          </div>
        );
      default:
        return <span className="text-sm text-gray-400">{method || "Unknown"}</span>;
    }
  };

  // 1. Filter Logic
  const filteredTransactions = transactions.filter((transaction) => {
    const id = transaction.id ?? "";
    const total = transaction.summary?.total ?? 0;
    const method = transaction.paymentMethod ?? "";
    const matchesSearch = id.toLowerCase().includes(searchTerm.toLowerCase()) || String(total).includes(searchTerm);
    const matchesMethod = !selectedMethod || method === selectedMethod;
    return matchesSearch && matchesMethod;
  });

  // 2. Pagination Logic
  const totalPages = Math.ceil(filteredTransactions.length / itemsPerPage);
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = filteredTransactions.slice(indexOfFirstItem, indexOfLastItem);

  const handlePageChange = (pageNumber: number) => {
    setCurrentPage(pageNumber);
    // Scroll to top of table or container if needed
  };

  const handleTransactionSelect = (transactionId: string) => {
    setSelectedTransaction(transactionId);
  };

  if (isLoading) return <p>Loading...</p>;
  if (isError) return <p className="text-red-500">Something went wrong</p>;

  return (
    <div className="min-h-screen w-full mx-auto">
      <div className="bg-white rounded-[8px]">
        {/* Header Section (Same as before) */}
        <div className="pb-10 px-4 bg-[#FDF1F7]">
          <h1 className="text-xl md:text-2xl font-bold text-[#333843]">Transaction</h1>
          {/* Breadcrumbs ... */}
        </div>

        <div className="grid grid-cols-1 gap-6">
          <div className="lg:col-span-2">
            {/* Search and Filter Section */}
            <div className="p-4 border-b bg-white mb-12">
              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 w-full">
                <div className="relative w-full sm:max-w-sm mx-auto sm:mx-0">
                  <input
                    type="text"
                    placeholder="Search for anything..."
                    value={searchTerm}
                    onChange={(e) => {
                      setSearchTerm(e.target.value);
                      setCurrentPage(1); // Reset to page 1 on search
                    }}
                    className="w-full pr-10 pl-4 py-2 border border-[#E2E3E8] rounded-full text-sm"
                  />
                  <Search className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 w-4 h-4" />
                </div>

                <div className="relative w-full sm:w-auto flex justify-end">
                  <select
                    value={selectedMethod}
                    onChange={(e) => {
                      setSelectedMethod(e.target.value);
                      setCurrentPage(1); // Reset to page 1 on filter
                    }}
                    className="appearance-none w-full sm:w-auto text-center cursor-pointer border border-gray-300 rounded-lg px-4 py-2"
                  >
                    <option value="">Method</option>
                    <option value="Mastercard">Mastercard</option>
                    <option value="Visa">Visa</option>
                    {/* ... other options */}
                  </select>
                </div>
              </div>
            </div>

            {/* Table */}
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-[#FDF1F7]">
                  <tr>
                    <th className="px-6 py-4 text-left text-base font-semibold text-[#1F1F1F]">Transaction ID</th>
                    <th className="px-6 py-4 text-left text-base font-semibold text-[#1F1F1F]">Paid</th>
                    <th className="px-6 py-4 text-left text-base font-semibold text-[#1F1F1F]">Method</th>
                    <th className="px-6 py-4 text-left text-base font-semibold text-[#1F1F1F]">Date</th>
                    <th className="px-6 py-4 text-left text-base font-semibold text-[#1F1F1F]">Action</th>
                  </tr>
                </thead>
                <tbody className="bg-white">
                  {currentItems.map((transaction, index) => (
                    <tr
                      key={`${transaction.id}-${index}`}
                      className={`hover:bg-gray-50 cursor-pointer ${
                        selectedTransaction === transaction.id ? "bg-purple-50" : ""
                      }`}
                      onClick={() => handleTransactionSelect(transaction.id)}
                    >
                      <td className="px-6 py-4 whitespace-nowrap">{transaction.id}</td>
                      <td className="px-6 py-4 whitespace-nowrap">${Number(transaction.summary?.total ?? 0).toFixed(2)}</td>
                      <td className="px-6 py-4 whitespace-nowrap">{getPaymentIcon(transaction.paymentMethod)}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-[#919191]">{transaction.date}</td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <button
                          onClick={() => navigate(`/transaction-details-page/${transaction.id}`)}
                          className="text-[12px] border border-[#E2E3E8] rounded-[4px] py-2 px-4 font-bold"
                        >
                          Details
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* --- Pagination UI --- */}
            <div className="flex items-center justify-between px-6 py-4 bg-white border-t border-gray-200">
              <div className="text-sm text-gray-700">
                Showing <span className="font-medium">{indexOfFirstItem + 1}</span> to{" "}
                <span className="font-medium">
                  {Math.min(indexOfLastItem, filteredTransactions.length)}
                </span>{" "}
                of <span className="font-medium">{filteredTransactions.length}</span> results
              </div>
              
              <div className="flex space-x-2">
                <button
                  onClick={() => handlePageChange(currentPage - 1)}
                  disabled={currentPage === 1}
                  className="p-2 border rounded-md disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-50"
                >
                  <ChevronLeft className="w-5 h-5" />
                </button>

                {/* Optional: Render page numbers */}
                {[...Array(totalPages)].map((_, i) => (
                  <button
                    key={i + 1}
                    onClick={() => handlePageChange(i + 1)}
                    className={`px-3 py-1 border rounded-md text-sm ${
                      currentPage === i + 1 ? "bg-[#A8537B] text-white" : "hover:bg-gray-50"
                    }`}
                  >
                    {i + 1}
                  </button>
                )).slice(Math.max(0, currentPage - 3), Math.min(totalPages, currentPage + 2))}

                <button
                  onClick={() => handlePageChange(currentPage + 1)}
                  disabled={currentPage === totalPages}
                  className="p-2 border rounded-md disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-50"
                >
                  <ChevronRight className="w-5 h-5" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TransactionDashboard;