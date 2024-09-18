import { RefObject, useEffect } from "react";
import { useLocation } from "react-router-dom";

const useScrollOnTop = (ref: RefObject<HTMLDivElement>) => {
  const location = useLocation();

  useEffect(() => {
    // Check if the ref and current property are not null
    if (ref.current) {
      // Scroll to the top of the div element
      ref.current.scroll({ top: 0, behavior: "instant" });
      ref.current.scrollTop = 0;
    }
  }, [ref, location.pathname]); // Dependency on pathname
};

export default useScrollOnTop;
