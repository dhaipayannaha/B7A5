"use server";

import { cookies } from "next/headers";
import { redirect } from "next/navigation";

interface ConfirmPayload {
    transactionId: string;
    rentalOrderId: string;
}

export const confirmPaymentAction = async (payload: ConfirmPayload) => {
    const cookieStore = await cookies();
    const accessToken = cookieStore.get("accessToken")?.value;

    if (!accessToken) {
        redirect("/login");
    }

    console.log("[confirmPayment] Confirming with payload →", JSON.stringify(payload, null, 2));

    try {
        const res = await fetch(`${process.env.BACKEND_API_URL}/api/payments/confirm`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                Cookie: `accessToken=${accessToken}`,
            },
            body: JSON.stringify(payload),
        });

        const result = await res.json();
        console.log("[confirmPayment] Response ←", JSON.stringify(result, null, 2));

        return result;
    } catch (error) {
        console.error("[confirmPayment] Error:", error);
        return { success: false, message: "Could not reach the server" };
    }
};
