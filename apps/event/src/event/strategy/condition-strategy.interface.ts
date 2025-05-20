import { UserType } from "apps/common/interface/jwt-payload.interface";

export interface ConditionType {
    isEligible: boolean;
    reason: string;
}

export interface ConditionStrategy {
    validate(user: UserType, value: any): Promise<ConditionType>
}