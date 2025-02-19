"use client";
import { useState } from "react";
import { ForgetPassword } from "../Component/login-flow/Forgetpassword";
import { ResentPassword } from "../Component/login-flow/ResetPassword";
import { OtpVerification } from "../Component/login-flow/TopVerification";

export default function Page() {
  const [email, setEmail] = useState("");
  const [otp, setOtp] = useState("");
  const [otpSent, setOtpSent] = useState(false);
  const [isVerified, setIsVerified] = useState(false);

  return (
    <div>
      {isVerified ? (
        <ResentPassword />
      ) : otpSent ? (
        <OtpVerification setVerified={setIsVerified} email={email} otp={otp} setOtp={setOtp} />
      ) : (
        <ForgetPassword
          setOtpSent={setOtpSent}
          email={email}
          setEmail={setEmail}
        />
      )}
    </div>
  );
}
