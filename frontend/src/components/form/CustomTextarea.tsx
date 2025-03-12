import { TextareaHTMLAttributes, forwardRef } from "react";
import { cn } from "@/utils/cn";

interface CustomTextareaProps extends TextareaHTMLAttributes<HTMLTextAreaElement> {
  className?: string;
}

const CustomTextarea = forwardRef<HTMLTextAreaElement, CustomTextareaProps>(({ className, ...props }, ref) => {
  return (
    <textarea
      {...props}
      ref={ref}
      className={cn(
        "min-h-60 focus:outline-none pl-[10px] pt-[10px] rounded-[10px] border-[none] w-full h-full bg-[#2b2b2b] text-[#f1f1f1]",
        className
      )}
    />
  );
});

CustomTextarea.displayName = "CustomTextarea";

export default CustomTextarea;
