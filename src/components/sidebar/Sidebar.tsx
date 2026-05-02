import { useState, useEffect } from "react";
import { NavLink, useNavigate, useLocation } from "react-router-dom";
import { ChevronRight } from "lucide-react";

import logo from "@/assets/logo/Logo.png";

// Normal Icons
import dashboard from "@/assets/sideberIcon/dashboard.svg";
import order from "@/assets/sideberIcon/order.svg";
import product from "@/assets/sideberIcon/product.svg";
import customer from "@/assets/sideberIcon/customar.svg";
import category from "@/assets/sideberIcon/Document.svg";
import earnings from "@/assets/sideberIcon/Wallet.svg";
import transaction from "@/assets/sideberIcon/transections.svg";
import store from "@/assets/sideberIcon/store.svg";
import profile from "@/assets/sideberIcon/Profile.svg";
import conversation from "@/assets/sideberIcon/conversion.svg";
import review from "@/assets/sideberIcon/review.svg";
import support from "@/assets/sideberIcon/support.svg";
import logout from "@/assets/sideberIcon/Logout.svg";

// White / Active Icons
import dashboardWhite from "@/assets/sidebarIconWhite/dashboard.svg";
import orderWhite from "@/assets/sidebarIconWhite/order.svg";
import productWhite from "@/assets/sidebarIconWhite/product.svg";
import customerWhite from "@/assets/sidebarIconWhite/customar.svg";
import categoryWhite from "@/assets/sidebarIconWhite/category.svg";
import earningsWhite from "@/assets/sidebarIconWhite/earing.svg";
import transactionWhite from "@/assets/sidebarIconWhite/transactions.svg";
import storeWhite from "@/assets/sidebarIconWhite/store.svg";
import profileWhite from "@/assets/sidebarIconWhite/Profile.svg";
import conversationWhite from "@/assets/sidebarIconWhite/conversion.svg";
import reviewWhite from "@/assets/sidebarIconWhite/category.svg";
import supportWhite from "@/assets/sidebarIconWhite/Customer Support (2).svg";

import { useLogoutUserMutation } from "@/redux/api/authApi";
import { toast } from "react-toastify";

type MenuItem = {
  label: string;
  icon: string;
  activeIcon: string;
  path: string;
  children?: { label: string; path: string }[];
};

const menuItems: MenuItem[] = [
  { label: "Dashboard", icon: dashboard, activeIcon: dashboardWhite, path: "/" },
  { label: "Orders", icon: order, activeIcon: orderWhite, path: "/orders" },
  {
    label: "Products",
    icon: product,
    activeIcon: productWhite,
    path: "/products-list",           // Default path when clicking "Products"
    children: [
      { label: "List", path: "/products-list" },
      { label: "Create", path: "/products-form" },
      { label: "BannerCreate", path: "/banner-create" },
      { label: "BannerPage", path: "/banner-page" },
    ],
  },
  { label: "Customers", icon: customer, activeIcon: customerWhite, path: "/customers" },
  { label: "Categories", icon: category, activeIcon: categoryWhite, path: "/categories" },
  { label: "Earnings", icon: earnings, activeIcon: earningsWhite, path: "/earnings" },
  { label: "Transactions", icon: transaction, activeIcon: transactionWhite, path: "/transactions" },
  { label: "Store Settings", icon: store, activeIcon: storeWhite, path: "/store-settings" },
  { label: "Profile Settings", icon: profile, activeIcon: profileWhite, path: "/profile-settings" },
  { label: "Conversations", icon: conversation, activeIcon: conversationWhite, path: "/conversations" },
  { label: "Review", icon: review, activeIcon: reviewWhite, path: "/review-table" },
  { label: "Support", icon: support, activeIcon: supportWhite, path: "/support" },
];

const getNavLinkClass = (isActive: boolean) => {
  const base = "group flex gap-3 items-center px-3 py-2 mt-3 rounded-[12px] text-base font-medium transition-all duration-200";
  return isActive
    ? `${base} bg-[#C8A8E9] text-white`
    : `${base} text-[#505050] hover:bg-gray-100`;
};

