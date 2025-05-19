import { Injectable } from "@nestjs/common";
import { User, UserDocument } from "./entity/user.entity";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";
import { SignUpDto } from "apps/common/dto/auth/sign-up.dto";
import { ConfigService } from "@nestjs/config";

@Injectable()
export class AuthRepository {

    private readonly limit: number;
    
    constructor(
        private readonly configService: ConfigService,
        @InjectModel(User.name) private readonly userModel: Model<UserDocument>,
    ) {
        this.limit = this.configService.getOrThrow<number>('PAGE_NUM');
    }

    async createUser(signUpDto: SignUpDto) {
        const signedUpUser = new this.userModel(signUpDto);
        return await signedUpUser.save();
    }

    async findByUserId(userId: string): Promise<User | null> {
        return await this.userModel.findOne({ userId: userId }).lean();
    }

    async updateLoginDate(userId: string, now: Date, isFirstLogin: boolean) {
        return await this.userModel.findOneAndUpdate(
            { userId : userId },
            {
                $set: {
                    ...(isFirstLogin ? { firstLoginAt: now } : {}),
                    lastLoginAt: now,
                },
            },
            { new: true },
        );
    }

    async findOneAndUpdatRole(userId: string, role: string) {
        return this.userModel.findOneAndUpdate(
            { userId },
            { role },
            { new: true }
        ).exec();
    }
}