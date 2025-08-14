"use client";

import { createContextFactory } from "@/lib/context";
import { cn } from "@/lib/utils";
import { Radio as RadioBase } from "@base-ui-components/react/radio";
import { RadioGroup as RadioGroupBase } from "@base-ui-components/react/radio-group";
import React, { useId } from "react";
import { tv, VariantProps } from "tailwind-variants";

const radioGroupVariants = tv({
  slots: {
    root: "grid",
    item: cn(
      "aspect-sqaure border-border size-4 shrink-0 rounded-full border shadow-xs outline-hidden",
      "data-checked:border-primary data-checked:bg-primary data-checked:text-white",
      "data-disabled:pointer-events-none data-disabled:opacity-50",
    ),
    indicator: "",
    label: "font-medium w-fit",
    option: "flex items-center cursor-pointer",
  },
  variants: {
    variant: {
      primary: {
        item: "data-checked:bg-primary data-checked:border-primary",
      },
      neutral: {
        item: "data-checked:bg-neutral data-checked:border-neutral",
      },
    },
    size: {
      small: {
        root: "gap-2",
        item: "size-4",
        indicator: "size-[0.375rem]",
        label: "text-sm",
        option: "gap-2",
      },
      medium: {
        root: "gap-3",
        item: "size-5",
        indicator: "size-[0.5rem]",
        label: "text-[0.9375rem]",
        option: "gap-2.5",
      },
      large: {
        root: "gap-4",
        item: "size-6",
        indicator: "size-[0.625rem]",
        label: "text-base w-full",
        option: "gap-3",
      },
    },
  },
  defaultVariants: {
    variant: "primary",
    size: "medium",
  },
});

type RadioGroupProps<TValue extends string> = Omit<
  RadioGroupBase.Props,
  "value" | "onValueChange" | "onChange"
> &
  VariantProps<typeof radioGroupVariants> & {
    value?: TValue;
    onChange?: (value: TValue) => void;
  };

const RadioGroup = <TValue extends string>({
  className,
  children,
  "aria-invalid": ariaInvalid,
  size,
  variant,
  onChange,
  ...props
}: RadioGroupProps<TValue>) => {
  return (
    <RadioGroupContext value={{ ariaInvalid, size, variant }}>
      <RadioGroupBase
        className={cn(radioGroupVariants({ size, variant }).root(), className)}
        onValueChange={onChange as (value: unknown) => void}
        {...props}
      >
        {children}
      </RadioGroupBase>
    </RadioGroupContext>
  );
};

type RadioGroupItemProps = Omit<RadioBase.Root.Props, "className"> & {
  className?: string;
};

const RadioGroupItem = ({ className, ...props }: RadioGroupItemProps) => {
  const id = useId();
  const { ariaInvalid, size, variant } = useRadioGroupContext();

  return (
    <RadioBase.Root
      id={id}
      className={cn(
        radioGroupVariants({ size, variant }).item(),
        ariaInvalid &&
          "border-error focus-visible:ring-ring-error data-checked:bg-error data-checked:border-error",
        className,
      )}
      {...props}
    >
      <RadioBase.Indicator className="flex items-center justify-center">
        <svg
          className={cn(radioGroupVariants({ size }).indicator())}
          viewBox="0 0 6 6"
          fill="currentcolor"
          xmlns="http://www.w3.org/2000/svg"
        >
          <circle cx="3" cy="3" r="3" />
        </svg>
      </RadioBase.Indicator>
    </RadioBase.Root>
  );
};

type RadioGroupLabelProps = React.ComponentPropsWithRef<"label">;

const RadioGroupLabel = ({ className, children, ...props }: RadioGroupLabelProps) => {
  const { size } = useRadioGroupContext();

  return (
    <label className={cn(radioGroupVariants({ size }).label(), className)} {...props}>
      {children}
    </label>
  );
};

type RadioGroupOptionProps = RadioGroupItemProps;

const RadioGroupOption = ({ className, children, ...props }: RadioGroupOptionProps) => {
  return (
    <RadioGroupLabel className={cn(radioGroupVariants({ size: "medium" }).option(), className)}>
      <RadioGroupItem {...props} />
      {children}
    </RadioGroupLabel>
  );
};

RadioGroup.Item = RadioGroupItem;
RadioGroup.Option = RadioGroupOption;

type RadioGroupContextValue = {
  ariaInvalid?: boolean | "true" | "false" | "grammar" | "spelling" | undefined;
  size: VariantProps<typeof radioGroupVariants>["size"];
  variant: VariantProps<typeof radioGroupVariants>["variant"];
};

const [RadioGroupContext, useRadioGroupContext] =
  createContextFactory<RadioGroupContextValue>("RadioGroup");

export { RadioGroup };
