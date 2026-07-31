import { Navbar } from '@/components/shared/navbar'
import { getMe } from '@/services/getMe'
// import { getMe } from '@/services/getMe'
import React from 'react'

import { Footer } from '@/components/shared/Footer'

export default async function PublicLayout({ children }: { children: React.ReactNode }) {
    const user = await getMe()
    return (
        <div className="flex flex-col min-h-screen">
            <Navbar user={user}></Navbar>
            <main className="flex-1">
                {children}
            </main>
            <Footer />
        </div>
    )
}