"use client";

import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import { History } from "lucide-react";
import { useRouter } from "next/navigation";

const HistoryCard = () => {
  const router = useRouter();
  return (
    <Card
      className=" hover:cursor-pointer hover:opacity-75"
      onClick={() => router.push("/history")}
    >
      <CardHeader className=" flex flex-row justify-between pb-2 items-center space-y-0">
        <CardTitle className=" text-2xl font-bold">History</CardTitle>
        <History size={28} strokeWidth={2.5} />
      </CardHeader>

      <CardContent>
        <p className=" text-sm text-muted-foreground">
          View your quiz history here!
        </p>
      </CardContent>
    </Card>
  );
};

export default HistoryCard;
