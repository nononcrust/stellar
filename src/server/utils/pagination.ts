import z from "zod";

export const Page = z.coerce.number().int().positive().catch(1);
export const Limit = z.coerce.number().int().positive().catch(10);
