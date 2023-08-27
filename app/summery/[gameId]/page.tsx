import AccuracyCard from "@/components/summery/AccuracyCard";
import QuestionsList from "@/components/summery/QuestionsList";
import ResultCard from "@/components/summery/ResultCard";
import TimeTakenCard from "@/components/summery/TimeTakenCard";
import { buttonVariants } from "@/components/ui/button";
import prisma from "@/lib/db";
import { getAuthSession } from "@/lib/nextauth";
import { LucideLayoutDashboard } from "lucide-react";
import Link from "next/link";
import { redirect, useRouter } from "next/navigation";
import React, { useEffect } from "react";

type Props = {
  params: {
    gameId: string;
  };
  searchParams: {
    now: number;
  };
};

export const metadata = {
  title: "Phay Kyi | Summery",
};

const SummeryPage = async ({
  params: { gameId },
  searchParams: { now },
}: Props) => {
  const session = await getAuthSession();

  if (!session?.user) {
    return redirect("/");
  }

  const game = await prisma.game.findUnique({
    where: {
      id: gameId,
    },
    include: { questions: true },
  });

  if (!game) {
    return redirect("/quiz");
  }

  let accuracy: number = 0;
  if (game.gameType === "mcq") {
    let totalCorrect = game.questions.reduce((acc, question) => {
      if (question.isCorrect) {
        return acc + 1;
      }
      return acc;
    }, 0);
    accuracy = (totalCorrect / game.questions.length) * 100;
  } else if (game.gameType === "open_ended") {
    let totalPercentage = game.questions.reduce((acc, question) => {
      return acc + (question.percentageCorrect || 0);
    }, 0);

    accuracy = totalPercentage / game.questions.length;
  }

  accuracy = Math.round(accuracy * 100) / 100;

  return (
    <>
      <div className=" p-8 mx-auto max-w-7xl">
        <div className="flex items-center justify-between space-y-2">
          <h2 className="text-xl sm:text-3xl font-bold tracking-tight">
            Summery
          </h2>
          <div className="flex items-center space-x-2">
            <Link href="/dashboard" className={buttonVariants()}>
              <LucideLayoutDashboard className="mr-2" />
              <span className="hidden sm:inline-block">Back to Dashboard</span>
            </Link>
          </div>
        </div>

        <div className=" grid gap-4 mt-4 md:grid-cols-7">
          <ResultCard accuracy={accuracy} />
          <AccuracyCard accuracy={accuracy} />
          <TimeTakenCard time={now} />
        </div>

        <QuestionsList questions={game.questions} />
      </div>
    </>
  );
};

export default SummeryPage;
