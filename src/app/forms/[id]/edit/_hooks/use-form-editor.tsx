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

  const updateField = (field: StellarFormField) => {
    setStellarForm((prev) => ({
      ...prev,
      fields: prev.fields.map((f) => (f.id === field.id ? field : f)),
    }));
  };

  const changeTitle = (title: string) => {
    setStellarForm((prev) => ({
      ...prev,
      title,
    }));
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
    updateField,
    removeField,
    changeTitle,
    swapFields,
  };
};
