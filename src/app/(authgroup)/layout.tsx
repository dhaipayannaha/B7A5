import { Navbar } from '@/components/shared/navbar'
import { getMe } from '@/services/getMe';
import React from 'react'

export default async function AuthLayout({ children }: { children: React.ReactNode }) {

    const user = await getMe();
    return (
        <div className='max-w-7xl mx-auto'>
            <Navbar user={user}></Navbar>
            {children}
        </div>
    )
}