import { objectKeys } from "@/lib/object";
import { TextIcon, TypeIcon } from "lucide-react";
import z from "zod";
import { StellarFormField } from "./schema";
import { applyOptionalConstraint } from "./utils";

type Registry = {
  name: string;
  defaultValue: string;
  emptyField: Omit<StellarFormField, "type" | "id">;
  formSchema: (field: StellarFormField) => z.ZodString | z.ZodOptional<z.ZodString>;
  icon: React.ComponentType<React.SVGProps<SVGSVGElement>>;
};

export const registry: Record<StellarFormField["type"], Registry> = {
  SHORT_TEXT: {
    name: "짧은 텍스트",
    defaultValue: "",
    formSchema: (field) => applyOptionalConstraint(z.string(), field.required),
    emptyField: {
      label: "",
      required: false,
    },
    icon: TypeIcon,
  },
  LONG_TEXT: {
    name: "긴 텍스트",
    defaultValue: "",
    formSchema: (field) => applyOptionalConstraint(z.string(), field.required),
    emptyField: {
      label: "",
      required: false,
    },
    icon: TextIcon,
  },
};

export const FORM_TYPES = objectKeys(registry);
