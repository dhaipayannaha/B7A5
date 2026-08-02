"use server";

import { cookies } from "next/headers";
import { revalidatePath } from "next/cache";

export const submitReviewAction = async (payload: {
    rentalOrderId: string;
    gearItemId: string;
    rating: number;
    comment: string;
}) => {
    const cookieStore = await cookies();
    const accessToken = cookieStore.get("accessToken")?.value;

    if (!accessToken) {
        return { success: false, message: "Unauthorized. Please log in again." };
    }

    try {
        const res = await fetch(`${process.env.BACKEND_API_URL}/api/reviews`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                Cookie: `accessToken=${accessToken}`,
            },
            body: JSON.stringify(payload),
        });

        const result = await res.json();

        if (res.ok && result.success) {
            revalidatePath("/dashboard/customer");
            return { success: true, message: "Review submitted successfully!" };
        } else {
            return { success: false, message: result.message || "Failed to submit review." };
        }
    } catch (error) {
        console.error("[submitReviewAction] Error:", error);
        return { success: false, message: "An unexpected error occurred." };
    }
};
