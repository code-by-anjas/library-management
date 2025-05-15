import { ModalProvider } from "@/contexts";
import { ModalAddBook } from "../components";

export const ModulePageAdminBooks = () => {
  return (
    <section className='w-full rounded-2xl bg-white p-7'>
      <div className='flex flex-wrap items-center justify-between gap-2'>
        <h2 className='text-xl font-semibold'>All Books</h2>
        <ModalProvider>
          <ModalAddBook />
        </ModalProvider>
      </div>

      <div className='mt-7 w-full overflow-hidden'>
        <p>Table</p>
      </div>
    </section>
  );
};
