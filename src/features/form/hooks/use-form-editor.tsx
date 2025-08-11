import { StellarForm, StellarFormField } from "@/features/form/schema";
import { createEmptyField } from "@/features/form/utils";
import { createContextFactory } from "@/lib/context";
import { arrayMove } from "@dnd-kit/sortable";

type FormEditorContextValue = {
  value: StellarForm;
  onChange: (value: StellarForm) => void;
};

const [FormEditorContext, useFormEditorContext] =
  createContextFactory<FormEditorContextValue>("FormEditor");

export { FormEditorContext };

export const useFormEditor = () => {
  const { value, onChange } = useFormEditorContext();

  const appendField = (type: StellarFormField["type"]) => {
    const emptyField = createEmptyField(type);

    onChange({
      ...value,
      fields: [...value.fields, emptyField],
    });
  };

  const removeField = (fieldId: string) => {
    onChange({
      ...value,
      fields: value.fields.filter((field) => field.id !== fieldId),
    });
  };

  const updateField = (field: StellarFormField) => {
    onChange({
      ...value,
      fields: value.fields.map((f) => (f.id === field.id ? field : f)),
    });
  };

  const changeTitle = (title: string) => {
    onChange({
      ...value,
      title,
    });
  };

  const swapFields = (id: string, overId: string) => {
    onChange({
      ...value,
      fields: arrayMove(
        value.fields,
        value.fields.findIndex((field) => field.id === id),
        value.fields.findIndex((field) => field.id === overId),
      ),
    });
  };

  return {
    stellarForm: value,
    appendField,
    updateField,
    removeField,
    changeTitle,
    swapFields,
  };
};
