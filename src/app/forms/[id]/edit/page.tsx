"use client";

import { Button } from "@/components/ui/button";
import { FormEditor } from "@/features/form/components/form-editor";
import { FormEditorPageTemplate } from "@/features/form/components/form-editor-page-template";
import { StellarForm } from "@/features/form/schema";
import { formDetailQueryOptions, useUpdateFormMutation } from "@/services/dashboard/form";
import { ErrorBoundary, Suspense } from "@suspensive/react";
import { useSuspenseQuery } from "@tanstack/react-query";
import { useParams, useRouter } from "next/navigation";
import { useState } from "react";

const FormEditPage = ErrorBoundary.with(
  { fallback: null },
  Suspense.with({ fallback: null, clientOnly: true }, () => {
    const params = useParams<{ id: string }>();

    const { data: form } = useSuspenseQuery(formDetailQueryOptions({ id: params.id }));

    const [stellarForm, setStellarForm] = useState<StellarForm>(form);

    return (
      <FormEditorPageTemplate
        header={<FormEditorPageTemplate.Header saveButton={<SaveButton form={stellarForm} />} />}
        editor={<FormEditor value={stellarForm} onChange={setStellarForm} />}
      />
    );
  }),
);

type SaveButtonProps = {
  form: StellarForm;
};

const SaveButton = ({ form }: SaveButtonProps) => {
  const updateForm = useUpdateFormMutation();

  const router = useRouter();

  const onClick = () => {
    if (updateForm.isPending) return;

    updateForm.mutate(
      {
        id: form.id,
        body: {
          title: form.title,
          fields: form.fields,
        },
      },
      {
        onSuccess: () => {
          router.push(`/forms/${form.id}`);
        },
      },
    );
  };

  return (
    <Button size="small" onClick={onClick}>
      저장하기
    </Button>
  );
};

export default FormEditPage;
