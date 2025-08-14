import { StellarFormField } from "@/features/form/schema";
import { Limit, Page } from "@/server/utils/pagination";
import { zValidator } from "@hono/zod-validator";
import { Hono } from "hono";
import z from "zod";
import { prisma } from "../../../lib/prisma";
import { authMiddleware } from "../../middleware";

const FormTitle = z.string().min(1);

export type UpdateFormBody = z.infer<typeof UpdateFormBody>;
const UpdateFormBody = z.object({
  title: FormTitle,
  fields: StellarFormField.array(),
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

    const form = await prisma.form.findUniqueOrThrow({
      where: { id: c.req.param("id"), userId: session.user.id },
    });

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
      return c.json({ message: "자신이 작성한 폼만 수정할 수 있습니다." }, 403);
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
  .delete("/:id", authMiddleware, async (c) => {
    const id = c.req.param("id");
    const session = c.get("session");

    const form = await prisma.form.findUniqueOrThrow({
      where: { id },
    });

    if (form.userId !== session.user.id) {
      return c.json({ message: "자신이 작성한 폼만 삭제할 수 있습니다." }, 403);
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

    const total = await prisma.formResponse.count();

    return c.json({
      data: formResponses,
      total,
    });
  });
