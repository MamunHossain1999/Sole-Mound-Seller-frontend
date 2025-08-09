import React, { useState } from 'react';
import { Search, Filter, ChevronDown, Edit, Trash2, Eye, ChevronLeft, ChevronRight } from 'lucide-react';

interface Product {
  id: string;
  name: string;
  variants: number;
  status: 'Low Stock' | 'Published' | 'Draft' | 'Out of Stock';
  category: string;
  sku: string;
  stock: number;
  price: number;
  added: string;
  image: string;
}

type StatusType = 'Low Stock' | 'Published' | 'Draft' | 'Out of Stock';

const ProductsListPage: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedProducts, setSelectedProducts] = useState<string[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(10);

  const products: Product[] = [
    {
      id: '1',
      name: 'Handmade Pouch',
      variants: 3,
      status: 'Low Stock',
      category: 'Bag & Pouch',
      sku: '302011',
      stock: 10,
      price: 121.00,
      added: '29 Dec 2022',
      image: '/api/placeholder/40/40'
    },
    {
      id: '2',
      name: 'Smartwatch E2',
      variants: 2,
      status: 'Published',
      category: 'Watch',
      sku: '302011',
      stock: 204,
      price: 590.00,
      added: '24 Dec 2022',
      image: '/api/placeholder/40/40'
    },
    {
      id: '3',
      name: 'Smartwatch E1',
      variants: 3,
      status: 'Draft',
      category: 'Watch',
      sku: '302002',
      stock: 48,
      price: 125.00,
      added: '12 Dec 2022',
      image: '/api/placeholder/40/40'
    },
    {
      id: '4',
      name: 'Headphone G1 Pro',
      variants: 1,
      status: 'Published',
      category: 'Audio',
      sku: '301901',
      stock: 401,
      price: 348.00,
      added: '21 Oct 2022',
      image: '/api/placeholder/40/40'
    },
    {
      id: '5',
      name: 'Iphone X',
      variants: 4,
      status: 'Published',
      category: 'Smartphone',
      sku: '301900',
      stock: 120,
      price: 607.00,
      added: '21 Oct 2022',
      image: '/api/placeholder/40/40'
    },
    {
      id: '6',
      name: 'Puma Shoes',
      variants: 3,
      status: 'Published',
      category: 'Shoes',
      sku: '301881',
      stock: 432,
      price: 234.00,
      added: '21 Oct 2022',
      image: '/api/placeholder/40/40'
    },
    {
      id: '7',
      name: 'Imac 2021',
      variants: 1,
      status: 'Out of Stock',
      category: 'PC Desktop',
      sku: '301643',
      stock: 0,
      price: 760.00,
      added: '19 Sep 2022',
      image: '/api/placeholder/40/40'
    },
    {
      id: '8',
      name: 'Nike Shoes',
      variants: 3,
      status: 'Out of Stock',
      category: 'Shoes',
      sku: '301600',
      stock: 347,
      price: 400.00,
      added: '19 Sep 2022',
      image: '/api/placeholder/40/40'
    },
    {
      id: '9',
      name: 'Lego Car',
      variants: 2,
      status: 'Draft',
      category: 'Toys',
      sku: '301555',
      stock: 299,
      price: 812.00,
      added: '19 Sep 2022',
      image: '/api/placeholder/40/40'
    },
    {
      id: '10',
      name: 'Skincare Alia 1',
      variants: 3,
      status: 'Low Stock',
      category: 'Beauty',
      sku: '301002',
      stock: 38,
      price: 123.00,
      added: '10 Aug 2022',
      image: '/api/placeholder/40/40'
    }
  ];

  const getStatusColor = (status: StatusType): string => {
    switch (status) {
      case 'Published':
        return 'bg-green-100 text-green-700';
      case 'Draft':
        return 'bg-purple-100 text-purple-700';
      case 'Low Stock':
        return 'bg-red-100 text-red-700';
      case 'Out of Stock':
        return 'bg-red-100 text-red-700';
      default:
        return 'bg-gray-100 text-gray-700';
    }
  };

  const handleSelectProduct = (productId: string) => {
    setSelectedProducts(prev =>
      prev.includes(productId)
        ? prev.filter(id => id !== productId)
        : [...prev, productId]
    );
  };

  const handleSelectAll = () => {
    if (selectedProducts.length === products.length) {
      setSelectedProducts([]);
    } else {
      setSelectedProducts(products.map(p => p.id));
    }
  };

  const totalPages = Math.ceil(products.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = Math.min(startIndex + itemsPerPage, products.length);

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-lg md:text-2xl font-bold text-[#505050]">
              Category
            </h1>
            <div className="flex items-center text-sm text-gray-500 mt-1">
              <span className="text-[#A8537B] text-base font-medium">
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
              <span className="text-[#919191] text-base font-medium">
                Category List
              </span>
            </div>
          </div>
        </div>

      <div className=" mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Search and Filter */}
        <div className="flex items-center justify-between mb-6">
          <div className="relative max-w-md">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
            <input
              type="text"
              placeholder="Search product"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10 pr-4 py-2 w-full border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
            />
          </div>
          
          <button className="flex items-center px-4 py-2 border border-gray-300 rounded-lg text-sm text-gray-700 hover:bg-gray-50 transition-colors">
            <Filter className="w-4 h-4 mr-2" />
            Filter
          </button>
        </div>

        {/* Products Table */}
        <div className="bg-white rounded-lg shadow-sm overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left">
                    <input
                      type="checkbox"
                      checked={selectedProducts.length === products.length}
                      onChange={handleSelectAll}
                      className="w-4 h-4 text-purple-600 border-gray-300 rounded focus:ring-purple-500"
                    />
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    <div className="flex items-center">
                      Product
                      <ChevronDown className="ml-1 w-4 h-4" />
                    </div>
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    <div className="flex items-center">
                      Status
                      <ChevronDown className="ml-1 w-4 h-4" />
                    </div>
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Category
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    SKU
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    <div className="flex items-center">
                      Stock
                      <ChevronDown className="ml-1 w-4 h-4" />
                    </div>
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    <div className="flex items-center">
                      Price
                      <ChevronDown className="ml-1 w-4 h-4" />
                    </div>
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    <div className="flex items-center">
                      Added
                      <ChevronDown className="ml-1 w-4 h-4" />
                    </div>
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Action
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {products.slice(startIndex, endIndex).map((product) => (
                  <tr key={product.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4">
                      <input
                        type="checkbox"
                        checked={selectedProducts.includes(product.id)}
                        onChange={() => handleSelectProduct(product.id)}
                        className="w-4 h-4 text-purple-600 border-gray-300 rounded focus:ring-purple-500"
                      />
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center">
                        <div className="w-10 h-10 bg-gray-200 rounded-lg mr-3 overflow-hidden">
                          <img 
                            src={product.image} 
                            alt={product.name}
                            className="w-full h-full object-cover"
                          />
                        </div>
                        <div>
                          <p className="text-sm font-medium text-gray-900">{product.name}</p>
                          <p className="text-xs text-gray-500">{product.variants} Variants</p>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={`px-2 py-1 text-xs rounded-full ${getStatusColor(product.status)}`}>
                        {product.status}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      {product.category}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-red-600 font-medium">
                      {product.sku}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      {product.stock}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                      ${product.price.toFixed(2)}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {product.added}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center space-x-2">
                        <button className="text-gray-400 hover:text-purple-600 transition-colors">
                          <Edit className="w-4 h-4" />
                        </button>
                        <button className="text-gray-400 hover:text-red-600 transition-colors">
                          <Trash2 className="w-4 h-4" />
                        </button>
                        <button className="text-gray-400 hover:text-blue-600 transition-colors">
                          <Eye className="w-4 h-4" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Pagination */}
          <div className="bg-white px-6 py-3 border-t border-gray-200">
            <div className="flex items-center justify-between">
              <div className="text-sm text-gray-700">
                {startIndex + 1} – {endIndex} of {products.length} Pages
              </div>
              
              <div className="flex items-center space-x-4">
                <div className="flex items-center space-x-2">
                  <span className="text-sm text-gray-700">The page on</span>
                  <select
                    value={itemsPerPage}
                    onChange={(e) => setItemsPerPage(Number(e.target.value))}
                    className="border border-gray-300 rounded px-2 py-1 text-sm focus:outline-none focus:ring-2 focus:ring-purple-500"
                  >
                    <option value={5}>5</option>
                    <option value={10}>10</option>
                    <option value={20}>20</option>
                    <option value={50}>50</option>
                  </select>
                </div>
                
                <div className="flex items-center space-x-1">
                  <button
                    onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
                    disabled={currentPage === 1}
                    className="p-2 text-gray-400 hover:text-gray-600 disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    <ChevronLeft className="w-4 h-4" />
                  </button>
                  
                  <button
                    onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
                    disabled={currentPage === totalPages}
                    className="p-2 text-gray-400 hover:text-gray-600 disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    <ChevronRight className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductsListPage;