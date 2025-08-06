import React from "react";
import { useNavigate } from "react-router";

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
  const navigate = useNavigate();
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
                  fill-rule="evenodd"
                  clip-rule="evenodd"
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
        <button onClick={() => navigate("/change-password")} className="text-purple-600 border-b-2 border-purple-500 pb-2 font-medium">
          Profile
        </button>
        <button onClick={() => navigate("change-password")} className="text-gray-500 pb-2">Change Password</button>
        <button className="text-gray-500 pb-2">Notifications</button>
      </div>

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
              <button className="text-purple-600">Add File</button>
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
            <input className="border px-3 py-2 rounded" placeholder="Email" />
            <input
              className="border px-3 py-2 rounded"
              placeholder="Phone Number"
            />
          </div>

          <div className="mt-6">
            <h4 className="text-lg font-semibold mb-2">Regional Settings</h4>
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
        </div>
      </div>
      <div className="gap-5 flex justify-end mt-3">
        <button className="border px-3 py-2 rounded-[8px] ">Cancel</button>
        <button className="border px-3 py-2 bg-[#C8A8E9] rounded-[8px] ">Save</button>
      </div>
    </div>
  );
};

export default ProfileSettings;
