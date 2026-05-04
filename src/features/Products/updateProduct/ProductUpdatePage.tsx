/* eslint-disable @typescript-eslint/no-explicit-any */

import { useState, useRef } from "react";
import { useParams } from "react-router";
import { X, Plus } from "lucide-react";
import { useUpdateProductMutation } from "@/redux/api/productApi";

// ─── Types ───────────────────────────────────────────────────────────────────
type DealType = "weekly" | "today" | "none";
type DealLabel = "hot" | "new" | "sale" | "sold out" | "none";
type BrandType = string;
interface ProductFormData {
  name: string;
  category: string;
  tags: string[];
  description: string;
  status: ProductStatus;
  photos: File[];
  images: string[];
  video: string;
  price: number | "";
  discount: number | "";
  tax: boolean;
  sku: string;
  barcode: string;
  quantity: number | "";
  variants: Variant[];
  isDigital: boolean;
  weight: number | "";
  height: number | "";
  length: number | "";

  dealType: DealType;
  brand: BrandType;
  label?: DealLabel;
  startDate?: string;
}
type ProductStatus = "Low Stock" | "Published" | "Draft" | "Out of Stock";

interface Variant {
  option: string;
  values: string[];
}

interface ProductFormData {
  name: string;
  category: string;
  tags: string[];
  description: string;
  status: ProductStatus;
  photos: File[];
  images: string[];
  video: string;
  price: number | "";
  discount: number | "";
  tax: boolean;
  sku: string;
  barcode: string;
  quantity: number | "";
  variants: Variant[];
  isDigital: boolean;
  weight: number | "";
  height: number | "";
  length: number | "";
}

// ─── Initial Data ─────────────────────────────────────────────────────────────
const initialData: ProductFormData = {
  name: "",
  category: "",
  tags: ["T-Shirt", "Men Clothes", "Summer Collection"],
  description: "",
  status: "Draft",
  photos: [],
  images: [],
  video: "",
  price: "",
  discount: "",
  tax: false,
  sku: "",
  barcode: "",
  quantity: "",
  variants: [{ option: "Size", values: ["S", "M", "L", "XL"] }],
  isDigital: false,
  weight: "",
  height: "",
  length: "",
  dealType: "none",
  brand: "",
  label: "none",
  startDate: "",
};

// ─── Shared Styles ────────────────────────────────────────────────────────────

const inputCls =
  "w-full bg-white border border-[#f0e6f0] rounded-lg px-3 py-2 text-sm text-gray-700 placeholder:text-gray-300 focus:outline-none focus:ring-1 focus:ring-[#d8a8d8] transition";

const labelCls = "block text-xs font-medium text-gray-500 mb-1";

const cardCls =
  "bg-white rounded-xl border border-[#f0e6f0] p-5 mb-4 shadow-sm";

// ─── Upload Area ──────────────────────────────────────────────────────────────

function UploadArea({
  label,
  subtitle,
  onClick,
}: {
  label: string;
  subtitle: string;
  onClick: () => void;
}) {
  return (
    <>
      <p className={labelCls}>{label}</p>
      <div
        onClick={onClick}
        className="border-2 border-dashed border-[#e8d0e8] rounded-xl p-8 flex flex-col items-center justify-center cursor-pointer hover:border-[#c8a0c8] transition-colors mb-4"
        style={{ background: "#fdf8fd" }}
      >
        <svg
          className="mb-3"
          width="48"
          height="40"
          viewBox="0 0 48 40"
          fill="none"
        >
          <rect
            x="1"
            y="6"
            width="46"
            height="32"
            rx="4"
            stroke="#e8d0e8"
            strokeWidth="1.5"
            fill="none"
          />
          <path
            d="M24 28V12M24 12L18 18M24 12L30 18"
            stroke="#d8a8d8"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <path
            d="M8 32h32"
            stroke="#d8a8d8"
            strokeWidth="2"
            strokeLinecap="round"
          />
        </svg>
        <p className="text-sm text-gray-500 mb-1">
          Drop your images here, or{" "}
          <span className="text-[#b87ab8] font-medium">click to browse</span>
        </p>
        <p className="text-xs text-gray-400">{subtitle}</p>
      </div>
    </>
  );
}

// ─── Checkbox ─────────────────────────────────────────────────────────────────

