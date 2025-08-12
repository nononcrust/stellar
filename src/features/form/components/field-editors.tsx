import { DragHandle } from "@/components/sortable/drag-handle";
import { SortableArea } from "@/components/sortable/sortable-area";
import { SortableItem } from "@/components/sortable/sortable-item";
import { IconButton } from "@/components/ui/icon-button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { arrayMove } from "@dnd-kit/sortable";
import { PlusIcon, XIcon } from "lucide-react";
import { nanoid } from "nanoid";
import {
  LONG_TEXT_MAX_LENGTH,
  MAX_DROPDOWN_OPTIONS,
  MIN_DROPDOWN_OPTIONS,
  SHORT_TEXT_MAX_LENGTH,
} from "../config";
import { StellarFormField } from "../schema";

const ShortTextEditor = () => {
  return (
    <Input readOnly placeholder={`최대 ${SHORT_TEXT_MAX_LENGTH}자`} className="text-placeholder" />
  );
};

const LongTextEditor = () => {
  return (
    <Textarea
      readOnly
      placeholder={`최대 ${LONG_TEXT_MAX_LENGTH}자`}
      className="text-placeholder"
    />
  );
};

const EmailEditor = () => {
  return <Input readOnly placeholder="stellar@gmail.com" className="text-placeholder" />;
};

const PhoneNumberEditor = () => {
  return <Input readOnly placeholder="000-0000-0000" className="text-placeholder" />;
};

const NumberEditor = () => {
  return <Input readOnly placeholder="숫자만 입력 가능" className="text-placeholder" />;
};

type DropdownEditorProps = {
  field: Extract<StellarFormField, { type: "DROPDOWN" }>;
  onFieldChange: (field: Extract<StellarFormField, { type: "DROPDOWN" }>) => void;
};

const DropdownEditor = ({ field, onFieldChange }: DropdownEditorProps) => {
  const addOption = () => {
    const newOption = { label: "", value: nanoid() };

    onFieldChange({
      ...field,
      options: [...field.options, newOption],
    });
  };

  const removeOption = (value: string) => {
    onFieldChange({
      ...field,
      options: field.options.filter((option) => option.value !== value),
    });
  };

  const onOptionChange = (option: { label: string; value: string }) => {
    onFieldChange({
      ...field,
      options: field.options.map((opt) =>
        opt.value === option.value ? { ...opt, label: option.label } : opt,
      ),
    });
  };

  const swapOptions = (id: string, overId: string) => {
    onFieldChange({
      ...field,
      options: arrayMove(
        field.options,
        field.options.findIndex((option) => option.value === id),
        field.options.findIndex((option) => option.value === overId),
      ),
    });
  };

  return (
    <div className="flex flex-col">
      <SortableArea
        items={field.options.map((option) => option.value)}
        className="flex flex-col gap-2"
        onDragEnd={swapOptions}
        dragOverlay={({ activeId }) => {
          const activeOption = field.options.find((option) => option.value === activeId);
          if (!activeOption) return null;

          return (
            <FieldOption
              option={activeOption}
              onRemove={removeOption}
              onOptionChange={onOptionChange}
              showRemoveButton={field.options.length > MIN_DROPDOWN_OPTIONS}
            />
          );
        }}
      >
        {field.options.map((option) => (
          <FieldOption
            key={option.value}
            option={option}
            onOptionChange={onOptionChange}
            onRemove={removeOption}
            showRemoveButton={field.options.length > MIN_DROPDOWN_OPTIONS}
          />
        ))}
      </SortableArea>
      {field.options.length < MAX_DROPDOWN_OPTIONS && (
        <IconButton
          className="mt-4"
          size="xsmall"
          variant="outlined"
          onClick={addOption}
          aria-label="항목 추가"
        >
          <PlusIcon className="size-4" />
        </IconButton>
      )}
    </div>
  );
};

type FieldOptionProps = {
  option: { label: string; value: string };
  onOptionChange: (option: { label: string; value: string }) => void;
  onRemove: (value: string) => void;
  showRemoveButton: boolean;
};

const FieldOption = ({ option, onRemove, onOptionChange, showRemoveButton }: FieldOptionProps) => {
  const onInputChange: React.ChangeEventHandler<HTMLInputElement> = (event) => {
    onOptionChange({ ...option, label: event.target.value });
  };

  return (
    <SortableItem id={option.value}>
      <div key={option.value} className="flex h-8 items-center">
        <DragHandle id={option.value} />
        <input
          value={option.label}
          onChange={onInputChange}
          className="ml-2 flex-1 text-[0.9375rem] font-medium outline-hidden"
          placeholder="항목"
        />
        {showRemoveButton && (
          <IconButton
            size="xsmall"
            variant="ghost"
            aria-label="항목 삭제"
            onClick={() => onRemove(option.value)}
          >
            <XIcon className="size-4" />
          </IconButton>
        )}
      </div>
    </SortableItem>
  );
};

export const FieldEditor = {
  ShortText: ShortTextEditor,
  LongText: LongTextEditor,
  Email: EmailEditor,
  PhoneNumber: PhoneNumberEditor,
  Number: NumberEditor,
  Dropdown: DropdownEditor,
};
