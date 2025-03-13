import { NavLink, useLocation, useNavigate } from "react-router-dom";
import SignInButton from "@/components/buttons/SignInButton";
import { useAppSelector } from "@/redux/store";

const menuItems = ["Home", "Interview", "MCQ", "Dashboard", "About"];

const MainNavbar = () => {
  const navigate = useNavigate();
  const authUser = useAppSelector((state) => state.auth.authUser);
  const siteLoading = useAppSelector((state) => state.loading.siteLoading);

  return (
    <nav
      className={`bg-neutral-950 sticky z-[100] text-white top-0 px-2 lm:px-7 flex h-[3.8rem] w-full items-center 
        justify-between shadow-[inset_0px_-15px_20px_rgba(41,41,41,0.5)]
        ${siteLoading === true && "*:hidden animate-pulse"} `}
    >
      {/* Main logo and name */}
      <div
        onClick={() => navigate("/")}
        className=" h-[94%] flex flex-col justify-evenly lm:justify-end items-center rounded-md cursor-pointer"
      >
        <img src="images/mainLogo.jpg" alt="logo" className=" w-10 lm:w-[3.9rem] rounded-md" />
        <p className="text-[0.48rem]  lm:text-xs font-be-veitnam-pro ">AI Interview</p>
      </div>

      {/* Menu items */}
      <div className="flex gap-x-2 lm:gap-x-5">
        {menuItems.map((item, index) => {
          return (
            <NavLink
              key={index}
              className={({ isActive }) =>
                `ct-botton-elegante px-[10px] lm:px-[15px] py-[3px] lm:py-[5px] text-[0.85rem] lm:text-base ${
                  isActive ? "after:scale-[4] border-[#666666] bg-[#292929]" : ""
                } hover:after:scale-[4] hover:border-[#666666] hover:bg-[#292929]`
              }
              to={item === "Home" ? "/" : `/${item.toLowerCase()}`}
            >
              {item}
            </NavLink>
          );
        })}
      </div>

      {/* Sign in buttons or user name */}

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
