import { Form } from "@prisma/client";
import z from "zod";

type StellarFormFieldBase = z.infer<typeof StellarFormFieldBase>;
const StellarFormFieldBase = z.object({
  id: z.string(),
  label: z.string(),
  description: z.string(),
  required: z.boolean(),
});

export type ShortText = z.infer<typeof ShortText>;
export const ShortText = StellarFormFieldBase.extend({
  type: z.literal("SHORT_TEXT"),
  defaultValue: z.string(),
});

export type LongText = z.infer<typeof LongText>;
export const LongText = StellarFormFieldBase.extend({
  type: z.literal("LONG_TEXT"),
  defaultValue: z.string(),
});

export type Email = z.infer<typeof Email>;
export const Email = StellarFormFieldBase.extend({
  type: z.literal("EMAIL"),
  defaultValue: z.string(),
});

export type PhoneNumber = z.infer<typeof PhoneNumber>;
export const PhoneNumber = StellarFormFieldBase.extend({
  type: z.literal("PHONE_NUMBER"),
  defaultValue: z.string(),
});

export type Number = z.infer<typeof Number>;
export const Number = StellarFormFieldBase.extend({
  type: z.literal("NUMBER"),
  defaultValue: z.string(),
});

export type Option = z.infer<typeof Option>;
export const Option = z.object({
  label: z.string(),
  value: z.string(),
});

export type Dropdown = z.infer<typeof Dropdown>;
export const Dropdown = StellarFormFieldBase.extend({
  type: z.literal("DROPDOWN"),
  defaultValue: z.string(),
  options: z.array(Option),
});

export type SingleChoice = z.infer<typeof SingleChoice>;
export const SingleChoice = StellarFormFieldBase.extend({
  type: z.literal("SINGLE_CHOICE"),
  defaultValue: z.string(),
  options: z.array(Option),
});

export type MultipleChoice = z.infer<typeof MultipleChoice>;
export const MultipleChoice = StellarFormFieldBase.extend({
  type: z.literal("MULTIPLE_CHOICE"),
  defaultValue: z.array(z.string()),
  options: z.array(Option),
  min: z.number().optional(),
  max: z.number().optional(),
});

export type StellarFormField = z.infer<typeof StellarFormField>;
export const StellarFormField = z.discriminatedUnion("type", [
  ShortText,
  LongText,
  Email,
  PhoneNumber,
  Number,
  Dropdown,
  SingleChoice,
  MultipleChoice,
]);

export type StellarForm = {
  id: Form["id"];
  title: Form["title"];
  fields: StellarFormField[];
};

export type FormAnswers = z.infer<typeof FormAnswers>;
export const FormAnswers = z.record(z.string(), z.unknown());
