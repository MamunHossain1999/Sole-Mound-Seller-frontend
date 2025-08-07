import React, { useState } from "react";
import { FaEye, FaEyeSlash } from "react-icons/fa";

type ProfileInfo = {
  sellerId: string;
  email: string;
  phone: string;
  transactionId: string;
  lastTransaction: string;
};

const profile: ProfileInfo = {
  sellerId: "ID-011221",
  email: "lindablair@mail.com",
  phone: "050 414 8778",
  transactionId: "98764356",
  lastTransaction: "12 December 2022",
};

const ProfileSettings: React.FC = () => {
  // password er jnno logic
  const [oldPassword, setOldPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const [showOld, setShowOld] = useState(false);
  const [showNew, setShowNew] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);

  const [selectedRule, setSelectedRule] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // password update logic
    alert("Password updated!");
  };

  const handleCancel = () => {
    setOldPassword("");
    setNewPassword("");
    setConfirmPassword("");
    setSelectedRule("");
  };

  const [activeTab, setActiveTab] = useState<
    "profile" | "password" | "notifications"
  >("profile");

  // taber conten function
  const renderContent = () => {
    if (activeTab === "profile") {
      return (
        <>
          {/* tab er main contain */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Left Sidebar */}
            <div className="bg-white rounded-lg shadow-md p-4 text-center">
              <img
                src="https://via.placeholder.com/100"
                alt="avatar"
                className="rounded-full mx-auto mb-2"
              />
              <h3 className="font-semibold">Linda Blair</h3>
              <p className="text-sm text-gray-500">@linda_blair321</p>

              <div className="mt-4 space-y-2 text-sm text-left">
                <p>
                  <strong>Seller ID:</strong> {profile.sellerId}
                </p>
                <p>
                  <strong>Email:</strong> {profile.email}
                </p>
                <p>
                  <strong>Phone Number:</strong> {profile.phone}
                </p>
                <p>
                  <strong>Transaction ID:</strong> {profile.transactionId}
                </p>
                <p>
                  <strong>Latest Transaction:</strong> {profile.lastTransaction}
                </p>
              </div>
            </div>

            {/* Right Content */}
            <div className="col-span-2 bg-white rounded-lg shadow-md p-6">
              <h4 className="text-lg font-semibold mb-4">Profile Details</h4>
              <p className="text-sm text-gray-500 mb-4">
                Enter your profile information
              </p>

              <div className="mb-6">
                <label className="block text-sm font-medium mb-2">
                  Profile Image
                </label>
                <div className="border-2 border-dashed border-gray-300 p-6 rounded-lg text-center text-gray-500">
                  <input type="file" />
                  <p className="text-xs mt-2">Or drag and drop files</p>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4 mb-6">
                <input
                  className="border px-3 py-2 rounded"
                  placeholder="First Name"
                />
                <input
                  className="border px-3 py-2 rounded"
                  placeholder="Last Name"
                />
                <input
                  className="border px-3 py-2 rounded"
                  placeholder="Email"
                />
                <input
                  className="border px-3 py-2 rounded"
                  placeholder="Phone Number"
                />
              </div>

              <div className="mt-6">
                <h4 className="text-lg font-semibold mb-2">
                  Regional Settings
                </h4>
                <p className="text-sm text-gray-500 mb-4">
                  Set your language and timezone
                </p>
                <div className="grid grid-cols-2 gap-4">
                  <select className="border px-3 py-2 rounded">
                    <option>English</option>
                    <option>Bangla</option>
                  </select>
                  <select className="border px-3 py-2 rounded">
                    <option>GMT +02:00</option>
                    <option>GMT +06:00</option>
                  </select>
                </div>
              </div>
              <div className="gap-5 flex justify-end mt-3">
                <button className="border px-3 py-2 rounded-[8px] ">
                  Cancel
                </button>
                <button className="border px-3 py-2 bg-[#C8A8E9] rounded-[8px] ">
                  Save
                </button>
              </div>
            </div>
          </div>
        </>
      );
    } else if (activeTab === "password") {
      return (
        <div className=" mx-auto p-6 bg-pink-50 rounded-md">
          <h2 className="font-semibold mb-6 text-gray-800">Password</h2>
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid grid-cols-3 gap-6">
              {/* Old Password */}
              <div>
                <label className="block mb-1 text-sm text-gray-600">
                  Old Password
                </label>
                <div className="relative">
                  <input
                    type={showOld ? "text" : "password"}
                    className="w-full border border-gray-300 rounded px-3 py-2 pr-10 focus:outline-none focus:ring-2 focus:ring-pink-400"
                    value={oldPassword}
                    onChange={(e) => setOldPassword(e.target.value)}
                    required
                  />
                  <button
                    type="button"
                    onClick={() => setShowOld(!showOld)}
                    className="absolute right-2 top-2 text-gray-500"
                    tabIndex={-1}
                  >
                    {showOld ? <FaEyeSlash /> : <FaEye />}
                  </button>
                </div>
              </div>

              {/* New Password */}
              <div>
                <label className="block mb-1 text-sm text-gray-600">
                  New Password
                </label>
                <div className="relative">
                  <input
                    type={showNew ? "text" : "password"}
                    className="w-full border border-gray-300 rounded px-3 py-2 pr-10 focus:outline-none focus:ring-2 focus:ring-pink-400"
                    value={newPassword}
                    onChange={(e) => setNewPassword(e.target.value)}
                    required
                  />
                  <button
                    type="button"
                    onClick={() => setShowNew(!showNew)}
                    className="absolute right-2 top-2 text-gray-500"
                    tabIndex={-1}
                  >
                    {showNew ? <FaEyeSlash /> : <FaEye />}
                  </button>
                </div>
              </div>

              {/* Confirm Password */}
              <div>
                <label className="block mb-1 text-sm text-gray-600">
                  Confirm Password
                </label>
                <div className="relative">
                  <input
                    type={showConfirm ? "text" : "password"}
                    className="w-full border border-gray-300 rounded px-3 py-2 pr-10 focus:outline-none focus:ring-2 focus:ring-pink-400"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    required
                  />
                  <button
                    type="button"
                    onClick={() => setShowConfirm(!showConfirm)}
                    className="absolute right-2 top-2 text-gray-500"
                    tabIndex={-1}
                  >
                    {showConfirm ? <FaEyeSlash /> : <FaEye />}
                  </button>
                </div>
              </div>
            </div>

            {/* Password Rules */}
            <div className="space-y-2">
              <label className="flex items-center space-x-2 text-gray-700">
                <input
                  type="radio"
                  name="rule"
                  value="min8"
                  checked={selectedRule === "min8"}
                  onChange={() => setSelectedRule("min8")}
                  className="form-radio"
                />
                <span>Minimum 8 characters.</span>
              </label>
              <label className="flex items-center space-x-2 text-gray-700">
                <input
                  type="radio"
                  name="rule"
                  value="case"
                  checked={selectedRule === "case"}
                  onChange={() => setSelectedRule("case")}
                  className="form-radio"
                />
                <span>Use combination of uppercase and lowercase letters.</span>
              </label>
              <label className="flex items-center space-x-2 text-gray-700">
                <input
                  type="radio"
                  name="rule"
                  value="special"
                  checked={selectedRule === "special"}
                  onChange={() => setSelectedRule("special")}
                  className="form-radio"
                />
                <span>Use of special characters (e.g., !, @, #, $, %)</span>
              </label>
            </div>

            {/* Buttons */}
            <div className="space-x-4 pt-4">
              <button
                type="button"
                onClick={handleCancel}
                className="px-4 py-2 border border-gray-300 rounded hover:bg-gray-100"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="px-4 py-2 bg-purple-400 text-white rounded disabled:opacity-50"
                disabled={
                  !oldPassword ||
                  !newPassword ||
                  newPassword !== confirmPassword
                }
              >
                Update Password
              </button>
            </div>
          </form>
        </div>
      );
    } else if (activeTab === "notifications") {
      return (
        <div className="bg-white rounded-lg shadow-md p-6">
          <h4 className="text-lg font-semibold mb-4">Notifications Settings</h4>
          <p className="text-sm text-gray-500 mb-4">
            Manage your notification preferences.
          </p>
          <label className="flex items-center gap-2 mb-3">
            <input type="checkbox" />
            <span>Email Notifications</span>
          </label>
          <label className="flex items-center gap-2 mb-3">
            <input type="checkbox" />
            <span>SMS Notifications</span>
          </label>
          <button className="bg-purple-400 text-white px-4 py-2 cursor-pointer rounded">
            Save Settings
          </button>
        </div>
      );
    }
  };

  return (
    <div className="bg-pink-50 min-h-screen p-6">
      {/* Header */}
      <div className="flex items-center justify-between mb-8 ">
        <div>
          <h1 className="text-lg md:text-2xl font-bold text-[#333843]">
            Order Details
          </h1>
          <div className="flex items-center mt-1">
            <span className="text-[#A8537B] text-base font-normal">
              Dashboard
            </span>
            <span className="mx-2">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="18"
                height="18"
                viewBox="0 0 18 18"
                fill="none"
              >
                <path
                  fillRule="evenodd"
                  clipRule="evenodd"
                  d="M6.59467 3.96967C6.30178 4.26256 6.30178 4.73744 6.59467 5.03033L10.5643 9L6.59467 12.9697C6.30178 13.2626 6.30178 13.7374 6.59467 14.0303C6.88756 14.3232 7.36244 14.3232 7.65533 14.0303L12.4205 9.26516C12.5669 9.11872 12.5669 8.88128 12.4205 8.73484L7.65533 3.96967C7.36244 3.67678 6.88756 3.67678 6.59467 3.96967Z"
                  fill="#B6B7BC"
                />
              </svg>
            </span>
            <span className="text-[#919191] text-base font-normal">
              Profile
            </span>
          </div>
        </div>
      </div>

      {/* Tabs */}
      <div className="flex gap-4 border-b justify-between  border-gray-200 mb-6">
        <button
          className={`pb-2 font-medium ${
            activeTab === "profile"
              ? "text-purple-600 border-b-2 border-purple-500"
              : "text-gray-500"
          }`}
          onClick={() => setActiveTab("profile")}
        >
          Profile
        </button>
        <button
          className={`pb-2 font-medium ${
            activeTab === "password"
              ? "text-purple-600 border-b-2 border-purple-500"
              : "text-gray-500"
          }`}
          onClick={() => setActiveTab("password")}
        >
          Change Password
        </button>
        <button
          className={`pb-2 font-medium ${
            activeTab === "notifications"
              ? "text-purple-600 border-b-2 border-purple-500"
              : "text-gray-500"
          }`}
          onClick={() => setActiveTab("notifications")}
        >
          Notifications
        </button>
      </div>

      {/* Tab Content */}
      {renderContent()}
    </div>
  );
};

export default ProfileSettings;
