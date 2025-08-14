import { cn } from "@/lib/utils";
import { tv, VariantProps } from "tailwind-variants";

const chipVariants = tv({
  base: "inline-flex items-center justify-center rounded-full border border-transparent font-medium transition-colors",
  variants: {
    variant: {
      primary: "border-transparent bg-primary text-white",
      secondary: "border-transparent bg-secondary text-main",
      primaryLowOutlined:
        "border-primary text-primary bg-primary-lighter hover:bg-primary-lighter-hover dark:bg-primary-darker dark:text-white dark:border-primary-dark dark:hover:bg-primary-darker-hover",
    },
    size: {
      xsmall: "h-6 gap-0.5 px-2 text-xs",
      small: "h-7 gap-0.5 px-2.5 text-xs",
      medium: "h-8 gap-1 px-3 text-[0.8125rem]",
      large: "h-9 gap-1.5 px-3.5 text-sm",
    },
  },
  defaultVariants: {
    variant: "primary",
    size: "medium",
  },
});

type ChipProps = React.ComponentPropsWithRef<"span"> & VariantProps<typeof chipVariants>;

const Chip = ({ className, variant, size, children, ...props }: ChipProps) => {
  return (
    <span className={cn(chipVariants({ variant, size, className }))} {...props}>
      {children}
    </span>
  );
};

export { Chip };
