import { FormAnswers } from "@/features/form/schema";
import { prisma } from "@/lib/prisma";
import { zValidator } from "@hono/zod-validator";
import { FormStatus } from "@prisma/client";
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

    const form = await prisma.form.findUnique({
      where: { id: body.formId },
    });

    if (form === null) {
      return c.json({ message: "존재하지 않는 설문입니다." }, 404);
    }

    if (form.status !== FormStatus.ACTIVE) {
      return c.json({ message: "진행 중인 설문에만 응답할 수 있습니다." }, 403);
    }

    const formResponse = await prisma.formResponse.create({
      data: {
        formId: body.formId,
        answers: body.answers,
      },
    });

    return c.json(formResponse, 201);
  },
);
