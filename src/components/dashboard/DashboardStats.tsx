// import { useState } from "react";
// import {
//   ShoppingCart,
//   TrendingUp,
//   TrendingDown,
//   Users,
//   Package,
//   CheckCircle,
//   Clock,
//   Plus,
//   MoreHorizontal,
// } from "lucide-react";
// import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
// import { Badge } from "@/components/ui/badge";
// import { Button } from "@/components/ui/button";
// import MapCard from "../mapCard/MapCard";

// const DashboardStats = () => {
//   const [selectedPeriod, setSelectedPeriod] = useState("This Month");

//   // Stats Cards Data
//   const statsCards = [
//     {
//       title: "Total Sales",
//       value: "34,945",
//       icon: <ShoppingCart className="w-5 h-5 text-white" />,
//       bgColor: "bg-gradient-to-r from-purple-500 to-purple-600",
//       change: "+12.5%",
//       changeType: "increase",
//     },
//     {
//       title: "Total Income",
//       value: "$23,802",
//       icon: <TrendingUp className="w-5 h-5 text-white" />,
//       bgColor: "bg-gradient-to-r from-green-500 to-green-600",
//       change: "+8.2%",
//       changeType: "increase",
//     },
//     {
//       title: "Monthly Earning",
//       value: "$13,123",
//       icon: <TrendingUp className="w-5 h-5 text-white" />,
//       bgColor: "bg-gradient-to-r from-blue-500 to-blue-600",
//       change: "+15.3%",
//       changeType: "increase",
//     },
//     {
//       title: "Total Withdraw",
//       value: "$2,543",
//       icon: <TrendingDown className="w-5 h-5 text-white" />,
//       bgColor: "bg-gradient-to-r from-orange-500 to-orange-600",
//       change: "-2.1%",
//       changeType: "decrease",
//     },
//     {
//       title: "Total Visitors",
//       value: "34,945",
//       icon: <Users className="w-5 h-5 text-white" />,
//       bgColor: "bg-gradient-to-r from-pink-500 to-pink-600",
//       change: "+25.7%",
//       changeType: "increase",
//     },
//   ];

//   // Order Statistics Data
//   const orderStats = [
//     {
//       title: "Total Orders",
//       value: "4563",
//       icon: <Package className="w-8 h-8 text-purple-600" />,
//       bgColor: "bg-purple-50",
//       iconBg: "bg-purple-100",
//     },
//     {
//       title: "Processed Order",
//       value: "5",
//       icon: <CheckCircle className="w-8 h-8 text-yellow-600" />,
//       bgColor: "bg-yellow-50",
//       iconBg: "bg-yellow-100",
//     },
//     {
//       title: "On The Way",
//       value: "23",
//       icon: <Clock className="w-8 h-8 text-blue-600" />,
//       bgColor: "bg-blue-50",
//       iconBg: "bg-blue-100",
//     },
//     {
//       title: "Orders Pending",
//       value: "1034",
//       icon: <Package className="w-8 h-8 text-orange-600" />,
//       bgColor: "bg-orange-50",
//       iconBg: "bg-orange-100",
//     },
//     {
//       title: "Pick-Up",
//       value: "13",
//       icon: <Package className="w-8 h-8 text-indigo-600" />,
//       bgColor: "bg-indigo-50",
//       iconBg: "bg-indigo-100",
//     },
//     {
//       title: "Orders Completed",
//       value: "2345",
//       icon: <CheckCircle className="w-8 h-8 text-green-600" />,
//       bgColor: "bg-green-50",
//       iconBg: "bg-green-100",
//     },
    
//   ];

//   // Top Products Data
//   const topProducts = [
//     {
//       name: "Apple iPhone 13",
//       orders: 508,
//       status: "Stock",
//       price: "$999.29",
//       image: "📱",
//       statusColor: "bg-green-100 text-green-800",
//     },
//     {
//       name: "Nike Air Jordan",
//       orders: 506,
//       status: "Stock",
//       price: "$72.40",
//       image: "👟",
//       statusColor: "bg-green-100 text-green-800",
//     },
//     {
//       name: "Beats Studio 2",
//       orders: 506,
//       status: "Stock",
//       price: "$99.90",
//       image: "🎧",
//       statusColor: "bg-green-100 text-green-800",
//     },
//     {
//       name: "Apple Watch Series 7",
//       orders: 506,
//       status: "Out",
//       price: "$249.99",
//       image: "⌚",
//       statusColor: "bg-red-100 text-red-800",
//     },
//     {
//       name: "Amazon Echo Dot",
//       orders: 506,
//       status: "Stock",
//       price: "$79.40",
//       image: "🔊",
//       statusColor: "bg-green-100 text-green-800",
//     },
//   ];

