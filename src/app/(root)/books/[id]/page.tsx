import { ModulePageBooks } from "@/modules/books/page";

const BookPage = async ({ params }: { params: Promise<{ id: string }> }) => {
  const id = (await params).id;

  return <ModulePageBooks id={id} />;
};

export default BookPage;
