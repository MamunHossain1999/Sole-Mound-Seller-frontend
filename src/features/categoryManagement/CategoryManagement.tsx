import React, { useState, useRef } from "react";
import {
  useGetAllCategoriesQuery,
  useUpdateCategoryStatusMutation,
  useDeleteCategoryMutation,
  type Category,
} from "@/redux/api/categoryApi";
import { ChevronDown, ChevronLeft, ChevronRight, Plus } from "lucide-react";
import { Link, useNavigate } from "react-router";

// ===================== Sub-components =====================

const BreadcrumbArrow: React.FC = () => (
  <span className="mx-2 text-[#919191]">
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

interface CustomCheckboxProps {
  checked: boolean;
  indeterminate?: boolean;
  onChange: (checked: boolean) => void;
}

const CustomCheckbox: React.FC<CustomCheckboxProps> = ({
  checked,
  indeterminate = false,
  onChange,
}) => {
  const ref = useRef<HTMLInputElement>(null);

  React.useEffect(() => {
    if (ref.current) {
      ref.current.indeterminate = indeterminate;
    }
  }, [indeterminate]);

  return (
    <div className="relative flex items-center justify-center w-5 h-5">
      <input
        ref={ref}
        type="checkbox"
        checked={checked}
        onChange={(e) => onChange(e.target.checked)}
        className="peer w-full h-full accent-[#C8A8E9] bg-white border border-gray-300 rounded appearance-none checked:bg-[#C8A8E9] checked:border-transparent"
      />
      <span className="pointer-events-none absolute inset-0 items-center justify-center text-white text-xs font-bold peer-checked:flex hidden">
        ✓
      </span>
    </div>
  );
};

interface ToggleSwitchProps {
  isActive: boolean;
  onToggle: () => void;
}

const ToggleSwitch: React.FC<ToggleSwitchProps> = ({ isActive, onToggle }) => (
  <button
    onClick={onToggle}
    className="w-10 h-5 flex items-center rounded-full transition-colors duration-300 bg-[#F1DAFC]"
    aria-label="Toggle status"
  >
    <div
      className={`w-5 h-5 rounded-full border-2 border-white shadow transition-transform duration-300 ${
        isActive ? "translate-x-5 bg-[#C8A8E9]" : "translate-x-0 bg-gray-300"
      }`}
    />
  </button>
);

// ===================== Action Button Icons =====================

const DeleteIcon: React.FC = () => (
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
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

const ViewIcon: React.FC = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
  >
    <path
      fillRule="evenodd"
      clipRule="evenodd"
      d="M22 12.0002C20.2531 15.5764 15.8775 19 11.9998 19C8.12201 19 3.74646 15.5764 2 11.9998"
      stroke="#505050"
      strokeWidth="1.4"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <path
      fillRule="evenodd"
      clipRule="evenodd"
      d="M22 12.0002C20.2531 8.42398 15.8782 5 12.0005 5C8.1227 5 3.74646 8.42314 2 11.9998"
      stroke="#505050"
      strokeWidth="1.4"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <path
      d="M15 12C15 13.6569 13.6569 15 12 15C10.3431 15 9 13.6569 9 12C9 10.3431 10.3431 9 12 9C13.6569 9 15 10.3431 15 12Z"
      stroke="#505050"
      strokeWidth="1.4"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

// ===================== Table Header Cell =====================

interface ThCellProps {
  label: string;
  sortable?: boolean;
  center?: boolean;
}

const ThCell: React.FC<ThCellProps> = ({
  label,
  sortable = false,
  center = false,
}) => (
  <th
    className={`px-6 py-4 text-[#1F1F1F] font-semibold text-base tracking-wider ${
      center ? "text-center" : "text-left"
    }`}
  >
    {sortable ? (
      <div className="flex items-center gap-2">
        {label}
        <ChevronDown className="w-4 h-4" />
      </div>
    ) : (
      label
    )}
  </th>
);

// ===================== Main Component =====================

const CategoryManagement: React.FC = () => {
  const [selectedItems, setSelectedItems] = useState<string[]>([]);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [itemsPerPage, setItemsPerPage] = useState<number>(10);

  const navigate = useNavigate();

  const {
    data: categories = [],
    isLoading,
    isError,
  } = useGetAllCategoriesQuery();

  const [updateCategoryStatus] = useUpdateCategoryStatusMutation();
  const [deleteCategory] = useDeleteCategoryMutation();

  // ── Pagination ──
  const totalItems: number = categories.length;
  const totalPages: number = Math.ceil(totalItems / itemsPerPage);
  const startIndex: number = (currentPage - 1) * itemsPerPage;
  const currentItems: Category[] = categories.slice(
    startIndex,
    startIndex + itemsPerPage,
  );

  // ── Select All ──
  const handleSelectAll = (checked: boolean): void => {
    setSelectedItems(checked ? categories.map((c) => c.id) : []);
  };

  // ── Select Single ──
  const handleSelectItem = (id: string, checked: boolean): void => {
    setSelectedItems((prev) =>
      checked ? [...prev, id] : prev.filter((item) => item !== id),
    );
  };

  const isAllSelected: boolean =
    categories.length > 0 && selectedItems.length === categories.length;

  const isIndeterminate: boolean =
    selectedItems.length > 0 && selectedItems.length < categories.length;

  // ── Toggle Status ──
  const handleToggleStatus = async (
    name: string,
    currentStatus: "active" | "inactive",
  ): Promise<void> => {
    try {
      await updateCategoryStatus({
        name,
        status: currentStatus === "active" ? "inactive" : "active",
      }).unwrap();
    } catch (error) {
      console.error("Failed to update status:", error);
    }
  };

  // ── Delete ──
  const handleDelete = async (name: string) => {
    console.log("Deleting category:", name);

    try {
      await deleteCategory({ name }).unwrap();
    } catch (error) {
      console.error(error);
    }
  };

  // ── Items Per Page ──
  const handleItemsPerPageChange = (
    e: React.ChangeEvent<HTMLSelectElement>,
  ): void => {
    setItemsPerPage(Number(e.target.value));
    setCurrentPage(1);
  };

  // ── Loading / Error ──
  if (isLoading) return <p className="p-6">Loading...</p>;
  if (isError) return <p className="p-6 text-red-500">Something went wrong</p>;

  return (
    <div className="min-h-screen">
      <div className="mx-auto">
        {/* ── Header ── */}
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-lg md:text-2xl font-bold text-[#505050]">
              Category
            </h1>
            <div className="flex items-center text-sm text-gray-500 mt-1">
              <span className="text-[#A8537B] text-sm font-medium">
                Dashboard
              </span>
              <BreadcrumbArrow />
              <span className="text-[#919191] text-sm font-medium">
                Category List
              </span>
            </div>
          </div>
          <Link to="/products-form"
           className="flex items-center justify-center px-4 py-2 gap-2 bg-[#C8A8E9] text-[#1F1F1F] text-base rounded-[8px] font-semibold hover:bg-purple-300 cursor-pointer transition-colors">
            Add New
            <Plus className="w-4 h-4" />
          </Link>
        </div>

        {/* ── Table ── */}
        <div className="bg-white">
          <div className="overflow-x-auto">
            <table className="w-full mt-3">
              <thead className="bg-[#FDF1F7]">
                <tr>
                  <th className="px-6 py-3 text-left text-base font-semibold text-[#505050] tracking-wider">
                    <div className="flex items-center gap-3">
                      <CustomCheckbox
                        checked={isAllSelected}
                        indeterminate={isIndeterminate}
                        onChange={handleSelectAll}
                      />
                      <div className="flex items-center text-[#1F1F1F] font-semibold text-base gap-2">
                        Category
                        <ChevronDown className="w-4 h-4" />
                      </div>
                    </div>
                  </th>
                  <ThCell label="Sales" sortable />
                  <ThCell label="Added" sortable />
                  <ThCell label="Stock" sortable />
                  <ThCell label="Status" />
                  <ThCell label="Action" center />
                </tr>
              </thead>

              <tbody className="bg-white divide-y divide-gray-200">
                {currentItems.map((category: Category) => (
                  <tr key={category.id} className="hover:bg-gray-50">
                    {/* Checkbox + Name */}
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center gap-4">
                        <CustomCheckbox
                          checked={selectedItems.includes(category.id)}
                          onChange={(checked) =>
                            handleSelectItem(category.id, checked)
                          }
                        />
                        <div className="flex items-center">
                          <div
                            className={`w-11 h-11 rounded-[8px] ${
                              category.iconBg ?? "bg-purple-100"
                            } flex items-center justify-center mr-3`}
                          >
                            {category.image ? (
                              <img
                                src={category.image}
                                alt={category.name}
                                className="w-full h-full object-cover rounded-[8px]"
                              />
                            ) : (
                              <span className="text-lg">
                                {category.icon ?? "📦"}
                              </span>
                            )}
                          </div>
                          <span className="text-base font-semibold text-[#1F1F1F]">
                            {category.name}
                          </span>
                        </div>
                      </div>
                    </td>

                    {/* Sales */}
                    <td className="px-6 py-4 whitespace-nowrap text-base font-normal text-[#505050]">
                      {category.sales.toLocaleString()}
                    </td>

                    {/* Added / Date */}
                    <td className="px-6 py-4 whitespace-nowrap text-base font-normal text-[#505050]">
                      {category?.date
                        ? new Date(category.date).toLocaleDateString("en-GB", {
                            day: "2-digit",
                            month: "short",
                            year: "numeric",
                          })
                        : "N/A"}
                    </td>

                    {/* Stock */}
                    <td className="px-6 py-4 whitespace-nowrap text-base font-normal text-[#505050]">
                      {category.stock}
                    </td>

                    {/* Status Toggle */}
                    <td className="px-6 py-4 whitespace-nowrap">
                      <ToggleSwitch
                        isActive={category.status === "active"}
                        onToggle={() =>
                          handleToggleStatus(category.id, category.status)
                        }
                      />
                    </td>

                    {/* Actions */}
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center justify-center space-x-2">
                        {/* Delete */}
                        <button
                          onClick={() => handleDelete(category.id)} // ✅ id = category name
                          className="p-1 cursor-pointer hover:opacity-70 transition-opacity"
                          aria-label="Delete"
                        >
                          <DeleteIcon />
                        </button>

                        {/* View */}
                        <button
                          onClick={() => navigate(`/category/${category.id}`)}
                          className="p-1 cursor-pointer hover:opacity-70 transition-opacity"
                          aria-label="View"
                        >
                          <ViewIcon />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}

                {currentItems.length === 0 && (
                  <tr>
                    <td
                      colSpan={6}
                      className="px-6 py-10 text-center text-gray-400 text-sm"
                    >
                      No categories found.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>

          {/* ── Pagination ── */}
          <div className="px-6 bg-[#FDF1F7] py-4 border-t border-gray-200 pb-12 flex items-center justify-between">
            <p className="text-sm text-gray-500">
              {totalItems > 0
                ? `${startIndex + 1} – ${Math.min(startIndex + itemsPerPage, totalItems)} of ${totalItems} items`
                : "0 items"}
            </p>

            <div className="flex items-center space-x-4">
              <div className="flex items-center space-x-2">
                <span className="text-sm text-[#505050] font-medium">
                  The page on
                </span>
                <select
                  value={itemsPerPage}
                  onChange={handleItemsPerPageChange}
                  className="border border-gray-300 rounded px-2 py-1 text-sm focus:outline-none focus:ring-1 focus:ring-purple-400"
                >
                  {([10, 20, 50] as const).map((n) => (
                    <option key={n} value={n}>
                      {n}
                    </option>
                  ))}
                </select>
              </div>

              <div className="flex items-center space-x-3">
                <button
                  onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
                  disabled={currentPage === 1}
                  className="p-1 text-gray-400 hover:text-gray-600 border border-[#505050] rounded-[8px] disabled:opacity-50 disabled:cursor-not-allowed"
                  aria-label="Previous page"
                >
                  <ChevronLeft className="w-4 h-4" />
                </button>

                <span className="text-sm text-[#505050] font-medium">
                  {currentPage} / {totalPages || 1}
                </span>

                <button
                  onClick={() =>
                    setCurrentPage((p) => Math.min(totalPages, p + 1))
                  }
                  disabled={currentPage === totalPages || totalPages === 0}
                  className="p-1 text-gray-400 hover:text-gray-600 border border-[#505050] rounded-[8px] disabled:opacity-50 disabled:cursor-not-allowed"
                  aria-label="Next page"
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
