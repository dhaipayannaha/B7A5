// app/(dashboardGroup)/_actions/getAllUsers.ts
"use server";

import { cookies } from "next/headers";

export const getAllUsers = async () => {
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
        const res = await fetch(`${process.env.BACKEND_API_URL}/api/admin/users`, {
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
            message: "Something went wrong while fetching users",
            data: [],
        };
    }
};