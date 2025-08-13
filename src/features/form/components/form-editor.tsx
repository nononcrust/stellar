import { DragHandle } from "@/components/sortable/drag-handle";
import { SortableArea } from "@/components/sortable/sortable-area";
import { SortableItem } from "@/components/sortable/sortable-item";
import { IconButton } from "@/components/ui/icon-button";
import { FieldDropdown } from "@/features/form/components/field-dropdown";
import { FormFieldEditor } from "@/features/form/components/form-field-editor";
import { TITLE_MAX_LENGTH } from "@/features/form/config";
import { StellarForm, StellarFormField } from "@/features/form/schema";
import { cn } from "@/lib/utils";
import { PlusIcon } from "lucide-react";
import { FormEditorContext, useFormEditor } from "../hooks/use-form-editor";

type FormEditorProps = {
  value: StellarForm;
  onChange: (form: StellarForm) => void;
};

export const FormEditor = ({ value, onChange }: FormEditorProps) => {
  return (
    <FormEditorContext value={{ value, onChange }}>
      <div>
        <TitleInput className="ml-6" />
        <Content />
        <AddFieldButton className="ml-6" />
      </div>
    </FormEditorContext>
  );
};

const Content = () => {
  const { stellarForm, swapFields } = useFormEditor();

  return (
    <SortableArea
      className="my-8 flex flex-col gap-8"
      items={stellarForm.fields.map((field) => field.id)}
      onDragEnd={swapFields}
      dragOverlay={({ activeId }) => {
        const activeField = stellarForm.fields.find((field) => field.id === activeId);
        if (!activeField) return null;

        return <FieldItem field={activeField} />;
      }}
    >
      {stellarForm.fields.map((field) => (
        <FieldItem key={field.id} field={field} />
      ))}
    </SortableArea>
  );
};

type TitleInputProps = {
  className?: string;
};

const TitleInput = ({ className }: TitleInputProps) => {
  const { stellarForm, changeTitle } = useFormEditor();

  return (
    <input
      value={stellarForm.title}
      onChange={(e) => changeTitle(e.target.value)}
      maxLength={TITLE_MAX_LENGTH}
      placeholder="폼 제목"
      className={cn("placeholder-placeholder text-2xl font-semibold outline-hidden", className)}
    />
  );
};

type FieldItemProps = {
  field: StellarFormField;
};

const FieldItem = ({ field }: FieldItemProps) => {
  const { updateField, removeField } = useFormEditor();

  return (
    <SortableItem id={field.id}>
      <div className="relative flex items-start gap-2">
        <DragHandle id={field.id} />
        <div className="border-border bg-background flex flex-1 flex-col rounded-md border p-6">
          <FormFieldEditor field={field} onFieldChange={updateField} onRemoveField={removeField} />
        </div>
      </div>
    </SortableItem>
  );
};

type AddFieldButtonProps = {
  className?: string;
};

const AddFieldButton = ({ className }: AddFieldButtonProps) => {
  const { appendField } = useFormEditor();

  return (
    <FieldDropdown
      trigger={
        <IconButton className={className} variant="outlined" aria-label="필드 추가" size="xsmall">
          <PlusIcon className="size-4" />
        </IconButton>
      }
      onSelect={appendField}
    />
  );
};
