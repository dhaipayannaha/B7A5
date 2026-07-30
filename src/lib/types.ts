import { ReactNode } from "react";
import { LucideProps } from "lucide-react";
import { ForwardRefExoticComponent, RefAttributes } from "react";

type EquipmentCondition = "GOOD" | "NEW" | "FAIR" | "POOR"; // adjust based on your actual enum values
type EquipmentStatus = "AVAILABLE" | "UNAVAILABLE" | "RENTED" | "MAINTENANCE"; // adjust based on your actual enum values
type UserRole = "PROVIDER" | "CUSTOMER" | "ADMIN"; // adjust based on your actual enum values
type UserStatus = "ACTIVE" | "INACTIVE" | "SUSPENDED"; // adjust based on your actual enum values

interface Provider {
    id: string;
    name: string;
    email: string;
    phone: string;
    image: string;
    role: UserRole;
    status: UserStatus;
    createdAt: string; // ISO date string; use `Date` if you parse it
    updatedAt: string;
}

interface Category {
    id: string;
    name: string;
    description: string;
    createdAt: string;
    updatedAt: string;
}

export interface Equipment {
    author: any;
    content: ReactNode;
    comments: any;
    _count: any;
    id: string;
    title: string;
    description: string;
    brand: string;
    model: string;
    dailyRate: number;
    quantity: number;
    availableQuantity: number;
    images: string[];
    condition: EquipmentCondition;
    status: EquipmentStatus;
    providerId: string;
    categoryId: string;
    createdAt: string;
    updatedAt: string;
    provider: Provider;
    category: Category;
}





export type ISidebarItem = {
    label: string,
    href: string,
    icon: ForwardRefExoticComponent<Omit<LucideProps, "ref"> & RefAttributes<SVGSVGElement>>
}
type IUser = {
    success: boolean,
    message: string,
    data: {
        profile: {
            id: string,
            name: string,
            email: string,
            activeStatus: string,
            role: string,
            createdAt: string,
            updatedAt: string,
            profile: {
                id: string,
                profilePhoto: string,
                bio: string | null,
                userId: string,
                createdAt: string,
                updatedAt: string
            }
        }
    }
}



export type NavbarProps = {
    user: IUser
}




// for post create

export type IPostStatus = "DRAFT" | "PUBLISHED" | "ARCHIVED";

export type IAuthor = {
    id: string;
    name: string;
    email: string;
    activeStatus: string;
    role: string;
    createdAt: string;
    updatedAt: string;
};

export type IComment = {
    id: string;
    content: string;
    status: string;
    postId: string;
    authorId: string;
    createdAt: string;
    updatedAt: string;
};

export type IPost = {
    id: string;
    title: string;
    content: string;
    thumbnail: string | null;
    isFeatured: boolean;
    status: IPostStatus;
    tags: string[];
    views: number;
    isPremium: boolean;
    authorId: string;
    author?: IAuthor;
    comments?: IComment[];
    _count?: {
        comments: number;
    };
    createdAt: string;
    updatedAt: string;
};