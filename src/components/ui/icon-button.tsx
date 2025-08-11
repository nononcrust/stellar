import { cn } from "@/lib/utils";
import { useRender } from "@base-ui-components/react/use-render";
import { tv, VariantProps } from "tailwind-variants";

export type IconButtonProps = useRender.ComponentProps<"button"> &
  VariantProps<typeof iconButtonVariants> & {
    "aria-label": string;
  };

const iconButtonVariants = tv({
  base: cn(
    "inline-flex justify-center items-center border border-transparent whitespace-nowrap transition-colors",
    "disabled:opacity-50 disabled:pointer-events-none",
  ),
  variants: {
    variant: {
      primary: "bg-primary text-white hover:bg-primary-dark",
      primaryLow:
        "bg-primary-lighter text-primary hover:bg-primary-lighter-hover dark:bg-primary-darker dark:text-white dark:hover:bg-primary-darker-hover",
      primaryOutlined: "bg-background border border-border text-primary hover:bg-background-hover",
      primaryLowOutlined:
        "border border-primary text-primary bg-primary-lighter hover:bg-primary-lighter-hover dark:bg-primary-darker dark:text-white dark:border-primary-dark dark:hover:bg-primary-darker-hover",
      secondary: "bg-secondary text-main hover:bg-secondary-dark",
      contained: "bg-neutral text-background hover:bg-neutral-dark",
      outlined: "bg-background border border-border text-main hover:bg-background-hover",
      ghost: "hover:bg-background-hover",
      error: "bg-error text-white hover:bg-error-dark",
    },
    size: {
      xsmall: "size-7 text-xs rounded-[0.5rem]",
      small: "size-8 text-sm rounded-[0.5rem]",
      medium: "size-9 text-base rounded-md",
      large: "size-10 text-lg rounded-md",
    },
  },
  defaultVariants: {
    variant: "primary",
    size: "medium",
  },
});

const IconButton = ({
  className,
  variant,
  size,
  disabled,
  render,
  "aria-label": ariaLabel,
  ...props
}: IconButtonProps) => {
  const defaultRender = <button />;

  return useRender({
    render: render ?? defaultRender,
    props: {
      className: cn(iconButtonVariants({ size, variant, className })),
      disabled,
      type: render ? undefined : "button",
      "aria-label": ariaLabel,
      ...props,
    },
  });
};

export { IconButton };
