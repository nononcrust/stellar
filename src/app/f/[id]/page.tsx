"use client";

import { FormRenderer } from "@/features/form/components/form-renderer";
import { inquiryFormTemplate } from "@/features/form/templates";
import { noop } from "es-toolkit";

export default function FormResponsePage() {
  return (
    <main className="mx-auto mt-8 max-w-xl px-4">
      <FormRenderer stellarForm={inquiryFormTemplate} onSubmit={noop} />
    </main>
  );
}
