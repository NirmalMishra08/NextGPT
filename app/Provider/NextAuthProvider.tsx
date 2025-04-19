"use client";

import { SessionProvider } from "next-auth/react";
import { ReactNode } from "react";

import { UserProvider } from "../Context/UserContext";

interface ProviderProps {
  children: ReactNode;

}

export default function Provider({ children }: ProviderProps) {

  return <SessionProvider><UserProvider>{children}</UserProvider></SessionProvider>
}
