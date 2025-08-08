import { createEmptyField, StellarForm, StellarFormField } from "@/features/form";
import { createContextFactory } from "@/lib/context";
import { useState } from "react";

type FormEditorContext = {
  stellarForm: StellarForm;
  setStellarForm: React.Dispatch<React.SetStateAction<StellarForm>>;
};

const [FormEditorContext, useFormEditorContext] =
  createContextFactory<FormEditorContext>("FormEditor");

type FormEditorContextProviderProps = {
  initialValue: StellarForm;
  children: React.ReactNode;
};

export const FormEditorContextProvider = ({
  children,
  initialValue,
}: FormEditorContextProviderProps) => {
  const [stellarForm, setStellarForm] = useState<StellarForm>(initialValue);

  return <FormEditorContext value={{ stellarForm, setStellarForm }}>{children}</FormEditorContext>;
};

export const useFormEditor = () => {
  const { stellarForm, setStellarForm } = useFormEditorContext();

  const appendField = (type: StellarFormField["type"]) => {
    const emptyField = createEmptyField(type);

    setStellarForm((prev) => ({
      ...prev,
      fields: [...prev.fields, emptyField],
    }));
  };

  const removeField = (fieldId: string) => {
    setStellarForm((prev) => ({
      ...prev,
      fields: prev.fields.filter((field) => field.id !== fieldId),
    }));
  };

  const changeTitle = (title: string) => {
    setStellarForm((prev) => ({
      ...prev,
      title,
    }));
  };

  const toggleFieldRequired = (fieldId: string) => {
    setStellarForm((prev) => ({
      ...prev,
      fields: prev.fields.map((field) =>
        field.id === fieldId ? { ...field, required: !field.required } : field,
      ),
    }));
  };

  const registerLabelInput = (fieldId: string) => {
    const value = stellarForm.fields.find((field) => field.id === fieldId)?.label;

    const onChange: React.ChangeEventHandler<HTMLInputElement> = (event) => {
      setStellarForm((prev) => ({
        ...prev,
        fields: prev.fields.map((field) =>
          field.id === fieldId ? { ...field, label: event.target.value } : field,
        ),
      }));
    };

    return {
      value,
      onChange,
    };
  };

  const swapFields = (id: string, overId: string) => {
    setStellarForm((prev) => {
      const fields = [...prev.fields];
      const fromIndex = fields.findIndex((field) => field.id === id);
      const toIndex = fields.findIndex((field) => field.id === overId);

      if (fromIndex === -1 || toIndex === -1 || fromIndex === toIndex) return prev;

      const [movedField] = fields.splice(fromIndex, 1);

      if (!movedField) return prev;

      fields.splice(toIndex, 0, movedField);

      return {
        ...prev,
        fields,
      };
    });
  };

  return {
    stellarForm,
    appendField,
    removeField,
    changeTitle,
    toggleFieldRequired,
    registerLabelInput,
    swapFields,
  };
};
