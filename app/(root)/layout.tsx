import StreamVideoProvider from "@/providers/StreamClientProvider";
import React, { ReactNode } from "react";
import { Metadata } from "next";
export const metadata: Metadata = {
  title: "Video-Calling-App",
  description: "Video-Calling-App",
  icons:{
    icon:'/icons/logo.svg'
  }
};
const RootLayout = ({ children }: { children: ReactNode }) => {
  return (
    <main>
      <StreamVideoProvider>{children}</StreamVideoProvider>
    </main>
  );
};

export default RootLayout;
