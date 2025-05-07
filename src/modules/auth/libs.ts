import { z } from "zod";

export const schemaSignUp = z.object({
  fullName: z.string().min(1),
  email: z.string().email(),
  universityId: z.coerce.number(),
  universityCard: z.string().nonempty("University Card is required"),
  password: z.string().min(8),
});

export const schemaSignIn = z.object({
  email: z.string().email(),
  password: z.string().min(8),
});

export const defaultValueSignUp = {
  fullName: "",
  email: "",
  password: "",
  universityId: 0,
  universityCard: "",
};

export const defaultValueSignIn = {
  email: "",
  password: "",
};
