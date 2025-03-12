import { InputHTMLAttributes, forwardRef } from "react";
import { cn } from "@/utils/cn";

interface CustomInputProps extends InputHTMLAttributes<HTMLInputElement> {
  className?: string;
}

const CustomInput = forwardRef<HTMLInputElement, CustomInputProps>(({ className, ...props }, ref) => {
  return (
    <input
      {...props}
      ref={ref}
      className={cn(
        " focus:outline-none pl-[10px] rounded-[10px] border-[none] w-full h-full bg-[#2b2b2b] text-[#f1f1f1]",
        className
      )}
    />
  );
});

CustomInput.displayName = "CustomInput";

export default CustomInput;
