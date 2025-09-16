"use client";

import { createAuthClient } from "better-auth/react";
import { createContextFactory } from "./context";

export const authClient = createAuthClient();

type SessionContextValue = {
  session: NonNullable<ReturnType<typeof authClient.useSession>["data"]>;
};

const [SessionContext, useSessionContext] = createContextFactory<SessionContextValue>("Session");

export const SessionProvider = ({ children }: { children: React.ReactNode }) => {
  const { data: session } = authClient.useSession();

  if (session === null) return null;

  return <SessionContext value={{ session }}>{children}</SessionContext>;
};

export const useSession = () => {
  const { session } = useSessionContext();

  return { session };
};
