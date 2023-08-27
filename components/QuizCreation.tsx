"use client";

import React, { useState } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "./ui/card";
import { useForm } from "react-hook-form";
import { InputValidator, QuizCreationValidator } from "@/validator/form/quiz";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "./ui/button";
import {
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormDescription,
  FormMessage,
  Form,
} from "./ui/form";
import { Input } from "@/components/ui/input";
import { BookOpen, CopyCheck } from "lucide-react";
import { Separator } from "./ui/separator";
import { useMutation } from "@tanstack/react-query";
import axios from "axios";
import { useRouter } from "next/navigation";
import LoadingQuestion from "./LoadingQuestion";
import { useToast } from "./ui/use-toast";

type Props = {
  topicParams?: string;
};

const QuizCreation = ({ topicParams }: Props) => {
  const router = useRouter();
  const [showLoading, setShowLoading] = useState(false);
  const [finished, setFinished] = useState(false);
  const { toast } = useToast();

  //create question
  const { mutate: getQuestions, isLoading } = useMutation({
    mutationFn: async ({ amount, topic, type }: InputValidator) => {
      const response = await axios.post(`/api/games`, {
        amount,
        topic,
        type,
      });
      return response.data;
    },
  });

  const form = useForm<InputValidator>({
    resolver: zodResolver(QuizCreationValidator),
    defaultValues: {
      amount: 3,
      topic: topicParams,
      type: "open_ended",
    },
  });

  function onSubmit(input: InputValidator) {
    setShowLoading(true);
    getQuestions(
      {
        amount: input.amount,
        topic: input.topic,
        type: input.type,
      },
      {
        onSuccess: ({ gameId }) => {
          setFinished(true);
          setTimeout(() => {
            if (form.getValues("type") === "mcq") {
              router.push(`/play/mcq/${gameId}`);
            } else {
              router.push(`/play/open-ended/${gameId}`);
            }
          }, 1000);
        },
        onError: () => {
          setShowLoading(false);
          return toast({
            title: "Something went wrong!",
            variant: "destructive",
          });
        },
      }
    );
  }

  form.watch();

  if (showLoading) {
    return <LoadingQuestion finished={finished} />;
  }

  return (
    <div className=" absolute -translate-x-1/2 -translate-y-1/2 left-1/2 top-[65%] sm:top-1/2">
      <Card>
        <CardHeader>
          <CardTitle className=" text-2x font-bold">Quiz Creation</CardTitle>
          <CardDescription>Choose a topic</CardDescription>
        </CardHeader>

        <CardContent>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-5">
              <FormField
                control={form.control}
                name="topic"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Topic</FormLabel>
                    <FormControl>
                      <Input placeholder="Enter a topic..." {...field} />
                    </FormControl>
                    <FormDescription>Please provide a topic</FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="amount"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Amount of Questions</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="Enter an amount"
                        {...field}
                        type="number"
                        min={1}
                        max={10}
                        onChange={(e) => {
                          form.setValue("amount", Number(e.target.value));
                        }}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <div className="flex justify-between">
                <Button
                  onClick={() => form.setValue("type", "mcq")}
                  className="rounded-none rounded-l-lg text-xs sm:text-sm"
                  variant={
                    form.getValues("type") === "mcq" ? "default" : "secondary"
                  }
                  type="button"
                >
                  <CopyCheck className="h-5 w-5 sm:w-4 sm:h-4  mr-2" /> Multiple
                  Choice
                </Button>
                <Separator orientation="vertical" />
                <Button
                  onClick={() => form.setValue("type", "open_ended")}
                  className=" rounded-none rounded-r-lg text-xs sm:text-sm"
                  variant={
                    form.getValues("type") === "open_ended"
                      ? "default"
                      : "secondary"
                  }
                  type="button"
                >
                  <BookOpen className="h-5 w-5 sm:w-4 sm:h-4  mr-2" /> Open
                  Ended
                </Button>
              </div>
              <Button type="submit" disabled={isLoading}>
                Submit
              </Button>
            </form>
          </Form>
        </CardContent>
      </Card>
    </div>
  );
};

export default QuizCreation;
