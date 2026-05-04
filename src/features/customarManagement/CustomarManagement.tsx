/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useState } from "react";
import { Search, ChevronDown } from "lucide-react";
import { Link } from "react-router-dom";
import {
  useDeleteUserMutation,
  useGetAllUsersQuery,
} from "@/redux/api/userApi";
import { useGetAllOrdersQuery } from "@/redux/api/orderApi";
import { toast } from "react-toastify";

interface StatsCard {
  title: string;
  value: string;
  change: string;
  changeType: "positive" | "negative";
  icon: React.ReactNode;
  bgColor: string;
}

const CustomarManagement: React.FC = () => {
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [selectedUserId, setSelectedUserId] = useState<string | null>(null);
  const [selectedCustomers, setSelectedCustomers] = useState<string[]>([]);
  const [searchTerm, setSearchTerm] = useState("");

  const { data: customers = [], isLoading, isError } = useGetAllUsersQuery();
  const { data: orders = [] } = useGetAllOrdersQuery();
  const [deleteUser] = useDeleteUserMutation();

  console.log(orders);
  // total buy
  const getTotalBuy = (userId: string) => {
    if (!orders) return 0;

    return orders
      .filter((order: any) => order.userId === userId)
      .reduce((sum: number, order: any) => {
        return sum + (order.totalAmount ?? order.summary?.subtotal ?? 0);
      }, 0);
  };

  // payment method name
  const getPaymentMethod = (userId: string) => {
    const userOrders = orders?.filter((o: any) => o.userId === userId);

    const lastOrder = userOrders?.[userOrders.length - 1];

    return lastOrder?.paymentMethod ?? "N/A";
  };

  // card show
  const formatPaymentMethod = (method: string) => {
    switch (method) {
      case "stripe":
        return "💳 VisaCard";
      case "cod":
        return "💵 Cash on Delivery";
      case "paypal":
        return "🅿️ PayPal";
      default:
        return method;
    }
  };

  // invoice show
  const getInvoiceTotalAll = () => {
    return (
      orders?.reduce(
        (sum: number, order: any) => sum + (order.summary?.subtotal ?? 0),
        0,
      ) || 0
    );
  };

  // due date
  const getDueDate = (userId: string) => {
    const userOrders = orders?.filter((order: any) => order.userId === userId);

    const lastOrder = userOrders?.[userOrders.length - 1];

    return lastOrder?.date || "N/A";
  };

  // order stutas
  const getUserStatus = (userId: string) => {
    if (!orders || orders.length === 0) return "New";

    const userOrders = orders.filter((order: any) => order.userId === userId);

    if (userOrders.length === 0) return "New";

    const sortedOrders = [...userOrders].sort(
      (a: any, b: any) =>
        new Date(b.date).getTime() - new Date(a.date).getTime(),
    );

    const lastOrder = sortedOrders[0];

    if (!lastOrder?.date) return "New";

    const diffDays =
      (Date.now() - new Date(lastOrder.date).getTime()) / (1000 * 60 * 60 * 24);

    if (diffDays <= 7) return "Active";

    return "Inactive";
  };

  const statsCards: StatsCard[] = [
    {
      title: "All Customers",
      value: customers?.length?.toString() || "0",
      change: "+34.4%",
      changeType: "positive",
      icon: (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="22"
          height="16"
          viewBox="0 0 22 16"
          fill="none"
        >
          <path
            d="M10.9491 10.54C7.49909 10.54 4.58813 11.1038 4.58813 13.2795C4.58813 15.4562 7.51789 16.0001 10.9491 16.0001C14.3991 16.0001 17.31 15.4364 17.31 13.2606C17.31 11.084 14.3803 10.54 10.9491 10.54Z"
            fill="#C8A8E9"
          />
          <path
            opacity="0.4"
            d="M10.949 8.46703C13.2851 8.46703 15.1583 6.58307 15.1583 4.23351C15.1583 1.88306 13.2851 0 10.949 0C8.61293 0 6.73975 1.88306 6.73975 4.23351C6.73975 6.58307 8.61293 8.46703 10.949 8.46703Z"
            fill="#C8A8E9"
          />
          <path
            opacity="0.4"
            d="M20.0879 5.21972C20.6923 2.84225 18.9203 0.707031 16.6639 0.707031C16.4186 0.707031 16.184 0.734048 15.9548 0.779976C15.9243 0.787181 15.8903 0.80249 15.8724 0.829507C15.8518 0.863728 15.867 0.909656 15.8894 0.939375C16.5672 1.89577 16.9567 3.06018 16.9567 4.31016C16.9567 5.5079 16.5995 6.62459 15.9727 7.55126C15.9082 7.64672 15.9655 7.7755 16.0792 7.79531C16.2368 7.82323 16.398 7.83763 16.5627 7.84214C18.2058 7.88536 19.6805 6.82181 20.0879 5.21972Z"
            fill="#C8A8E9"
          />
          <path
            d="M21.8093 10.8165C21.5084 10.1717 20.7823 9.7295 19.6782 9.51246C19.1571 9.38459 17.7468 9.20447 16.4351 9.22879C16.4154 9.23149 16.4046 9.245 16.4028 9.254C16.4002 9.26661 16.4055 9.28823 16.4315 9.30173C17.0377 9.60342 19.381 10.9155 19.0864 13.6829C19.0738 13.8027 19.1696 13.9063 19.2887 13.8883C19.8654 13.8054 21.349 13.4848 21.8093 12.4861C22.0636 11.9584 22.0636 11.3451 21.8093 10.8165Z"
            fill="#C8A8E9"
          />
          <path
            opacity="0.4"
            d="M6.04483 0.779976C5.8165 0.733147 5.58101 0.707031 5.33567 0.707031C3.07926 0.707031 1.30726 2.84225 1.91255 5.21972C2.31906 6.82181 3.79379 7.88536 5.43685 7.84214C5.60161 7.83763 5.76368 7.82232 5.92037 7.79531C6.03409 7.7755 6.09139 7.64672 6.02692 7.55126C5.40014 6.62368 5.04288 5.5079 5.04288 4.31016C5.04288 3.05928 5.43327 1.89486 6.11109 0.939375C6.13258 0.909656 6.1487 0.863728 6.12721 0.829507C6.1093 0.80159 6.07617 0.787181 6.04483 0.779976Z"
            fill="#C8A8E9"
          />
          <path
            d="M2.32156 9.5127C1.21752 9.72973 0.492248 10.1719 0.191392 10.8167C-0.0637974 11.3453 -0.0637974 11.9586 0.191392 12.4872C0.651629 13.4851 2.13531 13.8066 2.71195 13.8885C2.83104 13.9065 2.92595 13.8038 2.91342 13.6832C2.61883 10.9167 4.9621 9.60456 5.56918 9.30287C5.59425 9.28846 5.59962 9.26775 5.59694 9.25424C5.59515 9.24523 5.5853 9.23173 5.5656 9.22992C4.25294 9.20471 2.84358 9.38482 2.32156 9.5127Z"
            fill="#C8A8E9"
          />
        </svg>
      ),
      bgColor: "bg-[#FDF1F7]",
    },
    {
      title: "Orders",
      value: orders?.length?.toString() || "0",
      change: "+8.1%",
      changeType: "negative",
      icon: (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="21"
          height="21"
          viewBox="0 0 21 21"
          fill="none"
        >
          <path
            opacity="0.4"
            fill-rule="evenodd"
            clip-rule="evenodd"
            d="M3.91052 18.5884C3.91052 17.7484 4.59052 17.0684 5.43052 17.0684C6.26052 17.0684 6.94052 17.7484 6.94052 18.5884C6.94052 19.4184 6.26052 20.0984 5.43052 20.0984C4.59052 20.0984 3.91052 19.4184 3.91052 18.5884ZM15.1605 18.5884C15.1605 17.7484 15.8405 17.0684 16.6805 17.0684C17.5105 17.0684 18.1905 17.7484 18.1905 18.5884C18.1905 19.4184 17.5105 20.0984 16.6805 20.0984C15.8405 20.0984 15.1605 19.4184 15.1605 18.5884Z"
            fill="#C8A8E9"
          />
          <path
            fill-rule="evenodd"
            clip-rule="evenodd"
            d="M18.1907 4.34933C18.8007 4.34933 19.2007 4.55933 19.6007 5.01933C20.0007 5.47933 20.0707 6.13933 19.9807 6.73833L19.0307 13.2983C18.8507 14.5593 17.7707 15.4883 16.5007 15.4883H5.59074C4.26074 15.4883 3.16074 14.4683 3.05074 13.1493L2.13074 2.24833L0.620742 1.98833C0.220742 1.91833 -0.0592579 1.52833 0.0107421 1.12833C0.0807421 0.71833 0.470742 0.44833 0.880742 0.50833L3.26574 0.86833C3.60574 0.92933 3.85574 1.20833 3.88574 1.54833L4.07574 3.78833C4.10574 4.10933 4.36574 4.34933 4.68574 4.34933H18.1907ZM12.1307 9.54833H14.9007C15.3207 9.54833 15.6507 9.20833 15.6507 8.79833C15.6507 8.37833 15.3207 8.04833 14.9007 8.04833H12.1307C11.7107 8.04833 11.3807 8.37833 11.3807 8.79833C11.3807 9.20833 11.7107 9.54833 12.1307 9.54833Z"
            fill="#C8A8E9"
          />
        </svg>
      ),
      bgColor: "bg-[#FDF1F7]",
    },
    {
      title: "Services Request",
      value: "+1.03k",
      change: "+12.6%",
      changeType: "positive",
      icon: (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="18"
          height="20"
          viewBox="0 0 18 20"
          fill="none"
        >
          <path
            opacity="0.4"
            d="M15.8088 7.021C15.3573 7.021 14.7592 7.011 14.0146 7.011C12.1987 7.011 10.7055 5.508 10.7055 3.675V0.459C10.7055 0.206 10.5036 0 10.253 0H4.96363C2.49517 0 0.5 2.026 0.5 4.509V15.284C0.5 17.889 2.59022 20 5.16958 20H13.0463C15.5058 20 17.5 17.987 17.5 15.502V7.471C17.5 7.217 17.299 7.012 17.0475 7.013C16.6247 7.016 16.1177 7.021 15.8088 7.021Z"
            fill="#C8A8E9"
          />
          <path
            opacity="0.4"
            d="M13.0839 0.56737C12.7849 0.25637 12.2629 0.47037 12.2629 0.90137V3.53837C12.2629 4.64437 13.1739 5.55437 14.2799 5.55437C14.9769 5.56237 15.9449 5.56437 16.7669 5.56237C17.1879 5.56137 17.4019 5.05837 17.1099 4.75437C16.0549 3.65737 14.1659 1.69137 13.0839 0.56737Z"
            fill="#C8A8E9"
          />
          <path
            fill-rule="evenodd"
            clip-rule="evenodd"
            d="M5.97386 9.38744H9.35886C9.76986 9.38744 10.1039 9.05444 10.1039 8.64344C10.1039 8.23244 9.76986 7.89844 9.35886 7.89844H5.97386C5.56286 7.89844 5.22986 8.23244 5.22986 8.64344C5.22986 9.05444 5.56286 9.38744 5.97386 9.38744ZM5.97396 14.3816H11.418C11.829 14.3816 12.163 14.0486 12.163 13.6376C12.163 13.2266 11.829 12.8926 11.418 12.8926H5.97396C5.56296 12.8926 5.22996 13.2266 5.22996 13.6376C5.22996 14.0486 5.56296 14.3816 5.97396 14.3816Z"
            fill="#C8A8E9"
          />
        </svg>
      ),
      bgColor: "bg-[#FDF1F7]",
    },
    {
      title: "Invoice & Payment",
      value: `$${getInvoiceTotalAll().toFixed(2)}`,
      change: "+43.9%",
      changeType: "positive",
      icon: (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="16"
          height="20"
          viewBox="0 0 16 20"
          fill="none"
        >
          <path
            opacity="0.4"
            d="M7.99118 16.6217L1.49945 19.8643C1.00921 20.1304 0.397683 19.9527 0.123484 19.4645C0.0434041 19.311 0.00105752 19.1404 0 18.967V11.709C0 12.4286 0.405733 12.8728 1.47299 13.3702L7.99118 16.6217Z"
            fill="#C8A8E9"
          />
          <path
            d="M11.0693 0C13.777 0 15.9733 1.06595 16 3.79297V18.9668C15.9989 19.1372 15.9568 19.3049 15.877 19.4551C15.7484 19.7002 15.5261 19.8829 15.2617 19.96C14.9972 20.037 14.7123 20.0024 14.4736 19.8643L7.99121 16.6211L1.47266 13.3701C0.40568 12.8727 6.81044e-05 12.4284 0 11.709V3.79297C0.000214385 1.06595 2.19663 0 4.89551 0H11.0693ZM4.22461 6.04102C3.7912 6.04118 3.43945 6.39547 3.43945 6.83203C3.43968 7.2684 3.79134 7.6219 4.22461 7.62207H11.749C12.1822 7.62185 12.533 7.26837 12.5332 6.83203C12.5332 6.3955 12.1824 6.04123 11.749 6.04102H4.22461Z"
            fill="#C8A8E9"
          />
        </svg>
      ),
      bgColor: "bg-[#FDF1F7]",
    },
  ];

  const getStatusColor = (status: string) => {
    const s = status?.toLowerCase();

    if (s === "inactive") {
      return "bg-red-100 text-red-600";
    }

    return "bg-green-100 text-green-600"; // সব active
  };

  const handleSelectAll = (checked: boolean) => {
    if (checked) {
      setSelectedCustomers(customers.map((customer) => customer._id));
    } else {
      setSelectedCustomers([]);
    }
  };

  const handleSelectCustomer = (id: string, checked: boolean) => {
    if (checked) {
      setSelectedCustomers([...selectedCustomers, id]);
    } else {
      setSelectedCustomers(
        selectedCustomers.filter((customerId) => customerId !== id),
      );
    }
  };

  // delete customer
  const handleDeleteUser = async () => {
    if (!selectedUserId) return;

    try {
      const res = await deleteUser(selectedUserId).unwrap();

      toast.success("User deleted successfully");

      setIsDeleteModalOpen(false);
      setSelectedUserId(null);

      console.log("Deleted:", res);
    } catch (error) {
      toast.error("Delete failed");
      console.error(error);
    }
  };
  const openDeleteModal = (id: string) => {
    setSelectedUserId(id);
    setIsDeleteModalOpen(true);
  };

  // checkbox select unselect
  const isAllSelected = selectedCustomers.length === customers.length;
  const isIndeterminate =
    selectedCustomers.length > 0 && selectedCustomers.length < customers.length;

  const filteredCustomers = customers.filter((customer) => {
    const name = customer?.name?.toLowerCase() || "";
    const phone = customer?.phone || "";

    return (
      name.includes(searchTerm.toLowerCase()) || phone.includes(searchTerm)
    );
  });

  if (isLoading) return <p>Loading...</p>;
  if (isError) return <p>Error...</p>;

  return (
    <div className="min-h-screen bg-[#FDF1F7] pb-12">
      <div className=" ">
        {/* Header */}
        <div className="flex items-center justify-between mb-8 ">
          <div>
            <h1 className="text-lg md:text-2xl font-bold text-[#333843]">
              All Customers
            </h1>
            <div className="flex items-center mt-1">
              <span className="text-[#A8537B] text-sm font-normal">
                Dashboard
              </span>
              <span className="mx-2 ">
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
              <span className="text-[#A8537B] text-sm font-normal">
                All Customers
              </span>
            </div>
          </div>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          {statsCards?.map((card, index) => (
            <div key={index} className="bg-white rounded-[12px] p-6">
              <div className="flex items-center gap-4 mb-3">
                <div
                  className={`rounded-[4px] w-10 h-10 items-center justify-center flex p-3 ${card.bgColor}`}
                >
                  <p className="w-6 h-6 mx-auto ">{card.icon}</p>
                </div>
                <p className="text-base font-semibold text-[#505050] mb-1">
                  {card.title}
                </p>
              </div>
              <div className="flex justify-items-center justify-between">
                <p className="text-[20px] font-bold text-[#505050]">
                  {card.value}
                </p>
                <span
                  className={`text-[12px] font-medium ${
                    card.changeType === "positive"
                      ? "text-[#22C55E]"
                      : "text-[#FF1C1C]"
                  }`}
                >
                  {card.change}
                </span>
              </div>
            </div>
          ))}
        </div>

        {/* Customers Section */}
        <div className="bg-white rounded-lg">
          <div className="p-6 border-b border-gray-200">
            <div className="flex items-center justify-between">
              <h2 className="text-lg md:text-xl font-bold text-[#000000]">
                Customers
              </h2>
              <div className="flex items-center space-x-3">
                {/* search bar */}
                <div className="relative">
                  <input
                    type="text"
                    placeholder="Search product"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pr-10 pl-3 py-2 border border-[#B6B7BC] rounded-[12px] focus:outline-none focus:ring-1 focus:ring-purple-400 focus:border-transparent"
                  />
                  <Search className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                </div>
              </div>
            </div>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full">
              {/* table header */}
              <thead className="bg-[#FDF1F7]">
                <tr>
                  {/* Checkbox + Order ID */}
                  <th className="px-6 py-3 text-left text-base font-semibold text-[#505050] tracking-wider">
                    <div className="flex items-center gap-4">
                      <div className="relative flex items-center justify-center w-5 h-5">
                        <input
                          type="checkbox"
                          checked={isAllSelected}
                          ref={(input) => {
                            if (input) input.indeterminate = isIndeterminate;
                          }}
                          onChange={(e) => handleSelectAll(e.target.checked)}
                          className="peer w-full h-full accent-[#C8A8E9] bg-white border border-gray-300 rounded appearance-none checked:bg-[#C8A8E9] checked:border-transparent"
                        />
                        <span className="pointer-events-none absolute inset-0 items-center justify-center text-white text-xs font-bold peer-checked:flex hidden">
                          ✓
                        </span>
                      </div>
                      Image
                    </div>
                  </th>
                  <th className="px-6 py-4 text-left text-base font-semibold text-[#505050] tracking-wider">
                    <div className="flex items-center">
                      Name
                      <ChevronDown className="w-4 h-4 ml-1" />
                    </div>
                  </th>
                  <th className="px-6 py-4 text-left text-base font-semibold text-[#505050] tracking-wider">
                    <div className="flex items-center">
                      Phone
                      <ChevronDown className="w-4 h-4 ml-1" />
                    </div>
                  </th>
                  <th className="px-6 py-4 text-left text-base font-semibold text-[#505050] tracking-wider">
                    <div className="flex items-center">
                      Status
                      <ChevronDown className="w-4 h-4 ml-1" />
                    </div>
                  </th>
                  <th className="px-6 py-4 text-left text-base font-semibold text-[#505050] tracking-wider">
                    Total Buy
                  </th>
                  <th className="px-6 py-4 text-left text-base font-semibold text-[#505050] tracking-wider">
                    Method
                  </th>
                  <th className="px-6 py-4 text-left text-base font-semibold text-[#505050] tracking-wider">
                    Due Date
                  </th>
                  <th className="px-6 py-4 text-center text-base font-semibold text-[#505050] tracking-wider">
                    Action
                  </th>
                </tr>
              </thead>

              {/* table body */}
              <tbody className="bg-white divide-y divide-[#FDF1F7]">
                {filteredCustomers?.map((customer) => (
                  <tr key={customer._id} className="hover:bg-gray-50">
                    <td className="px-6 py-4 whitespace-nowrap flex justify-start items-center ">
                      <div className="relative flex items-center justify-center w-5 h-5">
                        <input
                          type="checkbox"
                          checked={selectedCustomers.includes(customer._id)}
                          onChange={(e) =>
                            handleSelectCustomer(customer._id, e.target.checked)
                          }
                          className="peer w-full h-full accent-[#C8A8E9] bg-white border border-gray-300 rounded appearance-none checked:bg-[#C8A8E9] checked:border-transparent"
                        />
                        <span className="pointer-events-none absolute inset-0 items-center justify-center text-white text-xs font-bold peer-checked:flex hidden">
                          ✓
                        </span>
                      </div>
                      {/* img  */}
                      <td className="px-6 py-4 whitespace-nowrap">
                        <img
                          src={customer.avatar}
                          alt={customer.name}
                          className="w-11 h-11 rounded-[4px] object-cover"
                        />
                      </td>
                    </td>
                    {/* name */}
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className="text-base font-normal text-[#3CA6FC] hover:text-blue-500 cursor-pointer">
                        {customer.name}
                      </span>
                    </td>
                    {/* phone */}
                    <td className="px-6 py-4 whitespace-nowrap text-base font-normal text-[#505050]">
                      {customer.phone}
                    </td>
                    {/* status */}
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span
                        className={`inline-flex px-4 py-2 text-sm font-medium rounded-[8px] ${getStatusColor(
                          getUserStatus(customer._id),
                        )}`}
                      >
                        {getUserStatus(customer._id)}
                      </span>
                    </td>

                    {/* total buy */}
                    <td className="px-6 py-4 whitespace-nowrap text-base font-normal text-[#505050]">
                      ${getTotalBuy(customer._id).toFixed(2)}
                    </td>

                    {/* method */}
                    <td className="px-6 py-4 whitespace-nowrap text-base font-normal text-[#505050]">
                      {formatPaymentMethod(getPaymentMethod(customer._id))}
                    </td>

                    {/* due data */}
                    <td className="px-6 py-4 whitespace-nowrap text-base font-normal text-[#505050]">
                      {getDueDate(customer._id)}
                    </td>

                    {/* action */}
                    <td className="px-6 py-4 flex items-center justify-center whitespace-nowrap">
                      <div className="flex items-center space-x-2">
                        <Link
                          to={`/products-update/${customer._id}`}
                          className="p-1 cursor-pointer hover:text-purple-600 transition-colors"
                        >
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="16"
                            height="16"
                            viewBox="0 0 16 16"
                            fill="none"
                          >
                            <path
                              d="M8 13.333H14"
                              stroke="#505050"
                              strokeWidth="2"
                              strokeLinecap="round"
                              strokeLinejoin="round"
                            />
                            <path
                              d="M11.2504 1.47176C11.5524 1.1697 11.9621 1 12.3893 1C12.6008 1 12.8103 1.04166 13.0057 1.12261C13.2011 1.20355 13.3787 1.32219 13.5282 1.47176C13.6778 1.62133 13.7964 1.79889 13.8774 1.99431C13.9583 2.18972 14 2.39917 14 2.61069C14 2.82221 13.9583 3.03166 13.8774 3.22708C13.7964 3.42249 13.6778 3.60006 13.5282 3.74962L4.03715 13.2407L1 14L1.75929 10.9629L11.2504 1.47176Z"
                              stroke="#505050"
                              strokeWidth="2"
                              strokeLinecap="round"
                              strokeLinejoin="round"
                            />
                          </svg>
                        </Link>

                        {/* delete button */}
                        <button
                          onClick={() => openDeleteModal(customer._id)}
                          className="p-1 cursor-pointer hover:text-purple-600 transition-colors"
                        >
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
                              stroke-width="1.5"
                              stroke-linecap="round"
                              stroke-linejoin="round"
                            />
                          </svg>
                        </button>

                        {/* details button */}
                        <Link
                          to={`/customers-details-page/${customer._id}`}
                          className="p-1 cursor-pointer hover:text-purple-600 transition-colors"
                        >
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
                        </Link>
                      </div>
                    </td>
                  </tr>
                ))}
                {/* modal show */}
                {isDeleteModalOpen && (
                  <div className="fixed inset-0 flex items-center justify-center bg-black/40 z-50">
                    <div className="bg-white p-6 rounded-lg w-[300px]">
                      <h2 className="text-lg font-semibold mb-4">
                        Are you sure?
                      </h2>

                      <div className="flex justify-end gap-3">
                        <button
                          onClick={() => setIsDeleteModalOpen(false)}
                          className="px-4 py-2 cursor-pointer bg-gray-200 rounded"
                        >
                          Cancel
                        </button>

                        <button
                          onClick={handleDeleteUser}
                          className="px-4 py-2 cursor-pointer bg-red-500 text-white rounded"
                        >
                          Delete
                        </button>
                      </div>
                    </div>
                  </div>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CustomarManagement;
