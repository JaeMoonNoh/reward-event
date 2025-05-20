import { ConditionStrategy, ConditionType } from "./condition-strategy.interface";
import { Injectable } from "@nestjs/common";
import { EVENT_CONDITION } from "apps/common/constant/event-condition.constant";
import { TimeService } from "../service/time.service";
import { UserType } from "apps/common/interface/jwt-payload.interface";

@Injectable()
export class SignupDaysStrategy implements ConditionStrategy {
    constructor(
        private readonly timeService: TimeService,
    ){}

    async validate(user: UserType, maxDays: number): Promise<ConditionType> {
        const firstLoginAt = this.timeService.formatted(user.firstLoginAt!);
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