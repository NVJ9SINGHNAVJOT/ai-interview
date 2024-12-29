import { useLocation, useNavigate } from "react-router-dom";

const menuItems = ["Home", "Interview", "MCQ", "Dashboard", "About"];

const MainNavbar = () => {
  const location = useLocation();
  const navigate = useNavigate();

  return (
    <nav
      className="ct-navbar-b sticky text-white top-0 flex h-[3.8rem] w-full items-center 
      justify-between"
    >
      {/* main logo and name */}
      <div className="flex flex-col justify-center items-center ml-3 rounded-md cursor-pointer">
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
                location.pathname.includes(item.toLocaleLowerCase()) === true &&
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

      {/* sign in button */}
      <button>Sign In</button>
    </nav>
  );
};

export default MainNavbar;
