"use client";

import { cn } from "@/lib/utils";
import { Tooltip as TooltipBase } from "@base-ui-components/react";
import { tv, VariantProps } from "tailwind-variants";

const tooltipVariants = tv({
  base: cn(
    "relative z-50 rounded-[0.5rem] text-xs px-[0.625rem] py-[0.375rem] font-semibold",
    "data-starting-style:opacity-0 data-open:duration-150",
    "data-[side=top]:data-starting-style:translate-y-[0.5rem]",
    "data-[side=bottom]:data-starting-style:translate-y-[-0.5rem]",
    "data-[side=left]:data-starting-style:translate-x-[0.5rem]",
    "data-[side=right]:data-starting-style:translate-x-[-0.5rem]",
  ),
  variants: {
    variant: {
      default: "bg-neutral text-background",
      outlined: "border border-border bg-background shadow-xs text-main",
    },
  },
  defaultVariants: {
    variant: "default",
  },
});

type TooltipProps = VariantProps<typeof tooltipVariants> & {
  className?: string;
  side?: TooltipBase.Positioner.Props["side"];
  content: React.ReactNode;
  children: TooltipBase.Trigger.Props["render"];
};

const Tooltip = ({ className, variant, content, side = "top", children }: TooltipProps) => {
  return (
    <TooltipBase.Provider delay={0}>
      <TooltipBase.Root>
        <TooltipBase.Trigger render={children} />
        <TooltipBase.Portal>
          <TooltipBase.Positioner side={side} sideOffset={4}>
            <TooltipBase.Popup className={cn(tooltipVariants({ variant, className }))}>
              {content}
            </TooltipBase.Popup>
          </TooltipBase.Positioner>
        </TooltipBase.Portal>
      </TooltipBase.Root>
    </TooltipBase.Provider>
  );
};

export { Tooltip };
