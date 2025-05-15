"use server";

import { signOut } from "@/auth";

export const ActionLogout = async () => {
  await signOut();
};
