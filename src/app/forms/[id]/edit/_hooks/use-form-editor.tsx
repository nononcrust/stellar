import { StellarForm, StellarFormField } from "@/features/form/schema";
import { createEmptyField } from "@/features/form/utils";
import { createContextFactory } from "@/lib/context";
import { arrayMove } from "@dnd-kit/sortable";
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
      const fromIndex = prev.fields.findIndex((field) => field.id === id);
      const toIndex = prev.fields.findIndex((field) => field.id === overId);

      if (fromIndex === -1 || toIndex === -1 || fromIndex === toIndex) return prev;

      return {
        ...prev,
        fields: arrayMove(prev.fields, fromIndex, toIndex),
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
