import { TextGenerateEffect } from "@/components/cards/LettersGenerate";
import LettersPull from "@/components/cards/LettersPull";
import MainFooter from "@/components/common/MainFooter";
import { Heading } from "@/components/core/home/Heading";
import { TextRevealCard, TextRevealCardDescription, TextRevealCardTitle } from "@/components/core/home/TextRevealCard";
import { useNavigate } from "react-router-dom";

const Home = () => {
  const navigate = useNavigate();

  return (
    <div className="w-full min-h-[calc(100%-3.8rem)] flex flex-col justify-between">
      {/* Hero section */}
      <section className="flex flex-col items-center mx-auto pt-48 pb-40 cursor-default">
        <Heading />

        <LettersPull className="text-white text-5xl " words={"The future is now!"} delay={0.1} />

        <p className=" max-w-[80%] w-full text-[1rem] text-center text-wrap text-snow-500 ">
          Get ready to shine like never before - step into any interview fully prepared and unstoppable!
        </p>
      </section>
      {/* Tag line */}
      <section className="w-full mx-auto flex flex-col gap-y-32 xl:flex-row justify-evenly items-center my-16">
        <TextRevealCard
          className=" relative w-[35rem] md:w-[36rem] "
          text="You know the business"
          revealText="I know the chemistry "
        >
          <div className="absolute right-2 bottom-2 z-50">
            <button type="button" onClick={() => navigate("/auth/signup")} className="ct-signInButton">
              Jump In
            </button>
          </div>
          <TextRevealCardTitle className=" text-center">
            Master every interview with smart preparation powered by AI.
          </TextRevealCardTitle>
          <TextRevealCardDescription className=" text-center">
            AI Interview leverages advanced technology to generate customized interview questions and MCQ tests,
            tailored to your career goals. Prepare smarter by simulating real-world interview scenarios and boost your
            confidence. With AI-driven insights and personalized feedback, your preparation becomes more efficient and
            effective. Get ready to ace your next interview with ease!
          </TextRevealCardDescription>
        </TextRevealCard>
        <div className="w-[37rem] md:w-[40rem]">
          <TextGenerateEffect
            className="text-center"
            words={
              "Growth: With AI Interview, you'll enhance your skills and confidence, and then this real world will see the REAL you!"
            }
          />
        </div>
      </section>
      <MainFooter />
    </div>
  );
};

export default Home;
