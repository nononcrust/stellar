import { DropdownMenu } from "@/components/ui/dropdown-menu";
import { TextIcon, TypeIcon } from "lucide-react";
import { FORM_TYPES } from "..";

type FieldDropdownProps = {
  trigger: React.ReactElement<Record<string, unknown>>;
  onSelect: (type: (typeof FORM_TYPES)[number]) => void;
};

export const FieldDropdown = ({ trigger, onSelect }: FieldDropdownProps) => {
  return (
    <DropdownMenu>
      <DropdownMenu.Trigger render={trigger} />
      <DropdownMenu.Content>
        {FORM_TYPES.map((formType) => (
          <DropdownMenu.Item key={formType} onClick={() => onSelect(formType)}>
            {(() => {
              switch (formType) {
                case "SHORT_TEXT":
                  return (
                    <span className="flex items-center gap-2">
                      <TypeIcon className="size-4" />
                      <span>짧은 텍스트</span>
                    </span>
                  );
                case "LONG_TEXT":
                  return (
                    <span className="flex items-center gap-2">
                      <TextIcon className="size-4" />
                      <span>긴 텍스트</span>
                    </span>
                  );
                default:
                  return formType satisfies never;
              }
            })()}
          </DropdownMenu.Item>
        ))}
      </DropdownMenu.Content>
    </DropdownMenu>
  );
};
