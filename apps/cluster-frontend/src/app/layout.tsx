"use client";

import { Drawer } from "@/app/(main)/_components/Drawer";
import { store } from "@/redux/store";
import { Nunito } from "next/font/google";
import { Provider } from "react-redux";
import { Toaster } from "sonner";
import "./globals.css";

const nunito = Nunito({
  subsets: ["latin"],
  weight: [
    "200",
    "300",
    "400",
    "400",
    "500",
    "600",
    "700",
    "800",
    "900",
    "1000",
  ],
  variable: "--font-nunito",
});

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${nunito.className}`}>
        <Provider store={store}>
          <Toaster />
          <div className="flex w-full h-full">
            <Drawer />
            <div className="pt-[3px] pl-[5px] pr-[7px] flex flex-1">
              <div className="border-[#283038] bg-[#1B222B] flex-1">
                {children}
              </div>
            </div>
          </div>
        </Provider>
      </body>
    </html>
  );
}
