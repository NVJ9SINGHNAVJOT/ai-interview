import { cn } from "@/utils/cn";
import { ReactNode } from "react";
import { FieldError } from "react-hook-form";

const FormField = (props: {
  className?: string;
  title: string;
  error?: FieldError | undefined;
  children: ReactNode;
}) => {
  return (
    <div className={cn(" flex flex-col gap-y-[0.15rem]", props.className)}>
      <label className=" text-[#f1f1f1] text-[0.77rem] font-semibold">{props.title}</label>
      <div
        className={`
        ${props.error !== undefined ? "border-red-500" : "focus-within:border-[#2d79f3]"}
         border-[1.5px] border-[solid] border-[#333] rounded-[10px] min-h-[45px] flex items-center [transition:0.2s_ease-in-out] bg-[#2b2b2b]`}
      >
        {props.children}
      </div>
    </div>
  );
};

export default FormField;
