import { Form } from "@/components/ui/form";
import { ControllerRenderProps } from "react-hook-form";
import { StellarFormField } from "../schema";
import { Field } from "./fields";

type FormFieldRendererProps = {
  formField: StellarFormField;
  field: ControllerRenderProps<Record<string, string | undefined>, string>;
};

export const FormFieldRenderer = ({ formField, field }: FormFieldRendererProps) => {
  return (
    <Form.Control>
      {(() => {
        switch (formField.type) {
          case "SHORT_TEXT":
            return <Field.ShortText {...field} />;
          case "LONG_TEXT":
            return <Field.LongText {...field} />;
          case "EMAIL":
            return <Field.Email {...field} />;
          case "PHONE_NUMBER":
            return <Field.PhoneNumber {...field} />;
          case "NUMBER":
            return <Field.Number {...field} />;
          case "DROPDOWN":
            return <Field.Dropdown {...field} options={formField.options} />;
          case "SINGLE_CHOICE":
            return <Field.SingleChoice {...field} options={formField.options} />;
          default:
            return formField satisfies never;
        }
      })()}
    </Form.Control>
  );
};
