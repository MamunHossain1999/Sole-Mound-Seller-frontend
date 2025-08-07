import React from 'react';
import teckImg from '@/assets/storeImage/7c20482cfdc8bc9efe8a30df6d4ad13b1597d366.png'


const StoreSettings: React.FC = () => {
  return (
    <div className="bg-pink-50 min-h-screen">
      {/* Header */}
      <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-lg md:text-2xl font-bold text-[#505050]">
              Store Settings
            </h1>
            <div className="flex items-center text-sm text-gray-500 mt-1">
              <span className="text-[#A8537B] text-sm font-medium">
                Dashboard
              </span>
              <span className="mx-2 text-[#919191]">
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
              <span className="text-[#919191] text-sm font-medium">
                Store Settings
              </span>
            </div>
          </div>
          <button className="flex items-center justify-center px-4 py-2 gap-2 bg-[#C8A8E9] text-[#1F1F1F] text-base rounded-[8px] font-semibold hover:bg-purple-300 cursor-pointer transition-colors">
            Edit
          </button>
        </div>

      {/* Left Section */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="col-span-1 bg-white rounded-lg shadow-md p-4">
          <div className="gap-2">
           <div className='bg-[#FDF1F7] flex justify-center p-5'>
             <img src={teckImg} className="rounded-full" alt="Store Logo" />
           </div>
            <div>
              <h3 className="font-semibold">TechEadge <span className="text-sm text-gray-500">(Fashion)</span></h3>
              <div className="text-xs text-gray-500 gap-1">
                <span>⭐ 4.5</span>
                <span>3.5k</span>
              </div>
            </div>
            <button className="ml-auto text-sm text-purple-500">Edit</button>
          </div>

          <div className="mt-4 space-y-2 text-sm text-gray-600">
            <p>www.techeadge.co</p>
            <p>4604 , Phili Lane Kiowa IN 47404</p>
            <p>zarafashionworld@dayrep.com</p>
            <p>+243 812-801-9335</p>
          </div>

          <div className="mt-4">
            <div className="text-sm text-gray-600 mb-1">Fashion <span className="float-right">$200k</span></div>
            <div className="w-full bg-gray-200 h-2 rounded">
              <div className="bg-purple-400 h-2 rounded" style={{ width: '70%' }}></div>
            </div>
          </div>

          <div className="grid grid-cols-3 mt-4 text-center text-sm">
            <div>
              <p className="font-bold">865</p>
              <p className="text-gray-500">Item Stock</p>
            </div>
            <div>
              <p className="font-bold">+4.5k</p>
              <p className="text-gray-500">Sells</p>
            </div>
            <div>
              <p className="font-bold">+2k</p>
              <p className="text-gray-500">Happy Client</p>
            </div>
          </div>
        </div>

        {/* Right Section */}
        <div className="col-span-2 space-y-6">
          {/* Thumbnail */}
          <div className="bg-white rounded-lg shadow-md p-4">
            <p className="mb-2 font-semibold">Add Thumbnail Photo</p>
            <div className="border-2 border-dashed border-gray-300 rounded-lg h-36 flex items-center justify-center text-sm text-gray-500">
              Drop your images here, or <span className="text-purple-500 ml-1">click to browse</span>
            </div>
            <p className="text-xs text-gray-400 mt-2">1600 x 1200 (4:3) recommended. PNG, JPG and GIF files are allowed</p>
          </div>

          {/* Shop Info */}
          <div className="bg-white rounded-lg shadow-md p-4 space-y-4">
            <p className="font-semibold">Shop Information</p>
            <div className="grid grid-cols-2 gap-4">
              <input className="border px-3 py-2 rounded" placeholder="Shop Title" defaultValue="TechEadge" />
              <input className="border px-3 py-2 rounded" placeholder="Product" defaultValue="Fashion" />
              <input className="border px-3 py-2 rounded" placeholder="Shop Link" defaultValue="34526" />
              <input className="border px-3 py-2 rounded" placeholder="Location" />
              <input className="border px-3 py-2 rounded" placeholder="Email" defaultValue="Fashion Men , Women & Kid's" />
              <input className="border px-3 py-2 rounded" placeholder="Phone Number" defaultValue="Seller" />
              <input className="border px-3 py-2 rounded" placeholder="Yearly Revenue $0" />
              <input className="border px-3 py-2 rounded" placeholder="$500" />
            </div>
            <p className="font-semibold">Seller Product Information</p>
            <div className="grid grid-cols-3 gap-4">
              <input className="border px-3 py-2 rounded" placeholder="Items Stock" defaultValue="$0" />
              <input className="border px-3 py-2 rounded" placeholder="Product Sells" defaultValue="$0" />
              <input className="border px-3 py-2 rounded" placeholder="Happy Client" defaultValue="$0" />
            </div>
          </div>

          {/* Account Info */}
          <div className="bg-white rounded-lg shadow-md p-4 space-y-4">
            <p className="font-semibold">Account Information</p>
            <div className="grid grid-cols-2 gap-4">
              <input className="border px-3 py-2 rounded" placeholder="Name on Card" defaultValue="Linda Blair" />
              <input className="border px-3 py-2 rounded" placeholder="Account Number" defaultValue="7896543235" />
              <input className="border px-3 py-2 rounded" placeholder="Name of Bank" defaultValue="12/05/2025" />
              <input className="border px-3 py-2 rounded" placeholder="Branch Name" defaultValue="897" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default StoreSettings;
