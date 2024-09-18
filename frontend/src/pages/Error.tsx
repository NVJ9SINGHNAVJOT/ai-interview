import { useNavigate } from "react-router-dom";

const Error = () => {
  const navigate = useNavigate();
  return (
    <div className="w-full flex flex-col md:flex-row bg-grayblack h-[calc(100vh-4rem)] justify-around items-center gap-x-4">
      <p className="text-[10rem] lg:text-[12rem] font-bold tracking-wider text-white mx-4">404</p>

      <div className=" text-white flex flex-col items-center mx-4">
        <h2 className="my-2  font-bold text-2xl text-center">
          Looks like you've found the doorway to the great nothing
        </h2>
        <p className="my-2  text-center">Sorry about that! Please visit our hompage to get where you need to go.</p>
        <button
          className="w-auto mt-16 border rounded md py-4 px-8 text-center
          hover:text-black hover:bg-white transition-all ease-in-out"
          onClick={() => navigate("/")}
        >
          Take me there!
        </button>
      </div>
    </div>
  );
};

export default Error;