//   // Top Brands Data
//   const topBrands = [
//     { name: "Levi's", orders: 626, logo: "🏷️" },
//     { name: "Nike Air Jordan", orders: 416, logo: "✓" },
//     { name: "Vans", orders: 405, logo: "👟" },
//     { name: "Apple Watch Series 7", orders: 328, logo: "🍎" },
//     { name: "Amazon Echo Dot", orders: 346, logo: "🛒" },
//   ];

//   // Recent Orders Data
//   const recentOrders = [
//     {
//       id: "#11232",
//       product: "iPhone 13 Pro",
//       date: "Jun 29 2022",
//       status: "Delivered",
//       amount: "$400.00",
//       statusColor: "bg-green-100 text-green-800",
//     },
//     {
//       id: "#11232",
//       product: "MacBook Pro",
//       date: "Jun 29 2022",
//       status: "Pending",
//       amount: "$280.00",
//       statusColor: "bg-yellow-100 text-yellow-800",
//     },
//     {
//       id: "#11232",
//       product: "MacBook Pro",
//       date: "Jun 29 2022",
//       status: "Pending",
//       amount: "$280.00",
//       statusColor: "bg-yellow-100 text-yellow-800",
//     },
//     {
//       id: "#11232",
//       product: "Microsoft Book",
//       date: "Jun 29 2022",
//       status: "Delivered",
//       amount: "$150.00",
//       statusColor: "bg-green-100 text-green-800",
//     },
//     {
//       id: "#11232",
//       product: "Apple Pen",
//       date: "Jun 29 2022",
//       status: "Delivered",
//       amount: "$60.00",
//       statusColor: "bg-green-100 text-green-800",
//     },
//     {
//       id: "#11232",
//       product: "AirPods",
//       date: "Jun 29 2022",
//       status: "Delivered",
//       amount: "$80.00",
//       statusColor: "bg-green-100 text-green-800",
//     },
//   ];

//   // Revenue by Region Data
//   const revenueByRegion = [
//     { region: "England", percentage: 40, color: "bg-blue-500" },
//     { region: "Northern Ireland", percentage: 25, color: "bg-green-500" },
//     { region: "Scotland", percentage: 20, color: "bg-purple-500" },
//     { region: "Wales", percentage: 15, color: "bg-orange-500" },
//   ];

//   return (
//     <div className="w-full  ">
//       {/* Stats Cards */}
//       <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-4 mb-8">
//         {statsCards.map((card, index) => (
//           <Card
//             key={index}
//             className={`${card.bgColor} border-0 shadow-lg hover:shadow-xl transition-shadow duration-300`}
//           >
//             <CardContent className="p-4">
//               <div className="flex items-center justify-between">
//                 <div className="text-white">
//                   <p className="text-sm opacity-90 mb-1">{card.title}</p>
//                   <p className="text-2xl font-bold">{card.value}</p>
//                   <div className="flex items-center mt-2">
//                     <span
//                       className={`text-xs px-2 py-1 rounded-full ${
//                         card.changeType === "increase"
//                           ? "bg-white bg-opacity-20 text-white"
//                           : "bg-white bg-opacity-20 text-white"
//                       }`}
//                     >
//                       {card.change}
//                     </span>
//                   </div>
//                 </div>
//                 <div className="opacity-80">{card.icon}</div>
//               </div>
//             </CardContent>
//           </Card>
//         ))}
//       </div>

//       {/* Order Statistics and Vendor Wallet */}
//       <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8 max-w-7xl mx-auto">
//         {/* Left Section: Order Stats */}
//         <div className="grid grid-cols-2 md:grid-cols-2 lg:grid-cols- gap-4 col-span-2">
//           {/* Big First Card */}
//           <Card className="col-span-1 row-span-2 bg-purple-50 text-purple-700 rounded-xl">
//             <CardContent className="p-5 text-center flex flex-col items-center justify-center h-full">
//               <p className="text-sm font-semibold">Total Orders</p>
//               <p className="text-4xl font-bold mb-4">4563</p>
//               <Button className="bg-purple-500 hover:bg-purple-600 text-white text-sm">
//                 All Order +
//               </Button>
//             </CardContent>
//           </Card>

