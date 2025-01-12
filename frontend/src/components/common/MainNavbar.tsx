import { useLocation, useNavigate } from "react-router-dom";
import SignInButton from "@/components/buttons/SignInButton";
import { useAppSelector } from "@/redux/store";

const menuItems = ["Home", "Interview", "MCQ", "Dashboard", "About"];

const MainNavbar = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const authUser = useAppSelector((state) => state.auth.authUser);
  const siteLoading = useAppSelector((state) => state.loading.siteLoading);

  return (
    <nav
      className={`bg-neutral-950 sticky text-white top-0 px-7 flex h-[3.8rem] w-full items-center 
        justify-between shadow-[inset_0px_-10px_20px_rgba(41,41,41,0.5)]
        ${siteLoading === true && "*:hidden animate-pulse"} `}
    >
      {/* main logo and name */}
      <div
        onClick={() => navigate("/")}
        className="flex flex-col justify-center items-center rounded-md cursor-pointer"
      >
        <img src="images/mainLogo.jpg" alt="logo" className=" w-16 rounded-md" />
        <p className="text-xs font-be-veitnam-pro ">AI Interview</p>
      </div>

      {/* menu items */}
      <div className=" flex gap-x-5">
        {menuItems.map((item, index) => {
          return (
            <ul
              key={index}
              className={`ct-botton-elegante cursor-pointer ${
                ((location.pathname === "/" && item === "Home") ||
                  location.pathname.includes(item.toLocaleLowerCase()) === true) &&
                "after:scale-[4] border-[#666666] bg-[#292929]"
              } hover:after:scale-[4] hover:border-[#666666] hover:bg-[#292929]`}
              onClick={() => {
                if (item === "Home") {
                  navigate("/");
                } else {
                  navigate(`/${item.toLocaleLowerCase()}`);
                }
              }}
            >
              {item}
            </ul>
          );
        })}
      </div>

      {/* sign in buttons or user name */}

      {authUser === null ? (
        <SignInButton />
      ) : (
        <div
          onClick={() => navigate("/dashboard")}
          className="flex size-11 cursor-pointer items-center justify-center gap-1 rounded-full ring-2 ring-[#818181] transition-all ease-in-out hover:bg-[#414141] "
        >
          <span className="text-xl uppercase font-semibold">{authUser.firstName.charAt(0)}</span>
          <span className="text-xl uppercase font-semibold">{authUser.lastName.charAt(0)}</span>
        </div>
      )}
    </nav>
  );
};

export default MainNavbar;
