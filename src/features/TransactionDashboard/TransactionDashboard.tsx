import React, { useState } from "react";
import { Search } from "lucide-react";

interface Transaction {
  id: string;
  paid: number;
  method: "Mastercard" | "Visa" | "Paypal" | "Amex";
  date: string;
}

const TransactionDashboard: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedMethod, setSelectedMethod] = useState("");
  const [selectedTransaction, setSelectedTransaction] = useState<string | null>(
    null
  );

  const transactions: Transaction[] = [
    {
      id: "#456667",
      paid: 294.0,
      method: "Mastercard",
      date: "16.12.2020, 14:21",
    },
    {
      id: "#456667",
      paid: 294.0,
      method: "Visa",
      date: "16.12.2020, 14:21",
    },
    {
      id: "#456667",
      paid: 294.0,
      method: "Paypal",
      date: "16.12.2020, 14:21",
    },
    {
      id: "#456667",
      paid: 294.0,
      method: "Mastercard",
      date: "16.12.2020, 14:21",
    },
    {
      id: "#456667",
      paid: 294.0,
      method: "Visa",
      date: "16.12.2020, 14:21",
    },
    {
      id: "#456667",
      paid: 294.0,
      method: "Mastercard",
      date: "16.12.2020, 14:21",
    },
    {
      id: "#456667",
      paid: 294.0,
      method: "Visa",
      date: "16.12.2020, 14:21",
    },
    {
      id: "#456667",
      paid: 294.0,
      method: "Mastercard",
      date: "16.12.2020, 14:21",
    },
    {
      id: "#456667",
      paid: 294.0,
      method: "Amex",
      date: "16.12.2020, 14:21",
    },
  ];

  const getPaymentIcon = (method: string) => {
    switch (method) {
      case "Mastercard":
        return (
          <div className="flex items-center space-x-2">
            <div className="flex">
              <div className="w-5 h-3 bg-red-500 rounded-l-full"></div>
              <div className="w-5 h-3 bg-yellow-500 rounded-r-full -ml-2"></div>
            </div>
            <span className="text-sm text-gray-500">Master card</span>
          </div>
        );
      case "Visa":
        return (
          <div className="flex items-center space-x-2">
            <div className="px-2 py-1 bg-blue-600 text-white text-xs font-bold rounded">
              VISA
            </div>
            <span className="text-sm text-gray-500">Visa</span>
          </div>
        );
      case "Paypal":
        return (
          <div className="flex items-center space-x-2">
            <div className="w-6 h-4 bg-blue-600 rounded flex items-center justify-center">
              <span className="text-white text-xs font-bold">P</span>
            </div>
            <span className="text-sm text-gray-500">Paypal</span>
          </div>
        );
      case "Amex":
        return (
          <div className="flex items-center space-x-2">
            <div className="w-6 h-4 bg-blue-400 rounded flex items-center justify-center">
              <span className="text-white text-xs font-bold">A</span>
            </div>
            <span className="text-sm text-gray-500">Amex</span>
          </div>
        );
      default:
        return <span className="text-sm text-gray-500">{method}</span>;
    }
  };

  const filteredTransactions = transactions.filter((transaction) => {
    const matchesSearch =
      transaction.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
      transaction.paid.toString().includes(searchTerm);
    const matchesMethod =
      !selectedMethod || transaction.method === selectedMethod;
    return matchesSearch && matchesMethod;
  });

  const handleTransactionSelect = (transactionId: string) => {
    setSelectedTransaction(transactionId);
  };

  return (
    <div className="min-h-screen w-full mx-auto">
      <div className="bg-white rounded-[8px]">
        {/* Header */}
        <div className="pb-10 px-4 bg-[#FDF1F7] ">
          <h1 className="text-xl md:text-2xl font-bold text-[#333843]">
            Transaction
          </h1>
          <div className="flex items-center text-sm text-gray-500 mt-1">
            <span className="text-sm font-medium text-[#A8537B] cursor-pointer">
              Dashboard
            </span>
            <span className="mx-2 text-[#919191]">
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
            <span className="text-sm font-medium text-[#919191] cursor-pointer">
              Transaction
            </span>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Transaction Table */}
          <div className="lg:col-span-2">
            {/* Search and Filter */}
            <div className="p-4 border-b bg-white mb-12">
              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 w-full">
                {/* Search Box */}
                <div className="relative w-full sm:max-w-sm md:max-w-md lg:max-w-lg xl:max-w-xl mx-auto sm:mx-0">
                  <input
                    type="text"
                    placeholder="Search for anything..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="w-full pr-10 pl-4 py-2 border border-[#E2E3E8] rounded-full focus:outline-none focus:ring-1 focus:ring-purple-400 focus:border-transparent text-sm sm:text-base"
                  />
                  <Search className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 w-4 h-4" />
                </div>

                {/* Method Dropdown */}
                <div className="relative w-full sm:w-auto flex justify-end">
                  <select
                    value={selectedMethod}
                    onChange={(e) => setSelectedMethod(e.target.value)}
                    className="appearance-none w-full sm:w-auto text-center cursor-pointer text-gray-800 border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:border-transparent"
                  >
                    <option value="">Method</option>
                    <option value="Mastercard">Mastercard</option>
                    <option value="Visa">Visa</option>
                    <option value="Paypal">Paypal</option>
                    <option value="Amex">Amex</option>
                  </select>
                </div>
              </div>
            </div>

            <div className="">
              {/* Table */}
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead className="bg-[#FDF1F7] ">
                    <tr>
                      <th className="px-6 py-4 text-left text-base font-semibold text-[#1F1F1F] uppercase tracking-wider">
                        Transaction ID
                      </th>
                      <th className="px-6 py-4 text-left text-base font-semibold text-[#1F1F1F] uppercase tracking-wider">
                        Paid
                      </th>
                      <th className="px-6 py-4 text-left text-base font-semibold text-[#1F1F1F] uppercase tracking-wider">
                        Method
                      </th>
                      <th className="px-6 py-4 text-left text-base font-semibold text-[#1F1F1F] uppercase tracking-wider">
                        Date
                      </th>
                      <th className="px-6 py-4 text-left text-base font-semibold text-[#1F1F1F] uppercase tracking-wider">
                        Action
                      </th>
                    </tr>
                  </thead>
                  <tbody className="bg-white ">
                    {filteredTransactions.map((transaction, index) => (
                      <tr
                        key={`${transaction.id}-${index}`}
                        className={`hover:bg-gray-50 cursor-pointer ${
                          selectedTransaction === `${transaction.id}-${index}`
                            ? "bg-purple-50"
                            : ""
                        }`}
                        onClick={() =>
                          handleTransactionSelect(`${transaction.id}-${index}`)
                        }
                      >
                        <td className="px-6 py-4 whitespace-nowrap text-base font-normal text-[#1F1F1F]">
                          {transaction.id}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-base font-normal text-[#1F1F1F]">
                          ${transaction.paid.toFixed(2)}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-base text-[#919191]">
                          {getPaymentIcon(transaction.method)}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-base font-normal text-[#919191]">
                          {transaction.date}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <button className="text-[12px] border border-[#E2E3E8] cursor-pointer rounded-[4px] py-2 px-4 text-[#1F1F1F] font-bold">
                            Details
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>

          {/* Right Panel */}
          <div className="lg:col-span-1 ">
            <div className="bg-[#FDF1F7] lg:h-[753px] rounded-lg shadow-sm mt-5 p-6 lg:mr-3">
              <div className="text-center text-[#505050] text-base font-semibold py-12">
                <p className="text-base">Please select transaction</p>
                <p className="text-base">to see details</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TransactionDashboard;
