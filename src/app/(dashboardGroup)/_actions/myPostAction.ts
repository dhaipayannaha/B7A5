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

    const payload: Record<string, any> = {};

    if (formData.has("title")) payload.title = formData.get("title");
    if (formData.has("description")) payload.description = formData.get("description");
    if (formData.has("brand")) payload.brand = formData.get("brand");
    if (formData.has("model")) payload.model = formData.get("model");
    if (formData.has("dailyRate")) payload.dailyRate = Number(formData.get("dailyRate"));
    if (formData.has("quantity")) payload.quantity = Number(formData.get("quantity"));
    if (formData.has("availableQuantity")) {
        payload.availableQuantity = Number(formData.get("availableQuantity"));
    } else if (formData.has("quantity")) {
        payload.availableQuantity = Number(formData.get("quantity"));
    }
    
    if (formData.has("condition")) payload.condition = formData.get("condition");
    if (formData.has("status")) payload.status = formData.get("status");
    if (formData.has("categoryName")) payload.categoryName = formData.get("categoryName");

    if (formData.has("images")) {
        const imagesRaw = (formData.get("images") as string) ?? "";
        payload.images = imagesRaw
            .split(/[\n,]/)
            .map((s) => s.trim())
            .filter(Boolean);
    }

    console.log("[updatePost] postId:", postId);
    console.log("[updatePost] payload:", JSON.stringify(payload, null, 2));

    const accessToken = await isAccessTokenExist();

    const res = await fetch(`${process.env.BACKEND_API_URL}/api/provider/gear/${postId}`, {
        method: "PUT",
        headers: {
            Cookie: `accessToken=${accessToken}`,
            "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
    });

    const text = await res.text();
    console.log("[updatePost] status:", res.status);
    console.log("[updatePost] raw response:", text);

    let result;
    try {
        result = JSON.parse(text);
    } catch {
        return { success: false, message: `Server error: ${text}` };
    }

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

export const deletePost = async (postId: string) => {
    const accessToken = await isAccessTokenExist();

    const res = await fetch(`${process.env.BACKEND_API_URL}/api/provider/gear/${postId}`, {
        method: "DELETE",
        headers: {
            Cookie: `accessToken=${accessToken}`,
        },
    });

    const result = await res.json();

    if (result.success) {
        revalidatePath("/dashboard/provider/gear");
    }

    return result;
};