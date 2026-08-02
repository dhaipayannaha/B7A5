import { redirect } from "next/navigation";

/**
 * The backend currently redirects Stripe to /success?session_id=...
 * This page forwards everything straight to /payment/success so both URLs work.
 * When you update your backend's success_url to /payment/success, this file can be deleted.
 */
export default async function SuccessRedirectPage({
    searchParams,
}: {
    searchParams: Promise<Record<string, string | string[] | undefined>>;
}) {
    const params = await searchParams;

    const qs = new URLSearchParams(
        Object.entries(params).flatMap(([k, v]) =>
            Array.isArray(v) ? v.map((val) => [k, val]) : v ? [[k, v]] : []
        )
    ).toString();

    redirect(`/payment/success${qs ? `?${qs}` : ""}`);
}
