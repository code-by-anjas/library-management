"use client";

import { cn } from "@/lib/utils";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";

export const Header = () => {
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
      </ul>
    </header>
  );
};
