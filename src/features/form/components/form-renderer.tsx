"use client";

import { Button } from "@/components/ui/button";
import { Form } from "@/components/ui/form";
import { Tag } from "@/components/ui/tag";
import { zodResolver } from "@hookform/resolvers/zod";
import { format } from "date-fns";
import { Controller, ControllerRenderProps, useForm } from "react-hook-form";
import { FormAnswers, StellarForm } from "../schema";
import { createFormDefaultValues, createFormSchema } from "../utils";
import { FormFieldRenderer } from "./form-field-renderer";

type FormRendererProps = {
  stellarForm: StellarForm;
  onSubmit: (answers: FormAnswers) => void;
};

const DUMMY_CREATED_AT = "2025-08-01T00:00:00.000Z";

export const FormRenderer = ({ stellarForm, onSubmit }: FormRendererProps) => {
  const formSchema = createFormSchema(stellarForm);

  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: createFormDefaultValues(stellarForm.fields),
  });

  return (
    <div className="flex flex-col gap-4">
      <div className="bg-background rounded-md p-5">
        <h1 className="text-2xl font-semibold">{stellarForm.title}</h1>
        <p className="text-subtle mt-2 text-sm font-medium">
          <Tag className="mr-2" variant="secondary">
            진행기간
          </Tag>
          {format(DUMMY_CREATED_AT, "yyyy.MM.dd")} ~
        </p>
      </div>
      <Form className="mb-8 flex flex-col gap-4" onSubmit={form.handleSubmit(onSubmit)}>
        {stellarForm.fields.map((formField) => (
          <Form.Item
            key={formField.id}
            error={!!form.formState.errors[formField.id]}
            required={formField.required}
          >
            <div className="bg-background border-border flex flex-col rounded-md p-5">
              <Form.Label>{formField.label}</Form.Label>
              <Controller
                name={formField.id}
                control={form.control}
                render={({ field }) => (
                  <FormFieldRenderer
                    type={formField.type}
                    field={
                      field as ControllerRenderProps<Record<string, string | undefined>, string>
                    }
                  />
                )}
              />
              <Form.ErrorMessage>{form.formState.errors[formField.id]?.message}</Form.ErrorMessage>
            </div>
          </Form.Item>
        ))}
        <Button className="mt-4 w-[140px] self-center" type="submit" size="xlarge">
          제출하기
        </Button>
      </Form>
    </div>
  );
};
