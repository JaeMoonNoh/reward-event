import { IsIn, IsString } from "class-validator";

export class StatusUpdateDto {
    @IsString()
    @IsIn(['active', 'inactive'])
    status: string;
}