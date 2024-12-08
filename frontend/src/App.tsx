import { Outlet } from "react-router-dom";
import MainNavbar from "@/components/common/MainNavbar";
import { useRef } from "react";
import useScrollOnTop from "@/hooks/useScrollOnTop";

function App() {
  const pageRenderDivRef = useRef<HTMLDivElement>(null);
  useScrollOnTop(pageRenderDivRef);

  return (
    // wrapper
    <div className="h-screen w-screen min-w-minContent">
      {/* ===== all pages will be rendered below ===== */}
      <main
        ref={pageRenderDivRef}
        className="mx-auto w-full h-full min-w-minContent max-w-maxContent overflow-y-auto overflow-x-hidden"
      >
        {/* ===== main nav bar ===== */}
        <MainNavbar />
        <Outlet />
      </main>
    </div>
  );
}

export default App;
