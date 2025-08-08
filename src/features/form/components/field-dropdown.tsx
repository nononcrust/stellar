import { DropdownMenu } from "@/components/ui/dropdown-menu";
import { FORM_TYPES, registry } from "../registry";
import { StellarFormField } from "../schema";

type FieldDropdownProps = {
  trigger: React.ReactElement<Record<string, unknown>>;
  onSelect: (type: StellarFormField["type"]) => void;
};

export const FieldDropdown = ({ trigger, onSelect }: FieldDropdownProps) => {
  return (
    <DropdownMenu>
      <DropdownMenu.Trigger render={trigger} />
      <DropdownMenu.Content>
        {FORM_TYPES.map((formType) => {
          const Icon = registry[formType].icon;

          return (
            <DropdownMenu.Item key={formType} onClick={() => onSelect(formType)}>
              <span className="flex items-center gap-2">
                <Icon className="size-4" />
                <span>{registry[formType].name}</span>
              </span>
            </DropdownMenu.Item>
          );
        })}
      </DropdownMenu.Content>
    </DropdownMenu>
  );
};
