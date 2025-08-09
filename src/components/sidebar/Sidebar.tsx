import { useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { ChevronRight } from "lucide-react";

import logo from "@/assets/logo/Logo.png";

// Sidebar icons (normal icons)
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

// Sidebar icons (white/active state)
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

// MenuItem type define 
type MenuItem = {
  label: string; 
  icon: string;
  activeIcon: string; 
  path: string; // Navigate path
  children?: { label: string; path: string }[]; // jodi submenu thake
};

// sob menu items ekta array te rakha holo
const menuItems: MenuItem[] = [
  { label: "Dashboard", icon: dashboard, activeIcon: dashboardWhite, path: "/" },
  { label: "Orders", icon: order, activeIcon: orderWhite, path: "/orders" },
  {
    label: "Products",
    icon: product,
    activeIcon: productWhite,
    path: "/products",
    children: [
      { label: "List", path: "/products-list" },
      { label: "Create", path: "/products-form" },
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

// active link er jnno class define kora holo
const getNavLinkClass = (isActive: boolean) => {
  const base =
    "group flex gap-3 items-center px-3 py-2 mt-3 rounded-[12px] text-base font-medium transition-all duration-200";
  return isActive
    ? `${base} bg-[#C8A8E9] text-white` 
    : `${base} text-[#505050] hover:bg-gray-100`; 
};

const Sidebar = ({
  isOpen = false, // Mobile sidebar open ase kina
  setIsOpen = () => {}, // Sidebar open/close korar function
}: {
  isOpen?: boolean;
  setIsOpen?: (v: boolean) => void;
}) => {
  const [isCollapsed] = useState(false); // Sidebar collapse state (akane fixed false rakha hoyeche)
  const [openDropdown, setOpenDropdown] = useState<string | null>(null); // kon dropdown khola ache
  const [selectedProductOption, setSelectedProductOption] = useState("/products"); // Product submenu select state

  const toggleDropdown = (label: string) => {
    setOpenDropdown(openDropdown === label ? null : label); // age jodi khola thake tahole bondho koro
  };

  const navigate = useNavigate();

  return (
    <>
      {/* Mobile backdrop click korle sidebar bondho hobe */}
      <div
        className={`fixed inset-0 bg-purple-200 bg-opacity-40 z-30 lg:hidden transition-opacity ${
          isOpen ? "opacity-100 visible pointer-events-auto" : "opacity-0 invisible pointer-events-none"
        }`}
        onClick={() => setIsOpen(false)}
      />

      {/* Sidebar container */}
      <div
        className={`fixed top-0 left-0 h-full bg-white shadow-lg z-40 transition-all duration-300 overflow-y-auto
          ${isCollapsed ? "w-16" : "w-64"} 
          ${isOpen ? "translate-x-0" : "-translate-x-full"} 
          md:translate-x-0 md:static md:block md:${isCollapsed ? "w-16" : "w-52"} 
          lg:${isCollapsed ? "w-16" : "w-64"}`}
        style={{ WebkitOverflowScrolling: "touch" }}
      >
        {/* Logo section */}
        <div className="p-4 flex items-center justify-between">
          <div className="flex items-center gap-2 w-[202px] mx-auto">
            <img src={logo} className="w-[68px] h-[68px]" alt="Logo" />
            {!isCollapsed && <p className="text-[20px] font-bold text-[#505050]">Sole Mound</p>}
          </div>
        </div>

        {/* Nav menu list */}
        <nav className="mt-4 w-[202px] mx-auto">
          {menuItems?.map((item) => {
            const hasChildren = item.children && item.children.length > 0; // submenu ase kina ter jnno
            const isDropdownOpen = openDropdown === item.label;

            if (hasChildren) {
              // ata dropdown menu sub menur jnno
              return (
                <div key={item.label} className="mb-1">
                  <div
                    onClick={() => {
                      toggleDropdown(item.label);
                      navigate(item.path);
                    }}
                    className={`${getNavLinkClass(isDropdownOpen)} ${
                      isCollapsed ? "justify-center" : "cursor-pointer"
                    } flex items-center justify-between`}
                  >
                    {/* Icon + Label */}
                    <div className="flex items-center gap-3">
                      <img
                        src={isDropdownOpen ? item.activeIcon : item.icon}
                        className="w-6 h-6"
                        alt={item.label}
                      />
                      {!isCollapsed && (
                        <span className={isDropdownOpen ? "text-white" : "text-[#505050]"}>{item.label}</span>
                      )}
                    </div>
                    {!isCollapsed && (
                      <ChevronRight
                        className={`w-4 h-4 transition-transform ${isDropdownOpen ? "rotate-90" : ""}`}
                      />
                    )}
                  </div>

                  {/* Dropdown menu - just Products er jnno */}
                  {isDropdownOpen && !isCollapsed && item.label === "Products" && (
                    <div className="ml-8 mt-3 flex flex-col gap-2">
                      {item.children?.map((child) => (
                        <label
                          key={child.path}
                          className="flex items-center gap-3 cursor-pointer text-sm text-[#505050]"
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
                          {/* Custom radio design */}
                          <div className="w-5 h-5 rounded-full border border-gray-300 bg-white flex items-center justify-center peer-checked:bg-[#E3AADD] peer-checked:border-[#C8A8E9] transition-colors">
                            <div className="w-2 h-2 rounded-full bg-white peer-checked:block"></div>
                          </div>
                          <span>{child.label}</span>
                        </label>
                      ))}
                    </div>
                  )}
                </div>
              );
            }

            // Normal nav item (dropdown sara)
            return (
              <NavLink
                key={item.label}
                to={item.path}
                onClick={() => setIsOpen(false)}
                className={({ isActive }) => getNavLinkClass(isActive)}
              >
                {({ isActive }) => (
                  <div className={`${isCollapsed ? "justify-center" : ""} flex items-center gap-3`}>
                    <img
                      src={isActive ? item.activeIcon : item.icon}
                      className="w-6 h-6"
                      alt={item.label}
                    />
                    {!isCollapsed && <span className={isActive ? "text-white" : "text-[#505050]"}>{item.label}</span>}
                  </div>
                )}
              </NavLink>
            );
          })}
        </nav>

        {/* Logout button */}
        <div className="bottom-4 px-4 w-full md:pt-28">
          <div
            className={`flex items-center gap-2 text-sm font-normal ml-4 text-[#A8537B] px-3 py-2 rounded-md cursor-pointer ${
              isCollapsed ? "justify-center" : ""
            }`}
          >
            <img src={logout} className="w-6 h-6" alt="Logout" />
            {!isCollapsed && <span className="font-normal text-sm">Logout</span>}
          </div>
        </div>
      </div>
    </>
  );
};

export default Sidebar;
