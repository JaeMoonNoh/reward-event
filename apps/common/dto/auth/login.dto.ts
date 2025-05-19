import { IsNotEmpty, IsString } from "class-validator";

export class AuthLoginDto {
    @IsString()
    @IsNotEmpty()
    userId: string;

    @IsString()
    @IsNotEmpty()
    password: string;
}