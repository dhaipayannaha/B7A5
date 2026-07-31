"use server";

import { cookies } from "next/headers";

export const getAllRentals = async () => {
    const cookieStore = await cookies();
    const accessToken = cookieStore.get("accessToken")?.value;

    if (!accessToken) {
        return {
            success: false,
            message: "You are not authorized to access this resource",
            data: [],
        };
    }

    try {
        const res = await fetch(`${process.env.BACKEND_API_URL}/api/admin/rentals`, {
            method: "GET",
            headers: {
                Cookie: `accessToken=${accessToken}`,
            },
            cache: "no-store",
        });

        const result = await res.json();
        return result;
    } catch (error) {
        return {
            success: false,
            message: "Something went wrong while fetching rentals",
            data: [],
        };
    }
};
