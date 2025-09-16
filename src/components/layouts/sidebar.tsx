"use client";

import { ROUTE } from "@/lib/route";
import { cn } from "@/lib/utils";
import { formListQueryOptions } from "@/services/dashboard/form";
import { useRender } from "@base-ui-components/react";
import { Suspense } from "@suspensive/react";
import { useSuspenseQuery } from "@tanstack/react-query";
import { LayoutGridIcon, SquarePenIcon } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { UserProfile } from "../shared/user-profile";

export const Sidebar = () => {
  return (
    <aside className="border-border bg-background-100 fixed top-0 bottom-0 left-0 flex w-[260px] flex-col border-r p-3 pb-0">
      <UserProfile />
      <SidebarItem className="mt-4" render={<Link href={ROUTE.DASHBOARD.FORM.CREATE} />}>
        <SquarePenIcon className="text-subtle size-4" />
        새로 만들기
      </SidebarItem>
      <SidebarItem render={<Link href={ROUTE.DASHBOARD.FORM.LIST} />}>
        <LayoutGridIcon className="text-subtle size-4" />
        전체 목록
      </SidebarItem>
      <Suspense clientOnly>
        <FormList />
      </Suspense>
    </aside>
  );
};

const FormList = () => {
  const { data: forms } = useSuspenseQuery(formListQueryOptions());
  const pathname = usePathname();

  if (forms.length === 0) {
    return null;
  }

  return (
    <div className="scrollbar-hide flex-1 overflow-y-auto pb-4">
      <SidebarSubtitle className="mt-8">설문지 목록</SidebarSubtitle>
      <SidebarGroup>
        {forms.map((form) => (
          <SidebarItem
            key={form.id}
            active={pathname === ROUTE.DASHBOARD.FORM.DETAIL({ id: form.id })}
            render={<Link href={ROUTE.DASHBOARD.FORM.DETAIL({ id: form.id })}>{form.title}</Link>}
          />
        ))}
      </SidebarGroup>
    </div>
  );
};

type SidebarSubtitleProps = React.ComponentPropsWithRef<"span">;

const SidebarSubtitle = ({ className, children, ...props }: SidebarSubtitleProps) => {
  return (
    <span className={cn("text-subtle flex px-3 pb-2 text-[13px]", className)} {...props}>
      {children}
    </span>
  );
};

type SidebarItemProps = useRender.ComponentProps<"button"> & {
  active?: boolean;
};

const SidebarItem = ({ className, render, active = false, ...props }: SidebarItemProps) => {
  const defaultRender = <button />;

  return useRender({
    render: render ?? defaultRender,
    props: {
      className: cn(
        "w-full hover:bg-background-hover-dark flex cursor-pointer items-center gap-2 rounded-sm px-3 py-2 text-sm font-medium transition-colors",
        active && "bg-background-hover-dark",
        className,
      ),
      type: render ? undefined : "button",
      ...props,
    },
  });
};

type SidebarGroupProps = React.ComponentPropsWithRef<"div">;

const SidebarGroup = ({ className, children, ...props }: SidebarGroupProps) => {
  return (
    <div className={cn("flex flex-col gap-0.5", className)} {...props}>
      {children}
    </div>
  );
};
