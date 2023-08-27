import HistoryCard from "@/components/HistoryCard";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import prisma from "@/lib/db";
import { getAuthSession } from "@/lib/nextauth";
import { redirect } from "next/navigation";
import React from "react";

const RecentActivities = async () => {
  const session = await getAuthSession();

  if (!session?.user) {
    return redirect("/");
  }

  const gameCount = await prisma.game.count({
    where: {
      userId: session.user.id,
    },
  });

  return (
    <Card className=" col-span-4 lg:col-span-3">
      <CardHeader>
        <CardTitle className=" text-2xl font-bold">Recent Activity</CardTitle>
        <CardDescription>
          You have played a total of {gameCount} quizs.
        </CardDescription>
      </CardHeader>

      <CardContent className=" max-h-[500px]">
        <HistoryCard limit={5} userId={session.user.id} />
      </CardContent>
    </Card>
  );
};

export default RecentActivities;
