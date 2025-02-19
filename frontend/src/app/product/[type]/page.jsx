"use client";
import React, { useState, useEffect } from "react";
import WebLayout from "../../Layout/WebLayout";
import { LiaAngleDownSolid, LiaAngleUpSolid } from "react-icons/lia";
import { PiArrowUpRight, PiShoppingCart } from "react-icons/pi";
import Image from "next/image";
import Link from "next/link";
import { apiManager } from "@/common/apiManager";
import { ProductType } from "@/common/types";
import { useRouter, useSearchParams } from "next/navigation";

const FilterSection = ({ title, options, setFilters, filters }) => {
  const [isOpen, setIsOpen] = useState(false);

  const handleCheckboxChange = (option) => {
    setFilters((prevFilters) => {
      const currentOptions = prevFilters[title] || [];
      const updatedOptions = currentOptions.includes(option)
        ? currentOptions.filter((item) => item !== option)
        : [...currentOptions, option];

      const newFilters = {
        ...prevFilters,
        [title]: updatedOptions,
      };

      if (updatedOptions.length === 0) {
        delete newFilters[title];
      }

      return newFilters;
    });
  };

  return (
    <div className="border-b border-[#2B2A2966]">
      <button
        className="flex capitalize justify-between w-full px-4 py-3 text-left text-sm font-medium text-gray-800 hover:bg-gray-100"
        onClick={() => setIsOpen(!isOpen)}
      >
        <span>{title?.replaceAll("_", " ")}</span>
        <span>{isOpen ? <LiaAngleUpSolid /> : <LiaAngleDownSolid />}</span>
      </button>
      {isOpen && (
        <div className="px-4 py-2 space-y-2">
          {options.map(
            (option, index) =>
              option && (
                <label key={index} className="flex items-center space-x-2">
                  <input
                    type="checkbox"
                    className="form-checkbox"
                    checked={filters[title]?.includes(option) || false}
                    onChange={() => handleCheckboxChange(option)}
                  />
                  <span className="text-sm text-gray-600">{option}</span>
                </label>
              )
          )}
        </div>
      )}
    </div>
  );
};

const Laptop = (params) => {
  const searchParams = useSearchParams();
  const [filterData, setFilterData] = useState([]);
  const [laptops, setLaptops] = useState([]);
  const [filters, setFilters] = useState({});
  const router = useRouter();

  const keys = {
    laptop: "LAPTOP",
    desktop: "DESKTOP",
    "all-in-one": "ALL_IN_ONE",
    monitor: "MONITOR",
    printer: "PRINTER",
    "customize-product": "CUSTOM_PC",
    "pre-build-pc": "DESKTOP",
    "accessories-and-software": "ACCESSORY",
  };

  const fetchFilters = () => {
    apiManager
      .get(`customer/product/filters/${keys[params?.params?.type]}`)
      .then((data) => {
        console.log("Filter data:", data);
        setFilterData(data?.filters);
      })
      .catch((error) => {
        console.error("Error fetching filter data:", error);
      });
  };

  useEffect(() => {
    fetchFilters();
  }, []);

  const fetchLaptops = async () => {
    const formattedFilters = {};

    Object.entries(filters).forEach(([key, values]) => {
      if (values && values.length > 0) {
        formattedFilters[key.toLowerCase()] = values;
      }
    });

    console.log("formatted filters:", formattedFilters);

    await apiManager
      .post(`customer/product`, {
        type: keys[params?.params?.type],
        search: formattedFilters,
      })
      .then((data) => {
        console.log("Laptops data:", data);
        setLaptops(data);
      })
      .catch((error) => {
        console.error("Error fetching laptops:", error);
      });
  };

  useEffect(() => {
    fetchLaptops();
  }, [filters]);

  return (
    <WebLayout>
      <h1 className="pt-5 text-4xl capitalize font-black text-center pb-4 border-b border-[#CECECE] SF_Pro">
        {params.params.type}
      </h1>
      <div className="w-full max-w-[1200px] mx-auto pt-10 sm:px-0 px-4">
        <div className="grid sm:grid-cols-7 grid-cols-1 sm:gap-x-6 gap-y-4">
          <div className="bg-white rounded-lg shadow-sm col-span-2">
            {filterData.map((filter, index) => (
              <FilterSection
                filters={filters}
                setFilters={setFilters}
                key={index}
                title={filter.title}
                options={filter.options}
              />
            ))}
          </div>
          <div className="col-span-5 grid sm:grid-cols-2 gap-7">
            {laptops.map((item, i) => {
              return (
                <div
                  className="sm:h-[382px] cursor-pointer h-auto group w-auto relative bg-[#F6F6F6] rounded-[20px] sm:pr-3.5 pr-3 sm:pt-[57px] pt-5 sm:pl-[23px] pl-3 pb-[15px]"
                  key={i}
                  onClick={() => {
                    router.push(`/product/laptop/${item?.id}`);
                  }}
                >
                  <div className="flex justify-center">
                    <Image
                      src={item?.images?.[0]}
                      alt="Best Seller"
                      height={200}
                      width={300}
                      className="w-auto h-[190px] group-hover:scale-110 transition-all duration-300"
                    />
                  </div>
                  <div className="flex items-end justify-between">
                    <div>
                      <p className="pt-[22px] text-[#2B2A29] text-lg_40/6 font-bold">
                        {item?.name}
                      </p>
                      <p className="pt-[2px] text-[#2B2A29] text-sm_40/5">
                        Processor {item?.specs?.processor}
                      </p>
                      <p className="pt-4 text-xl_36 text-[#2B2A29] font-bold">
                        ₹ {item?.price}
                      </p>
                    </div>
                    <div className="sm:h-[80px] h-[30px] sm:w-[80px] w-auto bg-white flex justify-center items-center rounded-[20px]">
                      <Link
                        className="button-linear-gradient text-white cursor-pointer sm:h-[62px] sm:w-[62px] h-14 w-14 rounded-full flex justify-center items-center"
                        href="/laptop/product-details"
                      >
                        <PiShoppingCart size={24} />
                      </Link>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </WebLayout>
  );
};

export default Laptop;