const Sidebar = ({
  isOpen = false,
  setIsOpen = () => {},
}: {
  isOpen?: boolean;
  setIsOpen?: (v: boolean) => void;
}) => {
  const [openDropdown, setOpenDropdown] = useState<string | null>(null);
  const [selectedProductOption, setSelectedProductOption] = useState("/products-list");

  const navigate = useNavigate();
  const location = useLocation();
  const [logoutUser] = useLogoutUserMutation();

  // Auto manage dropdown and selected radio when route changes
  useEffect(() => {
    const path = location.pathname;

    if (path === "/products-list" || path === "/products-form") {
      setOpenDropdown("Products");
      setSelectedProductOption(path);
    } else {
      setOpenDropdown(null);
    }
  }, [location.pathname]);

  const toggleDropdown = (label: string) => {
    if (openDropdown === label) {
      setOpenDropdown(null);
    } else {
      setOpenDropdown(label);
      // Products এ ক্লিক করলে সবসময় List active হয়ে যাবে
      if (label === "Products") {
        setSelectedProductOption("/products-list");
        navigate("/products-list");
      }
    }
  };

  const handleLogout = async () => {
    try {
      await logoutUser().unwrap();
      toast.success("Logged out successfully");
      window.location.href = "/";
    } catch (error) {
      console.error(error);
      toast.error("Logout failed");
    }
  };

  return (
    <>
      {/* Mobile Backdrop */}
      <div
        className={`fixed inset-0 bg-purple-200 bg-opacity-40 z-30 lg:hidden transition-opacity ${
          isOpen ? "opacity-100 visible pointer-events-auto" : "opacity-0 invisible pointer-events-none"
        }`}
        onClick={() => setIsOpen(false)}
      />

      {/* Sidebar */}
      <div
        className={`fixed top-0 left-0 h-full bg-white shadow-lg z-40 transition-all duration-300 overflow-y-auto w-64 
          ${isOpen ? "translate-x-0" : "-translate-x-full"} 
          md:translate-x-0 md:static`}
      >
        {/* Logo */}
        <div className="p-6 flex items-center justify-center border-b">
          <div className="flex items-center gap-3">
            <img src={logo} className="w-16 h-16" alt="Logo" />
            <p className="text-2xl font-bold text-[#505050]">Sole Mound</p>
          </div>
        </div>

        {/* Menu Items */}
        <nav className="px-4 py-6">
          {menuItems.map((item) => {
            const hasChildren = !!item.children?.length;
            const isDropdownOpen = openDropdown === item.label;

            if (hasChildren) {
              return (
                <div key={item.label} className="mb-2">
                  {/* Products Main Item */}
                  <div
                    onClick={() => toggleDropdown(item.label)}
                    className={`${getNavLinkClass(isDropdownOpen)} flex items-center justify-between cursor-pointer`}
                  >
                    <div className="flex items-center gap-3">
                      <img
                        src={isDropdownOpen ? item.activeIcon : item.icon}
                        className="w-6 h-6"
                        alt={item.label}
                      />
                      <span>{item.label}</span>
                    </div>
                    <ChevronRight
                      className={`w-5 h-5 transition-transform ${isDropdownOpen ? "rotate-90" : ""}`}
                    />
                  </div>

                  {/* Submenu - Radio Style */}
                  {isDropdownOpen && (
                    <div className="ml-9 mt-3 flex flex-col gap-2">
                      {item.children?.map((child) => (
                        <label
                          key={child.path}
                          className="flex items-center gap-3 cursor-pointer text-sm text-[#505050] py-1"
                        >
                          <input
                            type="radio"
                            name="productOption"
                            value={child.path}
                            checked={selectedProductOption === child.path}
                            onChange={() => {
                              setSelectedProductOption(child.path);
                              navigate(child.path);
                            }}
                            className="hidden peer"
                          />
                          <div className="w-5 h-5 rounded-full border-2 border-gray-300 flex items-center justify-center peer-checked:bg-[#C8A8E9]">
                            <div className="w-2.5 h-2.5 bg-[#C8A8E9] rounded-full scale-0 peer-checked:scale-100 transition-all" />
                          </div>
                          <span>{child.label}</span>
                        </label>
                      ))}
                    </div>
                  )}
                </div>
              );
            }

            // Normal Menu Items
            return (
              <NavLink
                key={item.label}
                to={item.path}
                onClick={() => setIsOpen(false)}
                className={({ isActive }) => getNavLinkClass(isActive)}
              >
                {({ isActive }) => (
                  <div className="flex items-center gap-3">
                    <img
                      src={isActive ? item.activeIcon : item.icon}
                      className="w-6 h-6"
                      alt={item.label}
                    />
                    <span>{item.label}</span>
                  </div>
                )}
              </NavLink>
            );
          })}
        </nav>

        {/* Logout */}
        <div className="absolute bottom-8 w-full px-6">
          <div
            onClick={handleLogout}
            className="flex items-center gap-3 text-[#A8537B] hover:text-red-600 cursor-pointer px-3 py-3 rounded-xl hover:bg-gray-100 transition-all"
          >
            <img src={logout} className="w-6 h-6" alt="Logout" />
            <span className="font-medium">Logout</span>
          </div>
        </div>
      </div>
    </>
  );
};

export default Sidebar;