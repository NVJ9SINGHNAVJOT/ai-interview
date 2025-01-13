import { FaGithub, FaLinkedin } from "react-icons/fa";

const About = () => {
  return (
    <div className="w-full min-h-[calc(100%-3.8rem)] flex flex-col justify-between">
      {/* main info */}
      <section className="flex justify-evenly items-center mt-28">
        <img alt="Loading..." src="images/logo.jpg" className=" h-fit w-[25rem]" />
        <div className="text-[#b0b0b0] text-[0.9rem] gap-y-4 flex flex-col justify-evenly p-5 w-[42rem] bg-[rgb(40,40,55)] bg-[linear-gradient(344deg,_rgba(40,40,55,1)_0%,_rgba(16,16,18,1)_50%)] [box-shadow:4px_6px_14px_#00000036] rounded-[3px] ">
          <p>
            AI Interview is a project built with passion and dedication for individuals striving to become the best
            versions of themselves. Created by Navjot Singh, this platform harnesses the power of AI to generate
            questions and evaluate user responses, offering an innovative and engaging way to improve skills.
          </p>
          <div className=" flex flex-col gap-y-2">
            <p>
              <span className=" text-white font-semibold">About the Creator:</span> Navjot Singh is a skilled Full-Stack
              Developer and Real-Time Systems Architect, specializing in Kafka and WebSockets. He is also an innovator
              in open-source media management, constantly pushing the boundaries of technology to create impactful
              solutions.
            </p>
            <div className=" flex flex-col gap-2 my-7">
              <a href="https://github.com/NVJ9SINGHNAVJOT" target="blank">
                <div className=" flex items-center gap-x-4 hover:text-white transition-all ease-in-out cursor-pointer">
                  <FaGithub className="size-10" />
                  <span>github.com/nvj9singhnavjot</span>
                </div>
              </a>
              <a href="https://www.linkedin.com/in/nvjsinghnavjot/" target="blank">
                <div className=" flex items-center gap-x-4 hover:text-white transition-all ease-in-out cursor-pointer">
                  <FaLinkedin className="size-10" />
                  <span>linkedin.com/in/nvjsinghnavjot</span>
                </div>
              </a>
            </div>
          </div>
          <p>
            This project is more than just an interview tool, it's a step toward leveraging AI to foster learning,
            growth, and confidence. Whether you're preparing for an interview or simply honing your skills, AI Interview
            is here to guide you every step of the way.
          </p>
        </div>
      </section>
      {/* contact us */}
      <section className=" "></section>
    </div>
  );
};

export default About;
