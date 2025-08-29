"use client";

import { Button } from "@/components/ui/button";
import { FormEditor } from "@/features/form/components/form-editor";
import { FormEditorPageTemplate } from "@/features/form/components/form-editor-page-template";
import { createEmptyForm } from "@/features/form/utils";
import { ROUTE } from "@/lib/route";
import { useCreateFormMutation } from "@/services/dashboard/form";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function FormCreatePage() {
  const [stellarForm, setStellarForm] = useState(createEmptyForm);

  const createForm = useCreateFormMutation();

  const router = useRouter();

  const onCreateButtonClick = () => {
    if (createForm.isPending) return;

    createForm.mutate(
      {
        title: stellarForm.title,
        fields: stellarForm.fields,
      },
      {
        onSuccess: (data) => {
          router.push(ROUTE.DASHBOARD.FORM.DETAIL({ id: data.form.id }));
        },
      },
    );
  };

  return (
    <FormEditorPageTemplate
      header={
        <FormEditorPageTemplate.Header
          stellarForm={stellarForm}
          saveButton={
            <Button size="small" onClick={onCreateButtonClick}>
              저장하기
            </Button>
          }
        />
      }
      editor={<FormEditor value={stellarForm} onChange={setStellarForm} />}
    />
  );
}
