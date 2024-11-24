"use server";

import { revalidatePath } from "next/cache";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

export default async function addVulnerabilityScan(id: number) {
  const bearer = `Bearer ${cookies().get("jwt")?.value}`;

  const res = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/vulnerability-scans/?asset_id=${id}`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: bearer,
      },
    },
  );

  if (res.status === 401) {
    redirect("/");
  }

  if (!res.ok) {
    throw new Error("Ошибка добавления сканирования уязвимостей");
  }
  revalidatePath("/scans");
  redirect("/scans");
}
