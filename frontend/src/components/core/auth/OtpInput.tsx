import React, { useEffect, useRef, useState } from "react";
import { useParams } from "react-router";

type OtpInputProps = {
  // eslint-disable-next-line no-unused-vars
  otpFields: string[];
  setOtpFields: React.Dispatch<React.SetStateAction<string[]>>;
};

const OtpInput = (props: OtpInputProps) => {
  const ref = useRef<HTMLInputElement[]>([]);
  const { type } = useParams();

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>, index: number) => {
    const key = e.key;

    if (key === "ArrowLeft") {
      if (index > 0) {
        ref.current[index - 1].focus();
      }
      return;
    }
    if (key === "ArrowRight") {
      if (index + 1 < 6) {
        ref.current[index + 1].focus();
      }
      return;
    }

    if (key === "Backspace") {
      props.setOtpFields((prev) => prev.map((value, i) => (i === index ? "" : value)));

      if (index > 0) {
        ref.current[index - 1].focus();
      }
      return;
    }
    if (/^\d$/.test(key)) {
      props.setOtpFields((prev) => prev.map((value, i) => (i === index ? key : value)));

      if (index + 1 < 6) {
        ref.current[index + 1].focus();
      }
    }
  };

  const handlePaste = (e: React.ClipboardEvent<HTMLInputElement>) => {
    const pastedValue = e.clipboardData.getData("text");
    const otpDigits = /^[0-9]{6}$/.test(pastedValue);
    if (otpDigits && pastedValue.length === 6) {
      props.setOtpFields(pastedValue.split(""));
      ref.current[5].focus();
    }
  };

  useEffect(() => {
    ref.current[0].focus();
  }, []);

  return (
    <div className="flex w-full flex-col items-center justify-center gap-y-4 text-white">
      <h2 className="font-be-veitnam-pro text-2xl">OTP {type === "login" ? "Validation" : "Verification"}</h2>
      <p>Enter the 6-digit OTP you have received</p>
      <div className=" mx-auto  flex justify-center  max-w-60 gap-x-4 ">
        {props.otpFields.map((value, index) => (
          <input
            className="h-12 w-9 rounded-lg border-[2px] border-transparent bg-[#0a161b] px-1 
            pb-1 text-center text-white outline-none outline-[none] duration-200 
             focus:border-[rgb(152,88,255)]"
            key={index}
            ref={(currentInput) => {
              if (currentInput) {
                ref.current[index] = currentInput;
              }
            }}
            type="text"
            maxLength={1}
            minLength={1}
            value={value}
            onKeyDown={(e) => handleKeyDown(e, index)}
            onChange={() => {}}
            onPaste={(e) => {
              if (index === 0) {
                handlePaste(e);
              }
            }}
          />
        ))}
      </div>
    </div>
  );
};

export default OtpInput;
