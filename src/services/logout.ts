"use server"

import { revalidateTag } from "next/cache";
import { cookies } from "next/headers"

export const logout = async () => {
    const coockieStore = await cookies();

    coockieStore.delete("accessToken");
    coockieStore.delete("refreshToken");

    revalidateTag("my-profile", "max");
}