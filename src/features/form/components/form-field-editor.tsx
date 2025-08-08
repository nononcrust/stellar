import { StellarFormField } from "../schema";
import { FieldEditor } from "./field-editors";

type FormFieldEditorProps = {
  field: StellarFormField;
  onFieldChange: (field: StellarFormField) => void;
  onRemoveField: (id: string) => void;
};

export const FormFieldEditor = ({ field, onFieldChange, onRemoveField }: FormFieldEditorProps) => {
  return (
    <>
      {(() => {
        switch (field.type) {
          case "SHORT_TEXT":
            return (
              <FieldEditor.ShortText
                field={field}
                onFieldChange={onFieldChange}
                onRemoveField={onRemoveField}
              />
            );
          case "LONG_TEXT":
            return (
              <FieldEditor.LongText
                field={field}
                onFieldChange={onFieldChange}
                onRemoveField={onRemoveField}
              />
            );
          default:
            field satisfies never;
        }
      })()}
    </>
  );
};
