"use server";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

export type Assets = {
  cves: {
    name: string;
    severity: number;
    title: string;
    exploit: boolean;
    status: string;
    description: string;
    ip: string;
    service: string;
    port: number;
    ai_answer: string;
    id: number;
  }[];
  total_pages: number;
  current_page: number;
};

export default async function getCves(
  scanId: string,
  searchParams: {
    pageSize: string;
    page: string;
  },
): Promise<Assets> {
  const bearer = `Bearer ${cookies().get("jwt")?.value}`;
  const { page, pageSize } = searchParams;
  const params = new URLSearchParams({
    page_number: page,
    page_size: pageSize,
  }).toString();

  const res = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/vulnerability-scans/${scanId}/cves/?${params}`,
    {
      cache: "no-store",
      headers: { Authorization: bearer, "Content-Type": "application/json" },
    },
  );

  if (res.status === 401) {
    redirect("/");
  }

  if (!res.ok) {
    throw new Error("Ошибка получения списка cve");
  }

  return res.json();
}
