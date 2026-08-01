"use server";

import { cookies } from "next/headers";

export const getMyRentals = async () => {
    const cookieStore = await cookies();
    const accessToken = cookieStore.get("accessToken")?.value;

    if (!accessToken) {
        return { success: false, message: "Unauthorized", data: [] };
    }

    try {
        // Try standard endpoints for fetching a user's rentals
        const res = await fetch(`${process.env.BACKEND_API_URL}/api/rentals/me`, {
            headers: {
                Cookie: `accessToken=${accessToken}`,
            },
            next: { revalidate: 0 }, // always fresh
        });

        if (!res.ok) {
            // fallback if endpoint is different
            const fallbackRes = await fetch(`${process.env.BACKEND_API_URL}/api/rentals`, {
                headers: {
                    Cookie: `accessToken=${accessToken}`,
                },
                next: { revalidate: 0 },
            });
            const fallbackResult = await fallbackRes.json();
            return fallbackResult;
        }

        const result = await res.json();
        return result;
    } catch (error) {
        console.error("[getMyRentals] Error:", error);
        return { success: false, message: "Failed to fetch rentals", data: [] };
    }
};
