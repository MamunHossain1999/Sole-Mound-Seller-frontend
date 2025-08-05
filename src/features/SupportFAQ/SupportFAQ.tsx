import React, { useState } from 'react';
import { ChevronDown, ChevronUp, Search, Mail, MessageCircle } from 'lucide-react';

interface FAQItem {
  id: number;
  question: string;
  answer: string;
}
const faqData: FAQItem[] = [
    {
      id: 1,
      question: "Can I use Dummy FAQs for my website or project?",
      answer: "Yes, you can use Dummy FAQs to populate your website or project during development or testing phases. They help simulate the appearance and functionality of a real FAQ section without requiring actual content."
    },
    {
      id: 2,
      question: "How do I request refund?",
      answer: "To request a refund, please contact our customer support team with your order details. Refunds are processed according to our refund policy and typically take 5-7 business days to appear in your account."
    },
    {
      id: 3,
      question: "How long does it take to process a refund?",
      answer: "Refund processing typically takes 5-7 business days once approved. The exact time may vary depending on your payment method and bank processing times."
    },
    {
      id: 4,
      question: "How do I contact customer support?",
      answer: "You can contact our customer support team through multiple channels: email us at support@company.com, use our live chat feature, or call our helpline during business hours."
    },
    {
      id: 5,
      question: "Is customer support available 24/7?",
      answer: "Our customer support is available Monday to Friday, 9 AM to 6 PM EST. For urgent issues outside these hours, you can email us and we'll respond as soon as possible."
    },
    {
      id: 6,
      question: "How can I differentiate between a Dummy Payment and a real one?",
      answer: "Dummy payments are clearly marked in test environments and use test payment credentials. Real payments will have actual transaction IDs and will appear in your billing statements."
    }
  ];

const SupportFAQ: React.FC = () => {
  const [expandedItems, setExpandedItems] = useState<Set<number>>(new Set([1]));
  const [searchQuery, setSearchQuery] = useState<string>('');

  const filteredFAQs = faqData.filter(faq => 
    faq.question.toLowerCase().includes(searchQuery.toLowerCase()) ||
    faq.answer.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const toggleExpand = (id: number): void => {
    const newExpandedItems = new Set(expandedItems);
    if (newExpandedItems.has(id)) {
      newExpandedItems.delete(id);
    } else {
      newExpandedItems.add(id);
    }
    setExpandedItems(newExpandedItems);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-50 to-purple-50">
      {/* Header */}
      <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-lg md:text-2xl font-bold text-[#505050]">
              Support
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
                Support
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
                Help Center
              </span>
            </div>
          </div>
        </div>

      {/* Main Content */}
      <div className="max-w-4xl mx-auto px-6 py-8">
        {/* FAQ Section */}
        <div className="bg-white rounded-2xl shadow-lg overflow-hidden">
          {/* FAQ Header */}
          <div className="bg-gradient-to-r from-amber-50 to-orange-50 px-8 py-12 text-center border-b">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              Frequently Asked Questions
            </h2>
            <p className="text-gray-600 mb-8 max-w-2xl mx-auto">
              We're here to help with any questions you have about plans, pricing, and supported features.
            </p>
            
            {/* Search Bar */}
            <div className="relative max-w-md mx-auto">
              <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                <Search className="h-5 w-5 text-gray-400" />
              </div>
              <input
                type="text"
                placeholder="Search for anything..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-12 pr-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-transparent outline-none transition-all duration-200"
              />
            </div>
          </div>

          {/* FAQ Items */}
          <div className="px-8 py-6">
            <div className="space-y-4">
              {filteredFAQs.map((faq) => (
                <div
                  key={faq.id}
                  className="border border-gray-200 rounded-xl overflow-hidden transition-all duration-200 hover:shadow-md"
                >
                  <button
                    onClick={() => toggleExpand(faq.id)}
                    className="w-full px-6 py-5 text-left flex items-center justify-between bg-white hover:bg-gray-50 transition-colors duration-200"
                  >
                    <span className="text-gray-900 font-medium text-lg">
                      {faq.question}
                    </span>
                    {expandedItems.has(faq.id) ? (
                      <ChevronUp className="h-5 w-5 text-gray-500 flex-shrink-0" />
                    ) : (
                      <ChevronDown className="h-5 w-5 text-gray-500 flex-shrink-0" />
                    )}
                  </button>
                  
                  {expandedItems.has(faq.id) && (
                    <div className="px-6 pb-5 bg-gray-50">
                      <div className="pt-2 text-gray-700 leading-relaxed">
                        {faq.answer}
                      </div>
                    </div>
                  )}
                </div>
              ))}
            </div>

            {filteredFAQs.length === 0 && (
              <div className="text-center py-12">
                <p className="text-gray-500 text-lg">No questions found matching your search.</p>
              </div>
            )}
          </div>

          {/* Contact Section */}
          <div className="bg-gray-50 px-8 py-8 text-center border-t">
            <h3 className="text-xl font-semibold text-gray-900 mb-6">
              Can't find a question?
            </h3>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button className="inline-flex items-center px-6 py-3 cursor-pointer bg-[#C8A8E9] text-white rounded-xl hover:bg-purple-300 transition-colors duration-200 font-medium">
                <Mail className="h-5 w-5 mr-2" />
                Email us your question
              </button>
              <button className="inline-flex items-center px-6 py-3 bg-[#C8A8E9] text-white rounded-xl hover:bg-purple-300 cursor-pointer transition-colors duration-200 font-medium">
                <MessageCircle className="h-5 w-5 mr-2" />
                Contact us
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SupportFAQ;