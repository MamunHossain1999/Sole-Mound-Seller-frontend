import React from "react";
import { Link } from "react-router-dom";

// Type definitions
type Address = {
  type: "billing" | "shipping";
  street: string;
  city: string;
  state: string;
  zipCode: string;
  country: string;
};

type OrderItem = {
  productName: string;
  sku: string;
  quantity: string;
  price: string;
  total: string;
  color?: string;
  imageUrl?: string;
};

type OrderStatus = "pending" | "completed" | "cancelled";

interface OrderDetailsData {
  orderId: string;
  status: OrderStatus;
  paymentMethod: string;
  shippingMethod: string;
  items: OrderItem[];
  customer: {
    name: string;
    email: string;
    phone: string;
  };
  addresses: Address[];
  expectedDeliveryDate: string;
  addedDate: string;
}

const OrderDetails: React.FC = () => {
  const orderData: OrderDetailsData = {
    orderId: "302011",
    status: "pending",
    paymentMethod: "Visa",
    shippingMethod: "Flat Shipping",
    items: [
      {
        productName: "Smartwatch E2",
        sku: "302011",
        quantity: "1 pcs",
        price: "$400.00",
        total: "$400.00",
        color: "Black",
        imageUrl: "/images/smartwatch.jpg",
      },
      {
        productName: "Headphone G1 Pro",
        sku: "302012",
        quantity: "1 pcs",
        price: "$185.00",
        total: "$185.00",
        color: "Silver",
        imageUrl: "/images/headphone.jpg",
      },
    ],
    customer: {
      name: "Josh Adam",
      email: "josh_adam@mail.com",
      phone: "909 427 2910",
    },
    addresses: [
      {
        type: "billing",
        street: "1833 Bel Meadow Drive",
        city: "Fontana",
        state: "California",
        zipCode: "92335",
        country: "USA",
      },
      {
        type: "shipping",
        street: "1833 Bel Meadow Drive",
        city: "Fontana",
        state: "California",
        zipCode: "92335",
        country: "USA",
      },
    ],
    expectedDeliveryDate: "20 November, 2025",
    addedDate: "12 Dec 2022",
  };

  const formatAddress = (address: Address): string => {
    return `${address.street}, ${address.city}, ${address.state} ${address.zipCode}, ${address.country}`;
  };

  //   condition vabe color chagne hobe
  const getStatusColor = (status: OrderStatus): string => {
    switch (status) {
      case "pending":
        return "bg-[#19466A3D] text-[#5570F1]";
      case "completed":
        return "bg-green-100 text-green-700";
      case "cancelled":
        return "bg-red-100 text-red-700";
      default:
        return "bg-gray-100 text-gray-700";
    }
  };

  const parseCurrency = (value: string): number => {
    return parseFloat(value.replace(/[^\d.-]/g, ""));
  };

  const calculateTotals = () => {
    const subtotal = orderData.items.reduce(
      (acc, item) => acc + parseCurrency(item.total),
      0
    );
    const vat = 0;
    const shipping = 5;
    const grandTotal = subtotal + vat + shipping;
    return { subtotal, vat, shipping, grandTotal };
  };

  const { subtotal, vat, shipping, grandTotal } = calculateTotals();

  return (
    <div className="min-h-screen pb-6 ">
      {/* header */}
      <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center mb-4 gap-4">
        {/* Left: Title + Breadcrumb */}
        <div className="flex flex-col">
          <h1 className="text-base lg:text-2xl font-bold text-[#333843] mb-2">
            Orders Details
          </h1>
          <nav className="flex flex-wrap items-center gap-1 text-sm">
            <Link to="/" className="font-medium text-[#A8537B]">
              Dashboard
            </Link>
            <span className="text-gray-500">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="16"
                height="16"
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
            <Link to="/orders" className="font-medium text-[#A8537B]">
              Orders list
            </Link>
            <span className="text-gray-500">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="16"
                height="16"
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
            <span className="text-[#919191] font-medium">
              <Link to="/orders-details" className="text-[#919191]">
                Orders Details
              </Link>
            </span>
          </nav>
        </div>

        {/* Right: Action buttons */}
        <div className="flex flex-col sm:flex-row gap-2 w-full lg:w-auto">
          <button className="border px-4 py-2 rounded-md text-base text-[#1F1F1F] border-[#B6B7BC] bg-[#FDF1F7] w-full sm:w-auto">
            Export
          </button>
          <button className="bg-[#C8A8E9] px-4 py-2 rounded-md text-base text-white w-full sm:w-auto">
            Invoice
          </button>
        </div>
      </div>

      {/* order information */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 lg:gap-6 mb-5">
        {/* Order Info Card */}
        <div className="bg-white p-4 rounded-[12px]">
          <div className="flex flex-wrap gap-2 items-center">
            <p className="font-bold text-base lg:text-xl text-[#1F1F1F]">
              Order #{orderData.orderId}
            </p>
            <span
              className={`inline-flex items-center px-3 py-1 rounded-[8px] text-sm font-medium ${getStatusColor(
                orderData.status
              )}`}
            >
              {orderData.status}
            </span>
          </div>

          <div className="mt-3 flex flex-col gap-3 sm:flex-row sm:justify-between">
            {/* Labels */}
            <div className="space-y-1 font-semibold text-base text-[#1F1F1F]">
              <p>Added</p>
              <p>Payment Method</p>
              <p>Shipping Method</p>
            </div>

            {/* Values */}
            <div className="space-y-1 text-[#505050] text-base font-normal sm:text-right">
              <p>{orderData.addedDate}</p>
              <p>{orderData.paymentMethod}</p>
              <p>{orderData.shippingMethod}</p>
            </div>
          </div>
        </div>

        {/* Customer Info Card */}
        <div className="bg-white p-4 rounded-[12px]">
          <p className="font-bold text-base lg:text-xl text-[#1F1F1F] mb-1">
            Customer
          </p>

          <div className="mt-3 flex flex-col gap-3">
            {/* Row 1 */}
            <div className="flex gap-2 sm:flex-row justify-between">
              <p className="text-base font-semibold text-[#1F1F1F] break-words">
                Customer
              </p>
              <p className="text-base font-normal text-[#505050] break-words text-right">
                {orderData.customer.name}
              </p>
            </div>

            {/* Row 2 */}
            <div className="flex gap-2 sm:flex-row justify-between">
              <p className="text-base font-semibold text-[#1F1F1F] break-words">
                Email
              </p>
              <p className="text-base font-normal text-[#505050] break-words text-right whitespace-pre-line">
                {orderData.customer.email}
              </p>
            </div>

            {/* Row 3 */}
            <div className="flex gap-2 sm:flex-row justify-between">
              <p className="text-base font-semibold text-[#1F1F1F] break-words">
                Phone
              </p>
              <p className="text-base font-normal text-[#505050] break-words text-right">
                {orderData.customer.phone}
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* order list table */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 w-full ">
        {/* Left Side: Order List - 2/3 Width */}
        <div className="bg-white p-4 rounded-xl shadow-sm lg:col-span-2 w-full">
          <div>
            <div className="flex gap-3 items-center mb-3">
              <h3 className="font-bold text-base lg:text-xl text-[#1F1F1F]">
                Order List
              </h3>
              <span className="text-sm bg-[#19466A3D] text-[#22C55E] font-medium px-2 py-1 rounded-[8px]">
                {orderData.items.length} Products
              </span>
            </div>
            <div className="overflow-x-auto w-full">
              <table className="min-w-[700px] w-full text-[#505050] divide-y divide-[#F1DAFC]">
                <thead className="border-b">
                  <tr className="text-[#1F1F1F] text-base">
                    <th className="py-2 text-left font-semibold">Product</th>
                    <th className="py-2 text-left font-semibold">SKU</th>
                    <th className="py-2 text-left font-semibold">QTY</th>
                    <th className="py-2 text-left font-semibold">Price</th>
                    <th className="py-2 text-right font-semibold">Total</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-[#F1DAFC]">
                  {orderData?.items?.map((item, i) => (
                    <tr key={i}>
                      <td className="py-2 whitespace-nowrap text-[#1F1F1F] text-sm font-medium">
                        <div className="flex items-center gap-3">
                          <img
                            src={item.imageUrl}
                            alt={item.productName}
                            className="w-10 h-10 rounded-md object-cover border"
                          />
                          <div className="flex flex-col">
                            <span>{item.productName}</span>
                            <span className="text-xs text-[#6E7079]">
                              {item.color}
                            </span>
                          </div>
                        </div>
                      </td>
                      <td className="py-2 text-left text-base text-[#A8537B]">
                        {item.sku}
                      </td>
                      <td className="py-2 text-left text-base">
                        {item.quantity}
                      </td>
                      <td className="py-2 text-left text-base">{item.price}</td>
                      <td className="py-2 text-right text-base">
                        {item.total}
                      </td>
                    </tr>
                  ))}
                  {/* Totals */}
                  <tr>
                    <td colSpan={3}></td>
                    <td className="py-4 text-left font-semibold text-[#1F1F1F]">
                      Subtotal
                    </td>
                    <td className="py-4 text-right font-semibold text-[#1F1F1F]">
                      ${subtotal.toFixed(2)}
                    </td>
                  </tr>
                  <tr>
                    <td colSpan={3}></td>
                    <td className="py-4 text-left font-semibold text-[#1F1F1F]">
                      VAT (0%)
                    </td>
                    <td className="py-4 text-right font-semibold text-[#1F1F1F]">
                      ${vat.toFixed(2)}
                    </td>
                  </tr>
                  <tr>
                    <td colSpan={3}></td>
                    <td className="py-4 text-left font-semibold text-[#1F1F1F]">
                      Shipping Rate
                    </td>
                    <td className="py-4 text-right font-semibold text-[#1F1F1F]">
                      ${shipping.toFixed(2)}
                    </td>
                  </tr>
                  <tr>
                    <td colSpan={3}></td>
                    <td className="py-4 text-left text-xl font-bold text-[#1F1F1F]">
                      Grand Total
                    </td>
                    <td className="py-4 text-right text-xl font-bold text-[#1F1F1F]">
                      ${grandTotal.toFixed(2)}
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>

        {/* Right Side: Actions - 1/3 Width */}
        <div className="space-y-6 w-full">
          {/* Change Order Status */}
          <div className="bg-white p-4 rounded-xl shadow-sm w-full">
            <h4 className="font-bold text-base lg:text-xl text-[#1A1C21] mb-3">
              Change Order Status
            </h4>
            <div className="relative w-full">
              <select className="w-full appearance-none border border-[#B6B7BC] text-[#B6B7BC] rounded-md p-3 pr-10 text-sm">
                <option>Pending</option>
                <option>Completed</option>
                <option>Cancelled</option>
              </select>
              <div className="pointer-events-none absolute top-1/2 right-3 -translate-y-1/2">
                <svg
                  className="w-4 h-4 text-[#B6B7BC]"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M19 9l-7 7-7-7"
                  />
                </svg>
              </div>
            </div>

            {/* Payment Status */}
            <div className="mt-4 relative">
              <p className="text-base font-semibold text-[#505050] mb-1">
                Payment Status
              </p>
              <div className="relative">
                <input
                  type="text"
                  disabled
                  value="Pending"
                  className="w-full p-3 pr-10 border rounded-md text-sm text-[#B6B7BC] bg-gray-100"
                />
                <div className="absolute top-1/2 right-3 -translate-y-1/2">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="20"
                    viewBox="0 0 24 20"
                    fill="none"
                  >
                    <rect y="4" width="40" height="12" rx="6" fill="#FDF1F7" />
                    <rect width="20" height="20" rx="10" fill="#F1DAFC" />
                  </svg>
                </div>
              </div>
            </div>
          </div>

          {/* Address */}
          <div className="bg-white p-4 rounded-xl shadow-sm w-full">
            <h4 className="font-bold text-base lg:text-xl text-[#1A1C21] mb-3">
              Address
            </h4>
            <div className="space-y-4 text-sm text-[#505050]">
              {orderData?.addresses?.map((address, i) => (
                <div key={i}>
                  <div className="flex items-center gap-2">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="17"
                      height="20"
                      viewBox="0 0 17 20"
                      fill="none"
                    >
                      <path
                        fillRule="evenodd"
                        clipRule="evenodd"
                        d="M11 8.5C11 7.12 9.88 6 8.5 6C7.12 6 6 7.12 6 8.5C6 9.88 7.12 11 8.5 11C9.88 11 11 9.88 11 8.5Z"
                        stroke="#1F1F1F"
                        strokeWidth="1.5"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                      <path
                        fillRule="evenodd"
                        clipRule="evenodd"
                        d="M8.5 19C7.3 19 1 13.9 1 8.56C1 4.39 4.36 1 8.5 1C12.64 1 16 4.39 16 8.56C16 13.9 9.7 19 8.5 19Z"
                        stroke="#1F1F1F"
                        strokeWidth="1.5"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                    <p className="font-semibold text-base text-[#4D5464]">
                      {address.type === "billing" ? "Billing" : "Shipping"}
                    </p>
                  </div>
                  <p className="mt-1">{formatAddress(address)}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Delivery Info */}
          <div className="bg-white p-4 rounded-xl shadow-sm w-full">
            <h4 className="font-bold text-[#1A1C21] text-base lg:text-xl mb-2">
              Expected Date of Delivery
            </h4>
            <p className="text-base text-[#22C55E] font-normal mb-3">
              {orderData.expectedDeliveryDate}
            </p>
            <button className="w-full bg-[#C8A8E9] text-white text-base py-3 px-4 rounded-[8px]">
              Track Order
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OrderDetails;
