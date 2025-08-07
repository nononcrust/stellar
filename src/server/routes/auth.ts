import { auth } from "@/lib/auth";
import { Hono } from "hono";

export const authRouter = new Hono({ strict: false }).on(["GET", "POST"], "/*", (c) => {
  return auth.handler(c.req.raw);
});
