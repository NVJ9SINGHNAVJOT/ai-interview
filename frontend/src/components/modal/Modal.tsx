import { cn } from "@/utils/cn";
import { ReactNode } from "react";

const Modal = (props: { className?: string; children: ReactNode }) => {
  return (
    <div
      className={cn(
        "fixed inset-0 z-[1000] backdrop-blur-[5px] mx-auto w-full h-full min-w-minContent max-w-maxContent overflow-scroll overflow-x-hidden",
        props.className
      )}
    >
      {props.children}
    </div>
  );
};

export default Modal;
