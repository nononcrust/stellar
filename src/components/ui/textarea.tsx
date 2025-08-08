import { cn } from "../../lib/utils";

type TextareaProps = React.ComponentPropsWithRef<"textarea">;

const Textarea = ({ className, "aria-invalid": ariaInvalid, ...props }: TextareaProps) => {
  return (
    <textarea
      className={cn(
        "border-border text-main bg-background flex min-h-[5rem] w-full rounded-md border px-3 py-2 text-sm shadow-xs",
        "field-sizing-content",
        "focus-visible:focus-input-ring",
        "disabled:pointer-events-none disabled:opacity-50",
        "read-only:bg-background-100",
        ariaInvalid && "focus-visible:focus-input-ring-error border-error",
        className,
      )}
      aria-invalid={ariaInvalid}
      {...props}
    />
  );
};

export { Textarea };
