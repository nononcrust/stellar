import { nanoid } from "nanoid";
import z from "zod";
import { registry } from "./registry";
import { StellarForm, StellarFormField } from "./schema";

export const applyOptionalConstraint = (zodSchema: z.ZodString, isRequired: boolean) => {
  return isRequired ? zodSchema.min(1, "필수 항목입니다.") : zodSchema.optional();
};

const createFormFieldSchema = (field: StellarFormField) => {
  return registry[field.type].formSchema(field);
};

export const createFormSchema = (form: StellarForm) => {
  return z.object(
    Object.fromEntries(form.fields.map((field) => [field.id, createFormFieldSchema(field)])),
  );
};

export const createFormDefaultValues = (fields: StellarForm["fields"]) => {
  return Object.fromEntries(
    fields.map((field) => {
      return [field.id, registry[field.type].defaultValue];
    }),
  );
};

export const createEmptyField = (type: StellarFormField["type"]): StellarFormField => {
  const id = nanoid();

  const emptyField: StellarFormField = {
    id,
    type,
    ...registry[type].emptyField,
  };

  return emptyField;
};
