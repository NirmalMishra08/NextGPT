import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import "./Prism.css";
import Provider from "./Provider/NextAuthProvider";
import { Toaster } from "react-hot-toast"

const inter = Inter({
  variable: "--font-inder",
  subsets: ["latin"],
});

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
      <body className={`${inter.className} antialiased`}>
        <Provider>
          <Toaster
            toastOptions={{
              success: { style: { background: "black", color: "white" } },
              error: { style: { background: "white", color: "black" } }
            }}
          />
          {children}
        </Provider>
      </body>
    </html>
  );
}
