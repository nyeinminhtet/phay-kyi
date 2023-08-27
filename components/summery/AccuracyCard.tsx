import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import { Target } from "lucide-react";

type Props = {
  accuracy: number;
};

const AccuracyCard = ({ accuracy }: Props) => {
  accuracy = Math.round(accuracy * 100) / 100;
  return (
    <Card className=" md:col-span-3">
      <CardHeader className="flex items-center flex-row justify-between space-y-0 pb-2">
        <CardTitle className=" text-2xl font-bold">Avarage Score</CardTitle>
        <Target />
      </CardHeader>

      <CardContent>
        <div className="text-sm font-medium">{accuracy.toString()}%</div>
      </CardContent>
    </Card>
  );
};

export default AccuracyCard;
