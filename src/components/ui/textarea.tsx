import { cn } from "../../lib/utils";

type TextareaProps = React.ComponentPropsWithRef<"textarea">;

const Textarea = ({ className, "aria-invalid": ariaInvalid, ...props }: TextareaProps) => {
  return (
    <textarea
      className={cn(
        "border-border text-main bg-background placeholder-placeholder flex min-h-[7rem] w-full rounded-md border px-4 py-3 text-[0.9375rem] shadow-xs",
        "field-sizing-content resize-none",
        "focus-visible:focus-input-ring",
        "disabled:pointer-events-none disabled:opacity-50",
        ariaInvalid && "focus-visible:focus-input-ring-error border-error",
        className,
      )}
      aria-invalid={ariaInvalid}
      {...props}
    />
  );
};

export { Textarea };
