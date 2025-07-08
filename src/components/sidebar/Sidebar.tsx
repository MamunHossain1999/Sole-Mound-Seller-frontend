import { useState } from "react";
import { NavLink } from "react-router-dom";
import { ChevronLeft, ChevronRight, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import logo from "@/assets/logo/Logo.png";

// Sidebar icons (default)
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

const getNavLinkClass = (isActive: boolean) => {
  const baseClass =
    "group flex gap-3 items-center px-3 py-2 mt-3 rounded-[12px] text-base font-medium transition-all duration-200";
  return isActive
    ? `${baseClass} bg-[#C8A8E9] text-white`
    : `${baseClass} text-[#505050] hover:bg-gray-100`;
};

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
      {/* Mobile overlay */}
      <div
        className={`fixed inset-0 !bg-purple-200 bg-opacity-40 z-30 lg:hidden transition-opacity ${
          isOpen ? "opacity-100 visible" : "opacity-0 invisible"
        }`}
      />

      <div
        className={`w-[257px] top-0 left-0 min-h-screen bg-[#FFFFFF] shadow-lg z-40 transition-all duration-300
        ${isCollapsed ? "w-16" : "w-64"}
        ${isOpen ? "translate-x-0" : "-translate-x-full"}
        lg:translate-x-0`}
      >
        {/* Logo & toggle */}
        <div className="p-4 flex items-center justify-between">
          <div className="flex items-center gap-2 w-[202px] mx-auto">
            <img src={logo} className="w-[68px] h-[68px]" alt="Logo" />
            {!isCollapsed && (
              <p className="text-[20px] font-bold text-[#505050]">Sole Mound</p>
            )}
          </div>

          {/* Collapse or Close Button */}
          <div className="md:hidden flex items-center gap-2">
            <Button
              size="icon"
              onClick={() => setIsCollapsed(!isCollapsed)}
              className="!bg-purple-300 !hover:bg-purple-400 text-white p-2 rounded-full"
            >
              {isCollapsed ? <ChevronRight className="w-4 h-4" /> : <ChevronLeft className="w-4 h-4" />}
            </Button>
            <Button
              size="icon"
              className="lg:hidden text-gray-600"
              onClick={() => setIsOpen(false)}
            >
              <X className="w-5 h-5" />
            </Button>
          </div>
        </div>

        {/* Nav Items */}
        <nav className="mt-4 w-[202px] mx-auto">
          {menuItems.map((item) => (
            <NavLink key={item.path} to={item.path} onClick={() => setIsOpen(false)}>
              {({ isActive }: { isActive: boolean }) => (
                <div className={`${getNavLinkClass(isActive)} ${isCollapsed ? "justify-center" : ""}`}>
                  <img
                    src={isActive ? item.activeIcon : item.icon}
                    className="w-6 h-6"
                    alt={`${item.label} icon`}
                  />
                  {!isCollapsed && <span>{item.label}</span>}
                </div>
              )}
            </NavLink>
          ))}
        </nav>

        {/* Logout */}
        <div className="absolute bottom-4 px-8 w-full">
          <div
            className={`flex items-center gap-2 text-sm font-normal text-[#A8537B] px-3 py-2 rounded-md cursor-pointer ${
              isCollapsed ? "justify-center" : ""
            }`}
          >
            <img
              src={logout}
              className="w-6 h-6"
              alt="Logout icon"
            />
            {!isCollapsed && <span className="text-sm font-normal text-[#A8537B]">Logout</span>}
          </div>
        </div>
      </div>
    </>
  );
};

export default Sidebar;