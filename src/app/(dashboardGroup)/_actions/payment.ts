"use server";

import { isAccessTokenExist } from "@/services/refreshToken";
import { redirect } from "next/navigation";

export const createPaymentSession = async (rentalOrderId: string) => {
    const accessToken = await isAccessTokenExist();

    const res = await fetch(`${process.env.BACKEND_API_URL}/api/payments/create`, {
        method: "POST",
        headers: {
            Cookie: `accessToken=${accessToken}`,
            "Content-Type": "application/json",
        },
        body: JSON.stringify({ rentalOrderId }),
    });

    const result = await res.json();

    if (!result.success) {
        return {
            success: false,
            message: result.message || "Failed to create payment session",
        };
    }

    // Redirect user to Stripe Checkout
    redirect(result.data.url);
};

export const getOrderById = async (orderId: string) => {
    const accessToken = await isAccessTokenExist();

    const res = await fetch(`${process.env.BACKEND_API_URL}/api/rentals/${orderId}`, {
        headers: {
            Cookie: `accessToken=${accessToken}`,
        },
        cache: "no-store",
    });

    return res.json();
};
