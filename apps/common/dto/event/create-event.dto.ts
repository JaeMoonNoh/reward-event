import { IsArray, IsObject, IsString, ValidateNested } from "class-validator";
import { RewardDto } from "./reward.dto";
import { Type } from "class-transformer";

export class CreateEventDto {
    @IsString()
    title: string;

    @IsObject()
    conditions: Record<string, any>;
    
    @IsString()
    startDate: string;
    
    @IsString()
    endDate: string;
    
    @IsArray()
    @ValidateNested({ each: true})
    @Type(() => RewardDto)
    rewards: RewardDto[];
}