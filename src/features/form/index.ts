import { flow } from "es-toolkit";
import z from "zod";

type FormFieldBase = z.infer<typeof FormFieldBase>;
const FormFieldBase = z.object({
  id: z.string(),
  label: z.string(),
  required: z.boolean(),
});

export type ShortText = z.infer<typeof ShortText>;
export const ShortText = FormFieldBase.extend({
  type: z.literal("SHORT_TEXT"),
  minLength: z.number().optional(),
  maxLength: z.number().optional(),
});

export type LongText = z.infer<typeof LongText>;
export const LongText = FormFieldBase.extend({
  type: z.literal("LONG_TEXT"),
  minLength: z.number().optional(),
  maxLength: z.number().optional(),
});

export type FormField = z.infer<typeof FormField>;
export const FormField = z.discriminatedUnion("type", [ShortText, LongText]);

export type Form = z.infer<typeof Form>;
export const Form = z.object({
  id: z.string(),
  title: z.string(),
  fields: z.array(FormField).nonempty(),
});

const applyMinLengthConstraint = (zodSchema: z.ZodString, minLength?: number) => {
  return minLength ? zodSchema.min(minLength, `최소 ${minLength}자 이상 입력해주세요.`) : zodSchema;
};

const applyMaxLengthConstraint = (zodSchema: z.ZodString, maxLength?: number) => {
  return maxLength
    ? zodSchema.max(maxLength, `최대 ${maxLength}자 이하로 입력해주세요.`)
    : zodSchema;
};

const applyOptionalConstraint = (zodSchema: z.ZodString, isRequired: boolean) => {
  return isRequired ? zodSchema : zodSchema.optional();
};

const createFormFieldSchema = (field: FormField) => {
  switch (field.type) {
    case "SHORT_TEXT":
    case "LONG_TEXT":
      return flow(
        (schema) => applyMinLengthConstraint(schema, field.minLength),
        (schema) => applyMaxLengthConstraint(schema, field.maxLength),
        (schema) => applyOptionalConstraint(schema, field.required),
      )(z.string());
    default:
      return field satisfies never;
  }
};

export const createFormSchema = (form: Form) => {
  return z.object(
    Object.fromEntries(form.fields.map((field) => [field.id, createFormFieldSchema(field)])),
  );
};

export const createFormDefaultValues = (fields: Form["fields"]) => {
  return Object.fromEntries(
    fields.map((field) => {
      switch (field.type) {
        case "SHORT_TEXT":
          return [field.id, ""];
        case "LONG_TEXT":
          return [field.id, ""];
        default:
          return field satisfies never;
      }
    }),
  );
};
