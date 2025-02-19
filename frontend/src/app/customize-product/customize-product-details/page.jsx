"use client";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import { PiPlus } from "react-icons/pi";
import CostomizeProductModel from "../../Component/customize/CostomizeProductModel";
import WebLayout from "../../Layout/WebLayout";
import { useGlobal } from "../../context/GlobalContext";
import { apiManager } from "@/common/apiManager";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";

const customizeProductDetails = () => {
  const { handleAddToCart, fetchCart, cart } = useGlobal();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [customPc, setCustomPc] = useState([]);
  const [partType, setPartType] = useState("");
  const router = useRouter();

  const getComponentDetails = (type) => {
    const items = cart?.items?.filter((item) => item?.product?.type === type);
    const name = items?.length > 0 ? items[0]?.product?.name : `Select ${type}`;
    const price = items
      ?.reduce((total, item) => total + parseFloat(item?.product?.price), 0)
      .toFixed(2);
    return { name, price };
  };

  useEffect(() => {
    setCustomPc([
      {
        image: "/assets/images/Processor.png",
        name: getComponentDetails("PROCESSOR").name,
        type: "MOTHERBOARD",
        price: getComponentDetails("PROCESSOR").price,
      },
      {
        image: "/assets/images/Motherboard.png",
        name: getComponentDetails("MOTHERBOARD").name,
        type: "MOTHERBOARD",
        price: getComponentDetails("MOTHERBOARD").price,
      },
      {
        image: "/assets/images/ram.png",
        name: getComponentDetails("RAM").name,
        type: "RAM",
        price: getComponentDetails("RAM").price,
      },
      {
        image: "/assets/images/hdd.png",
        name: getComponentDetails("HDD").name,
        type: "HDD",
        price: getComponentDetails("HDD").price,
      },
      {
        image: "/assets/images/ssd.png",
        name: getComponentDetails("SSD").name,
        type: "SSD",
        price: getComponentDetails("SSD").price,
      },
      {
        image: "/assets/images/cabinet.png",
        name: getComponentDetails("CABINET").name,
        type: "CABINET",
        price: getComponentDetails("CABINET").price,
      },
      {
        image: "/assets/images/fan.png",
        name: getComponentDetails("FAN").name,
        type: "FAN",
        price: getComponentDetails("FAN").price,
      },
      {
        image: "/assets/images/version.png",
        name: getComponentDetails("WINDOWS").name,
        type: "WINDOWS",
        price: getComponentDetails("WINDOWS").price,
      },
      {
        image: "/assets/images/card.png",
        name: getComponentDetails("GPU").name,
        type: "GPU",
        price: getComponentDetails("GPU").price,
      },
      {
        image: "/assets/images/unit.png",
        name: getComponentDetails("PSU").name,
        type: "PSU",
        price: getComponentDetails("PSU").price,
      },
      {
        image: "/assets/images/moniter.png",
        name: getComponentDetails("MONITOR").name,
        type: "MONITOR",
        price: getComponentDetails("MONITOR").price,
      },
      {
        image: "/assets/images/keyboard.png",
        name: getComponentDetails("KEYBOARD").name,
        type: "KEYBOARD",
        price: getComponentDetails("KEYBOARD").price,
      },
      {
        image: "/assets/images/mouse.png",
        name: getComponentDetails("MOUSE").name,
        type: "MOUSE",
        price: getComponentDetails("MOUSE").price,
      },
      {
        image: "/assets/images/accessories.png",
        name: getComponentDetails("ACCESSORY").name,
        type: "ACCESSORY",
        price: getComponentDetails("ACCESSORY").price,
      },
    ]);
  }, [cart]);

  const icon = [
    "/assets/images/send-2.svg",
    "/assets/images/sms.svg",
    "/assets/images/printer.svg",
    "/assets/images/document-download.svg",
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

  return (
    <WebLayout>
      <div className="w-full max-w-[1200px] mx-auto sm:px-0 px-4 z-10">
        <div className="flex justify-center text-center pt-10">
          <div className="sm:max-w-[500px] w-auto">
            <h1 className="sm:w-full SF_Pro sm:text-4xl text-2xl text-[#2B2A29] font-semibold">
              Choose Your Pc Parts!
            </h1>
            <p className="text-[#4D4D4D] text-sm pt-2">
              Lorem Ipsum is simply dummy text of the printing and typesetting
              industry. Lorem Ipsum has been the industry's standard dummy text
              ever since the 1500s.
            </p>
          </div>
        </div>
        <div className="pt-10 sm:grid gap-x-8 sm:grid-cols-6 grid-cols-1">
          <div className="col-span-4 space-y-5">
            {customPc.map((item, i) => (
              <div key={i}>
                <div className="w-full bg-[#F6F6F6] border border-[#AEAEAE] rounded-[20px] p-5 flex justify-between">
                  <div className="flex gap-x-6">
                    <div className="w-[40px]">
                      <Image
                        src={item?.image}
                        alt=""
                        className="w-auto h-[40px]"
                        height={70}
                        width={70}
                      />
                    </div>
                    <div className="space-y-8">
                      <p className="text-xs text-[#2B2A29] font-semibold">
                        {item?.name}
                      </p>
                      <p className="text-xs text-[#2B2A29] font-semibold">
                        ₹ {item?.price || "0.00"}
                      </p>
                    </div>
                  </div>
                  <div className="flex items-end">
                    <Link
                      href="#"
                      onClick={(e) => {
                        e.preventDefault();
                        setPartType(item?.type);
                        setIsModalOpen(true);
                      }}
                      className="button-linear-gradient text-white cursor-pointer h-[40px] w-[40px] rounded-full flex justify-center items-center"
                    >
                      <PiPlus size={24} />
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>
          <div className="col-span-2 w-full sm:pt-0 pt-5">
            <div className="bg-[#F6F6F6] border border-[#AEAEAE] p-5 rounded-[20px]">
              <div className="space-y-3 pb-2.5 border-b  border-dashed border-[#B9B9B9]">
                <div className="flex items-center justify-between">
                  <p className="text-xs font-semibold text-[#2B2A29]">
                    Sub Total
                  </p>
                  <p className="text-xs text-[#2B2A29]">{cart?.totalAmount}</p>
                </div>
                <div className="flex items-center justify-between">
                  <p className="text-xs font-semibold text-[#2B2A29]">
                    Delivery
                  </p>
                  <p className="text-xs text-[#2B2A29]">Free</p>
                </div>
              </div>
              <div className="flex pt-3 items-center justify-between">
                <p className="text-xs font-semibold text-[#2B2A29]">Total</p>
                <p className="text-xs text-[#2B2A29] font-semibold">
                  {cart?.totalAmount}
                </p>
              </div>
              <div className="pt-6">
                <div
                  onClick={async (e) => {
                    e.preventDefault();
                    await handleAddToCart(
                      item?.product?.id,
                      item?.quantity + 1
                    );
                    router.push("/cart");
                  }}
                  className="py-3 block text-center w-full text-base font-medium bg-linear-gradient capitalize text-white rounded-[10px] SF_Pro"
                >
                  Add To Cart
                </div>
                <button
                  onClick={async (e) => {
                    e.preventDefault();
                    await apiManager.delete("customer/cart");
                    toast.success("Product removed from cart successfully!");
                    fetchCart();
                  }}
                  className="py-3 mt-4 w-full text-base_40/5 border border-[#C9C9C9] font-medium capitalize bg-[#DADADA] text-[#232323] rounded-[10px] SF_Pro"
                >
                  Remove All
                </button>
              </div>
              <div className="pt-7 grid grid-cols-4 gap-x-4">
                {icon.map((item, i) => (
                  <div
                    className="py-1 bg-[#DADADA] border border-[#C9C9C9] rounded-lg flex justify-center"
                    key={i}
                  >
                    <Image
                      src={item}
                      alt=""
                      className=""
                      height={25}
                      width={25}
                    />
                  </div>
                ))}
              </div>
            </div>
          </div>
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
      </div>
      <CostomizeProductModel
        partType={partType?.toUpperCase()}
        isModalOpen={isModalOpen}
        setIsModalOpen={setIsModalOpen}
      />
    </WebLayout>
  );
};

export default customizeProductDetails;
