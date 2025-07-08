import { useState } from "react";
import mail from "@/assets/navbarIcon/mail.svg";
import notification from "@/assets/navbarIcon/notifications.png";
import { Search, Menu, Mail, ShoppingCart, DollarSign, Bell, User } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { FaRegBell } from "react-icons/fa";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

interface NavbarProps {
  onMenuClick?: () => void;
}

const Navbar = ({ onMenuClick }: NavbarProps) => {
  const [isSearchFocused, setIsSearchFocused] = useState(false);

  const notifications = [
    {
      id: 1,
      title: "New Order Received",
      message: "Order #1234 from John Doe",
      time: "2 min ago",
      type: "order",
    },
    {
      id: 2,
      title: "Payment Completed",
      message: "Payment of $299.99 received",
      time: "5 min ago",
      type: "payment",
    },
  ];

  type Message = {
    id: string;
    sender: string;
    message: string;
    time: string;
    avatarUrl?: string;
  };

  const messages: Message[] = [
    {
      id: "1",
      sender: "John Doe",
      message: "Hey! Are you available for the meeting tomorrow?",
      time: "2 mins ago",
    },
    {
      id: "2",
      sender: "Jane Smith",
      message: "Don't forget to check the documents I sent.",
      time: "1 hour ago",
    },
  ];

  const getNotificationIcon = (type: string) => {
    switch (type) {
      case "order":
        return <ShoppingCart className="w-4 h-4 text-blue-500" />;
      case "payment":
        return <DollarSign className="w-4 h-4 text-green-500" />;
      case "alert":
        return <Bell className="w-4 h-4 text-orange-500" />;
      case "user":
        return <User className="w-4 h-4 text-purple-500" />;
      default:
        return <Bell className="w-4 h-4 text-gray-500" />;
    }
  };

  return (
    <header className="w-full border-gray-200 mx-auto sticky top-0 z-50 ">
      <div className="bg-white mx-4 rounded-lg px-2 sm:px-6 lg:px-8 shadow-lg ">
        <div className="flex items-center justify-between h-24 gap-2 ">
          {/* Left: Mobile Menu + Logo */}
          <div className="flex items-center ">
            <div className="md:hidden">
              <Button
                variant="ghost"
                size="sm"
                onClick={onMenuClick}
                className="p-2 !bg-purple-200"
              >
                <Menu className="w-5 h-5 " />
              </Button>
            </div>
          </div>

          {/* Center: Search */}
          <div className="flex-1 flex pr-2 sm:pr-4">
            <div className="relative w-full max-w-md sm:max-w-xl">
              <Input
                placeholder="Search products"
                className={`pl-4 pr-10 !py-3 w-full border border-[#B6B7BC] text-[#949494] font-medium rounded-[12px] transition-all duration-200 text-sm sm:text-base ${
                  isSearchFocused
                    ? "!border-purple-500 ring-1 ring-purple-400 "
                    : "hover:border-purple-400 focus:outline-none"
                }`}
                onFocus={() => setIsSearchFocused(true)}
                onBlur={() => setIsSearchFocused(false)}
              />
              {/* Icon aligned right inside input */}
              <Search className="absolute right-3 top-1/2 -translate-y-1/2 text-[#949494] w-4 h-4" />
            </div>
          </div>

          {/* Right Section */}
          <div className=" hidden lg:block">
            <div className="flex items-center gap-2">
              {/* Messages */}
              {/* Messages */}
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button
                    className="w-9 h-9 relative rounded-[12px] !bg-[#F1DAFC] border border-[#B6B7BC] flex items-center justify-center"
                    aria-label="Messages"
                  >
                     <Mail className="w-6 h-6 object-cover text-[#505050]" />
                    {messages.length > 0 && (
                      <div className="absolute -top-2 -right-1 bg-[#FF1C1C] text-white text-[10px] w-5 h-5 rounded-full flex items-center justify-center border-2 border-white">
                        {messages.length}
                      </div>
                    )}
                  </Button>
                </DropdownMenuTrigger>
              </DropdownMenu>

              {/* Notifications */}
                <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          className="relative rounded-[12px] !bg-[#F1DAFC] border border-[#B6B7BC] flex items-center justify-center w-9 h-9"
          aria-label="Notifications"
        >
          {/* <img
            src={notification}
            alt="Notification"
            className="w-6 h-6 object-contain"
          /> */}
        <FaRegBell className="w-6 h-6 object-cover text-[#505050]" />
          {notifications.length > 0 && (
            <div className="absolute -top-2 -right-1 bg-[#FF1C1C] text-white text-[10px] w-5 h-5 rounded-full flex items-center justify-center border-2 border-white">
              {notifications.length}
            </div>
          )}
        </Button>
      </DropdownMenuTrigger>

      <DropdownMenuContent className="w-72 mt-2">
        <DropdownMenuLabel>Notifications</DropdownMenuLabel>
        <DropdownMenuSeparator />
        {notifications.length > 0 ? (
          notifications.map((item) => (
            <DropdownMenuItem key={item.id} className="flex items-center gap-3">
              {getNotificationIcon(item.type)}
              <span className="text-sm text-gray-700">{item.message}</span>
            </DropdownMenuItem>
          ))
        ) : (
          <DropdownMenuItem className="text-gray-400 text-sm">
            No notifications
          </DropdownMenuItem>
        )}
      </DropdownMenuContent>
    </DropdownMenu>

              {/* Profile */}
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button className="flex items-center !py-3 !bg-white  p-2">
                    <Avatar className="w-8 h-8">
                      <AvatarImage src="/api/placeholder/32/32" />
                      <AvatarFallback className="bg-purple-600 text-white text-sm">
                        GH
                      </AvatarFallback>
                    </Avatar>
                    <div className="hidden sm:block text-left">
                      <p className="text-base font-semibold text-[#505050]">
                        Guy Hawkins
                      </p>
                      <p className="text-sm font-medium text-[#919191]">
                        Super Admin
                      </p>
                    </div>
                  </Button>
                </DropdownMenuTrigger>
              </DropdownMenu>
            </div>
          </div>

          {/* Mobile Menu Icon */}
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button
                variant="default"
                className="lg:hidden p-2 rounded-full !bg-purple-200 cursor-pointer"
              >
                <Menu className="w-5 h-5 text-gray-600" />
              </Button>
            </DropdownMenuTrigger>

            <DropdownMenuContent align="end" className="w-64 mt-4 ">
              <DropdownMenuLabel className="text-sm font-semibold text-gray-700">
                Menu
              </DropdownMenuLabel>
              <DropdownMenuSeparator />

              {/* Messages */}
              <DropdownMenuItem className="flex items-center gap-2">
                <img src={mail} alt="Mail" />
                Messages
                <Badge className="ml-auto bg-[#FF1C1C] text-[#F1DAFC] text-xs px-2 rounded-full">
                  {messages.length}
                </Badge>
              </DropdownMenuItem>

              {/* Notifications */}
              <DropdownMenuItem className="flex items-center gap-2">
                <img src={notification} alt="Notification" />
                Notifications
                <Badge className="ml-auto bg-[#FF1C1C] text-[#F1DAFC] text-xs px-2 rounded-full">
                  {notifications.length}
                </Badge>
              </DropdownMenuItem>

              <DropdownMenuSeparator />

              {/* Profile Section */}
              <DropdownMenuLabel>
                <div className="flex items-center gap-2">
                  <Avatar className="w-8 h-8">
                    <AvatarImage src="/api/placeholder/32/32" />
                    <AvatarFallback className="bg-purple-600 text-white text-sm">
                      GH
                    </AvatarFallback>
                  </Avatar>
                  <div>
                    <p className="font-medium">Guy Hawkins</p>
                    <p className="text-xs text-gray-600">guy@example.com</p>
                  </div>
                </div>
              </DropdownMenuLabel>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
    </header>
  );
};

export default Navbar;
