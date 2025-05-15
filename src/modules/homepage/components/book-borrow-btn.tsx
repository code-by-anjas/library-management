"use client";

import { ActionBorrowBook } from "@/actions";
import { Button } from "@/components/ui/button";
import { toast } from "@/hooks";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useState } from "react";

interface Props {
  bookId: string;
  userId: string;
  borrowEligibelity: {
    isEligible: boolean;
    message: string;
  };
}

export const BorrowButton = ({
  bookId,
  userId,
  borrowEligibelity: { isEligible, message },
}: Props) => {
  const router = useRouter();
  const [borrowing, setBorrowing] = useState<boolean>(false);

  const handleBorrow = async () => {
    if (!isEligible) {
      toast({
        title: "Error",
        description: message,
        variant: "destructive",
      });
    }

    setBorrowing(true);

    try {
      const result = await ActionBorrowBook({
        bookId,
        userId,
      });

      if (result.success) {
        toast({
          title: "Success",
          description: result.message,
        });

        router.push("/my-profile");
      } else {
        toast({
          title: "Error",
          description: result.message,
          variant: "destructive",
        });
      }
    } catch (error) {
      console.log(error);

      toast({
        title: "Error",
        description: "An erroo occurred while borrowing the book",
        variant: "destructive",
      });
    } finally {
      setBorrowing(false);
    }
  };

  return (
    <Button
      className='book-overview_btn'
      onClick={handleBorrow}
      disabled={borrowing}
    >
      <Image src='/icons/book.svg' alt='book' width={20} height={20} />
      <p className='font-bebas-neue text-xl text-dark-100'>
        {borrowing ? "BOROWING..." : "BORROW BOOK"}
      </p>
    </Button>
  );
};
