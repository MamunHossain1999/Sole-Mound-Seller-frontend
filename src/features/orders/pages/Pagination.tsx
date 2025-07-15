import React from "react";

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  pageSize: number;
  onPageChange: (page: number) => void;
  onPageSizeChange: (size: number) => void;
  totalItems: number;
  startIndex: number;
  endIndex: number;
}

const Pagination: React.FC<PaginationProps> = ({
  currentPage,
  totalPages,
  pageSize,
  onPageChange,
  onPageSizeChange,
  totalItems,
  startIndex,
  endIndex,
}) => {
  const pageNumbers = Array.from({ length: Math.min(5, totalPages) }, (_, i) => i + 1);

  return (
    <div className="px-4 py-4 border-t border-[#FDF1F7]">
      <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 md:gap-0">
        {/* Left: Info */}
        <div className="text-sm text-[#505050]">
          {startIndex + 1} to {Math.min(endIndex, totalItems)} of {totalItems} Pages
        </div>

        {/* Right: Controls */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4">
          {/* Items per page */}
          <div className="flex items-center gap-2">
            <span className="text-sm text-[#505050]">This page on:</span>
            <div className="relative">
              <select
                value={pageSize}
                onChange={(e) => onPageSizeChange(Number(e.target.value))}
                className="appearance-none border cursor-pointer border-[#B6B7BC] rounded-[8px] px-4 py-2 text-sm pr-10 w-full"
              >
                {[10, 25, 50].map((size) => (
                  <option key={size} value={size}>
                    {size}
                  </option>
                ))}
              </select>
              <div className="absolute inset-y-0 right-2 flex items-center pointer-events-none">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="20"
                  height="20"
                  viewBox="0 0 20 20"
                  fill="none"
                >
                  <path
                    d="M9.99992 14.1668L3.33325 5.8335H16.6666L9.99992 14.1668Z"
                    fill="#505050"
                  />
                </svg>
              </div>
            </div>
          </div>

          {/* Page Navigation */}
          <div className="flex items-center gap-2 flex-wrap">
            {/* Prev Button */}
            <button
              onClick={() => onPageChange(Math.max(1, currentPage - 1))}
              disabled={currentPage === 1}
              className="px-2 py-2 rounded-[8px] border border-[#B6B7BC] hover:bg-gray-100 disabled:opacity-50"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="20"
                height="20"
                viewBox="0 0 20 20"
                fill="none"
              >
                <path
                  d="M12.5 16.6668L5.83333 10.0002L12.5 3.3335"
                  stroke="#919191"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </button>

            {/* Page Numbers */}
            {pageNumbers.map((page) => (
              <button
                key={page}
                onClick={() => onPageChange(page)}
                className={`w-8 h-8 rounded text-sm ${
                  currentPage === page
                    ? "bg-white text-[#1F1F1F] border border-[#C8A8E9]"
                    : "text-gray-700 hover:bg-gray-100"
                }`}
              >
                {page}
              </button>
            ))}

            {/* Next Button */}
            <button
              onClick={() => onPageChange(Math.min(totalPages, currentPage + 1))}
              disabled={currentPage === totalPages}
              className="px-2 py-2 rounded-[8px] border border-[#B6B7BC] hover:bg-gray-100 disabled:opacity-50"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="20"
                height="20"
                viewBox="0 0 20 20"
                fill="none"
              >
                <path
                  d="M7.5 16.6668L14.1667 10.0002L7.5 3.3335"
                  stroke="#505050"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Pagination;
