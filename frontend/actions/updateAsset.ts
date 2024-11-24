"use server";

import { revalidatePath } from "next/cache";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

export default async function updateAsset(formData: FormData) {
  const bearer = `Bearer ${cookies().get("jwt")?.value}`;

  const bodyObj = formData.get("onlyRefresh")
    ? {}
    : {
        name: formData.get("groupName"),
        type: "Внешний",
        targets: (formData.get("resourceList") as string)
          .split("\n")
          .map((line) => line.replace("\r", "").trim()),
        frequency: formData.get("times"),
        tg_alerts: formData.get("tgAlerts") === "on",
      };

  console.log(bodyObj);
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/assets/${formData.get("id")}/`,
    {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        Authorization: bearer,
      },
      body: JSON.stringify(bodyObj),
    },
  );

  if (res.status === 401) {
    redirect("/");
  }

  if (!res.ok) {
    throw new Error("Ошибка изменения ресурса");
  }
  revalidatePath("/resources");
}
