"use server";

import { revalidateTag } from "next/cache";

const refreshAssets = async () => {
  revalidateTag("resources");
};

export default refreshAssets;
