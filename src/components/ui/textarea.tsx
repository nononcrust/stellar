import { cn } from "@/lib/utils";
import { tv, VariantProps } from "tailwind-variants";

const textareaVariants = tv({
  base: cn(
    "border-border text-main bg-background placeholder-placeholder flex min-h-[7rem] w-full rounded-md border px-4 py-3 text-[0.9375rem] shadow-xs",
    "field-sizing-content resize-none",
    "disabled:pointer-events-none disabled:opacity-50",
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

type TextareaProps = React.ComponentPropsWithRef<"textarea"> &
  VariantProps<typeof textareaVariants>;

const Textarea = ({ className, "aria-invalid": ariaInvalid, variant, ...props }: TextareaProps) => {
  return (
    <textarea
      className={cn(
        textareaVariants({ variant }),
        ariaInvalid && "focus-visible:focus-input-ring-error! border-error",
        className,
      )}
      aria-invalid={ariaInvalid}
      {...props}
    />
  );
};

export { Textarea };
