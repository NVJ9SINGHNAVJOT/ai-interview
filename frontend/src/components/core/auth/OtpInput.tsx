import { useEffect, useRef, useState } from "react";
import { toast } from "react-toastify";

type OtpInputProps = {
  // eslint-disable-next-line no-unused-vars
  submitOtpHandler: (otp: string) => Promise<void>;
};

const OtpInput = (props: OtpInputProps) => {
  const [loading, setLoading] = useState<boolean>(false);
  const [otpFields, setOtpFields] = useState<string[]>(new Array(6).fill(""));
  const ref = useRef<HTMLInputElement[]>([]);

  const otpHandler = () => {
    setLoading(true);
    if (!/^[1-9][0-9]{5}$/.test(otpFields.join(""))) {
      toast.info("6 digit otp is required");
    } else {
      props.submitOtpHandler(otpFields.join(""));
    }
    setLoading(false);
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>, index: number) => {
    const key = e.key;

    if (key === "ArrowLeft") {
      if (index > 0) {
        ref.current[index - 1].focus();
      }
      return;
    }
    if (key === "ArrowRight") {
      if (index + 1 < otpFields.length) {
        ref.current[index + 1].focus();
      }
      return;
    }

    const prevOtpFields = [...otpFields];

    if (key === "Backspace") {
      prevOtpFields[index] = "";
      setOtpFields(prevOtpFields);
      if (index > 0) {
        ref.current[index - 1].focus();
      }
      return;
    }
    if (/^\d$/.test(key)) {
      if (key === "0" && index === 0) {
        return;
      }
      prevOtpFields[index] = key;
      setOtpFields(prevOtpFields);
      if (index + 1 < otpFields.length) {
        ref.current[index + 1].focus();
      }
    }
  };

  const handlePaste = (e: React.ClipboardEvent<HTMLInputElement>) => {
    const pastedValue = e.clipboardData.getData("text");
    const otpDigits = /^[1-9][0-9]{5}$/.test(pastedValue);
    if (otpDigits && pastedValue.length === 6) {
      setOtpFields(pastedValue.split(""));
      ref.current[5].focus();
    }
  };

  useEffect(() => {
    ref.current[0].focus();
  }, []);

  return (
    <div className="flex w-full flex-col items-center justify-center gap-y-4 text-white">
      <h2 className="font-be-veitnam-pro text-2xl">OTP Verification</h2>
      <p>Enter the 6-digit OTP you have received</p>
      <div className=" mx-auto  flex justify-center  max-w-60 gap-x-4 ">
        {otpFields.map((value, index) => (
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
      <button
        disabled={loading || otpFields.some((value) => !/^\d$/.test(value))}
        onClick={otpHandler}
        className="w-10/12 rounded-sm bg-white p-1 text-black"
      >
        Submit
      </button>
    </div>
  );
};

export default OtpInput;
