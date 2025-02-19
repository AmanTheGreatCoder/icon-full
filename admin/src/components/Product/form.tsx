import { useState, useEffect } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { apiManager } from "@/common/apiManager";

const ProductForm = ({ mode, selectedProduct, isOpen, onClose, onSubmit }) => {
  const initialFormState = {
    name: "",
    price: "",
    stock: 0,
    type: "",
    categoryId: "",
    brandId: "",
    description: "",
    specs: {},
    images: [],
  };
  const [specEntries, setSpecEntries] = useState<
    { key: string; value: string }[]
  >(
    Object.entries(selectedProduct?.specs || {}).map(([key, value]) => ({
      key,
      value: String(value),
    })),
  );
  const [formData, setFormData] = useState(initialFormState);
  const [categories, setCategories] = useState([]);
  const [brands, setBrands] = useState([]);
  const [isUploading, setIsUploading] = useState(false);

  const fetchCategories = async () => {
    try {
      const data = await apiManager.get("/admin/category");
      if (data) {
        setCategories(data);
      }
    } catch (error) {
      toast.error(
        error?.response?.data?.message || "Failed to fetch categories",
      );
    }
  };

  const fetchBrands = async () => {
    try {
      const data = await apiManager.get("/admin/brand");
      if (data) {
        setBrands(data);
      }
    } catch (error) {
      apiManager;
      toast.error(error?.response?.data?.message || "Failed to fetch brands");
    }
  };

  useEffect(() => {
    if (selectedProduct) {
      setFormData(selectedProduct);
      setSpecEntries(
        Object.entries(selectedProduct.specs).map(([key, value]) => ({
          key,
          value: String(value),
        })),
      );
    } else {
      setFormData(initialFormState);
      setSpecEntries([]);
    }
  }, [selectedProduct, isOpen]);

  useEffect(() => {
    fetchCategories();
    fetchBrands();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    console.log("value", value);
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleImageUpload = async (e) => {
    const files = e.target.files;
    if (files && files.length > 0) {
      try {
        setIsUploading(true);
        const uploadPromises = Array.from(files).map(async (file: File) => {
          const formData = new FormData();
          formData.append("file", file);
          const data = await apiManager.post("/admin/upload/file", formData, {
            headers: { "Content-Type": "multipart/form-data" },
          });
          return data.secure_url;
        });

        const uploadedUrls = await Promise.all(uploadPromises);

        setFormData((prev) => ({
          ...prev,
          images: [...prev.images, ...uploadedUrls],
        }));

        toast.success(`${files.length} images uploaded successfully`);
      } catch (error) {
        console.error("Error uploading images:", error);
        toast.error(
          error?.response?.data?.message || "Failed to upload images",
        );
      } finally {
        setIsUploading(false);
      }
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(formData);
  };

  const categorySelect = (
    <select
      className="w-full rounded border-[1.5px] border-stroke bg-transparent px-5 py-3 text-black outline-none transition focus:border-primary dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
      value={selectedProduct?.category?.id}
      name="categoryId"
      onChange={handleChange}
    >
      <option value="">Select a Category</option>
      {categories.map((category) => (
        <option key={category.id} value={category.id}>
          {category.name}
        </option>
      ))}
    </select>
  );

  const brandSelect = (
    <select
      className="w-full rounded border-[1.5px] border-stroke bg-transparent px-5 py-3 text-black outline-none transition focus:border-primary dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
      value={selectedProduct?.brand?.id}
      name="brandId"
      onChange={handleChange}
    >
      <option value="">Select a Brand</option>
      {brands.map((brand) => (
        <option key={brand.id} value={brand.id}>
          {brand.name}
        </option>
      ))}
    </select>
  );

  const handleSpecChange = (
    index: number,
    field: "key" | "value",
    newValue: string,
  ) => {
    const updatedEntries = [...specEntries];
    updatedEntries[index][field] = newValue;
    setSpecEntries(updatedEntries);

    // Convert entries to specs object
    const specs = updatedEntries.reduce((acc, entry) => {
      if (entry.key.trim()) {
        acc[entry.key.trim()] = entry.value.trim();
      }
      return acc;
    }, {});

    setFormData((prev) => ({ ...prev, specs }));
  };

  // Add new spec field
  const addSpecField = () => {
    setSpecEntries([...specEntries, { key: "", value: "" }]);
  };

  // Remove spec field
  const removeSpecField = (index: number) => {
    setSpecEntries(specEntries.filter((_, i) => i !== index));
  };

  if (isOpen === false) {
    return;
  }

  console.log("selected product", selectedProduct);

  return (
    <div
      className={`no-scrollbar fixed right-0 top-0 z-999 h-full w-[30%] overflow-auto bg-white shadow-lg transition-transform duration-300 dark:bg-boxdark ${
        mode ? "translate-x-0" : "translate-x-full"
      }`}
    >
      <div className="border-b border-stroke px-6.5 py-4 dark:border-strokedark">
        <h3 className="font-medium text-black dark:text-white">
          {mode === "add" ? "Add Product Form" : "Edit Product Form"}
        </h3>
        <button
          onClick={onClose}
          className="absolute right-4 top-4 text-gray-500 hover:text-black"
        >
          Close
        </button>
      </div>
      <form onSubmit={handleSubmit}>
        <div className="p-6.5">
          <div className="mb-4.5 w-full">
            <label className="mb-3 block text-sm font-medium text-black dark:text-white">
              Product name
            </label>
            <input
              type="text"
              name="name"
              value={formData?.name}
              onChange={handleChange}
              placeholder="Enter product name"
              className="w-full rounded border-[1.5px] border-stroke bg-transparent px-5 py-3 text-black outline-none transition focus:border-primary dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
            />
          </div>
          <div className="mb-4.5">
            <label className="mb-3 block text-sm font-medium text-black dark:text-white">
              Price
            </label>
            <input
              type="text"
              name="price"
              value={formData?.price}
              onChange={handleChange}
              placeholder="Enter product price"
              className="w-full rounded border-[1.5px] border-stroke bg-transparent px-5 py-3 text-black outline-none transition focus:border-primary dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
            />
          </div>
          <div className="mb-4.5">
            <label className="mb-3 block text-sm font-medium text-black dark:text-white">
              Stock
            </label>
            <input
              type="number"
              name="stock"
              value={formData?.stock}
              onChange={handleChange}
              placeholder="Enter stock"
              className="w-full rounded border-[1.5px] border-stroke bg-transparent px-5 py-3 text-black outline-none transition focus:border-primary dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
            />
          </div>
          <div className="mb-4.5">
            <label className="mb-3 block text-sm font-medium text-black dark:text-white">
              Product Type
            </label>
            <select
              name="type"
              value={formData?.type}
              onChange={handleChange}
              className="w-full rounded border-[1.5px] border-stroke bg-transparent px-5 py-3 text-black outline-none transition focus:border-primary dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
            >
              <option value="">Select Product Type</option>
              <option value="LAPTOP">LAPTOP</option>
              <option value="PRINTER">PRINTER</option>
              <option value="MONITOR">MONITOR</option>
              <option value="ALL_IN_ONE">ALL_IN_ONE</option>
              <option value="DESKTOP">DESKTOP</option>
              <option value="CUSTOM_PC">CUSTOM_PC</option>
              <option value="ACCESSORY">ACCESSORY</option>
              <option value="MOTHERBOARD">MOTHERBOARD</option>
              <option value="PROCESSOR">PROCESSOR</option>
              <option value="RAM">RAM</option>
              <option value="SSD">SSD</option>
              <option value="HDD">HDD</option>
              <option value="CABINET">CABINET</option>
              <option value="FAN">FAN</option>
              <option value="GRAPHICS_CARD">GRAPHICS_CARD</option>
              <option value="SCREEN">SCREEN</option>
              <option value="KEYBOARD">KEYBOARD</option>
              <option value="MOUSE">MOUSE</option>
              <option value="PSU">PSU</option>
            </select>
          </div>
          <div className="mb-4.5">
            <label className="mb-3 block text-sm font-medium text-black dark:text-white">
              Category
            </label>
            <div>{categorySelect}</div>
          </div>
          <div className="mb-4.5">
            <label className="mb-3 block text-sm font-medium text-black dark:text-white">
              Brand
            </label>
            <div>{brandSelect}</div>
          </div>
          <div className="mb-6">
            <label className="mb-3 block text-sm font-medium text-black dark:text-white">
              Description
            </label>
            <textarea
              rows={6}
              name="description"
              value={formData?.description}
              onChange={handleChange}
              placeholder="Type your message"
              className="w-full rounded border-[1.5px] border-stroke bg-transparent px-5 py-3 text-black outline-none transition focus:border-primary dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
            ></textarea>
          </div>
          <div className="mb-6">
            <label className="mb-3 block text-sm font-medium text-black dark:text-white">
              Specifications
              <button
                type="button"
                onClick={addSpecField}
                className="ml-2 rounded bg-primary px-2 py-1 text-sm text-white hover:bg-opacity-90"
              >
                Add Specification
              </button>
            </label>

            {specEntries?.map((entry, index) => (
              <div key={index} className="mb-3 flex items-center gap-2">
                <input
                  type="text"
                  value={entry.key}
                  onChange={(e) =>
                    handleSpecChange(index, "key", e.target.value)
                  }
                  placeholder="Spec name"
                  className="w-full rounded border-[1.5px] border-stroke bg-transparent px-5 py-3 text-black outline-none transition focus:border-primary dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                />
                <input
                  type="text"
                  value={entry.value}
                  onChange={(e) =>
                    handleSpecChange(index, "value", e.target.value)
                  }
                  placeholder="Spec value"
                  className="w-full rounded border-[1.5px] border-stroke bg-transparent px-5 py-3 text-black outline-none transition focus:border-primary dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                />
                <button
                  type="button"
                  onClick={() => removeSpecField(index)}
                  className="px-2 text-xl text-red-500 hover:text-red-700"
                >
                  ×
                </button>
              </div>
            ))}
          </div>

          <div className="relative mb-6">
            <h3 className="mb-3 text-lg font-semibold text-black dark:text-white">
              Product Images
            </h3>
            <label className="mb-3 block text-sm font-medium text-black dark:text-white">
              Upload Images (Multiple)
            </label>
            <input
              type="file"
              accept="image/*"
              multiple
              onChange={handleImageUpload}
              disabled={isUploading}
              className="w-full rounded border-[1.5px] border-stroke bg-transparent px-5 py-3 text-black outline-none transition focus:border-primary disabled:opacity-50"
            />

            {isUploading && (
              <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-20">
                <div className="h-12 w-12 animate-spin rounded-full border-b-2 border-white"></div>
                <span className="ml-2 text-white">Uploading...</span>
              </div>
            )}

            <div className="mt-4 grid grid-cols-3 gap-2">
              {formData?.images?.map((image, index) => (
                <div key={index} className="group relative">
                  <img
                    src={image}
                    alt={`Product image ${index + 1}`}
                    className="h-24 w-full rounded border object-cover"
                  />
                  <button
                    type="button"
                    onClick={() => {
                      setFormData((prev) => ({
                        ...prev,
                        images: prev.images.filter((_, i) => i !== index),
                      }));
                    }}
                    className="absolute right-1 top-1 rounded-full bg-red-500 p-1 text-white opacity-0 transition-opacity group-hover:opacity-100"
                  >
                    ×
                  </button>
                </div>
              ))}
            </div>
          </div>

          <button
            type="submit"
            className="flex w-full justify-center rounded-md bg-primary p-3 font-medium text-gray hover:bg-opacity-90"
          >
            {mode === "add" ? "Add Product" : "Save Product"}
          </button>
        </div>
      </form>
    </div>
  );
};

export default ProductForm;
