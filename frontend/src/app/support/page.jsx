"use client";
import Image from "next/image";
import React, { useState } from "react";
import { IoMailSharp } from "react-icons/io5";
import { PiMapPinFill, PiPhoneFill } from "react-icons/pi";
import { toast } from "react-toastify";
import WebLayout from "../Layout/WebLayout";

const Support = () => {
  const support_image = [
    "/assets/images/support-image.png",
    "/assets/images/support-image.png",
    "/assets/images/support-image.png",
  ];

  const [formData, setFormData] = useState({
    productModelNo: "",
    productSerialNo: "",
    billingName: "",
    billingDate: "",
    contactNo: "",
    problemDiscuss: "",
    issueType: [],
    problemDiscuss: "",
  });

  const [errors, setErrors] = useState({});
  console.log(errors, "error.....");

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleCheckboxChange = (e) => {
    const { value } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      issueType: prevState.issueType.includes(value)
        ? prevState.issueType.filter((issue) => issue !== value)
        : [...prevState.issueType, value],
    }));
  };

  const validateForm = () => {
    const newErrors = {};
    if (!formData.productModelNo)
      newErrors.productModelNo = "Product Model No is required";
    if (!formData.productSerialNo)
      newErrors.productSerialNo = "Product Serial No is required";
    if (!formData.billingName)
      newErrors.billingName = "Billing Name is required";
    if (!formData.billingDate)
      newErrors.billingDate = "Billing Date is required";
    if (!formData.contactNo) newErrors.contactNo = "Contact No is required";
    if (!formData.issueType.length)
      newErrors.issueType = "Please select at least one issue type";
    if (!formData.problemDiscuss)
      newErrors.problemDiscuss = "Problem Discuss field is require";
    return newErrors;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const newErrors = validateForm();
      setErrors(newErrors);

      if (Object.keys(newErrors).length === 0) {
        const data = await apiManager.post("customer/support", {
          issueType: formData.issueType,
          productModelNo: formData.productModelNo,
          productSerialNo: formData.productSerialNo,
          billingName: formData.billingName,
          billingDate: formData.billingDate,
          contact: formData.contactNo,
          message: formData.problemDiscuss,
        });
        toast.success(data?.message);
      }
    } catch (err) {
      toast.error(err?.response?.data?.message);
    }
  };

  return (
    <WebLayout>
      <div className="relative">
        <Image
          src="/assets/images/support-bg-image.png"
          alt="Best Seller background"
          height={650}
          width={1000}
          className="w-auto bg-cover h-[641px] sm:block hidden absolute left-0 -z-10 -bottom-[228px]"
        />
        <div className="w-full max-w-[1200px] mx-auto sm:px-0 px-4 z-10">
          <div className="flex justify-center text-center pt-10">
            <h1 className="sm:w-full sm:max-w-[500px] w-auto sm:text-4xl text-2xl text-[#2B2A29] font-semibold">
              Welcome to Icon Digital Customer Support
            </h1>
          </div>
          <div className="sm:grid grid-cols-3 sm:pt-12 pt-8 pb-8 border-b border-[#DCDCDC] sm:gap-x-14 gap-x-8 flex overflow-x-auto">
            {support_image.map((item, i) => (
              <Image
                src={item}
                alt="support image"
                height={270}
                width={380}
                className="sm:h-[262px] h-[200px] w-auto"
                key={i}
              />
            ))}
          </div>

          <div className="pt-12">
            <div className="flex justify-center text-center">
              <div>
                <h3 className="text-center text-[#232323] font-semibold text-xl">
                  Icon Digital Laptop Support
                </h3>
                <p className="sm:w-full sm:max-w-[650px] sm:pt-5 pt-2 w-auto text-[#4D4D4D] text-base">
                  Lorem Ipsum is simply dummy text of the printing and
                  typesetting industry. Lorem Ipsum has been the industry's
                  standard dummy text ever since the 1500s.
                </p>
              </div>
            </div>
            <div className="flex justify-between sm:flex-nowrap flex-wrap pt-11 gap-x-7">
              <div className="shadow-[0px_4px_10px_0px_#2323231A] sm:w-1/2 p-5 sm:pt-5 pt-2 sm:pb-12 pb-6 h-auto bg-[#F9F9F9] border border-[#E9E9E9] rounded-2xl">
                <form onSubmit={handleSubmit} className="">
                  {/* Product Model No */}
                  <div className="mb-4 input-container">
                    <label
                      htmlFor="productModelNo"
                      className="block input-label text-[#232323] text-sm mb-2"
                    >
                      Product Model No
                    </label>
                    <input
                      name="productModelNo"
                      type="text"
                      value={formData.productModelNo}
                      onChange={handleChange}
                      className="appearance-none input-field border rounded w-full py-2 px-3 text-[#232323] leading-tight focus:outline-none"
                      placeholder="E4432EGTYH"
                    />
                    {errors.productModelNo && (
                      <p className="text-red-500 text-xs italic">
                        {errors.productModelNo}
                      </p>
                    )}
                  </div>

                  {/* Product Serial No */}
                  <div className="mb-4 input-container">
                    <label
                      htmlFor="productSerialNo"
                      className="block input-label text-[#232323] text-sm mb-2"
                    >
                      Product Serial No
                    </label>
                    <input
                      name="productSerialNo"
                      type="text"
                      value={formData.productSerialNo}
                      onChange={handleChange}
                      className="appearance-none border input-field rounded w-full py-2 px-3 text-[#232323] leading-tight focus:outline-none"
                      placeholder="156458-216574-232"
                    />
                    {errors.productSerialNo && (
                      <p className="text-red-500 text-xs italic">
                        {errors.productSerialNo}
                      </p>
                    )}
                  </div>

                  {/* Billing Name and Date */}
                  <div className="flex space-x-4 mb-4">
                    <div className="w-1/2 input-container">
                      <label
                        htmlFor="billingName"
                        className="block input-label text-[#232323] text-sm mb-2"
                      >
                        Billing Name
                      </label>
                      <input
                        name="billingName"
                        type="text"
                        value={formData.billingName}
                        onChange={handleChange}
                        className="appearance-none border input-field rounded w-full py-2 px-3 text-[#232323] leading-tight focus:outline-none"
                        placeholder="Tushar Patel"
                      />
                      {errors.billingName && (
                        <p className="text-red-500 text-xs italic">
                          {errors.billingName}
                        </p>
                      )}
                    </div>
                    <div className="w-1/2 input-container">
                      <label
                        htmlFor="billingDate"
                        className="block input-label text-[#232323] text-sm mb-2"
                      >
                        Billing Date
                      </label>
                      <input
                        name="billingDate"
                        type="date"
                        value={formData.billingDate}
                        onChange={handleChange}
                        className="appearance-none border input-field rounded w-full py-2 px-3 text-[#232323] leading-tight focus:outline-none"
                      />
                      {errors.billingDate && (
                        <p className="text-red-500 text-xs italic">
                          {errors.billingDate}
                        </p>
                      )}
                    </div>
                  </div>

                  {/* Contact No */}
                  <div className="mb-4 input-container">
                    <label
                      htmlFor="contactNo"
                      className="block input-label text-[#232323] text-sm mb-2"
                    >
                      Contact No
                    </label>
                    <input
                      name="contactNo"
                      type="text"
                      value={formData.contactNo}
                      onChange={handleChange}
                      className="appearance-none border rounded input-field w-full py-2 px-3 text-[#232323] leading-tight focus:outline-none"
                      placeholder="+91 9853178531"
                    />
                    {errors.contactNo && (
                      <p className="text-red-500 text-xs italic">
                        {errors.contactNo}
                      </p>
                    )}
                  </div>

                  {/* Problem Discuss */}
                  <div className="mb-4 input-container">
                    <label
                      htmlFor="problemDiscuss"
                      className="block input-label text-[#232323] text-sm mb-2"
                    >
                      Problem Discuss
                    </label>
                    <textarea
                      name="problemDiscuss"
                      value={formData.problemDiscuss}
                      onChange={handleChange}
                      className="appearance-none border rounded input-field w-full py-2 px-3 text-[#232323] leading-tight focus:outline-none"
                      placeholder="Message"
                    />
                    {errors.problemDiscuss && (
                      <p className="text-red-500 text-xs italic">
                        {errors.problemDiscuss}
                      </p>
                    )}
                  </div>

                  {/* Issue Type */}
                  <div className="mb-9">
                    <label className="block text-[#232323] text-sm mb-2">
                      Issue Type
                    </label>
                    <div className="grid grid-cols-2 gap-2">
                      {[
                        "Power Off",
                        "Accessories Not Working",
                        "Speed Issue",
                        "Speed Issue",
                      ].map((issue, index) => (
                        <label key={index} className="flex items-center">
                          <input
                            type="checkbox"
                            value={issue}
                            checked={formData.issueType.includes(issue)}
                            onChange={handleCheckboxChange}
                            className="mr-2 leading-tight"
                          />
                          <span className="text-[#232323]">{issue}</span>
                        </label>
                      ))}
                    </div>
                    {errors.issueType && (
                      <p className="text-red-500 text-xs italic">
                        {errors.issueType}
                      </p>
                    )}
                  </div>

                  {/* Submit Button */}
                  <div className="flex items-center justify-center">
                    <button
                      type="submit"
                      className="bg-[#00A0E3] w-full rounded-[10px] text-white font-bold py-3  px-4 focus:outline-none "
                    >
                      Submit
                    </button>
                  </div>
                </form>
              </div>
              <div className="space-y-6 sm:pt-0 pt-5 sm:w-1/2">
                <div className="flex gap-x-4">
                  <div className="w-5 h-5">
                    <PiMapPinFill className="text-[#0A79C1]" size={20} />
                  </div>
                  <div className="">
                    <p className="gradient-text text-lg font-semibold">
                      Main branch of Icon Digital
                    </p>
                    <p className="pt-1 text-[#232323] font-medium text-sm">
                      SHOP NO. 2-3, BASEMENT, vishnu complex, POLICE STATION,
                      PLOT NO. 158/B, Varachha Main Rd, opp. SUMANGAL SOC,
                      Varachha, Surat, Gujarat 395006
                    </p>
                  </div>
                </div>
                <div className="flex gap-x-4">
                  <div className="w-5 h-5">
                    <PiMapPinFill className="text-[#0A79C1]" size={20} />
                  </div>
                  <div>
                    <h3 className="gradient-text text-lg font-semibold">
                      Branch - 2 of icon digital
                    </h3>
                    <p className="pt-1 text-[#232323] font-medium text-sm">
                      Shop No G/38, Marvella Corridor, Avadh Arena, VIP Road,
                      opposite Chroma, Bharthana, Surat, Gujarat 395007
                    </p>
                  </div>
                </div>
                <div className="flex gap-x-4">
                  <div className="w-5 h-5">
                    <PiMapPinFill className="text-[#0A79C1]" size={20} />
                  </div>
                  <div>
                    <h3 className="gradient-text text-lg font-semibold">
                      Branch - 3 of icon digital
                    </h3>
                    <p className="pt-1 text-[#232323] font-medium text-sm">
                      Shop No 1, Ground Floor, AR Mall Utran, opposite Panvel
                      Point, Mota Varachha, Surat, Gujarat 394101
                    </p>
                  </div>
                </div>
                <div className="flex gap-x-4">
                  <div className="w-5 h-5">
                    <IoMailSharp className="text-[#0A79C1]" size={20} />
                  </div>
                  <div>
                    <h3 className="gradient-text text-lg font-semibold">
                      Email Us
                    </h3>
                    <p className="pt-1 text-[#232323] font-medium text-sm">
                      icondigitalsupport@gmail.com
                    </p>
                  </div>
                </div>
                <div className="flex gap-x-4">
                  <div className="w-5 h-5">
                    <PiPhoneFill className="text-[#0A79C1]" size={20} />
                  </div>
                  <div>
                    <h3 className="gradient-text text-lg font-semibold">
                      Call Us
                    </h3>
                    <p className="pt-1 text-[#232323] font-medium text-sm">
                      +91 98539 21197
                    </p>
                    <p className="pt-1 text-[#232323] font-medium text-sm">
                      +91 82641 26736
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </WebLayout>
  );
};

export default Support;
