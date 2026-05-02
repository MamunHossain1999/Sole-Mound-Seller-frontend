/* eslint-disable @typescript-eslint/no-unused-vars */
import { useCreateBannerMutation } from "@/redux/api/bannerApi";
import { useState } from "react";

import { toast } from "react-toastify";

const CreateBannerPage: React.FC = () => {
  const [createBanner, { isLoading }] = useCreateBannerMutation();

  const [form, setForm] = useState({
    title: "",
    link: "",
    description: "",
  });

  const [imageFile, setImageFile] = useState<File | null>(null);

  /* ================= HANDLE TEXT CHANGE ================= */
  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  /* ================= HANDLE IMAGE ================= */
  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setImageFile(e.target.files[0]);
    }
  };

  /* ================= SUBMIT ================= */
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!imageFile) {
      toast.error("Image is required");
      return;
    }

    try {
      const formData = new FormData();

      formData.append("title", form.title);
      formData.append("link", form.link);
      formData.append("description", form.description);
      formData.append("image", imageFile); // 👈 Cloudinary file

      await createBanner(formData).unwrap();

      toast.success("Banner created successfully!");

      setForm({
        title: "",
        link: "",
        description: "",
      });
      setImageFile(null);
    } catch (error) {
      toast.error("Failed to create banner");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4">
      <div className="w-full max-w-xl bg-white p-6 rounded-xl shadow-lg">

        {/* TITLE */}
        <h2 className="text-2xl font-bold text-center mb-6">
          Create Banner
        </h2>

        {/* FORM */}
        <form onSubmit={handleSubmit} className="space-y-4">

          {/* TITLE */}
          <input
            type="text"
            name="title"
            value={form.title}
            onChange={handleChange}
            placeholder="Banner Title"
            className="w-full border p-3 rounded"
            required
          />

          {/* IMAGE UPLOAD */}
          <input
            type="file"
            accept="image/*"
            onChange={handleImageChange}
            className="w-full border p-3 rounded"
            required
          />

          {/* LINK */}
          <input
            type="text"
            name="link"
            value={form.link}
            onChange={handleChange}
            placeholder="Product / Category Link"
            className="w-full border p-3 rounded"
          />

          {/* DESCRIPTION */}
          <textarea
            name="description"
            value={form.description}
            onChange={handleChange}
            placeholder="Description"
            className="w-full border p-3 rounded"
            rows={4}
          />

          {/* BUTTON */}
          <button
            type="submit"
            disabled={isLoading}
            className="w-full bg-purple-600 text-white py-3 rounded hover:bg-purple-700 transition"
          >
            {isLoading ? "Creating..." : "Create Banner"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default CreateBannerPage;