function Checkbox({
  checked,
  onChange,
  label,
}: {
  checked: boolean;
  onChange: () => void;
  label: string;
}) {
  return (
    <label className="flex items-center gap-2 cursor-pointer select-none">
      <div
        onClick={onChange}
        className={`w-4 h-4 rounded border flex items-center justify-center transition-colors flex-shrink-0 ${
          checked
            ? "bg-[#b87ab8] border-[#b87ab8]"
            : "bg-white border-[#d8c0d8]"
        }`}
      >
        {checked && (
          <svg width="10" height="8" viewBox="0 0 10 8" fill="none">
            <path
              d="M1 4L3.5 6.5L9 1"
              stroke="white"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        )}
      </div>
      <span className="text-xs text-gray-500">{label}</span>
    </label>
  );
}

// ─── Status Badge ─────────────────────────────────────────────────────────────

const statusBadge: Record<ProductStatus, { bg: string; color: string }> = {
  Published: { bg: "#d1fae5", color: "#065f46" },
  Draft: { bg: "#fef3c7", color: "#92400e" },
  "Low Stock": { bg: "#ffedd5", color: "#9a3412" },
  "Out of Stock": { bg: "#fee2e2", color: "#991b1b" },
};

// ─── Main Component ───────────────────────────────────────────────────────────

