/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useEffect, useState, useRef } from "react";
import { Send, Trash2, Search, MessageSquare } from "lucide-react";
import { socket } from "@/components/socket/socket";
import { useGetAllUsersQuery, useGetProfileQuery } from "@/redux/api/userApi";
import {
  useDeleteMessageMutation,
  useGetChatQuery,
  useMarkSeenMutation,
  useSendMessageMutation,
} from "@/redux/api/chatApi";

// ─── Types ────────────────────────────────────────────────────────────────────

interface Contact {
  id: string;
  name: string;
  avatar?: string;
  lastMessage: string;
  time: string;
  status: "online" | "offline";
}

interface Message {
  id?: string;
  sender: "user" | "contact";
  content: string;
  time: string;
  type: "text" | "product";
}

// ─── Shared Style Tokens ──────────────────────────────────────────────────────

const PINK_BG = "#fdf6fd";
const PINK_BORDER = "#f0e6f0";
const PINK_ACCENT = "#b87ab8";
const PINK_LIGHT = "#f5eaf5";

// ─── Avatar ───────────────────────────────────────────────────────────────────

function Avatar({
  name,
  avatar,
  size = 10,
  online,
}: {
  name: string;
  avatar?: string;
  size?: number;
  online?: boolean;
}) {
  const sz = `w-${size} h-${size}`;
  return (
    <div className="relative flex-shrink-0">
      {avatar ? (
        <img
          src={avatar}
          alt={name}
          className={`${sz} rounded-full object-cover`}
          style={{ border: `2px solid ${PINK_BORDER}` }}
        />
      ) : (
        <div
          className={`${sz} rounded-full flex items-center justify-center font-semibold text-white select-none`}
          style={{ background: PINK_ACCENT, fontSize: size * 1.5 }}
        >
          {name.charAt(0).toUpperCase()}
        </div>
      )}
      {online !== undefined && (
        <span
          className="absolute bottom-0 right-0 w-3 h-3 rounded-full border-2 border-white"
          style={{ background: online ? "#22c55e" : "#d1d5db" }}
        />
      )}
    </div>
  );
}

// ─── Main Component ───────────────────────────────────────────────────────────

