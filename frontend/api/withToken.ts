"use server";
import { cookies } from "next/headers";

export default async function fetchWithToken(
  url: string,
  options: RequestInit = {},
) {
  let jwt = cookies().get("jwt")?.value;
  const refresh = cookies().get("refresh")?.value;

  options.headers = {
    ...options.headers,
    Authorization: `Bearer ${jwt}`,
    "Content-Type": "application/json",
  };

  let response = await fetch(url, { ...options, cache: "no-store" });

  if (response.status === 401 && refresh) {
    const refreshResponse = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/jwt/refresh/`,
      {
        method: "POST",
        headers: {
          Authorization: `Bearer ${refresh}`,
          "Content-Type": "application/json",
        },
      },
    );

    if (refreshResponse.ok) {
      const refreshData: { access_token: string; refresh_token: string } =
        await refreshResponse.json();
      jwt = refreshData.access_token;
      const refreshToken = refreshData.refresh_token;

      cookies().set("jwt", jwt as string, { maxAge: 86400 });
      cookies().set("refresh", refreshToken, { maxAge: 86400 });

      options.headers = {
        ...options.headers,
        Authorization: `Bearer ${jwt}`,
      };
      response = await fetch(url, { ...options, cache: "no-store" });
    } else {
      throw new Error("Не удалось обновить JWT токен");
    }
  }

  if (!response.ok) {
    throw new Error(`Ошибка при выполнении запроса ${url}`);
  }

  return response;
}
