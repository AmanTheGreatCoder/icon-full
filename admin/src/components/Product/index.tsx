"use client";
import { apiManager } from "@/common/apiManager";
import axios from "axios";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import ProductForm from "./form";

const Products = () => {
  const [products, setProducts] = useState([]);
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [editForm, setEditForm] = useState(false);

  const [mode, setMode] = useState("add"); // 'add' or 'edit'
  const [selectedProduct, setSelectedProduct] = useState(null);

  const handleAddProduct = async (formData) => {
    try {
      console.log("formdata", formData);
      const data = await axios.post(
        `${process.env.NEXT_PUBLIC_API_URL}/admin/product`,
        {
          name: formData?.name,
          sku: formData?.sku,
          description: formData?.description,
          type: formData?.type,
          price: formData?.price,
          brandId: formData?.brandId,
          categoryId: formData?.categoryId,
          published: formData?.published,
          featured: formData?.featured,
          stock: formData?.stock,
          images: formData?.images || [],
          specs: formData?.specs || {},
        },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        },
      );

      if (data) {
        toast.success("Product added successfully.");
        toggleAddForm();
        fetchProducts();
      }
    } catch (err) {
      toast.error(err?.response?.data?.message || "Something went wrong");
    }
  };

  const handleEditProduct = async (formData) => {
    try {
      const data = await axios.patch(
        `${process.env.NEXT_PUBLIC_API_URL}/admin/product/${formData?.id}`,
        {
          name: formData?.name,
          sku: formData?.sku,
          description: formData?.description,
          price: formData?.price,
          brand: formData?.brand,
          category: formData?.category,
          published: formData?.published,
          featured: formData?.featured,
          stock: formData?.stock,
          images: formData?.images,
          specs: formData?.specs,
        },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        },
      );
      if (data) {
        toast.success("Product edited successfully");
        toggleEditForm(null);
        fetchProducts();
      }
    } catch (err) {
      toast.error(err?.response?.data?.message || "Something went wrong");
    }
  };

  const handleFormSubmit = (formData) => {
    if (mode === "add") {
      handleAddProduct(formData);
    } else {
      handleEditProduct(formData);
    }
  };

  const fetchProducts = async () => {
    try {
      const response = await axios.get(
        `${process.env.NEXT_PUBLIC_API_URL}/admin/product`,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        },
      );
      console.log(response?.data?.data);
      setProducts(response?.data?.data);
    } catch (error: any) {
      if (error?.response?.status === 401) {
        localStorage.removeItem("token");
        window.location.href = "/auth/signin";
      }
      console.error("Error fetching products:", error);
    }
  };

  const handleDelete = async (id: any) => {
    const response = await axios.delete(
      `${process.env.NEXT_PUBLIC_API_URL}/admin/product/${id}`,
      {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      },
    );
    if (response?.data?.data) {
      toast.success(response?.data?.message);
      fetchProducts();
    }
  };

  const toggleAddForm = () => {
    setSelectedProduct(null);
    setMode("add");
    setIsFormOpen(!isFormOpen);
  };

  const toggleEditForm = (product: any) => {
    setSelectedProduct(!editForm === false ? null : product);
    setMode("edit");
    setIsFormOpen(!isFormOpen);
    setEditForm(!editForm);
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  const handleImageUpload = async (e: any) => {
    const file = e.target.files?.[0];
    if (file) {
      const formData = new FormData();
      formData.append("image", file);
      try {
        const response = await axios.post(
          `${process.env.NEXT_PUBLIC_API_URL}/admin/upload/`,
          formData,
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
          },
        );
        const data = await response.data;
        setSelectedProduct({
          ...selectedProduct,
          images: [...selectedProduct.images, data.data],
        });
        console.log("Image uploaded successfully:", data);
      } catch (error) {
        console.error("Error uploading image:", error);
      }
    }
  };

  return (
    <div className="rounded-sm border border-stroke bg-white p-6 shadow-default dark:border-strokedark dark:bg-boxdark">
      <h4 className="mb-4 text-xl font-semibold text-black dark:text-white">
        All Products List
      </h4>
      <button
        onClick={toggleAddForm}
        className="mr-2 rounded bg-green-500 px-3 py-1 text-white hover:bg-green-600"
      >
        Add
      </button>
      <table className="w-full border-collapse border border-stroke dark:border-strokedark">
        <thead>
          <tr className="bg-gray-100 dark:bg-strokedark">
            <th className="border border-stroke px-4 py-2 dark:border-strokedark">
              Name
            </th>
            <th className="border border-stroke px-4 py-2 dark:border-strokedark">
              Type
            </th>
            <th className="border border-stroke px-4 py-2 dark:border-strokedark">
              Category
            </th>
            <th className="border border-stroke px-4 py-2 dark:border-strokedark">
              Stock
            </th>
            <th className="border border-stroke px-4 py-2 dark:border-strokedark">
              Price
            </th>
            <th className="border border-stroke px-4 py-2 dark:border-strokedark">
              Brand
            </th>
            <th className="border border-stroke px-4 py-2 dark:border-strokedark">
              Actions
            </th>
          </tr>
        </thead>
        <tbody>
          {products?.map((product: any, key: number) => (
            <tr key={key} className="hover:bg-gray-50 dark:hover:bg-strokedark">
              <td className="border border-stroke px-4 py-2 dark:border-strokedark">
                {product?.name}
              </td>
              <td className="border border-stroke px-4 py-2 dark:border-strokedark">
                {product?.type}
              </td>
              <td className="border border-stroke px-4 py-2 dark:border-strokedark">
                {product?.category?.name}
              </td>
              <td className="border border-stroke px-4 py-2 dark:border-strokedark">
                {product?.stock}
              </td>
              <td className="border border-stroke px-4 py-2 dark:border-strokedark">
                {product?.price}
              </td>
              <td className="border border-stroke px-4 py-2 dark:border-strokedark">
                {product?.brand?.name}
              </td>
              <td className="space-y-5 border border-stroke px-4 py-2 text-center dark:border-strokedark">
                <button
                  onClick={() => {
                    toggleEditForm(product);
                  }}
                  className="mr-2 rounded bg-blue-500 px-3 py-1 text-white hover:bg-blue-600"
                >
                  Edit
                </button>
                <button
                  onClick={() => handleDelete(product?.id)}
                  className="rounded bg-red-500 px-3 py-1 text-white hover:bg-red-600"
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <ProductForm
        isOpen={isFormOpen}
        mode={mode}
        selectedProduct={selectedProduct}
        onClose={() => setIsFormOpen(false)}
        onSubmit={handleFormSubmit}
      />
    </div>
  );
};

export default Products;
