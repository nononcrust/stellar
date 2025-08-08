"use client";

import { DragHandle } from "@/components/sortable/drag-handle";
import { SortableArea } from "@/components/sortable/sortable-area";
import { SortableItem } from "@/components/sortable/sortable-item";
import { Button } from "@/components/ui/button";
import { IconButton } from "@/components/ui/icon-button";
import { StellarFormField } from "@/features/form";
import { FieldEditor } from "@/features/form/components/editors";
import { FieldDropdown } from "@/features/form/components/field-dropdown";
import { TITLE_MAX_LENGTH } from "@/features/form/configs";
import { inquiryFormTemplate } from "@/features/form/templates";
import { ErrorBoundary, Suspense } from "@suspensive/react";
import { PlusIcon } from "lucide-react";
import { FormEditorContextProvider, useFormEditor } from "./_hooks/use-form-editor";

const FormEditPage = ErrorBoundary.with(
  { fallback: null },
  Suspense.with({ fallback: null, clientOnly: true }, () => {
    return (
      <FormEditorContextProvider initialValue={inquiryFormTemplate}>
        <Header />
        <main className="mx-auto max-w-2xl px-4 py-8">
          <FormEditor />
        </main>
      </FormEditorContextProvider>
    );
  }),
);

const Header = () => {
  return (
    <header className="bg-background sticky top-0 right-0 left-0 z-20 flex h-16 items-center justify-end px-3">
      <div className="flex items-center gap-2">
        <Button variant="secondary" size="small">
          미리보기
        </Button>
        <Button size="small">저장하기</Button>
      </div>
    </header>
  );
};

const FormEditor = () => {
  const { stellarForm, swapFields } = useFormEditor();

  return (
    <div>
      <TitleInput />
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
      <AddFieldButton />
    </div>
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
        <div className="flex-1">
          <FieldEditor field={field} onFieldChange={updateField} onRemoveField={removeField} />
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

export default FormEditPage;
