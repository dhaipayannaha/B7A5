"use server";

import { cookies } from "next/headers";
import { redirect } from "next/navigation";

interface RentalPayload {
    gearItemId: string;
    startDate: string;   // ISO string e.g. "2026-08-05T00:00:00.000Z"
    endDate: string;     // ISO string e.g. "2026-08-10T00:00:00.000Z"
    totalAmount: number;
}

export const handlePayment = async (payload: RentalPayload) => {
    const cookieStore = await cookies();
    const accessToken = cookieStore.get("accessToken")?.value;

    // Not logged in → redirect to login (works from server action)
    if (!accessToken) {
        redirect("/login?redirectTo=/gear");
    }

    // ✅ Log the payload being sent
    console.log("[handlePayment] Payload →", JSON.stringify(payload, null, 2));

    const res = await fetch(`${process.env.BACKEND_API_URL}/api/rentals`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            Cookie: `accessToken=${accessToken}`,
        },
        body: JSON.stringify(payload),
    });

    const result = await res.json();

    // ✅ Log the backend response from rental API
    console.log("[handlePayment] Rental Response ←", JSON.stringify(result, null, 2));

    if (!res.ok || !result.success) {
        return result;
    }

    // Extract the created rental order ID. Adjust if your backend uses a different field name (e.g. _id)
    const rentalOrderId = result.data?.rentalOrderId || result.data?.id || result.data?._id;

    if (!rentalOrderId) {
        console.error("Could not find rental order ID in response");
        return { success: false, message: "Could not create rental order." };
    }

    // Now call the payment API with the rental order ID
    const paymentRes = await fetch(`${process.env.BACKEND_API_URL}/api/payments/create`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            Cookie: `accessToken=${accessToken}`,
        },
        body: JSON.stringify({ rentalOrderId }),
    });

    const paymentResult = await paymentRes.json();

    // ✅ Log the backend response from payment API
    console.log("[handlePayment] Payment Response ←", JSON.stringify(paymentResult, null, 2));
    console.log("[handlePayment] rentalOrderId to store:", rentalOrderId);

    // ✅ Store rentalOrderId in a cookie so it survives the Stripe redirect
    // (sessionStorage doesn't survive navigation to external domains and back)
    cookieStore.set("pendingRentalOrderId", rentalOrderId, {
        httpOnly: false,   // must be readable by client JS on success page
        maxAge: 60 * 30,  // 30 minutes
        path: "/",
        sameSite: "lax",
    });

    return { ...paymentResult, rentalOrderId };
};