import React from "react";
import { Card } from "../ui/card";
import { CheckCircle2, XCircle } from "lucide-react";
import { Separator } from "../ui/separator";

type Props = {
  correctAnswer: number;
  wrongAnswer: number;
};

const McqCounter = ({ correctAnswer, wrongAnswer }: Props) => {
  return (
    <Card className="flex items-center justify-center p-2">
      <CheckCircle2 color="green" className=" w-5 h-5 sm:w-7 sm:h-7" />
      <span className=" mx-2 text-xl sm:text-2xl text-[green]">
        {correctAnswer}
      </span>
      <Separator orientation="vertical" />
      <span className=" mx-3 text-xl sm:text-2xl text-[red]">
        {wrongAnswer}
      </span>
      <XCircle color="red" className=" w-5 h-5 sm:w-7 sm:h-7" />
    </Card>
  );
};

export default McqCounter;
