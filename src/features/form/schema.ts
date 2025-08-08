import z from "zod";

type StellarFormFieldBase = z.infer<typeof StellarFormFieldBase>;
const StellarFormFieldBase = z.object({
  id: z.string(),
  label: z.string(),
  required: z.boolean(),
});

export type ShortText = z.infer<typeof ShortText>;
export const ShortText = StellarFormFieldBase.extend({
  type: z.literal("SHORT_TEXT"),
});

export type LongText = z.infer<typeof LongText>;
export const LongText = StellarFormFieldBase.extend({
  type: z.literal("LONG_TEXT"),
});

export type StellarFormField = z.infer<typeof StellarFormField>;
export const StellarFormField = z.discriminatedUnion("type", [ShortText, LongText]);

export type StellarForm = z.infer<typeof StellarForm>;
export const StellarForm = z.object({
  id: z.string(),
  title: z.string(),
  fields: z.array(StellarFormField).nonempty(),
});
