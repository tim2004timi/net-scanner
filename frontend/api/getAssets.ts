"use server";
import { cookies } from "next/headers";
// import fetchWithToken from "./withToken";
import { redirect } from "next/navigation";
// import { refresh } from "../actions/refresh";

export type Assets = {
  assets: {
    name: string;
    type: string;
    targets: string[];
    frequency: string;
    tg_alerts: boolean;
    id: number;
    status: string;
    created_at: string;
    updated_at: string;
    start_host_scan_at: string;
    end_host_scan_at: string;
    duration: string;
  }[];
  total_pages: number;
  current_page: number;
};

export default async function getAssets(searchParams: {
  pageSize: string;
  page: string;
}): Promise<Assets> {
  const bearer = `Bearer ${cookies().get("jwt")?.value}`;
  const { page, pageSize } = searchParams;
  const params = new URLSearchParams({
    page_number: page,
    page_size: pageSize,
  }).toString();

  const res = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/assets/?${params}`,
    {
      cache: "no-store",
      headers: { Authorization: bearer, "Content-Type": "application/json" },
      next: { tags: ["resources"] },
    },
  );

  if (res.status === 401) {
    // const result = await refresh();
    // if (result) {
    //   const data = await getAssets(searchParams);
    //   return data;
    // }
    redirect("/");
  }

  if (!res.ok) {
    throw new Error("Ошибка получения списка Ресурсов");
  }

  return res.json();
}
