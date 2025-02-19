"use client";
import { useGlobal } from "@/app/context/GlobalContext";
import { apiManager } from "@/common/apiManager";
import { useEffect, useState } from "react";

export default function CostomizeProductModel({
  isModalOpen,
  partType,
  setIsModalOpen,
}) {
  const [isAnimating, setIsAnimating] = useState(false);
  const [data, setData] = useState([]);
  const [brands, setBrands] = useState([]);
  const [quantities, setQuantities] = useState({});
  const { handleAddToCart } = useGlobal();

  const fetchBrandsForProductType = () => {
    apiManager
      .get(`customer/brand/${partType}`)
      .then((data) => {
        setBrands(data);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const fetchPart = () => {
    apiManager
      .post(`customer/product`, {
        type: partType,
        search: {},
      })
      .then((data) => {
        setData(data);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  useEffect(() => {
    if (partType) {
      fetchBrandsForProductType();
    }
  }, [partType]);

  useEffect(() => {
    if (partType) {
      fetchPart();
    }
  }, [partType]);

  const openModal = () => {
    setIsModalOpen(true);
    setTimeout(() => setIsAnimating(true), 10);
  };

  const closeModal = () => {
    setIsAnimating(false);
    setTimeout(() => setIsModalOpen(false), 300);
  };

  useEffect(() => {
    const handleKeyDown = (event) => {
      if (event.key === "Escape") {
        closeModal();
      }
    };

    if (isModalOpen) {
      document.addEventListener("keydown", handleKeyDown);
    } else {
      document.removeEventListener("keydown", handleKeyDown);
    }

    return () => {
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [isModalOpen]);

  return (
    <div
      className={`fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50 transition-opacity duration-300 ease-out ${
        isModalOpen ? "opacity-100 visible" : "opacity-0 invisible"
      }`}
    >
      <div
        className={`bg-white p-6 z-50 h-[500px] scrollbar-hidden overflow-auto w-[700px] rounded-lg shadow-lg relative transform transition-all duration-300 ease-out ${
          isAnimating ? "scale-100 opacity-100" : "scale-95 opacity-100"
        }`}
      >
        {/* Close button */}
        <button
          onClick={closeModal}
          className="absolute top-4 right-5 text-2xl text-gray-500 hover:text-gray-800"
        >
          ✖
        </button>

        <div className="flex">
          <div className="overflow-auto w-[300px] pr-3 border-r border-[#c9c9c9]">
            <p className="text-base font-semibold text-gray-900">Brand</p>
            <div className="pt-1">
              {brands.map((item, i) => (
                <div
                  className="py-2.5 border-b border-[#c9c9c9] flex items-center justify-between"
                  key={i}
                >
                  <div className="flex items-center gap-x-3">
                    <div className="h-1 w-1 bg-black rounded-full"></div>
                    <p className="text-lg text-[#848484]">{item.name}</p>
                  </div>
                  <p>{`(${item?.productsByType?.[partType]})`}</p>
                </div>
              ))}
            </div>
          </div>
          <div className="sm:pt-10 pl-3">
            {data?.map((item, i) => {
              return (
                <div className="flex items-end gap-x-3 pb-3 mt-3 border-b border-[#e0e0e0]">
                  <img
                    src={item?.image}
                    alt=""
                    className="h-16 w-auto object-cover"
                  />
                  <div>
                    <p className="text-[#848484] text-lg">{item?.name}</p>
                    <div className="pt-2 flex justify-between">
                      <div className="space-x-2">
                        <input
                          type="number"
                          className="border outline-none text-center border-[#848484] py-1.5 rounded-md w-20 mt"
                          min="1"
                          max="10"
                          value={quantities[item?.id] || 1}
                          onChange={(e) =>
                            setQuantities({
                              ...quantities,
                              [item?.id]: Math.min(
                                Math.max(1, parseInt(e.target.value) || 1),
                                10
                              ),
                            })
                          }
                        />
                        <button
                          className="bg-orange-500 px-4 py-2 rounded-md text-white"
                          onClick={() =>
                            handleAddToCart(item?.id, quantities[item?.id] || 1)
                          }
                        >
                          Select
                        </button>
                      </div>
                      <div className="flex space-x-1">
                        <p className="text-orange-500 font-semibold underline">
                          ₹{item?.price}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}
