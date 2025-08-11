"use client";

import Form from "./Form";
import { useLogin } from "@/hooks";
export default function LoginForm() {
  const { email, password, isLoading, onChange, onSubmit } = useLogin();
  const config = [
    {
      labelText: "Email address",
      labelId: "email",
      type: "email",
      value: email,
      required: true,
      autocomplete: "off",
    },
    {
      labelText: "Password",
      labelId: "password",
      type: "password",
      value: password,
      required: true,
      autocomplete: "off",
      link: {
        linkText: "Forgot password?",
        linkUrl: "/password-reset",
      },
    },
  ];

  return (
    <Form
      config={config}
      isLoading={isLoading}
      btnText="Sign in"
      onChange={onChange}
      onSubmit={onSubmit}
    />
  );
}
