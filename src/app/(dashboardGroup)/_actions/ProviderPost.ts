import { getGear } from "@/app/(publicGroup)/_actions/getGear";
import { Equipment } from "@/lib/types";
import { jwtUtils } from "@/utilies/jwt";
import { cookies } from "next/headers";

export const providerPost = async () => {
    const result = await getGear();
    const gears: Equipment[] = result?.data ?? [];
    console.log(gears[0].provider.id)

    const cookieStore = await cookies();
    const accessToken = cookieStore.get("accessToken")?.value;
    const decoded = accessToken
        ? jwtUtils.verifyToken(accessToken, process.env.JWT_ACCESS_SECRET as string)
        : null;
    const userId = (decoded?.data as any)?.id;
    const myGears = gears.filter((gear) => gear.providerId === userId);
    return myGears;
}


