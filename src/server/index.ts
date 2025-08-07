import { Hono } from "hono";
import { logger } from "hono/logger";
import { authRouter } from "./routes/auth";

export const app = new Hono().basePath("/api").use(logger()).route("/auth", authRouter);

export type App = typeof app;
