import { Injectable, UnauthorizedException } from "@nestjs/common";
import { EncryptService } from "./auth.encrypt.service";
import { User } from "../entity/user.entity";
import { UserWithoutPassword } from "../type/user.type";

@Injectable()
export class AuthValidateService {
    constructor(
        private readonly encryptService: EncryptService
    ){}

    async verifyPasswordOrThrow(rawPassword: string, hashedPassword: string): Promise<void> {
        const isValid = await this.encryptService.compare(rawPassword, hashedPassword);
        if (!isValid) {
            throw new UnauthorizedException('아이디와 비밀번호를 다시 확인해주세요.');
        }
    }

    removePassword(user: User): UserWithoutPassword {
        const { password, ...userWithoutPassword } = user;
        return userWithoutPassword;
    }
}