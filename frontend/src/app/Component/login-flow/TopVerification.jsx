"use client";
import Image from "next/image";
import React, { useState, useRef } from "react";

export const OtpVerification = ({ otp, setOtp, email, setVerified }) => {
  const inputRefs = useRef([]);

  const handleChange = (element, index) => {
    const value = element.value.replace(/[^0-9]/g, "");
    const newOtp = [...otp];

    if (value) {
      newOtp[index] = value;
      setOtp(newOtp);

      if (index < otp.length - 1) {
        inputRefs.current[index + 1].focus();
      }
    } else {
      newOtp[index] = "";
      setOtp(newOtp);
    }
  };

  const handleKeyDown = (e, index) => {
    const newOtp = [...otp];

    if (e.key === "Backspace") {
      if (otp[index]) {
        newOtp[index] = "";
        setOtp(newOtp);
      } else if (index > 0) {
        inputRefs.current[index - 1].focus();
        newOtp[index - 1] = "";
        setOtp(newOtp);
      }
    }
  };

  const handleSubmit = async () => {
    try {
      const data = await apiManager.post("customer/auth/verify-otp", {
        email,
        otp,
      });

      if (data) {
        toast.success("OTP Verified Successfully!");
        setVerified(true);
      }
    } catch (err) {
      toast.error(err?.response?.data?.message);
    }
  };

  const resendCode = async () => {
    try {
      const data = await apiManager.post("customer/auth/forgot-password", {
        email,
      });
      toast.success("OTP Resent Successfully!");
    } catch (err) {
      toast.error(err?.response?.data?.message);
    }
  };

  return (
    <>
      <div className="w-full max-w-[1300px] sm:pb-9 pb-7 mx-auto sm:px-0 px-4 pt-14">
        <Image
          src="/assets/images/logo.png"
          alt="logo image"
          height={70}
          width={150}
          className="cursor-pointer sm:h-[50px] h-9 w-auto"
        />
        <div className="h-auto flex  justify-center pt-14">
          <div className="bg-white shadow-[0px_4px_10px_0px_#2323231A] border border-[#E9E9E9] rounded-2xl sm:px-12 px-3 w-full max-w-[590px] p-8">
            <h1 className="sm:text-3xl text-2xl SF_Pro font-bold mb-1 text-gray-800">
              OTP Verification
            </h1>
            <p className="text-[#2B2A29] text-sm mb-6">
              We sent a code {email}
            </p>
            <form className="space-y-4">
              <div className="flex gap-4 mb-6">
                {otp.map((value, index) => (
                  <input
                    key={index}
                    type="number"
                    maxLength="1"
                    value={value}
                    onChange={(e) => handleChange(e.target, index)}
                    onKeyDown={(e) => handleKeyDown(e, index)}
                    ref={(ref) => (inputRefs.current[index] = ref)}
                    className="md:w-12 w-9 sm:h-12 h-9 text-center text-lg border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                ))}
              </div>
              <div className="pt-5">
                <button
                  onClick={handleSubmit}
                  type="submit"
                  className="w-full bg-[#00A0E3] text-white py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-offset-2"
                >
                  Continue
                </button>
              </div>
              <p className="text-gray-600 mt-4">
                Didn't receive the email?{" "}
                <span
                  onClick={resendCode}
                  className="text-blue-500 cursor-pointer hover:underline"
                >
                  Click to resend
                </span>
              </p>
            </form>
          </div>
        </div>
      </div>
    </>
  );
};
