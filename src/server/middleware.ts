import { auth } from "@/lib/auth";
import { createMiddleware } from "hono/factory";

export const authMiddleware = createMiddleware<{
  Variables: {
    session: NonNullable<Awaited<ReturnType<typeof auth.api.getSession>>>;
  };
}>(async (c, next) => {
  const session = await auth.api.getSession({
    headers: c.req.raw.headers,
  });

  if (!session) {
    return c.json({ error: "로그인이 필요합니다." }, 401);
  }

  c.set("session", session);

  return next();
});
