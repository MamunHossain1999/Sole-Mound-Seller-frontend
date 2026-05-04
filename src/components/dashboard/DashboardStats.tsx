/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

import MapCard from "../mapCard/MapCard";
import shoppingCard from "@/assets/dashboardIcon/shoppingCard.svg";
import onTheWay from "@/assets/dashboardIcon/onTheWay.svg";
import pending from "@/assets/dashboardIcon/pending.svg";
import pickUp from "@/assets/dashboardIcon/pickUp.svg";
import ordercomplete from "@/assets/dashboardIcon/orderComplete.svg";
import cancel from "@/assets/dashboardIcon/cancel.svg";
import walletIcon from "@/assets/dashboardIcon/walletIcon.svg";
import TopSellingProducts from "./TopSellingProducts";
import LatestOrder from "./LatestOrder";
import DashBoardCard from "./DashBoardCard";
import { useGetAllOrdersQuery } from "@/redux/api/orderApi";
import { Link } from "react-router";
import { useGetWithdrawsQuery } from "@/redux/api/bankApi";

const DashboardStats = () => {
  const [selectedPeriod, setSelectedPeriod] = useState("This Month");
  const { data: orders = [] } = useGetAllOrdersQuery({});
  const { data: withdraws = [] } = useGetWithdrawsQuery();


  // 👉 status count function
  const getCount = (status: string) =>
    orders.filter((o: any) => o.status === status).length;

  // Order Statistics Data (ONLY value changed)
  const orderStats = [
    {
      title: "Processed Orders",
      value: getCount("processing"),
      icon: (
        <img src={shoppingCard} alt="Processed Orders" className="w-6 h-6" />
      ),
      bgColor: "bg-[#FFEDB9]",
      iconBg: "bg-[#FFEDB9]",
    },
    {
      title: "On The Way",
      value: getCount("on_the_way"),
      icon: <img src={onTheWay} alt="On The Way" className="w-6 h-6" />,
      bgColor: "bg-[#F9D4E6]",
      iconBg: "bg-[#F9D4E6]",
    },
    {
      title: "Orders Pending",
      value: getCount("pending"),
      icon: <img src={pending} alt="Orders Pending" className="w-6 h-6" />,
      bgColor: "bg-[#C3E3FE]",
      iconBg: "bg-[#C3E3FE]",
    },
    {
      title: "Pick-Up",
      value: getCount("pickup"),
      icon: <img src={pickUp} alt="Pick-Up" className="w-6 h-6" />,
      bgColor: "bg-[#FFEDB9]",
      iconBg: "bg-[#FFEDB9]",
    },
    {
      title: "Orders Completed",
      value: getCount("completed"),
      icon: (
        <img src={ordercomplete} alt="Orders Completed" className="w-6 h-6" />
      ),
      bgColor: "bg-[#CEE7B5]",
      iconBg: "bg-[#CEE7B5]",
    },
    {
      title: "Orders Cancelled",
      value: getCount("cancelled"),
      icon: <img src={cancel} alt="Orders Cancelled" className="w-6 h-6" />,
      bgColor: "bg-[#FFB9B9]",
      iconBg: "bg-[#FFB9B9]",
    },
  ];

  // status wise calculation

const approvedWithdraw = withdraws
  .filter((item: any) => item.status === "approved")
  .reduce((sum: number, item: any) => sum + (item.amount ?? 0), 0);

  const pendingWithdraw = withdraws
    .filter((w: any) => w.status === "pending")
    .reduce((sum: number, item: any) => sum + (item.amount ?? 0), 0);

  const rejectedWithdraw = withdraws
    .filter((w: any) => w.status === "rejected")
    .reduce((sum: number, item: any) => sum + (item.amount ?? 0), 0);

  const totalIncome = orders.reduce((sum: number, order: any) => {
    return sum + (order?.summary?.total ?? 0);
  }, 0);

  // Revenue by Region Data
  const revenueByRegion = [
    { region: "England", percentage: 40 },
    { region: "Northern Ireland", percentage: 25 },
    { region: "Scotland", percentage: 20 },
    { region: "Wales", percentage: 15 },
  ];

  return (
    <div className="w-full mx-auto ">
      <div className="mb-4">
        <DashBoardCard />
      </div>

      {/* Order Statistics and Vendor Wallet */}
      <div className="w-full grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6 mb-8 mx-auto">
        {/* Left Section: Order Stats */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-4 col-span-2">
          {/* Big First Card */}
          <Card className="col-span-1 row-span-2 bg-[#FFF] rounded-[12px] lg:pl-1 ">
            <CardContent className="p-5 flex flex-col h-full">
              <p className="md:text-[20px] font-bold text-[#A8537B]">
                Total Orders
              </p>
              <p className="md:text-2xl font-bold text-[#A8537B] mb-4">
                {orders.length}
              </p>
            </CardContent>
            <Link
              to="/orders-list"
              className="!bg-[#C8A8E9] w-[203px] text-center items-center py-2 rounded-lg h-[48px] mx-auto hover:bg-purple-300 text-[#1F1F1F] text-base"
            >
              All Order +
            </Link>
          </Card>

          {/* Smaller Cards */}
          {orderStats?.map((stat, index) => (
            <Card
              key={index}
              className="bg-white border-0 shadow-sm hover:shadow-md rounded-[12px] transition-transform duration-300 hover:scale-[1.02]"
            >
              <CardContent className="p-4 flex flex-col space-y-2 lg:ml-3 ">
                <div className="flex lg:items-center space-x-3 lg:gap-4">
                  <div
                    className={`lg:w-[54px] lg:h-[54px] w-[40px] h-[40px] ${stat.iconBg} rounded-[12px] items-center justify-center flex`}
                  >
                    {stat.icon}
                  </div>
                  <div>
                    <p className="text-xs sm:text-[20px] font-bold text-[#919191]">
                      {stat.title}
                    </p>
                    <p className="text-lg sm:text-2xl font-bold text-[#1F1F1F]">
                      {stat.value}
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="lg:col-span-1 col-span-2">
          {/* Right Section: Vendor Wallet */}
          <Card className="w-full mx-auto shadow-lg ">
            <CardHeader className="">
              <div className="flex items-center justify-between">
                <CardTitle className="text-lg lg:text-[20px] font-bold text-[#A8537B]">
                  Vendor Wallet
                </CardTitle>
                <select
                  className="text-base rounded-lg px-3 py-1 text-[#1F1F1F] focus:outline-none "
                  value={selectedPeriod}
                  onChange={(e) => setSelectedPeriod(e.target.value)}
                >
                  <option>This Month</option>
                  <option>Last Month</option>
                  <option>This Year</option>
                </select>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex justify-center items-center">
                  <img
                    src={walletIcon}
                    alt="Wallet Icon"
                    className="w-[40px] h-[40px] lg:w-[57px] lg:h-[57px]"
                  />
                </div>
                <div className="flex justify-center items-center p-3 gap-6 rounded-lg">
                  <span className="text-base lg:text-[20px] font-bold text-[#919191]">
                    Total Earning
                  </span>
                  <span className="font-bold text-base lg:text-2xl flex items-center ">
                    <span></span>${totalIncome.toFixed(2)}
                  </span>
                </div>
                <div className="px-5 py-6 flex flex-col border border-[#B6B7BC] rounded-[12px]">
                  <span className="text-base lg:text-2xl font-bold text-[#1F1F1F]">
                    ${approvedWithdraw.toFixed(2)}
                  </span>
                  <span className="text-base lg:text-[20px] font-bold text-[#919191]">
                    Already Withdraw
                  </span>
                </div>
                <div className="px-5 py-6 flex flex-col border border-[#B6B7BC] rounded-[12px]">
                  <span className="ftext-base lg:text-2xl font-bold text-[#1F1F1F]">
                    ${pendingWithdraw.toFixed(2)}
                  </span>
                  <span className="text-base lg:text-[20px] font-bold text-[#919191]">
                    Pending Withdraw
                  </span>
                </div>
                <div className="px-5 py-6 flex flex-col border border-[#B6B7BC] rounded-[12px]">
                  <span className="text-base lg:text-2xl font-bold text-[#1F1F1F]">
                    ${rejectedWithdraw.toFixed(2)}
                  </span>
                  <span className="text-base lg:text-[20px] font-bold text-[#919191]">
                    Rejected Withdraw
                  </span>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Top Selling Products */}
      <div className="mb-8 ">
        <TopSellingProducts />
      </div>

      {/* Latest Orders */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 pb-12">
        {/* Left Side: Latest Orders - takes 2/3 columns */}
        <div className="lg:col-span-2">
          <LatestOrder />
        </div>

        {/* Right Side: Map Card and Region Stats - takes 1/3 columns */}
        <div className="lg:col-span-1">
          <div className="bg-white shadow-lg rounded-xl p-4 h-full">
            {/* Map Area */}
            <div className="w-full aspect-video bg-gray-100 rounded-lg overflow-hidden">
              <MapCard />
            </div>

            {/* Region Data */}
            <div className="space-y-4 pt-5">
              {revenueByRegion?.map((region, index) => (
                <div key={index} className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <span className="text-sm font-medium text-[#23272E]">
                      {region.region}
                    </span>
                  </div>
                  <span className="text-sm font-bold text-[#23272E]">
                    {region.percentage}%
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DashboardStats;
