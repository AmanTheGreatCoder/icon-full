"use client";
import React, { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { PiHeart, PiPhone, PiShoppingCart, PiUserCircle } from "react-icons/pi";
import { AiOutlineMenu, AiOutlineClose } from "react-icons/ai";
import { useGlobal } from "../context/GlobalContext";
import { useRouter } from "next/navigation";
import ChatBox from "./ChatBox";

const Header = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isOpen, setIsOpen] = useState(false);


  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden"; // Disable scroll
    } else {
      document.body.style.overflow = ""; // Enable scroll
    }

    // Cleanup on unmount
    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen]);

  useEffect(() => {
    if (isMobileMenuOpen) {
      document.body.style.overflow = "hidden"; // Disable scroll
    } else {
      document.body.style.overflow = ""; // Enable scroll
    }

    // Cleanup on unmount
    return () => {
      document.body.style.overflow = "";
    };
  }, [isMobileMenuOpen]);


  const toggleModal = () => {
    setIsOpen(!isOpen);
  };
  const router = useRouter();
  const { user } = useGlobal();

  const header = [
    { title: "Laptop", url: "/product/laptop" },
    { title: "Desktop", url: "/product/desktop" },
    { title: "All In One", url: "/product/all-in-one" },
    { title: "Monitors", url: "/product/monitor" },
    { title: "Printer", url: "/product/printer" },
    { title: "Pre-Build PC", url: "/product/pre-build-pc" },
    {
      title: "Accessories & Software",
      url: "/product/accessories-and-software",
    },
    { title: "Customize Product", url: "/customize-product" },
    { title: "Support", url: "/support" },
  ];

  return (
    <>
      <div className='bg-[#14519E] hidden py-2.5 text-center text-white sm:text-sm text-[10px] sm:flex items-center justify-center sm:gap-x-2.5'>
        <span>  Welcome Offer</span> <p>Up to ₹ 45,000 Cashback, Bonus on Laptop Exchange.</p>
      </div>

      <div className='bg-[#14519E] overflow-hidden sm:hidden block py-2.5 text-center text-white sm:text-sm text-[10px]'>
        <p className="marquee">Welcome Offer Up to ₹ 45,000 Cashback, Bonus on Laptop Exchange.
          Welcome Offer Up to ₹ 45,000 Cashback, Bonus on Laptop Exchange.
        </p>
      </div>

      <div className="sm:py-6 py-3 border-b border-gray-300 bg-white sticky top-0 left-0 z-40">
        <div className="w-full max-w-[1200px] mx-auto px-4">
          <div className="flex items-center justify-between">
            <div className="sm:flex items-center hidden gap-2 text-gray-800">
              <PiPhone size={20} />
              <span className="text-sm">+91 85954 23549</span>
            </div>
            <div>
              <Link href="/">
                <Image
                  src="/assets/images/logo.png"
                  alt="logo image"
                  height={70}
                  width={150}
                  className="cursor-pointer sm:h-[50px] h-10 w-auto"
                />
              </Link>
            </div>

            <div className="flex items-center gap-4 text-gray-800">
              <div className="border hidden border-gray-300 md:flex items-center gap-x-2 pr-2 pl-2  w-56 py-2.5 rounded-lg">
                {/* <CiSearch size={24} /> */}
                <Image
                  src="/assets/images/search-normal.svg"
                  alt="search"
                  height={20}
                  width={20}
                  className=""
                />
                <input type="search" placeholder="Search" className="outline-none" />
              </div>
              <div
                className={`fixed top-[122px] right-0 z-50 w-full bg-white p-5 transition-transform duration-300 ${isOpen ? "translate-y-0 opacity-100" : "-translate-y-10 opacity-0"
                  }`}
                style={{ pointerEvents: isOpen ? "auto" : "none" }}
              >
                <div className="border border-gray-300 pr-2 pl-2 w-full py-2.5 rounded-lg">
                  <input
                    type="search"
                    className="outline-none w-full"
                    placeholder="Search"
                  />
                </div>
              </div>

              {/* Overlay (optional, for closing the modal when clicking outside) */}
              {isOpen && (
                <div
                  className="fixed inset-0"
                  onClick={toggleModal}
                ></div>
              )}
              {/* <CiSearch size={24} className="cursor-pointer md:hidden" onClick={toggleModal} /> */}
              <Image
                src="/assets/images/search-normal.svg"
                alt="search"
                height={20}
                width={20}
                className="sm:hidden block"
                onClick={toggleModal}
              />
              <PiHeart size={24} className="cursor-pointer" />
              <PiShoppingCart
                onClick={() =>
                  user ? router.push("/cart") : router.push("/login")
                }
                size={24}
                className="cursor-pointer"
              />
              <Link href={user ? "/profile" : "/login"} className="hidden sm:block">
                <PiUserCircle size={24} className="cursor-pointer" />
              </Link>
              <button
                className="md:hidden"
                onClick={() => setIsMobileMenuOpen(true)}
              >
                <AiOutlineMenu size={24} />
              </button>
            </div>
          </div>

          <div className="mt-8 hidden md:flex justify-center gap-6 text-gray-600 text-sm">
            {header.map((item, i) => (
              <Link
                key={i}
                href={item.url}
                className="hover:text-gray-800 transition-colors"
              >
                {item.title}
              </Link>
            ))}
          </div>
        </div>

        <div
          className={`fixed top-0 md:hidden block right-0 h-full w-64 bg-white shadow-lg transform ${isMobileMenuOpen ? "translate-x-0" : "translate-x-full"
            } transition-transform duration-300 z-50`}
        >
          <div className="p-4 flex justify-between items-center border-b">
            <span className="text-lg font-bold">Menu</span>
            <button onClick={() => setIsMobileMenuOpen(false)}>
              <AiOutlineClose size={24} />
            </button>
          </div>

          <Link href={user ? "/profile" : "/login"} className="flex p-4 pb-0 gap-x-3 items-center">
            <PiUserCircle size={24} className="cursor-pointer" />
            <p className="font-medium SF_Pro text-base">My Profile</p>
          </Link>

          <div className="p-4 flex flex-col gap-4 text-gray-800">
            {header.map((item, i) => (
              <Link
                key={i}
                href={item.url}
                className="hover:text-gray-600 transition-colors"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                {item.title}
              </Link>
            ))}
          </div>

          <div className="flex absolute bottom-0 p-4 items-center pt-2 sm:hidden gap-2">
            <PiPhone size={20} />
            <span className="font-medium SF_Pro text-base">+91 85954 23549</span>
          </div>

        </div>

        {isMobileMenuOpen && (
          <div
            className="fixed inset-0 bg-black bg-opacity-60 z-40"
            onClick={() => setIsMobileMenuOpen(false)}
          />
        )}
      </div>

      <ChatBox isMobileMenuOpen={isMobileMenuOpen} />
    </>
  );
};

export default Header;
