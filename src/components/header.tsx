"use client";

import { cn, getInitials } from "@/lib/utils";
import { Session } from "next-auth";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Avatar, AvatarFallback } from "./ui/avatar";

export const Header = ({ session }: { session: Session }) => {
  const pathname = usePathname();

  return (
    <header className='my-10 flex justify-between gap-5'>
      <Link href='/'>
        <Image src='/icons/logo.svg' alt='logo' height={40} width={40} />
      </Link>

      <ul className='flex flex-row items-center gap-8'>
        <li>
          <Link
            href='/library'
            className={cn(
              "text-base cursor-pointer capitalize text-light-100",
              {
                "text-light-200": pathname === "/library",
              }
            )}
          >
            Library
          </Link>
        </li>

        <li>
          <Link href='/my-profile' className='flex items-center gap-1.5'>
            <Avatar className='size-8'>
              <AvatarFallback className='bg-light-100 font-bold text-dark-500'>
                {getInitials(session?.user?.name || "IN")}
              </AvatarFallback>
            </Avatar>

            <p className='font-ibm-plex-sans text-base font-semibold text-white'>
              {session.user?.name}
            </p>
          </Link>
        </li>
      </ul>
    </header>
  );
};
