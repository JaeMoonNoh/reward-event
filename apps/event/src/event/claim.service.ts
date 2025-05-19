import { InjectModel } from "@nestjs/mongoose";
import { Claim, ClaimDocument } from "./entity/claim.entity";
import { HydratedDocument, Model, Types } from "mongoose";
import { ConflictException } from "@nestjs/common";
import { EventHelperService } from "./event.helper.service";
import { Reward } from "./entity/reward.entity";
import { ERROR_MESSAGES } from "apps/common/constant/error-message.constant";
import { CLAIM_REASON, CLAIM_STATUS } from "apps/common/constant/claim.constant";
import { ConfigService } from "@nestjs/config";

type RewardDoc = HydratedDocument<Reward>;

export class ClaimService {

    private limit: number;

    constructor(
        private readonly eventHelperService: EventHelperService,
        private readonly configService: ConfigService,
        @InjectModel(Claim.name) private readonly claimModel: Model<ClaimDocument>
    ) {
        this.limit = this.configService.getOrThrow<number>('PAGE_NUM');
    }

    async readReward(userId: string, afterId?: string): Promise<{ data: any[]; nextCursor: Types.ObjectId | null; }> {
        const query: any = this.eventHelperService.buildQuery(userId, afterId);
        const claims = await this.claimModel
                                    .find(query)
                                    .sort({ _id: 1 })
                                    .limit(this.limit)
                                    .lean();
        const nextCursor = this.eventHelperService.calculateNextCursor(claims);
        return { data: claims, nextCursor };
    }

    async readAllReward(afterId?: string):Promise<{data: any[]; nextCursor: Types.ObjectId | null}> {
        console.log("afterId:", afterId);
        const query = this.eventHelperService.buildAllQuery(afterId);
        console.log("Query : ", query);
        const rewards = await this.fetchRewards(query);
        console.log("rewards : ",rewards);
        const nextCursor = this.eventHelperService.getNextCursor(rewards);
        console.log("next cursor : ", nextCursor);
        return { data: rewards, nextCursor };
    }

    async createClaims(userId: string, eventId: Types.ObjectId, rewards: RewardDoc[], isEligible: boolean) {
        const status = isEligible ? CLAIM_STATUS.SUCCESS : CLAIM_STATUS.FAIL;
        const reason = isEligible 
                            ? CLAIM_REASON.SIGNUP_WITHIN_3_DAYS
                            : CLAIM_REASON.SIGNUP_AFTER_3_DAYS

        return Promise.all(
            rewards.map(reward => 
                this.claimModel.create({
                    userId,
                    eventId,
                    rewardId: reward._id,
                    status,
                    reason
                })
            )
        );
    }

    async ensureNotAlreadyClaimed(userId: string, eventId: Types.ObjectId) {
        const existing = await this.claimModel.findOne({
            userId,
            eventId,
            status: CLAIM_STATUS.SUCCESS
        })

        if(existing) {
            throw new ConflictException(ERROR_MESSAGES.ALREADY_REWARD);
        }
    }

    private async fetchRewards(query: any) {
        return await this.claimModel
                        .find(query)
                        .sort({_id: 1})
                        .limit(this.limit)
                        .lean();
    }
}