import { signOut } from "@/auth";
import { Button } from "@/components/ui/button";
import { SAMPLE_BOOKS } from "@/constants";
import { BookList } from "@/modules/homepage/components";

export const ModulPageMyProfile = () => {
  return (
    <>
      <form
        action={async () => {
          "use server";

          await signOut();
        }}
        className='mb-10'
      >
        <Button>Logout</Button>
      </form>

      <BookList title='Borrowed Books' books={SAMPLE_BOOKS} />
    </>
  );
};
