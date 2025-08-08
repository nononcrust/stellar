import { StellarFormField } from "@/features/form/schema";
import { zValidator } from "@hono/zod-validator";
import { Hono } from "hono";
import z from "zod";
import { prisma } from "../../../lib/prisma";
import { authMiddleware } from "../../middleware";

const UpdateFormBody = z.object({
  title: z.string(),
  fields: StellarFormField.array(),
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
  .post("/", authMiddleware, async (c) => {
    const session = c.get("session");

    const createdForm = await prisma.form.create({
      data: {
        title: "",
        fields: [],
        userId: session.user.id,
      },
    });

    return c.json(createdForm, 201);
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

    return c.json(updatedForm, 200);
  });
