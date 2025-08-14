import z from "zod";

export const Page = z.coerce.number().int().positive();
export const Limit = z.coerce.number().int().positive();
