"use client";

import { cn } from "@/lib/utils";
import { Checkbox as CheckboxBase } from "@base-ui-components/react/checkbox";
import { noop } from "es-toolkit";
import { CheckIcon, MinusIcon } from "lucide-react";
import { tv, VariantProps } from "tailwind-variants";

const DEFAULT_SIZE = "medium";

export const checkboxVariants = tv({
  slots: {
    root: cn(
      "bg-background border-border shadow-xs outline-hidden peer size-4 shrink-0 border",
      "data-checked:text-white",
      "data-indeterminate:border-neutral data-indeterminate:bg-neutral data-indeterminate:text-white",
      "disabled:pointer-events-none disabled:opacity-50",
    ),
    icon: "stroke-3",
    label: "font-medium",
  },
  variants: {
    variant: {
      primary: {
        root: "text-white data-checked:border-primary data-checked:bg-primary",
      },
      neutral: {
        root: "text-white data-checked:border-neutral data-checked:bg-neutral",
      },
    },
    size: {
      small: {
        root: "size-4 rounded-[0.25rem]",
        icon: "size-[0.75rem]",
        label: "ml-2 text-sm",
      },
      medium: {
        root: "size-5 rounded-[0.3125rem]",
        icon: "size-[0.875rem]",
        label: "ml-2.5 text-[0.9375rem]",
      },
      large: {
        root: "size-6 rounded-[0.375rem]",
        icon: "size-[1.125rem]",
        label: "ml-3 text-base",
      },
    },
  },
  defaultVariants: {
    variant: "primary",
    size: DEFAULT_SIZE,
  },
});

type CheckboxProps = Omit<
  React.ComponentPropsWithRef<typeof CheckboxBase.Root>,
  "onChange" | "onCheckedChange"
> &
  VariantProps<typeof checkboxVariants> & {
    onChange?: (checked: boolean) => void;
  };

const Checkbox = ({
  className,
  checked,
  "aria-invalid": ariaInvalid,
  size,
  variant,
  children,
  onChange = noop,
  ...props
}: CheckboxProps) => {
  const variants = checkboxVariants({ size, variant });

  return (
    <label className={cn("flex w-fit items-center", className)}>
      <CheckboxBase.Root
        className={cn(
          variants.root(),
          ariaInvalid &&
            "border-error focus-visible:ring-ring-error data-checked:border-error data-checked:bg-error",
        )}
        checked={checked}
        aria-invalid={ariaInvalid}
        onCheckedChange={onChange}
        {...props}
      >
        <CheckboxBase.Indicator
          className="flex items-center justify-center"
          render={(props, state) => (
            <span {...props}>
              {state.indeterminate ? (
                <MinusIcon className={variants.icon()} />
              ) : (
                <CheckIcon className={variants.icon()} />
              )}
            </span>
          )}
        />
      </CheckboxBase.Root>
      <span className={cn(variants.label())}>{children}</span>
    </label>
  );
};

export { Checkbox };
