"use client";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { PiArrowRight } from "react-icons/pi";
import { toast } from "react-toastify";
import { useGlobal } from "../context/GlobalContext";

const PaymentMethod = () => {
  const { cart } = useGlobal();
  const [activeTab, setActiveTab] = useState(1);
  const [address, setAddress] = useState({
    email: "",
    firstName: "",
    lastName: "",
    addressLine1: "",
    addressLine2: "",
    landmark: "",
    pinCode: "",
    city: "",
    state: "",
    companyName: "",
    phoneNumber: "",
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setAddress({ ...address, [name]: value });
  };

  const handleContinue = async () => {
    try {
      await apiManager.patch("customer/auth/address", address);

      await apiManager.post(`customer/order/${cart?.id}`);

      toast.success("Order placed successfully!");
      window.location.href = "/cart";
    } catch (err) {
      console.error(err);
      toast.error("Failed to place order.");
    }
  };

  return (
    <>
      <div className="w-full max-w-[1300px] sm:pb-9 pb-7 mx-auto sm:px-0 px-4 pt-14">
        <Link href="/">
          <Image
            src="/assets/images/logo.png"
            alt="logo image"
            height={70}
            width={150}
            className="cursor-pointer sm:h-[50px] h-9 w-auto"
          />
        </Link>
        <div className="sm:mt-16 mt-10 grid sm:grid-cols-7 grid-cols-1 border border-[#E9E9E9] sm:rounded-[20px] rounded-xl">
          <div className="col-span-5 sm:p-8 p-3 pb-5 sm:border-r border-b border-[#E9E9E9]">
            {/* Tabs */}
            <div className="flex max-w-[500px] gap-x-8">
              <div
                className={`flex-1 py-2 text-center sm:text-base text-sm cursor-pointer ${
                  activeTab === 1
                    ? "border-b-2 border-[#00A0E3] text-[#2B2A29]"
                    : " border-b border-[#D9D9D9]"
                }`}
                onClick={() => setActiveTab(1)}
              >
                <div className="flex items-center">
                  <span
                    className={`w-6 h-6 rounded-full sm:flex hidden items-center justify-center text-[#2B2A29] ${
                      activeTab === 1
                        ? "bg-[#00A0E3] text-white"
                        : "bg-gray-300"
                    }`}
                  >
                    1
                  </span>
                  <span className="ml-2">Information</span>
                </div>
              </div>
              <div
                className={`flex-1 py-2 text-center sm:text-base text-sm cursor-pointer ${
                  activeTab === 2
                    ? "border-b-2 border-[#00A0E3] text-[#2B2A29]"
                    : "border-b border-[#D9D9D9]"
                }`}
                onClick={() => setActiveTab(2)}
              >
                <div className="flex items-center">
                  <span
                    className={`w-6 h-6 rounded-full  sm:flex hidden items-center justify-center text-[#2B2A29] ${
                      activeTab === 2
                        ? "bg-[#00A0E3] text-white"
                        : "bg-gray-300"
                    }`}
                  >
                    2
                  </span>
                  <span className="ml-2">Payment Method</span>
                </div>
              </div>
            </div>

            <div className="pt-8">
              {activeTab === 1 && (
                <div>
                  <h3 className="text-lg font-medium SF_Pro text-[#2B2A29]">
                    Your shipping address
                  </h3>
                  <div className="pt-6 grid gap-y-4">
                    <div>
                      <label
                        htmlFor="email"
                        className="block text-[#2B2A29] text-sm mb-2"
                      >
                        Email Address
                      </label>
                      <input
                        name="email"
                        type="text"
                        className="appearance-none border w-full py-2.5 rounded-lg px-3 text-[#2B2A29] leading-tight focus:outline-none"
                        placeholder="Enter Your Email"
                        value={address.email}
                        onChange={handleInputChange}
                      />
                    </div>
                    <div className="grid sm:grid-cols-2 grid-cols-1 gap-5">
                      <div>
                        <label
                          htmlFor="firstName"
                          className="block text-[#2B2A29] text-sm mb-2"
                        >
                          First name
                        </label>
                        <input
                          name="firstName"
                          type="text"
                          className="appearance-none border w-full py-2.5 rounded-lg px-3 text-[#2B2A29] leading-tight focus:outline-none"
                          placeholder="Enter Your First Name"
                          value={address.firstName}
                          onChange={handleInputChange}
                        />
                      </div>
                      <div>
                        <label
                          htmlFor="lastName"
                          className="block text-[#2B2A29] text-sm mb-2"
                        >
                          Last name
                        </label>
                        <input
                          name="lastName"
                          type="text"
                          className="appearance-none border w-full py-2.5 rounded-lg px-3 text-[#2B2A29] leading-tight focus:outline-none"
                          placeholder="Enter Your Last Name"
                          value={address.lastName}
                          onChange={handleInputChange}
                        />
                      </div>
                    </div>
                    <div>
                      <label
                        htmlFor="addressLine1"
                        className="block text-[#2B2A29] text-sm mb-2"
                      >
                        Address
                      </label>
                      <div className="grid sm:grid-cols-2 grid-cols-1 gap-2.5">
                        <input
                          name="addressLine1"
                          type="text"
                          className="appearance-none border w-full py-2.5 rounded-lg px-3 text-[#2B2A29] leading-tight focus:outline-none"
                          placeholder="Enter Your Address"
                          value={address.addressLine1}
                          onChange={handleInputChange}
                        />
                        <input
                          name="addressLine2"
                          type="text"
                          className="appearance-none border w-full py-2.5 rounded-lg px-3 text-[#2B2A29] leading-tight focus:outline-none"
                          placeholder="Enter Your Address"
                          value={address.addressLine2}
                          onChange={handleInputChange}
                        />
                      </div>
                    </div>
                    <div className="grid sm:grid-cols-2 grid-cols-1 gap-5">
                      <div>
                        <label
                          htmlFor="landmark"
                          className="block text-[#2B2A29] text-sm mb-2"
                        >
                          Landmark
                        </label>
                        <input
                          name="landmark"
                          type="text"
                          className="appearance-none border w-full py-2.5 rounded-lg px-3 text-[#2B2A29] leading-tight focus:outline-none"
                          placeholder="Enter Your Landmark"
                          value={address.landmark}
                          onChange={handleInputChange}
                        />
                      </div>
                      <div>
                        <label
                          htmlFor="pinCode"
                          className="block text-[#2B2A29] text-sm mb-2"
                        >
                          Pin code
                        </label>
                        <input
                          name="pinCode"
                          type="number"
                          className="appearance-none border w-full py-2.5 rounded-lg px-3 text-[#2B2A29] leading-tight focus:outline-none"
                          placeholder="Enter Your Pin code"
                          value={address.pinCode}
                          onChange={handleInputChange}
                        />
                      </div>
                    </div>
                    <div className="grid sm:grid-cols-2 grid-cols-1 gap-5">
                      <div>
                        <label
                          htmlFor="city"
                          className="block text-[#2B2A29] text-sm mb-2"
                        >
                          City
                        </label>
                        <input
                          name="city"
                          type="text"
                          className="appearance-none border w-full py-2.5 rounded-lg px-3 text-[#2B2A29] leading-tight focus:outline-none"
                          placeholder="Enter Your City"
                          value={address.city}
                          onChange={handleInputChange}
                        />
                      </div>
                      <div>
                        <label
                          htmlFor="state"
                          className="block text-[#2B2A29] text-sm mb-2"
                        >
                          State
                        </label>
                        <input
                          name="state"
                          type="text"
                          className="appearance-none border w-full py-2.5 rounded-lg px-3 text-[#2B2A29] leading-tight focus:outline-none"
                          placeholder="Enter Your State"
                          value={address.state}
                          onChange={handleInputChange}
                        />
                      </div>
                    </div>
                    <div className="grid sm:grid-cols-2 grid-cols-1 gap-5">
                      <div>
                        <label
                          htmlFor="companyName"
                          className="block text-[#2B2A29] text-sm mb-2"
                        >
                          Company Name
                        </label>
                        <input
                          name="companyName"
                          type="text"
                          className="appearance-none border w-full py-2.5 rounded-lg px-3 text-[#2B2A29] leading-tight focus:outline-none"
                          placeholder="Enter Your Company Name"
                          value={address.companyName}
                          onChange={handleInputChange}
                        />
                      </div>
                      <div>
                        <label
                          htmlFor="phoneNumber"
                          className="block text-[#2B2A29] text-sm mb-2"
                        >
                          Phone number
                        </label>
                        <input
                          name="phoneNumber"
                          type="number"
                          className="appearance-none border w-full py-2.5 rounded-lg px-3 text-[#2B2A29] leading-tight focus:outline-none"
                          placeholder="Enter Your Phone number"
                          value={address.phoneNumber}
                          onChange={handleInputChange}
                        />
                      </div>
                    </div>
                  </div>
                </div>
              )}
              {activeTab === 2 && (
                <div>
                  <div className="flex justify-between items-center">
                    <h3 className="text-lg font-medium SF_Pro text-[#2B2A29]">
                      Credit / Debit Card
                    </h3>
                    <div className="flex items-center gap-x-3">
                      <Image
                        src="/assets/images/visa.png"
                        alt=""
                        className="h-3 w-auto"
                        height={50}
                        width={60}
                      />
                      <input
                        type="radio"
                        name="option"
                        value="option1"
                        className="mr-2 h-4 w-4 accent-[#14519E]"
                      />
                    </div>
                  </div>
                  <div className="pt-6 grid gap-y-4">
                    <div>
                      <label
                        htmlFor="productModelNo"
                        className="block text-[#2B2A29] text-sm mb-2"
                      >
                        Card Number
                      </label>
                      <input
                        name="productModelNo"
                        type="number"
                        className="appearance-none border w-full py-2.5 rounded-lg px-3 text-[#2B2A29] leading-tight focus:outline-none"
                        placeholder="Enter Your Card Number"
                      />
                    </div>
                    <div className="grid sm:grid-cols-2 grid-cols-1 gap-5">
                      <div>
                        <label
                          htmlFor="productModelNo"
                          className="block text-[#2B2A29] text-sm mb-2"
                        >
                          Expiration date
                        </label>
                        <input
                          name="productModelNo"
                          type="date"
                          className="appearance-none border w-full py-2.5 rounded-lg px-3 text-[#2B2A29] leading-tight focus:outline-none"
                          placeholder="MM/YY"
                        />
                      </div>
                      <div>
                        <label
                          htmlFor="productModelNo"
                          className="block text-[#2B2A29] text-sm mb-2"
                        >
                          CVV
                        </label>
                        <input
                          name="productModelNo"
                          type="number"
                          className="appearance-none border w-full py-2.5 rounded-lg px-3 text-[#2B2A29] leading-tight focus:outline-none"
                          placeholder=""
                        />
                      </div>
                    </div>
                    <div>
                      <label
                        htmlFor="productModelNo"
                        className="block text-[#2B2A29] text-sm mb-2"
                      >
                        Cardholder's Name
                      </label>
                      <input
                        name="productModelNo"
                        type="text"
                        className="appearance-none border w-full py-2.5 rounded-lg px-3 text-[#2B2A29] leading-tight focus:outline-none"
                        placeholder="Enter Your Cardholder's Name"
                      />
                    </div>
                    <div>
                      <div className="flex justify-between items-center pt-2">
                        <Image
                          src="/assets/images/upi.png"
                          alt=""
                          className="h-5 w-auto"
                          height={50}
                          width={80}
                        />
                        <input
                          type="radio"
                          name="option"
                          value="option1"
                          className="mr-2 h-4 w-4 accent-[#14519E]"
                        />
                      </div>
                      <input
                        name="productModelNo"
                        type="text"
                        className="appearance-none border w-full py-2.5 mt-2 rounded-lg px-3 text-[#2B2A29] leading-tight focus:outline-none"
                        placeholder="Enter Your UPI Address"
                      />
                    </div>
                    <div className="flex justify-between items-center pt-2">
                      <Image
                        src="/assets/images/paytm.png"
                        alt=""
                        className="h-4 w-auto"
                        height={50}
                        width={80}
                      />
                      <input
                        type="radio"
                        name="option"
                        value="option1"
                        className="mr-2 h-4 w-4 accent-[#14519E]"
                      />
                    </div>
                    <div className="flex justify-between items-center pt-2">
                      <Image
                        src="/assets/images/g-pay.png"
                        alt=""
                        className="h-6 w-auto"
                        height={50}
                        width={80}
                      />
                      <input
                        type="radio"
                        name="option"
                        value="option1"
                        className="mr-2 h-4 w-4 accent-[#14519E]"
                      />
                    </div>
                    <div className="flex justify-between items-center pt-2">
                      <Image
                        src="/assets/images/phone-pay.png"
                        alt=""
                        className="h-8 w-auto"
                        height={50}
                        width={80}
                      />
                      <input
                        type="radio"
                        name="option"
                        value="option1"
                        className="mr-2 h-4 w-4 accent-[#14519E]"
                      />
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>

          <div className="col-span-2 p-5 pb-8 flex sm:gap-y-0 gap-y-6 flex-col justify-between">
            <div>
              <p className="text-base text-[#333311] SF_Pro font-medium">
                Summary
              </p>
              <div className="pt-3 space-y-3 border-b pb-3 border-dashed border-[#CACACA]">
                <div className="flex justify-between items-center">
                  <p className="text-[#838383] text-base">Price :</p>
                  <p className="text-[#838383] text-base">
                    ₹{cart?.totalAmount}
                  </p>
                </div>
                <div className="flex justify-between items-center">
                  <p className="text-[#838383] text-base">Sub Total :</p>
                  <p className="text-[#838383] text-base">{cart?.subtotal}</p>
                </div>
                <div className="flex justify-between items-center">
                  <p className="text-[#838383] text-base">Delivery Cost :</p>
                  <p className="text-[#838383] text-base">Free</p>
                </div>
              </div>
              <div className="flex justify-between items-center pt-3">
                <p className="text-[#838383] text-base">Total :</p>
                <p className="text-[#14519E] text-base">₹{cart?.totalAmount}</p>
              </div>
            </div>
            <div>
              <button
                type="button"
                onClick={handleContinue}
                className="bg-[#00A0E3] w-full flex gap-x-3 justify-center items-center rounded-[10px] text-white font-medium py-3  px-4 focus:outline-none"
              >
                Continue
                <PiArrowRight size={20} />
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default PaymentMethod;
