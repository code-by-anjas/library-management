import { ActionLogout } from "@/actions";
import Image from "next/image";
import Link from "next/link";
import { Button } from "./ui/button";

export const Header = async () => {
  return (
    <header className='my-10 flex justify-between gap-5'>
      <Link href='/'>
        <Image src='/icons/logo.svg' alt='logo' height={40} width={40} />
      </Link>

      <ul className='flex flex-row items-center gap-8'>
        <li>
          {/* <Link href='/my-profile' className='flex items-center gap-1.5'>
            <Avatar className='size-8'>
              <AvatarFallback className='bg-light-100 font-bold text-dark-500'>
                {getInitials(session?.user?.name || "IN")}
              </AvatarFallback>
            </Avatar>

            <p className='font-ibm-plex-sans text-base font-semibold text-white'>
              {session.user?.name}
            </p>
          </Link> */}
          <form action={ActionLogout} className='mb-10'>
            <Button>Logout</Button>
          </form>
        </li>
      </ul>
    </header>
  );
};
