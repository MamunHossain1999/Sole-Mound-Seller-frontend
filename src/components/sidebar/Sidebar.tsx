import { useState } from "react";
import { NavLink } from "react-router-dom";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import logo from "@/assets/logo/Logo.png";

// Sidebar icons
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

// Active (white) icons
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

const menuItems = [
  { label: "Dashboard", icon: dashboard, activeIcon: dashboardWhite, path: "/" },
  { label: "Orders", icon: order, activeIcon: orderWhite, path: "/orders" },
  { label: "Products", icon: product, activeIcon: productWhite, path: "/products" },
  { label: "Customers", icon: customer, activeIcon: customerWhite, path: "/customers" },
  { label: "Categories", icon: category, activeIcon: categoryWhite, path: "/categories" },
  { label: "Earnings", icon: earnings, activeIcon: earningsWhite, path: "/earnings" },
  { label: "Transactions", icon: transaction, activeIcon: transactionWhite, path: "/transactions" },
  { label: "Store Settings", icon: store, activeIcon: storeWhite, path: "/store-settings" },
  { label: "Profile Settings", icon: profile, activeIcon: profileWhite, path: "/profile-settings" },
  { label: "Conversations", icon: conversation, activeIcon: conversationWhite, path: "/conversations" },
  { label: "Review", icon: review, activeIcon: reviewWhite, path: "/review" },
  { label: "Support", icon: support, activeIcon: supportWhite, path: "/support" },
];

const getNavLinkClass = (isActive: boolean) => {
  const base =
    "group flex gap-3 items-center px-3 py-2 mt-3 rounded-[12px] text-base font-medium transition-all duration-200";
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
  const [isCollapsed, setIsCollapsed] = useState(false);

  return (
    <>
      {/* Overlay */}
      <div
        className={`fixed inset-0 bg-purple-200 bg-opacity-40 z-30 lg:hidden transition-opacity ${
          isOpen ? "opacity-100 visible pointer-events-auto" : "opacity-0 invisible pointer-events-none"
        }`}
        onClick={() => setIsOpen(false)}
      />

      {/* Sidebar */}
      <div
        className={`
          fixed top-0 left-0 h-full bg-white shadow-lg z-40 transition-all duration-300 overflow-y-auto
          ${isCollapsed ? "w-16" : "w-64"}
          ${isOpen ? "translate-x-0" : "-translate-x-full"}
          md:translate-x-0 md:static md:block md:${isCollapsed ? "w-16" : "w-52"}
          lg:${isCollapsed ? "w-16" : "w-64"}
        `}
        style={{ WebkitOverflowScrolling: "touch" }}
      >
        {/* Logo & toggle */}
        <div className="p-4 flex items-center justify-between">
          <div className="flex items-center gap-2 w-[202px] mx-auto">
            <img src={logo} className="w-[68px] h-[68px]" alt="Logo" />
            {!isCollapsed && (
              <p className="text-[20px] font-bold text-[#505050]">Sole Mound</p>
            )}
          </div>

          {/* Collapse button (hidden as per your code) */}
          <div className="items-center gap-2 hidden">
            <Button
              size="icon"
              onClick={() => setIsCollapsed(!isCollapsed)}
              className="bg-[#FDF1F7] hover:bg-purple-400 text-white p-2 rounded-full"
            >
              {isCollapsed ? (
                <ChevronRight className="w-4 h-4" />
              ) : (
                <ChevronLeft className="w-4 h-4" />
              )}
            </Button>
          </div>
        </div>

        {/* Navigation items */}
        <nav className="mt-4 w-[202px] mx-auto">
          {menuItems.map((item) => (
            <NavLink key={item.path} to={item.path} onClick={() => setIsOpen(false)}>
              {({ isActive }) => (
                <div
                  className={`${getNavLinkClass(isActive)} ${
                    isCollapsed ? "justify-center" : ""
                  }`}
                >
                  <img
                    src={isActive ? item.activeIcon : item.icon}
                    className="w-6 h-6"
                    alt={item.label}
                  />
                  {!isCollapsed && <span>{item.label}</span>}
                </div>
              )}
            </NavLink>
          ))}
        </nav>

        {/* Logout */}
        <div className="bottom-4 px-4 w-full md:pt-28">
          <div
            className={`flex items-center gap-2 text-sm font-normal ml-4 text-[#A8537B] px-3 py-2 rounded-md cursor-pointer ${
              isCollapsed ? "justify-center" : ""
            }`}
          >
            <img src={logout} className="w-6 h-6" alt="Logout" />
            {!isCollapsed && (
              <span className="font-normal text-sm font-inter">Logout</span>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default Sidebar;
