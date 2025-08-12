import { cn } from "@/lib/utils";
import { useSortable } from "@dnd-kit/sortable";
import { GripVerticalIcon } from "lucide-react";

type DragHandleProps = {
  className?: string;
  id: string;
};

export const DragHandle = ({ className, id }: DragHandleProps) => {
  const { listeners, attributes, setActivatorNodeRef } = useSortable({ id });

  return (
    <button
      ref={setActivatorNodeRef}
      className={cn("text-subtle rounded-[4px] px-[0.5px] py-[3px]", className)}
      aria-label="순서 변경"
      {...attributes}
      {...listeners}
    >
      <GripVerticalIcon className="size-4" />
    </button>
  );
};
