/* eslint-disable @typescript-eslint/no-unused-vars */
import {
  useDeleteBannerMutation,
  useGetBannersQuery,
} from "@/redux/api/bannerApi";
import React, { useState } from "react";

import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import ConfirmDeleteModal from "./ConfirmDeleteModal";

/* ================= TYPE ================= */
interface Banner {
  _id: string;
  title: string;
  image: string;
  link?: string;
  description?: string;
}

const BannerPage: React.FC = () => {
  const { data: banners = [], isLoading, isError } = useGetBannersQuery();
  const [deleteBanner, { isLoading: isDeleting }] = useDeleteBannerMutation();

  const [openModal, setOpenModal] = useState(false);
  const [selectedId, setSelectedId] = useState<string | null>(null);

  /* ================= OPEN MODAL ================= */
  const handleOpenModal = (id: string) => {
    setSelectedId(id);
    setOpenModal(true);
  };

  /* ================= CONFIRM DELETE ================= */
  const handleConfirmDelete = async () => {
    if (!selectedId) return;

    try {
      await deleteBanner(selectedId).unwrap();
      toast.success("Banner deleted successfully");

      setOpenModal(false);
      setSelectedId(null);
    } catch (error) {
      toast.error("Failed to delete banner");
    }
  };

  /* ================= LOADING ================= */
  if (isLoading)
    return <div className="text-center py-10">Loading banners...</div>;

  /* ================= ERROR ================= */
  if (isError)
    return (
      <div className="text-center py-10 text-red-500">
        Failed to load banners
      </div>
    );

  return (
    <div className="container mx-auto px-4 py-10">
      {/* HEADER */}
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-2xl md:text-3xl font-bold">📢 All Banners</h1>

        <Link
          to="/banner-create"
          className="bg-purple-300 text-white px-4 py-2 rounded-lg"
        >
          + Create Banner
        </Link>
      </div>

      {/* GRID */}
      {banners.length === 0 ? (
        <p className="text-center text-gray-500">No banners found</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          {banners?.map((item: Banner) => (
            <div
              key={item._id}
              className="bg-white rounded-lg shadow overflow-hidden"
            >
              {/* IMAGE */}
              <img
                src={item.image}
                alt={item.title}
                className="w-full h-48 object-cover"
              />

              {/* CONTENT */}
              <div className="p-4 text-right">
                <h2 className="text-lg font-semibold">{item.title}</h2>

                <p className="text-sm text-gray-500 mt-1">{item.description}</p>

                {/* DELETE BUTTON */}
                <button
                  onClick={() => handleOpenModal(item._id)}
                  className="mt-4 bg-red-500 text-white px-3 cursor-pointer py-1 rounded text-sm"
                >
                  Delete
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* DELETE MODAL */}
      <ConfirmDeleteModal
        open={openModal}
        onCancel={() => setOpenModal(false)}
        onConfirm={handleConfirmDelete}
        loading={isDeleting}
      />
    </div>
  );
};

export default BannerPage;
