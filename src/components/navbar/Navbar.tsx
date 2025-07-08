import { useState } from "react";
import {
  Search,
  Bell,
  ShoppingCart,
  Settings,
  User,
  LogOut,
  Mail,
  Menu,
  ChevronDown,
  DollarSign,
  MessageCircle,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
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
    <header className="w-full border-b border-gray-200 mx-auto sticky top-0 z-50 ">
      <div className="bg-white mx-4 rounded-lg px-2 sm:px-6 lg:px-8 shadow-lg ">
        <div className="flex items-center justify-between h-18 gap-2 ">
          {/* Left: Mobile Menu + Logo */}
          <div className="flex items-center ">
            <div className="lg:hidden">
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
            <div className="relative w-full max-w-xs sm:max-w-md">
              <Input
                placeholder="Search products"
                className={`pl-4 pr-10 !py-3 w-full border border-gray-300 rounded-lg transition-all duration-200 text-sm sm:text-base ${
                  isSearchFocused
                    ? "border-purple-500 ring-2 ring-purple-100 shadow-md"
                    : "hover:border-gray-400 focus:border-purple-500"
                }`}
                onFocus={() => setIsSearchFocused(true)}
                onBlur={() => setIsSearchFocused(false)}
              />
              {/* Icon aligned right inside input */}
              <Search className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 w-4 h-4" />
            </div>
          </div>

          {/* Right Section */}
          <div className=" hidden md:block">
            <div className="flex items-center gap-2">
              {/* Messages */}
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button
                    variant="ghost"
                    size="sm"
                    className="p-2 rounded-full !py-3 border-2 border-amber-300 relative !bg-purple-200"
                    aria-label="Messages"
                  >
                    <MessageCircle className="w-5 h-5 text-gray-600" />
                    {messages.length > 0 && (
                      <Badge className="absolute -top-1 -right-1 bg-red-500 text-white text-xs w-5 h-5 rounded-full flex items-center justify-center border-2 border-white">
                        {messages.length}
                      </Badge>
                    )}
                  </Button>
                </DropdownMenuTrigger>

                {/* Responsive Dropdown content */}
                <DropdownMenuContent
                  align="end"
                  className="w-full max-w-xs sm:w-80 max-h-[16rem] overflow-y-auto"
                >
                  <DropdownMenuLabel className="flex justify-between items-center">
                    <span>Messages</span>
                    <Button
                      variant="ghost"
                      size="sm"
                      className="text-xs text-purple-600"
                    >
                      Mark all read
                    </Button>
                  </DropdownMenuLabel>
                  <DropdownMenuSeparator />
                  <div>
                    {messages.map(({ id, sender, message, time }) => (
                      <DropdownMenuItem
                        key={id}
                        className="flex items-start gap-3 p-3 hover:bg-gray-50 cursor-pointer"
                      >
                        <div className="flex-shrink-0">
                          <MessageCircle className="w-6 h-6 text-blue-500" />
                        </div>
                        <div className="flex-1">
                          <p className="text-sm font-semibold">{sender}</p>
                          <p className="text-xs text-gray-600 truncate">
                            {message}
                          </p>
                          <p className="text-xs text-gray-400 mt-1">{time}</p>
                        </div>
                      </DropdownMenuItem>
                    ))}
                    {messages.length === 0 && (
                      <p className="p-4 text-center text-gray-500 text-sm">
                        No new messages
                      </p>
                    )}
                  </div>
                </DropdownMenuContent>
              </DropdownMenu>

              {/* Notifications */}
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button
                    variant="ghost"
                    size="sm"
                    className="p-2 rounded-full relative !py-3 !bg-purple-200"
                    aria-label="Notifications"
                  >
                    <Bell className="w-5 h-5 text-gray-600" />
                    {notifications.length > 0 && (
                      <Badge className="absolute -top-1 -right-1 bg-red-500 text-white text-xs w-5 h-5 rounded-full flex items-center justify-center border-2 border-white">
                        {notifications.length}
                      </Badge>
                    )}
                  </Button>
                </DropdownMenuTrigger>

                <DropdownMenuContent
                  align="end"
                  className="w-full max-w-xs sm:w-80 max-h-[16rem] overflow-y-auto"
                >
                  <DropdownMenuLabel className="flex justify-between items-center">
                    <span>Notifications</span>
                    <Button
                      variant="ghost"
                      size="sm"
                      className="text-xs text-purple-600"
                    >
                      Mark all read
                    </Button>
                  </DropdownMenuLabel>
                  <DropdownMenuSeparator />
                  <div>
                    {notifications.map((notification) => (
                      <DropdownMenuItem
                        key={notification.id}
                        className="flex items-start gap-3 p-3 hover:bg-gray-50 cursor-pointer"
                      >
                        <div className="mt-1">
                          {getNotificationIcon(notification.type)}
                        </div>
                        <div className="flex-1">
                          <p className="text-sm font-medium">
                            {notification.title}
                          </p>
                          <p className="text-xs text-gray-600">
                            {notification.message}
                          </p>
                          <p className="text-xs text-gray-400 mt-1">
                            {notification.time}
                          </p>
                        </div>
                      </DropdownMenuItem>
                    ))}
                    {notifications.length === 0 && (
                      <p className="p-4 text-center text-gray-500 text-sm">
                        No new notifications
                      </p>
                    )}
                  </div>
                </DropdownMenuContent>
              </DropdownMenu>

              {/* Profile */}
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button className="flex items-center !py-3 !bg-white rounded-lg p-2">
                    <Avatar className="w-8 h-8">
                      <AvatarImage src="/api/placeholder/32/32" />
                      <AvatarFallback className="bg-purple-600 text-white text-sm">
                        GH
                      </AvatarFallback>
                    </Avatar>
                    <div className="hidden sm:block text-left">
                      <p className="text-sm font-medium text-black">Guy Hawkins</p>
                      <p className="text-xs text-gray-600">Super Admin</p>
                    </div>
                    <ChevronDown className="w-4 h-4 text-gray-400 hidden sm:block" />
                  </Button>
                </DropdownMenuTrigger>

                <DropdownMenuContent
                  align="end"
                  className="w-full max-w-xs sm:w-56 max-h-[16rem] overflow-y-auto"
                >
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
                  <DropdownMenuSeparator />
                  <DropdownMenuItem>
                    <User className="w-4 h-4 mr-2" />
                    Profile
                  </DropdownMenuItem>
                  <DropdownMenuItem>
                    <Settings className="w-4 h-4 mr-2" />
                    Settings
                  </DropdownMenuItem>
                  <DropdownMenuItem>
                    <Mail className="w-4 h-4 mr-2" />
                    Messages
                  </DropdownMenuItem>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem className="text-red-600">
                    <LogOut className="w-4 h-4 mr-2" />
                    Logout
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          </div>

          {/* Mobile Menu Icon */}
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" className="sm:hidden p-2 rounded-full !bg-purple-300">
                <Menu className="w-5 h-5 text-gray-600" />
              </Button>
            </DropdownMenuTrigger>

            <DropdownMenuContent align="end" className="w-64 p-2">
              <DropdownMenuLabel className="text-sm font-semibold text-gray-700">
                Menu
              </DropdownMenuLabel>
              <DropdownMenuSeparator />

              {/* Messages */}
              <DropdownMenuItem className="flex items-center gap-2">
                <MessageCircle className="w-4 h-4 text-blue-500" />
                Messages
                <Badge className="ml-auto bg-red-500 text-white text-xs px-2 rounded-full">
                  {messages.length}
                </Badge>
              </DropdownMenuItem>

              {/* Notifications */}
              <DropdownMenuItem className="flex items-center gap-2">
                <Bell className="w-4 h-4 text-yellow-500" />
                Notifications
                <Badge className="ml-auto bg-red-500 text-white text-xs px-2 rounded-full">
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

              <DropdownMenuItem>
                <User className="w-4 h-4 mr-2" />
                Profile
              </DropdownMenuItem>
              <DropdownMenuItem>
                <Settings className="w-4 h-4 mr-2" />
                Settings
              </DropdownMenuItem>
              <DropdownMenuItem>
                <LogOut className="w-4 h-4 mr-2 text-red-500" />
                <span className="text-red-600">Logout</span>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
    </header>
  );
};

export default Navbar;
