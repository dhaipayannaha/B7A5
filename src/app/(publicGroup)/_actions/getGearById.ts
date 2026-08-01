"use server";

import { cookies } from "next/headers";
import { Equipment } from "@/lib/types";

export const getGearById = async (id: string): Promise<{ success: boolean; data?: Equipment; message?: string }> => {
    const cookieStore = await cookies();
    const accessToken = cookieStore.get("accessToken")?.value;

    const headers: Record<string, string> = {};
    if (accessToken) {
        headers["Cookie"] = `accessToken=${accessToken}`;
    }

    const res = await fetch(`${process.env.BACKEND_API_URL}/api/gear/${id}`, {
        headers,
        cache: "no-store",
    });

    const result = await res.json();
    return result;
};
