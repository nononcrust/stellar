"use client";

import { authClient } from "@/lib/auth";
import { ROUTE } from "@/lib/route";
import { ChevronsUpDownIcon, LogOutIcon, SettingsIcon, UserIcon } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { DropdownMenu } from "../ui/dropdown-menu";

export const UserProfile = () => {
  const router = useRouter();

  const onLogout = async () => {
    await authClient.signOut();
    router.push("/login");
  };

  return (
    <DropdownMenu>
      <DropdownMenu.Trigger className="hover:bg-background-hover-dark flex w-full items-center gap-3 rounded-md p-2 transition-colors">
        <div className="flex size-10 shrink-0 items-center justify-center rounded-md bg-gray-200">
          <UserIcon className="size-6 fill-white text-white" />
        </div>
        <div className="flex flex-1 flex-col">
          <p className="line-clamp-1 text-start text-sm font-medium">노논</p>
          <p className="text-sub text-start text-xs">nononcrust@gmail.com</p>
        </div>
        <ChevronsUpDownIcon className="size-4" />
      </DropdownMenu.Trigger>
      <DropdownMenu.Content side="right" align="start">
        <DropdownMenu.Item render={<Link className="ring-0" href={ROUTE.ACCOUNT} />}>
          <SettingsIcon className="size-4" />
          계정 관리
        </DropdownMenu.Item>
        <DropdownMenu.Item onClick={onLogout}>
          <LogOutIcon className="size-4" />
          로그아웃
        </DropdownMenu.Item>
      </DropdownMenu.Content>
    </DropdownMenu>
  );
};
