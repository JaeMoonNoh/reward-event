import { IsNotEmpty, IsOptional, IsString } from "class-validator";

export class SignUpDto {
    @IsNotEmpty()
    @IsString()
    userId: string;

    @IsNotEmpty()
    @IsString()
    name: string;

    @IsNotEmpty()
    @IsString()
    password: string;

    @IsOptional()
    @IsString()
    role?: string;
}