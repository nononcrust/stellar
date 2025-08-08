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
import { SortableContext, verticalListSortingStrategy } from "@dnd-kit/sortable";
import { useState } from "react";

type SortableAreaProps = {
  className?: string;
  items: string[];
  onDragEnd: (activeId: string, overId: string) => void;
  children: React.ReactNode;
  dragOverlay: ({ activeId }: { activeId: string | null }) => React.ReactNode;
};

export const SortableArea = ({
  className,
  items,
  onDragEnd,
  children,
  dragOverlay,
}: SortableAreaProps) => {
  const sensors = useSensors(useSensor(PointerSensor));

  const [activeId, setActiveId] = useState<string | null>(null);

  return (
    <div className={className}>
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
    </div>
  );
};
