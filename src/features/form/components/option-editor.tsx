import { DragHandle } from "@/components/sortable/drag-handle";
import { SortableArea } from "@/components/sortable/sortable-area";
import { SortableItem } from "@/components/sortable/sortable-item";
import { IconButton } from "@/components/ui/icon-button";
import { arrayMove } from "@dnd-kit/sortable";
import { PlusIcon, XIcon } from "lucide-react";
import { nanoid } from "nanoid";
import { Option } from "../schema";

const MIN_OPTIONS = 1;

type OptionEditorProps = {
  options: Option[];
  onOptionsChange: (options: Option[]) => void;
  maxOptions: number;
};

export const OptionEditor = ({ options, onOptionsChange, maxOptions }: OptionEditorProps) => {
  const onOptionChange = (option: Option) => {
    const updatedOptions = options.map((opt) => (opt.value === option.value ? option : opt));

    onOptionsChange(updatedOptions);
  };

  const swapOptions = (id: string, overId: string) => {
    onOptionsChange(
      arrayMove(
        options,
        options.findIndex((option) => option.value === id),
        options.findIndex((option) => option.value === overId),
      ),
    );
  };

  const addOption = () => {
    const newOption = { label: "", value: nanoid() };

    onOptionsChange([...options, newOption]);
  };

  const removeOption = (value: string) => {
    onOptionsChange(options.filter((option) => option.value !== value));
  };

  return (
    <>
      <SortableArea
        items={options.map((option) => option.value)}
        className="flex flex-col gap-2"
        onDragEnd={swapOptions}
        dragOverlay={({ activeId }) => {
          const activeOption = options.find((option) => option.value === activeId);
          if (!activeOption) return null;

          return (
            <OptionItem
              option={activeOption}
              onRemove={removeOption}
              onOptionChange={onOptionChange}
              showRemoveButton={options.length > MIN_OPTIONS}
            />
          );
        }}
      >
        {options.map((option) => (
          <OptionItem
            key={option.value}
            option={option}
            onOptionChange={onOptionChange}
            onRemove={removeOption}
            showRemoveButton={options.length > MIN_OPTIONS}
          />
        ))}
      </SortableArea>
      {options.length < maxOptions && (
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
    </>
  );
};

type OptionItemProps = {
  option: Option;
  onOptionChange: (option: Option) => void;
  onRemove: (value: string) => void;
  showRemoveButton: boolean;
};

const OptionItem = ({ option, onRemove, onOptionChange, showRemoveButton }: OptionItemProps) => {
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
          autoFocus
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
