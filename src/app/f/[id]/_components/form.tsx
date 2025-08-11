"use client";

import { FormRenderer } from "@/features/form/components/form-renderer";
import { FormAnswers, StellarForm } from "@/features/form/schema";
import { useCreateFormResponseMutation } from "@/services/form-response";

type FormProps = {
  form: StellarForm;
};

export const Form = ({ form }: FormProps) => {
  const createFormResponse = useCreateFormResponseMutation();

  const onSubmit = (answers: FormAnswers) => {
    if (createFormResponse.isPending) return;

    createFormResponse.mutate({
      formId: form.id,
      answers,
    });
  };

  return <FormRenderer stellarForm={form} onSubmit={onSubmit} />;
};
