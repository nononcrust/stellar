import { tv, VariantProps } from "tailwind-variants";
import { cn } from "../../lib/utils";

const inputVariants = tv({
  base: cn(
    "border-border bg-background text-main flex h-11 w-full rounded-md border px-4 text-[0.9375rem] shadow-xs",
    "placeholder-placeholder",
    "disabled:bg-background-100 disabled:pointer-events-none disabled:opacity-50",
  ),
  variants: {
    variant: {
      primary: "focus-visible:focus-input-ring",
      neutral: "focus-visible:focus-input-ring-neutral",
    },
  },
  defaultVariants: {
    variant: "primary",
  },
});

type InputProps = React.ComponentPropsWithRef<"input"> & VariantProps<typeof inputVariants>;

const Input = ({ className, "aria-invalid": ariaInvalid, variant, ...props }: InputProps) => {
  return (
    <input
      className={cn(
        inputVariants({ variant }),
        ariaInvalid && "focus-visible:focus-input-ring-error! border-error",
        className,
      )}
      aria-invalid={ariaInvalid}
      {...props}
    />
  );
};

export { Input };
