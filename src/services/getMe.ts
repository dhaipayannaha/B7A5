"use server"

import { cookies } from "next/headers";


export const getMe = async () => {
    const cookieStore = await cookies();

    const accessToken = cookieStore.get("accessToken")?.value;


    if (!accessToken) {
        // throw new Error("You are not authorized to access this resource");

        return {
            success: false,
            message: "You are not authorized to access this resource"

        }
    }




    try {
        const res = await fetch(`${process.env.BACKEND_API_URL}/api/user/me`, {
            headers: {
                // Authorization: `Bearer ${accessToken}`
                Cookie: `accessToken=${accessToken}`
            },
            cache: "force-cache",
            next: {
                revalidate: 60 * 60 * 25,
                tags: ["userProfile"]
            }
        });

        const result = await res.json();
        console.log(result);
        return result;
    } catch (error) {
        console.error("[getMe] Failed to reach backend:", error);
        return {
            success: false,
            message: "Could not reach the backend server"
        };
    }
}