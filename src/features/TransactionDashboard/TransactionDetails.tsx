/* eslint-disable @typescript-eslint/no-explicit-any */
import React from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useGetOrderByIdQuery } from "@/redux/api/orderApi";

const TransactionDetails: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();

  const { data, isLoading, isError } = useGetOrderByIdQuery(id as string);

  const order = data;

  if (isLoading) return <p className="p-6">Loading...</p>;
  if (isError || !order)
    return <p className="p-6 text-red-500">Order not found</p>;

  return (
    <div className="p-4 md:p-6 bg-gray-50 min-h-screen">

      {/* Back Button */}
      <button
        onClick={() => navigate(-1)}
        className="mb-4 px-4 py-2 bg-white border cursor-pointer rounded-lg shadow-sm hover:bg-gray-100 transition"
      >
        ← Back
      </button>

      {/* Main Card */}
      <div className="bg-white p-6 rounded-2xl shadow-sm">

        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-3 mb-6">
          <h1 className="text-xl md:text-2xl font-bold text-gray-800">
            Transaction #{order.id?.slice(0, 8)}...
          </h1>

          <span
            className={`px-3 py-1 rounded-full text-xs font-semibold ${
              order.paymentStatus === "paid"
                ? "bg-green-100 text-green-600"
                : "bg-red-100 text-red-500"
            }`}
          >
            {order.paymentStatus}
          </span>
        </div>

        {/* ================= INFO GRID ================= */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">

          <div className="bg-gray-50 p-4 rounded-xl">
            <p className="text-sm text-gray-500">Payment Method</p>
            <p className="font-semibold">{order.paymentMethod}</p>
          </div>

          <div className="bg-gray-50 p-4 rounded-xl">
            <p className="text-sm text-gray-500">Transaction ID</p>
            <p className="font-semibold">{order.transactionId}</p>
          </div>

          <div className="bg-gray-50 p-4 rounded-xl">
            <p className="text-sm text-gray-500">Date</p>
            <p className="font-semibold">{order.date}</p>
          </div>

          <div className="bg-gray-50 p-4 rounded-xl">
            <p className="text-sm text-gray-500">Order Status</p>
            <p className="font-semibold">{order.status}</p>
          </div>

        </div>

        {/* ================= SUMMARY ================= */}
        <div className="bg-[#FDF1F7] p-5 rounded-xl mb-6">
          <h2 className="font-semibold mb-3 text-gray-700">Order Summary</h2>

          <div className="flex justify-between text-sm mb-1">
            <span>Subtotal</span>
            <span>${order.summary?.subtotal ?? 0}</span>
          </div>

          <div className="flex justify-between text-sm mb-1">
            <span>Shipping</span>
            <span>${order.summary?.shipping ?? 0}</span>
          </div>

          <div className="flex justify-between text-sm mb-1">
            <span>Tax</span>
            <span>${order.summary?.tax ?? 0}</span>
          </div>

          <div className="flex justify-between font-bold text-lg mt-2 border-t pt-2">
            <span>Total</span>
            <span>${order.summary?.total ?? 0}</span>
          </div>
        </div>

        {/* ================= PRODUCTS ================= */}
        <div className="mb-6">
          <h2 className="font-semibold mb-3 text-gray-700">Products</h2>

          <div className="space-y-3">
            {order.products?.map((p: any, i: number) => (
              <div
                key={i}
                className="flex items-center gap-4 bg-gray-50 p-3 rounded-xl"
              >
                <img
                  src={p.image}
                  alt={p.name}
                  className="w-14 h-14 rounded-lg object-cover"
                />

                <div className="flex-1">
                  <p className="font-medium text-gray-800">{p.name}</p>
                  <p className="text-sm text-gray-500">
                    Qty: {p.quantity}
                  </p>
                </div>

                <p className="font-semibold">
                  ${p.price ?? ""}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* ================= SHIPPING ================= */}
        <div>
          <h2 className="font-semibold mb-3 text-gray-700">Shipping Info</h2>

          <div className="bg-gray-50 p-4 rounded-xl text-sm space-y-1">
            <p className="font-medium">{order.shipping?.name}</p>
            <p>{order.shipping?.email}</p>
            <p>{order.shipping?.phone}</p>
            <p className="text-gray-600">{order.shipping?.address}</p>
          </div>
        </div>

      </div>
    </div>
  );
};

export default TransactionDetails;