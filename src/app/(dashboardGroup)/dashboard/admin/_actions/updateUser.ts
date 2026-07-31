// app/(dashboardGroup)/_actions/updateUser.ts
"use server";

import { cookies } from "next/headers";
import { revalidatePath } from "next/cache";

export const updateUserStatus = async (userId: string, status: string) => {
    const cookieStore = await cookies();
    const accessToken = cookieStore.get("accessToken")?.value;

    if (!accessToken) {
        return { success: false, message: "You are not authorized to access this resource" };
    }

    const res = await fetch(`${process.env.BACKEND_API_URL}/api/admin/users/${userId}`, {
        method: "PATCH",
        headers: {
            "Content-Type": "application/json",
            Cookie: `accessToken=${accessToken}`,
        },
        body: JSON.stringify({ status }),
    });

    const result = await res.json();

    if (result.success) {
        revalidatePath("/dashboard/admin/users"); // adjust to your actual route
    }

    return result;
};

export const updateUserRole = async (userId: string, role: string) => {
    const cookieStore = await cookies();
    const accessToken = cookieStore.get("accessToken")?.value;

    if (!accessToken) {
        return { success: false, message: "You are not authorized to access this resource" };
    }

    const res = await fetch(`${process.env.BACKEND_API_URL}/api/admin/users/${userId}/role`, {
        method: "PATCH",
        headers: {
            "Content-Type": "application/json",
            Cookie: `accessToken=${accessToken}`,
        },
        body: JSON.stringify({ role }),
    });

    const result = await res.json();

    if (result.success) {
        revalidatePath("/dashboard/admin/users");
    }

    return result;
};