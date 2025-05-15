import { BookCard } from "./book-card";

interface BookListProps {
  title: string;
  books: IBookDetail[];
  containerClassName?: string;
}

export const BookList = ({
  title,
  books,
  containerClassName,
}: BookListProps) => {
  if (books.length < 0) return;

  return (
    <section className={containerClassName}>
      <h2 className='font-bebas-neue text-4xl text-light-100'>{title}</h2>

      <ul className='book-list'>
        {books.map((book) => (
          <BookCard key={book.id} {...book} />
        ))}
      </ul>
    </section>
  );
};
