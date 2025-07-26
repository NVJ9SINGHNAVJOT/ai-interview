import { Outlet } from "react-router-dom";
import MainNavbar from "@/components/common/MainNavbar";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { setAuthUser } from "@/redux/slices/authSlice";
import { setSiteLoading } from "@/redux/slices/loadingSlice";
import { useAppSelector } from "@/redux/store";
import SpheresLoading from "@/components/loaders/SpheresLoading/SpheresLoading";
import Page from "@/components/wrapper/Page";
import { authRoutes } from "@/services/operations/authRoutes";
import { useApi } from "@/hooks/useApi";
import { em } from "framer-motion/client";

function App() {
  const dispatch = useDispatch();
  const siteLoading = useAppSelector((state) => state.loading.siteLoading);

  useEffect(() => {
    (async () => {
      // const { error, response } = await authRoutes.checkUserApi();
      // if (!error && response.data) {
      //   dispatch(setAuthUser(response.data.user));
      // }
      // dispatch(setSiteLoading(false));
      const { execute, cancel, response, error, loading } = useApi(authRoutes.logInApi);

      await execute(emailId, password);
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
