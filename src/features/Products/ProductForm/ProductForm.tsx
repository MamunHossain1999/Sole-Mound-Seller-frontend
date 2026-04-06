import React, { useState, useRef } from "react";
import { X, Plus } from "lucide-react";

import imageCompression from "browser-image-compression";
import { toast } from "react-toastify";
import { useCreateProductMutation } from "@/redux/api/productApi";

// ─── Types ────────────────────────────────────────────────────────────────────

interface Variant {
  option: string;
  values: string[];
}

interface ProductFormData {
  productName: string;
  description: string;
  category: string;
  productTags: string;
  status: string;
  price: string;
  discountPercentage: string;
  tax: boolean;
  sku: string;
  barcode: string;
  quantity: string;
  tags: string[];
  photos: File[];
  videos: File[];
  variants: Variant[];
  isDigital: boolean;
  weight: string;
  height: string;
  length: string;
}

// ─── Shared Input Styles ──────────────────────────────────────────────────────

const inputCls =
  "w-full bg-white border border-[#f0e6f0] rounded-lg px-3 py-2 text-sm text-gray-700 placeholder:text-gray-300 focus:outline-none focus:ring-1 focus:ring-[#d8a8d8] transition";

const labelCls = "block text-xs font-medium text-gray-500 mb-1";

const sectionCls = "bg-white rounded-xl border border-[#f0e6f0] p-5 mb-4";

// ─── Main Component ───────────────────────────────────────────────────────────

