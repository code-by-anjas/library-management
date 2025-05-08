"use client";

import { ActionSignIn, ActionSignUp } from "../actions";
import { AuthForm } from "../components";
import {
  defaultValueSignIn,
  defaultValueSignUp,
  schemaSignIn,
  schemaSignUp,
} from "../libs";

export const ModulPageAuth = ({ type }: { type: "SIGN_IN" | "SIGN_UP" }) => {
  if (type === "SIGN_IN") {
    return (
      <AuthForm
        type='SIGN_IN'
        schema={schemaSignIn}
        defaultValues={defaultValueSignIn}
        onSubmit={ActionSignIn}
      />
    );
  }

  return (
    <AuthForm
      type='SIGN_UP'
      schema={schemaSignUp}
      defaultValues={defaultValueSignUp}
      onSubmit={ActionSignUp}
    />
  );
};
