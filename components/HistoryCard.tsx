import prisma from "@/lib/db";
import { Clock, CopyCheck, Edit, Edit2 } from "lucide-react";
import Link from "next/link";
import React from "react";

type Props = {
  limit: number;
  userId: string;
};

const HistoryCard = async ({ limit, userId }: Props) => {
  const games = await prisma.game.findMany({
    where: {
      userId,
    },
    take: limit,
    orderBy: {
      timeStarted: "desc",
    },
  });
  return (
    <div className=" space-y-8">
      {games.map((game, index) => (
        <div key={index} className="flex items-center justify-between">
          <div className="flex items-center">
            {game.gameType === "mcq" ? (
              <CopyCheck className="mr-3" />
            ) : (
              <Edit2 className=" mr-3" />
            )}

            <div className="ml-4 space-y-1">
              <Link
                href={`/summery/${game.id}`}
                className=" text-base font-medium underline leading-none"
              >
                {game.topic}
              </Link>
              <p className="flex items-center px-2 py-1 text-sm text-white rounded-lg w-fit bg-slate-800">
                <Clock className="w-4 h-4 mr-1" />
                {new Date(game.timeStarted).toLocaleDateString()}
              </p>
              <p className=" text-sm text-muted-foreground">
                {game.gameType === "mcq" ? "Multiple Choice" : "Open-Ended"}
              </p>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default HistoryCard;
