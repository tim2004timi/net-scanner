"use server";

// import { Assets } from "@/api/getAssets";
import { revalidatePath, revalidateTag } from "next/cache";

const refreshAssets = async () => {
  // const interval = setInterval(() => {
  //   revalidatePath("/resources");
  //   console.log("biba");
  // }, 5000);

  // if (assets.assets.every((asset) => asset.status !== "В процессе")) {
  //   clearInterval(interval);
  // }
  revalidateTag("resources");
  // revalidatePath("/resources");
};

export default refreshAssets;
