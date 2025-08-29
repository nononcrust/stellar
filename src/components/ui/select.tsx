"use client";

import { createContextFactory } from "@/lib/context";
import { cn } from "@/lib/utils";
import { Select as SelectBase } from "@base-ui-components/react/select";
import { CheckIcon, ChevronDownIcon } from "lucide-react";
import { tv, VariantProps } from "tailwind-variants";

const selectVariants = tv({
  slots: {
    trigger: cn(
      "border-border bg-background relative text-main flex h-11 w-full items-center justify-between rounded-md border pl-4 pr-9 text-start text-[0.9375rem] font-medium shadow-xs outline-hidden cursor-pointer",
      "[&>span]:min-w-0",
      "focus-visible:focus-input-ring",
      "data-disabled:pointer-events-none data-disabled:opacity-50 data-disabled:bg-background-100",
    ),
    itemIndicator:
      "absolute right-3 flex size-4.5 items-center justify-center rounded-full text-white",
  },
  variants: {
    variant: {
      primary: {
        trigger: "focus-visible:focus-input-ring",
        itemIndicator: "bg-primary",
      },
      neutral: {
        trigger: "focus-visible:focus-input-ring-neutral",
        itemIndicator: "bg-neutral",
      },
    },
  },
  defaultVariants: {
    variant: "primary",
  },
});

type SelectChevronDownIconProps = {
  className?: string;
};

export const SelectChevronDownIcon = ({ className }: SelectChevronDownIconProps) => {
  return (
    <ChevronDownIcon
      strokeWidth={2}
      className={cn(
        "text-sub pointer-events-none absolute top-1/2 right-3 size-4.5 shrink-0 -translate-y-1/2",
        className,
      )}
    />
  );
};

type SelectProps = Omit<
  React.ComponentPropsWithRef<typeof SelectBase.Trigger>,
  "onChange" | "onValueChange"
> &
  VariantProps<typeof selectVariants> & {
    value?: string;
    onChange?: (value: string) => void;
    defaultValue?: string;
    placeholder?: string;
  };

const Select = ({
  value,
  onChange,
  className,
  children,
  placeholder,
  defaultValue,
  variant,
  "aria-invalid": ariaInvalid,
  ...props
}: SelectProps) => {
  const variants = selectVariants({ variant });

  return (
    <SelectContext value={{ variant }}>
      <SelectBase.Root value={value} onValueChange={onChange} defaultValue={defaultValue}>
        <SelectBase.Trigger
          className={cn(
            variants.trigger(),
            ariaInvalid && "focus-visible:focus-input-ring-error! border-error",
            className,
          )}
          aria-invalid={ariaInvalid}
          {...props}
        >
          <SelectBase.Value
            className="has-data-placeholder:text-placeholder truncate has-data-placeholder:font-normal"
            placeholder={placeholder ? <span data-placeholder>{placeholder}</span> : null}
          />
          <SelectBase.Icon>
            <SelectChevronDownIcon />
          </SelectBase.Icon>
        </SelectBase.Trigger>
        <SelectContent>{children}</SelectContent>
      </SelectBase.Root>
    </SelectContext>
  );
};

type SelectContentProps = SelectBase.Popup.Props;

const SelectContent = ({ className, children, ...props }: SelectContentProps) => {
  return (
    <SelectBase.Portal>
      <SelectBase.Positioner className="outline-hidden" alignItemWithTrigger={false} sideOffset={4}>
        <SelectBase.Popup
          className={cn(
            "border-border bg-background text-main relative z-50 overflow-x-hidden overflow-y-auto rounded-md border p-1 shadow-lg outline-hidden",
            "max-h-[var(--available-height)] max-w-[calc(100vw-0.75rem)] min-w-[8rem]",
            "w-full min-w-[var(--anchor-width)]",
            "data-open:duration-150 data-starting-style:opacity-0",
            "data-[side=top]:data-starting-style:translate-y-[0.5rem]",
            "data-[side=bottom]:data-starting-style:translate-y-[-0.5rem]",
            className,
          )}
          {...props}
        >
          {children}
        </SelectBase.Popup>
      </SelectBase.Positioner>
    </SelectBase.Portal>
  );
};

type SelectGroupLabelProps = SelectBase.GroupLabel.Props;

const SelectGroupLabel = ({ className, children, ...props }: SelectGroupLabelProps) => {
  return (
    <SelectBase.GroupLabel
      className={cn("text-subtle px-3 py-1.5 text-xs font-medium", className)}
      {...props}
    >
      {children}
    </SelectBase.GroupLabel>
  );
};

export const selectItemStyle = {
  base: cn(
    "outline-hidden relative flex w-full cursor-pointer select-none items-center py-2 pl-3 pr-8 text-[0.9375rem] font-medium rounded-[0.375rem] text-sub",
    "data-highlighted:bg-background-hover data-highlighted:text-main",
    "data-selected:text-neutral data-selected:font-semibold",
    "data-disabled:pointer-events-none data-disabled:opacity-50",
  ),
};

type SelectOptionProps = SelectBase.Item.Props;

const SelectOption = ({ className, children, ...props }: SelectOptionProps) => {
  return (
    <SelectBase.Item className={cn(selectItemStyle.base, className)} {...props}>
      <SelectBase.ItemText>{children}</SelectBase.ItemText>
      <SelectBase.ItemIndicator render={<SelectItemIndicator />} />
    </SelectBase.Item>
  );
};

export const SelectItemIndicator = () => {
  const { variant } = useSelectContext();

  const variants = selectVariants({ variant });

  return (
    <span className={cn(variants.itemIndicator())}>
      <CheckIcon className="size-3 stroke-3" />
    </span>
  );
};

type SelectSeparatorProps = SelectBase.Separator.Props;

const SelectSeparator = ({ className, children, ...props }: SelectSeparatorProps) => {
  return (
    <SelectBase.Separator className={cn("bg-border -mx-1 my-1 h-px", className)} {...props}>
      {children}
    </SelectBase.Separator>
  );
};

Select.Group = SelectBase.Group;
Select.GroupLabel = SelectGroupLabel;
Select.Option = SelectOption;
Select.Separator = SelectSeparator;

type SelectContextValue = {
  variant: VariantProps<typeof selectVariants>["variant"];
};

const [SelectContext, useSelectContext] = createContextFactory<SelectContextValue>("Select");

export { Select };
