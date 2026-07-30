"use server";

import { cookies } from "next/headers";

export const getGear = async ({ query }: { query?: { [key: string]: string | string[] | undefined } } = {}) => {

    // const searchTerm = `${search?.searchTerm ? `?searchTerm=${search.searchTerm}` : ''}`

    const params = new URLSearchParams()
    if (query) {
        Object.entries(query).forEach(([key, value]) => {
            if (value) {
                params.set(key, value.toString());
            }
        });
    }

    const cookieStore = await cookies();
    const accessToken = cookieStore.get("accessToken")?.value
    if (!accessToken) {
        return {
            success: false,
            message: "You are not authorized to access this resource"
        }
    }

    const queryString = params.toString();
    const res = await fetch(`${process.env.BACKEND_API_URL}/api/gear${queryString ? `?${queryString}` : ''}`, {
        headers: {
            Cookie: `accessToken=${accessToken}`
        },
        ...(query?.searchTerm
            ? { cache: "no-store" }
            : {
                cache: "force-cache",
                next: {
                    revalidate: 60 * 60 * 6,
                    tags: ["premium-posts"]
                }
            }
        )
    })

    const result = await res.json()
    return result;
}