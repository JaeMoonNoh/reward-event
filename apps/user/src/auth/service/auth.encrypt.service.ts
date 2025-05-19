import { Injectable } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import * as bcrypt from 'bcryptjs';

@Injectable()
export class EncryptService {

    private readonly saltRounds: number;

    constructor(
        private readonly configSerivce: ConfigService
    ){
        this.saltRounds = this.configSerivce.getOrThrow<number>('SALT_ROUND');
    }
    async compare(password: string, hash: string): Promise<boolean> {
        return bcrypt.compare(password, hash);
    }

    async hash(password: string): Promise<string> {
        return bcrypt.hash(password, this.saltRounds);
    }
}