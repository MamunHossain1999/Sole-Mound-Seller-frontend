const topProducts = [
  {
    name: "Apple iPhone 13",
    orders: 506,
    status: "Stock",
    price: "$999.29",
  },
  {
    name: "Nike Air Jordan",
    orders: 506,
    status: "Stock",
    price: "$72.40",
  },
  {
    name: "Beats Studio 2",
    orders: 506,
    status: "Stock",
    price: "$99.90",
  },
  {
    name: "Apple Watch Series 7",
    orders: 506,
    status: "Out",
    price: "$249.99",
  },
  {
    name: "Amazon Echo Dot",
    orders: 506,
    status: "Stock",
    price: "$79.40",
  },
];

const topBrands = [
  {
    name: "Levis",
    orders: 506,
    logo: "https://i.ibb.co/sJygm0r0/1ebaf291c1cd3e69e2465cd2981b4f0303f635a9.png",
  },
  {
    name: "Nike Air Jordan",
    orders: 456,
    logo: "https://i.ibb.co/60DG5wwQ/7e4b970e1a3efc2de9066282910c715943948b02.png",
  },
  {
    name: "Vans",
    orders: 405,
    logo: "https://i.ibb.co/79nJY97/5edea6c599a489ac7df41a0f286d434cca666edb.png",
  },
  {
    name: "Apple Watch Series 7",
    orders: 398,
    logo: "https://i.ibb.co/fJYTsb7/54727d2f25e44d1495bf730f9b234ced5348d619.png",
  },
  {
    name: "Amazon Echo Dot",
    orders: 346,
    logo: "https://i.ibb.co/pv1YK8zW/e1132c18dbf95e14f3fec7e6f4de509917755d57.png",
  },
];

const TopSellingAndBrands = () => {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-5 gap-6">
      {/* Top Selling Products - 3 columns */}
      <div className="lg:col-span-3 bg-[#FDF1F7] rounded-xl shadow-sm">
        <h2 className="text-lg font-bold text-[#1F1F1F] bg-white px-4 py-5 rounded-t-xl">
          Top Selling Products
        </h2>
        <div className="overflow-x-auto">
          <table className="w-full min-w-[600px]">
            <thead className="bg-[#FDF1F7]">
              <tr>
                <th className="text-left px-4 py-3 text-[#A8537B] font-bold text-base lg:text-[20px]">
                  Products
                </th>
                <th className="text-left px-4 py-3 text-[#8B909A] font-bold text-base lg:text-[20px]">
                  Total Order
                </th>
                <th className="text-left px-4 py-3 text-[#8B909A] font-bold text-base lg:text-[20px]">
                  Status
                </th>
                <th className="text-left px-4 py-3 text-[#8B909A] font-bold text-base lg:text-[20px]">
                  Price
                </th>
              </tr>
            </thead>
            <tbody>
              {topProducts.map((product, index) => (
                <tr key={index} className="bg-white hover:bg-gray-50">
                  <td className="px-4 py-3 text-[#1F1F1F] font-medium">
                    {product.name}
                  </td>
                  <td className="px-4 py-3 text-[#23272E]">{product.orders}</td>
                  <td className="px-4 py-3">
                    <span
                      className={`inline-flex items-center gap-2 text-sm font-medium ${
                        product.status === "Stock"
                          ? "text-[#22C55E]"
                          : "text-[#FF1C1C]"
                      }`}
                    >
                      <span
                        className={`w-2 h-2 rounded-full ${
                          product.status === "Stock"
                            ? "bg-[#22C55E]"
                            : "bg-[#FF1C1C]"
                        }`}
                      ></span>
                      {product.status}
                    </span>
                  </td>
                  <td className="px-4 py-3 text-[#23272E]">{product.price}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Top Brands - 2 columns */}
      <div className="lg:col-span-2 bg-[#FDF1F7] rounded-xl shadow-sm">
        <h2 className="text-lg font-bold text-[#1F1F1F] bg-white px-4 py-5 rounded-t-xl">
          Top Brands
        </h2>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-[#FDF1F7]">
              <tr>
                <th className="text-left px-4 py-3 text-[#A8537B] font-bold text-base lg:text-[20px]">
                  Brands
                </th>
                <th className="text-left px-4 py-3 text-[#8B909A] font-bold text-base lg:text-[20px]">
                  Order
                </th>
              </tr>
            </thead>
            <tbody>
              {topBrands.map((brand, index) => (
                <tr key={index} className="bg-white">
                  <td className="px-4 py-3">
                    <div className="flex items-center gap-4">
                      <img
                        src={brand.logo}
                        alt={brand.name}
                        className="w-6 h-6 object-cover"
                      />
                      <span className="text-base font-normal text-[#1F1F1F]">
                        {brand.name}
                      </span>
                    </div>
                  </td>
                  <td className="px-4 py-3 text-base font-normal text-[#23272E]">
                    {brand.orders}
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

export default TopSellingAndBrands;
