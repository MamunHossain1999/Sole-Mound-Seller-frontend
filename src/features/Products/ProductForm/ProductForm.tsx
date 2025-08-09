import React, { useState, useRef } from 'react';
import { Upload, X, ChevronDown } from 'lucide-react';

interface ProductFormData {
  productName: string;
  description: string;
  category: string;
  productTags: string;
  status: string;
  price: string;
  tags: string[];
  photos: File[];
  videos: File[];
}

interface TagItemProps {
  tag: string;
  onRemove: () => void;
}

const TagItem: React.FC<TagItemProps> = ({ tag, onRemove }) => (
  <span className="inline-flex items-center px-3 py-1 bg-gray-100 text-gray-700 text-sm rounded-full mr-2 mb-2">
    {tag}
    <button
      onClick={onRemove}
      className="ml-2 text-gray-500 hover:text-gray-700"
    >
      <X className="w-3 h-3" />
    </button>
  </span>
);

interface FileUploadAreaProps {
  title: string;
  subtitle: string;
  onFilesSelected: (files: FileList) => void;
  accept: string;
  multiple?: boolean;
}

const FileUploadArea: React.FC<FileUploadAreaProps> = ({
  title,
  subtitle,
  onFilesSelected,
  accept,
  multiple = true
}) => {
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    const files = e.dataTransfer.files;
    if (files.length > 0) {
      onFilesSelected(files);
    }
  };

  const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
  };

  const handleClick = () => {
    fileInputRef.current?.click();
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files) {
      onFilesSelected(files);
    }
  };

  return (
    <div
      className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center cursor-pointer hover:border-gray-400 transition-colors"
      onDrop={handleDrop}
      onDragOver={handleDragOver}
      onClick={handleClick}
    >
      <div className="flex flex-col items-center">
        <Upload className="w-12 h-12 text-gray-400 mb-4" />
        <p className="text-gray-600 mb-2">{title}</p>
        <p className="text-sm text-gray-500">{subtitle}</p>
      </div>
      <input
        ref={fileInputRef}
        type="file"
        accept={accept}
        multiple={multiple}
        onChange={handleFileChange}
        className="hidden"
      />
    </div>
  );
};

