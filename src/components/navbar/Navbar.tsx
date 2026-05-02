/* eslint-disable @typescript-eslint/no-explicit-any */
import { useEffect, useMemo, useState } from "react";
import { Search, Menu, Mail } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { FaRegBell } from "react-icons/fa";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useGetProfileQuery } from "@/redux/api/userApi";
import { useGetProductsQuery } from "@/redux/api/productApi";
import {
  useGetUnreadByUserQuery,
  useGetUnreadCountQuery,
} from "@/redux/api/chatApi"; // শুধু এটাই রাখছি এখন
import { socket } from "../socket/socket";
import { useDebounce } from "../searchHook/useDebounce";
import { NavLink, useNavigate } from "react-router-dom";

interface NavbarProps {
  onMenuClick?: () => void;
}

interface UserProfile {
  _id?: string;
  name?: string;
  avatar?: string;
  email?: string;
  role?: string;
}

const getProfile = (data: any): UserProfile | undefined => {
  if (!data) return undefined;
  return data.data || data;
};

const Navbar = ({ onMenuClick }: NavbarProps) => {
  const { data: profileData, isLoading } = useGetProfileQuery();
  const [searchTerm, setSearchTerm] = useState("");

  const navigate = useNavigate();

  // ==================== QUERIES ====================
  const { data: productsData } = useGetProductsQuery();
  const profile = getProfile(profileData);
  const currentUserId = profile?._id;

  const { data: unreadCountData, refetch: refetchUnread } =
    useGetUnreadCountQuery(undefined, {
      skip: !productsData, // user না থাকলে call হবে না
    });

  const unreadCount = unreadCountData?.count ?? 0;

  const { data: unreadUsers } = useGetUnreadByUserQuery(undefined, {
    skip: !productsData,
  });

  const unreadUsersCount = unreadUsers?.count ?? 0;

  // console.log(unreadUsers)
  // console.log(unreadCount)

  // ==================== SOCKET REAL-TIME ====================
  useEffect(() => {
    if (!currentUserId) return;

    const handleNewMessage = () => {
      refetchUnread();
    };

    socket.on("new_message_notification", handleNewMessage);
    // যদি backend "receive_message" ইভেন্টও পাঠায় তাহলে:
    // socket.on("receive_message", handleNewMessage);

    return () => {
      socket.off("new_message_notification", handleNewMessage);
    };
  }, [currentUserId, refetchUnread]);

  // ==================== SEARCH ====================
  const debouncedSearch = useDebounce(searchTerm, 300);

  const products = useMemo(
    () =>
      Array.isArray(productsData)
        ? productsData
        : (productsData as any)?.data || [],
    [productsData],
  );

  const filteredProducts = useMemo(() => {
    if (!debouncedSearch) return [];

    const term = debouncedSearch.toLowerCase();
    return products.filter((p: any) => p.name?.toLowerCase().includes(term));
  }, [products, debouncedSearch]);

  if (isLoading) {
    return (
      <header className="w-full sticky top-0 z-50 bg-white shadow-sm">
        <div className="mx-4 sm:mx-6 lg:mx-8 py-3">
          <div className="flex items-center justify-between">
            <div className="h-9 w-9 bg-gray-200 animate-pulse rounded-[12px]" />
            <div className="h-9 w-80 bg-gray-200 animate-pulse rounded-[12px]" />
            <div className="h-9 w-28 bg-gray-200 animate-pulse rounded-[12px]" />
          </div>
        </div>
      </header>
    );
  }

  const displayName = profile?.name?.trim() || "User";
  const nameInitial = displayName.charAt(0).toUpperCase();

  return (
    <header className="w-full sticky top-0 z-50 bg-white shadow-sm">
      <div className="mx-4 sm:mx-6 lg:mx-8 py-3">
        <div className="flex items-center justify-between gap-2">
          {/* Mobile Menu */}
          <div className="md:hidden">
            <button
              onClick={onMenuClick}
              className="w-9 h-9 rounded-[12px] bg-[#F1DAFC] flex items-center justify-center border border-[#B6B7BC]"
            >
              <Menu className="w-6 h-6 text-[#505050]" />
            </button>
          </div>

          {/* Search Bar */}
          <div className="relative w-full max-w-md sm:max-w-xl">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-4 h-4" />
            <Input
              type="text"
              placeholder="Search in Daraz..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10 pr-4 py-2.5 w-full border border-gray-300 rounded-md text-sm focus:ring-2 focus:ring-orange-500"
            />

            {/* Search Results Dropdown */}
            {debouncedSearch && (
              <div className="absolute top-full left-0 w-full bg-white border mt-1 rounded-md shadow-lg z-50 max-h-96 overflow-auto">
                {filteredProducts.length > 0 ? (
                  filteredProducts.slice(0, 8).map((product: any) => (
                    <div
                      key={product._id}
                      onClick={() => {
                        navigate(`/product-details/${product._id}`);
                        setSearchTerm("");
                      }}
                      className="flex items-center gap-3 px-3 py-2 hover:bg-gray-100 cursor-pointer transition"
                    >
                      <img
                        src={product.images?.[0] || "/placeholder.jpg"}
                        alt={product.name}
                        className="w-10 h-10 object-cover rounded"
                      />
                      <p className="text-sm text-gray-800 line-clamp-1">
                        {product.name}
                      </p>
                    </div>
                  ))
                ) : (
                  <p className="p-3 text-sm text-gray-500 text-center">
                    No product found
                  </p>
                )}
              </div>
            )}
          </div>

          {/* Right Section */}
          <div className="flex items-center gap-2">
            {/* Messages (Mail) Button */}
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button className="w-9 h-9 relative rounded-[12px] bg-[#F1DAFC]">
                  <Mail className="w-6 h-6 text-[#505050]" />
                  {unreadUsersCount > 0 && (
                    <span className="absolute -top-2 -right-1 bg-red-500 text-white text-[10px] w-5 h-5 rounded-full flex items-center justify-center border-2 border-white font-medium">
                      {unreadUsersCount > 99 ? "99+" : unreadUsersCount}
                    </span>
                  )}
                </Button>
              </DropdownMenuTrigger>
            </DropdownMenu>

            {/* Notifications Button */}
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button className="w-9 h-9 relative rounded-[12px] bg-[#F1DAFC] border border-[#B6B7BC]">
                  <FaRegBell className="w-6 h-6 text-[#505050]" />

                  {/* 🔥 Notification Badge */}
                  {unreadCount > 0 && (
                    <span className="absolute -top-1 -right-1 bg-red-500 text-white text-[10px] w-5 h-5 flex items-center justify-center rounded-full">
                      {unreadCount}
                    </span>
                  )}
                </Button>
              </DropdownMenuTrigger>

              <DropdownMenuContent align="end" className="w-80">
                <div className="p-3 border-b font-semibold text-sm">
                  Notifications
                </div>

                {unreadCount > 0 ? (
                  <div className="p-3 text-sm text-gray-700">
                    You have <b>{unreadCount}</b> unread messages
                  </div>
                ) : (
                  <div className="p-4 text-center text-gray-500">
                    No notifications
                  </div>
                )}
              </DropdownMenuContent>
            </DropdownMenu>

            {/* Profile */}
            <NavLink
              to="/profile-settings"
              className="flex items-center gap-2 hover:bg-gray-50 px-3 py-1.5 rounded-xl transition-colors"
            >
              <div className="text-right">
                <p className="text-sm font-semibold text-[#1F1F1F]">
                  {displayName}
                </p>
                {profile?.role && (
                  <p className="text-[10px] text-gray-500 -mt-0.5 capitalize">
                    {profile.role}
                  </p>
                )}
              </div>

              <Avatar className="w-9 h-9 border border-[#E5E7EB]">
                <AvatarImage src={profile?.avatar} alt={displayName} />
                <AvatarFallback className="bg-[#C8A8E9] text-white font-medium">
                  {nameInitial}
                </AvatarFallback>
              </Avatar>
            </NavLink>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Navbar;
