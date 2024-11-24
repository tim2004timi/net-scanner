"use server";

import { revalidatePath } from "next/cache";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

export default async function deleteAsset(id: string | number) {
  const bearer = `Bearer ${cookies().get("jwt")?.value}`;

  const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/assets/${id}/`, {
    method: "DELETE",
    headers: {
      Authorization: bearer,
    },
  });

  if (res.status === 401) {
    redirect("/");
  }

  if (!res.ok) {
    throw new Error("Ошибка удаления ресурса");
  }
  revalidatePath("/resources");
}
