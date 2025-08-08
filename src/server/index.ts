import { Hono } from "hono";
import { logger } from "hono/logger";
import { authRouter } from "./routes/auth";
import { dashboardFormRouter } from "./routes/dashboard/form";
import { formResponseRouter } from "./routes/form-response";

export const app = new Hono()
  .basePath("/api")
  .use(logger())
  .route("/auth", authRouter)
  .route("/dashboard/forms", dashboardFormRouter)
  .route("/form-responses", formResponseRouter);

export type App = typeof app;
