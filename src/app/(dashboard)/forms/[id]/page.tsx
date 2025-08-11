"use client";

import { Card } from "@/components/ui/card";
import { FormStatusTag } from "@/features/form/components/form-status-tag";
import { formDetailQueryOptions } from "@/services/dashboard/form";
import { Suspense } from "@suspensive/react";
import { useSuspenseQuery } from "@tanstack/react-query";
import { useParams } from "next/navigation";

const FormDetailPage = Suspense.with({ fallback: null, clientOnly: true }, () => {
  const params = useParams() as { id: string };

  const { data: form } = useSuspenseQuery(formDetailQueryOptions({ id: params.id }));

  return (
    <main className="mx-auto flex max-w-2xl flex-col px-4">
      <Card className="mt-8">
        <FormStatusTag className="w-fit" status={form.status} />
        <h1 className="mt-2 flex items-center text-2xl font-bold">{form.title}</h1>
      </Card>
    </main>
  );
});

export default FormDetailPage;
