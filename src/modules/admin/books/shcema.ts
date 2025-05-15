import { z } from "zod";

export const schemaBook = z.object({
  title: z.string().trim().min(2).max(100),
  author: z.string().trim().min(2).max(100),
  genre: z.string().trim().min(2).max(50),
  rating: z.coerce.number().min(1).max(5),
  totalCopies: z.coerce.number().int().positive().lte(1000),
  description: z.string().trim().min(2).max(1000),
  coverUrl: z.string().nonempty(),
  coverColor: z
    .string()
    .trim()
    .regex(/^#[0-9A-F]{6}$/i),
  videoUrl: z.string().nonempty(),
  summary: z.string().trim().min(1),
});

export const defaultValueBook = {
  title: "",
  author: "",
  genre: "",
  rating: 1,
  totalCopies: 1,
  description: "",
  coverUrl: "",
  coverColor: "#FFFFFF",
  videoUrl: "",
  summary: "",
};
