import React, { useState } from "react";
import { Clock, CheckCircle, Plus, XCircle, Package } from "lucide-react";
import { NavLink } from "react-router-dom";
import shoppingCart from "@/assets/ordarpageImg/order.svg";
import buy from "@/assets/ordarpageImg/Buy.svg";
import { IoIosArrowDown } from "react-icons/io";
// Type Definitions
type OrderStatus = "pending" | "completed" | "cancelled";

interface Order {
  id: number;
  customerName: string;
  product: string;
  quantity: number;
  price: number;
  total: number;
  status: OrderStatus;
  createdAt: string;
}

interface NewOrderInput {
  customerName: string;
  product: string;
  quantity: number;
  price: number;
  status: OrderStatus;
}

const OrderDashboard: React.FC = () => {
  const [orders, setOrders] = useState<Order[]>([]);
  const [showAddForm, setShowAddForm] = useState(false);
  const [newOrder, setNewOrder] = useState<NewOrderInput>({
    customerName: "",
    product: "",
    quantity: 1,
    price: 0,
    status: "pending",
  });

  const addNewOrder = () => {
    if (newOrder.customerName && newOrder.product) {
      const order: Order = {
        id: Date.now(),
        ...newOrder,
        total: newOrder.quantity * newOrder.price,
        createdAt: new Date().toLocaleDateString(),
      };
      setOrders((prev) => [...prev, order]);
      setNewOrder({
        customerName: "",
        product: "",
        quantity: 1,
        price: 0,
        status: "pending",
      });
      setShowAddForm(false);
    }
  };

  const updateOrderStatus = (id: number, newStatus: OrderStatus) => {
    setOrders((prev) =>
      prev.map((order) =>
        order.id === id ? { ...order, status: newStatus } : order
      )
    );
  };

  const getStatusIcon = (status: OrderStatus) => {
    switch (status) {
      case "pending":
        return <Clock className="w-4 h-4 text-yellow-500" />;
      case "completed":
        return <CheckCircle className="w-4 h-4 text-green-500" />;
      case "cancelled":
        return <XCircle className="w-4 h-4 text-red-500" />;
      default:
        return <Package className="w-4 h-4 text-blue-500" />;
    }
  };

  const getStatusColor = (status: OrderStatus) => {
    switch (status) {
      case "pending":
        return "bg-yellow-100 text-yellow-800";
      case "completed":
        return "bg-green-100 text-green-800";
      case "cancelled":
        return "bg-red-100 text-red-800";
      default:
        return "bg-blue-100 text-blue-800";
    }
  };

  {
    /* Stats Cards */
  }
  const stats = {
    total: orders.length,
    pending: orders.filter((o) => o.status === "pending").length,
    completed: orders.filter((o) => o.status === "completed").length,
    cancelled: orders.filter((o) => o.status === "cancelled").length,
  };
  {
    /* Stats Cards */
  }
  const orderOverview = [
    {
      title: "Orders Overview",
      metrics: [
        { label: "All Orders", value: stats.total },
        { label: "Pending", value: stats.pending },
        { label: "Completed", value: stats.completed },
      ],
    },
    {
      title: "Issues Summary",
      metrics: [
        { label: "Cancelled", value: stats.cancelled },
        { label: "Returned", value: 0 },
        { label: "Damaged", value: 0 },
      ],
    },
  ];

  return (
    <div className="min-h-screen">
      <div className="mx-auto">
        {/* Header */}
        <div className="p- mb-4 flex flex-col lg:flex-row justify-between items-start lg:items-center gap-4 lg:gap-0">
          {/* Left - Title and Breadcrumb */}
          <div>
            <p className="text-base lg:text-2xl font-bold text-[#333843]">
              Orders
            </p>
            <div className="flex items-center flex-wrap space-x-1 text-sm mt-1">
              <NavLink to="/" className="font-medium">
                <span className="text-[#A8537B] text-sm font-medium">
                  Dashboard
                </span>
              </NavLink>
              <span className="text-gray-500">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="20"
                  height="20"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="lucide lucide-chevron-right"
                >
                  <path d="m9 18 6-6-6-6" />
                </svg>
              </span>

              <NavLink to="/orders">
                <span className="text-[#A8537B] text-sm font-medium">
                  Orders
                </span>
              </NavLink>
              <span className="text-gray-500">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="20"
                  height="20"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="lucide lucide-chevron-right"
                >
                  <path d="m9 18 6-6-6-6" />
                </svg>
              </span>

              <NavLink to="/orders-list">
                <span className="text-[#919191] text-sm font-medium">
                  Order list
                </span>
              </NavLink>
            </div>
          </div>

          {/* Right - Action Buttons */}
          <div className="flex flex-wrap gap-3 w-full lg:w-auto">
            <button className="w-full lg:w-auto !bg-[#FDF1F7] text-[#1F1F1F] px-4 py-2 text-base !border border-[#B6B7BC] rounded-[8px] flex items-center justify-center">
              Create Order
            </button>
            <button className="w-full lg:w-auto !bg-[#FDF1F7] text-[#1F1F1F] px-4 py-2 text-base border border-[#B6B7BC] rounded-[8px] flex items-center justify-center">
              Export
            </button>
          </div>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-6 mb-6">
          {orderOverview.map((group, index) => (
            <div key={index} className="bg-white p-5 rounded-[12px] shadow-sm">
              {/* Top: Icon + This Week Dropdown */}
              <div className="flex justify-between items-center mb-4">
                <div className="bg-[#FDF1F7] p-3 rounded-md">
                  <img
                    src={shoppingCart}
                    alt="Shopping Cart"
                    className="text-[#1F1F1F]"
                  />
                </div>
                <p className="text-xs font-bold text-[#919191] flex items-center gap-1">
                  This Week <IoIosArrowDown className="w-4 h-4" />
                </p>
              </div>

              {/* Bottom: Metrics */}
              <div className="grid grid-cols-3 ">
                {group.metrics.map((metric, i) => (
                  <div key={i}>
                    <p className="text-sm font-medium text-[#919191]">
                      {metric.label}
                    </p>
                    <p className="text-base lg:text-xl font-semibold text-[#1F1F1F]">
                      {metric.value}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>

        {/* Orders Table */}
        <div className="bg-white flex items-center justify-center h-[650px] rounded-[12px] ">
          <div className="bg-[#FDF1F7] w-[351px] h-[366px] mx-auto rounded-[12px] shadow-sm flex items-center justify-center">
            {orders.length === 0 ? (
              <div className="flex flex-col items-center justify-center py-16">
                <div className="bg-[#F1DAFC] p-6 rounded-[30px] mb-6  flex items-center justify-center">
                  <img
                    src={buy}
                    alt="Shopping Cart"
                    className="w-[46.25px] h-[45.104px] "
                  />
                </div>
                <h2 className="text-base lg:text-xl font-bold text-[#1F1F1F] mb-2">
                  No Orders Yet?
                </h2>
                <p className="text-[#919191] font-medium text-sm text-center mb-6 max-w-md mx-6">
                  Add products to your store and start selling to see orders
                  here
                </p>
                <button
                  onClick={() => setShowAddForm(true)}
                  className="!bg-[#C8A8E9] text-[#1F1F1F] text-base font-semibold px-6 py-3 rounded-lg flex items-center gap-2 hover:bg-purple-300"
                >
                  Add New Products <Plus className="w-6 h-6" />
                </button>
              </div>
            ) : (
              // akhan theke kaj baki ase
              <div className="overflow-x-auto">
                <table className="w-full">
                  {/* <thead className="bg-gray-50">
                    <tr>
                      {[
                        "Order ID",
                        "Customer",
                        "Product",
                        "Quantity",
                        "Total",
                        "Status",
                        "Date",
                        "Actions",
                      ].map((head, i) => (
                        <th
                          key={i}
                          className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                        >
                          {head}
                        </th>
                      ))}
                    </tr>
                  </thead> */}
                  <tbody className="bg-white divide-y divide-gray-200">
                    {orders.map((order) => (
                      <tr key={order.id} className="hover:bg-gray-50">
                        <td className="px-6 py-4 text-sm font-medium text-gray-900">
                          #{order.id.toString().slice(-6)}
                        </td>
                        <td className="px-6 py-4 text-sm">
                          {order.customerName}
                        </td>
                        <td className="px-6 py-4 text-sm">{order.product}</td>
                        <td className="px-6 py-4 text-sm">{order.quantity}</td>
                        <td className="px-6 py-4 text-sm">
                          ${order.total.toFixed(2)}
                        </td>
                        <td className="px-6 py-4">
                          <span
                            className={`inline-flex items-center gap-1 px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(
                              order.status
                            )}`}
                          >
                            {getStatusIcon(order.status)}
                            {order.status.charAt(0).toUpperCase() +
                              order.status.slice(1)}
                          </span>
                        </td>
                        <td className="px-6 py-4 text-sm">{order.createdAt}</td>
                        <td className="px-6 py-4">
                          <select
                            value={order.status}
                            onChange={(e) =>
                              updateOrderStatus(
                                order.id,
                                e.target.value as OrderStatus
                              )
                            }
                            className="border border-gray-300 rounded px-2 py-1 text-xs"
                          >
                            <option value="pending">Pending</option>
                            <option value="completed">Completed</option>
                            <option value="cancelled">Cancelled</option>
                          </select>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        </div>

        {/* Modal */}
        {showAddForm && (
          <div className="fixed inset-0  bg-opacity-50 flex items-center justify-center p-4 z-50">
            <div className="bg-white rounded-lg max-w-md w-full p-6">
              <h3 className="text-lg font-semibold mb-4">Add New Order</h3>
              <div className="space-y-4">
                <input
                  type="text"
                  placeholder="Customer Name"
                  value={newOrder.customerName}
                  onChange={(e) =>
                    setNewOrder({ ...newOrder, customerName: e.target.value })
                  }
                  className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-purple-500"
                />
                <input
                  type="text"
                  placeholder="Product"
                  value={newOrder.product}
                  onChange={(e) =>
                    setNewOrder({ ...newOrder, product: e.target.value })
                  }
                  className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-purple-500"
                />
                <div className="grid grid-cols-2 gap-4">
                  <input
                    type="number"
                    placeholder="Quantity"
                    value={newOrder.quantity}
                    onChange={(e) =>
                      setNewOrder({
                        ...newOrder,
                        quantity: parseInt(e.target.value) || 1,
                      })
                    }
                    className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-purple-500"
                  />
                  <input
                    type="number"
                    step="0.01"
                    placeholder="Price"
                    value={newOrder.price}
                    onChange={(e) =>
                      setNewOrder({
                        ...newOrder,
                        price: parseFloat(e.target.value) || 0,
                      })
                    }
                    className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-purple-500"
                  />
                </div>
              </div>
              <div className="flex gap-3 mt-6">
                <button
                  onClick={addNewOrder}
                  className="flex-1 bg-purple-600 text-white py-2 px-4 rounded-lg hover:bg-purple-700"
                >
                  Add Order
                </button>
                <button
                  onClick={() => setShowAddForm(false)}
                  className="flex-1 bg-gray-200 text-gray-800 py-2 px-4 rounded-lg hover:bg-gray-300"
                >
                  Cancel
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default OrderDashboard;
