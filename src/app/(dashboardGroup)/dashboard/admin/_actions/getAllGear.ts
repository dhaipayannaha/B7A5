import { cookies } from "next/headers";

export const getAllGear = async () => {
    const cookieStore = await cookies();
    const accessToken = cookieStore.get("accessToken")?.value

    if (!accessToken) {
        return {
            success: false,
            message: "You are not authorized to access this resource"
        }
    }

    const res = await fetch(`${process.env.BACKEND_API_URL}/api/gear`, {
        method: "GET",
        headers: {
            Cookie: `accessToken=${accessToken}`
        },
        ...({
            cache: "no-store"
        })
    })
    const result = await res.json()
    return result;
}