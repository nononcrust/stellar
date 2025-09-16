import { StellarFormField } from "@/features/form/schema";
import { allowedFormStatusTransitions } from "@/features/form/utils";
import { Limit, Page } from "@/server/utils/pagination";
import { zValidator } from "@hono/zod-validator";
import { FormStatus } from "@prisma/client";
import { Hono } from "hono";
import { HTTPException } from "hono/http-exception";
import z from "zod";
import { prisma } from "../../../lib/prisma";
import { authMiddleware } from "../../middleware";

const FormTitle = z.string().min(1);

export type UpdateFormBody = z.infer<typeof UpdateFormBody>;
const UpdateFormBody = z.object({
  title: FormTitle,
  fields: StellarFormField.array(),
});

export type UpdateFormStatusBody = z.infer<typeof UpdateFormStatusBody>;
const UpdateFormStatusBody = z.object({
  status: z.enum(FormStatus),
});

export type CreateFormBody = z.infer<typeof CreateFormBody>;
const CreateFormBody = z.object({
  title: FormTitle,
  fields: StellarFormField.array(),
});

export type GetFormResponseListQuery = z.infer<typeof GetFormResponseListQuery>;
const GetFormResponseListQuery = z.object({
  page: Page,
  limit: Limit,
});

export const dashboardFormRouter = new Hono()
  .get("/", authMiddleware, async (c) => {
    const session = c.get("session");

    const forms = await prisma.form.findMany({
      where: { userId: session.user.id },
      orderBy: { createdAt: "desc" },
    });

    return c.json(forms, 200);
  })
  .get("/:id", authMiddleware, async (c) => {
    const session = c.get("session");

    const form = await prisma.form.findUnique({
      where: { id: c.req.param("id"), userId: session.user.id },
    });

    if (form === null) {
      throw new HTTPException(404);
    }

    return c.json(form, 200);
  })
  .post("/", authMiddleware, zValidator("json", CreateFormBody), async (c) => {
    const session = c.get("session");
    const body = c.req.valid("json");

    const createdForm = await prisma.form.create({
      data: {
        title: body.title,
        fields: body.fields,
        userId: session.user.id,
      },
    });

    return c.json({ form: createdForm }, 201);
  })
  .patch("/:id", authMiddleware, zValidator("json", UpdateFormBody), async (c) => {
    const session = c.get("session");

    const form = await prisma.form.findUniqueOrThrow({
      where: { id: c.req.param("id") },
    });

    if (form.userId !== session.user.id) {
      return c.json({ message: "자신이 작성한 양식만 수정할 수 있습니다." }, 403);
    }

    const body = c.req.valid("json");

    const updatedForm = await prisma.form.update({
      where: { id: form.id },
      data: {
        title: body.title,
        fields: body.fields,
      },
    });

    return c.json({ form: updatedForm }, 200);
  })
  .put("/:id/status", authMiddleware, zValidator("json", UpdateFormStatusBody), async (c) => {
    const session = c.get("session");

    const form = await prisma.form.findUniqueOrThrow({
      where: { id: c.req.param("id") },
    });

    if (form.userId !== session.user.id) {
      return c.json({ message: "자신이 작성한 양식만 수정할 수 있습니다." }, 403);
    }

    if (allowedFormStatusTransitions[form.status].includes(c.req.valid("json").status) === false) {
      return c.json({ message: "유효하지 않은 상태 변경입니다." }, 400);
    }

    const body = c.req.valid("json");
    const updatedForm = await prisma.form.update({
      where: { id: form.id },
      data: {
        status: body.status,
      },
    });

    return c.json({ form: updatedForm }, 200);
  })
  .delete("/:id", authMiddleware, async (c) => {
    const id = c.req.param("id");
    const session = c.get("session");

    const form = await prisma.form.findUniqueOrThrow({
      where: { id },
    });

    if (form.userId !== session.user.id) {
      return c.json({ message: "자신이 작성한 양식만 삭제할 수 있습니다." }, 403);
    }

    const deletedForm = await prisma.form.delete({ where: { id: form.id } });

    return c.json({ form: deletedForm }, 200);
  })
  .get("/:id/responses", zValidator("query", GetFormResponseListQuery), async (c) => {
    const id = c.req.param("id");

    const { page, limit } = c.req.valid("query");

    const formResponses = await prisma.formResponse.findMany({
      skip: (page - 1) * limit,
      take: limit,
      orderBy: { createdAt: "desc" },
      where: { formId: id },
    });

    const total = await prisma.formResponse.count({
      where: { formId: id },
    });

    return c.json({
      data: formResponses,
      total,
    });
  });
