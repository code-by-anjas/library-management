"use client";

import { FileUploader } from "@/components";
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
import { FIELD_NAMES, FILED_TYPES } from "@/constants";
import { toast } from "@/hooks";
import { zodResolver } from "@hookform/resolvers/zod";
import Link from "next/link";
import { useRouter } from "next/navigation";
import {
  DefaultValues,
  FieldValues,
  Path,
  SubmitHandler,
  useForm,
  UseFormReturn,
} from "react-hook-form";
import { ZodType } from "zod";

interface AuthFormProps<T extends FieldValues> {
  schema: ZodType<T>;
  defaultValues: T;
  onSubmit: (data: T) => Promise<{ success: boolean; error?: string }>;
  type: "SIGN_IN" | "SIGN_UP";
}

export const AuthForm = <T extends FieldValues>({
  type,
  schema,
  defaultValues,
  onSubmit,
}: AuthFormProps<T>) => {
  const router = useRouter();
  const isSignIn = type === "SIGN_IN";

  const form: UseFormReturn<T> = useForm({
    resolver: zodResolver(schema),
    defaultValues: defaultValues as DefaultValues<T>,
  });

  const handleSubmit: SubmitHandler<T> = async (data) => {
    const result = await onSubmit(data);

    if (result.success) {
      toast({
        title: "Success",
        description: isSignIn
          ? "You have successfully sign in"
          : "You have successfully sign up",
      });

      router.push("/");
    } else {
      toast({
        title: `Error ${isSignIn ? "signin in" : "signin Up"}`,
        description: result.error,
        variant: "destructive",
      });
    }
  };

  return (
    <div className='flex flex-col gap-4'>
      <h1 className='text-2xl font-semibold text-white'>
        {isSignIn ? "Welcom back to BookWise" : "Create your library account"}
      </h1>

      <p className='text-light-100'>
        {isSignIn
          ? "Access the cast collection of resources"
          : "Please complate all fields and upload a valid university ID to gain access to the library"}
      </p>

      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(handleSubmit)}
          className='w-full space-y-6'
        >
          {Object.keys(defaultValues).map((field) => (
            <FormField
              key={field}
              control={form.control}
              name={field as Path<T>}
              render={({ field }) => (
                <FormItem>
                  <FormLabel className='capitalize'>
                    {FIELD_NAMES[field.name as keyof typeof FIELD_NAMES]}
                  </FormLabel>
                  <FormControl>
                    {field.name === "universityCard" ? (
                      <FileUploader
                        type='IMAGE'
                        accept='image/*'
                        placeholder='Upload your ID'
                        folder='ids'
                        variant='dark'
                        onFileChange={field.onChange}
                      />
                    ) : (
                      <Input
                        required
                        type={
                          FILED_TYPES[field.name as keyof typeof FILED_TYPES]
                        }
                        {...field}
                        className='form-input'
                      />
                    )}
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          ))}
          <Button type='submit' className='form-btn'>
            {isSignIn ? "Sign In" : "Sign Up"}
          </Button>
        </form>
      </Form>

      <p className='text-center text-base font-medium'>
        {isSignIn ? "New to BookWise " : "Already have an account "}

        <Link
          href={isSignIn ? "/sign-up" : "/sign-in"}
          className='font-bold text-primary'
        >
          {isSignIn ? "Create an account" : "Sign In"}
        </Link>
      </p>
    </div>
  );
};