const ProductForm: React.FC = () => {
  const [createProduct, { isLoading }] = useCreateProductMutation();

  const [formData, setFormData] = useState<ProductFormData>({
    productName: "",
    description: "",
    category: "",
    productTags: "",
    status: "Draft",
    price: "",
    discountPercentage: "",
    tax: false,
    sku: "",
    barcode: "",
    quantity: "",
    tags: [""],
    photos: [],
    videos: [],
    variants: [{ option: "Size", values: ["S", "M", "L", "XL"] }],
    isDigital: false,
    weight: "",
    height: "",
    length: "",
  });

  const [newTag, setNewTag] = useState("");
  const photoInputRef = useRef<HTMLInputElement>(null);
  const videoInputRef = useRef<HTMLInputElement>(null);

  // ── Handlers ──

  const set = (field: keyof ProductFormData, value: unknown) =>
    setFormData((p) => ({ ...p, [field]: value }));

  const handleInputChange =
    (field: keyof ProductFormData) =>
    (
      e: React.ChangeEvent<
        HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
      >
    ) =>
      set(field, e.target.value);

  const handleAddTag = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter" && newTag.trim()) {
      e.preventDefault();
      set("tags", [...formData.tags, newTag.trim()]);
      setNewTag("");
    }
  };

  const handleRemoveTag = (tag: string) =>
    set(
      "tags",
      formData.tags.filter((t) => t !== tag)
    );

  const handlePhotosSelected = async (files: FileList) => {
    const compressed: File[] = [];
    for (const file of Array.from(files)) {
      const c = await imageCompression(file, {
        maxSizeMB: 1,
        maxWidthOrHeight: 1920,
      });
      compressed.push(c);
    }
    set("photos", [...formData.photos, ...compressed]);
  };

  const handleVideosSelected = (files: FileList) =>
    set("videos", [...formData.videos, ...Array.from(files)]);

  // Variant helpers
  const updateVariantOption = (idx: number, val: string) =>
    set(
      "variants",
      formData.variants.map((v, i) => (i === idx ? { ...v, option: val } : v))
    );

  const updateVariantValues = (idx: number, raw: string) =>
    set(
      "variants",
      formData.variants.map((v, i) =>
        i === idx
          ? { ...v, values: raw.split(",").map((s) => s.trim()).filter(Boolean) }
          : v
      )
    );

  const removeVariantValue = (vIdx: number, val: string) =>
    set(
      "variants",
      formData.variants.map((v, i) =>
        i === vIdx ? { ...v, values: v.values.filter((x) => x !== val) } : v
      )
    );

  const addVariant = () =>
    set("variants", [...formData.variants, { option: "", values: [] }]);

  // Submit
  const handleSubmit = async () => {
    try {
      const data = new FormData();
      data.append("name", formData.productName);
      data.append("description", formData.description);
      data.append("category", formData.category);
      data.append("price", String(Number(formData.price)));
      data.append("status", formData.status);
      formData.tags.forEach((tag) => data.append("tags", tag));
      formData.photos.forEach((file) => data.append("photos", file));
      if (formData.videos[0]) data.append("video", formData.videos[0]);
      await createProduct(data).unwrap();
      toast.success("Product created successfully");
    } catch (err) {
      console.error(err);
      toast.error("Failed to create product");
    }
  };

  const handleCancel = () =>
    setFormData({
      productName: "",
      description: "",
      category: "",
      productTags: "",
      status: "Draft",
      price: "",
      discountPercentage: "",
      tax: false,
      sku: "",
      barcode: "",
      quantity: "",
      tags: [],
      photos: [],
      videos: [],
      variants: [{ option: "", values: [] }],
      isDigital: false,
      weight: "",
      height: "",
      length: "",
    });

  // ── Render ──

  return (
    <div
      className="min-h-screen font-sans"
      style={{ background: "#fdf6fd", fontFamily: "'DM Sans', sans-serif" }}
    >
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=DM+Sans:wght@300;400;500;600&display=swap');
        * { box-sizing: border-box; }
      `}</style>

      <div className="max-w-5xl mx-auto px-4 py-6">
        <div className="grid grid-cols-1 lg:grid-cols-[1fr_280px] gap-4">

          {/* ── LEFT COLUMN ── */}
          <div>

            {/* General Information */}
            <div className={sectionCls}>
              <h2 className="text-sm font-semibold text-gray-700 mb-4">
                General Information
              </h2>

              <div className="mb-3">
                <label className={labelCls}>Product Name</label>
                <input
                  type="text"
                  placeholder="Type product name here..."
                  value={formData.productName}
                  onChange={handleInputChange("productName")}
                  className={inputCls}
                />
              </div>

              <div>
                <label className={labelCls}>Description</label>
                <textarea
                  placeholder="Type product name here..."
                  value={formData.description}
                  onChange={handleInputChange("description")}
                  rows={4}
                  className={`${inputCls} resize-none`}
                />
              </div>
            </div>

            {/* Media */}
            <div className={sectionCls}>
              <h2 className="text-sm font-semibold text-gray-700 mb-4">Media</h2>

              {/* Photo Upload */}
              <div className="mb-1">
                <label className={labelCls}>Photo</label>
              </div>
              <div
                onClick={() => photoInputRef.current?.click()}
                className="border-2 border-dashed border-[#e8d0e8] rounded-xl p-8 flex flex-col items-center justify-center cursor-pointer hover:border-[#c8a0c8] transition-colors mb-4"
                style={{ background: "#fdf8fd" }}
              >
                <div className="mb-3">
                  <svg width="48" height="40" viewBox="0 0 48 40" fill="none">
                    <path d="M24 28V12M24 12L18 18M24 12L30 18" stroke="#d8a8d8" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                    <path d="M8 32h32" stroke="#d8a8d8" strokeWidth="2" strokeLinecap="round"/>
                    <rect x="1" y="6" width="46" height="32" rx="4" stroke="#e8d0e8" strokeWidth="1.5" fill="none"/>
                  </svg>
                </div>
                <p className="text-sm text-gray-500 mb-1">
                  Drop your images here, or{" "}
                  <span className="text-[#b87ab8] font-medium">click to browse</span>
                </p>
                <p className="text-xs text-gray-400">
                  1000 × 1000 (4:3) recommended. PNG, JPG, and GIF files are allowed
                </p>
                <input
                  ref={photoInputRef}
                  type="file"
                  accept="image/*"
                  multiple
                  className="hidden"
                  onChange={(e) => e.target.files && handlePhotosSelected(e.target.files)}
                />
              </div>

              {/* Photo previews */}
              {formData.photos.length > 0 && (
                <div className="flex flex-wrap gap-2 mb-4">
                  {formData.photos.map((f, i) => (
                    <div key={i} className="relative w-16 h-16 rounded-lg overflow-hidden border border-[#e8d0e8]">
                      <img src={URL.createObjectURL(f)} alt="" className="w-full h-full object-cover" />
                      <button
                        onClick={() => set("photos", formData.photos.filter((_, j) => j !== i))}
                        className="absolute top-0.5 right-0.5 bg-white rounded-full p-0.5"
                      >
                        <X className="w-3 h-3 text-gray-500" />
                      </button>
                    </div>
                  ))}
                </div>
              )}

              {/* Video Upload */}
              <div className="mb-1">
                <label className={labelCls}>Video</label>
              </div>
              <div
                onClick={() => videoInputRef.current?.click()}
                className="border-2 border-dashed border-[#e8d0e8] rounded-xl p-8 flex flex-col items-center justify-center cursor-pointer hover:border-[#c8a0c8] transition-colors"
                style={{ background: "#fdf8fd" }}
              >
                <div className="mb-3">
                  <svg width="48" height="40" viewBox="0 0 48 40" fill="none">
                    <path d="M24 28V12M24 12L18 18M24 12L30 18" stroke="#d8a8d8" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                    <path d="M8 32h32" stroke="#d8a8d8" strokeWidth="2" strokeLinecap="round"/>
                    <rect x="1" y="6" width="46" height="32" rx="4" stroke="#e8d0e8" strokeWidth="1.5" fill="none"/>
                  </svg>
                </div>
                <p className="text-sm text-gray-500 mb-1">
                  Drop your images here, or{" "}
                  <span className="text-[#b87ab8] font-medium">click to browse</span>
                </p>
                <p className="text-xs text-gray-400">
                  1600 × 1200 (4:3) recommended. PNG, JPG, and GIF files are allowed
                </p>
                <input
                  ref={videoInputRef}
                  type="file"
                  accept="video/*"
                  multiple
                  className="hidden"
                  onChange={(e) => e.target.files && handleVideosSelected(e.target.files)}
                />
              </div>
            </div>

            {/* Pricing */}
            <div className={sectionCls}>
              <h2 className="text-sm font-semibold text-gray-700 mb-4">Pricing</h2>

              <div className="mb-3">
                <label className={labelCls}>Product Price</label>
                <input
                  type="text"
                  placeholder="Enter Price"
                  value={formData.price}
                  onChange={handleInputChange("price")}
                  className={inputCls}
                />
              </div>

              <div className="mb-3">
                <label className={labelCls}>Discount Percentage (%)</label>
                <input
                  type="text"
                  placeholder="Enter Price"
                  value={formData.discountPercentage}
                  onChange={handleInputChange("discountPercentage")}
                  className={`${inputCls} w-1/2`}
                />
              </div>

              <label className="flex items-center gap-2 cursor-pointer select-none">
                <div
                  onClick={() => set("tax", !formData.tax)}
                  className={`w-4 h-4 rounded border flex items-center justify-center transition-colors ${
                    formData.tax ? "bg-[#b87ab8] border-[#b87ab8]" : "bg-white border-[#d8c0d8]"
                  }`}
                >
                  {formData.tax && (
                    <svg width="10" height="8" viewBox="0 0 10 8" fill="none">
                      <path d="M1 4L3.5 6.5L9 1" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                  )}
                </div>
                <span className="text-xs text-gray-500">Add tax for this product</span>
              </label>
            </div>

            {/* Inventory */}
            <div className={sectionCls}>
              <h2 className="text-sm font-semibold text-gray-700 mb-4">Inventory</h2>
              <div className="grid grid-cols-3 gap-3">
                <div>
                  <label className={labelCls}>SKU</label>
                  <input
                    type="text"
                    placeholder="Type product SKU here..."
                    value={formData.sku}
                    onChange={handleInputChange("sku")}
                    className={inputCls}
                  />
                </div>
                <div>
                  <label className={labelCls}>Barcode</label>
                  <input
                    type="text"
                    placeholder="Product barcode..."
                    value={formData.barcode}
                    onChange={handleInputChange("barcode")}
                    className={inputCls}
                  />
                </div>
                <div>
                  <label className={labelCls}>Quantity</label>
                  <input
                    type="text"
                    placeholder="Type product quantity here..."
                    value={formData.quantity}
                    onChange={handleInputChange("quantity")}
                    className={inputCls}
                  />
                </div>
              </div>
            </div>

            {/* Different Options / Variants */}
            <div className={sectionCls}>
              <h2 className="text-sm font-semibold text-gray-700 mb-4">
                Different Options
              </h2>

              {formData.variants.map((variant, vIdx) => (
                <div key={vIdx} className="mb-4">
                  <div className="flex items-center justify-between mb-2">
                    <label className={labelCls}>Option {vIdx + 1}</label>
                  </div>

                  {/* Option name select */}
                  <div className="mb-2">
                    <label className={`${labelCls} ml-0`}>
                      {vIdx === 0 ? "Size" : "Option"}
                    </label>
                    <div className="relative">
                      <select
                        value={variant.option}
                        onChange={(e) => updateVariantOption(vIdx, e.target.value)}
                        className={`${inputCls} appearance-none pr-8`}
                      >
                        <option value="">Select...</option>
                        <option value="Size">Size</option>
                        <option value="Color">Color</option>
                        <option value="Material">Material</option>
                      </select>
                      <span className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 text-xs">▼</span>
                    </div>
                  </div>

                  {/* Values */}
                  <div>
                    <label className={labelCls}>Values</label>
                    <div className="flex flex-wrap items-center gap-2 mb-2">
                      {variant.values.map((val) => (
                        <span
                          key={val}
                          className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-medium text-gray-600"
                          style={{ background: "#f5eaf5", border: "1px solid #e8d0e8" }}
                        >
                          {val}
                          <button
                            onClick={() => removeVariantValue(vIdx, val)}
                            className="text-gray-400 hover:text-gray-600"
                          >
                            <X className="w-3 h-3" />
                          </button>
                        </span>
                      ))}
                    </div>
                    {/* Add value input */}
                    <input
                      type="text"
                      placeholder="Add values, comma separated (e.g. S, M, L)"
                      className={`${inputCls} text-xs`}
                      onKeyDown={(e) => {
                        if (e.key === "Enter") {
                          updateVariantValues(
                            vIdx,
                            [...variant.values, (e.target as HTMLInputElement).value].join(", ")
                          );
                          (e.target as HTMLInputElement).value = "";
                        }
                      }}
                    />
                  </div>
                </div>
              ))}

              <button
                onClick={addVariant}
                className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium text-white transition-colors"
                style={{ background: "#b87ab8" }}
              >
                <Plus className="w-3.5 h-3.5" />
                Add Variant
              </button>
            </div>

            {/* Shipping */}
            <div className={sectionCls}>
              <h2 className="text-sm font-semibold text-gray-700 mb-4">Shiping</h2>

              <label className="flex items-center gap-2 cursor-pointer select-none mb-4">
                <div
                  onClick={() => set("isDigital", !formData.isDigital)}
                  className={`w-4 h-4 rounded border flex items-center justify-center transition-colors ${
                    formData.isDigital ? "bg-[#b87ab8] border-[#b87ab8]" : "bg-white border-[#d8c0d8]"
                  }`}
                >
                  {formData.isDigital && (
                    <svg width="10" height="8" viewBox="0 0 10 8" fill="none">
                      <path d="M1 4L3.5 6.5L9 1" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                  )}
                </div>
                <span className="text-xs text-gray-500">This is a digital item</span>
              </label>

              <div className="grid grid-cols-3 gap-3">
                <div>
                  <label className={labelCls}>Weight</label>
                  <input
                    type="text"
                    placeholder="Product weight"
                    value={formData.weight}
                    onChange={handleInputChange("weight")}
                    className={inputCls}
                  />
                </div>
                <div>
                  <label className={labelCls}>Height</label>
                  <input
                    type="text"
                    placeholder="Height (cm)"
                    value={formData.height}
                    onChange={handleInputChange("height")}
                    className={inputCls}
                  />
                </div>
                <div>
                  <label className={labelCls}>Length</label>
                  <input
                    type="text"
                    placeholder="Length (cm)"
                    value={formData.length}
                    onChange={handleInputChange("length")}
                    className={inputCls}
                  />
                </div>
              </div>
            </div>
          </div>

          {/* ── RIGHT COLUMN ── */}
          <div>

            {/* Category */}
            <div className={sectionCls}>
              <h2 className="text-sm font-semibold text-gray-700 mb-3">Category</h2>

              <div className="mb-3">
                <label className={labelCls}>Product Category</label>
                <div className="relative">
                  <select
                    value={formData.category}
                    onChange={handleInputChange("category")}
                    className={`${inputCls} appearance-none pr-8`}
                  >
                    <option value="">Select...</option>
                    <option value="electronics">Electronics</option>
                    <option value="clothing">Clothing</option>
                    <option value="food">Food</option>
                    <option value="beauty">Beauty</option>
                  </select>
                  <span className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 text-xs">▼</span>
                </div>
              </div>

              <div>
                <label className={labelCls}>Product Tags</label>
                <div className="relative">
                  <select className={`${inputCls} appearance-none pr-8`}>
                    <option value="">Select...</option>
                    <option value="new">New Arrival</option>
                    <option value="sale">On Sale</option>
                    <option value="trending">Trending</option>
                  </select>
                  <span className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 text-xs">▼</span>
                </div>
              </div>
            </div>

            {/* Status */}
            <div className={sectionCls}>
              <div className="flex items-center justify-between mb-3">
                <h2 className="text-sm font-semibold text-gray-700">Status</h2>
                <span className="text-xs px-2 py-0.5 rounded-full font-medium" style={{ background: "#ffd6cc", color: "#c0503a" }}>
                  Draft
                </span>
              </div>

              <div>
                <label className={labelCls}>Product Status</label>
                <div className="relative">
                  <select
                    value={formData.status}
                    onChange={handleInputChange("status")}
                    className={`${inputCls} appearance-none pr-8`}
                  >
                    
                    <option value="Draft">Draft</option>
                    <option value="Published">Published</option>
                    <option value="Low Stock">Low Stock</option>
                    <option value="Out of Stock">Out of Stock</option>
                  </select>
                  <span className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 text-xs">▼</span>
                </div>
              </div>
            </div>

            {/* Tags */}
            <div className={sectionCls}>
              <div className="flex items-center justify-between mb-3">
                <h2 className="text-sm font-semibold text-gray-700">Tags</h2>
                <span className="text-xs text-[#b87ab8] font-medium cursor-pointer">Add Tag</span>
              </div>

              <div className="mb-3">
                <input
                  type="text"
                  placeholder="Enter Tag Name..."
                  value={newTag}
                  onChange={(e) => setNewTag(e.target.value)}
                  onKeyDown={handleAddTag}
                  className={inputCls}
                />
              </div>

              <div className="flex flex-wrap gap-2">
                {formData.tags.map((tag, i) => (
                  <span
                    key={i}
                    className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-medium text-gray-600"
                    style={{ background: "#f5eaf5", border: "1px solid #e8d0e8" }}
                  >
                    {tag}
                    <button
                      onClick={() => handleRemoveTag(tag)}
                      className="text-gray-400 hover:text-gray-600"
                    >
                      <X className="w-3 h-3" />
                    </button>
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* ── Bottom Action Bar ── */}
        <div className="flex justify-end gap-3 mt-2 pb-6">
          <button
            onClick={handleCancel}
            className="px-6 py-2 rounded-lg text-sm font-medium text-gray-600 border border-[#e0d0e0] bg-white hover:bg-gray-50 transition-colors"
          >
            Cancel
          </button>
          <button
            onClick={handleSubmit}
            disabled={isLoading}
            className="px-6 py-2 rounded-lg text-sm font-medium text-white transition-colors disabled:opacity-70"
            style={{ background: "#b87ab8" }}
          >
            {isLoading ? "Saving..." : "Save"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductForm;