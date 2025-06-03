
import { Injectable } from "@nestjs/common";
import { REWARD_EVENT, REWARD_QUEUE_NAME } from "./reward.queue";
import { Processor, Process } from "@nestjs/bull";
import { Job, UnrecoverableError } from "bullmq";
import { EventService } from "../event/event.service";
import { UserType } from "apps/common/interface/jwt-payload.interface";

export type RewardEventPayload = {
    user: UserType;
    eventId: string;
};

@Processor(REWARD_QUEUE_NAME)
@Injectable()
export class RewardProcess {
    constructor(
        private readonly eventService: EventService
    ) {}
    @Process(REWARD_EVENT)
    async handleRewardEvent(job: Job<RewardEventPayload>) {
        try{
            const { user, eventId } = job.data;
            return await this.eventService.rewardEvent(user, eventId);
        } catch (error) {
            if(error.status === 409) {
                throw new UnrecoverableError(error.message);
            }
            console.error('Error processing reward event:', error);
            throw error;
        }
    }
}