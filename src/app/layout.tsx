import { Toaster } from "@/components/ui/toaster";
import type { Metadata } from "next";
import { Bebas_Neue, IBM_Plex_Sans } from "next/font/google";
import { ReactNode } from "react";
import "./styles/globals.css";

import { auth } from "@/auth";
import { db } from "@/database/drizzle";
import { users } from "@/database/schema";
import { eq } from "drizzle-orm";
import { SessionProvider } from "next-auth/react";
import { after } from "next/server";

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

  // ini untuk mengupdate kapan terakhir kali user mengunjungi website kita
  after(async () => {
    if (!session?.user?.id) return;

    // get user and see the lastActivity is today
    const user = await db
      .select()
      .from(users)
      .where(eq(users.id, session.user.id))
      .limit(1);

    // kalo data di db lastactivitinya hari ini, jangan di update
    if (user[0].lastActivityDate === new Date().toISOString().slice(0, 10))
      return;

    await db
      .update(users)
      .set({
        lastActivityDate: new Date().toISOString().slice(0, 10),
      })
      .where(eq(users.id, session.user.id));
  });

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
