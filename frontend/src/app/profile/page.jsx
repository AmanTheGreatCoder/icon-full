"use client";
import React, { useState, useEffect } from "react";
import WebLayout from "../Layout/WebLayout";
import Image from "next/image";
import { HiChevronRight } from "react-icons/hi2";
import { PiPencilSimpleLineFill, PiPencilSimpleLineLight, PiStarFill } from "react-icons/pi";
import Select from "react-select";
import { useGlobal } from "../context/GlobalContext";
import { apiManager } from "@/common/apiManager";

const page = () => {
  const { user } = useGlobal();
  const [activeSection, setActiveSection] = useState("Profile Information");
  const [editableField, setEditableField] = useState(null);
  const [selectedCountry, setSelectedCountry] = useState(null);
  const [states, setStates] = useState([]);
  const [selectedState, setSelectedState] = useState(null);
  const [selectedGender, setSelectedGender] = useState(user?.gender || "");
  const [coupons, setCoupons] = useState([]);
  const [orders, setOrders] = useState([]);
  const [currentStep, setCurrentStep] = useState(1);
  // State to manage icon visibility
  const [isEditing, setIsEditing] = useState(false);

  const toggleEditMode = (field) => {
    setEditableField(editableField === field ? null : field);
    setIsEditing(!isEditing); // Toggle between icons
  };
  // Function to handle the next step
  const goToNextStep = () => {
    if (currentStep < steps.length) {
      setCurrentStep(currentStep + 1);
    }
  };
  const steps = [
    { id: 1, date: "Apr 5, 2022, 10:07 AM" },
    { id: 2, date: "Apr 5, 2022, 10:07 AM" },
    { id: 3, date: "Apr 5, 2022, 10:07 AM" },
  ];

  const [profile, setProfile] = useState({
    ProfilefirstName: user?.firstName || "",
    ProfilelastName: user?.lastName || "",
    Profileemail: user?.email || "",
  });

  useEffect(() => {
    if (user) {
      setProfile({
        ProfilefirstName: user?.firstName,
        ProfilelastName: user?.lastName,
        Profileemail: user?.email,
      });
    }
  }, [user]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setProfile((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const toggleEditableField = (field) => {
    setEditableField(editableField === field ? null : field);
  };

  const countries = [
    { value: "US", label: "United States" },
    { value: "IN", label: "India" },
    { value: "GB", label: "United Kingdom" },
    { value: "FR", label: "France" },
    { value: "JP", label: "Japan" },
  ];

  const countryStateData = {
    US: [
      { value: "CA", label: "California" },
      { value: "TX", label: "Texas" },
      { value: "NY", label: "New York" },
    ],
    IN: [
      { value: "MH", label: "Maharashtra" },
      { value: "KA", label: "Karnataka" },
      { value: "DL", label: "Delhi" },
      { value: "TN", label: "Tamil Nadu" },
      { value: "WB", label: "West Bengal" },
      { value: "GJ", label: "Gujarat" },
      { value: "RJ", label: "Rajasthan" },
      { value: "UP", label: "Uttar Pradesh" },
      { value: "AP", label: "Andhra Pradesh" },
      { value: "PB", label: "Punjab" },
      { value: "HR", label: "Haryana" },
      { value: "JH", label: "Jharkhand" },
      { value: "CT", label: "Chhattisgarh" },
      { value: "KL", label: "Kerala" },
      { value: "OR", label: "Odisha" },
      { value: "AS", label: "Assam" },
      { value: "BR", label: "Bihar" },
      { value: "UT", label: "Uttarakhand" },
      { value: "TG", label: "Telangana" },
      { value: "LA", label: "Ladakh" },
      { value: "JK", label: "Jammu and Kashmir" },
      { value: "AN", label: "Andaman and Nicobar Islands" },
      { value: "DN", label: "Dadra and Nagar Haveli and Daman and Diu" },
    ],
    GB: [
      { value: "ENG", label: "England" },
      { value: "SCT", label: "Scotland" },
      { value: "WLS", label: "Wales" },
    ],
  };

  const handleCountryChange = (selectedOption) => {
    setSelectedCountry(selectedOption);
    setStates(countryStateData[selectedOption.value] || []);
    setSelectedState(null);
  };

  const handleStateChange = (selectedOption) => {
    setSelectedState(selectedOption);
  };

  const fetchCoupons = async () => {
    try {
      const data = await apiManager.get("customer/coupon");
      setCoupons(data);
    } catch (error) {
      console.error("Error fetching coupons:", error);
    }
  };

  const fetchOrders = async () => {
    try {
      const data = await apiManager.get("customer/order");
      setOrders(data);
    } catch (error) {
      console.error("Error fetching orders:", error);
    }
  };

  useEffect(() => {
    fetchCoupons();
    fetchOrders();
  }, []);

  const giftCard = [
    {
      image: "/assets/images/gift.png",
      title: "Icon Digital Gift Card",
      price: 500,
    },
    {
      image: "/assets/images/gift.png",
      title: "Icon Digital Gift Card",
      price: 500,
    },
    {
      image: "/assets/images/gift.png",
      title: "Icon Digital Gift Card",
      price: 500,
    },
    {
      image: "/assets/images/gift.png",
      title: "Icon Digital Gift Card",
      price: 500,
    },
    {
      image: "/assets/images/gift.png",
      title: "Icon Digital Gift Card",
      price: 500,
    },
  ];

  return (
    <WebLayout>
      <div className="w-full max-w-[1200px] pb-10 mx-auto pt-5 sm:grid grid-cols-7 gap-x-5 sm:px-0 px-4 z-10">
        <div className="col-span-2">
          <div className="border border-[#e3e1e1] px-5 py-2.5 gap-x-5 flex items-center">
            <Image
              src="/assets/images/user-image.png"
              alt="user image"
              className="h-9 w-auto"
              height={50}
              width={50}
            />
            <div>
              <p className="text-sm text-[#2B2A29]">Hello,</p>
              <p className="text-[#14519E] text-base font-medium ">
                {user?.firstName} {user?.lastName}
              </p>
            </div>
          </div>
          <div className="border mt-4 border-[#e3e1e1]">
            <div className="px-5 py-2.5 h-48 border-b border-[#e3e1e1]">
              <div className="flex items-center gap-x-4 py-2.5 cursor-pointer">
                <Image
                  src="/assets/images/user-1.svg"
                  alt="user image"
                  className="h-5 w-auto"
                  height={50}
                  width={50}
                />
                <p className="text-[#5C5C5C] text-base font-medium">
                  Account Setting
                </p>
              </div>
              <p
                className={`py-2.5 pl-9 cursor-pointer text-base font-medium ${activeSection === "Profile Information"
                  ? "text-[#14519E] bg-[#00A0E31A]"
                  : "text-[#9A9A9A]"
                  }`}
                onClick={() => setActiveSection("Profile Information")}
              >
                Profile Information
              </p>
              <p
                className={`py-2.5 pl-9 cursor-pointer text-base font-medium ${activeSection === "Manage Address"
                  ? "text-[#14519E] bg-[#00A0E31A]"
                  : "text-[#9A9A9A]"
                  }`}
                onClick={() => setActiveSection("Manage Address")}
              >
                Manage Address
              </p>
            </div>
            <div className='px-5 border-b border-[#e3e1e1] py-2.5 gap-x-5 justify-between flex items-center'>
              <div className="flex items-center gap-x-4 w-full">
                <Image
                  src="/assets/images/shopping-cart-check.svg"
                  alt="user image"
                  className="h-5 w-auto"
                  height={50}
                  width={50}
                />
                <p
                  className={`py-2.5 pl-9 cursor-pointer text-base w-full font-medium ${activeSection === "MyOrder"
                    ? "text-[#14519E] bg-[#00A0E31A]"
                    : "text-[#9A9A9A]"
                    }`}
                  onClick={() => setActiveSection("MyOrder")}
                >
                  My Order
                </p>
              </div>
              <HiChevronRight className='text-[#9A9A9A]' size={20} />
            </div>
            <div className="px-5 py-2.5 border-b border-[#e3e1e1]">
              <div className="flex items-center gap-x-4 py-2.5 cursor-pointer">
                <Image
                  src="/assets/images/Discount-Coupon.svg"
                  alt="user image"
                  className="h-5 w-auto"
                  height={50}
                  width={50}
                />
                <p className="text-[#5C5C5C] text-base font-medium">My Stuff</p>
              </div>
              <p
                className={`py-2.5 pl-9 cursor-pointer text-base font-medium ${activeSection === "MyCoupon"
                  ? "text-[#14519E] bg-[#00A0E31A]"
                  : "text-[#9A9A9A]"
                  }`}
                onClick={() => setActiveSection("MyCoupon")}
              >
                My Coupon
              </p>

              <p
                className={`py-2.5 pl-9 cursor-pointer text-base font-medium ${activeSection === "MyWallet"
                  ? "text-[#14519E] bg-[#00A0E31A]"
                  : "text-[#9A9A9A]"
                  }`}
                onClick={() => setActiveSection("MyWallet")}
              >
                My Wallet
              </p>

              <p
                className={`py-2.5 pl-9 cursor-pointer text-base font-medium ${activeSection === "Vouchers"
                  ? "text-[#14519E] bg-[#00A0E31A]"
                  : "text-[#9A9A9A]"
                  }`}
                onClick={() => setActiveSection("Vouchers")}
              >
                Vouchers
              </p>
            </div>
            <div className="px-5 py-2.5">
              <div className="flex items-center gap-x-4 py-2.5 cursor-pointer">
                <Image
                  src="/assets/images/logout.svg"
                  alt="user image"
                  className="h-5 w-auto"
                  height={50}
                  width={50}
                />
                <p className="text-[#5C5C5C] text-base font-medium">Log Out</p>
              </div>
            </div>
          </div>
        </div>
        {/* Details Section */}
        <div className="col-span-5 border sm:mt-0 mt-5 border-[#e3e1e1] p-5">

          {activeSection === "MyOrder" && (
            <div className='space-y-4'>
              <div className='w-full sm:p-6 p-3 border border-[#e3e1e1]'>
                <div className='flex flex-wrap justify-between'>
                  <div className='flex flex-wrap gap-x-5'>
                    <div>
                      <Image
                        src="/assets/images/best-saller.png"
                        alt=''
                        height={400}
                        width={400}
                        className='h-[120px] w-auto object-cover'

                      />
                      <h3 className='sm:text-2xl text-xl SF_Pro font-semibold sm:pt-2.5 pt-1.5'>
                        Order In Progress
                      </h3>
                      <p className='text-sm sm:pt-2 pt-0 text-[#909090]'>Order Arrived at Apr 5, 2022, 10:07 AM </p>
                    </div>
                    <div className='sm:pt-0 pt-3'>
                      <h3 className='text-lg SF_Pro font-semibold'>
                        Asus VivoBook s15
                      </h3>
                      <p className='text-sm pt-1 text-[#4D4D4D]'>Processor i5</p>
                    </div>
                  </div>
                  <div className="sm:space-y-8 gap-x-4 mt-5 sm:block flex items-center">
                    <button
                      className={`rounded-2xl text-sm py-2 px-3 ${currentStep === steps.length ? "bg-[#14519E] text-white" : "border border-[#14519E] text-[#14519E]"
                        }`}
                    >
                      {currentStep === steps.length ? "Delivered" : "In Progress"}
                    </button>
                    <p className="font-bold text-xl text-center">₹ 51,000</p>
                  </div>
                </div>
                <div className="flex  flex-col mt-5">
                  <div className="flex  sm:gap-8 gap-1">
                    {steps.map((step) => (
                      <div key={step.id} className="flex flex-wrap flex-col items-center">
                        <div
                          className={`w-full h-2 rounded-full mb-2 ${currentStep >= step.id ? "bg-blue-600" : "bg-gray-300"}`}
                        ></div>
                        <div className="flex flex-wrap gap-2 items-center text-gray-600">
                          <div
                            className={`sm:w-6 w-4 sm:text-base text-xs  sm:h-6 h-4 flex  justify-center items-center rounded-full border ${currentStep > step.id
                              ? "bg-blue-600 text-white border-blue-600"
                              : currentStep === step.id
                                ? "bg-blue-600 text-white border-blue-600"
                                : "bg-transparent text-white border-gray-300"
                              }`}
                          >
                            {currentStep || step.id ? "✓" : ""}
                          </div>
                          <span
                            className={`sm:text-sm text-xs ${currentStep >= step.id ? "text-gray-600" : "text-gray-400"}`}
                          >
                            {step.date}
                          </span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
                {/* Button to advance step */}
                {/* <button
                                    onClick={goToNextStep}
                                    className="mt-6 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition"
                                    disabled={currentStep === steps.length}
                                >
                                    Next Step
                                </button> */}
              </div>
              <div className='w-full sm:p-6 p-3 border border-[#e3e1e1]'>
                <div className='flex flex-wrap justify-between'>
                  <div className='flex flex-wrap gap-x-5'>
                    <div>
                      <Image
                        src="/assets/images/best-saller.png"
                        alt=''
                        height={400}
                        width={400}
                        className='h-[120px] w-auto object-cover'

                      />
                      <h3 className='sm:text-2xl text-xl SF_Pro font-semibold sm:pt-2.5 pt-1.5'>
                        Order In Progress
                      </h3>
                      <p className='text-sm sm:pt-2 pt-0 text-[#909090]'>Order Arrived at Apr 5, 2022, 10:07 AM </p>
                    </div>
                    <div className='sm:pt-0 pt-3'>
                      <h3 className='text-lg SF_Pro font-semibold'>
                        Asus VivoBook s15
                      </h3>
                      <p className='text-sm pt-1 text-[#4D4D4D]'>Processor i5</p>
                    </div>
                  </div>
                  <div className="sm:space-y-8 gap-x-4 mt-5 sm:block flex items-center">
                    <button
                      className={`rounded-2xl text-sm py-2 px-3 ${currentStep === steps.length ? "bg-[#14519E] text-white" : "border border-[#14519E] text-[#14519E]"
                        }`}
                    >
                      {currentStep === steps.length ? "Delivered" : "In Progress"}
                    </button>
                    <p className="font-bold text-xl text-center">₹ 51,000</p>
                  </div>
                </div>
                <div className="flex  flex-col mt-5">
                  <div className="flex  sm:gap-8 gap-1">
                    {steps.map((step) => (
                      <div key={step.id} className="flex flex-wrap flex-col items-center">
                        <div
                          className={`w-full h-2 rounded-full mb-2 ${currentStep >= step.id ? "bg-blue-600" : "bg-gray-300"}`}
                        ></div>
                        <div className="flex flex-wrap gap-2 items-center text-gray-600">
                          <div
                            className={`sm:w-6 w-4 sm:text-base text-xs  sm:h-6 h-4 flex  justify-center items-center rounded-full border ${currentStep > step.id
                              ? "bg-blue-600 text-white border-blue-600"
                              : currentStep === step.id
                                ? "bg-blue-600 text-white border-blue-600"
                                : "bg-transparent text-white border-gray-300"
                              }`}
                          >
                            {currentStep || step.id ? "✓" : ""}
                          </div>
                          <span
                            className={`sm:text-sm text-xs ${currentStep >= step.id ? "text-gray-600" : "text-gray-400"}`}
                          >
                            {step.date}
                          </span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
                {/* Button to advance step */}
                {/* <button
                                    onClick={goToNextStep}
                                    className="mt-6 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition"
                                    disabled={currentStep === steps.length}
                                >
                                    Next Step
                                </button> */}
              </div>
            </div>
          )}

          {activeSection === "Profile Information" && (
            <div className="w-full max-w-[600px] pt-3">
              <div className="flex justify-between">
                <h3 className="text-base font-medium text-[#2B2A29]">
                  Profile Information
                </h3>
                {isEditing ? (
                  <PiPencilSimpleLineFill
                    className="text-[#14519E] cursor-pointer"
                    size={20}
                    onClick={() => toggleEditMode("all")}
                  />
                ) : (
                  <PiPencilSimpleLineLight
                    className="text-[#14519E] cursor-pointer"
                    size={20}
                    onClick={() => toggleEditMode("all")}
                  />
                )}
              </div>
              <div className="pt-5 grid sm:grid-cols-2 grid-cols-1 gap-x-4">
                <div className="w-full">
                  <label
                    htmlFor="firstName"
                    className="block text-[#717171] text-sm mb-2"
                  >
                    First Name
                  </label>
                  <input
                    name="ProfilefirstName"
                    type="text"
                    className="appearance-none border rounded w-full py-2 px-3 text-[#232323] leading-tight focus:outline-none"
                    placeholder="First Name"
                    value={profile.ProfilefirstName}
                    disabled={editableField !== "ProfilefirstName" && editableField !== "all"}
                    onChange={handleInputChange}
                    onClick={() => toggleEditMode("ProfilefirstName")}
                  />
                </div>
                <div className="w-full sm:pt-0 pt-4">
                  <label
                    htmlFor="lastName"
                    className="block text-[#717171] text-sm mb-2"
                  >
                    Last Name
                  </label>
                  <input
                    name="ProfilelastName"
                    type="text"
                    className="appearance-none border rounded w-full py-2 px-3 text-[#232323] leading-tight focus:outline-none"
                    placeholder="Last Name"
                    value={profile.ProfilelastName}
                    disabled={editableField !== "ProfilelastName" && editableField !== "all"}
                    onChange={handleInputChange}
                    onClick={() => toggleEditMode("ProfilelastName")}
                  />
                </div>
              </div>

              <div className="pt-5">
                <label className="block text-[#717171] text-sm mb-2">
                  Your Gender
                </label>
                <div className="flex gap-4">
                  <label className="flex items-center text-[#C0C0C0] text-sm">
                    <input
                      type="radio"
                      name="gender"
                      value="Male"
                      className="mr-2 accent-[#14519E]"
                      checked={selectedGender === "Male"}
                      onChange={() => setSelectedGender("Male")}
                    />
                    Male
                  </label>
                  <label className="flex items-center text-[#C0C0C0] text-sm">
                    <input
                      type="radio"
                      name="gender"
                      value="Female"
                      className="mr-2 accent-[#14519E]"
                      checked={selectedGender === "Female"}
                      onChange={() => setSelectedGender("Female")}
                    />
                    Female
                  </label>
                </div>
              </div>

              <div className="flex justify-between pt-5">
                <h3 className="text-base font-medium text-[#2B2A29]">Email Address</h3>
                {editableField === "Profileemail" ? (
                  <PiPencilSimpleLineFill
                    className="text-[#14519E] cursor-pointer"
                    size={20}
                    onClick={() => setEditableField(null)} // Disable edit mode
                  />
                ) : (
                  <PiPencilSimpleLineLight
                    className="text-[#14519E] cursor-pointer"
                    size={20}
                    onClick={() => setEditableField("Profileemail")} // Enable edit mode
                  />
                )}
              </div>
              <div className="pt-5">
                <div className="max-w-[292px] w-full">
                  <label
                    htmlFor="email"
                    className="block text-[#717171] text-sm mb-2"
                  >
                    Email Address
                  </label>
                  <input
                    name="Profileemail"
                    type="text"
                    className="appearance-none border rounded w-full py-2 px-3 text-[#232323] leading-tight focus:outline-none"
                    placeholder="Enter Your Email"
                    value={profile.Profileemail}
                    disabled={editableField !== "Profileemail"} // Enable input only when in edit mode
                    onChange={handleInputChange}
                  />
                </div>
              </div>

              <div className="flex justify-between pt-5">
                <h3 className="text-base font-medium text-[#2B2A29]">Mobile Number</h3>
                {editableField === "number" ? (
                  <PiPencilSimpleLineFill
                    className="text-[#14519E] cursor-pointer"
                    size={20}
                    onClick={() => setEditableField(null)} // Disable edit mode
                  />
                ) : (
                  <PiPencilSimpleLineLight
                    className="text-[#14519E] cursor-pointer"
                    size={20}
                    onClick={() => setEditableField("number")} // Enable edit mode
                  />
                )}
              </div>
              <div className="pt-5">
                <div className="max-w-[292px] w-full">
                  <label
                    htmlFor="number"
                    className="block text-[#717171] text-sm mb-2"
                  >
                    Mobile Number
                  </label>
                  <input
                    name="number"
                    type="number"
                    className="appearance-none border rounded w-full py-2 px-3 text-[#232323] leading-tight focus:outline-none"
                    placeholder="Enter Your Number"
                    value={profile.number}
                    disabled={editableField !== "number"} // Enable input only when in edit mode
                    onChange={handleInputChange}
                  />
                </div>
              </div>

              <div className="flex justify-end sm:pt-10 pt-5">
                <button
                  type="button"
                  onClick={async () => {
                    try {
                      const data = await apiManager.patch(
                        "customer/auth/profile",
                        {
                          name: profile.name,
                          email: profile.Profileemail,
                          phone: profile.number,
                          gender: selectedGender,
                        }
                      );

                      if (data) {
                        toast.success("Profile updated successfully!");
                        window.location.reload();
                      }
                    } catch (err) {
                      console.log(err);
                      toast.error(err?.response?.data?.message);
                    }
                  }}
                  className="bg-[#00A0E3] w-full max-w-[400px] rounded-[10px] text-white font-medium py-3  px-4 focus:outline-none "
                >
                  Save Changes
                </button>
              </div>
            </div>
          )}

          {activeSection === "Manage Address" && (
            <div className="w-full max-w-[600px] pt-3">

              <div className="flex justify-between">
                <h3 className="text-base font-medium text-[#2B2A29]">Manage Address</h3>
                {editableField === "all" ? (
                  <PiPencilSimpleLineFill
                    className="text-[#14519E] cursor-pointer"
                    size={20}
                    onClick={() => setEditableField(null)} // Exit edit mode for all fields
                  />
                ) : (
                  <PiPencilSimpleLineLight
                    className="text-[#14519E] cursor-pointer"
                    size={20}
                    onClick={() => setEditableField("all")} // Enable edit mode for both fields
                  />
                )}
              </div>
              <div className="pt-5 grid sm:grid-cols-2 grid-cols-1 gap-x-4">
                {/* First Name */}
                <div className="w-full">
                  <label
                    htmlFor="firstName"
                    className="block text-[#717171] text-sm mb-2"
                  >
                    First Name
                  </label>
                  <input
                    name="firstName"
                    type="text"
                    className="appearance-none border rounded w-full py-2 px-3 text-[#232323] leading-tight focus:outline-none"
                    placeholder="First Name"
                    value={profile.firstName}
                    disabled={editableField !== "all"} // Enable input only when 'editableField' is "all"
                    onChange={handleInputChange}
                  />
                </div>

                {/* Mobile Number */}
                <div className="w-full sm:pt-0 pt-4">
                  <label
                    htmlFor="number"
                    className="block text-[#717171] text-sm mb-2"
                  >
                    Mobile Number
                  </label>
                  <input
                    name="number"
                    type="number"
                    className="appearance-none border rounded w-full py-2 px-3 text-[#232323] leading-tight focus:outline-none"
                    placeholder="Enter Your Number"
                    value={profile.number}
                    disabled={editableField !== "all"} // Enable input only when 'editableField' is "all"
                    onChange={handleInputChange}
                  />
                </div>
              </div>



              {/* Address Line */}
              <div className="flex justify-between pt-5">
                <label
                  htmlFor="Address Line"
                  className="block text-[#717171] text-sm mb-2"
                >
                  Address Line
                </label>
              </div>
              <div className="flex items-center gap-2">
                <input
                  name="Address"
                  type="text"
                  className="appearance-none border rounded w-full py-2 px-3 text-[#232323] leading-tight focus:outline-none"
                  placeholder="Enter Your Address"
                  value={profile.Address}
                  disabled={editableField !== "Address"} // Enable input only for this field
                  onChange={handleInputChange}
                />
                {editableField === "Address" ? (
                  <PiPencilSimpleLineFill
                    className="text-[#14519E] cursor-pointer"
                    size={20}
                    onClick={() => setEditableField(null)} // Exit edit mode
                  />
                ) : (
                  <PiPencilSimpleLineLight
                    className="text-[#14519E] cursor-pointer"
                    size={20}
                    onClick={() => setEditableField("Address")} // Enable edit mode
                  />
                )}
              </div>



              <div className="grid sm:grid-cols-2 grid-cols-1 gap-x-4">
                <div className="pt-5">
                  <label
                    htmlFor="Country"
                    className="block text-[#717171] text-sm mb-2"
                  >
                    Country
                  </label>
                  <Select
                    options={countries}
                    value={selectedCountry}
                    onChange={handleCountryChange}
                    placeholder="Select a country"
                  />
                </div>

                <div className="pt-5">
                  <label
                    htmlFor="Country"
                    className="block text-[#717171] text-sm mb-2"
                  >
                    State
                  </label>
                  <Select
                    options={states}
                    value={selectedState}
                    onChange={handleStateChange}
                    placeholder="Select a state"
                    disabled={
                      editableField !== "state" && editableField !== "all"
                    }
                    onClick={() => toggleEditableField("state")}
                  />
                </div>
              </div>

              <div className="grid sm:grid-cols-2 grid-cols-1 gap-x-4">
                <div className="pt-5">
                  <label
                    htmlFor="Country"
                    className="block text-[#717171] text-sm mb-2"
                  >
                    City
                  </label>
                  <input
                    name="city"
                    type="text"
                    value={profile.city}
                    // disabled={
                    //   editableField !== "city" && editableField !== "all"
                    // }
                    onChange={handleInputChange}
                    onClick={() => toggleEditableField("city")}
                    className="appearance-none border rounded w-full py-2 px-3 text-[#232323] leading-tight focus:outline-none"
                    placeholder="Enter Your City"
                  />
                </div>

                <div className="pt-5">
                  <label
                    htmlFor="Country"
                    className="block text-[#717171] text-sm mb-2"
                  >
                    Zip Code
                  </label>
                  <input
                    name="zipcode"
                    type="number"
                    value={profile.zipcode}
                    // disabled={
                    //   editableField !== "zipcode" && editableField !== "all"
                    // }
                    onChange={handleInputChange}
                    onClick={() => toggleEditableField("zipcode")}
                    className="appearance-none border rounded w-full py-2 px-3 text-[#232323] leading-tight focus:outline-none"
                    placeholder="Enter Your Zip Number"
                  />
                </div>
              </div>

              <div className="flex justify-end sm:pt-28 pt-8">
                <button
                  type="button"
                  onClick={async () => {
                    const data = await apiManager.patch(
                      "customer/auth/address",
                      {
                        fullName: profile.name,
                        email: profile.Profileemail,
                        phone: profile.number,
                        address: profile.Address,
                        city: profile.city,
                        state: selectedState?.value,
                        country: selectedCountry?.value,
                        postalCode: profile.zipcode,
                      }
                    );

                    if (data) {
                      toast.success("Address updated successfully!");
                      window.location.reload();
                    }
                  }}
                  className="bg-[#00A0E3] w-full max-w-[400px] rounded-[10px] text-white font-medium py-3  px-4 focus:outline-none "
                >
                  Save Changes
                </button>
              </div>
            </div>
          )}

          {activeSection === "Vouchers" && (
            <div className="sm:p-3 p-2 grid sm:grid-cols-3 grid-cols-1 gap-5">
              {giftCard.map((item, i) => (
                <div key={i}>
                  <Image
                    src={item?.image}
                    alt=""
                    className=""
                    height={250}
                    width={330}
                  />
                  <p className="pt-1 text-[#2B2A29] font-medium SF_Pro">
                    {item?.title}
                  </p>
                  <div className="flex items-end gap-x-3">
                    <p className="bg-linear-gradient mt-1 px-1 inline-flex items-center  text-white gap-x-1 rounded">
                      4.5
                      <PiStarFill className="text-white" size={14} />
                    </p>
                    <p className="text-base text-[#4D4D4D]">(1,127)</p>
                  </div>
                  <p className="text-xl text-[#4D4D4D] pt-2">₹ {item?.price}</p>
                </div>
              ))}
            </div>
          )}

          {activeSection === "MyCoupon" && (
            <div className="sm:p-3 p-2 grid sm:grid-cols-3 grid-cols-1 gap-5">
              {coupons.map((item, i) => (
                <div key={i}>
                  <Image
                    src={item?.image}
                    alt=""
                    className=""
                    height={250}
                    width={330}
                  />
                  <p className="pt-1 text-[#2B2A29] font-medium text-lg SF_Pro">
                    {item?.title}
                  </p>
                  <p className="pt-1 text-[#4D4D4D] text-sm gap-x-1">
                    Expired Date : {item.validTo}
                  </p>
                  <p className="text-lg text-[#4D4D4D] pt-2">₹{item?.price}</p>
                </div>
              ))}
            </div>
          )}

          {activeSection === "MyWallet" && (
            <div className="sm:p-3">
              <div className="flex justify-between pb-4 border-b border-[#D9D9D9]">
                <p className="text-[#2B2A29] text-lg font-medium">My Wallet</p>
                <p className="gradient-text text-lg font-bold">
                  ₹
                  {orders?.reduce(
                    (total, item) => total + item?.totalAmount,
                    0
                  )}
                </p>
              </div>
              <div className="overflow-x-auto pt-5">
                <table className="min-w-full border-collapse border border-gray-300">
                  <thead className="bg-gray-100 border-b border-[#d7d7d7]">
                    <tr>
                      <th className="px-4 py-2 text-left font-medium text-[#2B2A29]">
                        Sr.No
                      </th>
                      <th className="px-4 py-2 text-left font-medium text-[#2B2A29]">
                        Transaction No
                      </th>
                      <th className="px-4 py-2 text-left font-medium text-[#2B2A29]">
                        Product Name
                      </th>
                      <th className="px-4 py-2 text-left font-medium text-[#2B2A29]">
                        Date
                      </th>
                      <th className="px-4 py-2 text-left font-medium text-[#2B2A29]">
                        Time
                      </th>
                      <th className="px-4 py-2 text-left font-medium text-[#2B2A29]">
                        Price
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {data.map((item, index) => (
                      <tr
                        key={item.transactionNo}
                        className="hover:bg-gray-50 border-b border-[#d7d7d7]"
                      >
                        <td className="px-4 py-2 text-[#7E7E7E] text-sm text-center">
                          {index + 1}.
                        </td>
                        <td className="px-4 py-2 text-[#7E7E7E] text-sm ">
                          {item?.orderNumber}
                        </td>
                        <td className="px-4 py-2 text-[#7E7E7E] text-sm">
                          {item?.productName}
                        </td>
                        <td className="px-4 py-2 text-[#7E7E7E] text-sm">
                          {item?.createdAt}
                        </td>
                        <td className="px-4 py-2 text-[#7E7E7E] text-sm">
                          {item?.time}
                        </td>
                        <td className="px-4 py-2 text-[#7E7E7E] text-sm">
                          {item.totalAmount}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}
        </div>
      </div>
    </WebLayout>
  );
};

export default page;
