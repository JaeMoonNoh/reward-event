import { IsNumber, IsString } from "class-validator";

export class RewardDto {
    @IsString()
    type: string;

    @IsNumber()
    value: number;
}