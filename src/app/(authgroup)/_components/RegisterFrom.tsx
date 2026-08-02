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
            router.push(`/login${redirectTo ? `?redirectTo=${redirectTo}` : ''}`);
        }

        if (!state.success) {
            toast.error(state.message || "Registration failed");
        }

    }, [state])

    return (
        <form action={action} className='space-y-4'>



            <div className="space-y-4">
                <Input name="name" type='text' placeholder='Full Name' required className="h-12" />
                <Input name="email" type='email' placeholder='Email Address' required className="h-12" />
                <Input name="password" type='password' placeholder='Password' required className="h-12" />
                <Input name="phone" type='text' placeholder='Phone Number' required className="h-12" />
                <Input name="image" type='text' placeholder='Profile Image URL' required className="h-12" />
                <Button type="submit" className="w-full h-12 bg-[#92a417] hover:bg-[#829214] text-white text-base font-semibold transition-all shadow-md hover:shadow-lg" disabled={pending}>
                    {pending ? "Creating account..." : "Create Account"}
                </Button>
            </div>
        </form>
    )
}

export default RegisterFrom
