"use client";

import { cn, formatTimeDate } from "@/lib/utils";
import { Game, Question } from "@prisma/client";
import { BarChart, ChevronRight, Loader2, Timer } from "lucide-react";
import { useState, useMemo, useCallback, useEffect } from "react";
import { Card, CardDescription, CardHeader, CardTitle } from "../ui/card";
import { Button, buttonVariants } from "../ui/button";
import { useToast } from "../ui/use-toast";
import { AnswerChecker } from "@/validator/form/quiz";
import { useMutation } from "@tanstack/react-query";
import axios from "axios";
import BlankAnswer from "./BlankAnswer";
import Link from "next/link";
import { redirect } from "next/navigation";

type Props = {
  game: Game & { questions: Pick<Question, "id" | "question" | "answer">[] };
};

const OpenEndedUI = ({ game }: Props) => {
  const [questionIndex, setQuestionIndex] = useState(0);
  const [hasEnded, setHasEnded] = useState(false);
  const [blankAnswer, setBlankAnswer] = useState("");
  const { toast } = useToast();
  const [now, setNow] = useState(0);

  const currentQuestion = useMemo(() => {
    return game.questions[questionIndex];
  }, [questionIndex, game.questions]);

  const { mutate: checkAnswer, isLoading: isChecking } = useMutation({
    mutationFn: async () => {
      let filledAnswer = blankAnswer;
      document.querySelectorAll("#user-blank-input").forEach((input) => {
        //@ts-ignore
        if (!input.value) return null;
        //@ts-ignore
        filledAnswer = filledAnswer.replace("_____", input.value);
        //@ts-ignore
        input.value = "";
      });

      if (filledAnswer.includes("_")) {
        toast({
          title: "Please filled your answer!",
          variant: "destructive",
        });
        redirect("/");
      }
      const payload: AnswerChecker = {
        questionId: currentQuestion.id,
        userAnswer: filledAnswer,
      };

      const response = await axios.post(`/api/checkAnswer`, payload);
      return response.data;
    },
  });

  const handleNext = useCallback(() => {
    if (isChecking) return;
    checkAnswer(undefined, {
      onSuccess: ({ percentageSimilar }) => {
        toast({
          title: `Your answer is ${percentageSimilar}% similar to correct answer.`,
          description: "answers are matched based on similarity comparisons.",
          variant: "success",
        });

        if (questionIndex === game.questions.length - 1) {
          setHasEnded(true);
          return;
        }

        setQuestionIndex((pre) => pre + 1);
      },
    });
  }, [checkAnswer, toast, isChecking, questionIndex, game.questions.length]);

  useEffect(() => {
    const handleKeydown = (event: KeyboardEvent) => {
      if (event.key === "Enter") {
        handleNext();
      }
    };
    document.addEventListener("keydown", handleKeydown);

    return () => {
      document.removeEventListener("keydown", handleKeydown);
    };
  }, [handleNext]);

  useEffect(() => {
    const interval = setInterval(() => {
      if (!hasEnded) {
        setNow((pre) => pre + 1);
      }
    }, 1000);

    return () => {
      clearInterval(interval);
    };
  }, [hasEnded]);

  if (hasEnded) {
    return (
      <div className=" absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 flex flex-col justify-center">
        <div className=" px-4 mt-2 font-semibold text-white bg-green-500 rounded-md whitespace-nowrap">
          You completed in {formatTimeDate(now)}
        </div>
        <Link
          href={`/summery/${game.id}`}
          className={cn(buttonVariants(), "mt-2")}
        >
          View Summery
          <BarChart className=" w-4 h-4 ml-2" />
        </Link>
      </div>
    );
  }

  return (
    <div
      className=" absolute left-1/2 top-3/4 md:top-[60%] -translate-x-1/2
       -translate-y-1/2 md:w-[80vw] max-w-4xl w-[90vw]"
    >
      <div className="flex flex-row justify-between">
        <div className="flex flex-col">
          {/* topic */}
          <p>
            <span className=" text-slate-400">Topic</span>
            <span className=" px-2 py-1 text-white rounded-lg bg-slate-800 ml-2">
              {game.topic}
            </span>
          </p>

          <div className="flex self-start mt-3 text-slate-400">
            <Timer className="mr-2" />
            <span>{formatTimeDate(now)}</span>
          </div>
        </div>
        {/* <McqCounter correctAnswer={correctAnswer} wrongAnswer={wrongAnswer} /> */}
      </div>

      <Card className="w-full mt-4">
        <CardHeader className="flex flex-row items-center">
          <CardTitle className="mr-5 text-center divide-y divide-zinc-600/50">
            <div>{questionIndex + 1}</div>
            <div className=" text-base text-slate-400">
              {game.questions.length}
            </div>
          </CardTitle>
          <CardDescription className=" flex-grow text-lg">
            {currentQuestion.question}
          </CardDescription>
        </CardHeader>
      </Card>

      <div className="flex flex-col items-end justify-center w-full mt-4">
        <BlankAnswer
          answer={currentQuestion.answer}
          setBlankAnswer={setBlankAnswer}
        />
        <Button
          className=" mt-2"
          disabled={isChecking}
          onClick={() => handleNext()}
        >
          {isChecking && <Loader2 className=" w-4 h-4 mr-2 animate-spin" />}
          Next <ChevronRight className="w-4 h-4 ml-2" />
        </Button>
      </div>
    </div>
  );
};

export default OpenEndedUI;
