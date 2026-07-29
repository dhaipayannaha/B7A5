"use client"

import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import react, { useActionState, useEffect } from 'react'
import { toast } from 'sonner'
import { useRouter, useSearchParams } from 'next/navigation'
import { loginAction } from '../_actions/authAction'
// import { useRouter } from 'next/navigation'

const LoginFrom = () => {
    const searchParams = useSearchParams()
    const redirectTo = searchParams?.get("redirectTo") ?? '';

    const [state, action, pending] = useActionState(loginAction.bind(null, redirectTo), null)

    const router = useRouter()

    useEffect(() => {
        if (!state) return;

        if (state.success) {
            toast.success(state.message || "Login success");
            // router.push("/dashboard");
        }

        if (!state.success) {
            toast.error(state.message || "Login failed");
        }

    }, [state])

    return (
        <form action={action} className='space-y-4'>
            <Card className="p-5 space-y-4">
                <Input name="email" type='email' placeholder='Email' required />
                <Input name="password" type='password' placeholder='Password' required />
                <Button type="submit" className="w-full" disabled={pending}>
                    {pending ? "Logging in..." : "Login"}
                </Button>
            </Card>
        </form>
    )
}

export default LoginFrom