const ProductForm: React.FC = () => {
  const [formData, setFormData] = useState<ProductFormData>({
    productName: '',
    description: '',
    category: '',
    productTags: '',
    status: 'Pending',
    price: '',
    tags: ['T-Shirt', 'Men Clothes', 'Summer Collection'],
    photos: [],
    videos: []
  });

  const [newTag, setNewTag] = useState('');

  const handleInputChange = (field: keyof ProductFormData) => (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    setFormData(prev => ({
      ...prev,
      [field]: e.target.value
    }));
  };

  const handleAddTag = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter' && newTag.trim()) {
      e.preventDefault();
      if (!formData.tags.includes(newTag.trim())) {
        setFormData(prev => ({
          ...prev,
          tags: [...prev.tags, newTag.trim()]
        }));
      }
      setNewTag('');
    }
  };

  const handleRemoveTag = (tagToRemove: string) => {
    setFormData(prev => ({
      ...prev,
      tags: prev.tags.filter(tag => tag !== tagToRemove)
    }));
  };

  const handlePhotosSelected = (files: FileList) => {
    const fileArray = Array.from(files).filter(file => 
      file.type.startsWith('image/') && ['image/png', 'image/jpeg', 'image/gif'].includes(file.type)
    );
    setFormData(prev => ({
      ...prev,
      photos: [...prev.photos, ...fileArray]
    }));
  };

  const handleVideosSelected = (files: FileList) => {
    const fileArray = Array.from(files).filter(file => 
      file.type.startsWith('video/') || ['video/mp4', 'video/avi', 'video/mov'].includes(file.type)
    );
    setFormData(prev => ({
      ...prev,
      videos: [...prev.videos, ...fileArray]
    }));
  };

  return (
    <div className="min-h-screen bg-gray-50 p-">
      <div className=" mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Left Column - Main Form */}
          <div className="lg:col-span-2 space-y-6">
            {/* General Information */}
            <div className="bg-white rounded-lg p-6 shadow-sm">
              <h2 className="text-lg font-semibold text-gray-900 mb-6">General Information</h2>
              
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Product Name
                  </label>
                  <input
                    type="text"
                    placeholder="Type product name here..."
                    value={formData.productName}
                    onChange={handleInputChange('productName')}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Description
                  </label>
                  <textarea
                    placeholder="Type product name here..."
                    value={formData.description}
                    onChange={handleInputChange('description')}
                    rows={6}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent resize-none"
                  />
                </div>
              </div>
            </div>

            {/* Media */}
            <div className="bg-white rounded-lg p-6 shadow-sm">
              <h2 className="text-lg font-semibold text-gray-900 mb-6">Media</h2>
              
              <div className="space-y-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-4">Photo</label>
                  <FileUploadArea
                    title="Drop your images here, or click to browse"
                    subtitle="1600 x 1200 (4:3) recommended. PNG, JPG and GIF files are allowed"
                    onFilesSelected={handlePhotosSelected}
                    accept="image/png,image/jpeg,image/gif"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-4">Video</label>
                  <FileUploadArea
                    title="Drop your images here, or click to browse"
                    subtitle="1600 x 1200 (4:3) recommended. PNG, JPG and GIF files are allowed"
                    onFilesSelected={handleVideosSelected}
                    accept="video/*"
                  />
                </div>
              </div>
            </div>

            {/* Pricing */}
            <div className="bg-white rounded-lg p-6 shadow-sm">
              <h2 className="text-lg font-semibold text-gray-900 mb-6">Pricing</h2>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Product Price
                </label>
                <input
                  type="text"
                  placeholder="Enter Price"
                  value={formData.price}
                  onChange={handleInputChange('price')}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                />
              </div>
            </div>
          </div>

          {/* Right Column - Category, Status, Tags */}
          <div className="space-y-6">
            {/* Category */}
            <div className="bg-white rounded-lg p-6 shadow-sm">
              <h2 className="text-lg font-semibold text-gray-900 mb-6">Category</h2>
              
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Product Category
                  </label>
                  <div className="relative">
                    <select
                      value={formData.category}
                      onChange={handleInputChange('category')}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent appearance-none bg-white"
                    >
                      <option value="">Select...</option>
                      <option value="electronics">Electronics</option>
                      <option value="clothing">Clothing</option>
                      <option value="accessories">Accessories</option>
                      <option value="home">Home & Garden</option>
                      <option value="sports">Sports</option>
                    </select>
                    <ChevronDown className="absolute right-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400 pointer-events-none" />
                  </div>
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Product Tags
                  </label>
                  <div className="relative">
                    <select
                      value={formData.productTags}
                      onChange={handleInputChange('productTags')}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent appearance-none bg-white"
                    >
                      <option value="">Select...</option>
                      <option value="new">New</option>
                      <option value="featured">Featured</option>
                      <option value="sale">Sale</option>
                      <option value="bestseller">Best Seller</option>
                    </select>
                    <ChevronDown className="absolute right-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400 pointer-events-none" />
                  </div>
                </div>
              </div>
            </div>

            {/* Status */}
            <div className="bg-white rounded-lg p-6 shadow-sm">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-lg font-semibold text-gray-900">Status</h2>
                <span className="px-2 py-1 bg-yellow-100 text-yellow-700 text-xs rounded-full">
                  Pending
                </span>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Product Status
                </label>
                <div className="relative">
                  <select
                    value={formData.status}
                    onChange={handleInputChange('status')}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent appearance-none bg-white"
                  >
                    <option value="Pending">Pending</option>
                    <option value="Published">Published</option>
                    <option value="Draft">Draft</option>
                    <option value="Inactive">Inactive</option>
                  </select>
                  <ChevronDown className="absolute right-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400 pointer-events-none" />
                </div>
              </div>
            </div>

            {/* Tags */}
            <div className="bg-white rounded-lg p-6 shadow-sm">
              <h2 className="text-lg font-semibold text-gray-900 mb-4">Tags</h2>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Add Tag
                </label>
                <input
                  type="text"
                  placeholder="Enter Tag Name"
                  value={newTag}
                  onChange={(e) => setNewTag(e.target.value)}
                  onKeyPress={handleAddTag}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent mb-4"
                />
                
                {formData.tags.length > 0 && (
                  <div className="flex flex-wrap">
                    {formData.tags.map((tag, index) => (
                      <TagItem
                        key={index}
                        tag={tag}
                        onRemove={() => handleRemoveTag(tag)}
                      />
                    ))}
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductForm;