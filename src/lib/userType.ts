// lib/userType.ts
type UserRole = "PROVIDER" | "CUSTOMER" | "ADMIN";
type UserStatus = "ACTIVE" | "INACTIVE" | "SUSPENDED";

interface User {
    id: string;
    name: string;
    email: string;
    phone: string;
    image: string;
    role: UserRole;
    status: UserStatus;
    createdAt: string;
    updatedAt: string;
}

interface UsersResponse {
    success: boolean;
    statusCode: number;
    message: string;
    data: User[];
}

export type { User, UserRole, UserStatus, UsersResponse };