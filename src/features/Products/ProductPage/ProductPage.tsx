import React, { useState, type JSX } from 'react';
import { Star, Heart, Truck, Shield, Users } from 'lucide-react';

// TypeScript interfaces
interface Review {
  id: string;
  name: string;
  avatar: string;
  rating: number;
  title: string;
  content: string;
  date: string;
  location: string;
  helpful: number;
}

interface ProductImage {
  id: string;
  url: string;
  alt: string;
}

interface ProductDetails {
  dimensions: string;
  dateFirstAvailable: string;
  category: string;
  itemModelNumber: string;
  countryOfOrigin: string;
  productSize: string;
  importer: string;
  weight: string;
  height: string;
  length: string;
  genericName: string;
  sku: string;
  quantity: string;
}

interface Product {
  id: string;
  name: string;
  price: number;
  originalPrice: number;
  discount: number;
  rating: number;
  reviewCount: number;
  colors: string[];
  sizes: string[];
  inStock: boolean;
  freeDelivery: boolean;
  couponCode: string;
  description: string;
  images: ProductImage[];
  details: ProductDetails;
}

const ProductPage: React.FC = () => {
  // State management with proper typing
  const [selectedColor, setSelectedColor] = useState<string>('black');
  const [selectedSize, setSelectedSize] = useState<string>('M');
  const [quantity, setQuantity] = useState<number>(1);
  const [selectedImageIndex, setSelectedImageIndex] = useState<number>(0);

  // Product data with full typing
  const product: Product = {
    id: 'ts-001',
    name: 'Men Black Slim Fit T-shirt',
    price: 80.00,
    originalPrice: 120.00,
    discount: 33,
    rating: 4.5,
    reviewCount: 95,
    colors: ['black', 'orange', 'gray', 'green'],
    sizes: ['S', 'M', 'L', 'XL', 'XXL'],
    inStock: true,
    freeDelivery: true,
    couponCode: 'CODE123',
    description: 'This stylish t-shirt is made from a cotton blend with a soft brushed inside. Features fit with dropped shoulders, long sleeves and ribbing around the neckline, cuffs and hem. Small metal label on the front.',
    images: [
      { id: '1', url: '/api/placeholder/400/500', alt: 'Black T-shirt front' },
      { id: '2', url: '/api/placeholder/400/500', alt: 'Orange T-shirt' },
      { id: '3', url: '/api/placeholder/400/500', alt: 'Gray T-shirt' },
      { id: '4', url: '/api/placeholder/400/500', alt: 'Green T-shirt' }
    ],
    details: {
      dimensions: '52.3 x 40.6 x 6.4 cm; 500 Grams',
      dateFirstAvailable: '22 September 2023',
      category: 'Men',
      itemModelNumber: 'TS-174-Z',
      countryOfOrigin: 'U.S.A',
      productSize: 'S, M, L, XL',
      importer: 'Apt, 726 B9018 Hang Stream, Rowntowm, WV 84364',
      weight: '500 g',
      height: '500 g',
      length: '500 g',
      genericName: 'Tshirt',
      sku: 'T-Shirt',
      quantity: '1 Psc'
    }
  };

  const reviews: Review[] = [
    {
      id: '1',
      name: 'Henry K. Mark',
      avatar: '/api/placeholder/40/40',
      rating: 5,
      title: 'Excellent Quality',
      content: 'Medium on the longer side but well after drying. Good elasticity. XL not exactly loose style. Got into after drying but only for my taste. Only for manant colour t-shirt colour tightly',
      date: '16 November 2023',
      location: 'Canada',
      helpful: 12
    },
    {
      id: '2',
      name: 'Jorge Henry',
      avatar: '/api/placeholder/40/40',
      rating: 4,
      title: 'Good Quality',
      content: 'I liked the fabric, it\'s pure cotton & skin-friendly, but the size compare standard size.',
      date: '23 December 2023',
      location: 'U.S.A',
      helpful: 8
    }
  ];

  // Color mapping for visual representation
  const colorMap: Record<string, string> = {
    black: '#000000',
    orange: '#ff8c00',
    gray: '#808080',
    green: '#228b22'
  };

  // Event handlers with proper typing
  const handleColorChange = (color: string): void => {
    setSelectedColor(color);
  };

  const handleSizeChange = (size: string): void => {
    setSelectedSize(size);
  };

  const handleQuantityChange = (newQuantity: number): void => {
    if (newQuantity >= 1) {
      setQuantity(newQuantity);
    }
  };

  const handleImageSelect = (index: number): void => {
    setSelectedImageIndex(index);
  };

  // Render star rating component
  const renderStars = (rating: number): JSX.Element[] => {
    return Array.from({ length: 5 }, (_, i) => (
      <Star
        key={i}
        className={`w-4 h-4 ${i < Math.floor(rating) ? 'fill-yellow-400 text-yellow-400' : 'text-gray-300'}`}
      />
    ));
  };

  return (
    <div className="max-w-7xl mx-auto p-6 bg-pink-50 min-h-screen">
      <div className="bg-white rounded-lg shadow-lg overflow-hidden">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 p-6">
          {/* Image Section */}
          <div className="space-y-4">
            <div className="aspect-square bg-pink-100 rounded-lg overflow-hidden">
              <div className="w-full h-full bg-gray-900 flex items-center justify-center">
                <div className="text-white text-6xl font-light">DESIGN</div>
              </div>
            </div>
            
            {/* Thumbnail Images */}
            <div className="flex space-x-2">
              {product.images.map((image, index) => (
                <button
                  key={image.id}
                  onClick={() => handleImageSelect(index)}
                  className={`w-16 h-16 rounded-lg overflow-hidden border-2 ${
                    selectedImageIndex === index ? 'border-green-500' : 'border-gray-200'
                  }`}
                >
                  <div className={`w-full h-full ${
                    index === 0 ? 'bg-gray-900' : 
                    index === 1 ? 'bg-orange-400' :
                    index === 2 ? 'bg-gray-400' : 'bg-green-600'
                  }`}></div>
                </button>
              ))}
            </div>
          </div>

          {/* Product Details Section */}
          <div className="space-y-6">
            {/* Stock Status */}
            <div className="inline-flex items-center px-3 py-1 bg-green-100 text-green-800 text-sm rounded-full">
              In Stock
            </div>

            {/* Product Title & Rating */}
            <div>
              <h1 className="text-2xl font-bold text-gray-900 mb-2">{product.name}</h1>
              <div className="flex items-center space-x-2 mb-4">
                <div className="flex">{renderStars(product.rating)}</div>
                <span className="text-sm text-gray-600">{product.rating}</span>
                <span className="text-sm text-gray-400">({product.reviewCount} Reviews)</span>
              </div>
            </div>

            {/* Price */}
            <div className="space-y-2">
              <div className="flex items-baseline space-x-2">
                <span className="text-3xl font-bold text-gray-900">${product.price.toFixed(2)}</span>
                <span className="text-lg text-gray-500 line-through">${product.originalPrice.toFixed(2)}</span>
                <span className="text-sm bg-red-100 text-red-600 px-2 py-1 rounded">
                  {product.discount}% OFF
                </span>
              </div>
            </div>

            {/* Color Selection */}
            <div>
              <h3 className="text-sm font-medium text-gray-700 mb-3">Colour = {selectedColor}</h3>
              <div className="flex space-x-2">
                {product.colors.map((color) => (
                  <button
                    key={color}
                    onClick={() => handleColorChange(color)}
                    className={`w-8 h-8 rounded-full border-2 ${
                      selectedColor === color ? 'border-gray-800 ring-2 ring-gray-300' : 'border-gray-300'
                    }`}
                    style={{ backgroundColor: colorMap[color] }}
                  />
                ))}
              </div>
            </div>

            {/* Size Selection */}
            <div>
              <h3 className="text-sm font-medium text-gray-700 mb-3">Size = {selectedSize}</h3>
              <div className="flex flex-wrap gap-2">
                {product.sizes.map((size) => (
                  <button
                    key={size}
                    onClick={() => handleSizeChange(size)}
                    className={`px-3 py-2 border rounded-md text-sm font-medium ${
                      selectedSize === size
                        ? 'bg-purple-100 border-purple-300 text-purple-700'
                        : 'bg-white border-gray-300 text-gray-700 hover:bg-gray-50'
                    }`}
                  >
                    {size}
                  </button>
                ))}
              </div>
            </div>

            {/* Quantity */}
            <div>
              <h3 className="text-sm font-medium text-gray-700 mb-3">Quantity:</h3>
              <div className="flex items-center space-x-3">
                <button
                  onClick={() => handleQuantityChange(quantity - 1)}
                  className="w-8 h-8 border rounded-md flex items-center justify-center hover:bg-gray-50"
                  disabled={quantity <= 1}
                >
                  -
                </button>
                <span className="px-3 py-1 border rounded-md min-w-[50px] text-center">{quantity}</span>
                <button
                  onClick={() => handleQuantityChange(quantity + 1)}
                  className="w-8 h-8 border rounded-md flex items-center justify-center hover:bg-gray-50"
                >
                  +
                </button>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="space-y-3">
              <button className="w-full bg-green-600 text-white py-3 px-6 rounded-lg font-medium hover:bg-green-700 transition-colors">
                Add to Cart
              </button>
              <button className="w-full border border-gray-300 text-gray-700 py-3 px-6 rounded-lg font-medium hover:bg-gray-50 transition-colors flex items-center justify-center space-x-2">
                <Heart className="w-4 h-4" />
                <span>Add to Wishlist</span>
              </button>
            </div>

            {/* Features */}
            <div className="space-y-3 pt-4 border-t">
              <div className="flex items-center space-x-2 text-sm text-gray-600">
                <span className="text-green-600">✓</span>
                <span>In Stock</span>
              </div>
              <div className="flex items-center space-x-2 text-sm text-gray-600">
                <span className="text-green-600">✓</span>
                <span>Free delivery available</span>
              </div>
              <div className="flex items-center space-x-2 text-sm text-gray-600">
                <span className="text-green-600">✓</span>
                <span>Sales 10% Off Use Code: {product.couponCode}</span>
              </div>
            </div>

            {/* Description */}
            <div>
              <h3 className="text-sm font-medium text-gray-700 mb-2">Description:</h3>
              <p className="text-sm text-gray-600 leading-relaxed">{product.description}</p>
            </div>
          </div>
        </div>

        {/* Service Features */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 p-6 bg-gray-50 border-t">
          <div className="flex items-center space-x-3 p-4 bg-purple-50 rounded-lg">
            <Truck className="w-8 h-8 text-purple-600" />
            <div>
              <h4 className="font-medium text-gray-900">Free shipping for all orders over $200</h4>
              <p className="text-sm text-gray-600">Only in this week</p>
            </div>
          </div>
          <div className="flex items-center space-x-3 p-4 bg-purple-50 rounded-lg">
            <Shield className="w-8 h-8 text-purple-600" />
            <div>
              <h4 className="font-medium text-gray-900">Special discounts for customers</h4>
              <p className="text-sm text-gray-600">Coupons up to $ 100</p>
            </div>
          </div>
          <div className="flex items-center space-x-3 p-4 bg-purple-50 rounded-lg">
            <Users className="w-8 h-8 text-purple-600" />
            <div>
              <h4 className="font-medium text-gray-900">Expert Customer Service</h4>
              <p className="text-sm text-gray-600">8:00 - 20:00, 7 days/week</p>
            </div>
          </div>
        </div>

        {/* Product Details and Reviews */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 p-6 border-t">
          {/* Item Details */}
          <div>
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Items Detail</h3>
            <div className="space-y-3 text-sm">
              <div className="grid grid-cols-2 gap-2">
                <span className="text-gray-600">Product Dimensions:</span>
                <span className="text-gray-900">{product.details.dimensions}</span>
              </div>
              <div className="grid grid-cols-2 gap-2">
                <span className="text-gray-600">Date First Available:</span>
                <span className="text-gray-900">{product.details.dateFirstAvailable}</span>
              </div>
              <div className="grid grid-cols-2 gap-2">
                <span className="text-gray-600">Product Category:</span>
                <span className="text-gray-900">{product.details.category}</span>
              </div>
              <div className="grid grid-cols-2 gap-2">
                <span className="text-gray-600">Item model number:</span>
                <span className="text-gray-900">{product.details.itemModelNumber}</span>
              </div>
              <div className="grid grid-cols-2 gap-2">
                <span className="text-gray-600">Country of Origin:</span>
                <span className="text-gray-900">{product.details.countryOfOrigin}</span>
              </div>
              <div className="grid grid-cols-2 gap-2">
                <span className="text-gray-600">Product Size:</span>
                <span className="text-gray-900">{product.details.productSize}</span>
              </div>
              <div className="grid grid-cols-2 gap-2">
                <span className="text-gray-600">SKU:</span>
                <span className="text-gray-900">{product.details.sku}</span>
              </div>
            </div>
          </div>

          {/* Reviews */}
          <div>
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Top Reviews From World</h3>
            <div className="space-y-4">
              {reviews.map((review) => (
                <div key={review.id} className="border-b pb-4 last:border-b-0">
                  <div className="flex items-start space-x-3">
                    <div className="w-10 h-10 bg-gray-300 rounded-full overflow-hidden">
                      <div className="w-full h-full bg-gradient-to-br from-blue-400 to-purple-500"></div>
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center space-x-2 mb-1">
                        <span className="font-medium text-gray-900">{review.name}</span>
                      </div>
                      <div className="flex items-center space-x-2 mb-2">
                        <div className="flex">{renderStars(review.rating)}</div>
                        <span className="text-sm font-medium text-gray-900">{review.title}</span>
                      </div>
                      <p className="text-sm text-gray-600 mb-2">{review.content}</p>
                      <div className="flex items-center space-x-4 text-xs text-gray-500">
                        <span>Reviewed in {review.location} on {review.date}</span>
                      </div>
                      <div className="flex items-center space-x-4 mt-2">
                        <button className="text-xs text-gray-600 hover:text-gray-900">
                          👍 Helpful
                        </button>
                        <button className="text-xs text-gray-600 hover:text-gray-900">
                          Report
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductPage;