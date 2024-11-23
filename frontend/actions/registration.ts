"use server";

export async function registration(prevData: unknown, formData: FormData) {
  const bodyObj = {
    username: formData.get("username"),
    password: formData.get("password"),
  };

  if (formData.get("passwordSubmit") !== bodyObj.password) {
    return {
      message: "Пароли не совпадают",
      url: "",
    };
  }

  const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/jwt/register/`, {
    method: "POST",
    body: JSON.stringify(bodyObj),
    headers: {
      "Content-Type": "application/json",
    },
  });

  if (!res.ok) {
    return {
      message: "Что-то пошло не так",
      url: "",
    };
  }

  const json = (await res.json()) as { url: string };
  return { ...json, message: "" };
}
