import { ConditionStrategy } from "./condition-strategy.interface";
import { Injectable } from "@nestjs/common";
import { EVENT_CONDITION } from "apps/common/constant/event-condition.constant";
import { TimeService } from "../time.service";

@Injectable()
export class SignupDaysStrategy implements ConditionStrategy {
    constructor(
        private readonly timeService: TimeService,
    ){}

    async validate(user: any, maxDays: number): Promise<{ isEligible: boolean; reason: string; }> {
        const firstLoginAt = this.timeService.formatted(user.firstLoginAt);
        const now = this.timeService.now();
        const diffInDays = this.timeService.diffInDays(firstLoginAt, now);
        const isEligible = diffInDays <= maxDays;

        return {
            isEligible,
            reason: isEligible 
                    ? EVENT_CONDITION.SIGNUP_DAYS.SUCCESS 
                    : EVENT_CONDITION.SIGNUP_DAYS.FAIL(maxDays)
        }
    }
}