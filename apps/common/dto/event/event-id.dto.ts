import { IsString } from "class-validator";

export class EventIdDto {
    @IsString()
    eventId: string;
}