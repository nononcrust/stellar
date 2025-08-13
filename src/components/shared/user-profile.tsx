"use client";

import { authClient } from "@/lib/auth";
import { ROUTE } from "@/lib/route";
import { LogOutIcon, SettingsIcon } from "lucide-react";
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
      <DropdownMenu.Trigger render={<button className="size-10 rounded-full bg-gray-100" />} />
      <DropdownMenu.Content align="end">
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
