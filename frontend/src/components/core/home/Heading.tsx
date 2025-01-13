import { useState } from "react";

const heading = ["A", "I", "empty", "I", "n", "t", "e", "r", "v", "i", "e", "w"];

export const Heading = () => {
  const [hoveredIndex, setHoveredIndex] = useState<null | number>(null);

  return (
    <div className="flex relative" onMouseLeave={() => setHoveredIndex(null)}>
      <img
        alt="Loading..."
        src="images/logo.jpg"
        className={`absolute -top-40 z-10 rounded-lg left-[26%] ${hoveredIndex !== null ? "opacity-100" : "opacity-[0.16] hover:opacity-100"}  transition-all delay-200 ease-in-out duration-1000 w-[22rem]`}
      />
      {heading.map((letter, index) => {
        // Calculate the range of indices to apply the white text effect
        const isWithinRange = hoveredIndex !== null ? hoveredIndex - index : 100;

        return (
          <ul
            key={index}
            className={`hover:text-white transition-all ease-linear py-16 text-8xl lm:text-9xl font-bold relative z-20 bg-clip-text text-transparent bg-gradient-to-b from-neutral-200 to-neutral-500 ${
              isWithinRange === 100 || isWithinRange < -2 || isWithinRange > 2
                ? ""
                : isWithinRange === -1 || 1
                  ? "text-snow-500"
                  : " text-snow-900"
            }`}
            onMouseEnter={() => setHoveredIndex(index)}
          >
            {letter === "empty" ? <>&nbsp;</> : letter}
          </ul>
        );
      })}
    </div>
  );
};
