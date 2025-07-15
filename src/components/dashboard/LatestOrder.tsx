const recentOrders = [
  {
    id: "#11232",
    product: "iPhone 13 Pro",
    date: "Jun 29 2022",
    status: "Delivered",
    amount: "$400.00",
  },
  {
    id: "#11232",
    product: "MacBook Pro",
    date: "Jun 29 2022",
    status: "Pending",
    amount: "$280.00",
  },
  {
    id: "#11232",
    product: "MacBook Pro",
    date: "Jun 29 2022",
    status: "Pending",
    amount: "$280.00",
  },
  {
    id: "#11232",
    product: "Microsoft Book",
    date: "Jun 29 2022",
    status: "Delivered",
    amount: "$150.00",
  },
  {
    id: "#11232",
    product: "Apple Pen",
    date: "Jun 29 2022",
    status: "Delivered",
    amount: "$60.00",
  },
  {
    id: "#11232",
    product: "AirPods",
    date: "Jun 29 2022",
    status: "Delivered",
    amount: "$80.00",
  },
  {
    id: "#11232",
    product: "Apple Pen",
    date: "Jun 29 2022",
    status: "Delivered",
    amount: "$60.00",
  },
  
];

const LatestOrder = () => {
  return (
    <div className="lg:col-span-2">
      <div className="bg-white rounded-[12px] shadow-lg">
        <div className="border-b px-4 py-4">
          <h2 className="text-base lg:text-[20px] font-bold text-[#1F1F1F]">
            Latest Orders
          </h2>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className=" bg-[#FDF1F7]">
                <th className="text-left text-base lg:text-[20px] font-bold text-[#A8537B] px-4 py-3">
                  Products
                </th>
                <th className="text-left text-base font-bold text-[#8B909A] px-4 py-3 lg:text-[20px]">
                  Order ID
                </th>
                <th className="text-left text-base font-bold text-[#8B909A] px-6 py-3 lg:text-[20px]">
                  Date
                </th>
                <th className="text-left text-base font-bold text-[#8B909A] px-6 py-3 lg:text-[20px]">
                  Status
                </th>
                <th className="text-left text-base font-bold text-[#8B909A] pl-6 py-3 lg:text-[20px]">
                  Amount
                </th>
              </tr>
            </thead>
            <tbody>
              {recentOrders?.map((order, index) => (
                <tr
                  key={index}
                  className=""
                >
                  <td className="px-4 py-3 text-sm font-medium text-[#1F1F1F]">
                    {order.product}
                  </td>
                  <td className="px-6 py-3 text-base font-normal text-[#1F1F1F]">{order.id}</td>
                  <td className="px-6 py-3 text-base font-normal text-[#1F1F1F]">{order.date}</td>
                  <td className="px-6 py-3">
                    <span
                      className={`inline-flex items-center gap-2 text-sm font-normal ${
                        order.status === "Delivered"
                          ? "text-[#1F1F1F]"
                          : "text-[#1F1F1F]"
                      }`}
                    >
                      <span
                        className={`w-2 h-2 rounded-full ${
                          order.status === "Delivered"
                            ? "bg-[#22C55E]"
                            : "bg-[#FFC61C]"
                        }`}
                      ></span>
                      {order.status}
                    </span>
                  </td>
                  <td className="px-6 py-3 text-base font-normal text-[#1F1F1F]">
                    {order.amount}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default LatestOrder;
