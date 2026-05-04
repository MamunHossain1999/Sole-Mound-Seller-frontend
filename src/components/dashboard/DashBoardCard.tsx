/* eslint-disable @typescript-eslint/no-explicit-any */
import { Card, CardContent } from "@/components/ui/card";

import img1 from "@/assets/dashboardIcon/img1.png";
import img2 from "@/assets/dashboardIcon/img2.png";
import img3 from "@/assets/dashboardIcon/img3.png";
import img4 from "@/assets/dashboardIcon/img4.png";
import img5 from "@/assets/dashboardIcon/img5.png";

import shoppingCart from "@/assets/dashboardIcon/shoppingCart.svg";
import total from "@/assets/dashboardIcon/totalIncome.svg";
import monthlyIncome from "@/assets/dashboardIcon/monthlyIcome.svg";
import userIcon from "@/assets/dashboardIcon/user.svg";

import { useGetAllOrdersQuery } from "@/redux/api/orderApi";
import { useGetWithdrawsQuery } from "@/redux/api/bankApi";
import { useGetStatsQuery } from "@/redux/api/statsApi";

const DashBoardCard = () => {
  const { data: orders = [], isLoading } = useGetAllOrdersQuery({});
  const { data: withdraws = [] } = useGetWithdrawsQuery();
 const { data: stats } = useGetStatsQuery();
const totalVisitors = stats?.visitors ?? 0;


  // loading
  if (isLoading) {
    return <p className="text-center py-10">Loading...</p>;
  }

  // ================= TOTAL SALES =================
  const totalSales = orders.length;

  // ================= TOTAL INCOME =================
  const totalIncome = orders.reduce((sum: number, order: any) => {
    return sum + (order?.summary?.total ?? 0);
  }, 0);

  // ================= MONTHLY EARNING =================
  const currentMonth = new Date().getMonth();

  const monthlyEarning = orders
    .filter((order: any) => {
      return new Date(order.date).getMonth() === currentMonth;
    })
    .reduce((sum: number, order: any) => {
      return sum + (order?.summary?.total ?? 0);
    }, 0);

  // ================= TOTAL WITHDRAW =================
  const totalWithdraw = withdraws.reduce(
    (sum: number, item: any) => sum + (item.amount ?? 0),
    0
  );


  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-4">

      {/* SALES */}
      <Card className="relative text-white overflow-hidden">
        <div className="absolute inset-0 bg-cover bg-center" style={{ backgroundImage: `url(${img1})` }} />
        <CardContent className="relative z-10 p-4">
          <p className="font-bold text-lg">Total Sales</p>
          <p className="text-3xl font-bold">{totalSales}</p>
          <div className="flex justify-end mt-2">
            <img src={shoppingCart} className="w-8 h-8" />
          </div>
        </CardContent>
      </Card>

      {/* INCOME */}
      <Card className="relative text-white overflow-hidden">
        <div className="absolute inset-0 bg-cover bg-center" style={{ backgroundImage: `url(${img2})` }} />
        <CardContent className="relative z-10 p-4">
          <p className="font-bold text-lg">Total Income</p>
          <p className="text-3xl font-bold">${totalIncome.toFixed(2)}</p>
          <div className="flex justify-end mt-2">
            <img src={total} className="w-8 h-8" />
          </div>
        </CardContent>
      </Card>

      {/* MONTHLY */}
      <Card className="relative text-white overflow-hidden">
        <div className="absolute inset-0 bg-cover bg-center" style={{ backgroundImage: `url(${img3})` }} />
        <CardContent className="relative z-10 p-4">
          <p className="font-bold text-lg">Monthly Earning</p>
          <p className="text-3xl font-bold">${monthlyEarning.toFixed(2)}</p>
          <div className="flex justify-end mt-2">
            <img src={monthlyIncome} className="w-8 h-8" />
          </div>
        </CardContent>
      </Card>

      {/* WITHDRAW */}
      <Card className="relative text-white overflow-hidden">
        <div className="absolute inset-0 bg-cover bg-center" style={{ backgroundImage: `url(${img4})` }} />
        <CardContent className="relative z-10 p-4">
          <p className="font-bold text-lg">Total Withdraw</p>
          <p className="text-3xl font-bold">${totalWithdraw.toFixed(2)}</p>
          <div className="flex justify-end mt-2">
            <img src={monthlyIncome} className="w-8 h-8" />
          </div>
        </CardContent>
      </Card>

      {/* VISITORS */}
      <Card className="relative text-white overflow-hidden">
        <div className="absolute inset-0 bg-cover bg-center" style={{ backgroundImage: `url(${img5})` }} />
        <CardContent className="relative z-10 p-4">
          <p className="font-bold text-lg">Total Visitors</p>
          <p className="text-3xl font-bold">{totalVisitors}</p>
          <div className="flex justify-end mt-2">
            <img src={userIcon} className="w-8 h-8" />
          </div>
        </CardContent>
      </Card>

    </div>
  );
};

export default DashBoardCard;