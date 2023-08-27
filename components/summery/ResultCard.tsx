import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import { Award, Trophy } from "lucide-react";

type Props = {
  accuracy: number;
};

const ResultCard = ({ accuracy }: Props) => {
  return (
    <Card className=" md:col-span-7">
      <CardHeader className="flex justify-between flex-row items-center space-y-0 pb-7">
        <CardTitle className=" text-2xl font-bold">Results</CardTitle>
        <Award />
      </CardHeader>
      <CardContent className="flex flex-col items-center justify-center h-3/4">
        {accuracy > 75 ? (
          <>
            <Trophy size={50} color="gold" className=" mr-4" />
            <div className="flex flex-col text-2xl font-semibold text-yellow-400">
              <span>Impressive!</span>
              <span className=" text-sm text-center text-black dark:text-white opacity-50">
                {"> 75% accuracy"}
              </span>
            </div>
          </>
        ) : accuracy > 50 ? (
          <>
            <Trophy size={50} color="silver" className=" mr-4" />
            <div className="flex flex-col text-2xl font-semibold text-yellow-400">
              <span>Good Job!</span>
              <span className=" text-sm text-center text-black dark:text-white opacity-50">
                {"> 50% accuracy"}
              </span>
            </div>
          </>
        ) : (
          <>
            <Trophy size={50} color="silver" className=" mr-4" />
            <div className="flex flex-col text-2xl font-semibold text-yellow-400">
              <span> Nice Try!</span>
              <span className=" text-sm text-center text-black dark:text-white opacity-50">
                {"> 50% accuracy"}
              </span>
            </div>
          </>
        )}
      </CardContent>
    </Card>
  );
};

export default ResultCard;
