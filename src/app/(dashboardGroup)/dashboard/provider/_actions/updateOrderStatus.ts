"use server";

import { cookies } from "next/headers";
import { revalidatePath } from "next/cache";

export const updateOrderStatus = async (orderId: string, status?: string, paymentStatus?: string) => {
    const cookieStore = await cookies();
    const accessToken = cookieStore.get("accessToken")?.value;

    if (!accessToken) {
        return { success: false, message: "You are not authorized to access this resource" };
    }

    const payload: any = {};
    if (status !== undefined) payload.status = status;
    if (paymentStatus !== undefined) payload.paymentStatus = paymentStatus;

    const res = await fetch(`${process.env.BACKEND_API_URL}/api/provider/orders/${orderId}`, {
        method: "PATCH",
        headers: {
            "Content-Type": "application/json",
            Cookie: `accessToken=${accessToken}`,
        },
        body: JSON.stringify(payload),
    });

    const result = await res.json();

    if (result.success) {
        revalidatePath("/dashboard/provider/orders");
    }

    return result;
};