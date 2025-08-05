import React, { useState } from "react";
import { ChevronDown } from "lucide-react";

interface Transaction {
  id: string;
  amount: string;
  method: string;
  status: "Completed" | "Pending" | "Processing";
  date: string;
  comment?: string;
}

const transactions: Transaction[] = [
  {
    id: "15674",
    amount: "$6,934",
    method: "Bank Account",
    status: "Completed",
    date: "29 Dec 2022",
  },
  {
    id: "24567",
    amount: "$1,885",
    method: "Visa",
    status: "Pending",
    date: "24 Dec 2022",
  },
  {
    id: "34567",
    amount: "$8,519",
    method: "Bank Account",
    status: "Completed",
    date: "12 Dec 2022",
  },
  {
    id: "41234",
    amount: "$948",
    method: "PayPal",
    status: "Processing",
    date: "21 Oct 2022",
  },
];
const EarningsDashboard: React.FC = () => {
  const [transaction] = useState<Transaction[]>(transactions);

  const [selectedItems, setSelectedItems] = useState<string[]>([]);

  // checkbox btn
  const handleSelectAll = (checked: boolean) => {
    if (checked) {
      setSelectedItems(transaction.map((cat) => cat.id));
    } else {
      setSelectedItems([]);
    }
  };

  const handleSelectItem = (id: string, checked: boolean) => {
    if (checked) {
      setSelectedItems([...selectedItems, id]);
    } else {
      setSelectedItems(selectedItems.filter((itemId) => itemId !== id));
    }
  };

  const isAllSelected = selectedItems.length === transactions.length;
  const isIndeterminate =
    selectedItems.length > 0 && selectedItems.length < transactions.length;

  const getStatusColor = (status: string) => {
    switch (status) {
      case "Completed":
        return "bg-green-100 text-green-700";
      case "Pending":
        return "bg-yellow-100 text-yellow-700";
      case "Processing":
        return "bg-blue-100 text-blue-700";
      default:
        return "bg-gray-100 text-gray-700";
    }
  };

  return (
    <div className="min-h-screen p-">
      <div className="mx-auto">
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
              <span className="text-[#919191] text-sm font-normal">
                Earnings
              </span>
            </div>
          </div>
        </div>

        {/* Balance Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          <div className="bg-white rounded-lg p-6 shadow-sm">
            <div className="flex items-center justify-between mb-3">
              <div className="w-10 h-10 flex items-center justify-center bg-[#FDF1F7] rounded-lg">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="20"
                  height="18"
                  viewBox="0 0 20 18"
                  fill="none"
                >
                  <path
                    d="M14.5137 0C17.9599 0 19.9961 1.97865 19.9961 5.33789V5.375H15.7617C13.7911 5.3785 12.195 6.9351 12.1914 8.85645C12.1887 10.7822 13.7866 12.346 15.7617 12.3486H20V12.6543C20 16.0135 17.9637 17.9999 14.5176 18H5.4834C2.03638 17.9999 0 16.0135 0 12.6543V5.33789C0 1.9787 2.03638 6.02137e-05 5.4834 0H14.5137ZM4.73926 3.875C4.31996 3.87689 3.97951 4.20849 3.97754 4.61816C3.97576 5.02974 4.31717 5.3653 4.73926 5.36719H10.3906C10.8127 5.36524 11.1541 5.02959 11.1523 4.61719C11.1503 4.20573 10.8049 3.87327 10.3828 3.875H4.73926Z"
                    fill="#C8A8E9"
                  />
                  <path
                    opacity="0.4"
                    d="M14.0374 9.29706C14.2465 10.2482 15.0805 10.9175 16.0326 10.9001H19.2825C19.6787 10.9001 20 10.572 20 10.1664V7.63488C19.9991 7.23022 19.6787 6.90126 19.2825 6.90039H15.9561C14.8731 6.90387 13.9983 7.80284 14 8.91067C14 9.04033 14.0128 9.17 14.0374 9.29706Z"
                    fill="#C8A8E9"
                  />
                  <circle cx="16" cy="8.90039" r="1" fill="#C8A8E9" />
                </svg>
              </div>
            </div>
            <div>
              <p className="text-base font-semibold text-[#505050] mb-1">
                Total Balance
              </p>
              <p className="text-xl font-bold text-[#1F1F1F]">$723.00</p>
            </div>
          </div>

          <div className="bg-white rounded-lg p-6 shadow-sm ">
            <div className="flex items-center justify-between mb-3">
              <div className="w-10 h-10 flex items-center justify-center bg-[#FDF1F7] rounded-lg">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                >
                  <path
                    d="M20.9788 12.2392H17.59C17.2509 12.2392 16.9151 12.306 16.6017 12.4358C16.2884 12.5656 16.0038 12.7558 15.764 12.9956C15.5242 13.2354 15.3339 13.5201 15.2042 13.8334C15.0744 14.1467 15.0076 14.4825 15.0076 14.8216C15.0076 15.1607 15.0744 15.4965 15.2042 15.8099C15.3339 16.1232 15.5242 16.4079 15.764 16.6476C16.0038 16.8874 16.2884 17.0777 16.6017 17.2074C16.9151 17.3372 17.2509 17.404 17.59 17.404H20.9788C21.163 17.3823 21.3317 17.2903 21.4497 17.1472C21.5678 17.0041 21.626 16.821 21.6124 16.636V13.0144C21.628 12.8283 21.5706 12.6433 21.4524 12.4987C21.3342 12.354 21.1643 12.261 20.9788 12.2392ZM17.5852 15.8392C17.3871 15.8392 17.1936 15.7805 17.0289 15.6704C16.8643 15.5603 16.736 15.4039 16.6603 15.2209C16.5847 15.0378 16.565 14.8365 16.6038 14.6423C16.6426 14.4481 16.7382 14.2698 16.8784 14.1299C17.0186 13.99 17.1971 13.8949 17.3914 13.8566C17.5857 13.8182 17.787 13.8384 17.9698 13.9145C18.1527 13.9906 18.3088 14.1193 18.4185 14.2842C18.5282 14.449 18.5865 14.6428 18.586 14.8408C18.5854 15.1058 18.4796 15.3598 18.292 15.5469C18.1044 15.7341 17.8502 15.8392 17.5852 15.8392ZM6.58599 8.19522C6.46952 9.06699 6.52751 9.95322 6.7566 10.8024C6.98568 11.6515 7.38127 12.4467 7.92039 13.1416L7.94919 13.18C7.98546 13.227 8.032 13.265 8.08525 13.2913C8.1385 13.3175 8.19704 13.3311 8.25639 13.3312C8.29633 13.3307 8.33597 13.3242 8.37399 13.312C8.44897 13.2872 8.51462 13.2402 8.56221 13.1772C8.6098 13.1141 8.63707 13.0381 8.64039 12.9592C8.67085 12.0901 8.89296 11.2383 9.29084 10.465C9.68872 9.69164 10.2525 9.01574 10.942 8.48562L13.4068 6.58482L14.6932 8.26482C14.7371 8.32255 14.7963 8.36676 14.8642 8.3924C14.932 8.41804 15.0057 8.42407 15.0768 8.4098C15.1479 8.39553 15.2136 8.36153 15.2663 8.3117C15.319 8.26187 15.3566 8.19822 15.3748 8.12802L15.7084 6.87282H19.3852C19.7578 6.87282 20.1151 7.02066 20.3788 7.28389C20.6425 7.54713 20.791 7.90423 20.7916 8.27682V11.4712H17.59C16.6989 11.4712 15.8442 11.8252 15.2141 12.4553C14.584 13.0855 14.23 13.9401 14.23 14.8312C14.23 15.7223 14.584 16.577 15.2141 17.2071C15.8442 17.8372 16.6989 18.1912 17.59 18.1912H20.7916V21.3928C20.791 21.7656 20.6426 22.123 20.379 22.3866C20.1153 22.6502 19.758 22.7986 19.3852 22.7992H3.78519C3.41614 22.7929 3.0643 22.6421 2.80534 22.3791C2.54637 22.116 2.40097 21.7619 2.40039 21.3928V8.26242C2.40103 7.88983 2.54948 7.53273 2.81316 7.26949C3.07685 7.00626 3.43421 6.85842 3.80679 6.85842H6.89799C6.74844 7.29214 6.64389 7.7401 6.58599 8.19522ZM7.83159 6.60642C8.22797 5.72452 8.83546 4.95382 9.60039 4.36242L11.2276 3.11922C11.3088 3.05632 11.3622 2.96416 11.3764 2.86242C11.3828 2.81194 11.3791 2.7607 11.3655 2.71167C11.3519 2.66264 11.3287 2.6168 11.2972 2.57682L10.2508 1.21362L16.414 1.19922L14.8348 7.15602L13.7908 5.80242C13.7597 5.76186 13.721 5.72786 13.6767 5.70238C13.6324 5.6769 13.5836 5.66045 13.5329 5.65397C13.4822 5.6475 13.4308 5.65114 13.3816 5.66467C13.3323 5.6782 13.2862 5.70137 13.246 5.73282L10.474 7.86882C9.19873 8.85209 8.321 10.2624 8.00199 11.8408C7.57759 11.0442 7.34056 10.1612 7.30895 9.25911C7.27734 8.35702 7.45199 7.45961 7.81959 6.63522C7.82255 6.62522 7.82658 6.61556 7.83159 6.60642Z"
                    fill="#C8A8E9"
                  />
                </svg>
              </div>
            </div>
            <div>
              <p className="text-base font-semibold text-[#505050] mb-1">
                Withdrawal Balance
              </p>
              <p className="text-xl font-bold text-[#1F1F1F]">$129.00</p>
            </div>
          </div>

          <div className="bg-white rounded-lg p-6 shadow-sm">
            <div className="flex items-center justify-between mb-3">
              <div className="w-10 h-10 flex items-center justify-center bg-[#FDF1F7] rounded-lg">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                >
                  <g clip-path="url(#clip0_3155_39518)">
                    <path
                      fill-rule="evenodd"
                      clip-rule="evenodd"
                      d="M21.2417 6.93839H18.5935V4.17258H20.6106C20.9582 4.17258 21.2417 4.45608 21.2417 4.8037V6.93839ZM7.1902 6.93839H9.23414V4.17258H7.1902C6.42745 4.17258 5.80683 4.79297 5.80683 5.55548C5.80683 6.318 6.42745 6.93839 7.1902 6.93839ZM16.008 13.9354C16.008 12.3827 17.2758 11.115 18.8285 11.115H22.9999V8.31999C22.9999 7.97236 22.7164 7.68886 22.3688 7.68886H7.19025C7.15876 7.68885 7.12728 7.68799 7.09584 7.68628C6.40613 7.65609 5.80041 7.2968 5.43211 6.762V12.3104C5.49759 12.3083 5.56327 12.3068 5.62931 12.3068C6.62318 12.3064 7.60181 12.551 8.47861 13.019C8.63681 12.8553 8.84122 12.7438 9.0645 12.6994C9.67228 12.5779 10.2662 12.9735 10.388 13.5812L10.7218 15.2464C10.7593 15.4338 10.7485 15.6276 10.6903 15.8096C10.6322 15.9916 10.5286 16.1558 10.3894 16.2867C10.3077 16.3706 10.3701 16.4313 10.4319 16.4281C10.9965 16.3983 11.5056 16.798 11.5997 17.3688C11.6535 17.6958 11.6805 18.0265 11.6805 18.3578C11.6805 18.9933 11.5818 19.6061 11.3993 20.1819H22.3688C22.7164 20.1819 22.9999 19.8984 22.9999 19.5508V16.7558H18.8286C17.2759 16.7558 16.0081 15.488 16.0081 13.9353L16.008 13.9354ZM23.672 12.5073V15.3635C23.672 15.7173 23.3835 16.0059 23.0296 16.0059H18.8285C17.6897 16.0059 16.758 15.0742 16.758 13.9354C16.758 12.7967 17.6898 11.865 18.8285 11.865H23.0296C23.3835 11.865 23.672 12.1535 23.672 12.5073ZM19.7048 13.9355C19.7048 13.4615 19.3205 13.0772 18.8465 13.0772C18.3725 13.0772 17.9882 13.4615 17.9882 13.9355C17.9882 14.4095 18.3725 14.7938 18.8465 14.7938C19.3205 14.7938 19.7048 14.4095 19.7048 13.9355ZM5.62927 15.0151C7.47539 15.0151 8.97197 16.5117 8.97197 18.3578C8.97197 20.204 7.47539 21.7005 5.62927 21.7005C3.78314 21.7005 2.28656 20.204 2.28656 18.3578C2.28656 16.5117 3.78314 15.0151 5.62927 15.0151ZM5.62927 15.802C5.52981 15.802 5.43443 15.8415 5.3641 15.9119C5.29377 15.9822 5.25427 16.0776 5.25427 16.177V18.3578C5.25425 18.4297 5.2749 18.5001 5.31374 18.5606C5.35259 18.621 5.40799 18.6691 5.47336 18.699L7.09814 19.6371C7.18392 19.685 7.28516 19.6973 7.3799 19.6711C7.47463 19.6449 7.55523 19.5824 7.6042 19.4972C7.65317 19.412 7.66656 19.3109 7.64147 19.2159C7.61638 19.1208 7.55484 19.0395 7.47019 18.9896L6.00422 18.1432V16.177C6.00422 16.0776 5.96471 15.9822 5.89438 15.9119C5.82406 15.8415 5.72872 15.802 5.62927 15.802ZM10.4289 17.1818C10.3308 17.198 10.243 17.2524 10.185 17.3331C10.127 17.4139 10.1034 17.5144 10.1195 17.6126C10.16 17.859 10.1804 18.1082 10.1805 18.3579C10.1805 20.8673 8.13862 22.909 5.62931 22.909C3.12 22.909 1.07827 20.8673 1.07827 18.3579C1.07827 15.8486 3.11953 13.8069 5.62931 13.8069C6.64226 13.8063 7.62639 14.1441 8.42541 14.7668L8.0227 14.6614C7.97509 14.6489 7.92549 14.646 7.87674 14.6527C7.82798 14.6594 7.78102 14.6756 7.73854 14.7005C7.69606 14.7253 7.65889 14.7583 7.62915 14.7975C7.59942 14.8367 7.57771 14.8814 7.56525 14.929C7.51237 15.1292 7.63238 15.3343 7.83239 15.3867L9.52312 15.8303C9.5847 15.8464 9.64935 15.8466 9.71101 15.8309C9.77267 15.8151 9.82933 15.784 9.87567 15.7404C9.92202 15.6968 9.9565 15.6421 9.97587 15.5815C9.99524 15.5209 9.99886 15.4563 9.98639 15.3939L9.65259 13.7288C9.61214 13.5258 9.41438 13.3943 9.21145 13.4349C9.00848 13.4754 8.87695 13.6732 8.91764 13.8761L8.99447 14.2619C8.04644 13.482 6.85681 13.056 5.62927 13.0568C2.70614 13.0568 0.328125 15.435 0.328125 18.3579C0.328125 21.2808 2.70614 23.6588 5.62927 23.6588C8.55239 23.6588 10.9304 21.2808 10.9304 18.3579C10.9304 18.0673 10.9065 17.7756 10.8597 17.491C10.8258 17.2865 10.6328 17.1479 10.4289 17.1818V17.1818ZM17.8435 6.93844H9.98414V0.712547C9.98414 0.507563 10.1519 0.339844 10.3568 0.339844H17.4709C17.6759 0.339844 17.8436 0.507563 17.8436 0.712547V6.93839L17.8435 6.93844ZM14.8357 3.54891C14.5554 3.38438 14.2635 3.31477 13.9812 3.24741C13.8865 3.22481 13.797 3.20358 13.7079 3.17892C13.4444 3.10547 13.302 3.02569 13.2313 2.91202C13.1468 2.77711 13.2248 2.66297 13.2786 2.60691C13.4221 2.45705 13.7647 2.38088 14.0933 2.42564C14.3548 2.46136 14.562 2.56645 14.6341 2.7C14.7323 2.88239 14.9601 2.95041 15.1422 2.8523C15.1856 2.82893 15.2239 2.79726 15.255 2.75908C15.2861 2.7209 15.3094 2.67697 15.3235 2.62979C15.3376 2.58262 15.3423 2.53312 15.3373 2.48413C15.3323 2.43513 15.3177 2.38761 15.2943 2.34427C15.1171 2.01497 14.7537 1.78242 14.2886 1.69744V1.37789C14.2886 1.17066 14.121 1.00294 13.9139 1.00294C13.7069 1.00294 13.5387 1.17066 13.5387 1.37789V1.69495C13.214 1.7535 12.9269 1.88977 12.7371 2.08753C12.404 2.43469 12.3482 2.91445 12.5952 3.30928C12.8216 3.67181 13.2013 3.816 13.5064 3.90117C13.609 3.92986 13.7098 3.95386 13.8072 3.97711C14.047 4.03406 14.2728 4.08788 14.4561 4.19564C14.6778 4.32581 14.6638 4.43789 14.6558 4.50502C14.6427 4.61438 14.57 4.71202 14.4617 4.76583C14.0431 4.974 13.2926 4.84538 13.1235 4.53642C13.0241 4.35473 12.7963 4.28827 12.6143 4.38769C12.433 4.48711 12.3659 4.71492 12.4656 4.89666C12.6667 5.26458 13.0835 5.49127 13.5386 5.57691V5.90034C13.5386 6.10734 13.7065 6.27525 13.9138 6.27525C14.1211 6.27525 14.2885 6.10734 14.2885 5.90034V5.59163C14.4714 5.56383 14.6445 5.5125 14.7954 5.43727C15.1301 5.27072 15.3562 4.95609 15.4 4.59563C15.4524 4.16531 15.2524 3.79331 14.8357 3.54877L14.8357 3.54891Z"
                      fill="#C8A8E9"
                    />
                  </g>
                  <defs>
                    <clipPath id="clip0_3155_39518">
                      <rect width="24" height="24" fill="white" />
                    </clipPath>
                  </defs>
                </svg>
              </div>
            </div>
            <div>
              <p className="text-base font-semibold text-[#505050] mb-1">
                Due Balance
              </p>
              <p className="text-xl font-bold text-[#1F1F1F]">$14.00</p>
            </div>
          </div>

          <div className="bg-white rounded-lg p-6 shadow-sm">
            <div className="flex items-center justify-between mb-3">
              <div className="w-10 h-10 flex items-center justify-center bg-[#FDF1F7] rounded-lg">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="20"
                  height="18"
                  viewBox="0 0 20 18"
                  fill="none"
                >
                  <path
                    opacity="0.4"
                    d="M4.70555 9.89062C4.18944 9.89062 3.77163 10.3146 3.77163 10.8384L3.51416 15.4172C3.51416 16.0847 4.04783 16.6251 4.70555 16.6251C5.36328 16.6251 5.89577 16.0847 5.89577 15.4172L5.63947 10.8384C5.63947 10.3146 5.22167 9.89062 4.70555 9.89062Z"
                    fill="#C8A8E9"
                  />
                  <path
                    d="M5.98037 0.673447C5.98037 0.673447 5.71236 0.397892 5.54618 0.277931C5.30509 0.0926435 5.00783 0 4.71173 0C4.37936 0 4.07039 0.104521 3.81877 0.301685C3.77313 0.348007 3.57886 0.522605 3.41852 0.685325C2.41204 1.6367 0.765393 4.12026 0.262153 5.42083C0.182571 5.618 0.0105329 6.11685 0 6.38409C0 6.63827 0.0561757 6.88294 0.170868 7.11455C0.331202 7.40436 0.582823 7.63715 0.880085 7.76424C1.08606 7.84619 1.70282 7.97328 1.71453 7.97328C2.38981 8.10156 3.48757 8.17045 4.70003 8.17045C5.85514 8.17045 6.90727 8.10156 7.59308 7.99704C7.60478 7.98516 8.37017 7.85807 8.6335 7.71792C9.11333 7.46255 9.41177 6.96371 9.41177 6.43041V6.38409C9.40006 6.03608 9.10163 5.30444 9.09109 5.30444C8.58785 4.07394 7.02079 1.64858 5.98037 0.673447Z"
                    fill="#C8A8E9"
                  />
                  <path
                    opacity="0.4"
                    d="M15.2947 8.10962C15.8108 8.10962 16.2286 7.68559 16.2286 7.16178L16.4849 2.58296C16.4849 1.91543 15.9524 1.375 15.2947 1.375C14.6369 1.375 14.1033 1.91543 14.1033 2.58296L14.3607 7.16178C14.3607 7.68559 14.7785 8.10962 15.2947 8.10962Z"
                    fill="#C8A8E9"
                  />
                  <path
                    d="M19.829 10.885C19.6687 10.5952 19.4171 10.3636 19.1198 10.2353C18.9138 10.1534 18.2959 10.0263 18.2854 10.0263C17.6101 9.89799 16.5123 9.8291 15.2999 9.8291C14.1448 9.8291 13.0926 9.89799 12.4068 10.0025C12.3951 10.0144 11.6297 10.1427 11.3664 10.2816C10.8854 10.537 10.5881 11.0359 10.5881 11.5704V11.6167C10.5998 11.9647 10.8971 12.6952 10.9088 12.6952C11.412 13.9257 12.9779 16.3523 14.0195 17.3263C14.0195 17.3263 14.2875 17.6018 14.4537 17.7206C14.6936 17.9071 14.9909 17.9997 15.2893 17.9997C15.6205 17.9997 15.9283 17.8952 16.1811 17.698C16.2268 17.6517 16.421 17.4771 16.5814 17.3156C17.5867 16.363 19.2345 13.8794 19.7366 12.58C19.8173 12.3828 19.9894 11.8827 19.9999 11.6167C19.9999 11.3613 19.9437 11.1166 19.829 10.885Z"
                    fill="#C8A8E9"
                  />
                </svg>
              </div>
            </div>
            <div>
              <p className="text-base font-semibold text-[#505050] mb-1">
                Last Requested
              </p>
              <p className="text-xl font-bold text-[#1F1F1F]">$230.00</p>
            </div>
          </div>
        </div>

        {/* Details Section */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 mb-8">
          <div className="p-6 border-b border-[#E2E3E8]">
            <h2 className="text-lg md:text-xl font-bold text-[#313B5E]">
              Details
            </h2>
          </div>
          <div className="p-6">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10 items-center">
              <div className="space-y-4">
                <div className="flex justify-between items-start">
                  <span className="text-base font-semibold text-[#313B5E] text-left w-1/2">
                    Bank Name :
                  </span>
                  <span className="text-sm font-normal text-[#505050] text-left w-1/2">
                    National Bank
                  </span>
                </div>
                <div className="flex justify-between items-start">
                  <span className="text-base font-semibold text-[#313B5E] text-left w-1/2">
                    Account Number :
                  </span>
                  <span className="text-sm font-normal text-[#505050] text-left w-1/2">
                    4756498354
                  </span>
                </div>
                <div className="flex justify-between items-start">
                  <span className="text-base font-semibold text-[#313B5E] text-left w-1/2">
                    Swift Code :
                  </span>
                  <span className="text-sm font-normal text-[#505050] text-left w-1/2">
                    4576H
                  </span>
                </div>
              </div>

              <div className="space-y-4">
                <div className="flex justify-between items-start">
                  <span className="text-base font-semibold text-[#313B5E] text-left w-1/2">
                    Country :
                  </span>
                  <span className="text-sm font-normal text-[#505050] text-left w-1/2">
                    London
                  </span>
                </div>
                <div className="flex justify-between items-start">
                  <span className="text-base font-semibold text-[#313B5E] text-left w-1/2">
                    Account Name :
                  </span>
                  <span className="text-sm font-normal text-[#505050] text-left w-1/2">
                    Dhaleyan Roy
                  </span>
                </div>
                <div className="flex justify-between items-start">
                  <span className="text-base font-semibold text-[#313B5E] text-left w-1/2">
                    Email :
                  </span>
                  <span className="text-sm font-normal text-[#505050] text-left w-1/2">
                    denialui12@gmail.com
                  </span>
                </div>
              </div>

              <div className="flex justify-end items-end">
                <button className="px-6 py-2 bg-[#C8A8E9] flex gap-2 items-center cursor-pointer text-[#FFF] text-base font-semibold rounded-[4px] hover:bg-purple-300 transition-colors">
                  Withdrawals Request
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="21"
                    height="20"
                    viewBox="0 0 21 20"
                    fill="none"
                  >
                    <path
                      opacity="0.4"
                      d="M20.5 14.084V5.916C20.5 2.377 18.224 0 14.835 0H6.165C2.776 0 0.5 2.377 0.5 5.916V14.084C0.5 17.622 2.777 20 6.166 20H14.835C18.224 20 20.5 17.622 20.5 14.084Z"
                      fill="#F1DAFC"
                    />
                    <path
                      d="M14.7792 9.14405L11.0312 5.37906C10.7492 5.09606 10.2502 5.09606 9.96718 5.37906L6.21918 9.14405C5.92718 9.43806 5.92818 9.91305 6.22218 10.2051C6.51618 10.4971 6.99018 10.4971 7.28318 10.2031L9.75018 7.72605V14.0811C9.75018 14.4961 10.0862 14.8311 10.5002 14.8311C10.9142 14.8311 11.2502 14.4961 11.2502 14.0811V7.72605L13.7162 10.2031C13.8632 10.3501 14.0552 10.4231 14.2482 10.4231C14.4392 10.4231 14.6312 10.3501 14.7772 10.2051C15.0702 9.91305 15.0712 9.43806 14.7792 9.14405Z"
                      fill="#FDF1F7"
                    />
                  </svg>
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Withdrawal History */}
        <div className="bg-white">
          <div className="pb-7 bg-[#FDF1F7]">
            <h2 className="text-lg md:text-xl font-bold text-[#000000]">
              Withdrawal History
            </h2>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full not-last:bg-[#FDF1F7] mt-4">
              <thead className=" ">
                <tr>
                  <th className="px-6 py-3 flex gap-3 text-left text-base font-semibold text-[#505050] tracking-wider">
                    <div className="relative flex items-center justify-center w-5 h-5">
                      <input
                        type="checkbox"
                        checked={isAllSelected}
                        ref={(input) => {
                          if (input) input.indeterminate = isIndeterminate;
                        }}
                        onChange={(e) => handleSelectAll(e.target.checked)}
                        className="peer w-full h-full accent-[#C8A8E9] bg-white border border-gray-300 rounded appearance-none checked:bg-[#C8A8E9] checked:border-transparent"
                      />
                      <span className="pointer-events-none absolute inset-0 items-center justify-center text-white text-xs font-bold peer-checked:flex hidden">
                        ✓
                      </span>
                    </div>
                    <div className="flex text-[#1F1F1F] font-semibold text-base gap-6 items-center">
                      Transaction ID
                    </div>
                  </th>

                  <th className="px-6 py-3 text-left text-base font-semibold text-[#505050] tracking-wider">
                    Amount
                  </th>
                  <th className="px-6 py-3 text-left text-base font-semibold text-[#505050] tracking-wider">
                    Method
                  </th>
                  <th className="px-6 py-3 text-left text-base font-semibold text-[#505050] tracking-wider">
                    <div className="flex items-center">
                      Status
                      <ChevronDown className="w-4 h-4 ml-1" />
                    </div>
                  </th>
                  <th className="px-6 py-3 text-left text-base font-semibold text-[#505050] tracking-wider">
                    Date
                  </th>
                  <th className="px-6 py-3 text-left text-base font-semibold text-[#505050] tracking-wider">
                    <div className="flex items-center">
                      Comment
                      <ChevronDown className="w-4 h-4 ml-1" />
                    </div>
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {transactions.map((transaction) => (
                  <tr key={transaction.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4 whitespace-nowrap flex items-center">
                      <div className="relative flex items-center justify-center w-5 h-5">
                        <input
                          type="checkbox"
                          checked={selectedItems.includes(transaction.id)}
                          onChange={(e) =>
                            handleSelectItem(transaction.id, e.target.checked)
                          }
                          className="peer w-full h-full accent-[#C8A8E9] bg-white border border-gray-300 rounded appearance-none checked:bg-[#C8A8E9] checked:border-transparent"
                        />
                        <span className="pointer-events-none absolute inset-0 items-center justify-center text-white text-xs font-bold peer-checked:flex hidden">
                          ✓
                        </span>
                      </div>
                      <div className="px-3 py-4 whitespace-nowrap text-sm text-gray-900">
                        {transaction.id}
                      </div>
                    </td>

                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      {transaction.amount}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      {transaction.method}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span
                        className={`inline-flex px-2 py-1 text-xs font-medium rounded-full ${getStatusColor(
                          transaction.status
                        )}`}
                      >
                        {transaction.status}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      {transaction.date}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {transaction.comment || "-"}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EarningsDashboard;
