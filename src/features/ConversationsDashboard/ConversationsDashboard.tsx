import React, { useState } from "react";
import { Search, Send, Paperclip } from "lucide-react";

interface Contact {
  id: string;
  name: string;
  avatar: string;
  lastMessage: string;
  time: string;
  status: "online" | "offline";
  unreadCount?: number;
  isNew?: boolean;
}

interface Message {
  id: string;
  sender: "user" | "contact";
  content: string;
  time: string;
  type: "text" | "product";
  productInfo?: {
    name: string;
    price: string;
    stock: number;
    image: string;
  };
}

const ConversationsDashboard: React.FC = () => {
  const [selectedContact, setSelectedContact] = useState<string>("jane-doe");
  const [messageInput, setMessageInput] = useState("");
  const [searchTerm, setSearchTerm] = useState("");



  const contacts: Contact[] = [
    {
      id: "jane-doe",
      name: "Jane Doe",
      avatar:
        "https://images.unsplash.com/photo-1494790108755-2616b612b47c?w=40&h=40&fit=crop&crop=face",
      lastMessage: "Hi, I want make enquiries about yo...",
      time: "12:55 am",
      status: "online",
      isNew: true,
    },
    {
      id: "janet-adebayo",
      name: "Janet Adebayo",
      avatar:
        "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=40&h=40&fit=crop&crop=face",
      lastMessage: "Hi, I want make enquiries about yo...",
      time: "12:55 am",
      status: "offline",
      isNew: true,
    },
    {
      id: "kunle-adekunle",
      name: "Kunle Adekunle",
      avatar:
        "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=40&h=40&fit=crop&crop=face",
      lastMessage: "Hi, I want make enquiries about yo...",
      time: "12:55 am",
      status: "offline",
      isNew: true,
    },
    {
      id: "jane-doe-2",
      name: "Jane Doe",
      avatar:
        "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=40&h=40&fit=crop&crop=face",
      lastMessage: "Hi, I want make enquiries about yo...",
      time: "12:55 am",
      status: "offline",
      unreadCount: 2,
    },
    {
      id: "janet-adebayo-2",
      name: "Janet Adebayo",
      avatar:
        "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=40&h=40&fit=crop&crop=face",
      lastMessage: "Hi, I want make enquiries about yo...",
      time: "12:55 am",
      status: "offline",
    },
    {
      id: "kunle-adekunle-2",
      name: "Kunle Adekunle",
      avatar:
        "https://images.unsplash.com/photo-1570295999919-56ceb5ecca61?w=40&h=40&fit=crop&crop=face",
      lastMessage: "Hi, I want make enquiries about yo...",
      time: "12:55 am",
      status: "offline",
    },
  ];

  const messages: Message[] = [
    {
      id: "1",
      sender: "contact",
      content: "Hello, I want to make enquiries about your product",
      time: "12:55 am",
      type: "text",
    },
    {
      id: "2",
      sender: "contact",
      content: "",
      time: "12:55 am",
      type: "product",
      productInfo: {
        name: "iPhone 13",
        price: "$730,000.00",
        stock: 12,
        image:
          "https://images.unsplash.com/photo-1592750475338-74b7b21085ab?w=60&h=60&fit=crop",
      },
    },
    {
      id: "3",
      sender: "user",
      content: "Hello Janet, thank you for reaching out",
      time: "12:57 am",
      type: "text",
    },
    {
      id: "4",
      sender: "user",
      content: "What do you need to know?",
      time: "12:57 am",
      type: "text",
    },
    {
      id: "5",
      sender: "contact",
      content:
        "I want to know if the price is negotiable, I need about 2 Units",
      time: "12:55 am",
      type: "text",
    },
    {
      id: "6",
      sender: "user",
      content: "What do you need to know?",
      time: "12:57 am",
      type: "text",
    },
  ];

  const filteredContacts = contacts.filter((contact) =>
    contact.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const selectedContactInfo = contacts.find(
    (contact) => contact.id === selectedContact
  );

  const handleSendMessage = () => {
    if (messageInput.trim()) {
      // Here you would typically add the message to the messages array
      console.log("Sending message:", messageInput);
      setMessageInput("");
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  return (
    <div className=" bg-[#FDF1F7]">
      <div className="mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-lg md:text-2xl font-bold text-[#505050]">
            Conversations
          </h1>
          <div className="flex items-center mt-1">
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
              Conversations
            </span>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 ">
          {/* Contacts Sidebar */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-lg shadow-sm h-full flex flex-col">
              {/* Contacts Header */}
              <div className="p-4 border-b border-gray-200">
                <div className="flex items-center justify-between mb-4">
                  <h2 className="text-base font-semibold text-[#505050]">
                    Contacts
                  </h2>
                  <span className="text-base font-semibold text-[#505050]">
                    34
                  </span>
                </div>
                <div className="relative">
                  <Search className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                  <input
                    type="text"
                    placeholder="Search for anything..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="w-full pr-10 pl-4 py-2 border border-[#E2E3E8] rounded-[38px] focus:outline-none focus:ring-1 focus:ring-purple-400 focus:border-transparent"
                  />
                </div>
              </div>

              {/* Contacts List */}
              <div className="flex-1  overflow-y-auto">
                {filteredContacts.map((contact) => (
                  <div
                    key={contact.id}
                    onClick={() => setSelectedContact(contact.id)}
                    className={`p-4 border-b border-gray-100 cursor-pointer ${
                      selectedContact === contact.id
                        ? "bg-[#FDF1F7] border-r-2 border-r-[#FDF1F7]"
                        : ""
                    }`}
                  >
                    <div className="flex items-center space-x-3">
                      <div className="relative">
                        <img
                          src={contact.avatar}
                          alt={contact.name}
                          className="w-12 h-12 text-base rounded-[8px] object-cover"
                        />
                        {contact.status === "online" && (
                          <div className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 rounded-full border-2 border-white"></div>
                        )}
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center justify-between">
                          <p className="text-base font-semibold text-[#45464E] truncate">
                            {contact.name}
                          </p>
                          <div className="flex items-center space-x-2">
                            {contact.isNew && (
                              <span className="px-3 py-1 bg-[#FDF1F7] text-sm text-[#1F1F1F] font-medium">
                                New
                              </span>
                            )}
                            {contact.unreadCount && (
                              <span className="w-5 h-5 bg-[#FDF1F7] text-[#1C1D22] text-sm rounded-full flex items-center justify-center">
                                {contact.unreadCount}
                              </span>
                            )}
                          </div>
                        </div>
                        <div className="flex items-center justify-between mt-1">
                          <p className="text-sm text-[#919191] truncate">
                            {contact.lastMessage}
                          </p>
                          <span className="text-[8px] text-[#8B8D97]">
                            {contact.time}
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Chat Area */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-lg shadow-sm h-full flex flex-col">
              {/* Chat Header */}
              {selectedContactInfo && (
                <div className="p-4 border-b border-[#F1F3F9]">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-3">
                      <div className="relative">
                        <img
                          src={selectedContactInfo.avatar}
                          alt={selectedContactInfo.name}
                          className="w-10 h-10 rounded-[8px] object-cover"
                        />
                        {selectedContactInfo.status === "online" && (
                          <div className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 rounded-full border-2 border-white"></div>
                        )}
                      </div>
                      <div className="">
                        <p className="text-base font-medium text-[#45464E]">
                          {selectedContactInfo.name}
                        </p>
                        <p className="text-sm text-[#B6B7BC]">
                          {selectedContactInfo.status === "online"
                            ? "Online"
                            : "Offline"}{" "}
                          <span className="text-[#8B8D97] text-sm">
                            {selectedContactInfo.time}
                          </span>
                        </p>
                      </div>
                    </div>
                    <div className="flex space-x-4">
                      <div>
                        <div className="text-sm text-[#1F1F1F] rounded-[8px] px-2 bg-[#FEF5EA]">
                          New Customer
                        </div>
                        <div></div>
                      </div>
                      <div className="space-y-3">
                        <button className="text-sm text-[#A8537B] ">
                          View Profile
                        </button>
                        <div className="flex items-center space-x-1">
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="20"
                            height="21"
                            viewBox="0 0 20 21"
                            fill="none"
                          >
                            <path
                              fill-rule="evenodd"
                              clip-rule="evenodd"
                              d="M13.7615 18.4166H6.80495C4.24965 18.4166 2.28931 17.4936 2.84614 13.7789L3.4945 8.74457C3.83775 6.89102 5.02005 6.18164 6.05743 6.18164H14.5395C15.5921 6.18164 16.7058 6.94442 17.1024 8.74457L17.7508 13.7789C18.2237 17.0741 16.3168 18.4166 13.7615 18.4166Z"
                              stroke="#53545C"
                              stroke-width="1.5"
                              stroke-linecap="round"
                              stroke-linejoin="round"
                            />
                            <path
                              d="M13.8758 5.99877C13.8758 4.01038 12.2639 2.39847 10.2755 2.39847V2.39847C9.31797 2.39441 8.3983 2.77194 7.71981 3.44757C7.04131 4.12319 6.6599 5.04127 6.65991 5.99877H6.65991"
                              stroke="#53545C"
                              stroke-width="1.5"
                              stroke-linecap="round"
                              stroke-linejoin="round"
                            />
                            <path
                              d="M12.7469 9.75248H12.7088"
                              stroke="#53545C"
                              stroke-width="1.5"
                              stroke-linecap="round"
                              stroke-linejoin="round"
                            />
                            <path
                              d="M7.88801 9.75248H7.84987"
                              stroke="#53545C"
                              stroke-width="1.5"
                              stroke-linecap="round"
                              stroke-linejoin="round"
                            />
                          </svg>
                          <span className="text-sm text-center text-[#A6A8B1]">
                            0 Orders
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* Messages Area */}
              <div className="flex-1 p-4 overflow-y-auto space-y-4">
                <div className="text-center">
                  <span className="text-sm text-[#1C1D22] border border-[#E2E3E8] px-3 py-1 rounded-[8px]">
                    12 August 2022
                  </span>
                </div>

                {messages.map((message) => (
                  <div
                    key={message.id}
                    className={`flex ${
                      message.sender === "user"
                        ? "justify-end"
                        : "justify-start"
                    }`}
                  >
                    <div
                      className={`max-w-xs lg:max-w-md ${
                        message.sender === "user"
                          ? "bg-[#FDF1F7] text-[#1F1F1F] text-base"
                          : "bg-[#C8A8E9] text-[#FFF]"
                      } rounded-lg p-3`}
                    >
                      {message.type === "product" && message.productInfo ? (
                        <div className="bg-white rounded-lg p-3 text-gray-900">
                          <div className="flex items-center space-x-3">
                            <img
                              src={message.productInfo.image}
                              alt={message.productInfo.name}
                              className="w-12 h-12 rounded-lg object-cover"
                            />
                            <div className="flex-1">
                              <p className="font-medium bg-[#FDF1F7">
                                {message.productInfo.name}
                              </p>
                              <p className="text-sm text-[#8B8D97]">
                                {message.productInfo.price}
                              </p>
                              <p className="text-xs text-green-600">
                                {message.productInfo.stock} In Stock
                              </p>
                            </div>
                          </div>
                        </div>
                      ) : (
                        <p className="text-sm">{message.content}</p>
                      )}
                      <p
                        className={`text-xs mt-1 ${
                          message.sender === "user"
                            ? "text-[#919191]"
                            : "text-purple-200"
                        }`}
                      >
                        {message.time}
                      </p>
                    </div>
                  </div>
                ))}

                <div className="text-center">
                  <span className="text-sm text-[#1C1D22] border border-[#E2E3E8] px-3 py-1 rounded-[8px]">
                    Today
                  </span>
                </div>
              </div>

              {/* Message Input */}
              <div className="p-4 border-t border-gray-200">
                <div className="flex items-center space-x-3">
                  <button className="p-2 text-gray-400 hover:text-gray-600">
                    <Paperclip className="w-5 h-5" />
                  </button>
                  <div className="flex-1 relative">
                    <input
                      type="text"
                      placeholder="Your message"
                      value={messageInput}
                      onChange={(e) => setMessageInput(e.target.value)}
                      onKeyPress={handleKeyPress}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-1 focus:ring-purple-500 focus:border-transparent"
                    />
                  </div>
                  <button
                    onClick={handleSendMessage}
                    className="p-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors"
                  >
                    <Send className="w-5 h-5" />
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ConversationsDashboard;
