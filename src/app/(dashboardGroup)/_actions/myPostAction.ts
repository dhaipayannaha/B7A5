/* eslint-disable @typescript-eslint/no-explicit-any */
"use server";

import { isAccessTokenExist } from "@/services/refreshToken";
import { revalidatePath } from "next/cache";

type PostState = {
    success: boolean,
    statusCode?: number,
    message: string,
    data?: Record<string, any>
}

export const createPost = async (prevState: PostState | null, formData: FormData) => {

    const quantity = Number(formData.get("quantity"));
    const availableQuantity = Number(formData.get("availableQuantity")) || quantity;

    // Parse images: one per line or comma-separated
    const imagesRaw = (formData.get("images") as string) ?? "";
    const images = imagesRaw
        .split(/[\n,]/)
        .map((s) => s.trim())
        .filter(Boolean);

    const payload = {
        title: formData.get("title"),
        description: formData.get("description"),
        brand: formData.get("brand"),
        model: formData.get("model"),
        dailyRate: Number(formData.get("dailyRate")),
        quantity,
        availableQuantity,
        images,
        condition: formData.get("condition"),
        status: formData.get("status"),
        categoryName: formData.get("categoryName"),
    };

    console.log("[createPost] payload:", payload);

    const accessToken = await isAccessTokenExist();

    const res = await fetch(`${process.env.BACKEND_API_URL}/api/provider/gear`, {
        method: "POST",
        headers: {
            Cookie: `accessToken=${accessToken}`,
            "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
    });

    const result = await res.json();

    console.log("[createPost] response:", result);

    if (result.success) {
        revalidatePath("/dashboard/provider/gear");
    }

    return result;
};

export const updatePost = async (postId: string, prevState: PostState | null, formData: FormData) => {

    const quantity = Number(formData.get("quantity"));
    const availableQuantity = Number(formData.get("availableQuantity")) || quantity;

    const imagesRaw = (formData.get("images") as string) ?? "";
    const images = imagesRaw
        .split(/[\n,]/)
        .map((s) => s.trim())
        .filter(Boolean);

    const payload = {
        title: formData.get("title") ?? "",
        description: formData.get("description") ?? "",
        brand: formData.get("brand") ?? "",
        model: formData.get("model") ?? "",
        dailyRate: Number(formData.get("dailyRate")),
        quantity,
        availableQuantity,
        images,
        condition: formData.get("condition"),
        status: formData.get("status"),
        categoryName: formData.get("categoryName") ?? "",
    };

    console.log("[updatePost] payload:", payload);

    const accessToken = await isAccessTokenExist();

    const res = await fetch(`${process.env.BACKEND_API_URL}/api/provider/gear/${postId}`, {
        method: "PATCH",
        headers: {
            Cookie: `accessToken=${accessToken}`,
            "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
    });

    const result = await res.json();

    console.log("[updatePost] response:", result);

    if (result.success) {
        revalidatePath("/dashboard/provider/gear");
    }

    return result;
};

export const getMyPosts = async () => {
    const { cookies } = await import("next/headers");
    const cookieStore = await cookies();
    const accessToken = cookieStore.get("accessToken")?.value || null;

    if (!accessToken) {
        return {
            success: false,
            message: "User not logged in!",
        };
    }

    const res = await fetch(`${process.env.BACKEND_API_URL}/api/provider/gear`, {
        headers: {
            Cookie: `accessToken=${accessToken}`,
        },
        cache: "no-store",
    });

    return res.json();
};