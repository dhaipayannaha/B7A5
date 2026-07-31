"use client"

import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import react, { useActionState, useEffect } from 'react'
import { toast } from 'sonner'
import { useRouter, useSearchParams } from 'next/navigation'
import { registationAction } from '../_actions/registationAction'

const RegisterFrom = () => {
    const searchParams = useSearchParams()
    const redirectTo = searchParams?.get("redirectTo") ?? '';

    const [state, action, pending] = useActionState(registationAction.bind(null, redirectTo), null)

    const router = useRouter()

    useEffect(() => {
        if (!state) return;

        if (state.success) {
            toast.success(state.message || "Registration success");
            // router.push("/login");
        }

        if (!state.success) {
            toast.error(state.message || "Registration failed");
        }

    }, [state])

    return (
        <form action={action} className='space-y-4'>



            <Card className="p-5 space-y-4">
                <Input name="name" type='text' placeholder='Name' required />
                <Input name="email" type='email' placeholder='Email' required />
                <Input name="password" type='password' placeholder='Password' required />
                <Input name="phone" type='text' placeholder='Phone' required />
                <Input name="image" type='text' placeholder='Image Url' required />
                <Button type="submit" className="w-full" disabled={pending}>
                    {pending ? "Logging in..." : "Login"}
                </Button>
            </Card>
        </form>
    )
}

export default RegisterFrom
