import { auth } from "@/auth";
import { Header } from "@/components";
import { redirect } from "next/navigation";
import { ReactNode } from "react";

const Layout = async ({ children }: { children: ReactNode }) => {
  const session = await auth();

  if (!session) redirect("/sign-in");

  return (
    <main className='root-container'>
      <div className='mx-auto max-w-7xl'>
        <Header />
        <div className='mt-20 pb-20'>{children}</div>
      </div>
    </main>
  );
};

export default Layout;
