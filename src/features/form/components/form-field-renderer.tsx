import { Form } from "@/components/ui/form";
import { ControllerRenderProps } from "react-hook-form";
import { StellarFormField } from "../schema";
import { Field } from "./fields";

type FormFieldRendererProps = {
  type: StellarFormField["type"];
  field: ControllerRenderProps<Record<string, string | undefined>, string>;
};

export const FormFieldRenderer = ({ type: fieldType, field }: FormFieldRendererProps) => {
  return (
    <Form.Control>
      {(() => {
        switch (fieldType) {
          case "SHORT_TEXT":
            return <Field.ShortText {...field} />;
          case "LONG_TEXT":
            return <Field.LongText {...field} />;
          default:
            return fieldType satisfies never;
        }
      })()}
    </Form.Control>
  );
};
