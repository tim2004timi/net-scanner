"use server";

import { cookies } from "next/headers";
import { redirect } from "next/navigation";

export async function loginSecondStep(prevData: unknown, formData: FormData) {
  const bodyObj = {
    username: formData.get("username"),
    code: formData.get("code"),
  };

  const res = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/jwt/login-2-step/`,
    {
      method: "POST",
      body: JSON.stringify(bodyObj),
      headers: {
        "Content-Type": "application/json",
      },
    },
  );

  if (!res.ok) {
    return {
      message: "Что-то пошло не так",
    };
  }

  const json = (await res.json()) as {
    access_token: string;
    refresh_token: string;
  };

  cookies().set("jwt", json.access_token, { maxAge: 86400 });
  redirect("/resources");
}
