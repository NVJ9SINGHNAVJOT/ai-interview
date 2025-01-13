import { Outlet } from "react-router-dom";
import MainNavbar from "@/components/common/MainNavbar";
import { useEffect, useRef } from "react";
import useScrollOnTop from "@/hooks/useScrollOnTop";
import { checkUserApi } from "@/services/operations/authApi";
import { useDispatch } from "react-redux";
import { setAuthUser } from "@/redux/slices/authSlice";
import { setSiteLoading } from "@/redux/slices/loadingSlice";
import { useAppSelector } from "@/redux/store";
import MultiCubeLoader from "@/components/loaders/multicubeloader/MultiCubeLoader";

function App() {
  const pageRenderDivRef = useRef<HTMLDivElement>(null);
  const dispatch = useDispatch();
  const siteLoading = useAppSelector((state) => state.loading.siteLoading);
  useScrollOnTop(pageRenderDivRef);

  useEffect(() => {
    (async () => {
      const { error, response } = await checkUserApi();
      if (!error && response.data) {
        dispatch(setAuthUser(response.data));
      }
      dispatch(setSiteLoading(false));
    })();
  }, []);
  return (
    // wrapper
    <div className="h-screen w-screen bg-black">
      {/* ===== all pages will be rendered below ===== */}
      <main
        ref={pageRenderDivRef}
        className="relative mx-auto w-full h-full min-w-minContent max-w-maxContent overflow-scroll overflow-x-hidden"
      >
        {/* ===== main nav bar ===== */}
        <MainNavbar />
        {siteLoading === true ? (
          // Site loading
          <div className="w-full min-h-[calc(100%-3.8rem)] bg-neutral-800 flex justify-center items-center">
            <MultiCubeLoader className=" animate-pulse" />
          </div>
        ) : (
          // All pages
          <Outlet />
        )}
      </main>
    </div>
  );
}

export default App;
