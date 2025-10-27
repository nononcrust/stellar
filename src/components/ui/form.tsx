"use client";

import { createContextFactory } from "@/lib/context";
import { cn } from "@/lib/utils";
import { useRender } from "@base-ui-components/react";
import { useId, useState } from "react";

type FormProps = React.ComponentPropsWithRef<"form">;

const Form = ({ children, ...props }: FormProps) => {
  return <form {...props}>{children}</form>;
};

type FormLabelProps = React.ComponentPropsWithRef<"label">;

const FormLabel = ({ className, children, ...props }: FormLabelProps) => {
  const { required, labelId, id } = useFormFieldContext();

  return (
    <label
      id={labelId}
      htmlFor={id}
      className={cn("text-main w-fit text-base font-medium tracking-tight", className)}
      {...props}
    >
      {children}
      {required && <span className="text-error ml-1">*</span>}
    </label>
  );
};

type FormDescriptionProps = React.ComponentPropsWithoutRef<"p">;

const FormDescription = ({ className, children, ...props }: FormDescriptionProps) => {
  const { descriptionId, setDescriptionElement } = useFormFieldContext();

  const refCallback = (node: HTMLParagraphElement | null) => {
    if (node) {
      setDescriptionElement(node);
    }

    return () => {
      setDescriptionElement(null);
    };
  };

  return (
    <p
      ref={refCallback}
      id={descriptionId}
      className={cn("text-subtle text-sm font-medium", className)}
      {...props}
    >
      {children}
    </p>
  );
};

const FormControl = ({ children }: { children: useRender.RenderProp }) => {
  const {
    invalid,
    id,
    labelId,
    descriptionId,
    errorMessageId,
    descriptionElement,
    errorMessageElement,
  } = useFormFieldContext();

  const ariaDescribedBy =
    cn(descriptionElement && descriptionId, errorMessageElement && errorMessageId) || undefined;

  return useRender({
    render: children,
    props: {
      id,
      "aria-labelledby": labelId,
      "aria-describedby": ariaDescribedBy,
      "aria-invalid": invalid || undefined,
    },
  });
};

type FormErrorMessageProps = React.ComponentPropsWithoutRef<"p">;

const FormErrorMessage = ({ className, children, ...props }: FormErrorMessageProps) => {
  const { errorMessageId, setErrorMessageElement, invalid } = useFormFieldContext();

  const refCallback = (node: HTMLParagraphElement | null) => {
    if (node) {
      setErrorMessageElement(node);
    }

    return () => {
      setErrorMessageElement(null);
    };
  };

  if (!invalid) return null;

  return (
    <p
      ref={refCallback}
      id={errorMessageId}
      className={cn("text-error mt-1 text-[0.8125rem] font-medium", className)}
      {...props}
    >
      {children}
    </p>
  );
};

type FormFieldProps = React.ComponentPropsWithRef<"div"> & {
  invalid?: boolean;
  required?: boolean;
};

const FormField = ({
  className,
  children,
  invalid = false,
  required = false,
  ...props
}: FormFieldProps) => {
  const id = useId();
  const labelId = useId();
  const descriptionId = useId();
  const errorMessageId = useId();

  const [descriptionElement, setDescriptionElement] = useState<HTMLParagraphElement | null>(null);
  const [errorMessageElement, setErrorMessageElement] = useState<HTMLParagraphElement | null>(null);

  return (
    <FormFieldContext
      value={{
        invalid,
        required,
        id,
        labelId,
        descriptionId,
        errorMessageId,
        descriptionElement,
        errorMessageElement,
        setDescriptionElement,
        setErrorMessageElement,
      }}
    >
      <div className={cn("flex flex-col", className)} {...props}>
        {children}
      </div>
    </FormFieldContext>
  );
};

type FormFieldContextValue = {
  id: string;
  labelId: string;
  errorMessageId: string;
  descriptionId: string;
  invalid: boolean;
  required: boolean;
  descriptionElement: HTMLParagraphElement | null;
  errorMessageElement: HTMLParagraphElement | null;
  setDescriptionElement: (element: HTMLParagraphElement | null) => void;
  setErrorMessageElement: (element: HTMLParagraphElement | null) => void;
};

const [FormFieldContext, useFormFieldContext] =
  createContextFactory<FormFieldContextValue>("FormField");

Form.Field = FormField;
Form.Control = FormControl;
Form.Label = FormLabel;
Form.Description = FormDescription;
Form.ErrorMessage = FormErrorMessage;

export { Form };
