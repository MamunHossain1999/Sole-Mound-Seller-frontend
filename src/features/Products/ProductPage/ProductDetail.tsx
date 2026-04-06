/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unused-vars */
import React, { useState, type JSX } from "react";
import { Star, Truck, Shield, Users } from "lucide-react";
import { useParams } from "react-router-dom";
import { toast } from "react-toastify";
import { useGetProductByIdQuery } from "@/redux/api/productApi";
import {
  useCreateReviewMutation,
  useDeleteReviewMutation,
  useGetReviewsQuery,
} from "@/redux/api/reviewApi";

// RTK Query Hooks

interface Review {
  _id?: string;
  user: { name: string };
  rating: number;
  comment?: string;
  createdAt: string;
}

interface Product {
  _id: string;
  name: string;
  price: number;
  originalPrice?: number;
  discount?: number;
  rating?: number;
  reviewCount?: number;
  colors?: string[];
  sizes?: string[];
  inStock?: boolean;
  freeDelivery?: boolean;
  couponCode?: string;
  description?: string;
  images?: string[]; // ← string[] (URL only)
  variants?: Array<{ option: string; values?: string[] }>;
}

const ProductDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>();

  // RTK Query
  const { data: productData, isLoading: productLoading } =
    useGetProductByIdQuery(id || "");
  const { data: reviewsData } = useGetReviewsQuery(productData?._id || "", {
    skip: !productData?._id, // ✅ Only fetch when we have real product ID
  });
  
  const [createReview] = useCreateReviewMutation();
  const [deleteReview] = useDeleteReviewMutation();

  // Local States
  const [selectedColor, setSelectedColor] = useState<string>("black");
  const [selectedSize, setSelectedSize] = useState<string>("M");
  const [selectedImageIndex, setSelectedImageIndex] = useState<number>(0);

  // Review Form State
  const [reviewRating, setReviewRating] = useState<number>(0);
  const [reviewComment, setReviewComment] = useState<string>("");

  // Product with fallback
  const product: Product = productData || {
    _id: id || "",
    name: "Product Not Found",
    price: 0,
    images: [],
  };

  // Ensure images is always an array
  const productImages = product.images || [];

  const reviews: Review[] = reviewsData?.data || [];

  const colorMap: Record<string, string> = {
    black: "#000000",
    orange: "#ff8c00",
    gray: "#808080",
    green: "#228b22",
  };

  const handleColorChange = (color: string) => setSelectedColor(color);
  const handleSizeChange = (size: string) => setSelectedSize(size);

  const renderStars = (rating: number): JSX.Element[] => {
    return Array.from({ length: 5 }, (_, i) => (
      <Star
        key={i}
        className={`w-4 h-4 ${i < Math.floor(rating) ? "fill-yellow-400 text-yellow-400" : "text-gray-300"}`}
      />
    ));
  };

  const averageRating = reviews.length
    ? reviews.reduce((sum, r) => sum + r.rating, 0) / reviews.length
    : 0;

  // Submit Review
  const handleSubmitReview = async () => {
    if (!id) return;
    try {
      await createReview({
        productId: id,
        data: { rating: reviewRating, comment: reviewComment.trim() },
      }).unwrap();

      setReviewComment("");
      toast.success("Thank you! Your review has been submitted.");
    } catch (error) {
      toast.error("Failed to submit review. Please try again.");
    }
  };

  // Delete Review
  const handleDeleteReview = async (reviewId: string) => {
    if (!window.confirm("Are you sure you want to delete this review?")) return;

    try {
      await deleteReview(reviewId).unwrap();
      toast.success("Review deleted successfully");
    } catch (error) {
      toast.error("Failed to delete review");
    }
  };

  if (productLoading) {
    return (
      <div className="text-center py-20 text-lg">
        Loading product details...
      </div>
    );
  }

  return (
    <div className="mx-auto bg-pink-50 pb-12 min-h-screen">
      <div className="bg-white rounded-lg shadow-lg overflow-hidden">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 p-6">
         <div className="w-full">
  {/* Main Image */}
  <div className="w-full h-[400px] rounded-lg overflow-hidden border flex items-center justify-center">
    {productImages?.length > 0 ? (
      <img
        src={productImages[selectedImageIndex]}
        alt="Main"
        className="max-w-full max-h-full object-contain"
      />
    ) : (
      <p>No Images</p>
    )}
  </div>

  {/* Thumbnails */}
  {productImages?.length > 1 && (
    <div className="flex gap-3 mt-3 overflow-x-auto pb-1">
      {productImages.map((img: string, index: number) => (
        <div
          key={index}
          onClick={() => setSelectedImageIndex(index)}
          className={`min-w-[64px] w-16 h-16 flex-shrink-0 border-2 rounded-md overflow-hidden cursor-pointer transition-colors ${
            selectedImageIndex === index
              ? "border-purple-600"
              : "border-gray-200 hover:border-gray-400"
          }`}
        >
          <img
            src={img}
            alt={`thumb-${index}`}
            className="w-full h-full object-cover block"
          />
        </div>
      ))}
    </div>
  )}
</div>

          {/* ====================== PRODUCT INFO SECTION ====================== */}
          <div className="space-y-6">
            <div className="inline-flex items-center px-3 py-1 bg-green-100 text-green-800 text-sm rounded-full">
              In Stock
            </div>

            <div>
              <h1 className="text-2xl font-bold text-gray-900 mb-2">
                {product.name}
              </h1>

              <div className="flex items-center space-x-2 mb-4">
                <div className="flex">{renderStars(averageRating)}</div>

                <span className="text-sm text-gray-600">
                  {averageRating.toFixed(1)}
                </span>

                <span className="text-sm text-gray-400">
                  ({reviews.length} Reviews)
                </span>
              </div>
            </div>

            {/* Price */}
            <div className="flex items-baseline gap-3">
              <span className="text-3xl font-bold text-gray-900">
                ${product.price.toFixed(2)}
              </span>
              {product.originalPrice && (
                <span className="text-lg text-gray-500 line-through">
                  ${product.originalPrice.toFixed(2)}
                </span>
              )}
              {product.discount && (
                <span className="text-sm bg-red-100 text-red-600 px-2 py-1 rounded">
                  {product.discount}% OFF
                </span>
              )}
            </div>

            {/* Color Selection */}
            {product?.variants?.some(
              (v: any) => v.option?.toLowerCase() === "color",
            ) && (
              <div>
                <h3 className="text-sm font-medium text-gray-700 mb-3">
                  Colour:{" "}
                  <span className="capitalize font-semibold">
                    {selectedColor}
                  </span>
                </h3>

                <div className="flex gap-3">
                  {product.variants
                    ?.find((v: any) => v.option?.toLowerCase() === "color")
                    ?.values?.map((color: string) => (
                      <button
                        key={color}
                        onClick={() => handleColorChange(color)}
                        className={`w-9 h-9 rounded-full border-2 transition-all ${
                          selectedColor === color
                            ? "border-gray-900 ring-2 ring-offset-2 ring-gray-300"
                            : "border-gray-300 hover:border-gray-400"
                        }`}
                        style={{ backgroundColor: colorMap[color] || color }}
                      />
                    ))}
                </div>
              </div>
            )}

            {/* Size Selection */}
            {product?.variants?.some(
              (v: any) => v.option?.toLowerCase() === "size",
            ) && (
              <div>
                <h3 className="text-sm font-medium text-gray-700 mb-3">
                  Size: <span className="font-semibold">{selectedSize}</span>
                </h3>

                <div className="flex flex-wrap gap-2">
                  {product.variants
                    ?.find((v: any) => v.option?.toLowerCase() === "size")
                    ?.values?.map((size: string) => (
                      <button
                        key={size}
                        onClick={() => handleSizeChange(size)}
                        className={`px-5 py-2.5 border rounded-xl text-sm font-medium transition-all ${
                          selectedSize === size
                            ? "bg-purple-100 border-purple-600 text-purple-700"
                            : "border-gray-300 hover:bg-gray-50"
                        }`}
                      >
                        {size}
                      </button>
                    ))}
                </div>
              </div>
            )}

            {/* Features */}
            <div className="space-y-3 pt-4 border-t text-sm text-gray-600">
              <div className="flex items-center gap-2">
                <span className="text-green-600">✓</span> In Stock
              </div>
              <div className="flex items-center gap-2">
                <span className="text-green-600">✓</span> Free delivery
                available
              </div>
              {product.couponCode && (
                <div className="flex items-center gap-2">
                  <span className="text-green-600">✓</span>
                  Sales 10% Off Use Code:{" "}
                  <span className="font-semibold">{product.couponCode}</span>
                </div>
              )}
            </div>

            {/* Description */}
            <div>
              <h3 className="text-sm font-medium text-gray-700 mb-2">
                Description:
              </h3>
              <p className="text-sm text-gray-600 leading-relaxed">
                {product.description || "No description available."}
              </p>
            </div>
          </div>
        </div>

        {/* Service Features */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 p-6 bg-gray-50 border-t">
          <div className="flex items-center space-x-3 p-4 bg-purple-50 rounded-lg">
            <Truck className="w-8 h-8 text-purple-600" />
            <div>
              <h4 className="font-medium text-gray-900">
                Free shipping for all orders over $200
              </h4>
              <p className="text-sm text-gray-600">Only in this week</p>
            </div>
          </div>
          <div className="flex items-center space-x-3 p-4 bg-purple-50 rounded-lg">
            <Shield className="w-8 h-8 text-purple-600" />
            <div>
              <h4 className="font-medium text-gray-900">
                Special discounts for customers
              </h4>
              <p className="text-sm text-gray-600">Coupons up to $ 100</p>
            </div>
          </div>
          <div className="flex items-center space-x-3 p-4 bg-purple-50 rounded-lg">
            <Users className="w-8 h-8 text-purple-600" />
            <div>
              <h4 className="font-medium text-gray-900">
                Expert Customer Service
              </h4>
              <p className="text-sm text-gray-600">8:00 - 20:00, 7 days/week</p>
            </div>
          </div>
        </div>

        {/* Reviews Section */}
        <div className="p-6 border-t">
          <h3 className="text-lg font-semibold text-gray-900 mb-6">
            Customer Reviews
          </h3>

          <div className="space-y-8">
            {reviews?.length > 0 ? (
              reviews?.map((review) => (
                <div key={review._id} className="border-b pb-6 last:border-b-0">
                  <div className="flex items-start justify-between">
                    <div className="flex items-start gap-4">
                      <div className="w-10 h-10 bg-gray-300 rounded-full overflow-hidden">
                        <div className="w-full h-full bg-gradient-to-br from-blue-400 to-purple-500" />
                      </div>
                      <div>
                        <p className="font-medium">{review.user.name}</p>
                        <div className="flex mt-1">
                          {renderStars(review.rating)}
                        </div>
                      </div>
                    </div>

                    <button
                      onClick={() => handleDeleteReview(review._id || "")}
                      className="text-red-600 text-sm border cursor-pointer rounded-sm px-2 py-1 border-red-600 hover:bg-red-600 hover:text-white"
                    >
                      Delete
                    </button>
                  </div>

                  {review.comment && (
                    <p className="mt-3 text-gray-700">{review.comment}</p>
                  )}

                  <p className="text-xs text-gray-500 mt-4">
                    {new Date(review.createdAt).toLocaleDateString()}
                  </p>
                </div>
              ))
            ) : (
              <p className="text-gray-500 italic">
                No reviews yet. Be the first to review this product!
              </p>
            )}
          </div>

          {/* Add Review Form */}
          <div className="mt-12 border p-6 rounded-xl bg-gray-50">
            <h4 className="font-semibold mb-4">Write a Review</h4>

            <div className="flex gap-1 mb-4">
              {[1, 2, 3, 4, 5].map((star) => (
                <button
                  key={star}
                  type="button"
                  onClick={() => setReviewRating(star)}
                  className={`text-4xl transition-colors ${star <= reviewRating ? "text-yellow-400" : "text-gray-300"}`}
                >
                  ★
                </button>
              ))}
            </div>

            <textarea
              value={reviewComment}
              onChange={(e) => setReviewComment(e.target.value)}
              placeholder="What did you think about this product?"
              className="w-full border border-gray-300 rounded-lg p-4 text-sm min-h-[110px]"
            />

            <button
              onClick={handleSubmitReview}
              className="mt-4 bg-purple-600 hover:bg-purple-700 text-white px-8 py-3 rounded-lg font-medium"
            >
              Submit Review
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetail;
