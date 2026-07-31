"use server";

import { cookies } from "next/headers";
import { revalidatePath } from "next/cache";

export const updateRentalStatus = async (rentalId: string, status: string) => {
    const cookieStore = await cookies();
    const accessToken = cookieStore.get("accessToken")?.value;

    if (!accessToken) {
        return { success: false, message: "You are not authorized to access this resource" };
    }

    const res = await fetch(`${process.env.BACKEND_API_URL}/api/admin/rentals/${rentalId}`, {
        method: "PATCH",
        headers: {
            "Content-Type": "application/json",
            Cookie: `accessToken=${accessToken}`,
        },
        body: JSON.stringify({ status }),
    });

    const result = await res.json();

    if (result.success) {
        revalidatePath("/dashboard/admin/rentals"); // adjust to your actual route
    }

    return result;
};