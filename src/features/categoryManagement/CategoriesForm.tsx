import React, { useState, useRef } from 'react';
import { Upload, X, } from 'lucide-react';

interface CategoryFormData {
  categoryTitle: string;
  createdBy: string;
  stock: string;
  tagId: string;
  description: string;
  thumbnailImage: File | null;
}

const CategoriesForm: React.FC = () => {
  const [formData, setFormData] = useState<CategoryFormData>({
    categoryTitle: "Fashion Men , Women & Kid's",
    createdBy: "Seller",
    stock: "34526",
    tagId: "FS34526",
    description: "Latest collection, seamlessly blending elegance with comfort in a range of exquisite designs.",
    thumbnailImage: null
  });

  const [dragActive, setDragActive] = useState<boolean>(false);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>): void => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleFileUpload = (file: File): void => {
    if (file && file.type.startsWith('image/')) {
      setFormData(prev => ({
        ...prev,
        thumbnailImage: file
      }));
      
      const reader = new FileReader();
      reader.onload = (e) => {
        setPreviewUrl(e.target?.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleDrop = (e: React.DragEvent<HTMLDivElement>): void => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      handleFileUpload(e.dataTransfer.files[0]);
    }
  };

  const handleDrag = (e: React.DragEvent<HTMLDivElement>): void => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true);
    } else if (e.type === "dragleave") {
      setDragActive(false);
    }
  };

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>): void => {
    if (e.target.files && e.target.files[0]) {
      handleFileUpload(e.target.files[0]);
    }
  };

  const removeImage = (): void => {
    setFormData(prev => ({
      ...prev,
      thumbnailImage: null
    }));
    setPreviewUrl(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  const handleSave = (): void => {
    console.log('Form Data:', formData);
    // Handle save logic here
    alert('Category saved successfully!');
  };

  const handleCancel = (): void => {
    // Reset form or navigate back
    console.log('Form cancelled');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-50 to-purple-50">
      {/* Header */}
      <div className="bg-white shadow-sm border-b">
        <div className="max-w-6xl mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div>
              <div className="flex items-center space-x-2 text-sm text-gray-600 mb-2">
                <span>Dashboard</span>
                <span></span>
                <span>Categories</span>
                <span></span>
                <span className="text-gray-900">Add Categories</span>
              </div>
              <h1 className="text-2xl font-semibold text-gray-900">Categories</h1>
            </div>
            <div className="flex space-x-3">
              <button
                onClick={handleCancel}
                className="px-6 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors duration-200 font-medium"
              >
                Cancel
              </button>
              <button
                onClick={handleSave}
                className="px-6 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors duration-200 font-medium"
              >
                Save
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-6xl mx-auto px-6 py-8">
        <div className="bg-white rounded-2xl shadow-lg overflow-hidden">
          <div className="p-8">
            {/* Thumbnail Upload Section */}
            <div className="mb-8">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">
                Add Thumbnail Photo
              </h3>
              
              <div className="relative">
                {previewUrl ? (
                  <div className="relative inline-block">
                    <img
                      src={previewUrl}
                      alt="Thumbnail preview"
                      className="w-32 h-32 object-cover rounded-lg border-2 border-gray-200"
                    />
                    <button
                      onClick={removeImage}
                      className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full p-1 hover:bg-red-600 transition-colors duration-200"
                    >
                      <X className="h-4 w-4" />
                    </button>
                  </div>
                ) : (
                  <div
                    className={`relative border-2 border-dashed rounded-xl p-12 text-center transition-all duration-200 ${
                      dragActive
                        ? 'border-purple-400 bg-purple-50'
                        : 'border-gray-300 hover:border-purple-400 hover:bg-purple-50'
                    }`}
                    onDragEnter={handleDrag}
                    onDragLeave={handleDrag}
                    onDragOver={handleDrag}
                    onDrop={handleDrop}
                  >
                    <div className="flex flex-col items-center space-y-4">
                      <div className="p-4 bg-purple-100 rounded-full">
                        <Upload className="h-8 w-8 text-purple-600" />
                      </div>
                      <div>
                        <p className="text-gray-700 font-medium mb-2">
                          Drop your images here, or{' '}
                          <button
                            onClick={() => fileInputRef.current?.click()}
                            className="text-purple-600 hover:text-purple-700 underline"
                          >
                            click to browse
                          </button>
                        </p>
                        <p className="text-sm text-gray-500">
                          JPEG, PNG (5.2 recommended, PNG, JPG and GIF files are allowed)
                        </p>
                      </div>
                    </div>
                    <input
                      ref={fileInputRef}
                      type="file"
                      accept="image/*"
                      onChange={handleFileSelect}
                      className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                    />
                  </div>
                )}
              </div>
            </div>

            {/* General Information Section */}
            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-6">
                General Information
              </h3>
              
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {/* Left Column */}
                <div className="space-y-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Category Title
                    </label>
                    <input
                      type="text"
                      name="categoryTitle"
                      value={formData.categoryTitle}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent outline-none transition-all duration-200"
                      placeholder="Enter category title"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Stock
                    </label>
                    <input
                      type="text"
                      name="stock"
                      value={formData.stock}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent outline-none transition-all duration-200"
                      placeholder="Enter stock quantity"
                    />
                  </div>
                </div>

                {/* Right Column */}
                <div className="space-y-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Created By
                    </label>
                    <input
                      type="text"
                      name="createdBy"
                      value={formData.createdBy}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent outline-none transition-all duration-200"
                      placeholder="Enter creator name"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Tag ID
                    </label>
                    <input
                      type="text"
                      name="tagId"
                      value={formData.tagId}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent outline-none transition-all duration-200"
                      placeholder="Enter tag ID"
                    />
                  </div>
                </div>
              </div>

              {/* Description - Full Width */}
              <div className="mt-6">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Description
                </label>
                <textarea
                  name="description"
                  value={formData.description}
                  onChange={handleInputChange}
                  rows={4}
                  className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent outline-none transition-all duration-200 resize-none"
                  placeholder="Enter category description"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CategoriesForm;