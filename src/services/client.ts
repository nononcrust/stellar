import { App } from "@/server";
import { hc } from "hono/client";
import ky from "ky";

export const kyClient = ky.create({
  retry: 0,
});

export const { api } = hc<App>("/", {
  fetch: kyClient,
});
