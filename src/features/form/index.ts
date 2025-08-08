import { nanoid } from "nanoid";
import z from "zod";

export const FORM_TYPES = ["SHORT_TEXT", "LONG_TEXT"] as const;

type StellarFormFieldBase = z.infer<typeof StellarFormFieldBase>;
const StellarFormFieldBase = z.object({
  type: z.enum(FORM_TYPES),
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

const applyOptionalConstraint = (zodSchema: z.ZodString, isRequired: boolean) => {
  return isRequired ? zodSchema.min(1, "필수 항목입니다.") : zodSchema.optional();
};

const createFormFieldSchema = (field: StellarFormField) => {
  switch (field.type) {
    case "SHORT_TEXT":
    case "LONG_TEXT":
      return applyOptionalConstraint(z.string(), field.required);
    default:
      return field satisfies never;
  }
};

export const createFormSchema = (form: StellarForm) => {
  return z.object(
    Object.fromEntries(form.fields.map((field) => [field.id, createFormFieldSchema(field)])),
  );
};

export const createFormDefaultValues = (fields: StellarForm["fields"]) => {
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

export const createEmptyField = (type: StellarFormField["type"]): StellarFormField => {
  const id = nanoid();

  const emptyField: Record<StellarFormField["type"], StellarFormField> = {
    SHORT_TEXT: {
      id,
      label: "",
      required: false,
      type: "SHORT_TEXT",
    },
    LONG_TEXT: {
      id,
      label: "",
      required: false,
      type: "LONG_TEXT",
    },
  };

  return emptyField[type];
};
