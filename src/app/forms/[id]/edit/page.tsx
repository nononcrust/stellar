"use client";

import { Button } from "@/components/ui/button";
import { DropdownMenu } from "@/components/ui/dropdown-menu";
import { IconButton } from "@/components/ui/icon-button";
import { Input } from "@/components/ui/input";
import { Switch } from "@/components/ui/switch";
import { Textarea } from "@/components/ui/textarea";
import { Tooltip } from "@/components/ui/tooltip";
import { FORM_TYPES, LongText, ShortText, StellarFormField } from "@/features/form";
import { inquiryFormTemplate } from "@/features/form/template";
import { cn } from "@/lib/utils";
import {
  closestCenter,
  DndContext,
  DragOverlay,
  PointerSensor,
  useSensor,
  useSensors,
} from "@dnd-kit/core";
import {
  restrictToParentElement,
  restrictToVerticalAxis,
  restrictToWindowEdges,
} from "@dnd-kit/modifiers";
import { SortableContext, useSortable, verticalListSortingStrategy } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { ErrorBoundary, Suspense } from "@suspensive/react";
import { GripVerticalIcon, PlusIcon, TextIcon, Trash2Icon, TypeIcon } from "lucide-react";
import { useState } from "react";
import { FormEditorContextProvider, useFormEditor } from "./_hooks/use-form-editor";

export const FormEditPage = ErrorBoundary.with(
  { fallback: null },
  Suspense.with({ fallback: null }, () => {
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
      <div className="my-8 flex flex-col gap-8">
        <DndProvider
          items={stellarForm.fields.map((field) => field.id)}
          onDragEnd={swapFields}
          dragOverlay={({ activeId }) => {
            const activeField = stellarForm.fields.find((field) => field.id === activeId);
            if (!activeField) return null;

            return <FieldEditor field={activeField} />;
          }}
        >
          {stellarForm.fields.map((field) => (
            <FieldEditor key={field.id} field={field} />
          ))}
        </DndProvider>
      </div>
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
      placeholder="폼 제목"
      className="placeholder-placeholder text-2xl font-semibold outline-hidden"
    />
  );
};

type FieldEditorProps = {
  field: StellarFormField;
};

const FieldEditor = ({ field }: FieldEditorProps) => {
  return (
    <SortableItem id={field.id}>
      <div className="flex items-start gap-2">
        <DragHandle id={field.id} />
        <div className="flex-1">
          {(() => {
            switch (field.type) {
              case "SHORT_TEXT":
                return <ShortTextEditor field={field} />;
              case "LONG_TEXT":
                return <LongTextEditor field={field} />;
              default:
                field satisfies never;
            }
          })()}
        </div>
      </div>
    </SortableItem>
  );
};

type ShortTextEditorProps = {
  field: ShortText;
};

const ShortTextEditor = ({ field }: ShortTextEditorProps) => {
  const { registerLabelInput } = useFormEditor();

  return (
    <div className="flex flex-col">
      <LabelInput {...registerLabelInput(field.id)} className="mb-2" />
      <Input className="text-placeholder" />
      <TextEditorFooter field={field} />
    </div>
  );
};

type TextEditorFooterProps = {
  field: StellarFormField;
};

const TextEditorFooter = ({ field }: TextEditorFooterProps) => {
  const { removeField, toggleFieldRequired } = useFormEditor();

  return (
    <div className="mt-3 flex items-center justify-between">
      <label className="text-sub flex items-center gap-2 text-sm">
        필수 입력
        <Switch
          checked={field.required}
          onChange={() => toggleFieldRequired(field.id)}
          size="small"
        />
      </label>
      <Tooltip content="필드 삭제">
        <IconButton
          aria-label="필드 삭제"
          size="xsmall"
          variant="ghost"
          onClick={() => removeField(field.id)}
        >
          <Trash2Icon className="text-sub size-4" />
        </IconButton>
      </Tooltip>
    </div>
  );
};

type LongTextEditorProps = {
  field: LongText;
};

const LongTextEditor = ({ field }: LongTextEditorProps) => {
  const { registerLabelInput } = useFormEditor();

  return (
    <div className="flex flex-col">
      <LabelInput className="mb-2" {...registerLabelInput(field.id)} />
      <Textarea className="text-placeholder" />
      <TextEditorFooter field={field} />
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

const AddFieldButton = () => {
  const { appendField } = useFormEditor();

  return (
    <DropdownMenu>
      <DropdownMenu.Trigger
        render={
          <IconButton variant="outlined" aria-label="필드 추가" size="xsmall">
            <PlusIcon className="size-4" />
          </IconButton>
        }
      />
      <DropdownMenu.Content>
        {FORM_TYPES.map((formType) => (
          <DropdownMenu.Item key={formType} onClick={() => appendField(formType)}>
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

type SortableItemProps = {
  id: string;
  children: React.ReactNode;
};

const SortableItem = ({ id, children }: SortableItemProps) => {
  const { setNodeRef, transform, transition, isDragging } = useSortable({ id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    visibility: isDragging ? "hidden" : "visible",
    cursor: isDragging ? "grabbing" : "grab",
  } as const;

  return (
    <div ref={setNodeRef} style={style}>
      {children}
    </div>
  );
};

type DragHandleProps = {
  id: string;
};

const DragHandle = ({ id }: DragHandleProps) => {
  const { listeners, attributes, setActivatorNodeRef } = useSortable({ id });

  return (
    <button
      ref={setActivatorNodeRef}
      className="hover:bg-background-hover text-subtle rounded-[4px] px-[0.5px] py-[3px]"
      aria-label="필드 순서 변경"
      {...attributes}
      {...listeners}
    >
      <GripVerticalIcon className="size-4" />
    </button>
  );
};

export default FormEditPage;

type DndProviderProps = {
  items: string[];
  onDragEnd: (activeId: string, overId: string) => void;
  children: React.ReactNode;
  dragOverlay: ({ activeId }: { activeId: string | null }) => React.ReactNode;
};

const DndProvider = ({ items, onDragEnd, children, dragOverlay }: DndProviderProps) => {
  const sensors = useSensors(useSensor(PointerSensor));

  const [activeId, setActiveId] = useState<string | null>(null);

  return (
    <DndContext
      sensors={sensors}
      modifiers={[restrictToVerticalAxis, restrictToWindowEdges, restrictToParentElement]}
      collisionDetection={closestCenter}
      onDragStart={(event) => setActiveId(event.active.id.toString())}
      onDragEnd={(event) => {
        const { active, over } = event;

        if (over === null) return;

        onDragEnd(active.id.toString(), over.id.toString());

        setActiveId(null);
      }}
    >
      <SortableContext items={items} strategy={verticalListSortingStrategy}>
        {children}
      </SortableContext>
      <DragOverlay>{dragOverlay({ activeId })}</DragOverlay>
    </DndContext>
  );
};
