import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { HydratedDocument, Model, Types } from 'mongoose';
import { Event, EventDocument } from './entity/event.entity';
import { Reward } from './entity/reward.entity';
import { CreateEventDto } from 'apps/common/dto/event/create-event.dto';
import { UpdateStatusDto } from 'apps/common/dto/event/update-status.dto';
import { ClaimService } from './claim.service';
import { RewardService } from './reward.service';
import { EventHelperService } from './event.helper.service';
import { EventValidationService } from './event.validation.service';
import { EVENT_CONDITION } from 'apps/common/constant/event-condition.constant';
import { ERROR_MESSAGES } from 'apps/common/constant/error-message.constant';

type EventDoc = HydratedDocument<Event>;
type RewardDoc = HydratedDocument<Reward>;

@Injectable()
export class EventService {
  constructor(
    private readonly claimService: ClaimService,
    private readonly rewardService: RewardService,
    private readonly eventHelperService: EventHelperService,
    private readonly eventValidationService: EventValidationService,
    @InjectModel(Event.name) private readonly eventModel: Model<EventDocument>,
  ) {}

  async readEvent(eventId: string) {
    const objectId = this.eventHelperService.toObjectId(eventId);
    const event = await this.findEventByIdOrThrow(objectId);
    const rewards = await this.rewardService.findRewardsByEventId(objectId);
    return this.toDto(event, rewards);
  }

  async readAllEvent() {
    return await this.eventModel.find({});
  }

  async createEvent(eventDto : CreateEventDto) {
    const event = await this.createEventOnly(eventDto);
    const rewards = await this.rewardService.createRewards(event._id, eventDto.rewards);
    return this.toDto(event, rewards);
  }
  
  async updateStatus(updateStatus: UpdateStatusDto) {
    const objectId = this.eventHelperService.toObjectId(updateStatus.eventId);
    const updated = await this.eventModel.findByIdAndUpdate(
      objectId,
      { status: updateStatus.status },
      { new: true }
    );

    if(!updated) {
      throw new NotFoundException(ERROR_MESSAGES.HAVE_NOT_UPDATEED);
    }
    return updated;
  }
  
  async rewardEvent(user: any, eventId: string) {
    const objectId = this.eventHelperService.toObjectId(eventId);
    const event = await this.getValideEventOrThrow(objectId);
    await this.eventValidationService.ensureEventIsActive(event);
    await this.eventValidationService.ensureWithinPeriod(event);
    const rewards = await this.rewardService.getEventRewardsOrThrow(event._id);
    await this.claimService.ensureNotAlreadyClaimed(user.userId, event._id);

    const isEligible = await this.eventValidationService.checkEligibility(user, event.conditions || {});
    const claims = await this.claimService.createClaims(user.userId, event._id, rewards, isEligible);
    
    return {
      message: isEligible
        ? EVENT_CONDITION.SIGNUP_EVENT.SATISFACTION
        : EVENT_CONDITION.SIGNUP_EVENT.DISSATISFACTION,
      claim: claims
    };
  }

  private async findEventByIdOrThrow(id: Types.ObjectId) {
    const event = await this.eventModel.findById(id);
    if(!event) {
      throw new NotFoundException(ERROR_MESSAGES.NOT_FOUND_EVENT);
    }
    return event;
  }

  private toDto(event: EventDoc, rewards: RewardDoc[]) {
    return {
      ...event.toObject(),
      rewards: rewards.map(r => r.toObject())
    }
  }

  private async createEventOnly(dto: CreateEventDto) {
    const { rewards, ...eventData } = dto;
    return await this.eventModel.create(eventData);
  }

  async getValideEventOrThrow(eventId: Types.ObjectId) {
    const event = await this.findEventByIdOrThrow(eventId);
    if(!event) {
      throw new NotFoundException(ERROR_MESSAGES.NOT_FOUND_EVENT);
    }
    return event;
  }
}
