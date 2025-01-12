import { cn } from "@/utils/cn";
import { motion } from "framer-motion";

interface LettersPullProps {
  className?: string;
  words: string;
  delay?: number;
}

export default function LettersPull({ className, words, delay }: LettersPullProps) {
  const letters = words.split("");

  const pullupVariant = {
    initial: { y: 100, opacity: 0 },
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    animate: (i: any) => ({
      y: 0,
      opacity: 1,
      transition: {
        delay: i * (delay ? delay : 0.05), // By default, delay each letter's animation by 0.05 seconds
      },
    }),
  };

  return (
    <div className="flex justify-center">
      {letters.map((letter, i) => (
        <motion.h1
          key={i}
          variants={pullupVariant}
          initial="initial"
          animate="animate"
          custom={i}
          className={cn(
            "text-center font-display text-6xl font-bold tracking-[-0.02em] drop-shadow-sm leading-[5rem]",
            className
          )}
        >
          {letter === " " ? <span>&nbsp;</span> : letter}
        </motion.h1>
      ))}
    </div>
  );
}
