import { UserType } from "apps/common/interface/jwt-payload.interface";
import { UserDocument } from "apps/user/src/auth/entity/user.entity";

export interface ConditionType {
    isEligible: boolean;
    reason: string;
}

export interface ConditionStrategy {
    validate(user: UserType, value: any): Promise<ConditionType>
}