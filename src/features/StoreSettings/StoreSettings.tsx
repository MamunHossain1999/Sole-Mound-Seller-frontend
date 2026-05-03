/* eslint-disable @typescript-eslint/no-unused-vars */
import React from "react";
import teckImg from "@/assets/storeImage/7c20482cfdc8bc9efe8a30df6d4ad13b1597d366.png";
import { toast } from "react-toastify";

import {
  useGetBankInfoQuery,
  useSaveBankInfoMutation,
} from "@/redux/api/bankApi";

import {
  useGetStoreQuery,
  useGetStoreStatsQuery,
  useSaveStoreMutation,
} from "@/redux/api/storeApi";

const StoreSettings: React.FC = () => {
  /* ================= STORE ================= */
  const { data: store, isLoading } = useGetStoreQuery();
  const { data: stats } = useGetStoreStatsQuery();
  const [saveStore] = useSaveStoreMutation();


  const statsData = stats ?? {
    itemsStock: 0,
    sells: 0,
    happyClient: 0,
    revenue: 0,
  };

  /* ================= BANK ================= */
  const { data: bank } = useGetBankInfoQuery();
  const [saveBankInfo] = useSaveBankInfoMutation();

  /* ================= STORE FORM ================= */
  const [storeForm, setStoreForm] = React.useState({
    name: "",
    category: "",
    shopCode: "",
    location: "",
    email: "",
    phone: "",
  });

  /* ================= BANK FORM ================= */
  const [bankForm, setBankForm] = React.useState({
    bankName: "",
    accountNumber: "",
    swiftCode: "",
    country: "",
    accountName: "",
    email: "",
  });

  /* ================= SET STORE ================= */
  React.useEffect(() => {
    if (store) {
      setStoreForm({
        name: store.name || "",
        category: store.category || "",
        shopCode: store.shopCode || "",
        location: store.location || "",
        email: store.email || "",
        phone: store.phone || "",
      });
    }
  }, [store]);

  /* ================= SET BANK ================= */
  React.useEffect(() => {
    if (bank) {
      setBankForm({
        bankName: bank.bankName || "",
        accountNumber: bank.accountNumber || "",
        swiftCode: bank.swiftCode || "",
        country: bank.country || "",
        accountName: bank.accountName || "",
        email: bank.email || "",
      });
    }
  }, [bank]);

  /* ================= HANDLERS ================= */
  const handleStoreChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setStoreForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleBankChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setBankForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSaveStore = async () => {
    try {
      await saveStore(storeForm).unwrap();
      toast.success("Store info saved");
    } catch (err) {
      toast.error("Failed to save store info");
    }
  };

  const handleSaveBank = async () => {
    try {
      await saveBankInfo(bankForm).unwrap();
      toast.success("Bank info saved successfully");
    } catch (err) {
      toast.error("Failed to save bank info");
    }
  };

  if (isLoading) return <p>Loading...</p>;

  return (
    <div className="bg-pink-50 min-h-screen">
      {/* HEADER */}
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-lg md:text-2xl font-bold text-[#505050]">
            Store Settings
          </h1>

          <div className="flex items-center text-sm text-gray-500 mt-1">
            <span className="text-[#A8537B] font-medium">Dashboard</span>
            <span className="mx-2">›</span>
            <span>Store Settings</span>
          </div>
        </div>
      </div>

      {/* MAIN */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* LEFT */}
        <div className="col-span-1 bg-white rounded-lg shadow-md p-4">
          <div className="bg-[#FDF1F7] flex justify-center p-5">
            <img src={teckImg} className="rounded-full" alt="Store Logo" />
          </div>

          <h3 className="font-semibold mt-3">
            {storeForm.name || "TechEadge"}{" "}
            <span className="text-sm text-gray-500">
              ({storeForm.category || "Fashion"})
            </span>
          </h3>

          <div className="mt-4 space-y-2 text-sm text-gray-600">
            <p>{storeForm.shopCode}</p>
            <p>{storeForm.location}</p>
            <p>{storeForm.email}</p>
            <p>{storeForm.phone}</p>
          </div>

          <div className="mt-4">
            <div className="text-sm">
              Revenue <span className="float-right">${statsData.revenue}</span>
            </div>
            <div className="w-full bg-gray-200 h-2 rounded mt-1">
              <div className="bg-purple-400 h-2 rounded w-[70%]" />
            </div>
          </div>

          <div className="grid grid-cols-3 mt-4 text-center text-sm">
            <div>
              <p className="font-bold">{statsData.itemsStock}</p>
              <p className="text-gray-500">Stock</p>
            </div>
            <div>
              <p className="font-bold">{statsData.sells}</p>
              <p className="text-gray-500">Sells</p>
            </div>
            <div>
              <p className="font-bold">{statsData.happyClient}</p>
              <p className="text-gray-500">Clients</p>
            </div>
          </div>
        </div>

        {/* RIGHT */}
        <div className="col-span-2 space-y-6">
          {/* SHOP INFO (NOW EDITABLE) */}
          <div className="bg-white rounded-lg shadow-md p-4 space-y-4">
            <p className="font-semibold">Shop Information</p>

            <div className="grid grid-cols-2 gap-4">
              <input
                name="name"
                value={storeForm.name}
                onChange={handleStoreChange}
                className="border px-3 py-2 rounded"
                placeholder="Store Name"
              />

              <input
                name="category"
                value={storeForm.category}
                onChange={handleStoreChange}
                className="border px-3 py-2 rounded"
                placeholder="Category"
              />

              <input
                name="shopCode"
                value={storeForm.shopCode}
                onChange={handleStoreChange}
                className="border px-3 py-2 rounded"
                placeholder="Shop Code"
              />

              <input
                name="location"
                value={storeForm.location}
                onChange={handleStoreChange}
                className="border px-3 py-2 rounded"
                placeholder="Location"
              />

              <input
                name="email"
                value={storeForm.email}
                onChange={handleStoreChange}
                className="border px-3 py-2 rounded"
                placeholder="Email Address"
              />

              <input
                name="phone"
                value={storeForm.phone}
                onChange={handleStoreChange}
                className="border px-3 py-2 rounded"
                placeholder="Phone Number"
              />
            </div>

            <button
              onClick={handleSaveStore}
              className="px-5 py-2 bg-[#C8A8E9] rounded text-white font-semibold"
            >
              Save Shop Info
            </button>
          </div>
          {/* BANK INFO (SAME AS BEFORE) */}
          <div className="bg-white rounded-lg shadow-md p-4 space-y-4">
            <p className="font-semibold">Account Information</p>

            <div className="grid grid-cols-2 gap-4">
              <input
                name="bankName"
                value={bankForm.bankName}
                onChange={handleBankChange}
                className="border px-3 py-2 rounded"
              />
              <input
                name="accountNumber"
                value={bankForm.accountNumber}
                onChange={handleBankChange}
                className="border px-3 py-2 rounded"
              />
              <input
                name="swiftCode"
                value={bankForm.swiftCode}
                onChange={handleBankChange}
                className="border px-3 py-2 rounded"
              />
              <input
                name="country"
                value={bankForm.country}
                onChange={handleBankChange}
                className="border px-3 py-2 rounded"
              />
              <input
                name="accountName"
                value={bankForm.accountName}
                onChange={handleBankChange}
                className="border px-3 py-2 rounded"
              />
              <input
                name="email"
                value={bankForm.email}
                onChange={handleBankChange}
                className="border px-3 py-2 rounded"
              />
            </div>

            <button
              onClick={handleSaveBank}
              className="px-5 py-2 bg-[#C8A8E9] rounded text-white font-semibold"
            >
              Save Bank Info
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default StoreSettings;
