import { BadRequestException, Injectable } from "@nestjs/common";
import { StrategyFactory } from "./strategy/strategy-factory";
import { EventDocument } from "./entity/event.entity";
import { ERROR_MESSAGES } from "apps/common/constant/error-message.constant";
import { EVENT_STATUS } from "apps/common/constant/event-condition.constant";
import { UserDocument } from "apps/user/src/auth/entity/user.entity";
import { UserType } from "apps/common/interface/jwt-payload.interface";

@Injectable()
export class EventValidationService {
    constructor(
        private readonly strategyFactory: StrategyFactory
    ) {}

    async ensureEventIsActive(event: EventDocument) {
        if(event.status === EVENT_STATUS.IN_ACTIVE) {
            throw new BadRequestException(ERROR_MESSAGES.NOT_ACTIVE_EVENT);
        }
    }

    async ensureWithinPeriod(event: EventDocument) {
        const now = new Date();
        if(!(event.startDate <= now && now <= event.endDate)) {
            throw new BadRequestException(ERROR_MESSAGES.NOT_EVENT_PERIOD);
        }
    }

    async checkEligibility(user: UserType, conditions: Record<string, any>) {
        const checkResults = await Promise.all(
            Object.entries(conditions).map(async ([key, value]) => {
                const strategy = this.strategyFactory.getStrategy(key);
                return strategy.validate(user, value);
            })
        );

        return checkResults.every(result => result.isEligible);
    }
}