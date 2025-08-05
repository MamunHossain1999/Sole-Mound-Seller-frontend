import React, { useState } from "react";
import { Plus, ChevronDown, ChevronLeft, ChevronRight } from "lucide-react";

interface Category {
  id: string;
  name: string;
  icon: string;
  iconBg: string;
  sales: number;
  added: number;
  stock: number;
  date: string;
  status: "active" | "inactive";
}

const initialCategories: Category[] = [
  {
    id: "1",
    name: "Watch",
    icon: "⌚",
    iconBg: "bg-gray-200",
    sales: 4901,
    added: 234,
    stock: 24,
    date: "24 Dec 2022",
    status: "active",
  },
  {
    id: "2",
    name: "PC Desktop",
    icon: "🖥️",
    iconBg: "bg-blue-200",
    sales: 11902,
    added: 451,
    stock: 12,
    date: "12 Dec 2022",
    status: "active",
  },
  {
    id: "3",
    name: "Audio",
    icon: "🎧",
    iconBg: "bg-yellow-200",
    sales: 900,
    added: 132,
    stock: 21,
    date: "21 Oct 2022",
    status: "active",
  },
  {
    id: "4",
    name: "Smartphone",
    icon: "📱",
    iconBg: "bg-gray-200",
    sales: 15020,
    added: 901,
    stock: 29,
    date: "29 Dec 2022",
    status: "active",
  },
  {
    id: "5",
    name: "Camera",
    icon: "📷",
    iconBg: "bg-gray-800",
    sales: 3245,
    added: 1201,
    stock: 21,
    date: "21 Oct 2022",
    status: "inactive",
  },
  {
    id: "6",
    name: "Shoes",
    icon: "👟",
    iconBg: "bg-red-200",
    sales: 10405,
    added: 2403,
    stock: 19,
    date: "19 Sep 2022",
    status: "active",
  },
  {
    id: "7",
    name: "Toys",
    icon: "🧸",
    iconBg: "bg-orange-200",
    sales: 1100,
    added: 400,
    stock: 19,
    date: "19 Sep 2022",
    status: "active",
  },
  {
    id: "8",
    name: "Bag & Pouch",
    icon: "🎒",
    iconBg: "bg-gray-300",
    sales: 1200,
    added: 98,
    stock: 19,
    date: "19 Sep 2022",
    status: "active",
  },
  {
    id: "9",
    name: "Hat",
    icon: "🎩",
    iconBg: "bg-gray-400",
    sales: 720,
    added: 720,
    stock: 10,
    date: "10 Aug 2022",
    status: "active",
  },
  {
    id: "10",
    name: "Beauty",
    icon: "💄",
    iconBg: "bg-pink-200",
    sales: 329,
    added: 199,
    stock: 21,
    date: "21 Oct 2022",
    status: "active",
  },
  {
    id: "11",
    name: "Hat",
    icon: "🎩",
    iconBg: "bg-gray-400",
    sales: 720,
    added: 720,
    stock: 10,
    date: "10 Aug 2022",
    status: "active",
  },
  {
    id: "12",
    name: "Beauty",
    icon: "💄",
    iconBg: "bg-pink-200",
    sales: 329,
    added: 199,
    stock: 21,
    date: "21 Oct 2022",
    status: "active",
  },
];

