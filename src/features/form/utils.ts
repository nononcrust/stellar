import { ROUTE } from "@/lib/route";
import { Form } from "@prisma/client";
import { nanoid } from "nanoid";
import z from "zod";
import { fieldRegistry } from "./registry";
import { StellarForm, StellarFormField } from "./schema";

export const applyOptionalConstraint = (
  zodSchema: z.ZodString | z.ZodEmail,
  isRequired: boolean,
) => {
  return isRequired ? zodSchema.min(1, "필수 항목입니다.") : zodSchema.optional();
};

const createFormFieldSchema = (field: StellarFormField) => {
  return fieldRegistry[field.type].formSchema(field);
};

export const createFormSchema = (form: StellarForm) => {
  return z.object(
    Object.fromEntries(form.fields.map((field) => [field.id, createFormFieldSchema(field)])),
  );
};

export const createFormDefaultValues = (fields: StellarForm["fields"]) => {
  return Object.fromEntries(
    fields.map((field) => {
      return [field.id, fieldRegistry[field.type].defaultValue];
    }),
  );
};

export const createEmptyField = <T extends StellarFormField["type"]>(
  type: T,
): Extract<StellarFormField, { type: T }> => {
  const id = nanoid();

  const emptyField = {
    id,
    type,
    defaultValue: fieldRegistry[type].defaultValue,
    ...fieldRegistry[type].emptyField(),
  } as Extract<StellarFormField, { type: T }>;

  return emptyField;
};

export const createEmptyForm = (): StellarForm => {
  const id = nanoid();

  const emptyForm: StellarForm = {
    id,
    title: "",
    fields: [],
  };

  return emptyForm;
};

export const generateFormUrl = ({ id }: { id: string }): string => {
  return process.env.NEXT_PUBLIC_APP_URL + ROUTE.FORM_RESPONSE({ id });
};

export const allowedFormStatusTransitions: Record<Form["status"], Form["status"][]> = {
  PENDING: ["ACTIVE", "CLOSED"],
  ACTIVE: ["PAUSED", "CLOSED"],
  PAUSED: ["ACTIVE", "CLOSED"],
  CLOSED: ["ACTIVE"],
};
