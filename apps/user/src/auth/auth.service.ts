import { ConflictException, Injectable, NotFoundException, UnauthorizedException } from "@nestjs/common";
import { User, UserDocument } from "./entity/user.entity";
import { AuthLoginDto } from "apps/common/dto/auth/login.dto";
import { SignUpDto } from "apps/common/dto/auth/sign-up.dto";
import { AuthModifyPayload } from "apps/common/interface/auth-modify.interface";
import { EncryptService } from "./service/auth.encrypt.service";
import { TimeService } from "./service/time.service";
import { AuthRepository } from "./auth.repository";
import { JwtTokenService } from "./service/jwt-token.service";
import { LoginDates } from "../interface/login-date.interface";
import { UserWithoutPassword } from "./type/user.type";
import { AuthValidateService } from "./service/auth.validate.service";
import { ERROR_MESSAGES } from "apps/common/constant/error-message.constant";
import { Types } from "mongoose";
import { AuthTokens } from "../interface/auth-token.interface";

@Injectable()
export class AuthService {
    constructor(
        private readonly jwtTokenService: JwtTokenService,
        private readonly authValidateService: AuthValidateService,
        private readonly encryptService: EncryptService,
        private readonly timeService: TimeService,
        private readonly authRepository: AuthRepository        
    ) {}

    async loginProcess(userData: AuthLoginDto) {
        const user = await this.validateUser(userData);
        return this.login(user);
    }

    async signUp(userData: SignUpDto) {
        await this.isExistUser(userData.userId);
        const hashedPassword = await this.encryptService.hash(userData.password);
        const newUser = await this.authRepository.createUser({
            ...userData,
            password: hashedPassword
        })
        return await this.login(newUser);
    }

    async modifyRole(modifyPayload: AuthModifyPayload) {
        return await this.authRepository.findOneAndUpdatRole(modifyPayload.userId, modifyPayload.role);
    }

    private async isExistUser(userId: string) {
        const isExistUser = await this.checkUser(userId);
        if(isExistUser) {
            throw new ConflictException(ERROR_MESSAGES.DUPLICATE_USER);
        }
    }

    private async validateUser(userData: AuthLoginDto) {
        const user = await this.getUserorThrow(userData.userId);
        this.authValidateService.verifyPasswordOrThrow(userData.password, user.password);
        return this.authValidateService.removePassword(user);
    }

    private async login(user: UserWithoutPassword): Promise<AuthTokens> {
        const updatedDates = await this.updateLoginDates(user.userId);
        const payload = this.jwtTokenService.createPayload(user, updatedDates);
        console.log(payload);

        const accessToken = this.jwtTokenService.sign(payload);
        const refreshToken = this.jwtTokenService.signRefreshToken(payload);

        return {accessToken, refreshToken};
    }

    private async updateLoginDates(userId: string): Promise<LoginDates> {
        const user = await this.getUserorThrow(userId);
        const now = this.timeService.now();
        const isFirstLogin = this.isFirstLogin(user);
        await this.updateUserLoginDates(user.userId, now, isFirstLogin);
        return {
            firstLoginAt: user.firstLoginAt,
            lastLoginAt: user.lastLoginAt
        }
    }

    private async checkUser(userId: string): Promise<User | null> {
        const user = await this.authRepository.findByUserId(userId);
        if(!user) {
            return null
        }
        return await this.authRepository.findByUserId(userId);;
    }

    private async getUserorThrow(userId: string): Promise<User> {
        const user = await this.authRepository.findByUserId(userId);
        if(!user) {
            throw new UnauthorizedException(ERROR_MESSAGES.INVALID_CREDENTIALS);
        }
        return user;
    }

    private isFirstLogin(user: User): boolean {
        return !user.firstLoginAt;
    }

    private async updateUserLoginDates(userId: string, now: Date, isFirstLogin: boolean): Promise<UserDocument> {
        const updated = await this.authRepository.updateLoginDate(userId, now, isFirstLogin);
        if (!updated) {
            throw new NotFoundException(ERROR_MESSAGES.USER_NOT_FOUND);
        }
        return updated;
    }

}