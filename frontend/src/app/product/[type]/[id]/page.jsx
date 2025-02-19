"use client";
import React, { useEffect, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, Autoplay } from "swiper/modules";
import WebLayout from "../../../Layout/WebLayout";
import Image from "next/image";
import {
  PiArrowRight,
  PiPlus,
  PiShoppingCart,
  PiStarFill,
} from "react-icons/pi";
import { LiaAngleDownSolid, LiaAngleUpSolid } from "react-icons/lia";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/autoplay";
import { apiManager } from "@/common/apiManager";
import { useRouter } from "next/navigation";
import { useGlobal } from "@/app/context/GlobalContext";

const ProductDetails = (params) => {
  const [openStates, setOpenStates] = useState({});
  const [product, setProduct] = useState({});
  const [products, setProducts] = useState([]);
  const router = useRouter();
  const { handleAddToCart } = useGlobal();

  const fetchLaptops = () => {
    apiManager
      .post(`customer/product`, {
        type: "LAPTOP",
        search: {},
      })
      .then((data) => {
        setProducts(data);
      })
      .catch((error) => {
        console.error("Error fetching laptops:", error);
      });
  };

  useEffect(() => {
    fetchLaptops();
  }, []);

  const fetchProductDetails = () => {
    apiManager
      .get(`customer/product/${params?.params?.id}`)
      .then((data) => {
        console.log("Product details:", data);
        setProduct(data);
      })
      .catch((error) => {
        console.error("Error fetching product details:", error);
      });
  };

  const toggleDescription = (id) => {
    setOpenStates((prev) => ({
      ...prev,
      [id]: !prev[id],
    }));
  };

  const Bank = [
    "/assets/images/bank-1.png",
    "/assets/images/bank-2.png",
    "/assets/images/bank-3.png",
    "/assets/images/bank-4.png",
    "/assets/images/bank-5.png",
  ];

  const details = [
    {
      title: "Processor",
      first_details: "Intel Evo Core Ultra 9 Processor",
      Second_details: "",
      third_details: "",
    },
    {
      title: "RAM",
      first_details: "Intel Evo Core Ultra 9 Processor",
      Second_details: "",
      third_details: "",
    },
    {
      title: "Storage",
      first_details: "Intel Evo Core Ultra 9 Processor",
      Second_details: "",
      third_details: "",
    },
    {
      title: "Screen Size",
      first_details: "Intel Evo Core Ultra 9 Processor",
      Second_details: "",
      third_details: "",
    },
    {
      title: "Screen Type",
      first_details: "Intel Evo Core Ultra 9 Processor",
      Second_details: "",
      third_details: "",
    },
    {
      title: "Graphics Card",
      first_details: "Intel Evo Core Ultra 9 Processor",
      Second_details: "",
      third_details: "",
    },
    {
      title: "OS",
      first_details: "Intel Evo Core Ultra 9 Processor",
      Second_details: "",
      third_details: "",
    },
    {
      title: "Include Software",
      first_details: "Intel Evo Core Ultra 9 Processor",
      Second_details: "",
      third_details: "",
    },
    {
      title: "Warranty",
      first_details: "Intel Evo Core Ultra 9 Processor",
      Second_details: "",
      third_details: "",
    },
    {
      title: "Slots",
      first_details: "Intel Evo Core Ultra 9 Processor",
      Second_details: "",
      third_details: "",
    },
    {
      title: "Sales Package",
      first_details: "Intel Evo Core Ultra 9 Processor",
      Second_details: "",
      third_details: "",
    },
  ];

  const Service = [
    {
      image: "/assets/images/details-service-1.png",
      title: "Free Shipping",
      content:
        "Lorem Ipsum is simply dummy text of the printing and typesetting industry. ",
    },
    {
      image: "/assets/images/details-service-2.png",
      title: "Easy Returns",
      content:
        "Lorem Ipsum is simply dummy text of the printing and typesetting industry. ",
    },
    {
      image: "/assets/images/details-service-3.png",
      title: "Secure Checkout",
      content:
        "Lorem Ipsum is simply dummy text of the printing and typesetting industry. ",
    },
    {
      image: "/assets/images/details-service-4.png",
      title: "Ontime Delivery",
      content:
        "Lorem Ipsum is simply dummy text of the printing and typesetting industry. ",
    },
  ];

  useEffect(() => {
    fetchProductDetails();
  }, []);

  return (
    <WebLayout>
      <div className="pt-10">
        <div className="w-full max-w-[1200px] mx-auto sm:px-0 px-4">
          <div className="grid sm:grid-cols-2 grid-cols-1 sm:gap-x-8">
            <div>
              <div className="border border-[#CACACA] p-8">
                <Image
                  src={product?.images?.[0]}
                  alt="product-details"
                  height={700}
                  width={800}
                  className="w-auto sm:h-[370px] h-[200px]"
                />
              </div>
              <div className="sm:grid grid-cols-4 flex overflow-x-auto gap-3 pt-7">
                {product?.images?.map((item, i) => (
                  <Image
                    src={item}
                    alt="product-details"
                    height={200}
                    width={200}
                    className="w-auto h-[140px]"
                    key={i}
                  />
                ))}
              </div>
            </div>
            <div>
              <h1 className="sm:text-4xl text-2xl pt-4 font-extrabold SF_Pro">
                {product?.name}
              </h1>
              <p className="sm:pt-4 pt-2 text-[#232323] text-base">
                {product?.description}
              </p>
              <div className="text-[#FDCE15] pt-5 flex gap-x-[5px]">
                <PiStarFill size={20} />
                <PiStarFill size={20} />
                <PiStarFill size={20} />
                <PiStarFill size={20} />
                <PiStarFill size={20} />
              </div>
              <h3 className="flex items-end gap-x-2.5 text-[30px] pt-2.5 leading-[30px] font-bold SF_Pro">
                {product?.price}
                <p className="text-sm text-[#8B8B8B] font-normal SF_Pro">
                  (inc. of All taxes)
                </p>
              </h3>
              <div className="flex items-center gap-x-[15px] pt-2.5">
                <del className="text-xl text-[#8B8B8B] font-normal SF_Pro">
                  ₹100,990.00
                </del>
                <p className="text-base text-[#8B8B8B] sm:hidden block SF_Pro sm:pt-2.5">
                  Includes GST ₹11,746
                </p>
                <button className="px-5 sm:block hidden py-2.5 button-linear-gradient text-base_40/5 font-medium text-white rounded-full SF_Pro">
                  Save ₹20,000.00 (10%)
                </button>
              </div>
              <p className="text-base text-[#8B8B8B] sm:block hidden SF_Pro pt-2.5">
                Includes GST ₹11,746
              </p>
              <button className="px-5 sm:hidden block py-2.5 mt-2 button-linear-gradient text-base_40/5 font-medium text-white rounded-full SF_Pro">
                Save ₹20,000.00 (10%)
              </button>

              <div className="pt-6 grid sm:grid-cols-2 grid-cols-1 gap-4">
                <div className="p-4 border rounded-lg shadow-sm bg-white">
                  <h2 className="text-base mb-4 text-[#232323]">
                    Credit Card EMI Options
                  </h2>
                  <div className="flex flex-wrap gap-1">
                    {/* Bank Logos */}
                    {Bank.map((item, i) => (
                      <Image
                        src={item}
                        alt="Bank of Baroda"
                        height={40}
                        width={40}
                        className="w-12 h-12 object-contain"
                        key={i}
                      />
                    ))}
                  </div>
                  <div className="flex items-center gap-2 text-[#232323] pt-3 cursor-pointer">
                    <span className="text-xs">View All</span>
                    <PiArrowRight />
                  </div>
                </div>
                <div className="p-4 border rounded-lg shadow-sm bg-white">
                  <h2 className="text-base mb-4 text-[#232323]">
                    Credit Card EMI Options
                  </h2>
                  <div className="flex flex-wrap gap-1">
                    {/* Bank Logos */}
                    {Bank.map((item, i) => (
                      <Image
                        src={item}
                        alt="Bank of Baroda"
                        height={40}
                        width={40}
                        className="w-12 h-12 object-contain"
                        key={i}
                      />
                    ))}
                  </div>
                  <div className="flex items-center gap-2 text-[#232323] pt-3 cursor-pointer">
                    <span className="text-xs">View All</span>
                    <PiArrowRight />
                  </div>
                </div>
                <div className="p-4 border rounded-lg shadow-sm bg-white">
                  <h2 className="text-base mb-4 text-[#232323]">
                    Credit Card EMI Options
                  </h2>
                  <div className="flex flex-wrap gap-1">
                    {/* Bank Logos */}
                    {Bank.map((item, i) => (
                      <Image
                        src={item}
                        alt="Bank of Baroda"
                        height={40}
                        width={40}
                        className="w-12 h-12 object-contain"
                        key={i}
                      />
                    ))}
                  </div>
                  <div className="flex items-center gap-2 text-[#232323] pt-3 cursor-pointer">
                    <span className="text-xs">View All</span>
                    <PiArrowRight />
                  </div>
                </div>
              </div>

              <div className="pt-5 grid gap-y-3">
                <button
                  onClick={() => handleAddToCart(product?.id, 1)}
                  className="py-3 w-full text-base_40/5 font-medium capitalize bg-[#ECECEC] text-[#232323] rounded-[10px] SF_Pro"
                >
                  Add to cart
                </button>
                <button
                  onClick={() => {
                    handleAddToCart(product?.id, 1);
                    router.push("/checkout");
                  }}
                  className="py-3 w-full text-base_40/5 font-medium bg-[#00A0E3] capitalize text-[#232323] rounded-[10px] SF_Pro"
                >
                  Buy now
                </button>
                <button className="py-3 w-full text-base_40/5 font-medium bg-[#ECECEC] text-[#232323] capitalize rounded-[10px] SF_Pro">
                  live to demo
                </button>
              </div>

              <div className="pt-5 grid gap-y-[26px]">
                {console.log("product specss", product, product?.specs)}
                {product?.specs && (
                  <div className="border border-[#CDCDCD] rounded-md rounded-tr-md">
                    <button
                      onClick={() => toggleDescription("item1")}
                      className="px-4 flex justify-between items-center text-base py-2 bg-[#ECECEC] text-[#232323]  w-full rounded-md transition"
                    >
                      Product Specifications
                      <span>
                        {openStates["item1"] ? (
                          <LiaAngleUpSolid />
                        ) : (
                          <LiaAngleDownSolid />
                        )}
                      </span>
                    </button>

                    <div
                      className={`text-gray-700 transition-all duration-300 ${
                        openStates["item1"]
                          ? "max-h-screen opacity-100"
                          : "max-h-0 overflow-hidden opacity-0"
                      }`}
                    >
                      <div className="">
                        {Object.keys(product?.specs)?.map((key, i) => (
                          <div
                            className="sm:flex justify-between py-2 px-4 border-b border-[#CDCDCD]"
                            key={i}
                          >
                            <p className="capitalize">
                              {key?.replaceAll("_", " ")}
                            </p>
                            <p>{product?.specs[key]}</p>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
          <div className="pt-9">
            <h3 className="text-lg pb-2.5 border-b border-[#C6C6C6] font-semibold text-[#2B2B2B]">
              Compare With Others
            </h3>
            <div className="mt-7 border border-[#CDCDCD] grid overflow-x-auto sm:grid-cols-4 grid-cols-1 py-4 sm:gap-x-9 sm:px-10 px-5">
              <div></div>
              <div className="border border-[#CACACA4D] p-4 flex justify-center">
                <Image
                  src="/assets/images/best-saller.png"
                  alt=""
                  height={200}
                  width={200}
                  className="w-auto h-[130px]"
                />
              </div>
              <div className="border border-[#CACACA4D] cursor-pointer p-4 flex justify-center items-center">
                <PiPlus size={30} />
              </div>
              <div className="border border-[#CACACA4D] p-4 cursor-pointer flex justify-center items-center">
                <PiPlus size={30} />
              </div>
            </div>
            {details.map((item, i) => (
              <div
                className="border-x border-b overflow-x-auto border-[#CDCDCD] sm:grid grid-cols-4"
                key={i}
              >
                <div className="sm:py-2.5 py-1.5 text-sm pl-2">
                  <p>{item.title || "-"}</p>
                </div>
                <div className="border-l text-sm sm:text-center sm:py-2.5 py-1.5 pl-2 border-[#CDCDCD]">
                  <p>{item.first_details || "-"}</p>
                </div>
                <div className="border-l sm:text-center text-sm sm:py-2.5 py-1.5 pl-2 border-[#CDCDCD]">
                  <p>{item.Second_details || "-"}</p>
                </div>
                <div className="border-l sm:text-center text-sm sm:py-2.5 py-1.5 pl-2 border-[#CDCDCD]">
                  <p>{item.third_details || "-"}</p>
                </div>
              </div>
            ))}
          </div>

          {/* service block */}
          <div className="sm:pt-[130px] pt-10">
            <div className="w-ful grid sm:grid-cols-4 grid-cols-2 sm:gap-11 gap-5">
              {Service.map((item, i) => (
                <div className="" key={i}>
                  <div className="flex justify-center">
                    <Image
                      src={item.image}
                      alt="service"
                      height={60}
                      width={60}
                      className="w-auto h-[35px]"
                    />
                  </div>
                  <p className="sm:pt-[30px] pt-3 font-bold text-[#2B2A29] sm:text-lg_40/7 text-md_40 text-center SF_Pro">
                    {item.title}
                  </p>
                  <div className="flex justify-center ">
                    <p className="sm:pt-[17px] pt-1 text-[#2B2A29] sm:text-base_40/6 text-sm_40/5 max-w-[330px] text-center">
                      {item.content}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="pt-16 relative">
            <h3 className="text-4xl text-center font-semibold">
              Similar Products
            </h3>
            {/* Swiper Section */}
            <Swiper
              modules={[Navigation, Pagination, Autoplay]}
              spaceBetween={20}
              slidesPerView={1}
              pagination={{ clickable: true }}
              autoplay={{ delay: 3000 }}
              breakpoints={{
                640: { slidesPerView: 1 },
                768: { slidesPerView: 2 },
                1024: { slidesPerView: 4 },
              }}
              className="pt-7"
            >
              {products.map((item, i) => (
                <SwiperSlide key={i}>
                  <div className="h-[382px] w-auto bg-white rounded-[20px] pr-3.5 pt-[57px] pl-[23px] pb-[15px]">
                    <Image
                      src={item.image}
                      alt="Similar Product"
                      height={200}
                      width={300}
                      className="w-auto h-[170px]"
                    />
                    <div className="flex items-end justify-between">
                      <div>
                        <p className="pt-[22px] text-[#2B2A29] text-lg_40/6 font-bold SF_Pro">
                          {item.name}
                        </p>
                        <p className="pt-[2px] text-[#2B2A29] text-sm_40/5">
                          Processor {item.Processor}
                        </p>
                        <p className="pt-4 text-xl_36 text-[#2B2A29] font-bold">
                          ₹ {item.price}
                        </p>
                      </div>
                      <div className="button-linear-gradient text-white cursor-pointer h-[50px] w-[52px] rounded-full flex justify-center items-center">
                        <PiShoppingCart size={24} />
                      </div>
                    </div>
                  </div>
                </SwiperSlide>
              ))}
            </Swiper>
          </div>
        </div>
      </div>
    </WebLayout>
  );
};

export default ProductDetails;
