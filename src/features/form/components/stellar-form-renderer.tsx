import { Button } from "@/components/ui/button";
import { Form } from "@/components/ui/form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Controller, useForm } from "react-hook-form";
import { createFormDefaultValues, createFormSchema, StellarForm } from "..";
import { StellarFormFieldRenderer } from "./stellar-form-field-renderer";

type StellarFormRendererProps = {
  stellarForm: StellarForm;
  onSubmit: (data: unknown) => void;
};

export const StellarFormRenderer = ({ stellarForm, onSubmit }: StellarFormRendererProps) => {
  const formSchema = createFormSchema(stellarForm);

  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: createFormDefaultValues(stellarForm.fields),
  });

  return (
    <div>
      <h1 className="text-2xl font-semibold">{stellarForm.title}</h1>
      <Form className="my-8 flex flex-col gap-6" onSubmit={form.handleSubmit(onSubmit)}>
        {stellarForm.fields.map((formField) => (
          <Form.Item
            key={formField.id}
            error={!!form.formState.errors[formField.id]}
            required={formField.required}
          >
            <Form.Label>{formField.label}</Form.Label>
            <Controller
              name={formField.id}
              control={form.control}
              render={({ field }) => (
                <StellarFormFieldRenderer type={formField.type} field={field} />
              )}
            />
            <Form.ErrorMessage>{form.formState.errors[formField.id]?.message}</Form.ErrorMessage>
          </Form.Item>
        ))}
        <Button className="mt-4 w-fit" type="submit">
          제출하기
        </Button>
      </Form>
    </div>
  );
};
