import { IsString } from "class-validator";

export class IdParamDto {
    @IsString()
    eventId: string;
}