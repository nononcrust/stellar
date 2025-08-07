"use client";

import { ThemeProvider as NextThemeProvider, ThemeProviderProps } from "next-themes";

export const ThemeProvider = ({ children }: ThemeProviderProps) => {
  return (
    <NextThemeProvider
      attribute="class"
      defaultTheme="light"
      enableSystem
      disableTransitionOnChange
    >
      {children}
    </NextThemeProvider>
  );
};
