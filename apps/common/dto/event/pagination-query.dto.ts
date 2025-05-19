import { IsOptional, IsString } from "class-validator";

export class PaginationQueryDto {
    @IsOptional()
    @IsString()
    afterId?: string;
}