//           {/* Smaller Cards */}
//           {orderStats.map((stat, index) => (
//             <Card
//               key={index}
//               className="bg-white border-0 shadow-sm hover:shadow-md rounded-xl transition-transform duration-300 hover:scale-[1.02]"
//             >
//               <CardContent className="p-4 flex flex-col items-center text-center space-y-2">
//                 <div
//                   className={`w-10 h-10 ${stat.iconBg} rounded-md flex items-center justify-center`}
//                 >
//                   {stat.icon}
//                 </div>
//                 <p className="text-xs sm:text-sm text-gray-500">{stat.title}</p>
//                 <p className="text-lg sm:text-xl font-semibold text-gray-800">
//                   {stat.value}
//                 </p>
//               </CardContent>
//             </Card>
//           ))}
//         </div>

//         {/* Right Section: Vendor Wallet */}
//         <Card className="shadow-lg">
//           <CardHeader className="pb-3">
//             <div className="flex items-center justify-between">
//               <CardTitle className="text-lg font-semibold">
//                 Vendor Wallet
//               </CardTitle>
//               <select
//                 className="text-sm border border-gray-300 rounded-lg px-3 py-1 bg-white focus:outline-none focus:ring-2 focus:ring-purple-500"
//                 value={selectedPeriod}
//                 onChange={(e) => setSelectedPeriod(e.target.value)}
//               >
//                 <option>This Month</option>
//                 <option>Last Month</option>
//                 <option>This Year</option>
//               </select>
//             </div>
//           </CardHeader>
//           <CardContent>
//             <div className="space-y-4">
//               <div className="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
//                 <span className="text-sm text-gray-600">Total Earning</span>
//                 <span className="font-bold text-lg">$456</span>
//               </div>
//               <div className="flex justify-between items-center p-3 bg-blue-50 rounded-lg">
//                 <span className="text-sm text-gray-600">Already Withdraw</span>
//                 <span className="font-bold text-lg text-blue-600">$345</span>
//               </div>
//               <div className="flex justify-between items-center p-3 bg-orange-50 rounded-lg">
//                 <span className="text-sm text-gray-600">Pending Withdraw</span>
//                 <span className="font-bold text-lg text-orange-600">$76</span>
//               </div>
//               <div className="flex justify-between items-center p-3 bg-red-50 rounded-lg">
//                 <span className="text-sm text-gray-600">Rejected Withdraw</span>
//                 <span className="font-bold text-lg text-red-600">$76</span>
//               </div>
//             </div>
//           </CardContent>
//         </Card>
//       </div>

//       {/* Products and Brands */}
//       <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
//         <Card className="shadow-lg">
//           <CardHeader className="flex flex-row items-center justify-between pb-3">
//             <CardTitle className="text-lg font-semibold">
//               Top Selling Products
//             </CardTitle>
//             <Button className="bg-purple-600 hover:bg-purple-700 text-white">
//               <Plus className="w-4 h-4 mr-2" />
//               All Order
//             </Button>
//           </CardHeader>
//           <CardContent>
//             <div className="overflow-x-auto">
//               <table className="w-full">
//                 <thead>
//                   <tr className="border-b border-gray-200">
//                     <th className="text-left text-sm font-medium text-gray-600 pb-3">
//                       Products
//                     </th>
//                     <th className="text-left text-sm font-medium text-gray-600 pb-3">
//                       Total Order
//                     </th>
//                     <th className="text-left text-sm font-medium text-gray-600 pb-3">
//                       Status
//                     </th>
//                     <th className="text-left text-sm font-medium text-gray-600 pb-3">
//                       Price
//                     </th>
//                   </tr>
//                 </thead>
//                 <tbody>
//                   {topProducts.map((product, index) => (
//                     <tr
//                       key={index}
//                       className="border-b border-gray-100 hover:bg-gray-50"
//                     >
//                       <td className="py-3">
//                         <div className="flex items-center space-x-3">
//                           <div className="w-10 h-10 bg-gray-100 rounded-lg flex items-center justify-center text-lg">
//                             {product.image}
//                           </div>
//                           <span className="font-medium text-sm">
//                             {product.name}
//                           </span>
//                         </div>
//                       </td>
//                       <td className="py-3 text-sm text-gray-600">
//                         {product.orders}
//                       </td>
//                       <td className="py-3">
//                         <Badge
//                           className={`${product.statusColor} text-xs font-medium`}
//                         >
//                           {product.status}
//                         </Badge>
//                       </td>
//                       <td className="py-3 text-sm font-semibold">
//                         {product.price}
//                       </td>
//                     </tr>
//                   ))}
//                 </tbody>
//               </table>
//             </div>
//           </CardContent>
//         </Card>

