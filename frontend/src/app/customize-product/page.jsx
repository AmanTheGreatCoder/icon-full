"use client";
import React, { useState } from "react";
import { apiManager } from "@/common/apiManager";
import Image from "next/image";
import Link from "next/link";
import { useEffect } from "react";
import { PiPlus } from "react-icons/pi";
import WebLayout from "../Layout/WebLayout";

const customizeProduct = () => {
  const [products, setProducts] = useState([]);

  const fetchProducts = async () => {
    await apiManager
      .post(`customer/product`, {
        type: "CUSTOM_PC",
        search: {},
      })
      .then((data) => {
        setProducts(data);
      })
      .catch((error) => {
        console.error("Error fetching filter data:", error);
      });
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  return (
    <WebLayout>
      <div className="w-full max-w-[1200px] mx-auto sm:px-0 px-4 z-10">
        <div className="flex justify-center text-center pt-10">
          <div className="sm:max-w-[500px] w-auto">
            <h1 className="sm:w-full SF_Pro sm:text-4xl text-2xl text-[#2B2A29] font-semibold">
              Custom PC Configurator Choose Your Pc Parts!
            </h1>
            <p className="text-[#4D4D4D] text-sm pt-2">
              Lorem Ipsum is simply dummy text of the printing and typesetting
              industry. Lorem Ipsum has been the industry's standard dummy text
              ever since the 1500s.
            </p>
          </div>
        </div>
        <div className="sm:flex grid flex-wrap items-center gap-5 sm:pt-10 pt-7">
          {products?.map((item, i) => (
            <div
              className="h-auto w-auto bg-[#F6F6F6] rounded-[20px] pr-3.5 pt-2 pl-[23px] pb-[15px]"
              key={i}
            >
              <Image
                src={item?.images[0]}
                alt="Best Seller"
                height={200}
                width={300}
                className="w-auto h-[190px]"
              />
              <div className="flex items-end justify-between">
                <div>
                  <p className="pt-[22px] text-[#2B2A29] text-lg_40/6 font-bold SF_Pro">
                    {item?.name}
                  </p>
                  <p className="pt-[2px] text-[#2B2A29] text-sm_40/5">
                    {item?.stock}
                  </p>
                  <p className="pt-4 text-xl_36 text-[#2B2A29] font-bold">
                    ₹ {item?.price || "0.00"}
                  </p>
                </div>
                <Link
                  className="button-linear-gradient text-white cursor-pointer h-[50px] w-[50px] rounded-full flex justify-center items-center"
                  href="/customize-product/customize-product-details"
                >
                  <PiPlus size={24} />
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>
    </WebLayout>
  );
};

export default customizeProduct;
