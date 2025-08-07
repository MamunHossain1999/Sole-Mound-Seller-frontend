import React, { useState } from 'react';
import { Search, Filter, ChevronDown } from 'lucide-react';

interface Transaction {
  id: string;
  invoiceId: string;
  product: {
    name: string;
    variant?: string;
    image: string;
  };
  status: 'Activated' | 'Approved' | 'Delivered';
  total: number;
  date: string;
}

const CustomarDetailsPage: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  
  const transactions: Transaction[] = [
    {
      id: '1',
      invoiceId: '#V46532',
      product: {
        name: 'Handmade Pouch',
        variant: '8 other products',
        image: '/api/placeholder/40/40'
      },
      status: 'Activated',
      total: 590.0,
      date: '29 Dec 2022'
    },
    {
      id: '2',
      invoiceId: '#V46532',
      product: {
        name: 'Smartwatch E2',
        variant: '8 other products',
        image: '/api/placeholder/40/40'
      },
      status: 'Activated',
      total: 508.0,
      date: '24 Dec 2022'
    },
    {
      id: '3',
      invoiceId: '#V46532',
      product: {
        name: 'Smartwatch E2',
        variant: '11 other products',
        image: '/api/placeholder/40/40'
      },
      status: 'Activated',
      total: 544.0,
      date: '21 Oct 2022'
    },
    {
      id: '4',
      invoiceId: '#V46532',
      product: {
        name: 'Headphone G1 Pro',
        variant: '8 other products',
        image: '/api/placeholder/40/40'
      },
      status: 'Delivered',
      total: 593.0,
      date: '12 Dec 2022'
    },
    {
      id: '5',
      invoiceId: '#V46523',
      product: {
        name: 'Smartwatch E1',
        image: '/api/placeholder/40/40'
      },
      status: 'Approved',
      total: 826.0,
      date: '21 Oct 2022'
    },
    {
      id: '6',
      invoiceId: '#V46534',
      product: {
        name: 'Smartwatch E2',
        variant: '8 other products',
        image: '/api/placeholder/40/40'
      },
      status: 'Approved',
      total: 543.0,
      date: '21 Oct 2022'
    },
    {
      id: '7',
      invoiceId: '#V46532',
      product: {
        name: 'Smartwatch E2',
        variant: '8 other products',
        image: '/api/placeholder/40/40'
      },
      status: 'Approved',
      total: 543.0,
      date: '21 Oct 2022'
    }
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Activated':
        return 'bg-emerald-100 text-emerald-700';
      case 'Approved':
        return 'bg-green-100 text-green-700';
      case 'Delivered':
        return 'bg-blue-100 text-blue-700';
      default:
        return 'bg-gray-100 text-gray-700';
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
       {/* Header */}
        <div className="flex items-center justify-between mb-8 ">
          <div>
            <h1 className="text-lg md:text-2xl font-bold text-[#333843]">
              Order Details
            </h1>
            <div className="flex items-center mt-1">
              <span className="text-[#A8537B] text-sm font-normal">
                Dashboard
              </span>
              <span className="mx-2 ">
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
              <span className="text-[#A8537B] text-sm font-normal">
                Order List
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
              <span className="text-[#919191] text-sm font-normal">
                Order Details
              </span>
            </div>
          </div>
          
        </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <div className="bg-white rounded-lg p-6 shadow-sm">
            <div className="flex items-center">
              <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center">
                <div className="w-6 h-6 bg-purple-500 rounded"></div>
              </div>
              <div className="ml-4">
                <p className="text-sm text-gray-600">Total Balance</p>
                <p className="text-2xl font-semibold text-gray-900">$723.00</p>
              </div>
            </div>
          </div>
          
          <div className="bg-white rounded-lg p-6 shadow-sm">
            <div className="flex items-center">
              <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center">
                <div className="w-6 h-6 bg-purple-500 rounded"></div>
              </div>
              <div className="ml-4">
                <p className="text-sm text-gray-600">Total Orders</p>
                <p className="text-2xl font-semibold text-gray-900">1.29</p>
              </div>
            </div>
          </div>
          
          <div className="bg-white rounded-lg p-6 shadow-sm">
            <div className="flex items-center">
              <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center">
                <div className="w-6 h-6 bg-purple-500 rounded"></div>
              </div>
              <div className="ml-4">
                <p className="text-sm text-gray-600">Rewards Point</p>
                <p className="text-2xl font-semibold text-gray-900">1400</p>
              </div>
            </div>
          </div>
        </div>

        {/* Customer Profile Card */}
        <div className="bg-white rounded-lg p-6 shadow-sm mb-8">
          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <div className="w-16 h-16 bg-gray-300 rounded-full flex items-center justify-center overflow-hidden">
                <img 
                  src="/api/placeholder/64/64" 
                  alt="Profile" 
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="ml-4">
                <div className="flex items-center">
                  <h2 className="text-lg font-semibold text-gray-900">Michael A. Miner</h2>
                  <span className="ml-2 w-2 h-2 bg-green-500 rounded-full"></span>
                </div>
                <p className="text-sm text-gray-600">michael@mindminer.synapi.com</p>
                <p className="text-sm text-gray-600">Phone: +10 (5) 741 01 91 27</p>
              </div>
            </div>
            <div className="flex space-x-3">
              <button className="px-4 py-2 bg-purple-500 text-white rounded-lg text-sm hover:bg-purple-600 transition-colors">
                Send Message
              </button>
              <button className="px-4 py-2 border border-gray-300 text-gray-700 rounded-lg text-sm hover:bg-gray-50 transition-colors">
                Delete Customer
              </button>
            </div>
          </div>
        </div>

        {/* Customer Details and Transaction History */}
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Customer Details Sidebar */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-lg p-6 shadow-sm">
              <div className="flex items-center justify-between mb-4">
                <h3 className="font-semibold text-gray-900">Customer Details</h3>
                <span className="px-2 py-1 bg-green-100 text-green-700 text-xs rounded-full">Active User</span>
              </div>
              
              <div className="space-y-4 text-sm">
                <div>
                  <p className="text-gray-600">Account ID</p>
                  <p className="font-medium text-blue-600">#AC-276809</p>
                </div>
                
                <div>
                  <p className="text-gray-600">Wallet Balance</p>
                  <p className="font-medium text-blue-600">michealameierminersyay.com</p>
                </div>
                
                <div>
                  <p className="text-gray-600">Delivery Address</p>
                  <p className="font-medium">62, rue des Nations Unies 2306</p>
                </div>
                
                <div>
                  <p className="text-gray-600">Language</p>
                  <p className="font-medium">English</p>
                </div>
                
                <div>
                  <p className="text-gray-600">Latest Invoice id</p>
                  <p className="font-medium text-blue-600">#INV2540</p>
                </div>
              </div>
            </div>
          </div>

          {/* Transaction History */}
          <div className="lg:col-span-3">
            <div className="bg-white rounded-lg shadow-sm">
              <div className="p-6 border-b border-gray-200">
                <div className="flex items-center justify-between">
                  <h3 className="font-semibold text-gray-900">Transaction History</h3>
                  <div className="flex items-center space-x-3">
                    <div className="relative">
                      <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                      <input
                        type="text"
                        placeholder="Search product"
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                      />
                    </div>
                    <button className="flex items-center px-4 py-2 border border-gray-300 rounded-lg text-sm text-gray-700 hover:bg-gray-50 transition-colors">
                      <Filter className="w-4 h-4 mr-2" />
                      Filter
                    </button>
                  </div>
                </div>
              </div>

              {/* Table */}
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead className="bg-gray-50">
                    <tr>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        <div className="flex items-center">
                          Invoice ID
                          <ChevronDown className="ml-1 w-4 h-4" />
                        </div>
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Product
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        <div className="flex items-center">
                          Status
                          <ChevronDown className="ml-1 w-4 h-4" />
                        </div>
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Total
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        <div className="flex items-center">
                          Date
                          <ChevronDown className="ml-1 w-4 h-4" />
                        </div>
                      </th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {transactions.map((transaction) => (
                      <tr key={transaction.id} className="hover:bg-gray-50">
                        <td className="px-6 py-4 whitespace-nowrap">
                          <span className="text-blue-600 font-medium">{transaction.invoiceId}</span>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="flex items-center">
                            <div className="w-10 h-10 bg-gray-200 rounded-lg mr-3 overflow-hidden">
                              <img 
                                src={transaction.product.image} 
                                alt={transaction.product.name}
                                className="w-full h-full object-cover"
                              />
                            </div>
                            <div>
                              <p className="text-sm font-medium text-gray-900">{transaction.product.name}</p>
                              {transaction.product.variant && (
                                <p className="text-xs text-gray-500">{transaction.product.variant}</p>
                              )}
                            </div>
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <span className={`px-2 py-1 text-xs rounded-full ${getStatusColor(transaction.status)}`}>
                            {transaction.status}
                          </span>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                          ${transaction.total.toFixed(1)}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                          {transaction.date}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CustomarDetailsPage;