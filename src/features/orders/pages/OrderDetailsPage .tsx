/* eslint-disable @typescript-eslint/no-explicit-any */
import {
  useGetOrderByIdQuery,
  useUpdateOrderStatusMutation,
} from "@/redux/api/orderApi";
import React from "react";
import { Link, useParams } from "react-router-dom";

const OrderDetailsPage: React.FC = () => {
  const { id } = useParams();

  const {
    data: order,
    isLoading,
    isError,
  } = useGetOrderByIdQuery(id as string);

  // 👇 invoice query

  const [updateOrderStatus] = useUpdateOrderStatusMutation();

  const handleDownloadInvoice = () => {
    window.open(`http://localhost:5000/api/invoice/${id}`, "_blank");
  };

  const validStatuses = [
    "pending",
    "payment",
    "processing",
    "on_the_way",
    "completed",
    "cancelled",
  ] as const;

  type OrderStatus = (typeof validStatuses)[number];

  const handleStatusChange = async (
    e: React.ChangeEvent<HTMLSelectElement>,
    orderId: string,
  ) => {
    const value = e.target.value;

    if (!validStatuses.includes(value as OrderStatus)) return;

    const status = value as OrderStatus;

    try {
      await updateOrderStatus({
        id: orderId,
        status,
      }).unwrap();
    } catch (error) {
      console.log("Status update failed", error);
    }
  };

  //   condition vabe color chagne hobe
  const getStatusColor = (status: OrderStatus): string => {
    switch (status) {
      case "pending":
        return "bg-[#19466A3D] text-[#5570F1]";

      case "payment":
        return "bg-yellow-100 text-yellow-700";

      case "processing":
        return "bg-blue-100 text-blue-700";

      case "on_the_way":
        return "bg-purple-100 text-purple-700";

      case "completed":
        return "bg-green-100 text-green-700";

      case "cancelled":
        return "bg-red-100 text-red-700";

      default:
        return "bg-gray-100 text-gray-700";
    }
  };
  const calculateTotals = () => {
    const subtotal =
      order?.products?.reduce(
        (acc: number, item: any) => acc + item.price * item.quantity,
        0,
      ) || 0;

    const vat = 0;
    const shipping = 5;

    const grandTotal = subtotal + vat + shipping;

    return { subtotal, vat, shipping, grandTotal };
  };

  const { subtotal, vat, shipping, grandTotal } = calculateTotals();

  if (isLoading) return <p>Loading...</p>;
  if (isError) return <p className="text-red-500">Error loading order</p>;
  if (!order) return <p>No order found</p>;
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
          </nav>
        </div>

        {/* Right: Action buttons */}
        <div className="flex flex-col sm:flex-row gap-2 w-full lg:w-auto">
          <button
            onClick={handleDownloadInvoice}
            className="bg-[#C8A8E9] px-4 py-2 cursor-pointer rounded-md text-base text-white w-full sm:w-auto"
          >
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
              Order #{order.id}
            </p>
            <span
              className={`inline-flex items-center px-3 py-1 rounded-[8px] text-sm font-medium ${getStatusColor(
                order.status,
              )}`}
            >
              {order.status}
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
              <p>{order.date}</p>
              <p>{order.paymentMethod}</p>
              <p>{order.shippingMethod}</p>
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
                {order.shipping.name}
              </p>
            </div>

            {/* Row 2 */}
            <div className="flex gap-2 sm:flex-row justify-between">
              <p className="text-base font-semibold text-[#1F1F1F] break-words">
                Email
              </p>
              <p className="text-base font-normal text-[#505050] break-words text-right whitespace-pre-line">
                {order.shipping.email}
              </p>
            </div>

            {/* Row 3 */}
            <div className="flex gap-2 sm:flex-row justify-between">
              <p className="text-base font-semibold text-[#1F1F1F] break-words">
                Phone
              </p>
              <p className="text-base font-normal text-[#505050] break-words text-right">
                {order.shipping.phone}
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
                {order.products.length} Products
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
                  {order?.products?.map((item: any, i: number) => (
                    <tr key={i}>
                      <td className="py-2 whitespace-nowrap text-[#1F1F1F] text-sm font-medium">
                        <div className="flex items-center gap-3">
                          <img
                            src={item.image}
                            alt={item.name}
                            className="w-10 h-10 rounded-md object-cover border"
                          />
                          <div className="flex flex-col">
                            <span>{item.name?.slice(0, 6)}...</span>
                          </div>
                        </div>
                      </td>

                      <td className="py-2 text-left text-base text-[#A8537B]">
                        {item.sku}
                      </td>

                      <td className="py-2 text-left text-base">
                        {item.quantity}
                      </td>

                      <td className="py-2 text-left text-base">
                        $ {item.price.toFixed(2)}
                      </td>

                      <td className="py-2 text-right text-base">
                        {((item.price ?? 0) * (item.quantity ?? 0)).toFixed(2)}
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
              <select
                defaultValue={order.status}
                onChange={(e) => handleStatusChange(e, order.id)}
                className="w-full appearance-none border border-[#B6B7BC] text-[#B6B7BC] rounded-md p-3 pr-10 text-sm"
              >
                <option value="pending">Pending</option>
                <option value="payment">Payment</option>
                <option value="processing">Processing</option>
                <option value="on_the_way">On The Way</option>
                <option value="completed">Completed</option>
                <option value="cancelled">Cancelled</option>
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
              <p className="text-base font-semibold text-[#505050] mb-2">
                Payment Status
              </p>

              <div className="relative">
                <input
                  type="text"
                  disabled
                  value={order.paymentStatus}
                  className={`w-full p-3 pr-10 border rounded-md text-sm font-medium ${
                    order.paymentStatus === "paid"
                      ? "text-green-700 bg-green-50 border-green-200"
                      : order.paymentStatus === "failed"
                        ? "text-red-700 bg-red-50 border-red-200"
                        : "text-yellow-700 bg-yellow-50 border-yellow-200"
                  }`}
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
              {order?.shipping && (
                <div>
                  <div className="flex items-center gap-2">
                    <p className="font-semibold text-base text-[#4D5464]">
                      Shipping Address
                    </p>
                  </div>

                  <div className="mt-1 space-y-1">
                    <p>
                      <span className="font-semibold">Name:</span>{" "}
                      {order.shipping.name}
                    </p>

                    <p>
                      <span className="font-semibold">Phone:</span>{" "}
                      {order.shipping.phone}
                    </p>

                    <p>
                      <span className="font-semibold">Address:</span>{" "}
                      {order.shipping.address}
                    </p>

                    <p>
                      <span className="font-semibold">Country:</span>{" "}
                      {order.shipping.city}, {order.shipping.country}
                    </p>

                    <p>
                      <span className="font-semibold">Postal:</span>{" "}
                      {order.shipping.postalCode || "N/A"}
                    </p>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OrderDetailsPage;
