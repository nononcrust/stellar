import { Form } from "@/components/ui/form";
import { ControllerRenderProps } from "react-hook-form";
import { StellarFormField } from "../schema";
import { Field } from "./fields";

type Field<TValue> = ControllerRenderProps<Record<string, TValue | undefined>, string>;

type FormFieldRendererProps = {
  formField: StellarFormField;
  field: Field<unknown>;
};

export const FormFieldRenderer = ({ formField, field }: FormFieldRendererProps) => {
  return (
    <Form.Control>
      {(() => {
        switch (formField.type) {
          case "SHORT_TEXT":
            return <Field.ShortText {...(field as Field<string>)} />;
          case "LONG_TEXT":
            return <Field.LongText {...(field as Field<string>)} />;
          case "EMAIL":
            return <Field.Email {...(field as Field<string>)} />;
          case "PHONE_NUMBER":
            return <Field.PhoneNumber {...(field as Field<string>)} />;
          case "NUMBER":
            return <Field.Number {...(field as Field<string>)} />;
          case "DROPDOWN":
            return <Field.Dropdown {...(field as Field<string>)} options={formField.options} />;
          case "SINGLE_CHOICE":
            return <Field.SingleChoice {...(field as Field<string>)} options={formField.options} />;
          case "MULTIPLE_CHOICE":
            return (
              <Field.MultipleChoice {...(field as Field<string[]>)} options={formField.options} />
            );
          default:
            return formField satisfies never;
        }
      })()}
    </Form.Control>
  );
};
