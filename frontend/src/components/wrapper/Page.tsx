import { cn } from "@/utils/cn";
import { ReactNode } from "react";

const Page = (props: { className?: string; children: ReactNode }) => {
  return (
    <div className="w-full h-[calc(100%-3.8rem)] overflow-y-auto">
      <div className={cn("w-full h-full min-h-fit ", props.className)}>{props.children}</div>
    </div>
  );
};

export default Page;
