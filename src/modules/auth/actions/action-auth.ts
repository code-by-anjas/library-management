"use server";

import { signIn } from "@/auth";
import { db } from "@/database/drizzle";
import { users } from "@/database/schema";
import config from "@/lib/config";
import ratelimit from "@/lib/ratelimit";
import { workflowClient } from "@/lib/workflow";
import { hash } from "bcryptjs";
import { eq } from "drizzle-orm";
import { headers } from "next/headers";
import { redirect } from "next/navigation";

export const ActionSignUp = async (params: IAuthCredentials) => {
  const { fullName, email, password, universityCard, universityId } = params;

  // ini untuk membatasi user pada tiap ip melakukan request
  const ip = (await headers()).get("x-forwarded-for") || "127.0.0.1";
  const { success } = await ratelimit.limit(ip);

  if (!success) return redirect("/too-fast");

  const existingUser = await db
    .select()
    .from(users)
    .where(eq(users.email, email))
    .limit(1);

  if (existingUser.length > 0) {
    return { success: false, error: "User already exists" };
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

    // trigger untuk ngirim email pertama
    await workflowClient.trigger({
      url: `${config.env.prodApiEndpoint}/api/workflows/onboarding`,
      body: {
        email,
        fullName,
      },
    });

    return {
      success: true,
    };
  } catch (error) {
    console.log(`signUp error: ${error}`);

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

  const ip = (await headers()).get("x-forwarded-for") || "127.0.0.1";
  const { success } = await ratelimit.limit(ip);

  if (!success) return redirect("/too-fast");

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
    console.log(`sign in error: ${error}`);
    return {
      success: false,
      message: "Error for sign in",
    };
  }
};
