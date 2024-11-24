"use server";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

export default async function getAiResponse(id: number): Promise<string> {
  const bearer = `Bearer ${cookies().get("jwt")?.value}`;

  const res = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/vulnerability-scans/${id}/ai/`,
    {
      cache: "no-store",
      headers: { Authorization: bearer, "Content-Type": "application/json" },
    },
  );

  if (res.status === 401) {
    redirect("/");
  }

  if (!res.ok) {
    throw new Error("Ошибка получения AI ответа");
  }

  return res.json();
}
