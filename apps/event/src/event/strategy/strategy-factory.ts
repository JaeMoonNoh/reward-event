import { ERROR_MESSAGES } from "apps/common/constant/error-message.constant";
import { ConditionStrategy } from "./condition-strategy.interface";
import { SignupDaysStrategy } from "./signup-days.strategy";
import { BadRequestException, Injectable } from "@nestjs/common";
import { EVENT_STRATEGY } from "apps/common/constant/event-condition.constant";

@Injectable()
export class StrategyFactory {

    private readonly strategyMap: Map<string, ConditionStrategy>

    constructor(
        private readonly signupDaysStrategy: SignupDaysStrategy
    ) {
        this.strategyMap = new Map<string, ConditionStrategy>([
            [EVENT_STRATEGY.DAY_SINCE_SIGN_UP, this.signupDaysStrategy],
        ]);
    }

    getStrategy(conditionKey: string): ConditionStrategy {
        const strategy = this.strategyMap.get(conditionKey);
        if(!strategy) {
            throw new BadRequestException(ERROR_MESSAGES.UNSUPPORTED_CONDITION(conditionKey));
        }
        return strategy;
    }
}