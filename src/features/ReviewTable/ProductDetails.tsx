import React from "react";
import { AiFillStar, AiOutlineStar } from "react-icons/ai";

interface Review {
  id: number;
  userName: string;
  userAvatar: string; // URL or local path
  rating: number; // 1 to 5
  title: string;
  date: string;
  location: string;
  description: string;
  helpfulCount: number;
}

interface Product {
  id: number;
  imageUrl: string;
  isNewArrival: boolean;
  name: string;
  rating: number;
  reviewCount: number;
  price: number;
  originalPrice?: number;
  discountPercent?: number;
  colorLabel: string;
  colorCode: string; // for color circle (hex or tailwind color class)
  sizeLabel: string;
  sizeCode: string;
  quantity: number;
  inStock: boolean;
  freeDelivery: boolean;
  discountCode?: string;
  description: string;
}

const productData: Product = {
  id: 1,
  imageUrl: "https://i.ibb.co/7RWzY7D/black-tshirt.png", // তুমি চাইলে এইটা তোমার ছবি url দিয়ে বদলাতে পারো
  isNewArrival: true,
  name: "Men Black Slim Fit T-shirt",
  rating: 4.5,
  reviewCount: 55,
  price: 80,
  originalPrice: 100,
  discountPercent: 30,
  colorLabel: "Dark",
  colorCode: "#7c3aed", // purple color (tailwind indigo-600)
  sizeLabel: "M",
  sizeCode: "M",
  quantity: 2,
  inStock: true,
  freeDelivery: true,
  discountCode: "CODE123",
  description:
    "Top in sweatshirt fabric made from a cotton blend with a soft brushed inside. Relaxed fit with dropped shoulders, long sleeves and ribbing around the neckline, cuffs and hem. Small metal text applique",
};

const reviewsData: Review[] = [
  {
    id: 1,
    userName: "Henny K. Mark",
    userAvatar:
      "https://randomuser.me/api/portraits/women/68.jpg",
    rating: 4.5,
    title: "Excellent Quality",
    date: "16 November 2023",
    location: "Canada",
    description:
      "Medium thickness. Did not shrink after wash. Good elasticity. XL size Perfectly fit for 5.10 height and heavy body. Did not fade after wash. Only for maroon colour t-shirt colour lightly.",
    helpfulCount: 10,
  },
  {
    id: 2,
    userName: "Henny K. Mark",
    userAvatar:
      "https://randomuser.me/api/portraits/men/75.jpg",
    rating: 4.5,
    title: "Excellent Quality",
    date: "16 November 2023",
    location: "Canada",
    description:
      "Medium thickness. Did not shrink after wash. Good elasticity. XL size Perfectly fit for 5.10 height and heavy body. Did not fade after wash.",
    helpfulCount: 4,
  },
];

const StarRating: React.FC<{ rating: number }> = ({ rating }) => {
  const fullStars = Math.floor(rating);
  const halfStar = rating % 1 >= 0.5;
  const emptyStars = 5 - fullStars - (halfStar ? 1 : 0);

  return (
    <div className="flex items-center text-yellow-400">
      {[...Array(fullStars)].map((_, i) => (
        <AiFillStar key={"full" + i} />
      ))}
      {halfStar && <AiFillStar style={{ clipPath: "inset(0 50% 0 0)" }} />}
      {[...Array(emptyStars)].map((_, i) => (
        <AiOutlineStar key={"empty" + i} />
      ))}
    </div>
  );
};

const ProductDetails: React.FC = () => {
  return (
    <div className=" mx-auto p-6 bg-white rounded-md shadow-sm">
      {/* Product info */}
      <div className="flex flex-col md:flex-row gap-8">
        <div className="bg-pink-50 p-6 rounded-md flex justify-center items-center max-w-xs">
          <img
            src={productData.imageUrl}
            alt={productData.name}
            className="object-contain max-h-60"
          />
        </div>
        <div className="flex-1">
          {productData.isNewArrival && (
            <span className="bg-green-500 text-white px-3 py-1 rounded-full text-xs font-semibold inline-block mb-2">
              New Arrival
            </span>
          )}
          <h2 className="text-lg font-semibold">{productData.name}</h2>
          <div className="flex items-center space-x-2 text-sm text-gray-700 mb-1">
            <StarRating rating={productData.rating} />
            <span className="text-gray-500">
              ({productData.reviewCount} Review{productData.reviewCount > 1 ? "s" : ""})
            </span>
          </div>
          <div className="text-xl font-bold mb-3">
            ${productData.price.toFixed(2)}{" "}
            {productData.originalPrice && (
              <span className="line-through text-gray-400 text-base font-normal ml-2">
                ${productData.originalPrice.toFixed(2)}
              </span>
            )}
            {productData.discountPercent && (
              <span className="text-red-500 text-sm ml-2">
                ({productData.discountPercent}% Off)
              </span>
            )}
          </div>
          <div className="mb-2">
            <span className="font-semibold">Colors &gt; </span>
            <span
              className="inline-block w-6 h-6 rounded-full border-2 border-gray-300"
              style={{ backgroundColor: productData.colorCode }}
              title={productData.colorLabel}
            />
          </div>
          <div className="mb-2">
            <span className="font-semibold">Size &gt; </span>
            <span className="inline-block px-3 py-1 rounded bg-purple-300 text-purple-700 font-semibold text-sm">
              {productData.sizeLabel}
            </span>
          </div>
          <div className="mb-2">
            <span className="font-semibold">Quantity : </span>
            {productData.quantity}
          </div>
          <ul className="text-sm text-gray-600 space-y-1">
            <li className="flex items-center gap-2">
              <span className="text-green-600 font-semibold">✓</span> In Stock
            </li>
            <li className="flex items-center gap-2">
              <span className="text-green-600 font-semibold">✓</span> Free delivery
              available
            </li>
            <li className="flex items-center gap-2">
              <span className="text-green-600 font-semibold">✓</span> Sales 10% Off Use
              Code: <span className="font-semibold">{productData.discountCode}</span>
            </li>
          </ul>
          <div className="mt-4 text-sm text-gray-600">
            <p>
              <span className="font-semibold">Description :</span> {productData.description}
            </p>
          </div>
        </div>
      </div>

      {/* Reviews section */}
      <div className="mt-10">
        <h3 className="text-xl font-semibold mb-4">Top Review From World</h3>
        {reviewsData.map((review) => (
          <div
            key={review.id}
            className="border-b border-gray-200 py-4 flex gap-4"
          >
            <img
              src={review.userAvatar}
              alt={review.userName}
              className="w-12 h-12 rounded-full object-cover"
            />
            <div className="flex-1">
              <div className="flex items-center justify-between">
                <div>
                  <h4 className="font-semibold">{review.userName}</h4>
                  <StarRating rating={review.rating} />
                  <p className="text-sm text-gray-500">
                    Reviewed in {review.location} on {review.date}
                  </p>
                </div>
              </div>
              <h5 className="mt-2 font-semibold">{review.title}</h5>
              <p className="text-sm mt-1">{review.description}</p>
              <div className="flex gap-4 mt-2 text-gray-500 text-sm">
                <button className="hover:underline">Helpful</button>
                <button className="hover:underline">Report</button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ProductDetails;
