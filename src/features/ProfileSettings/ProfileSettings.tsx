/* eslint-disable @typescript-eslint/no-explicit-any */
import {
  useGetProfileQuery,
  useUpdateProfileMutation,
  useUploadAvatarMutation, // ✅ added
} from "@/redux/api/userApi";
import React, { useState, useEffect } from "react";
import { toast } from "react-toastify";

const ProfileSettings: React.FC = () => {
  const { data, isLoading: profileLoading } = useGetProfileQuery();
  const [updateProfile, { isLoading: isUpdating }] = useUpdateProfileMutation();
  const [uploadAvatar] = useUploadAvatarMutation(); // ✅ added

  // Profile Form States
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");

  // ✅ New state for file
  const [file, setFile] = useState<File | null>(null);

  const profile = data as any; // RTK Query response structure handle

  useEffect(() => {
    if (profile) {
      const nameParts = profile?.name ? profile.name.split(" ") : [];
      setFirstName(nameParts[0] || "");
      setLastName(nameParts.slice(1).join(" ") || "");
      setEmail(profile.email || "");
      setPhone(profile.phone || "");
    }
  }, [profile]);

  // ✅ Upload avatar (added)
  const handleAvatarUpload = async () => {
    if (!file) return toast.error("Please select an image");

    try {
      const formData = new FormData();
      formData.append("avatar", file);

      await uploadAvatar(formData).unwrap();

      toast.success("Avatar uploaded successfully!");
    } catch (error: any) {
      toast.error(error?.data?.message || "Upload failed");
    }
  };

  const handleProfileSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      await updateProfile({
        name: `${firstName} ${lastName}`, // ⚠️ FIXED (important)
        email: email.trim(),
        phone: phone.trim(),
      }).unwrap();

      toast.success("Profile updated successfully!");
    } catch (error: any) {
      toast.error(error?.data?.message || "Failed to update profile. Please try again.");
    }
  };

  if (profileLoading) {
    return (
      <div className="bg-pink-50 min-h-screen p-6 flex items-center justify-center">
        <p className="text-lg">Loading profile...</p>
      </div>
    );
  }

  return (
    <div className="bg-pink-50 min-h-screen p-6">
      {/* Header */}
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-lg md:text-2xl font-bold text-[#333843]">Profile Settings</h1>
          <div className="flex items-center mt-1">
            <span className="text-[#A8537B] text-base font-normal">Dashboard</span>
            <span className="mx-2">›</span>
            <span className="text-[#919191] text-base font-normal">Profile</span>
          </div>
        </div>
      </div>

      {/* Profile Content */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left Sidebar */}
        <div className="bg-white rounded-lg shadow-md p-4 text-center">
          <img
            src={profile?.avatar || "https://via.placeholder.com/100"}
            alt="avatar"
            className="rounded-full mx-auto mb-2 w-24 h-24 object-cover"
          />

          {/* ✅ File input (hidden, design unchanged) */}
          <input
            type="file"
            onChange={(e) => setFile(e.target.files?.[0] || null)}
            className="mt-2 text-sm"
          />

          {/* ✅ Upload button (optional small) */}
          <button
            onClick={handleAvatarUpload}
            className="mt-2 text-xs text-blue-500 underline"
          >
            Upload Avatar
          </button>

          <h3 className="font-semibold text-lg">{profile?.name || "Linda Blair"}</h3>
          <p className="text-sm text-gray-500">
            @{profile?.name ? profile.name.toLowerCase().replace(/\s+/g, "_") : "user"}
          </p>

          <div className="mt-4 space-y-2 text-sm text-left">
            <p><strong>Email:</strong> {profile?.email}</p>
            <p><strong>Phone Number:</strong> {profile?.phone}</p>
          </div>
        </div>

        {/* Right Form */}
        <div className="col-span-2 bg-white rounded-lg shadow-md p-6">
          <h4 className="text-lg font-semibold mb-4">Profile Details</h4>

          <form onSubmit={handleProfileSubmit}>
            <div className="mb-6">
              <label className="block text-sm font-medium mb-2">Profile Image</label>
              <div className="border-2 border-dashed border-gray-300 p-6 rounded-lg text-center text-gray-500">
                <input type="file" onChange={(e) => setFile(e.target.files?.[0] || null)} />
                <p className="text-xs mt-2">Or drag and drop files</p>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4 mb-6">
              <input
                className="border px-3 py-2 rounded"
                placeholder="First Name"
                value={firstName}
                onChange={(e) => setFirstName(e.target.value)}
              />
              <input
                className="border px-3 py-2 rounded"
                placeholder="Last Name"
                value={lastName}
                onChange={(e) => setLastName(e.target.value)}
              />
              <input
                className="border px-3 py-2 rounded"
                placeholder="Email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
              <input
                className="border px-3 py-2 rounded"
                placeholder="Phone Number"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
              />
            </div>

            <div className="gap-5 flex justify-end mt-8">
              <button
                type="button"
                className="border px-6 py-2 rounded-[8px] hover:bg-gray-100"
                onClick={() => window.location.reload()}
              >
                Cancel
              </button>
              <button
                type="submit"
                disabled={isUpdating}
                className="border px-6 py-2 bg-[#C8A8E9] text-white rounded-[8px] hover:bg-purple-600 disabled:opacity-50"
              >
                {isUpdating ? "Saving..." : "Save Changes"}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default ProfileSettings;