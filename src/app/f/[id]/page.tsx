"use client";

import { Button } from "@/components/ui/button";
import { Form } from "@/components/ui/form";
import { createFormDefaultValues, createFormSchema } from "@/features/form";
import { FormFieldRenderer } from "@/features/form/form-field";
import { inquiryFormTemplate } from "@/features/form/template";
import { zodResolver } from "@hookform/resolvers/zod";
import { noop } from "es-toolkit";
import { Controller, useForm } from "react-hook-form";

export default function FormResponsePage() {
  const formSchema = createFormSchema(inquiryFormTemplate);

  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: createFormDefaultValues(inquiryFormTemplate.fields),
  });

  const onSubmit = form.handleSubmit(noop);

  return (
    <main className="mx-auto mt-8 max-w-xl px-4">
      <h1 className="text-2xl font-semibold">{inquiryFormTemplate.title}</h1>
      <Form className="mt-8 flex flex-col gap-6" onSubmit={onSubmit}>
        {inquiryFormTemplate.fields.map((formField) => (
          <Form.Item
            key={formField.id}
            error={!!form.formState.errors[formField.id]}
            required={formField.required}
          >
            <Form.Label>{formField.label}</Form.Label>
            <Controller
              name={formField.id}
              control={form.control}
              render={({ field }) => <FormFieldRenderer type={formField.type} field={field} />}
            />
            <Form.ErrorMessage>{form.formState.errors[formField.id]?.message}</Form.ErrorMessage>
          </Form.Item>
        ))}
        <Button className="mt-4 w-fit" type="submit">
          제출하기
        </Button>
      </Form>
    </main>
  );
}
