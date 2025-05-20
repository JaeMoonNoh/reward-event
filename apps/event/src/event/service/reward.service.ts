import { InjectModel } from "@nestjs/mongoose";
import { Reward, RewardDocument } from "../entity/reward.entity";
import { Model, Types } from "mongoose";
import { RewardDto } from "apps/common/dto/event/reward.dto";
import { NotFoundException } from "@nestjs/common";
import { ERROR_MESSAGES } from "apps/common/constant/error-message.constant";
// 보상 처리
export class RewardService {
    constructor(
        @InjectModel(Reward.name) private readonly rewardModel: Model<RewardDocument>,
    ){}

    async createRewards(eventId: Types.ObjectId, rewards: RewardDto[]) {
        return await Promise.all(
            rewards.map((reward) => 
                this.rewardModel.create({
                    eventId,
                    type: reward.type,
                    value: reward.value
                })
            )
        )
    }

    async readRewardEvent(eventId: string) {
        const reward = await this.rewardModel.find({ eventId: new Types.ObjectId(eventId) });
        return reward;
    }

    async addReward(rewards: RewardDto[], eventId: string) {
        const createdRewards = await Promise.all(
            rewards.map((reward) =>
                this.rewardModel.create({
                    eventId: new Types.ObjectId(eventId),
                    type: reward.type,
                    value: reward.value
                })
            )
        );

        return createdRewards;
    }

    async findRewardsByEventId(eventId: Types.ObjectId) {
        return this.rewardModel.find({ eventId: eventId });
    }

    async getEventRewardsOrThrow(eventId: Types.ObjectId) {
        const rewards = await this.rewardModel.find({ eventId });
        if(!rewards || rewards.length === 0) {
            throw new NotFoundException(ERROR_MESSAGES.HAVE_NOT_REWARD);
        }
        return rewards;
    }
}