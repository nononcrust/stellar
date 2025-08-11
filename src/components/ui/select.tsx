"use client";

import { Select as SelectBase } from "@base-ui-components/react/select";
import { CheckIcon, ChevronDownIcon } from "lucide-react";
import { cn } from "../../lib/utils";

export const selectTriggerStyle = {
  base: cn(
    "border-border bg-background relative text-main flex h-10 w-full items-center justify-between rounded-md border pl-3 pr-9 text-start text-sm font-medium shadow-xs outline-hidden cursor-pointer",
    "[&>span]:min-w-0",
    "focus-visible:focus-input-ring",
    "data-disabled:pointer-events-none data-disabled:opacity-50 data-disabled:bg-background-100",
  ),
  invalid: "focus-visible:focus-input-ring-error border-error",
};

type SelectChevronDownIconProps = {
  className?: string;
};

export const SelectChevronDownIcon = ({ className }: SelectChevronDownIconProps) => {
  return (
    <ChevronDownIcon
      strokeWidth={2}
      className={cn(
        "text-sub size-4.5 pointer-events-none absolute right-3 top-1/2 shrink-0 -translate-y-1/2",
        className,
      )}
    />
  );
};

type SelectProps = Omit<SelectBase.Trigger.Props, "onChange" | "onValueChange"> & {
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
  "aria-invalid": ariaInvalid,
  ...props
}: SelectProps) => {
  return (
    <SelectBase.Root value={value} onValueChange={onChange} defaultValue={defaultValue}>
      <SelectBase.Trigger
        className={cn(
          selectTriggerStyle.base,
          ariaInvalid && selectTriggerStyle.invalid,
          className,
        )}
        aria-invalid={ariaInvalid}
        {...props}
      >
        <SelectBase.Value
          className="has-data-placeholder:text-sub truncate"
          placeholder={placeholder ? <span data-placeholder>{placeholder}</span> : null}
        />
        <SelectBase.Icon>
          <SelectChevronDownIcon />
        </SelectBase.Icon>
      </SelectBase.Trigger>
      <SelectContent>{children}</SelectContent>
    </SelectBase.Root>
  );
};

type SelectContentProps = SelectBase.Popup.Props;

const SelectContent = ({ className, children, ...props }: SelectContentProps) => {
  return (
    <SelectBase.Portal>
      <SelectBase.Positioner className="outline-hidden" alignItemWithTrigger={false} sideOffset={4}>
        <SelectBase.Popup
          className={cn(
            "border-border bg-background text-main outline-hidden relative z-50 overflow-y-auto overflow-x-hidden rounded-md border p-1 shadow-lg",
            "max-h-[var(--available-height)] min-w-[8rem] max-w-[calc(100vw-0.75rem)]",
            "w-full min-w-[var(--anchor-width)]",
            "data-starting-style:opacity-0 data-open:duration-150",
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
    "outline-hidden relative flex w-full cursor-pointer select-none items-center py-2 pl-3 pr-8 text-sm font-medium rounded-[0.375rem]",
    "data-highlighted:bg-background-hover data-highlighted:text-main",
    "data-selected:text-primary data-selected:font-semibold",
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
  return (
    <span className="bg-primary size-4.5 absolute right-3 flex items-center justify-center rounded-full text-white">
      <CheckIcon className="stroke-3 size-3" />
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

export { Select };
