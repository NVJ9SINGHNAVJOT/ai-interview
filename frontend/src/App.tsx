import { Outlet } from "react-router-dom";
import MainNavbar from "@/components/common/MainNavbar";
import { useEffect, useRef } from "react";
import { checkUserApi } from "@/services/operations/authApi";
import { useDispatch } from "react-redux";
import { setAuthUser } from "@/redux/slices/authSlice";
import { setSiteLoading } from "@/redux/slices/loadingSlice";
import { useAppSelector } from "@/redux/store";
import SpheresLoading from "@/components/loaders/SpheresLoading/SpheresLoading";
import Page from "@/components/wrapper/Page";

function App() {
  const dispatch = useDispatch();
  const siteLoading = useAppSelector((state) => state.loading.siteLoading);

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
      <main className="relative mx-auto w-full h-full min-w-minContent max-w-maxContent overflow-y-auto overflow-x-hidden">
        {/* ===== main nav bar ===== */}
        <MainNavbar />
        {siteLoading === true ? (
          // Site loading
          <Page className="bg-neutral-800 flex justify-center items-center">
            <SpheresLoading />
          </Page>
        ) : (
          // All pages
          <Outlet />
        )}
      </main>
    </div>
  );
}

export default App;
