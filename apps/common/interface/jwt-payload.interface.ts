export interface JwtPayload {
    userId: string;
    username: string;
    role: string;
    createdAt: string;
    firstLoginAt: string;
    lastLoginAt: string;
}

export interface UserType {
    userId: string;
    username: string;
    role: string;
    createdAt: string;
    firstLoginAt: string;
    lastLoginAt: string;
}