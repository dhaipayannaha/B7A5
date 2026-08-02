"use client"

import Link from "next/link"
import {
    LayoutDashboard,
    User,
    Settings,
    LogOut,
    PackageSearch,
} from "lucide-react"

import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuGroup,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { StringifyOptions } from "querystring"
import { logout } from "@/services/logout"
import { useEffect, useState } from "react"
import { toast } from "sonner"
import { useRouter } from "next/navigation"

import { ThemeToggle } from "../theme-toggle"

// Main navigation links
const navLinks = [
    { label: "Home", href: "/", icon: LayoutDashboard },
    { label: "Browse Gear", href: "/gear", icon: PackageSearch },
]

// User dropdown options — an array so options are simple to add/remove.
const userMenuItems = [
    { label: "Dashboard", action: "dashboard", icon: LayoutDashboard },
]

const currentUser = {
    name: "Jordan Rivera",
    email: "jordan@example.com",
    avatar: "",
}

type UserProfile = {
    id: string;
    profilePhoto: string;
    bio: string | null;
    userId: string;
    createdAt: string;
    updatedAt: string;
}

type IUser = {
    success: boolean;
    message: string;
    data: {
        profile: {
            id: string;
            name: string;
            email: string;
            activeStatus: "ACTIVE" | "INACTIVE";
            role: "USER" | "ADMIN" | "CUSTOMER" | "PROVIDER";
            createdAt: string;
            updatedAt: string;
            profile: UserProfile;
        }
    }
}

type NavbarProps = {
    user: IUser
}



export function Navbar({ user }: NavbarProps) {

    const router = useRouter()
    const handleUserMenuAction = async (action: string) => {

        if (action === "dashboard") {
            if (user.data.profile.role === "CUSTOMER") {
                router.push("/dashboard/customer")
            } else if (user.data.profile.role === "ADMIN") {
                router.push("/dashboard/admin")
            } else if (user.data.profile.role === "PROVIDER") {
                router.push("/dashboard/provider")
            }

            return;
        }


        if (action === "logout") {
            await logout();
            toast.success("User Logged Out Successfully");
            router.push("/login");

        }
    }

    return (
        <header className="sticky top-0 z-40 w-full border-b border-border bg-background">
            <nav className="mx-auto flex h-16 max-w-6xl items-center justify-between gap-4 px-4">
                {/* Logo */}
                <Link href="/" className="flex items-center gap-2 transition-opacity hover:opacity-90">
                    <span className="flex size-8 items-center justify-center rounded-md bg-[#92a417] text-sm font-bold text-white shadow-sm">
                        RG
                    </span>
                    <span className="text-lg font-bold tracking-tight text-[#041334] dark:text-white">
                        Rental Gear
                    </span>
                </Link>

                {/* Nav links */}
                <ul className="hidden items-center gap-2 md:flex">
                    {navLinks.map((link) => (
                        <li key={link.label}>
                            <Link
                                href={link.href}
                                className={`flex items-center gap-2 rounded-md px-4 py-2 text-sm font-medium transition-colors ${
                                    link.href === "/gear"
                                        ? "bg-[#92a417]/10 text-[#92a417] hover:bg-[#92a417]/20"
                                        : "text-muted-foreground hover:bg-accent hover:text-foreground"
                                }`}
                            >
                                <link.icon className="size-4" />
                                {link.label}
                            </Link>
                        </li>
                    ))}
                </ul>

                <div className="flex items-center gap-3">
                    <ThemeToggle />
                    {/* User dropdown */}
                    {
                        user.success ? (
                            <DropdownMenu>
                                <DropdownMenuTrigger
                                    className="relative size-9 rounded-full p-0 bg-transparent border-0 cursor-pointer"
                                    aria-label="Open user menu"
                                >
                                <Avatar className="size-9">
                                    <AvatarImage src={currentUser.avatar} alt={currentUser.name} />
                                    <AvatarFallback>JR</AvatarFallback>
                                </Avatar>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent align="end" className="w-56">
                                <DropdownMenuGroup>
                                    <DropdownMenuLabel>
                                        <div className="flex flex-col gap-0.5">
                                            <span className="text-sm font-medium text-foreground">
                                                {user.data?.profile?.name || 'name'}
                                            </span>
                                            <span className="text-xs font-normal text-muted-foreground">
                                                {user.data?.profile?.email || "email"}
                                            </span>
                                        </div>
                                    </DropdownMenuLabel>
                                </DropdownMenuGroup>
                                <DropdownMenuSeparator />
                                <DropdownMenuGroup>
                                    {userMenuItems.map((item) => (
                                        <DropdownMenuItem
                                            key={item.label}
                                            onClick={async () => { await handleUserMenuAction(item.action) }}
                                            className="cursor-pointer"
                                        >
                                            <item.icon className="mr-2 h-4 w-4" />
                                            <span>{item.label}</span>
                                        </DropdownMenuItem>
                                    ))}
                                </DropdownMenuGroup>
                                <DropdownMenuSeparator />
                                <DropdownMenuItem
                                    variant="destructive"
                                    onClick={async () => { await handleUserMenuAction("logout") }}
                                >
                                    <LogOut />
                                    Sign out
                                </DropdownMenuItem>
                            </DropdownMenuContent>
                        </DropdownMenu>
                    ) : (
                        <Link href="/login">
                            <Button>Login</Button>
                        </Link>
                    )
                }
                </div>
            </nav>
        </header>
    )
}
