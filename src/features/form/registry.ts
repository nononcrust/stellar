import { objectKeys } from "@/lib/object";
import { ChevronDownIcon, HashIcon, MailIcon, PhoneIcon, TextIcon, TypeIcon } from "lucide-react";
import { nanoid } from "nanoid";
import z from "zod";
import { StellarFormField } from "./schema";
import { applyOptionalConstraint } from "./utils";

type FieldRegistry<T extends StellarFormField["type"]> = {
  name: string;
  defaultValue: string;
  emptyField: () => Omit<Extract<StellarFormField, { type: T }>, "type" | "id">;
  formSchema: (
    field: StellarFormField,
  ) => z.ZodString | z.ZodOptional<z.ZodString> | z.ZodEmail | z.ZodOptional<z.ZodEmail>;
  icon: React.ComponentType<React.SVGProps<SVGSVGElement>>;
};

const emptyCommonField = {
  label: "",
  description: "",
  required: false,
};

const shortTextField: FieldRegistry<"SHORT_TEXT"> = {
  name: "짧은 텍스트",
  defaultValue: "",
  formSchema: (field) => applyOptionalConstraint(z.string(), field.required),
  emptyField: () => emptyCommonField,
  icon: TypeIcon,
};

const longTextField: FieldRegistry<"LONG_TEXT"> = {
  name: "긴 텍스트",
  defaultValue: "",
  formSchema: (field) => applyOptionalConstraint(z.string(), field.required),
  emptyField: () => emptyCommonField,
  icon: TextIcon,
};

const emailField: FieldRegistry<"EMAIL"> = {
  name: "이메일",
  defaultValue: "",
  formSchema: (field) =>
    applyOptionalConstraint(z.string(), field.required).refine(
      (value) => z.email().safeParse(value).success,
      "올바른 이메일 주소를 입력해주세요.",
    ),
  emptyField: () => emptyCommonField,
  icon: MailIcon,
};

const phoneNumberField: FieldRegistry<"PHONE_NUMBER"> = {
  name: "전화번호",
  defaultValue: "",
  formSchema: (field) => applyOptionalConstraint(z.string(), field.required),
  emptyField: () => emptyCommonField,
  icon: PhoneIcon,
};

const numberField: FieldRegistry<"NUMBER"> = {
  name: "숫자",
  defaultValue: "",
  formSchema: (field) => applyOptionalConstraint(z.string(), field.required),
  emptyField: () => emptyCommonField,
  icon: HashIcon,
};

const dropdownField: FieldRegistry<"DROPDOWN"> = {
  name: "드롭다운",
  defaultValue: "",
  formSchema: (field) => applyOptionalConstraint(z.string(), field.required),
  emptyField: () => ({
    ...emptyCommonField,
    options: [
      {
        label: "",
        value: nanoid(),
      },
    ],
  }),
  icon: ChevronDownIcon,
};

export const fieldRegistry = {
  SHORT_TEXT: shortTextField,
  LONG_TEXT: longTextField,
  EMAIL: emailField,
  PHONE_NUMBER: phoneNumberField,
  NUMBER: numberField,
  DROPDOWN: dropdownField,
} satisfies Record<StellarFormField["type"], FieldRegistry<StellarFormField["type"]>>;

export const FORM_TYPES = objectKeys(fieldRegistry);
