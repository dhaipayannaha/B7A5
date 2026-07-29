import { Navbar } from '@/components/shared/navbar'
import { getMe } from '@/services/getMe'
// import { getMe } from '@/services/getMe'
import React from 'react'

export default async function PublicLayout({ children }: { children: React.ReactNode }) {
    const user = await getMe()
    return (
        <div>
            <Navbar user={user}></Navbar>
            {children}
        </div>
    )
}