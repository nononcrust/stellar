import { cn } from "@/lib/utils";
import { CheckboxGroup as CheckboxGroupBase } from "@base-ui-components/react/checkbox-group";
import { Checkbox } from "./checkbox";

type CheckboxGroupValue = string[] | readonly string[];

type CheckboxGroupProps = Omit<
  CheckboxGroupBase.Props,
  "onValueChange" | "onChange" | "value" | "allValues"
> & {
  value?: CheckboxGroupValue;
  onChange?: (value: CheckboxGroupValue) => void;
};

const CheckboxGroup = ({ className, value, onChange, ...props }: CheckboxGroupProps) => {
  return (
    <CheckboxGroupBase
      className={cn("flex flex-col gap-3", className)}
      value={value as string[]}
      onValueChange={onChange as (value: string[]) => void}
      {...props}
    />
  );
};

type CheckboxGroupOptionProps = React.ComponentPropsWithRef<typeof Checkbox>;

const CheckboxGroupOption = ({ ...props }: CheckboxGroupOptionProps) => {
  return <Checkbox {...props} />;
};

CheckboxGroup.Option = CheckboxGroupOption;

export { CheckboxGroup };
