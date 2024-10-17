"use client";

import { useState, useRef, useEffect } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { toast } from "@/hooks/use-toast";
import { useDispatch, useSelector } from "react-redux";
import { useRouter } from "next/navigation";
import { verifyOtp } from "@/store/authSlice";

export default function Component() {
  const [otp, setOtp] = useState(["", "", "", ""]);
  const [resendTimer, setResendTimer] = useState(0);
  const inputRefs = [useRef(null), useRef(null), useRef(null), useRef(null)];

  useEffect(() => {
    if (resendTimer > 0) {
      const timerId = setTimeout(() => setResendTimer(resendTimer - 1), 1000);
      return () => clearTimeout(timerId);
    }
  }, [resendTimer]);

  const handleChange = (index, value) => {
    if (isNaN(Number(value))) return;
    const newOtp = [...otp];
    newOtp[index] = value;
    setOtp(newOtp);

    // Move to next input if current field is filled
    if (value !== "" && index < 3) {
      inputRefs[index + 1].current?.focus();
    }
  };

  const handleKeyDown = (index, e) => {
    if (e.key === "Backspace" && otp[index] === "" && index > 0) {
      inputRefs[index - 1].current?.focus();
    }
  };

  const handlePaste = (e) => {
    e.preventDefault();
    const pastedData = e.clipboardData.getData("text").slice(0, 4).split("");
    const newOtp = [...otp];
    pastedData.forEach((value, index) => {
      if (index < 4 && !isNaN(Number(value))) {
        newOtp[index] = value;
      }
    });
    setOtp(newOtp);
    inputRefs[Math.min(pastedData.length, 3)].current?.focus();
  };
  const dispatch = useDispatch();
  const router = useRouter();
  const { isVerified } = useSelector((state) => state.auth);
  console.log(isVerified);
  const phoneNumber = localStorage.getItem("phoneNumber");

  const handleSubmit = () => {
    const otpString = otp.join("");

    if (otpString.length === 4) {
      // Dispatch the OTP and phone number for verification
      console.log("Submitting OTP:", otpString, phoneNumber);
      dispatch(verifyOtp({ otpString, phoneNumber }));

      // Show success toast
      toast({
        title: "OTP Submitted",
        description: `Your OTP ${otpString} has been submitted for verification.`,
      });
    } else {
      // Show error toast if OTP is incomplete
      toast({
        title: "Invalid OTP",
        description: "Please enter a complete 4-digit OTP.",
        variant: "destructive",
      });
    }
  };

  useEffect(() => {
    console.log(isVerified);

    if (isVerified) {
      router.push("patient-details"); // Navigate to patient details page if OTP is verified
    }
  }, [isVerified]); // Dependency on isVerified

  const handleResendOtp = () => {
    // Here you would typically call your API to resend the OTP
    console.log("Resending OTP");
    setResendTimer(30); // Set a 30-second cooldown
    toast({
      title: "OTP Resent",
      description: "A new OTP has been sent to your device.",
    });
    // Clear the current OTP fields
    setOtp(["", "", "", ""]);
    inputRefs[0].current?.focus();
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-background">
      <div className="w-full max-w-md p-8 space-y-4 bg-card rounded-xl shadow-lg">
        <h2 className="text-2xl font-bold text-center text-foreground">
          OTP Verification
        </h2>
        <p className="text-center text-muted-foreground">
          Enter the 4-digit code sent to your device
        </p>
        <div className="flex justify-center space-x-2">
          {otp.map((digit, index) => (
            <Input
              key={index}
              type="text"
              maxLength={1}
              value={digit}
              onChange={(e) => handleChange(index, e.target.value)}
              onKeyDown={(e) => handleKeyDown(index, e)}
              onPaste={handlePaste}
              ref={inputRefs[index]}
              className="w-12 h-12 text-center text-lg font-bold"
            />
          ))}
        </div>
        <Button onClick={handleSubmit} className="w-full">
          Verify OTP
        </Button>
        <div className="text-center">
          {resendTimer > 0 ? (
            <p className="text-sm text-muted-foreground">
              Resend OTP in {resendTimer}s
            </p>
          ) : (
            <Button variant="link" onClick={handleResendOtp}>
              Resend OTP
            </Button>
          )}
        </div>
      </div>
    </div>
  );
}
