import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import { Hourglass } from "lucide-react";
import { formatTimeDate } from "@/lib/utils";
import { differenceInSeconds } from "date-fns";

type Props = {
  time: number;
};

const TimeTakenCard = ({ time }: Props) => {
  return (
    <Card className=" md:col-span-4">
      <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
        <CardTitle className=" text-2xl font-bold">Time Taken</CardTitle>
        <Hourglass />
      </CardHeader>
      <CardContent>
        <div className=" text-sm font-medium">{formatTimeDate(time)}</div>
      </CardContent>
    </Card>
  );
};

export default TimeTakenCard;
