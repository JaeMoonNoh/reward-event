export interface ConditionStrategy {
    validate(user: any, value: any): Promise<{ isEligible: boolean; reason: string }>
}