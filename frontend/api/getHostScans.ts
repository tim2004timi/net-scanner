"use server";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

export type Assets = {
  host_scans: {
    domain: string;
    ips: string[];
    ports: number[];
    id: number;
    created_at: string;
    updated_at: string;
  }[];
  totalPages: number;
  currentPage: number;
  total_ips: number;
  total_domains: number;
};

export default async function getHostScans(
  id: string,
  searchParams: {
    pageSize: string;
    page: string;
  },
): Promise<Assets> {
  const bearer = `Bearer ${cookies().get("jwt")?.value}`;
  const { page, pageSize } = searchParams;
  const params = new URLSearchParams({
    page,
    pageSize,
  }).toString();

  const res = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/assets/${id}/host-scans/?${params}`,
    {
      cache: "no-store",
      headers: { Authorization: bearer, "Content-Type": "application/json" },
    },
  );

  if (res.status === 401) {
    redirect("/");
  }

  if (!res.ok) {
    throw new Error("Ошибка получения списка сканов ресурса");
  }

  return res.json();
}
