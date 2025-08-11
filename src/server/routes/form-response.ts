import { FormAnswers } from "@/features/form/schema";
import { prisma } from "@/lib/prisma";
import { zValidator } from "@hono/zod-validator";
import { Hono } from "hono";
import z from "zod";

export type CreateFormResponseBody = z.infer<typeof CreateFormResponseBody>;
const CreateFormResponseBody = z.object({
  formId: z.string(),
  answers: FormAnswers,
});

export const formResponseRouter = new Hono().post(
  "/",
  zValidator("json", CreateFormResponseBody),
  async (c) => {
    const body = c.req.valid("json");

    const formResponse = await prisma.formResponse.create({
      data: {
        formId: body.formId,
        answers: body.answers,
      },
    });

    return c.json(formResponse, 201);
  },
);