//         <Card className="shadow-lg">
//           <CardHeader className="pb-3">
//             <CardTitle className="text-lg font-semibold">Top Brands</CardTitle>
//           </CardHeader>
//           <CardContent>
//             <div className="overflow-x-auto">
//               <table className="w-full">
//                 <thead>
//                   <tr className="border-b border-gray-200">
//                     <th className="text-left text-sm font-medium text-gray-600 pb-3">
//                       Brands
//                     </th>
//                     <th className="text-left text-sm font-medium text-gray-600 pb-3">
//                       Order
//                     </th>
//                   </tr>
//                 </thead>
//                 <tbody>
//                   {topBrands.map((brand, index) => (
//                     <tr
//                       key={index}
//                       className="border-b border-gray-100 hover:bg-gray-50"
//                     >
//                       <td className="py-3">
//                         <div className="flex items-center space-x-3">
//                           <div className="w-10 h-10 bg-gray-100 rounded-lg flex items-center justify-center text-lg">
//                             {brand.logo}
//                           </div>
//                           <span className="font-medium text-sm">
//                             {brand.name}
//                           </span>
//                         </div>
//                       </td>
//                       <td className="py-3 text-sm font-semibold">
//                         {brand.orders}
//                       </td>
//                     </tr>
//                   ))}
//                 </tbody>
//               </table>
//             </div>
//           </CardContent>
//         </Card>
//       </div>

//       {/* Recent Orders and Revenue */}
//       <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
//         <div className="lg:col-span-2">
//           <Card className="shadow-lg">
//             <CardHeader className="pb-3">
//               <CardTitle className="text-lg font-semibold">
//                 Latest Orders
//               </CardTitle>
//             </CardHeader>
//             <CardContent>
//               <div className="overflow-x-auto">
//                 <table className="w-full">
//                   <thead>
//                     <tr className="border-b border-gray-200">
//                       <th className="text-left text-sm font-medium text-gray-600 pb-3">
//                         Products
//                       </th>
//                       <th className="text-left text-sm font-medium text-gray-600 pb-3">
//                         Order ID
//                       </th>
//                       <th className="text-left text-sm font-medium text-gray-600 pb-3">
//                         Date
//                       </th>
//                       <th className="text-left text-sm font-medium text-gray-600 pb-3">
//                         Status
//                       </th>
//                       <th className="text-left text-sm font-medium text-gray-600 pb-3">
//                         Amount
//                       </th>
//                     </tr>
//                   </thead>
//                   <tbody>
//                     {recentOrders.map((order, index) => (
//                       <tr
//                         key={index}
//                         className="border-b border-gray-100 hover:bg-gray-50"
//                       >
//                         <td className="py-3 text-sm font-medium">
//                           {order.product}
//                         </td>
//                         <td className="py-3 text-sm text-gray-600">
//                           {order.id}
//                         </td>
//                         <td className="py-3 text-sm text-gray-600">
//                           {order.date}
//                         </td>
//                         <td className="py-3">
//                           <Badge
//                             className={`${order.statusColor} text-xs font-medium`}
//                           >
//                             {order.status}
//                           </Badge>
//                         </td>
//                         <td className="py-3 text-sm font-semibold">
//                           {order.amount}
//                         </td>
//                       </tr>
//                     ))}
//                   </tbody>
//                 </table>
//               </div>
//             </CardContent>
//           </Card>
//         </div>

//         <Card className="shadow-lg">
//           <CardHeader className="pb-3">
//             <div className="flex items-center justify-between">
//               <CardTitle className="text-lg font-semibold">
//                 Revenue by Region
//               </CardTitle>
//               <Button variant="ghost" size="sm" className="!bg-purple-300">
//                 <MoreHorizontal className="w-4 h-4 " />
//               </Button>
//             </div>
//           </CardHeader>
//           <CardContent>
//             <div className="space-y-4">
//               {/* Responsive Map Container */}
//               <div className="w-full aspect-video bg-gray-100 rounded-lg overflow-hidden">
//                 <MapCard />
//               </div>

//               {/* Region Data */}
//               <div className="space-y-3">
//                 {revenueByRegion.map((region, index) => (
//                   <div
//                     key={index}
//                     className="flex items-center justify-between"
//                   >
//                     <div className="flex items-center space-x-3">
//                       <div
//                         className={`w-3 h-3 rounded-full ${region.color}`}
//                       ></div>
//                       <span className="text-sm font-medium">
//                         {region.region}
//                       </span>
//                     </div>
//                     <span className="text-sm font-bold">
//                       {region.percentage}%
//                     </span>
//                   </div>
//                 ))}
//               </div>
//             </div>
//           </CardContent>
//         </Card>
//       </div>
//     </div>
//   );
// };

// export default DashboardStats;
import React from 'react';

const DashboardStats = () => {
  return (
    <div>
      
    </div>
  );
};

export default DashboardStats;