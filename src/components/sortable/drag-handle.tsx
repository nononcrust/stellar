import { useSortable } from "@dnd-kit/sortable";
import { GripVerticalIcon } from "lucide-react";

type DragHandleProps = {
  id: string;
};

export const DragHandle = ({ id }: DragHandleProps) => {
  const { listeners, attributes, setActivatorNodeRef } = useSortable({ id });

  return (
    <button
      ref={setActivatorNodeRef}
      className="hover:bg-background-hover text-subtle rounded-[4px] px-[0.5px] py-[3px]"
      aria-label="순서 변경"
      {...attributes}
      {...listeners}
    >
      <GripVerticalIcon className="size-4" />
    </button>
  );
};
