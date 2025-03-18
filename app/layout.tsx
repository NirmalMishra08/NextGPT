import type { Metadata } from "next";
import { Inder, Inter } from "next/font/google";
import "./globals.css";
import Provider from "./Provider/NextAuthProvider";


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
    <html lang="en">
      <body
        className={`${inter.className}antialiased`}
      >
        <Provider>{children}</Provider>
        
      </body>
    </html>
  );
}