export default function ProductUpdatePage() {
  const { id } = useParams();
  const [form, setForm] = useState<ProductFormData>(initialData);
  const [tagInput, setTagInput] = useState("");
  const [saved, setSaved] = useState(false);

  const photoInputRef = useRef<HTMLInputElement>(null);
  const videoInputRef = useRef<HTMLInputElement>(null);

  const [updateProduct, { isLoading: isUpdating, isError, error }] =
    useUpdateProductMutation();

  // ── Helpers ──

  const set = <K extends keyof ProductFormData>(
    key: K,
    val: ProductFormData[K],
  ) => setForm((p) => ({ ...p, [key]: val }));

  const handlePhotoUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files) return;
    const fileArr = Array.from(files);
    const previewUrls = fileArr.map((f) => URL.createObjectURL(f));
    setForm((p) => ({
      ...p,
      photos: [...p.photos, ...fileArr],
      images: [...p.images, ...previewUrls],
    }));
  };

  const removePhoto = (idx: number) =>
    setForm((p) => ({
      ...p,
      photos: p.photos.filter((_, i) => i !== idx),
      images: p.images.filter((_, i) => i !== idx),
    }));

  const addTag = () => {
    const t = tagInput.trim();
    if (t && !form.tags.includes(t)) set("tags", [...form.tags, t]);
    setTagInput("");
  };

  const removeTag = (tag: string) =>
    set(
      "tags",
      form.tags.filter((t) => t !== tag),
    );

  const updateVariantOption = (idx: number, val: string) =>
    set(
      "variants",
      form.variants.map((v, i) => (i === idx ? { ...v, option: val } : v)),
    );

  const removeVariantValue = (vIdx: number, val: string) =>
    set(
      "variants",
      form.variants.map((v, i) =>
        i === vIdx ? { ...v, values: v.values.filter((x) => x !== val) } : v,
      ),
    );

  const addVariantValueFromInput = (
    vIdx: number,
    e: React.KeyboardEvent<HTMLInputElement>,
  ) => {
    if (e.key === "Enter") {
      const raw = (e.target as HTMLInputElement).value.trim();
      if (!raw) return;
      const newVals = raw
        .split(",")
        .map((s) => s.trim())
        .filter(Boolean);
      set(
        "variants",
        form.variants.map((v, i) =>
          i === vIdx
            ? {
                ...v,
                values: [
                  ...v.values,
                  ...newVals.filter((n) => !v.values.includes(n)),
                ],
              }
            : v,
        ),
      );
      (e.target as HTMLInputElement).value = "";
    }
  };

  const addVariant = () =>
    set("variants", [...form.variants, { option: "", values: [] }]);

  const removeVariant = (idx: number) =>
    set(
      "variants",
      form.variants.filter((_, i) => i !== idx),
    );

  // ── Save ──

  const handleSave = async () => {
    if (!id) return;
    try {
      const fd = new FormData();
      fd.append("name", form.name);
      fd.append("category", form.category);
      fd.append("description", form.description);
      fd.append("status", form.status);
      fd.append("price", String(form.price));
      fd.append("discount", String(form.discount));
      fd.append("tax", String(form.tax));
      fd.append("sku", form.sku);
      fd.append("barcode", form.barcode);
      fd.append("quantity", String(form.quantity));
      fd.append("video", form.video);
      fd.append("tags", JSON.stringify(form.tags));
      fd.append("variants", JSON.stringify(form.variants));
      fd.append("dealType", String(form.dealType || "none"));
      fd.append("brand", form.brand);
      fd.append("label", form.label || "none");
      fd.append("startDate", form.startDate || "");
      fd.append(
        "shipping",
        JSON.stringify({
          isDigital: form.isDigital,
          weight: form.weight,
          height: form.height,
          length: form.length,
        }),
      );
      form.photos.forEach((f) => fd.append("photos", f));

      await updateProduct({ id, data: fd }).unwrap();
      setSaved(true);
      setTimeout(() => setSaved(false), 2500);
    } catch (err) {
      console.error("Update failed:", err);
    }
  };

  const handleDiscard = () => setForm(initialData);

  const discountedPrice =
    form.price !== "" && form.discount !== ""
      ? (Number(form.price) * (1 - Number(form.discount) / 100)).toFixed(2)
      : null;

  // ── Render ──

  return (
    <div
      className="min-h-screen font-sans"
      style={{ background: "#fdf6fd", fontFamily: "'DM Sans', sans-serif" }}
    >
      <style>{`@import url('https://fonts.googleapis.com/css2?family=DM+Sans:wght@300;400;500;600&display=swap');`}</style>

      <div className="max-w-5xl mx-auto px-4 py-6">
        {/* ── Error Toast ── */}
        {isError && (
          <div className="mb-4 bg-red-50 border border-red-200 rounded-xl px-4 py-3 flex items-center gap-2 text-sm text-red-700">
            <span>⚠️</span>
            <span className="font-semibold">Update failed.</span>
            <span className="text-red-500">
              {(error as { data?: { message?: string } })?.data?.message ??
                "Something went wrong. Please try again."}
            </span>
          </div>
        )}

        <div className="grid grid-cols-1 lg:grid-cols-[1fr_280px] gap-4">
          {/* ══ LEFT COLUMN ══ */}
          <div>
            {/* General Information */}
            <div className={cardCls}>
              <h2 className="text-sm font-semibold text-gray-700 mb-4">
                General Information
              </h2>
              <div className="mb-3">
                <label className={labelCls}>Product Name</label>
                <input
                  type="text"
                  placeholder="Type product name here..."
                  value={form.name}
                  onChange={(e) => set("name", e.target.value)}
                  className={inputCls}
                />
              </div>
              <div>
                <label className={labelCls}>Description</label>
                <textarea
                  placeholder="Type product description here..."
                  value={form.description}
                  onChange={(e) => set("description", e.target.value)}
                  rows={4}
                  className={`${inputCls} resize-none`}
                />
              </div>
            </div>

            {/* Media */}
            <div className={cardCls}>
              <h2 className="text-sm font-semibold text-gray-700 mb-4">
                Media
              </h2>

              <UploadArea
                label="Photo"
                subtitle="1000 × 1000 (4:3) recommended. PNG, JPG, and GIF files are allowed"
                onClick={() => photoInputRef.current?.click()}
              />
              <input
                ref={photoInputRef}
                type="file"
                accept="image/*"
                multiple
                hidden
                onChange={handlePhotoUpload}
              />

              {/* Photo previews */}
              {form.images.length > 0 && (
                <div className="flex flex-wrap gap-2 mb-4">
                  {form.images.map((src, i) => (
                    <div
                      key={i}
                      className="relative w-16 h-16 rounded-lg overflow-hidden border border-[#e8d0e8]"
                    >
                      <img
                        src={src}
                        alt=""
                        className="w-full h-full object-cover"
                      />
                      <button
                        onClick={() => removePhoto(i)}
                        className="absolute top-0.5 right-0.5 bg-white rounded-full p-0.5"
                      >
                        <X className="w-3 h-3 text-gray-500" />
                      </button>
                    </div>
                  ))}
                </div>
              )}

              <UploadArea
                label="Video"
                subtitle="1600 × 1200 (4:3) recommended. PNG, JPG, and GIF files are allowed"
                onClick={() => videoInputRef.current?.click()}
              />
              <input
                ref={videoInputRef}
                type="file"
                accept="video/*"
                hidden
                onChange={() => {
                  // handle video if needed
                }}
              />

              <div className="mt-1">
                <label className={labelCls}>Or paste Video URL</label>
                <input
                  type="text"
                  placeholder="https://youtube.com/..."
                  value={form.video}
                  onChange={(e) => set("video", e.target.value)}
                  className={inputCls}
                />
              </div>
            </div>

            {/* Pricing */}
            <div className={cardCls}>
              <h2 className="text-sm font-semibold text-gray-700 mb-4">
                Pricing
              </h2>
              <div className="mb-3">
                <label className={labelCls}>Product Price</label>
                <input
                  type="number"
                  placeholder="Enter Price"
                  value={form.price}
                  onChange={(e) =>
                    set(
                      "price",
                      e.target.value === "" ? "" : Number(e.target.value),
                    )
                  }
                  className={inputCls}
                />
              </div>
              <div className="mb-3">
                <label className={labelCls}>Discount Percentage (%)</label>
                <input
                  type="number"
                  placeholder="Enter Discount"
                  value={form.discount}
                  onChange={(e) =>
                    set(
                      "discount",
                      e.target.value === "" ? "" : Number(e.target.value),
                    )
                  }
                  className={`${inputCls} w-1/2`}
                />
              </div>
              {discountedPrice && (
                <div
                  className="mb-3 px-3 py-2 rounded-lg text-xs font-medium text-emerald-700 flex items-center gap-1.5"
                  style={{ background: "#ecfdf5", border: "1px solid #a7f3d0" }}
                >
                  💰 Discounted price:{" "}
                  <span className="font-bold">৳{discountedPrice}</span>
                </div>
              )}
              <Checkbox
                checked={form.tax}
                onChange={() => set("tax", !form.tax)}
                label="Add tax for this product"
              />
            </div>

            {/* Deal Type */}
            <div className={cardCls}>
              <h2 className="text-sm font-semibold text-gray-700 mb-3">
                Deal Type
              </h2>

              <label className={labelCls}>Select Deal Type</label>
              <div className="relative">
                <select
                  value={(form as any).dealType || "none"}
                  onChange={(e) =>
                    setForm((prev) => ({
                      ...prev,
                      dealType: e.target.value as "weekly" | "today" | "none",
                    }))
                  }
                  className={`${inputCls} appearance-none pr-8`}
                >
                  <option value="none">None</option>
                  <option value="weekly">Weekly Deal</option>
                  <option value="today">Today Deal</option>
                </select>

                <span className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 text-xs">
                  ▼
                </span>
              </div>
            </div>
            {/* brand */}
            <div className="py-3">
              <label>Brand</label>
              <input
                type="text"
                value={form.brand}
                onChange={(e) => set("brand", e.target.value)}
                className={inputCls}
                placeholder="Enter brand name"
              />
            </div>
            {/* card level */}
            <div className={cardCls}>
              <h2 className="text-sm font-semibold text-gray-700 mb-3">
                Product Label
              </h2>

              <label className={labelCls}>Select Label</label>
              <div className="relative">
                <select
                  value={form.label || "none"}
                  onChange={(e) => set("label", e.target.value as DealLabel)}
                  className={`${inputCls} appearance-none pr-8`}
                >
                  <option value="none">None</option>
                  <option value="hot">Hot</option>
                  <option value="new">New</option>
                  <option value="sale">Sale</option>
                  <option value="sold out">Sold Out</option>
                </select>

                <span className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 text-xs">
                  ▼
                </span>
              </div>
            </div>

            {/* Inventory */}
            <div className={cardCls}>
              <h2 className="text-sm font-semibold text-gray-700 mb-4">
                Inventory
              </h2>
              <div className="grid grid-cols-3 gap-3">
                <div>
                  <label className={labelCls}>SKU</label>
                  <input
                    type="text"
                    placeholder="Type product SKU here..."
                    value={form.sku}
                    onChange={(e) => set("sku", e.target.value)}
                    className={inputCls}
                  />
                </div>
                <div>
                  <label className={labelCls}>Barcode</label>
                  <input
                    type="text"
                    placeholder="Product barcode..."
                    value={form.barcode}
                    onChange={(e) => set("barcode", e.target.value)}
                    className={inputCls}
                  />
                </div>
                <div>
                  <label className={labelCls}>Quantity</label>
                  <input
                    type="number"
                    placeholder="Type quantity here..."
                    value={form.quantity}
                    onChange={(e) =>
                      set(
                        "quantity",
                        e.target.value === "" ? "" : Number(e.target.value),
                      )
                    }
                    className={inputCls}
                  />
                </div>
              </div>
            </div>

            {/* Different Options / Variants */}
            <div className={cardCls}>
              <h2 className="text-sm font-semibold text-gray-700 mb-4">
                Different Options
              </h2>

              {form.variants.map((variant, vIdx) => (
                <div
                  key={vIdx}
                  className="mb-5 pb-5 border-b border-[#f0e6f0] last:border-0 last:mb-0 last:pb-0"
                >
                  <div className="flex items-center justify-between mb-2">
                    <p className={labelCls}>Option {vIdx + 1}</p>
                    {form.variants.length > 1 && (
                      <button
                        onClick={() => removeVariant(vIdx)}
                        className="text-xs text-red-400 hover:text-red-600 transition-colors"
                      >
                        Remove
                      </button>
                    )}
                  </div>

                  {/* Option name */}
                  <div className="mb-3">
                    <label className={labelCls}>
                      {vIdx === 0 ? "Size" : "Option"}
                    </label>
                    <div className="relative">
                      <select
                        value={variant.option}
                        onChange={(e) =>
                          updateVariantOption(vIdx, e.target.value)
                        }
                        className={`${inputCls} appearance-none pr-8`}
                      >
                        <option value="">Select...</option>
                        <option value="Size">Size</option>
                        <option value="Color">Color</option>
                        <option value="Material">Material</option>
                        <option value="Style">Style</option>
                      </select>
                      <span className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 text-xs">
                        ▼
                      </span>
                    </div>
                  </div>

                  {/* Values */}
                  <div>
                    <label className={labelCls}>Values</label>
                    <div className="flex flex-wrap gap-2 mb-2">
                      {variant.values.map((val) => (
                        <span
                          key={val}
                          className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-medium text-gray-600"
                          style={{
                            background: "#f5eaf5",
                            border: "1px solid #e8d0e8",
                          }}
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
                    <input
                      type="text"
                      placeholder="Type value and press Enter (e.g. S, M, L)"
                      className={`${inputCls} text-xs`}
                      onKeyDown={(e) => addVariantValueFromInput(vIdx, e)}
                    />
                  </div>
                </div>
              ))}

              <button
                onClick={addVariant}
                className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium text-white transition-opacity hover:opacity-90"
                style={{ background: "#b87ab8" }}
              >
                <Plus className="w-3.5 h-3.5" />
                Add Variant
              </button>
            </div>

            {/* Shipping */}
            <div className={cardCls}>
              <h2 className="text-sm font-semibold text-gray-700 mb-4">
                Shiping
              </h2>

              <div className="mb-4">
                <Checkbox
                  checked={form.isDigital}
                  onChange={() => set("isDigital", !form.isDigital)}
                  label="This is a digital item"
                />
              </div>

              <div className="grid grid-cols-3 gap-3">
                <div>
                  <label className={labelCls}>Weight</label>
                  <input
                    type="number"
                    placeholder="Product weight"
                    value={form.weight}
                    onChange={(e) =>
                      set(
                        "weight",
                        e.target.value === "" ? "" : Number(e.target.value),
                      )
                    }
                    disabled={form.isDigital}
                    className={`${inputCls} disabled:opacity-40`}
                  />
                </div>
                <div>
                  <label className={labelCls}>Height</label>
                  <input
                    type="number"
                    placeholder="Height (cm)"
                    value={form.height}
                    onChange={(e) =>
                      set(
                        "height",
                        e.target.value === "" ? "" : Number(e.target.value),
                      )
                    }
                    disabled={form.isDigital}
                    className={`${inputCls} disabled:opacity-40`}
                  />
                </div>
                <div>
                  <label className={labelCls}>Length</label>
                  <input
                    type="number"
                    placeholder="Length (cm)"
                    value={form.length}
                    onChange={(e) =>
                      set(
                        "length",
                        e.target.value === "" ? "" : Number(e.target.value),
                      )
                    }
                    disabled={form.isDigital}
                    className={`${inputCls} disabled:opacity-40`}
                  />
                </div>
              </div>
            </div>
          </div>

          {/* ══ RIGHT COLUMN ══ */}
          <div>
            {/* Category */}
            <div className={cardCls}>
              <h2 className="text-sm font-semibold text-gray-700 mb-3">
                Category
              </h2>

              <div className="mb-3">
                <label className={labelCls}>Product Category</label>
                <div className="relative">
                  <select
                    value={form.category}
                    onChange={(e) => set("category", e.target.value)}
                    className={`${inputCls} appearance-none pr-8`}
                  >
                    <option value="">Select...</option>
                    <option value="electronics">Electronics</option>
                    <option value="clothing">Clothing</option>
                    <option value="food">Food</option>
                    <option value="beauty">Beauty</option>
                  </select>
                  <span className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 text-xs">
                    ▼
                  </span>
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
                  <span className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 text-xs">
                    ▼
                  </span>
                </div>
              </div>
            </div>

            {/* Status */}
            <div className={cardCls}>
              <div className="flex items-center justify-between mb-3">
                <h2 className="text-sm font-semibold text-gray-700">Status</h2>
                <span
                  className="text-xs px-2 py-0.5 rounded-full font-medium"
                  style={{
                    background: statusBadge[form.status].bg,
                    color: statusBadge[form.status].color,
                  }}
                >
                  {form.status}
                </span>
              </div>

              <label className={labelCls}>Product Status</label>
              <div className="relative">
                <select
                  value={form.status}
                  onChange={(e) =>
                    set("status", e.target.value as ProductStatus)
                  }
                  className={`${inputCls} appearance-none pr-8`}
                >
                  <option value="Published">Published</option>
                  <option value="Draft">Draft</option>
                  <option value="Low Stock">Low Stock</option>
                  <option value="Out of Stock">Out of Stock</option>
                </select>
                <span className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 text-xs">
                  ▼
                </span>
              </div>
            </div>

            {/* Tags */}
            <div className={cardCls}>
              <div className="flex items-center justify-between mb-3">
                <h2 className="text-sm font-semibold text-gray-700">Tags</h2>
                <span className="text-xs text-[#b87ab8] font-medium cursor-pointer">
                  Add Tag
                </span>
              </div>

              <div className="mb-3">
                <input
                  type="text"
                  placeholder="Enter Tag Name..."
                  value={tagInput}
                  onChange={(e) => setTagInput(e.target.value)}
                  onKeyDown={(e) => {
                    if (e.key === "Enter") {
                      e.preventDefault();
                      addTag();
                    }
                  }}
                  className={inputCls}
                />
              </div>

              <div className="flex flex-wrap gap-2">
                {form.tags.map((tag, i) => (
                  <span
                    key={i}
                    className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-medium text-gray-600"
                    style={{
                      background: "#f5eaf5",
                      border: "1px solid #e8d0e8",
                    }}
                  >
                    {tag}
                    <button
                      onClick={() => removeTag(tag)}
                      className="text-gray-400 hover:text-gray-600"
                    >
                      <X className="w-3 h-3" />
                    </button>
                  </span>
                ))}
              </div>
            </div>

            {/* Summary */}
            <div className={cardCls}>
              <h2 className="text-sm font-semibold text-gray-700 mb-3">
                Summary
              </h2>
              <div className="space-y-2">
                {[
                  {
                    label: "Price",
                    value:
                      form.price !== ""
                        ? `৳${Number(form.price).toLocaleString()}`
                        : "—",
                  },
                  {
                    label: "After Discount",
                    value: discountedPrice ? `৳${discountedPrice}` : "—",
                  },
                  {
                    label: "Stock",
                    value: form.quantity !== "" ? String(form.quantity) : "0",
                  },
                  { label: "SKU", value: form.sku || "Auto" },
                  { label: "Variants", value: String(form.variants.length) },
                  { label: "Tags", value: String(form.tags.length) },
                ].map(({ label, value }) => (
                  <div
                    key={label}
                    className="flex justify-between items-center"
                  >
                    <span className="text-xs text-gray-400">{label}</span>
                    <span className="text-xs font-semibold text-gray-600">
                      {value}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* ══ Bottom Actions ══ */}
        <div className="flex justify-end gap-3 mt-2 pb-6">
          <button
            onClick={handleDiscard}
            className="px-6 py-2 rounded-lg text-sm font-medium text-gray-600 border border-[#e0d0e0] bg-white hover:bg-gray-50 transition-colors"
          >
            Cancel
          </button>
          <button
            onClick={handleSave}
            disabled={isUpdating}
            className="px-6 py-2 rounded-lg text-sm font-medium text-white transition-opacity hover:opacity-90 disabled:opacity-60"
            style={{ background: "#b87ab8" }}
          >
            {isUpdating ? "Saving..." : saved ? "✓ Saved!" : "Save"}
          </button>
        </div>
      </div>
    </div>
  );
}
