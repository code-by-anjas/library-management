"use server";

import { signIn } from "@/auth";
import { db } from "@/database/drizzle";
import { users } from "@/database/schema";
import { hash } from "bcryptjs";
import { eq } from "drizzle-orm";

export const ActionSignUp = async (params: IAuthCredentials) => {
  const { fullName, email, password, universityCard, universityId } = params;

  const existingUser = await db
    .select()
    .from(users)
    .where(eq(users.email, email))
    .limit(1);

  if (existingUser.length !== 0) {
    return {
      success: false,
      message: "User already exist",
    };
  }

  const hashedPassword = await hash(password, 10);

  try {
    await db.insert(users).values({
      fullName,
      email,
      password: hashedPassword,
      universityCard,
      universityId,
    });

    // await signInWithCredentials({ email, password });

    return {
      success: true,
    };
  } catch (error) {
    console.log("SignUp is error");

    return {
      success: false,
      message: "Failed to create new user",
    };
  }
};

export const ActionSignIn = async (
  params: Pick<IAuthCredentials, "email" | "password">
) => {
  const { email, password } = params;

  try {
    const result = await signIn("credentials", {
      email,
      password,
      redirect: false,
    });

    if (result?.error) {
      return {
        success: false,
        message: result.error,
      };
    }

    return { success: true };
  } catch (error) {
    console.log("sign in error");
    return {
      success: false,
      message: "Error for sign in",
    };
  }
};
