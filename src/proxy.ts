

import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'
import { cookies } from 'next/headers'
import { jwtUtils } from './utilies/jwt'
import { getNewAccessToken } from './services/refreshToken'


const AUTH_ROUTES = [
    "/login",
    "/register",
]
const PUBLIC_ROUTES = [
    "/", "/news", "/login",
    "/register",
]

// This function can be marked `async` if using `await` inside
export async function proxy(request: NextRequest) {
    const { pathname } = request.nextUrl;
    const cookieStore = await cookies();

    const refreshToken = request.cookies.get("refreshToken")?.value;
    let accessToken = request.cookies.get("accessToken")?.value;


    let decodedAccessToken = accessToken ? await jwtUtils.verifyToken(accessToken, process.env.JWT_ACCESS_SECRET as string) : null;
    const decodedRefreshToken = refreshToken ? await jwtUtils.verifyToken(refreshToken, process.env.JWT_REFRESH_SECRET as string) : null;


    if (!decodedAccessToken?.success && decodedRefreshToken?.success) {
        const result = await getNewAccessToken();

        if (result.success) {
            const newAccessToken = result.data.accessToken;

            cookieStore.set("accessToken", newAccessToken, {
                httpOnly: true,
                maxAge: 60 * 60 * 24,
                sameSite: "lax",
                path: "/",
            });
            accessToken = newAccessToken;
            decodedAccessToken = await jwtUtils.verifyToken(accessToken!, process.env.JWT_ACCESS_SECRET as string);
        }
    }

    const isPublic = PUBLIC_ROUTES.some((route) => pathname === route || pathname.startsWith(route + "/"));

    let userRole = null;

    if (decodedAccessToken?.success && decodedAccessToken.data) {
        userRole = (decodedAccessToken.data as any).role;
    }

    if (!decodedAccessToken?.success && !isPublic) {
        const loginUrl = new URL('/login', request.url);
        loginUrl.searchParams.set("redirectTo", pathname);
        return NextResponse.redirect(loginUrl);
    }


    if (decodedAccessToken?.success && AUTH_ROUTES.includes(pathname)) {
        if (userRole === "USER") {
            return NextResponse.redirect(new URL('/dashboard', request.url));
        } else if (userRole === "ADMIN") {
            return NextResponse.redirect(new URL('/admin-dashboard', request.url));
        } else if (userRole === "AUTHOR") {
            return NextResponse.redirect(new URL('/author-dashboard', request.url));
        } else {
            return NextResponse.redirect(new URL('/', request.url));
        }
    }




    if (pathname.startsWith("/dashboard") && userRole !== "USER") {
        return NextResponse.redirect(new URL('/not-found', request.url));
    } else if (pathname.startsWith("/admin-dashboard") && userRole !== "ADMIN") {
        return NextResponse.redirect(new URL('/not-found', request.url));
    } else if (pathname.startsWith("/author-dashboard") && userRole !== "AUTHOR") {
        return NextResponse.redirect(new URL('/not-found', request.url));
    }

    return NextResponse.next();




    //  if (pathname == "/premium") {
    //     const subscriptionStatus = await getSubscriptionStatus();
    //     const isActive = Boolean(
    //         subscriptionStatus?.success && subscriptionStatus.data?.isSubscribe,
    //     );

    //     if (!isActive) {
    //         return NextResponse.redirect(new URL('/payment', request.url));
    //     }
    // }
}


export const config = {
    matcher: [
        '/((?!api|_next/static|favicon.ico|_next/image|.*\\.png$).*)'
    ]
}