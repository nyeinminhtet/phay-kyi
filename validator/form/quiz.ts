import { z } from "zod";

export const QuizCreationValidator = z.object({
  topic: z
    .string()
    .min(4, { message: "Topic must be at least 4 characters long!" })
    .max(50),
  type: z.enum(["mcq", "open_ended"]),
  amount: z.number().min(1).max(10),
});

export const AnswerValidator = z.object({
  questionId: z.string(),
  userAnswer: z.string(),
});

export type InputValidator = z.infer<typeof QuizCreationValidator>;

export type AnswerChecker = z.infer<typeof AnswerValidator>;
