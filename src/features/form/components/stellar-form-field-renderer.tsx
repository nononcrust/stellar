import { Form } from "@/components/ui/form";
import { ControllerRenderProps } from "react-hook-form";
import { StellarFormField } from "..";
import { Field } from "./fields";

type StellarFormFieldRendererProps = {
  type: StellarFormField["type"];
  field: ControllerRenderProps<Record<string, string | undefined>, string>;
};

export const StellarFormFieldRenderer = ({
  type: fieldType,
  field,
}: StellarFormFieldRendererProps) => {
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
