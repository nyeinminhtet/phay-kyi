"use client";

import { Game, Question } from "@prisma/client";
import { BarChart, ChevronRight, Loader2, Timer } from "lucide-react";
import React, { useCallback, useEffect, useMemo, useState } from "react";
import { Card, CardDescription, CardHeader, CardTitle } from "../ui/card";
import { Button, buttonVariants } from "../ui/button";
import McqCounter from "./McqCounter";
import { useMutation } from "@tanstack/react-query";
import { AnswerChecker } from "@/validator/form/quiz";
import axios from "axios";
import { useToast } from "../ui/use-toast";
import Link from "next/link";
import { cn, formatTimeDate } from "@/lib/utils";

type Props = {
  game: Game & { questions: Pick<Question, "id" | "question" | "options">[] };
};

const McqUI = ({ game }: Props) => {
  const [questionIndex, setQuestionIndex] = useState(0);
  const [selected, setSelected] = useState<number | null>(null);
  const [correctAnswer, setCorrectAnswer] = useState(0);
  const [wrongAnswer, setWrongAnswer] = useState(0);
  const [hasEnded, setHasEnded] = useState(false);
  const { toast } = useToast();
  const [now, setNow] = useState(0);

  const currentQuestion = useMemo(() => {
    return game.questions[questionIndex];
  }, [questionIndex, game.questions]);

  const options = useMemo(() => {
    if (!currentQuestion) return [];
    if (!currentQuestion.options) return [];

    return JSON.parse(currentQuestion.options as string) as string[];
  }, [currentQuestion]);

  const { mutate: checkAnswer, isLoading: isChecking } = useMutation({
    mutationFn: async () => {
      const payload: AnswerChecker = {
        questionId: currentQuestion.id,
        userAnswer: options[selected!],
      };

      const response = await axios.post(`/api/checkAnswer`, payload);
      return response.data;
    },
  });

  const handleNext = useCallback(() => {
    if (selected === undefined) return;
    if (isChecking) return;

    checkAnswer(undefined, {
      onSuccess: ({ isCorrect }) => {
        if (isCorrect) {
          toast({
            title: "Correct!",
            description: "Correct Answer!",
            variant: "success",
          });
          setCorrectAnswer((pre) => pre + 1);
        } else {
          toast({
            title: "Wrong!",
            description: "Incorrect Answer!",
            variant: "destructive",
          });
          setWrongAnswer((pre) => pre + 1);
        }

        if (questionIndex === game.questions.length - 1) {
          setHasEnded(true);
          return;
        }

        setQuestionIndex((pre) => pre + 1);
        setSelected(null);
      },
    });
  }, [
    checkAnswer,
    toast,
    isChecking,
    questionIndex,
    game.questions.length,
    selected,
  ]);

  useEffect(() => {
    const handleKeydown = (event: KeyboardEvent) => {
      if (event.key === "1") {
        setSelected(0);
      } else if (event.key === "2") {
        setSelected(1);
      } else if (event.key === "3") {
        setSelected(2);
      } else if (event.key === "4") {
        setSelected(3);
      } else if (event.key === "Enter") {
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
          href={`/summery/${game.id}?now=${now}`}
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
            <span className=" px-2 py-1 text-xs sm:text-sm text-white rounded-lg bg-slate-800 ml-2">
              {game.topic}
            </span>
          </p>

          <div className="flex self-start mt-3 text-slate-400">
            <Timer className="mr-2" />
            <span>{formatTimeDate(now)}</span>
          </div>
        </div>
        <McqCounter correctAnswer={correctAnswer} wrongAnswer={wrongAnswer} />
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
        {options.map((option, i) => (
          <Button
            key={i}
            className="w-full justify-start py-8 mb-4"
            variant={selected === i ? "default" : "secondary"}
            onClick={() => setSelected(i)}
          >
            <div className="flex items-center justify-start">
              <div className=" p-2 px-3 mr-5 border rounded-md">{i + 1}</div>
              <div className=" text-start">{option}</div>
            </div>
          </Button>
        ))}

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

export default McqUI;
