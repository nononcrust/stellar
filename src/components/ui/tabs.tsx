"use client";

import { createContextFactory } from "@/lib/context";
import { cn } from "@/lib/utils";
import { Tabs as TabsBase } from "@base-ui-components/react/tabs";
import { tv, VariantProps } from "tailwind-variants";

export const tabsVariants = tv({
  base: cn(
    "text-subtle relative inline-flex items-center justify-center border-transparent font-semibold whitespace-nowrap",
    "data-disabled:pointer-events-none data-disabled:opacity-50",
    "data-selected:text-main",
    "hover:text-sub",
  ),
  variants: {
    size: {
      medium: "h-10 text-sm px-3",
      large: "h-12 text-base px-5",
    },
  },
  defaultVariants: {
    size: "medium",
  },
});

type TabsProps = Omit<TabsBase.Root.Props, "onChange" | "onValueChange"> & {
  onChange?: (value: string) => void;
};

const Tabs = ({ className, children, onChange, ...props }: TabsProps) => {
  return (
    <TabsBase.Root className={cn("w-full", className)} onValueChange={onChange} {...props}>
      {children}
    </TabsBase.Root>
  );
};

type TabsListProps = TabsBase.List.Props &
  VariantProps<typeof tabsVariants> & {
    fullWidth?: boolean;
  };

const TabsList = ({ className, children, fullWidth = false, size, ...props }: TabsListProps) => {
  return (
    <TabsListContext value={{ fullWidth, size }}>
      <TabsBase.List
        className={cn(
          "border-border bg-background relative inline-flex items-center justify-center border-b",
          fullWidth && "w-full",
          className,
        )}
        {...props}
      >
        {children}
        <TabsBase.Indicator
          className={cn(
            "bg-main absolute bottom-0 left-0 h-[0.125rem]",
            "w-[var(--active-tab-width)]",
            "translate-x-[var(--active-tab-left)]",
            "transition-all duration-200 ease-out",
          )}
        />
      </TabsBase.List>
    </TabsListContext>
  );
};

type TabsTabProps = Omit<TabsBase.Tab.Props, "className"> & {
  className?: string;
};

const TabsTab = ({ className, children, ...props }: TabsTabProps) => {
  const { fullWidth, size } = useTabsListContext();

  return (
    <TabsBase.Tab
      className={cn(tabsVariants({ size }), fullWidth && "w-full", className)}
      {...props}
    >
      {children}
    </TabsBase.Tab>
  );
};

type TabsPanelProps = TabsBase.Panel.Props;

const TabsPanel = ({ className, children, ...props }: TabsPanelProps) => {
  return (
    <TabsBase.Panel className={cn("outline-hidden", className)} {...props}>
      {children}
    </TabsBase.Panel>
  );
};

type TabsListContextValue = {
  fullWidth: boolean;
  size: VariantProps<typeof tabsVariants>["size"];
};

const [TabsListContext, useTabsListContext] =
  createContextFactory<TabsListContextValue>("TabsList");

Tabs.List = TabsList;
Tabs.Tab = TabsTab;
Tabs.Panel = TabsPanel;

export { Tabs };
