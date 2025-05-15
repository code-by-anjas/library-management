"use client";

import { ColorPicker, FileUploader } from "@/components";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useModal } from "@/contexts";
import { toast } from "@/hooks";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { ActionAddBook } from "../actions";
import { defaultValueBook, schemaBook } from "../shcema";

interface BookFormProps extends Partial<IBookDetail> {
  modalId: string;
  type?: "CREATE" | "UPDATE";
}

export const BookForm = ({ modalId }: BookFormProps) => {
  const { toggleOpen } = useModal();

  const router = useRouter();

  const form = useForm<z.infer<typeof schemaBook>>({
    resolver: zodResolver(schemaBook),
    defaultValues: defaultValueBook,
  });

  const handleSubmit = async (values: z.infer<typeof schemaBook>) => {
    const result = await ActionAddBook(values);

    if (result.success) {
      toast({
        title: "Success",
        description: result.message,
      });

      router.push(`/admin/books/${result.data.id}`);
    } else {
      toast({
        title: "Error",
        description: result.message,
        variant: "destructive",
      });
    }
  };

  return (
    <div className='flex flex-col gap-4'>
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(handleSubmit)}
          className='max-h-[70vh] space-y-4 overflow-auto px-2'
        >
          <FormField
            control={form.control}
            name='title'
            render={({ field }) => (
              <FormItem className='flex flex-col gap-1'>
                <FormLabel className='text-base font-normal text-dark-500'>
                  Book Title
                </FormLabel>
                <FormControl>
                  <Input
                    required
                    placeholder='Book title'
                    {...field}
                    className='book-form_input'
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name='author'
            render={({ field }) => (
              <FormItem className='flex flex-col gap-1'>
                <FormLabel className='text-base font-normal text-dark-500'>
                  Author
                </FormLabel>
                <FormControl>
                  <Input
                    required
                    placeholder='Book author'
                    {...field}
                    className='book-form_input'
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name='genre'
            render={({ field }) => (
              <FormItem className='flex flex-col gap-1'>
                <FormLabel className='text-base font-normal text-dark-500'>
                  Genre
                </FormLabel>
                <FormControl>
                  <Input
                    required
                    placeholder='Book genre'
                    {...field}
                    className='book-form_input'
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name='rating'
            render={({ field }) => (
              <FormItem className='flex flex-col gap-1'>
                <FormLabel className='text-base font-normal text-dark-500'>
                  Book Rating
                </FormLabel>
                <FormControl>
                  <Input
                    required
                    type='number'
                    min={1}
                    max={5}
                    placeholder='Book rating'
                    {...field}
                    className='book-form_input'
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name='totalCopies'
            render={({ field }) => (
              <FormItem className='flex flex-col gap-1'>
                <FormLabel className='text-base font-normal text-dark-500'>
                  Total Copies
                </FormLabel>
                <FormControl>
                  <Input
                    required
                    type='number'
                    min={0}
                    max={1000}
                    placeholder='Total copies'
                    {...field}
                    className='book-form_input'
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name='coverUrl'
            render={({ field }) => (
              <FormItem className='flex flex-col gap-1'>
                <FormLabel className='text-base font-normal text-dark-500'>
                  Book Cover
                </FormLabel>
                <FormControl>
                  <FileUploader
                    type='IMAGE'
                    accept='image/*'
                    placeholder='Upload a book cover'
                    folder='books/covers'
                    variant='light'
                    onFileChange={field.onChange}
                    value={field.value}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name='coverColor'
            render={({ field }) => (
              <FormItem className='flex flex-col gap-1'>
                <FormLabel className='text-base font-normal text-dark-500'>
                  Cover Color
                </FormLabel>
                <FormControl>
                  <ColorPicker
                    value={field.value}
                    onPickerChange={field.onChange}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name='description'
            render={({ field }) => (
              <FormItem className='flex flex-col gap-1'>
                <FormLabel className='text-base font-normal text-dark-500'>
                  Description
                </FormLabel>
                <FormControl>
                  <Textarea
                    placeholder='Book description'
                    {...field}
                    rows={10}
                    className='book-form_input'
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name='videoUrl'
            render={({ field }) => (
              <FormItem className='flex flex-col gap-1'>
                <FormLabel className='text-base font-normal text-dark-500'>
                  Book Trailer
                </FormLabel>
                <FormControl>
                  <FileUploader
                    type='VIDEO'
                    accept='video/*'
                    placeholder='Upload a book trailer'
                    folder='books/videos'
                    variant='light'
                    onFileChange={field.onChange}
                    value={field.value}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name='summary'
            render={({ field }) => (
              <FormItem className='flex flex-col gap-1'>
                <FormLabel className='text-base font-normal text-dark-500'>
                  Book Summary
                </FormLabel>
                <FormControl>
                  <Textarea
                    placeholder='Book summary'
                    {...field}
                    rows={5}
                    className='book-form_input'
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <div className='flex w-full gap-5'>
            <Button
              type='reset'
              className='book-form_btn_cancel'
              onClick={() => toggleOpen(modalId)}
            >
              Cancel
            </Button>

            <Button type='submit' className='book-form_btn text-light-100'>
              Add Book to Library
            </Button>
          </div>
        </form>
      </Form>
    </div>
  );
};
