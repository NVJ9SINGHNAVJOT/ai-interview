import { CiMail } from "react-icons/ci";

const LogInForm = () => {
  return (
    <form className="ct-sign-in-form flex flex-col gap-3">
      <p className=" text-white self-center text-4xl py-5 font-semibold">Log In</p>
      <label className=" text-[#f1f1f1] font-semibold">Email </label>

      <div className=" focus-within:border-[1.5px] focus-within:border-[solid] focus-within:border-[#2d79f3] border-[1.5px] border-[solid] border-[#333] rounded-[10px] h-[50px] flex items-center pl-[10px] [transition:0.2s_ease-in-out] bg-[#2b2b2b]">
        <CiMail className=" text-black size-6" />
        <input
          type="text"
          className=" focus:outline-none ml-[10px] rounded-[10px] border-[none] w-full h-full bg-[#2b2b2b] text-[#f1f1f1]"
          placeholder="Enter your Email"
        />
      </div>

      <button
        type="submit"
        className="ml-[0] mr-[0] my-[20px] bg-[#2d79f3] border-[none] text-[white] text-[15px] font-medium rounded-[10px] h-[50px] w-full cursor-pointer"
      >
        Submit
      </button>
    </form>
  );
};

export default LogInForm;
