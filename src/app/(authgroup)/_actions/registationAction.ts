"use server";

import { cookies } from "next/headers";
import jwt from "jsonwebtoken"
import { redirect } from "next/navigation";

export type LoginState = {
    success: boolean;
    statusCode: number;
    message: string;
    data?: Record<string, any>;
}

export const registationAction = async (redirectTo: string, prevState: LoginState | null, formData: FormData): Promise<LoginState | null> => {
    const email = formData.get("email");
    const password = formData.get("password");
    const name = formData.get("name");
    const phone = formData.get("phone");
    const image = formData.get("image");


    const payload = {
        email,
        password,
        name,
        phone,
        image
    }

    const res = await fetch(`${process.env.BACKEND_API_URL}/api/user/register`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
    })

    const result = await res.json();

    console.log(result)

    return result;
}

