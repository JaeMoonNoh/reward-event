import { IsArray, IsString, ValidateNested } from "class-validator";
import { RewardDto } from "./reward.dto";
import { Type } from "class-transformer";

export class AddRewardDto {
    @IsString()
    eventId: string;

    @IsArray()
    @ValidateNested({ each: true })
    @Type(() => RewardDto)
    rewards: RewardDto[]
}