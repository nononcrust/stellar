import { Form } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { ControllerRenderProps } from "react-hook-form";
import { StellarFormField } from "..";

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
