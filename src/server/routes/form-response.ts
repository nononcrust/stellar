import { FormAnswers } from "@/features/form/schema";
import { prisma } from "@/lib/prisma";
import { zValidator } from "@hono/zod-validator";
import { Hono } from "hono";
import z from "zod";
import { Limit, Page } from "../utils/pagination";

export type CreateFormResponseBody = z.infer<typeof CreateFormResponseBody>;
const CreateFormResponseBody = z.object({
  formId: z.string(),
  answers: FormAnswers,
});

export type GetFormResponseListQuery = z.infer<typeof GetFormResponseListQuery>;
const GetFormResponseListQuery = z.object({
  page: Page,
  limit: Limit,
});

export const formResponseRouter = new Hono()
  .post("/", zValidator("json", CreateFormResponseBody), async (c) => {
    const body = c.req.valid("json");

    const formResponse = await prisma.formResponse.create({
      data: {
        formId: body.formId,
        answers: body.answers,
      },
    });

    return c.json(formResponse, 201);
  })
  .get("/", zValidator("query", GetFormResponseListQuery), async (c) => {
    const { page, limit } = c.req.valid("query");

    const formResponses = await prisma.formResponse.findMany({
      skip: (page - 1) * limit,
      take: limit,
      orderBy: { createdAt: "desc" },
    });

    const total = await prisma.formResponse.count();

    return c.json({
      data: formResponses,
      total,
    });
  });
