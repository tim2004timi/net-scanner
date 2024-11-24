"use server";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

export async function refresh() {
  const bearerRefresh = `Bearer ${cookies().get("refresh")?.value}`;

  const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/jwt/refresh/`, {
    method: "POST",
    headers: {
      Authorization: bearerRefresh,
      "Content-Type": "application/json",
    },
  });

  if (res.status === 401) {
    cookies().delete("jwt");
    cookies().delete("refresh");
    redirect("/");
  }

  if (!res.ok) {
    throw new Error("Что-то пошло не так");
  }

  const json = (await res.json()) as {
    access_token: string;
    refresh_token: string;
  };

  cookies().set("jwt", json.access_token, { maxAge: 86400 });
  cookies().set("refresh", json.refresh_token, { maxAge: 86400 });
  return true;
}
