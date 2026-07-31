/* eslint-disable @typescript-eslint/no-explicit-any */
"use server";

import { isAccessTokenExist } from "@/services/refreshToken";
import { revalidateTag } from "next/cache";
import { cookies } from "next/headers";


type PostState = {
    success: true,
    statusCode: number,
    message: string,
    data: Record<string, any>
}

/*

    data : {
        title
        conten
    }
*/

export const createPost = async (prevState: PostState, formData: FormData) => {


    const quantity = Number(formData.get("quantity"));

    const payload = {
        title: formData.get("title"),
        description: formData.get("content"), // Form has "content", backend expects "description"
        brand: formData.get("brand"),
        model: formData.get("model"),
        dailyRate: Number(formData.get("dailyRate")), // Form has "dailyRate", parsed as number
        quantity: quantity,
        availableQuantity: quantity, // Send same quantity by default
        images: formData.get("thumbnail") ? [formData.get("thumbnail")] : [], // Form has "thumbnail", backend expects "images" array
        condition: formData.get("condition"),
        status: formData.get("status"),
        category: formData.get("categoryName"), // Form has "categoryName", backend expects "category"
        categoryName: formData.get("categoryName"),

        // Extra fields that are in your form (optional)
        tags: formData.get("tags") ? (formData.get("tags") as string).split(", ") : [],
        isPremium: formData.get("isPremium") === "on",
    }

    console.log({ payload })

    const accessToken = await isAccessTokenExist()

    const res = await fetch(`${process.env.BACKEND_API_URL}/api/provider/gear`, {
        method: "POST",
        headers: {

            Cookie: `accessToken=${accessToken}`,
            "Content-Type": "application/json"
        },
        body: JSON.stringify(payload)
    });

    const result = await res.json();

    if (result.success) {
        revalidateTag("gear", "max"); // getGear uses this tag, we must invalidate it to see new gear
    }

    return result;
}
export const updatePost = async (postId: string, prevState: PostState, formData: FormData) => {
    console.log({
        postId
    });
    console.log({
        title: formData.get("title"),
        content: formData.get("content"),
        thumbnail: formData.get("thumbnail"),
        tags: (formData.get("tags") as string).split(", "),
        isPremium: formData.get("isPremium") === "on"
    });

    const quantity = Number(formData.get("quantity"));
    
    const payload = {
        title: formData.get("title") ?? "",
        description: formData.get("content") ?? "", // Form has "content"
        brand: formData.get("brand") ?? "",
        model: formData.get("model") ?? "",
        dailyRate: Number(formData.get("dailyRate")),
        quantity: quantity,
        availableQuantity: quantity,
        images: formData.get("thumbnail") ? [formData.get("thumbnail")] : [], 
        condition: formData.get("condition"),
        status: formData.get("status"),
        category: formData.get("categoryName") ?? "anything",
        categoryName: formData.get("categoryName") ?? "anything",
        tags: formData.get("tags") ? (formData.get("tags") as string).split(", ") : [],
        isPremium: formData.get("isPremium") === "on"
    }

    const accessToken = await isAccessTokenExist()

    const res = await fetch(`${process.env.BACKEND_API_URL}/api/posts/${postId}`, {
        method: "PATCH",
        headers: {

            Cookie: `accessToken=${accessToken}`,
            "Content-Type": "application/json"
        },
        body: JSON.stringify(payload)
    });

    const result = await res.json();

    if (result.success) {
        revalidateTag("my-posts", "max");
        revalidateTag("premium-posts", "max"); // invalidate getGear cache

        if (result.data?.isPremium) {
            revalidateTag("premium-posts", "max");
        } else {
            revalidateTag("public-posts", "max");
        }
    }



    return result
}

export const getMyPosts = async () => {
    const cookieStore = await cookies();

    const accessToken = cookieStore.get("accessToken")?.value || null;

    if (!accessToken) {
        // throw new Error("User Not Logged In!");

        return {
            success: false,
            message: "User not logged in!"
        }
    }

    const res = await fetch(`${process.env.BACKEND_API_URL}/api/posts/my-posts`, {
        headers: {
            // Authorization : accessToken as unknown as string,
            // Authorization : `${accessToken}`,
            // Authorization : `Bearer ${accessToken}`

            Cookie: `accessToken=${accessToken}`
        },

        cache: "force-cache",
        next: {
            revalidate: 60 * 60 * 24, // 1day
            tags: ["my-posts"]
        }
    });

    const result = res.json();


    return result
}