import Image from "next/image";
import React, { useEffect, useState } from "react";
import { Progress } from "./ui/progress";

type Props = {
  finished: boolean;
};

const loadingTexts = [
  "Generating questions...",
  "Unleashing the power of curiosity...",
  "Diving deep into the ocean of questions...",
  "Igniting the flame of wonder and exploration...",
];
const LoadingQuestion = ({ finished }: Props) => {
  const [progress, setProgress] = useState(0);
  const [loadingText, setLoadingText] = useState(loadingTexts[0]);

  useEffect(() => {
    const interval = setInterval(() => {
      const randomText = Math.floor(Math.random() * loadingTexts.length);
      setLoadingText(loadingTexts[randomText]);
    }, 2000);

    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      setProgress((prev) => {
        if (finished) return 100;
        if (prev === 100) {
          return 0;
        }
        if (Math.random() < 0.1) {
          return prev + 0.4;
        }
        return prev + 0.5;
      });
    }, 100);
    return () => clearInterval(interval);
  }, [finished]);

  return (
    <div className=" absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[70vw] md:w-[60vw] flex flex-col items-center">
      <Image src="/Search engines.gif" alt="loading" width={400} height={400} />
      <Progress value={progress} className="w-full mt-4" color="green" />
      <h1 className="text-sm md:text-xl mt-2">{loadingText}</h1>
    </div>
  );
};

export default LoadingQuestion;
