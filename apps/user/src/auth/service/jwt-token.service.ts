import { Injectable } from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";
import { User } from "../entity/user.entity";
import { LoginDates } from "../../interface/login-date.interface";

export interface JwtPayload {
    userId: string;
    role: string;
    username: string;
    firstLoginAt?: Date;
    lastLoginAt?: Date;
}

@Injectable()
export class JwtTokenService {
    constructor(
        private readonly jwtService: JwtService,
    ) {}

    createPayload(user: Pick<User, 'userId' | 'name' | 'role'>, dates: LoginDates): JwtPayload {
        return {
            userId: user.userId,
            role: user.role,
            username: user.name,
            firstLoginAt: dates.firstLoginAt,
            lastLoginAt: dates.lastLoginAt,
        }
    }

    sign(payload: JwtPayload): string {
        return this.jwtService.sign(payload);
    }

    signRefreshToken(payload: JwtPayload): string {
        return this.jwtService.sign(payload ,{
            expiresIn: '7d'
        })
    }
}