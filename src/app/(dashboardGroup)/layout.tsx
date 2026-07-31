import { Navbar } from '@/components/shared/navbar'
import { SidebarProvider } from '@/components/ui/sidebar'
import { getMe } from '@/services/getMe'
import React from 'react'
import DashboardSidebar from './_components/DashBoardSidebar'

import { Footer } from '@/components/shared/Footer'

export default async function DashboardLayout({ children }: { children: React.ReactNode }) {
    const user = await getMe()
    return (
        <div className="flex min-h-screen flex-col">
            <Navbar user={user} />
            <div className="flex flex-1 relative">
                <SidebarProvider>
                    <div className="flex flex-1 w-full">
                        <div className="sticky top-0 h-[calc(100vh-64px)] shrink-0 z-10">
                            <DashboardSidebar user={user} />
                        </div>
                        <main className="flex-1 min-w-0 bg-slate-50/50 dark:bg-slate-900/50 animate-in fade-in duration-500">
                            <div className="mx-auto w-full max-w-7xl p-4 min-h-[calc(100vh-64px)]">
                                {children}
                            </div>
                        </main>
                    </div>
                </SidebarProvider>
            </div>
            <Footer />
        </div>
    )
}