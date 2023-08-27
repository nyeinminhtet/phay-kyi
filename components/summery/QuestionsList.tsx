import { Question } from "@prisma/client";
import React from "react";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../ui/table";
import { cn } from "@/lib/utils";

type Props = {
  questions: Question[];
};

const QuestionsList = ({ questions }: Props) => {
  let gametype = questions[0].questionType;
  return (
    <Table className=" mt-4">
      <TableCaption>End of list</TableCaption>
      <TableHeader>
        <TableRow>
          <TableHead className=" w-[10px]">No.</TableHead>
          <TableHead>Questions & Correct Answer</TableHead>
          <TableHead>Your Answer</TableHead>

          {gametype === "open_ended" && (
            <TableHead className=" w-[10px] text-right">Scores</TableHead>
          )}
        </TableRow>
      </TableHeader>
      <TableBody>
        <>
          {questions.map((question, index) => (
            <TableRow key={index}>
              <TableCell className=" font-medium">{index + 1}</TableCell>
              <TableCell>
                {question.question}
                <br />
                <br />
                <span className=" font-semibold">{question.answer}</span>
              </TableCell>

              {/* user's answer */}
              {gametype === "mcq" && (
                <TableCell
                  className={cn({
                    "text-green-600": question.isCorrect,
                    "text-red-600": !question.isCorrect,
                  })}
                >
                  {question.userAnswer}
                </TableCell>
              )}

              {gametype === "open_ended" && (
                <TableCell>{question.userAnswer}</TableCell>
              )}

              {gametype === "open_ended" && (
                <TableCell className=" text-right">
                  {question.percentageCorrect}%
                </TableCell>
              )}
            </TableRow>
          ))}
        </>
      </TableBody>
    </Table>
  );
};

export default QuestionsList;