const ConversationsDashboard: React.FC = () => {
  const [selectedContact, setSelectedContact] = useState<string>("");
  const [messageInput, setMessageInput] = useState("");
  const [searchTerm, setSearchTerm] = useState("");
  const [messages, setMessages] = useState<Message[]>([]);
  const [contacts, setContacts] = useState<Contact[]>([]);

  const messagesEndRef = useRef<HTMLDivElement | null>(null);

  // ── Current User ──
  const { data: profileData, isLoading: profileLoading } = useGetProfileQuery();
  const currentUserId = profileData?._id;

  // ── RTK Hooks ──
  const [markSeen] = useMarkSeenMutation();

  const [deleteMessageMutation] = useDeleteMessageMutation();
  const { data: users, refetch } = useGetAllUsersQuery();

  const { data: chatData } = useGetChatQuery(selectedContact, {
    skip: !selectedContact || !currentUserId,
  });
  const [sendMessage] = useSendMessageMutation();

  // ── Build contacts from users ──
  useEffect(() => {
    if (!users || !currentUserId) return;

    const formatted = users.map((user) => ({
      id: user._id,
      name: user.name,
      avatar: user.avatar || "",
      lastMessage: "",
      time: "",
      status: "offline" as const,
    }));

    // 🔥 current user কে top এ আনো
    const sorted = formatted.sort((a, b) => {
      if (a.id === currentUserId) return -1;
      if (b.id === currentUserId) return 1;
      return 0;
    });

    setContacts(sorted);
  }, [users, currentUserId]);

  // ─── Format chat data to messages ──
  useEffect(() => {
    if (!chatData || !currentUserId) return;

    const formattedMessages = chatData.map((msg: any) => ({
      id: msg._id,
      sender:
        msg.sender._id === currentUserId
          ? ("user" as const)
          : ("contact" as const),
      content: msg.content,
      time: new Date(msg.createdAt).toLocaleTimeString([], {
        hour: "2-digit",
        minute: "2-digit",
      }),
      type: "text" as const,
    }));

    setMessages(formattedMessages);
  }, [chatData, currentUserId]);

  // ── Socket: connect & announce online ──
  useEffect(() => {
    if (profileLoading || !currentUserId) return;
    if (!socket.connected) socket.connect();
    socket.emit("user_online", currentUserId);
  }, [currentUserId, profileLoading]);

  // ── Socket: online/offline status ──
  useEffect(() => {
    const handleStatus = ({ userId, status }: any) => {
      setContacts((prev) =>
        prev.map((c) => (c.id === userId ? { ...c, status } : c)),
      );
    };
    socket.on("update_user_status", handleStatus);
    return () => {
      socket.off("update_user_status", handleStatus);
    };
  }, []);

  // ── Load messages from RTK ──
  useEffect(() => {
    socket.on("receive_message", (msg) => {
      setMessages((prev) => [
        ...prev,
        {
          id: msg._id,
          sender: msg.sender._id === currentUserId ? "user" : "contact",
          content: msg.content,
          time: new Date(msg.createdAt).toLocaleTimeString([], {
            hour: "2-digit",
            minute: "2-digit",
          }),
          type: "text",
        },
      ]);
    });

    return () => {
      socket.off("receive_message");
    };
  }, [currentUserId]);

  // ── Mark seen ──
  useEffect(() => {
    if (selectedContact && currentUserId) {
      markSeen(selectedContact).unwrap().catch(console.error);
    }
  }, [selectedContact, currentUserId, markSeen]);

  // ── Socket: join room ──
  useEffect(() => {
    if (!selectedContact || !currentUserId) return;
    socket.emit("join_room", selectedContact);
  }, [selectedContact, currentUserId]);

  // ── Socket: receive message ──
  useEffect(() => {
    const handleReceiveMessage = (data: any) => {
      setMessages((prev) => {
        if (prev.some((m) => m.id === data._id)) return prev;
        return [
          ...prev,
          {
            id: data._id,
            sender: data.sender === currentUserId ? "user" : "contact",
            content: data.content,
            time: new Date(data.createdAt).toLocaleTimeString([], {
              hour: "2-digit",
              minute: "2-digit",
            }),
            type: "text",
          },
        ];
      });
    };
    socket.on("receive_message", handleReceiveMessage);
    return () => {
      socket.off("receive_message", handleReceiveMessage);
    };
  }, [currentUserId]);

  // ── Send message ──
  const handleSendMessage = async () => {
    if (!messageInput.trim() || !selectedContact || !currentUserId) return;

    const messageData = {
      receiverId: selectedContact,
      content: messageInput.trim(),
    };

    try {
      // ✅ 1. API call (database save)
      const res = (await sendMessage(messageData).unwrap()) as any;

      // ✅ 2. socket emit (real-time)
      socket.emit("send_message", {
        room: selectedContact,
        ...res, // backend থেকে আসা message
      });

      // ✅ 3. UI instant update (optional but smooth UX)
      setMessages((prev) => [
        ...prev,
        {
          id: res._id,
          sender: "user",
          content: res.content,
          time: new Date(res.createdAt).toLocaleTimeString([], {
            hour: "2-digit",
            minute: "2-digit",
          }),
          type: "text",
        },
      ]);

      setMessageInput("");
      refetch();
    } catch (error) {
      console.error("Send message error:", error);
    }
  };

  // ── Delete message ──
  const handleDeleteMessage = async (messageId: string) => {
    try {
      await deleteMessageMutation(messageId).unwrap();
      setMessages((prev) => prev.filter((msg) => msg.id !== messageId));
      socket.emit("delete_message", { messageId, room: selectedContact });
    } catch (error) {
      console.error("❌ Failed to delete message:", error);
    }
  };

  // ── Auto scroll ──
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const filteredContacts = contacts.filter((c) =>
    c.name.toLowerCase().includes(searchTerm.toLowerCase()),
  );

  const selectedContactData = contacts.find((c) => c.id === selectedContact);

  // ── Loading / Auth guards ──
  if (profileLoading) {
    return (
      <div
        className="h-screen flex items-center justify-center text-sm text-gray-400"
        style={{ background: PINK_BG, fontFamily: "'DM Sans', sans-serif" }}
      >
        Loading your profile...
      </div>
    );
  }

  if (!currentUserId) {
    return (
      <div
        className="h-screen flex items-center justify-center text-sm text-red-500"
        style={{ background: PINK_BG, fontFamily: "'DM Sans', sans-serif" }}
      >
        User not found. Please login again.
      </div>
    );
  }

  // ── Render ──
  return (
    <div
      className="flex h-screen overflow-hidden"
      style={{ background: PINK_BG, fontFamily: "'DM Sans', sans-serif" }}
    >
      <style>{`@import url('https://fonts.googleapis.com/css2?family=DM+Sans:wght@300;400;500;600&display=swap');`}</style>

      {/* ══ SIDEBAR ══ */}
      <div
        className="w-80 flex flex-col flex-shrink-0 border-r"
        style={{ background: "#fff", borderColor: PINK_BORDER }}
      >
        {/* Sidebar Header */}
        <div
          className="px-5 py-4 border-b"
          style={{ borderColor: PINK_BORDER }}
        >
          <div className="flex items-center gap-2 mb-4">
            <MessageSquare size={20} style={{ color: PINK_ACCENT }} />
            <h2 className="font-semibold text-gray-800 text-base">Messages</h2>
          </div>

          {/* Search */}
          <div className="relative">
            <Search
              size={15}
              className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-300"
            />
            <input
              type="text"
              placeholder="Search contacts..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-9 pr-3 py-2 text-sm rounded-lg border focus:outline-none focus:ring-1 transition"
              style={{
                borderColor: PINK_BORDER,
                background: PINK_BG,
                color: "#374151",
              }}
              onFocus={(e) => (e.target.style.borderColor = PINK_ACCENT)}
              onBlur={(e) => (e.target.style.borderColor = PINK_BORDER)}
            />
          </div>
        </div>

        {/* Contact List */}
        <div className="flex-1 overflow-y-auto">
          {filteredContacts.length === 0 && (
            <p className="text-center text-xs text-gray-400 mt-8">
              No contacts found
            </p>
          )}

          {filteredContacts.map((contact) => {
            const isSelected = selectedContact === contact.id;
            return (
              <div
                key={contact.id}
                onClick={() => {
                  setSelectedContact(contact.id);
                }}
                className="flex items-center gap-3 px-4 py-3 cursor-pointer transition-colors border-l-2"
                style={{
                  background: isSelected ? PINK_LIGHT : "transparent",
                  borderLeftColor: isSelected ? PINK_ACCENT : "transparent",
                }}
                onMouseEnter={(e) => {
                  if (!isSelected)
                    (e.currentTarget as HTMLDivElement).style.background =
                      "#fdf8fd";
                }}
                onMouseLeave={(e) => {
                  if (!isSelected)
                    (e.currentTarget as HTMLDivElement).style.background =
                      "transparent";
                }}
              >
                <Avatar
                  name={contact.name}
                  avatar={contact.avatar}
                  size={10}
                  online={contact.status === "online"}
                />
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium text-gray-800 truncate">
                    {contact.name}
                  </p>
                  <p className="text-xs text-gray-400 truncate">
                    {contact.status === "online" ? "Active now" : "Offline"}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* ══ CHAT AREA ══ */}
      <div className="flex-1 flex flex-col min-w-0">
        {/* No contact selected */}
        {!selectedContactData && (
          <div className="flex-1 flex flex-col items-center justify-center gap-3">
            <div
              className="w-16 h-16 rounded-full flex items-center justify-center"
              style={{ background: PINK_LIGHT }}
            >
              <MessageSquare size={28} style={{ color: PINK_ACCENT }} />
            </div>
            <p className="text-sm text-gray-400 font-medium">
              Select a contact to start chatting
            </p>
          </div>
        )}

        {selectedContactData && (
          <>
            {/* Chat Header */}
            <div
              className="px-5 py-3 border-b flex items-center gap-3 flex-shrink-0"
              style={{ background: "#fff", borderColor: PINK_BORDER }}
            >
              <Avatar
                name={selectedContactData.name}
                avatar={selectedContactData.avatar}
                size={10}
                online={selectedContactData.status === "online"}
              />
              <div>
                <h3 className="text-sm font-semibold text-gray-800">
                  {selectedContactData.name}
                </h3>
                <p className="text-xs text-gray-400">
                  {selectedContactData.status === "online"
                    ? "Active now"
                    : "Offline"}
                </p>
              </div>
            </div>

            {/* Messages */}
            <div
              className="flex-1 overflow-y-auto px-5 py-4 space-y-3"
              style={{ background: PINK_BG }}
            >
              {messages.length === 0 && (
                <div className="flex flex-col items-center justify-center h-full gap-2 text-gray-400">
                  <MessageSquare size={32} style={{ color: "#e8d0e8" }} />
                  <p className="text-xs">No messages yet. Say hello! 👋</p>
                </div>
              )}

              {messages.map((msg) => {
                const isUser = msg.sender === "user";
                return (
                  <div
                    key={msg.id}
                    className={`group flex items-end gap-2 ${
                      isUser ? "justify-end" : "justify-start"
                    }`}
                  >
                    {/* Contact avatar on left */}
                    {!isUser && (
                      <Avatar
                        name={selectedContactData.name}
                        avatar={selectedContactData.avatar}
                        size={7}
                      />
                    )}

                    <div className="relative max-w-[65%]">
                      {/* Delete button */}
                      {isUser && msg.id && (
                        <button
                          onClick={() => handleDeleteMessage(msg.id!)}
                          className="absolute -top-2 -left-2 w-6 h-6 rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all shadow-sm z-10"
                          style={{ background: "#fecaca" }}
                          title="Delete"
                        >
                          <Trash2 size={12} color="#dc2626" />
                        </button>
                      )}

                      {/* Bubble */}
                      <div
                        className="px-4 py-2.5 rounded-2xl text-sm leading-relaxed"
                        style={
                          isUser
                            ? {
                                background: PINK_ACCENT,
                                color: "#fff",
                                borderBottomRightRadius: 4,
                              }
                            : {
                                background: "#fff",
                                color: "#374151",
                                border: `1px solid ${PINK_BORDER}`,
                                borderBottomLeftRadius: 4,
                              }
                        }
                      >
                        <p>{msg.content}</p>
                        <span
                          className="block text-right mt-1"
                          style={{
                            fontSize: 10,
                            opacity: 0.65,
                            color: isUser ? "#fff" : "#9ca3af",
                          }}
                        >
                          {msg.time}
                        </span>
                      </div>
                    </div>
                  </div>
                );
              })}

              <div ref={messagesEndRef} />
            </div>

            {/* Input Bar */}
            <div
              className="px-5 py-3 border-t flex items-center gap-3 flex-shrink-0"
              style={{ background: "#fff", borderColor: PINK_BORDER }}
            >
              <input
                type="text"
                className="flex-1 px-4 py-2.5 text-sm rounded-xl border focus:outline-none focus:ring-1 transition"
                style={{
                  borderColor: PINK_BORDER,
                  background: PINK_BG,
                  color: "#374151",
                }}
                value={messageInput}
                onChange={(e) => setMessageInput(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && handleSendMessage()}
                placeholder="Type your message..."
                onFocus={(e) => (e.target.style.borderColor = PINK_ACCENT)}
                onBlur={(e) => (e.target.style.borderColor = PINK_BORDER)}
              />
              <button
                onClick={handleSendMessage}
                disabled={!messageInput.trim()}
                className="w-10 h-10 flex-shrink-0 rounded-xl flex items-center justify-center transition-opacity"
                style={{
                  background: messageInput.trim() ? PINK_ACCENT : "#e5e7eb",
                  cursor: messageInput.trim() ? "pointer" : "not-allowed",
                }}
              >
                <Send
                  size={17}
                  color={messageInput.trim() ? "#fff" : "#9ca3af"}
                />
              </button>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default ConversationsDashboard;
