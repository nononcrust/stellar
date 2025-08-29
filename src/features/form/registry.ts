import { objectKeys } from "@/lib/object";
import {
  ChevronDownIcon,
  CircleDotIcon,
  CopyCheckIcon,
  HashIcon,
  MailIcon,
  PhoneIcon,
  TextIcon,
  TypeIcon,
} from "lucide-react";
import { nanoid } from "nanoid";
import z from "zod";
import { StellarFormField } from "./schema";
import { applyOptionalConstraint } from "./utils";

const emptyCommonField = {
  label: "",
  description: "",
  required: false,
};

type FieldRegistry<T extends StellarFormField["type"]> = {
  name: string;
  defaultValue: Extract<StellarFormField, { type: T }>["defaultValue"];
  emptyField: () => Omit<Extract<StellarFormField, { type: T }>, "type" | "id" | "defaultValue">;
  formSchema: (field: StellarFormField) => unknown;
  icon: React.ComponentType<React.SVGProps<SVGSVGElement>>;
};

const shortTextField: FieldRegistry<"SHORT_TEXT"> = {
  name: "짧은 텍스트",
  defaultValue: "",
  formSchema: (field) => applyOptionalConstraint(z.string(), field.required),
  emptyField: () => emptyCommonField,
  icon: TypeIcon,
} as const;

const longTextField: FieldRegistry<"LONG_TEXT"> = {
  name: "긴 텍스트",
  defaultValue: "",
  formSchema: (field) => applyOptionalConstraint(z.string(), field.required),
  emptyField: () => emptyCommonField,
  icon: TextIcon,
} as const;

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
} as const;

const phoneNumberField: FieldRegistry<"PHONE_NUMBER"> = {
  name: "전화번호",
  defaultValue: "",
  formSchema: (field) => applyOptionalConstraint(z.string(), field.required),
  emptyField: () => emptyCommonField,
  icon: PhoneIcon,
} as const;

const numberField: FieldRegistry<"NUMBER"> = {
  name: "숫자",
  defaultValue: "",
  formSchema: (field) => applyOptionalConstraint(z.string(), field.required),
  emptyField: () => emptyCommonField,
  icon: HashIcon,
} as const;

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
} as const;

const singleChoiceField: FieldRegistry<"SINGLE_CHOICE"> = {
  name: "단일 선택",
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
  icon: CircleDotIcon,
} as const;

const multipleChoiceField: FieldRegistry<"MULTIPLE_CHOICE"> = {
  name: "다중 선택",
  defaultValue: [],
  formSchema: () => z.string().array(),
  emptyField: () => ({
    ...emptyCommonField,
    options: [
      {
        label: "",
        value: nanoid(),
      },
    ],
  }),
  icon: CopyCheckIcon,
};

export const fieldRegistry = {
  SHORT_TEXT: shortTextField,
  LONG_TEXT: longTextField,
  EMAIL: emailField,
  PHONE_NUMBER: phoneNumberField,
  NUMBER: numberField,
  DROPDOWN: dropdownField,
  SINGLE_CHOICE: singleChoiceField,
  MULTIPLE_CHOICE: multipleChoiceField,
} as const;

export const FORM_TYPES = objectKeys(fieldRegistry);
