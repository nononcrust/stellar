import { IconButton } from "@/components/ui/icon-button";
import { Switch } from "@/components/ui/switch";
import { Tooltip } from "@/components/ui/tooltip";
import { cn } from "@/lib/utils";
import { Trash2Icon } from "lucide-react";
import { LongText, ShortText, StellarFormField } from "../schema";
import { Field } from "./fields";

type ShortTextEditorProps = {
  field: ShortText;
  onFieldChange: (field: ShortText) => void;
  onRemoveField: (id: string) => void;
};

export const ShortTextEditor = ({ field, onFieldChange, onRemoveField }: ShortTextEditorProps) => {
  const onLabelChange: React.ChangeEventHandler<HTMLInputElement> = (event) => {
    onFieldChange({ ...field, label: event.target.value });
  };

  return (
    <div className="flex flex-col">
      <LabelInput className="mb-2" value={field.label} onChange={onLabelChange} />
      <Field.ShortText className="text-placeholder" />
      <TextEditorFooter
        field={field}
        onRequiredChange={(required) => onFieldChange({ ...field, required })}
        onRemoveField={onRemoveField}
      />
    </div>
  );
};

type LongTextEditorProps = {
  field: LongText;
  onFieldChange: (field: LongText) => void;
  onRemoveField: (id: string) => void;
};

export const LongTextEditor = ({ field, onFieldChange, onRemoveField }: LongTextEditorProps) => {
  const onLabelChange: React.ChangeEventHandler<HTMLInputElement> = (event) => {
    onFieldChange({ ...field, label: event.target.value });
  };

  return (
    <div className="flex flex-col">
      <LabelInput className="mb-2" value={field.label} onChange={onLabelChange} />
      <Field.LongText className="text-placeholder" />
      <TextEditorFooter
        field={field}
        onRequiredChange={(required) => onFieldChange({ ...field, required })}
        onRemoveField={onRemoveField}
      />
    </div>
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
      className={cn("placeholder-placeholder text-sm font-medium outline-hidden", className)}
      {...props}
    />
  );
};

// type DescriptionInputProps = React.ComponentPropsWithRef<"input">;

// const DescriptionInput = ({ className, ...props }: DescriptionInputProps) => {
//   return (
//     <input
//       placeholder="설명을 입력해주세요"
//       className={cn(
//         "placeholder-placeholder text-sub text-[0.8125rem] font-medium outline-hidden",
//         className,
//       )}
//       {...props}
//     />
//   );
// };

export const FieldEditor = {
  ShortText: ShortTextEditor,
  LongText: LongTextEditor,
};
