import { Form } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { ControllerRenderProps } from "react-hook-form";
import { FormField } from ".";

type FormFieldProps = {
  type: FormField["type"];
  field: ControllerRenderProps<Record<string, string | undefined>, string>;
};

export const FormFieldRenderer = ({ type: fieldType, field }: FormFieldProps) => {
  return (
    <Form.Control>
      {(() => {
        switch (fieldType) {
          case "SHORT_TEXT":
            return <Input {...field} />;
          case "LONG_TEXT":
            return <Textarea {...field} />;
          default:
            return fieldType satisfies never;
        }
      })()}
    </Form.Control>
  );
};
