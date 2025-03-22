import type { Metadata } from "next";
import {  Inter } from "next/font/google";
import "./globals.css";
import Provider from "./Provider/NextAuthProvider";
import { ClerkProvider } from "@clerk/nextjs";
import { AppContextProvider } from "@/context/AppContext";


const inter = Inter({
  variable: "--font-inder",
  subsets: ["latin"],
});

;

export const metadata: Metadata = {
  title: "NextGPT",
  description: "Full stack Project",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ClerkProvider>
      <AppContextProvider>
        <html lang="en">
          <body
            className={`${inter.className} antialiased`}
          >
            <Provider>{children}</Provider>
          </body>
        </html>
      </AppContextProvider>
    </ClerkProvider>
  );
}
