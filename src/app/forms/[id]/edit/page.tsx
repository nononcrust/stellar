"use client";

import { DragHandle } from "@/components/sortable/drag-handle";
import { SortableArea } from "@/components/sortable/sortable-area";
import { SortableItem } from "@/components/sortable/sortable-item";
import { Button } from "@/components/ui/button";
import { IconButton } from "@/components/ui/icon-button";
import { FieldDropdown } from "@/features/form/components/field-dropdown";
import { FormFieldEditor } from "@/features/form/components/form-field-editor";
import { TITLE_MAX_LENGTH } from "@/features/form/config";
import { StellarFormField } from "@/features/form/schema";
import { formDetailQueryOptions, useUpdateFormMutation } from "@/services/dashboard/form";
import { ErrorBoundary, Suspense } from "@suspensive/react";
import { useSuspenseQuery } from "@tanstack/react-query";
import { PlusIcon } from "lucide-react";
import { useParams } from "next/navigation";
import { FormEditorContextProvider, useFormEditor } from "./_hooks/use-form-editor";

const FormEditPage = ErrorBoundary.with(
  { fallback: null },
  Suspense.with({ fallback: null, clientOnly: true }, () => {
    const params = useParams<{ id: string }>();

    const { data: form } = useSuspenseQuery(formDetailQueryOptions(params.id));

    return (
      <FormEditorContextProvider initialValue={form}>
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
        <SaveButton />
      </div>
    </header>
  );
};

const SaveButton = () => {
  const { stellarForm } = useFormEditor();
  const updateForm = useUpdateFormMutation();

  const onClick = () => {
    if (updateForm.isPending) return;

    updateForm.mutate({
      param: {
        id: stellarForm.id,
      },
      json: {
        title: stellarForm.title,
        fields: stellarForm.fields,
      },
    });
  };

  return (
    <Button size="small" onClick={onClick}>
      저장하기
    </Button>
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

export default FormEditPage;
