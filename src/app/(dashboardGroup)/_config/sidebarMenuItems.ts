import { ISidebarItem } from "@/lib/types";
import { LayoutDashboard, FileText, User, Settings, Users, Podcast } from "lucide-react";

export const sidebarMenuItems: Record<string, ISidebarItem[]> = {
    CUSTOMER: [
        {
            label: "My Profile",
            href: "/dashboard/my-profile",
            icon: User,
        },
        {
            label: "Settings",
            href: "/dashboard/settings",
            icon: Settings,
        },
    ],
    PROVIDER: [
        {
            label: "Dashboard",
            href: "/author-dashboard",
            icon: LayoutDashboard,
        },
        {
            label: "My Posts",
            href: "/author-dashboard/my-posts",
            icon: FileText,
        },
        {
            label: "My Profile",
            href: "/author-dashboard/my-profile",
            icon: User,
        },
    ],
    ADMIN: [
        {
            label: "Dashboard",
            href: "/admin-dashboard",
            icon: LayoutDashboard,
        },
        {
            label: "Manage Users",
            href: "/admin-dashboard/users",
            icon: Users,
        },
        {
            label: "All Posts",
            href: "/admin-dashboard/posts",
            icon: FileText,
        },
        {
            label: "All Users",
            href: "/admin-dashboard/users",
            icon: Users,
        },
        {
            label: "All Rented",
            href: "/admin-dashboard/rented",
            icon: Users,
        },
    ],
};