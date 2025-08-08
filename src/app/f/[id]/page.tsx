"use client";

import { StellarFormRenderer } from "@/features/form/components/stellar-form-renderer";
import { inquiryFormTemplate } from "@/features/form/templates";
import { noop } from "es-toolkit";

export default function FormResponsePage() {
  return (
    <main className="mx-auto mt-8 max-w-xl px-4">
      <StellarFormRenderer stellarForm={inquiryFormTemplate} onSubmit={noop} />
    </main>
  );
}
