"use client";

import { formDetailQueryOptions } from "@/services/dashboard/form";
import { Suspense } from "@suspensive/react";
import { useSuspenseQuery } from "@tanstack/react-query";
import { useParams } from "next/navigation";

const FormDetailPage = Suspense.with({ fallback: null }, () => {
  const params = useParams() as { id: string };

  const { data: form } = useSuspenseQuery(formDetailQueryOptions({ id: params.id }));

  return (
    <main>
      <h1>폼 상세</h1>
      <h2>{form.title}</h2>
    </main>
  );
});

export default FormDetailPage;
