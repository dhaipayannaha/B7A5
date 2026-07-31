"use server";

import { cookies } from "next/headers";
import { revalidatePath } from "next/cache";

export const updateGearAvailability = async (gearId: string, availability: string) => {
    const cookieStore = await cookies();
    const accessToken = cookieStore.get("accessToken")?.value;

    if (!accessToken) {
        return { success: false, message: "You are not authorized to access this resource" };
    }

    const res = await fetch(`${process.env.BACKEND_API_URL}/api/gear/${gearId}`, {
        method: "PATCH",
        headers: {
            "Content-Type": "application/json",
            Cookie: `accessToken=${accessToken}`,
        },
        body: JSON.stringify({ availability }),
    });

    const result = await res.json();

    if (result.success) {
        revalidatePath("/dashboard/admin/gear"); // adjust to your actual route
    }

    return result;
};

export const deleteGearItem = async (gearId: string) => {
    const cookieStore = await cookies();
    const accessToken = cookieStore.get("accessToken")?.value;

    if (!accessToken) {
        return { success: false, message: "You are not authorized to access this resource" };
    }

    const res = await fetch(`${process.env.BACKEND_API_URL}/api/gear/${gearId}`, {
        method: "DELETE",
        headers: {
            Cookie: `accessToken=${accessToken}`,
        },
    });

    const result = await res.json();

    if (result.success) {
        revalidatePath("/dashboard/admin/gear");
    }

    return result;
};