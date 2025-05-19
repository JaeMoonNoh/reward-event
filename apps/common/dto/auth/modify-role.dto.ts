import { IsIn, IsString } from "class-validator";

export class ModifyRoleDto {
    @IsString()
    @IsIn(['admin', 'operator', 'user', 'auditor'])
    role: string;
}