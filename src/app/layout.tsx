import { Toaster } from "@/components/ui/toaster";
import type { Metadata } from "next";
import { Bebas_Neue, IBM_Plex_Sans } from "next/font/google";
import { ReactNode } from "react";
import "./globals.css";

import { auth } from "@/auth";
import { SessionProvider } from "next-auth/react";

const IBMPlexSans = IBM_Plex_Sans({
  variable: "--font-ibm-plex-sans",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  style: "normal",
});

const bebasNeue = Bebas_Neue({
  variable: "--font-bebas-neue",
  subsets: ["latin"],
  weight: ["400"],
  style: "normal",
});

export const metadata: Metadata = {
  title: "BookWise",
  description: "BookWise is a book library management solutions",
};

const RootLayout = async ({ children }: { children: ReactNode }) => {
  const session = await auth();
  return (
    <html lang='en'>
      <SessionProvider session={session}>
        <body
          className={`${IBMPlexSans.variable} ${bebasNeue.variable} antialiased`}
        >
          {children}
          <Toaster />
        </body>
      </SessionProvider>
    </html>
  );
};

export default RootLayout;
