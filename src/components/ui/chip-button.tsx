import { cn } from "@/lib/utils";
import { useRender } from "@base-ui-components/react/use-render";
import { tv, VariantProps } from "tailwind-variants";
import { buttonVariant } from "./button";

const chipButtonVariants = tv({
  base: "inline-flex gap-2 items-center justify-center rounded-full border border-transparent font-medium transition-colors",
  variants: {
    variant: buttonVariant,
    size: {
      xsmall: "px-[0.625rem] h-8 text-xs",
      small: "px-[0.875rem] h-9 text-[0.8125rem]",
      medium: "px-[1rem] h-10 text-sm",
      large: "px-[1.125rem] h-11 text-base",
      xlarge: "px-[1.25rem] h-[3.5rem] text-lg",
    },
  },
  defaultVariants: {
    variant: "primary",
    size: "medium",
  },
});

type ChipButtonProps = useRender.ComponentProps<"button"> & VariantProps<typeof chipButtonVariants>;

const ChipButton = ({ className, render, disabled, variant, size, ...props }: ChipButtonProps) => {
  const defaultRender = <button />;

  return useRender({
    render: render ?? defaultRender,
    props: {
      className: cn(chipButtonVariants({ variant, size, className })),
      disabled,
      type: render ? undefined : "button",
      ...props,
    },
  });
};

export { ChipButton };
