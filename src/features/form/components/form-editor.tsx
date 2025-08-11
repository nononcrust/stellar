import { DragHandle } from "@/components/sortable/drag-handle";
import { SortableArea } from "@/components/sortable/sortable-area";
import { SortableItem } from "@/components/sortable/sortable-item";
import { IconButton } from "@/components/ui/icon-button";
import { FieldDropdown } from "@/features/form/components/field-dropdown";
import { FormFieldEditor } from "@/features/form/components/form-field-editor";
import { TITLE_MAX_LENGTH } from "@/features/form/config";
import { StellarForm, StellarFormField } from "@/features/form/schema";
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
        <TitleInput />
        <Content />
        <AddFieldButton />
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

const TitleInput = () => {
  const { stellarForm, changeTitle } = useFormEditor();

  return (
    <input
      value={stellarForm.title}
      onChange={(e) => changeTitle(e.target.value)}
      maxLength={TITLE_MAX_LENGTH}
      placeholder="폼 제목"
      className="placeholder-placeholder text-2xl font-semibold outline-hidden"
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
      <div className="flex items-start gap-2">
        <DragHandle id={field.id} />
        <div className="border-border bg-background flex flex-1 flex-col rounded-md border p-6">
          <FormFieldEditor field={field} onFieldChange={updateField} onRemoveField={removeField} />
        </div>
      </div>
    </SortableItem>
  );
};

const AddFieldButton = () => {
  const { appendField } = useFormEditor();

  return (
    <FieldDropdown
      trigger={
        <IconButton variant="outlined" aria-label="필드 추가" size="xsmall">
          <PlusIcon className="size-4" />
        </IconButton>
      }
      onSelect={appendField}
    />
  );
};
