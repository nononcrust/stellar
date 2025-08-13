import { IconButton } from "@/components/ui/icon-button";
import { Switch } from "@/components/ui/switch";
import { Tag } from "@/components/ui/tag";
import { Tooltip } from "@/components/ui/tooltip";
import { cn } from "@/lib/utils";
import { Trash2Icon } from "lucide-react";
import { fieldRegistry } from "../registry";
import { StellarFormField } from "../schema";
import { FieldEditor } from "./field-editors";

type FormFieldEditorProps = {
  field: StellarFormField;
  onFieldChange: (field: StellarFormField) => void;
  onRemoveField: (id: string) => void;
};

export const FormFieldEditor = ({ field, onFieldChange, onRemoveField }: FormFieldEditorProps) => {
  const onLabelChange: React.ChangeEventHandler<HTMLInputElement> = (event) => {
    onFieldChange({ ...field, label: event.target.value });
  };

  const onDescriptionChange: React.ChangeEventHandler<HTMLInputElement> = (event) => {
    onFieldChange({ ...field, description: event.target.value });
  };

  return (
    <div className="flex flex-col">
      <TextEditorHeader field={field} />
      <LabelInput className="mb-2" value={field.label} onChange={onLabelChange} />
      <DescriptionInput className="mb-3" value={field.description} onChange={onDescriptionChange} />
      {(() => {
        switch (field.type) {
          case "SHORT_TEXT":
            return <FieldEditor.ShortText />;
          case "LONG_TEXT":
            return <FieldEditor.LongText />;
          case "EMAIL":
            return <FieldEditor.Email />;
          case "PHONE_NUMBER":
            return <FieldEditor.PhoneNumber />;
          case "NUMBER":
            return <FieldEditor.Number />;
          case "DROPDOWN":
            return <FieldEditor.Dropdown field={field} onFieldChange={onFieldChange} />;
          default:
            field satisfies never;
        }
      })()}
      <TextEditorFooter
        field={field}
        onRequiredChange={(required) => onFieldChange({ ...field, required })}
        onRemoveField={onRemoveField}
      />
    </div>
  );
};

type TextEditorHeaderProps = {
  field: StellarFormField;
};

const TextEditorHeader = ({ field }: TextEditorHeaderProps) => {
  return (
    <Tag className="mb-3 w-fit" variant="secondary">
      {fieldRegistry[field.type].name}
    </Tag>
  );
};

type TextEditorFooterProps = {
  field: StellarFormField;
  onRequiredChange: (required: boolean) => void;
  onRemoveField: (id: string) => void;
};

const TextEditorFooter = ({ field, onRequiredChange, onRemoveField }: TextEditorFooterProps) => {
  return (
    <div className="mt-3 flex items-center justify-between">
      <label className="text-sub flex items-center gap-2 text-sm">
        필수 입력
        <Switch checked={field.required} onChange={onRequiredChange} size="small" />
      </label>
      <Tooltip content="필드 삭제">
        <IconButton
          aria-label="필드 삭제"
          size="xsmall"
          variant="ghost"
          onClick={() => onRemoveField(field.id)}
        >
          <Trash2Icon className="text-subtle size-4" />
        </IconButton>
      </Tooltip>
    </div>
  );
};

type LabelInputProps = React.ComponentPropsWithRef<"input">;

const LabelInput = ({ className, ...props }: LabelInputProps) => {
  return (
    <input
      placeholder="레이블을 입력해주세요"
      className={cn("placeholder-placeholder text-base font-medium outline-hidden", className)}
      {...props}
    />
  );
};

type DescriptionInputProps = React.ComponentPropsWithRef<"input">;

const DescriptionInput = ({ className, ...props }: DescriptionInputProps) => {
  return (
    <input
      placeholder="설명을 입력해주세요"
      className={cn(
        "placeholder-placeholder text-sub text-sm font-medium outline-hidden",
        className,
      )}
      {...props}
    />
  );
};
