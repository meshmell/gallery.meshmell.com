"use client";
import { ThemeProvider } from "next-themes";
import { FC, PropsWithChildren } from "react";

export const ThemeProviders: FC<PropsWithChildren> = ({ children }) => {
  return <ThemeProvider attribute="class">{children}</ThemeProvider>;
};
