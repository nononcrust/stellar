"use client";

import { PageHeader } from "@/components/layouts/page-header";
import { FormStatusTag } from "@/features/form/components/form-status-tag";
import { formDetailQueryOptions } from "@/services/dashboard/form";
import { formResponseListQueryOptions } from "@/services/form-response";
import { Suspense } from "@suspensive/react";
import { useSuspenseQuery } from "@tanstack/react-query";
import { useParams } from "next/navigation";

const FormDetailPage = Suspense.with({ fallback: null, clientOnly: true }, () => {
  const params = useParams() as { id: string };

  const { data: form } = useSuspenseQuery(formDetailQueryOptions({ id: params.id }));
  const { data: formResponses } = useSuspenseQuery(
    formResponseListQueryOptions({
      page: 1,
      limit: 10,
    }),
  );

  return (
    <main className="mx-auto flex max-w-4xl flex-col px-4">
      <PageHeader>
        <FormStatusTag className="w-fit" status={form.status} />
        <PageHeader.Title>{form.title}</PageHeader.Title>
      </PageHeader>
      <ul>
        {formResponses.data.map((formResponse) => (
          <li key={formResponse.id}>
            {form.fields.map((field) => (
              <div key={field.id}>
                <span>{field.label}</span>
                <span>{formResponse.answers[field.id]}</span>
              </div>
            ))}
          </li>
        ))}
      </ul>
    </main>
  );
});

export default FormDetailPage;