const CategoryManagement: React.FC = () => {
  const [categories, setCategories] = useState<Category[]>(initialCategories);
  const [selectedItems, setSelectedItems] = useState<string[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(10);

  // Pagination Logic
  const totalPages = Math.ceil(categories.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentItems = categories.slice(startIndex, endIndex);

  const totalItems = 10;
  // stutus btn
  const handleToggleStatus = (id: string) => {
    setCategories((prev) =>
      prev.map((category) =>
        category.id === id
          ? {
              ...category,
              status: category.status === "active" ? "inactive" : "active",
            }
          : category
      )
    );
  };


  const handleSelectAll = (checked: boolean) => {
    if (checked) {
      setSelectedItems(categories.map((cat) => cat.id));
    } else {
      setSelectedItems([]);
    }
  };

  const handleSelectItem = (id: string, checked: boolean) => {
    if (checked) {
      setSelectedItems([...selectedItems, id]);
    } else {
      setSelectedItems(selectedItems.filter((item) => item !== id));
    }
  };

  const isAllSelected = selectedItems.length === categories.length;
  const isIndeterminate =
    selectedItems.length > 0 && selectedItems.length < categories.length;

  return (
    <div className="min-h-screen ">
      <div className="mx-auto">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-lg md:text-2xl font-bold text-[#505050]">
              Category
            </h1>
            <div className="flex items-center text-sm text-gray-500 mt-1">
              <span className="text-[#A8537B] text-sm font-medium">
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
              <span className="text-[#919191] text-sm font-medium">
                Category List
              </span>
            </div>
          </div>
          <button className="flex items-center justify-center px-4 py-2 gap-2 bg-[#C8A8E9] text-[#1F1F1F] text-base rounded-[8px] font-semibold hover:bg-purple-300 cursor-pointer transition-colors">
            Add New
            <Plus className="w-4 h-4 mr-2" />
          </button>
        </div>

        {/* Table */}
        <div className="bg-white ">
          <div className="overflow-x-auto">
            <table className="w-full mt-3">
              <thead className="bg-[#FDF1F7]">
                <tr>
                  <th className="px-6 py-3 flex gap-3 text-left text-base font-semibold text-[#505050] tracking-wider">
                    <div className="relative flex items-center justify-center w-5 h-5">
                      <input
                        type="checkbox"
                        checked={isAllSelected}
                        ref={(input) => {
                          if (input) input.indeterminate = isIndeterminate;
                        }}
                        onChange={(e) => handleSelectAll(e.target.checked)}
                        className="peer w-full h-full accent-[#C8A8E9] bg-white border border-gray-300 rounded appearance-none checked:bg-[#C8A8E9] checked:border-transparent"
                      />
                      <span className="pointer-events-none absolute inset-0 items-center justify-center text-white text-xs font-bold peer-checked:flex hidden">
                        ✓
                      </span>
                    </div>
                    <div className="flex text-[#1F1F1F] font-semibold text-base gap-6 items-center">
                      Category
                      <ChevronDown className="w-4 h-4 ml-1" />
                    </div>
                  </th>

                  <th className="px-6 py-4 text-left text-[#1F1F1F] font-semibold text-base tracking-wider">
                    <div className="flex items-center gap-6">
                      Sales
                      <ChevronDown className="w-4 h-4 ml-1" />
                    </div>
                  </th>
                  <th className="px-6 py-4 text-left text-[#1F1F1F] font-semibold text-base tracking-wider">
                    <div className="flex items-center gap-6">
                      Added
                      <ChevronDown className="w-4 h-4 ml-1" />
                    </div>
                  </th>
                  <th className="px-6 py-4 text-left text-[#1F1F1F] font-semibold text-base tracking-wider">
                    <div className="flex items-center gap-6">
                      Stock
                      <ChevronDown className="w-4 h-4 ml-1" />
                    </div>
                  </th>
                  <th className="px-6 py-4 text-left text-[#1F1F1F] font-semibold text-base tracking-wider">
                    Status
                  </th>
                  <th className="px-6 py-4 text-center text-[#1F1F1F] font-semibold text-base tracking-wider">
                    Action
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {currentItems.map((category) => (
                  <tr key={category.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4 whitespace-nowrap flex items-center ">
                      <div className="relative flex items-center justify-center w-5 h-5">
                        <input
                          type="checkbox"
                          checked={selectedItems.includes(category.id)}
                          onChange={(e) =>
                            handleSelectItem(category.id, e.target.checked)
                          }
                          className="peer w-full h-full accent-[#C8A8E9] bg-white border border-gray-300 rounded appearance-none checked:bg-[#C8A8E9] checked:border-transparent"
                        />
                        <span className="pointer-events-none absolute inset-0 items-center justify-center text-white text-xs font-bold peer-checked:flex hidden">
                          ✓
                        </span>
                      </div>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center">
                          <div
                            className={`w-11 h-11 rounded-[8px] ${category.iconBg} flex items-center justify-center mr-3`}
                          >
                            <span className="text-lg">{category.icon}</span>
                          </div>
                          <span className="text-base font-semibold text-[#1F1F1F]">
                            {category.name}
                          </span>
                        </div>
                      </td>
                    </td>
                    {/* sales */}
                    <td className="px-6 py-4 whitespace-nowrap text-base font-normal text-[#505050]">
                      {category.sales.toLocaleString()}
                    </td>
                    {/* added */}
                    <td className="px-6 py-4 whitespace-nowrap text-base font-normal text-[#505050]">
                      {category.added}
                    </td>
                    {/* data */}
                    <td className="px-6 py-4 whitespace-nowrap text-base font-normal text-[#505050]">
                      {category.date}
                    </td>
                    {/* status */}
                    <td className="px-6 py-4 whitespace-nowrap">
                      <button
                        onClick={() => handleToggleStatus(category.id)}
                        className={`w-10 h-4 flex items-center rounded-[8px] p- transition-colors duration-300 ${
                          category.status === "active"
                            ? "bg-[#F1DAFC]"
                            : "bg-[#F1DAFC]"
                        }`}
                      >
                        <div
                          className={`w-5 h-5 rounded-full transition-transform duration-300 ${
                            category.status === "active"
                              ? "translate-x-5 bg-[#C8A8E9]"
                              : "translate-x-0 bg-[#F1DAFC]"
                          }`}
                        ></div>
                      </button>
                    </td>

                    {/* action */}
                    <td className="px-6 flex justify-center py-4 whitespace-nowrap">
                      <div className="flex items-center space-x-2">
                        {/* edit btn */}
                        <button className="p-1 cursor-pointer transition-colors">
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="16"
                            height="16"
                            viewBox="0 0 16 16"
                            fill="none"
                          >
                            <path
                              d="M8 13.333H14"
                              stroke="#505050"
                              stroke-width="2"
                              stroke-linecap="round"
                              stroke-linejoin="round"
                            />
                            <path
                              d="M11.2504 1.47176C11.5524 1.1697 11.9621 1 12.3893 1C12.6008 1 12.8103 1.04166 13.0057 1.12261C13.2011 1.20355 13.3787 1.32219 13.5282 1.47176C13.6778 1.62133 13.7964 1.79889 13.8774 1.99431C13.9583 2.18972 14 2.39917 14 2.61069C14 2.82221 13.9583 3.03166 13.8774 3.22708C13.7964 3.42249 13.6778 3.60006 13.5282 3.74962L4.03715 13.2407L1 14L1.75929 10.9629L11.2504 1.47176Z"
                              stroke="#505050"
                              stroke-width="2"
                              stroke-linecap="round"
                              stroke-linejoin="round"
                            />
                          </svg>
                        </button>
                        {/* delete btn */}
                        <button className="p-1 cursor-pointer transition-colors">
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
                        {/* details btn */}
                        <button className="p-1 cursor-pointer transition-colors">
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="24"
                            height="24"
                            viewBox="0 0 24 24"
                            fill="none"
                          >
                            <path
                              fill-rule="evenodd"
                              clip-rule="evenodd"
                              d="M22 12.0002C20.2531 15.5764 15.8775 19 11.9998 19C8.12201 19 3.74646 15.5764 2 11.9998"
                              stroke="#505050"
                              stroke-width="1.4"
                              stroke-linecap="round"
                              stroke-linejoin="round"
                            />
                            <path
                              fill-rule="evenodd"
                              clip-rule="evenodd"
                              d="M22 12.0002C20.2531 8.42398 15.8782 5 12.0005 5C8.1227 5 3.74646 8.42314 2 11.9998"
                              stroke="#505050"
                              stroke-width="1.4"
                              stroke-linecap="round"
                              stroke-linejoin="round"
                            />
                            <path
                              d="M15 12C15 13.6569 13.6569 15 12 15C10.3431 15 9 13.6569 9 12C9 10.3431 10.3431 9 12 9C13.6569 9 15 10.3431 15 12Z"
                              stroke="#505050"
                              stroke-width="1.4"
                              stroke-linecap="round"
                              stroke-linejoin="round"
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
          <div className="px-6 bg-[#FDF1F7] py-4 border-t border-gray-200 pb-12 flex items-center justify-between">
            <div className="text-sm text-gray-500">
              {`${(currentPage - 1) * itemsPerPage + 1} - ${Math.min(
                currentPage * itemsPerPage,
                totalItems
              )} of ${totalItems} items`}
            </div>

            <div className="flex items-center space-x-4">
              {/* Select Items Per Page */}
              <div className="flex items-center space-x-2">
                <span className="text-sm text-[#505050] font-medium">
                  The page on
                </span>
                <select
                  value={itemsPerPage}
                  onChange={(e) => {
                    setItemsPerPage(Number(e.target.value));
                    setCurrentPage(1); // Reset to first page
                  }}
                  className="border border-gray-300 rounded px-2 py-1 text-sm"
                >
                  <option value={10}>10</option>
                  <option value={20}>20</option>
                  <option value={50}>50</option>
                </select>
              </div>

              {/* Pagination Buttons */}
              <div className="flex items-center space-x-3">
                <button
                  onClick={() =>
                    setCurrentPage((prev) => Math.max(1, prev - 1))
                  }
                  disabled={currentPage === 1}
                  className="p-1 text-gray-400 hover:text-gray-600 border border-[#505050] rounded-[8px] disabled:opacity-50"
                >
                  <ChevronLeft className="w-4 h-4" />
                </button>

                <button
                  onClick={() =>
                    setCurrentPage((prev) => Math.min(totalPages, prev + 1))
                  }
                  disabled={currentPage === totalPages}
                  className="p-1 text-gray-400 hover:text-gray-600 border border-[#505050] rounded-[8px] disabled:opacity-50"
                >
                  <ChevronRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CategoryManagement;
