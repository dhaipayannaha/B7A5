"use server";

import { cookies } from "next/headers";

export const getLoggedIn = async () => {
    const cookieStore = await cookies();
    const accessToken = cookieStore.get("accessToken")?.value;

    if (!accessToken) {
        return { success: false, message: "You are not authorized to access this resource" };
    }
    return { success: true };
};