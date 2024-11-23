"use server";

export async function loginFirstStep(prevData: unknown, formData: FormData) {
  const bodyObj = {
    username: formData.get("username") as string,
    password: formData.get("password"),
  };

  const res = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/jwt/login-1-step/`,
    {
      method: "POST",
      body: JSON.stringify(bodyObj),
      headers: {
        "Content-Type": "application/json",
      },
    },
  );

  if (!res.ok) {
    return {
      message: "Что-то пошло не так",
      done: "",
      login: "",
    };
  }

  return {
    message: "",
    done: "2FA код отправлен через Telegram",
    login: bodyObj.username,
  };
}
