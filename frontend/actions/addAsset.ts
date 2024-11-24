"use server";

import { revalidatePath } from "next/cache";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

export default async function addAsset(formData: FormData) {
  const bearer = `Bearer ${cookies().get("jwt")?.value}`;

  const bodyObj = {
    name: formData.get("groupName"),
    type: "Внешний",
    targets: (formData.get("resourceList") as string)
      .split("\n")
      .map((line) => line.replace("\r", "").trim()),
    frequency: formData.get("times"),
    tg_alerts: formData.get("tgAlerts") === "on",
  };

  const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/assets/`, {
    method: "POST",
    body: JSON.stringify(bodyObj),
    headers: {
      "Content-Type": "application/json",
      Authorization: bearer,
    },
  });

  if (res.status === 401) {
    redirect("/");
  }

  if (!res.ok) {
    throw new Error("Ошибка добавления ресурса");
  }
  revalidatePath("/resources");
}
