import { InjectQueue } from "@nestjs/bull";
import { Injectable } from "@nestjs/common";
import { UserType } from "apps/common/interface/jwt-payload.interface";
import { Queue } from "bullmq";

export const REWARD_QUEUE_NAME = 'reward-queue';
export const REWARD_EVENT = 'reward-event';
export const FAIL_ATTEPTPS = 3;

@Injectable()
export class RewardQueueService {
    constructor(
        @InjectQueue(REWARD_QUEUE_NAME) private readonly rewardQueue: Queue,
    ) {}

    async addRewardJob(user: UserType, eventId: string) {
        const jobId = `${user.userId}-${eventId}`;
        return await this.rewardQueue.add(REWARD_EVENT, { user, eventId }, {
            jobId,
            attempts: FAIL_ATTEPTPS,
            backoff: {
                type: 'exponential',
                delay: 1000,
            },
        });
    }
}